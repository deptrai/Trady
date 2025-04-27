import { Suspense } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { TransactionList } from "@/components/transaction-list"
import { BlockList } from "@/components/block-list"
import { Terminal, Shield, Cpu } from "lucide-react"
import { fetchSupplyInfo, fetchEpochInfo } from "@/lib/helius"
import Link from "next/link"
import { HexGrid } from "@/components/hex-grid"
import { NetworkStats } from "@/components/network-stats"
import { TerminalSearch } from "@/components/terminal-search"

// Daha uzun süre önbelleğe alma
export const revalidate = 300 // 5 dakika

// Varsayılan değerler
const defaultSupplyInfo = { total: 555000000, circulating: 410000000 }
const defaultEpochInfo = { epoch: 420, slotIndex: 432000, slotsInEpoch: 864000 }

export default async function Home() {
  // Varsayılan değerlerle başla
  let supplyInfo = defaultSupplyInfo
  let epochInfo = defaultEpochInfo

  try {
    // Fetch data with error handling - Promise.all ile paralel çağrı
    const [supplyData, epochData] = await Promise.allSettled([fetchSupplyInfo(), fetchEpochInfo()])

    // Extract results if promises were fulfilled
    if (supplyData.status === "fulfilled") {
      supplyInfo = supplyData.value
    }

    if (epochData.status === "fulfilled") {
      epochInfo = epochData.value
    }
  } catch (error) {
    console.error("Error fetching blockchain data:", error)
    // Continue with fallback values
  }

  return (
    <>
      <HexGrid />
      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Hero Section with Centered Search */}
        <div className="flex flex-col items-center justify-center py-16 md:py-24 text-center relative">
          <div className="absolute inset-0 bg-cyber-purple/5 blur-3xl rounded-full"></div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 font-orbitron tracking-wider">
            <span className="text-cyber-purple">TRADY</span> <span className="text-cyber-teal">EXPLORER</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mb-10 text-lg">
            Dive deep. Explore the Solana blockchain. Every transaction, every block, every token.
          </p>

          <div className="w-full max-w-2xl">
            <TerminalSearch />
            <div className="mt-3 flex flex-wrap justify-center gap-2 text-xs text-muted-foreground">
              <span>Example:</span>
              <Link href="/address/9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM" className="hover:text-cyber-purple">
                9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM
              </Link>
            </div>
          </div>
        </div>

        {/* Network Stats */}
        <NetworkStats />

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 mt-16">
          <Card className="cyber-border bg-cyber-dark/40 hover:bg-cyber-dark/60 transition-all duration-300 group">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-cyber-purple/10 flex items-center justify-center mb-4 group-hover:bg-cyber-purple/20 transition-all duration-300">
                <Terminal className="h-8 w-8 text-cyber-purple" />
              </div>
              <h3 className="text-xl font-bold font-orbitron mb-2 text-cyber-purple">Real-Time Monitoring</h3>
              <p className="text-muted-foreground">
                Track all transactions, blocks, and token movements on the Solana network in real-time.
              </p>
            </CardContent>
          </Card>

          <Card className="cyber-border bg-cyber-dark/40 hover:bg-cyber-dark/60 transition-all duration-300 group">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-cyber-teal/10 flex items-center justify-center mb-4 group-hover:bg-cyber-teal/20 transition-all duration-300">
                <Shield className="h-8 w-8 text-cyber-teal" />
              </div>
              <h3 className="text-xl font-bold font-orbitron mb-2 text-cyber-teal">Secure Analysis</h3>
              <p className="text-muted-foreground">
                Analyze smart contract interactions, token transfers, and program calls in detail.
              </p>
            </CardContent>
          </Card>

          <Card className="cyber-border bg-cyber-dark/40 hover:bg-cyber-dark/60 transition-all duration-300 group">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-cyber-pink/10 flex items-center justify-center mb-4 group-hover:bg-cyber-pink/20 transition-all duration-300">
                <Cpu className="h-8 w-8 text-cyber-pink" />
              </div>
              <h3 className="text-xl font-bold font-orbitron mb-2 text-cyber-pink">Advanced Data</h3>
              <p className="text-muted-foreground">
                Comprehensive data and statistics about NFTs, tokens, and accounts.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Latest Data Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          <Suspense fallback={<div className="h-64 bg-cyber-dark/30 rounded-lg animate-pulse"></div>}>
            <TransactionList />
          </Suspense>

          <Suspense fallback={<div className="h-64 bg-cyber-dark/30 rounded-lg animate-pulse"></div>}>
            <BlockList />
          </Suspense>
        </div>

        {/* Terminal-like Section */}
        <Card className="cyber-border mb-12 overflow-hidden">
          <CardContent className="p-0">
            <div className="bg-cyber-dark/80 p-2 border-b border-cyber-purple/20 flex items-center">
              <div className="w-3 h-3 rounded-full bg-cyber-pink mr-2"></div>
              <div className="w-3 h-3 rounded-full bg-cyber-teal mr-2"></div>
              <div className="w-3 h-3 rounded-full bg-cyber-purple mr-2"></div>
              <span className="text-xs text-muted-foreground">terminal@trady-explorer:~</span>
            </div>
            <div className="p-6 font-mono text-sm cyber-code">
              <div className="text-muted-foreground">$ connect_to_solana_network</div>
              <div className="text-cyber-teal">Connected to Solana Mainnet Beta</div>
              <div className="text-muted-foreground mt-2">$ get_network_status</div>
              <div className="text-white">
                Network: <span className="text-cyber-purple">Mainnet</span> | Current Epoch:{" "}
                <span className="text-cyber-teal">{epochInfo.epoch}</span> | Slot:{" "}
                <span className="text-cyber-pink">{epochInfo.slotIndex}</span>
              </div>
              <div className="text-muted-foreground mt-2">$ get_sol_supply</div>
              <div className="text-white">
                Total Supply: <span className="text-cyber-purple">{supplyInfo.total.toLocaleString()} SOL</span> |
                Circulating: <span className="text-cyber-teal">{supplyInfo.circulating.toLocaleString()} SOL</span>
              </div>
              <div className="text-muted-foreground mt-2">$ help</div>
              <div className="text-white">
                Available commands: <span className="text-cyber-purple">explore_transactions</span>,{" "}
                <span className="text-cyber-teal">view_blocks</span>,{" "}
                <span className="text-cyber-pink">search_address</span>
              </div>
              <div className="text-muted-foreground mt-2">$ _</div>
              <div className="inline-block w-2 h-4 bg-cyber-purple animate-pulse"></div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Link href="/transactions" className="group">
            <Card className="cyber-border h-full bg-cyber-dark/40 hover:bg-cyber-dark/60 transition-all duration-300 group-hover:border-cyber-purple/50">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold font-orbitron mb-2 text-cyber-purple group-hover:text-cyber-purple/90">
                  Transactions
                </h3>
                <p className="text-muted-foreground mb-4">
                  Explore the latest transactions on the Solana blockchain. View signatures, details, and more.
                </p>
                <div className="text-cyber-purple text-sm group-hover:translate-x-1 transition-transform">
                  View Transactions →
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/blocks" className="group">
            <Card className="cyber-border h-full bg-cyber-dark/40 hover:bg-cyber-dark/60 transition-all duration-300 group-hover:border-cyber-teal/50">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold font-orbitron mb-2 text-cyber-teal group-hover:text-cyber-teal/90">
                  Blocks
                </h3>
                <p className="text-muted-foreground mb-4">
                  Browse through blocks, see transaction counts, and analyze blockchain data.
                </p>
                <div className="text-cyber-teal text-sm group-hover:translate-x-1 transition-transform">
                  View Blocks →
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/tokens" className="group">
            <Card className="cyber-border h-full bg-cyber-dark/40 hover:bg-cyber-dark/60 transition-all duration-300 group-hover:border-cyber-pink/50">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold font-orbitron mb-2 text-cyber-pink group-hover:text-cyber-pink/90">
                  Tokens
                </h3>
                <p className="text-muted-foreground mb-4">
                  Discover tokens on Solana, check prices, market caps, and trading volumes.
                </p>
                <div className="text-cyber-pink text-sm group-hover:translate-x-1 transition-transform">
                  View Tokens →
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </>
  )
}
