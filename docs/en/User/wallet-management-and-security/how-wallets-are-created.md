# How Wallets Are Created

When a user visits Chain Lens and clicks "Create Wallet", the following happens:
1. A new Solana keypair is generated using @solana/web3.js
2. The keypair is stored locally in your browser's storage (not sent to any server)
3. You're given the option to export your private key immediately
4. A public wallet address is shown in the app header
5. You can start using the wallet for swaps, copy trades, and chat instantly

This process takes less than 2 seconds and works the same on desktop and mobile.

The wallet is completely compatible with Solana dApps — it's just generated differently.
