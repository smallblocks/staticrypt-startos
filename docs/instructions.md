# StatiCrypt Instructions

## Getting Started

1. Open the StatiCrypt web interface from your StartOS dashboard
2. Drag and drop an HTML file onto the upload area (or click to select)
3. Enter a password
4. Optionally set a custom page title
5. Click "Encrypt & Download"

## Tips

- **Use a strong password** - The encryption is only as secure as your password
- **Remember your password** - There's no way to recover encrypted files without it
- **Test before sharing** - Open the encrypted file in a browser to verify it works

## How It Works

StatiCrypt uses AES-256-CBC encryption. When you encrypt a file:

1. Your HTML file is encrypted with your password
2. A password prompt page wraps the encrypted content
3. The result is a single, self-contained HTML file
4. When opened, it asks for the password and decrypts in the browser

No data is sent anywhere - decryption happens entirely client-side.

## Limitations

- Only HTML files are supported
- Maximum file size: 50MB
- The encrypted file will be larger than the original (due to encoding)
