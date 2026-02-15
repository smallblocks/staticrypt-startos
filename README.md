# StatiCrypt for StartOS

Password-protect HTML files with AES-256 encryption, packaged for [StartOS](https://start9.com).

## What is StatiCrypt?

[StatiCrypt](https://github.com/robinmoisson/staticrypt) uses AES-256 to encrypt HTML pages with a password. The encrypted page is a self-contained HTML file that prompts for the password and decrypts entirely in the browser. No server required for viewing - just share the encrypted file.

## Features

- 🔐 **AES-256 Encryption** - Military-grade encryption for your HTML files
- 🌐 **Self-Contained** - Encrypted files work offline, no server needed to view
- 📱 **Simple Web UI** - Drag-and-drop interface for easy encryption
- 🏠 **Self-Hosted** - Runs on your own StartOS server

## Use Cases

- Protect sensitive documents before sharing
- Create password-protected internal wikis
- Secure HTML reports or dashboards
- Share private content with specific people

## Installation

### From Registry

Coming soon to the Start9 Community Registry.

### Sideload

1. Download the `.s9pk` file from [Releases](https://github.com/smallblocks/staticrypt-startos/releases)
2. In StartOS, go to System → Sideload
3. Upload the `.s9pk` file

## Development

### Prerequisites

- Node.js 20+
- Docker
- [start-cli](https://github.com/Start9Labs/start-os)

### Build

```bash
# Install dependencies
npm install

# Build StartOS JavaScript
npm run build

# Build Docker image
docker build -t localhost/staticrypt:0.1.0 .

# Pack s9pk
start-cli s9pk pack . -o staticrypt.s9pk
```

## License

MIT - See [LICENSE](LICENSE)

## Credits

- [StatiCrypt](https://github.com/robinmoisson/staticrypt) by Robin Moisson
- [StartOS](https://start9.com) by Start9
