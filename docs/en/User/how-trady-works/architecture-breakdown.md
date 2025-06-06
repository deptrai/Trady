# Architecture Breakdown

Chain Lens is built using a modular architecture with the following core layers:

**Frontend**
React + Next.js app with TailwindCSS, fully responsive

**Wallet Engine**
In-browser keypair generation via `@solana/web3.js`, stored locally

```
@solana/web3.js
```

**Swap Layer**
Jupiter aggregator API for best route execution

**Copy Engine**
Real-time listener for wallet activity, mirrored swaps

**Reputation System**
Dynamic scoring of wallets based on behavior

**Chat System**
Token-specific chat rooms powered by websockets

**Data Store**
Firebase / Supabase + local cache for performance
