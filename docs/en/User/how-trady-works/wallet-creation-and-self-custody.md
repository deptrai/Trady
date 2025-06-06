# Wallet Creation & Self-Custody

One of Chain Lens’s most important innovations is the instant wallet generation system. Users can create a Solana wallet directly from their browser, in seconds — without extensions or installations.

**Process:**
1. User visits Chain Lens and clicks “Create Wallet”
2. A `Keypair` is generated client-side using `@solana/web3.js`
3. The `secretKey` is stored in `localStorage` (optionally encrypted)
4. The public key is used for all swap & copy operations
5. User can export or delete/reset their wallet at any time

**Key Points:**
- Fully self-custodial — user owns the private key
- Private key is never transmitted to any backend server
- Wallet can be exported in Phantom-compatible format
- Session timeout and manual lock available in settings
- Future roadmap includes optional PIN lock & session encryption
