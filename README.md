# ChainLens - Modern Blockchain Explorer

ChainLens is a modern, user-friendly blockchain explorer for EVM-compatible networks. It provides comprehensive insights into blockchain data including blocks, transactions, addresses, tokens, and NFTs.

## Features

- **Full Block Explorer**: View detailed information about blocks, transactions, addresses, tokens, and smart contracts
- **Complete NFT Support**: Browse and view NFTs (ERC-721 and ERC-1155) with metadata and collection information
- **Token Explorer**: Detailed information about ERC-20 tokens including transfers, holders, and price data
- **Advanced Search**: Powerful search functionality across all blockchain data
- **Modern UI**: Clean, responsive interface built with Next.js and Tailwind CSS
- **REST API**: Comprehensive API for developers to access blockchain data

## Tech Stack

- **Frontend**: Next.js 15.2, React 19, Tailwind CSS, Shadcn UI
- **Backend**: Next.js API Routes, Node.js
- **Blockchain Integration**: Web3.js, Ethers.js

## Getting Started

### Prerequisites

- Node.js 18+ 
- PNPM package manager

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/chainlens.git
cd chainlens
```

2. Install dependencies for both frontend and backend:

```bash
# Install frontend dependencies
cd frontend
pnpm install

# Install backend dependencies
cd ../backend/explorer
pnpm install
```

3. Create environment files:

```bash
# Frontend .env
cd frontend
cp .env.example .env.local

# Backend .env
cd ../backend/explorer
cp .env.example .env.local
```

4. Configure the environment variables in both `.env.local` files with your settings

### Running the Application

1. Start the backend server:

```bash
cd backend/explorer
pnpm dev
```

2. In a new terminal, start the frontend:

```bash
cd frontend
pnpm dev
```

3. Access the application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001

## API Documentation

The API documentation is available at http://localhost:3001/api-docs when the backend server is running.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

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

