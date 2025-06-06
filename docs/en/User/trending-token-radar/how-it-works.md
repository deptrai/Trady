# How It Works

Chain Lens’s Radar scans the network continuously using a scoring algorithm that weighs and ranks each token based on the following real-time data points:

#### 1. Swap Volume Spikes
Tokens that experience a sudden increase in volume over a short time frame are flagged. Chain Lens compares 1h, 6h, and 24h averages to detect abnormal surges.

#### 2. Wallet Activity Increases
How many unique wallets are interacting with a token over time? The system looks at growth rate, not just totals. A token going from 12 to 300 wallets in 30 minutes will outrank one going from 1,000 to 1,200 in 24h.

#### 3. Liquidity Pool Events
Tokens with new liquidity pairs added, refreshed LPs, or rapid LP inflow are noted. This helps detect stealth launches and early-stage memecoins.

#### 4. Whale Detection
If a wallet with high reputation or history (on Chain Lens or general Solana chain) begins buying a token, that token’s radar score increases significantly. Multiple whales entering in a short window cause a spike.

#### 5. Chat & Social Activity
Tokens being heavily discussed in Chain Lens chatrooms — or linked to swap callouts — get a social signal boost. Integration with Telegram scraping and potential Twitter scanning (future) also enhances this layer.

Each token receives a live score (0–100), updated every minute. Those scoring 80+ are marked “Hot,” while those scoring 90+ may be labeled “Volatile” or “Breakout.”
