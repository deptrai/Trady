# Chain Lens – Social Trading DEX on Solana

Chain Lens is a Solana-native social trading platform that lets users:

- Instantly create a self-custodial wallet (no extensions required)
- Copy top-performing wallets in real-time (CopySwap)
- Swap tokens via Jupiter aggregator with optimal routing
- Chat directly under any token
- Discover trending tokens via Radar

💡 Think Telegram + Phantom + Jupiter, all in one UX.

---

## 🌐 Live Deployment

- Website: [https://chainlens.net](https://chainlens.net)
- App: [https://chainlens.net/app](https://chainlens.net/app)
- Docs: [https://docs.chainlens.net](https://docs.chainlens.net)
- Twitter: [https://x.com/ChainLensProtocol](https://x.com/ChainLensProtocol)

---

## 🧠 Core Features

- 💬 Token-specific real-time chat (Supabase Realtime)
- 🧠 CopySwap engine for live wallet mirroring
- 🔄 Jupiter-integrated swap interface
- 📈 Radar module for trending token scoring
- 🔐 In-browser wallet (generated & encrypted client-side)

---

## 🧰 Tech Stack

- **Frontend:** React + Next.js 14 (App Router)
- **Styling:** TailwindCSS + Custom Design Tokens
- **Wallet:** `@solana/web3.js` (client-side keypair)
- **Swap Routing:** Jupiter API
- **Realtime Data:** Supabase Realtime
- **State Management:** Zustand
- **Deployment:** Vercel

---

## 🚀 Getting Started (Local Dev)

```bash
cd Chain Lens/frontend

npm install
npm run dev

