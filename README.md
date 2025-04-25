# Trady – Social Trading DEX on Solana

Trady is a Solana-native social trading platform that lets users:

- Instantly create a self-custodial wallet (no extensions required)
- Copy top-performing wallets in real-time (CopySwap)
- Swap tokens via Jupiter aggregator with optimal routing
- Chat directly under any token
- Discover trending tokens via Radar

💡 Think Telegram + Phantom + Jupiter, all in one UX.

---

## 🌐 Live Deployment

- Website: [https://trady.so](https://trady.so)
- App: [https://trady.so/app](https://trady.so/app)
- Docs: [https://docs.trady.so](https://docs.trady.so)
- Twitter: [https://x.com/TradyProtocol](https://x.com/TradyProtocol)

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
cd trady/frontend

npm install
npm run dev

