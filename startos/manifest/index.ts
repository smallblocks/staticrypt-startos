import { setupManifest } from '@start9labs/start-sdk'

export const manifest = setupManifest({
  id: 'staticrypt',
  title: 'StatiCrypt',
  license: 'MIT',
  wrapperRepo: 'https://github.com/smallblocks/staticrypt-startos',
  upstreamRepo: 'https://github.com/robinmoisson/staticrypt',
  supportSite: 'https://github.com/smallblocks/staticrypt-startos/issues',
  marketingSite: 'https://github.com/robinmoisson/staticrypt',
  donationUrl: null,
  docsUrl: 'https://github.com/robinmoisson/staticrypt#readme',
  description: {
    short: 'Password-protect HTML files with AES-256 encryption',
    long: `StatiCrypt uses AES-256 to encrypt HTML pages with a password. The encrypted page is a self-contained HTML file that prompts for the password and decrypts in the browser. No server required for viewing - just share the encrypted file.

Perfect for protecting sensitive documents, internal wikis, or private content that needs to be shared securely.`,
  },
  volumes: ['main'],
  images: {
    main: {
      source: { dockerTag: 'localhost/staticrypt:0.1.0' },
      arch: ['x86_64', 'aarch64'],
    },
  },
  alerts: {
    install: null,
    update: null,
    uninstall: null,
    restore: null,
    start: null,
    stop: null,
  },
  dependencies: {},
})
