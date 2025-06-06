# What the Reputation Score Measures

Chain Lens’s engine looks at dozens of signals across five main categories:

#### 1. ROI Performance
- Total ROI over 7 days, 30 days, and all-time
- Weighted based on trade size, holding time, and volatility
- Smoothed to remove one-off pump spikes

#### 2. Token Behavior Analysis
- Does this wallet trade only meme coins, or diversified tokens?
- What’s the average holding duration?
- Does the wallet repeatedly dump tokens within minutes of buying?

#### 3. Rug Detection Heuristics
- Has the wallet ever bought tokens that rugged shortly after?
- Were those tokens extremely low liquidity?
- Did the wallet sell before or after the collapse?

#### 4. Copy Influence
- How many users are currently copying this wallet?
- How long have they been copying it?
- Did copiers profit or lose after following this wallet?

#### 5. Activity Consistency
- How frequently does the wallet trade?
- Do they trade daily or once a month?
- Do they have abnormal gaps or suspicious bursts?

These inputs are normalized and passed through a scoring model that outputs a dynamic score from 0 to 100, with accompanying reputation badges.
