import express, { Request, Response } from 'express'
import multer from 'multer'
import { exec } from 'child_process'
import { promisify } from 'util'
import fs from 'fs/promises'
import path from 'path'
import os from 'os'

const execAsync = promisify(exec)

const app = express()
const PORT = process.env.PORT || 3000

// Configure multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'text/html' || file.originalname.endsWith('.html') || file.originalname.endsWith('.htm')) {
      cb(null, true)
    } else {
      cb(new Error('Only HTML files are allowed'))
    }
  },
})

app.use(express.static('public'))
app.use(express.json())

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok' })
})

// Encrypt endpoint
app.post('/encrypt', upload.single('file'), async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' })
    }

    const password = req.body.password
    if (!password || password.length < 1) {
      return res.status(400).json({ error: 'Password is required' })
    }

    // Create temp files
    const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'staticrypt-'))
    const inputFile = path.join(tempDir, 'input.html')
    const outputFile = path.join(tempDir, 'encrypted.html')

    try {
      // Write uploaded file
      await fs.writeFile(inputFile, req.file.buffer)

      // Run staticrypt
      const title = req.body.title || 'Protected Page'
      const cmd = `staticrypt "${inputFile}" -p "${password.replace(/"/g, '\\"')}" -o "${outputFile}" --title "${title.replace(/"/g, '\\"')}"`
      
      await execAsync(cmd)

      // Read encrypted file
      const encrypted = await fs.readFile(outputFile)

      // Generate output filename
      const originalName = req.file.originalname.replace(/\.html?$/i, '')
      const outputName = `${originalName}_encrypted.html`

      // Send encrypted file
      res.setHeader('Content-Type', 'text/html')
      res.setHeader('Content-Disposition', `attachment; filename="${outputName}"`)
      res.send(encrypted)

    } finally {
      // Cleanup temp files
      await fs.rm(tempDir, { recursive: true, force: true })
    }

  } catch (error) {
    console.error('Encryption error:', error)
    res.status(500).json({ error: 'Encryption failed', details: String(error) })
  }
})

app.listen(PORT, () => {
  console.log(`StatiCrypt server running on port ${PORT}`)
})
