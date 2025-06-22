import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AnimatedWalletLines } from "@/components/animated-wallet-lines"
import LiveStatsBar from "@/components/live-stats-bar"
import { Copy, MessageSquare, Shield, Zap, Users, TrendingUp } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import NetworkStats from "@/components/network-stats"
import BackgroundGradient from "@/components/background-gradient"
import TerminalSearch from "@/components/terminal-search"

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <BackgroundGradient />
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 mb-4">
            ChainLens Explorer
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Modern, user-friendly blockchain explorer for EVM-compatible networks
          </p>
        </div>

        <div className="mb-8">
          <TerminalSearch />
        </div>

        <LiveStatsBar />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="bg-card/60 backdrop-blur-sm border-muted">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Blocks</CardTitle>
            </CardHeader>
            <CardContent>
              <Link href="/blocks">
                <Button variant="outline" className="w-full">View Latest Blocks</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-card/60 backdrop-blur-sm border-muted">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <Link href="/transactions">
                <Button variant="outline" className="w-full">View Transactions</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-card/60 backdrop-blur-sm border-muted">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Tokens</CardTitle>
            </CardHeader>
            <CardContent>
              <Link href="/tokens">
                <Button variant="outline" className="w-full">Explore Tokens</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-card/60 backdrop-blur-sm border-muted">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">NFTs</CardTitle>
            </CardHeader>
            <CardContent>
              <Link href="/nfts">
                <Button variant="outline" className="w-full">Browse NFTs</Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <NetworkStats />

        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold mb-6">Powerful Blockchain Explorer Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-card/60 backdrop-blur-sm border-muted">
              <CardHeader>
                <CardTitle>Full NFT Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Complete support for ERC-721 and ERC-1155 NFTs with detailed metadata and collection views</p>
              </CardContent>
            </Card>
            
            <Card className="bg-card/60 backdrop-blur-sm border-muted">
              <CardHeader>
                <CardTitle>Advanced Search</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Powerful search capabilities for blocks, transactions, addresses, tokens and smart contracts</p>
              </CardContent>
            </Card>
            
            <Card className="bg-card/60 backdrop-blur-sm border-muted">
              <CardHeader>
                <CardTitle>REST API</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Comprehensive RESTful API for custom integrations and blockchain data analytics</p>
                <Link href="/api" className="text-primary hover:underline block mt-2">
                  View API Documentation
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
