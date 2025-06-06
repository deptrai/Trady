# CopySwap Engine

The heart of Chain Lens’s social trading model is CopySwap — the ability to follow and automatically copy the trades of top-performing wallets.

**How It Works:**
1. User selects a wallet from the leaderboard or wallet explorer
2. User clicks “Start Copying”
3. Chain Lens’s backend listens to that wallet’s swap transactions
4. When a swap is detected, Chain Lens replicates the same swap via the user’s own wallet
5. Optionally, user can set copy limits (max SOL per swap, delay, etc.)

**Copy2Earn:**
- Wallets being copied earn a small fee per mirrored trade
- This incentivizes smart traders to allow copying (and grow their following)
