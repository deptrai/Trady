# Core Integration Partners

Chain Lens currently connects with several major components of the Solana infrastructure stack:

#### ⚙️ Jupiter Aggregator (Swaps)
Jupiter is Solana's most reliable and advanced swap aggregator. It routes swaps across dozens of DEXs to ensure optimal prices, low slippage, and minimized MEV impact.

Chain Lens uses Jupiter to:
- Fetch routes
- Execute swaps
- Monitor liquidity depth
- Provide real-time quote previews

This gives Chain Lens users access to every tradable token and pool on Solana — without having to know which DEX it lives on.

#### 🔄 Raydium, Meteora, Orca, Phoenix (DEXs)
Through Jupiter, Chain Lens interacts with:
- Raydium for fast swaps and stable pairs
- Meteora for dynamic LP-based liquidity
- Orca for smooth mobile UX and concentrated liquidity
- Phoenix for orderbook-style decentralized trading

These integrations happen behind the scenes. For the user, it's one swap interface — with all liquidity sources pooled automatically.

#### 💳 @solana/web3.js (Wallet Engine)
Chain Lens generates wallets and signs transactions using Solana's native JavaScript SDK. No third-party custodians or wallet connectors are used.

This makes wallet creation and signing:
- Blazing fast
- Mobile-compatible
- Non-custodial
- Fully client-side

#### 💬 Supabase Realtime (Chat & Messaging)
Chain Lens leverages Supabase's realtime database for its chatrooms. This allows:
- Instant message delivery
- System message injection (whale alerts, rug flags)
- Spam moderation
- Dynamic channel creation (per-token)

The result? Every token on Solana gets its own social layer — live, relevant, and fast.
