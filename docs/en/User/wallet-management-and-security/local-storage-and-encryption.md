# Local Storage and Encryption

Your wallet is stored in the browser using secure encryption.

Chain Lens uses:
- AES-256 encryption (client-side)
- Optional PIN (coming soon) to protect wallet decryption
- localStorage or IndexedDB to save wallet data

Since nothing is ever transmitted to a backend, your private key never leaves your device.

Closing the browser or clearing cache will erase the wallet — unless exported.
