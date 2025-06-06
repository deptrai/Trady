# How CopySwap Works (Technically)

At the backend level, CopySwap uses event watchers that monitor specific wallet addresses on-chain.

Here’s a breakdown of the flow:
1. You select a wallet and click “Start Copying.”
2. Chain Lens’s backend begins monitoring that wallet’s swap activity.
3. When the wallet signs and sends a swap transaction (via Jupiter), the backend detects the trade.
4. Chain Lens immediately triggers a mirrored swap request in your own browser wallet, signed and executed with your funds.
5. The entire process typically occurs within 1–2 seconds (depending on your chosen delay setting).

All trades are routed through Jupiter, meaning your trade will always take the best path available — even if the original wallet used a different DEX.

Chain Lens doesn’t pool funds or act as a custodian. Each mirrored trade is executed using your wallet, your gas, and your routing.
