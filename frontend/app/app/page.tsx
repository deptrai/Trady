"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowUpRight, ChevronRight, Copy, LineChart, Zap } from "lucide-react"
import Link from "next/link"
import { CardGlow } from "@/components/card-glow"
import { motion } from "framer-motion"
import { useWallet } from "@/contexts/wallet-context"

export default function AppHome() {
  const router = useRouter()
  const { wallet, isLocked } = useWallet()

  useEffect(() => {
    // Redirect to create wallet page if no wallet exists or is locked
    if (!wallet || isLocked) {
      router.push("/create")
    }
  }, [wallet, isLocked, router])

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  // If no wallet or wallet is locked, show loading state
  if (!wallet || isLocked) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  return (
    <motion.div variants={container} initial="hidden" animate="show">
      <motion.div variants={item} className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome to Chain Lens</h1>
        <p className="text-muted-foreground">Copy the trades of top wallets or explore hot tokens. Choose your edge.</p>
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <CardGlow>
          <Link href="/app/trending">
            <Card className="h-full border-border/50 hover:border-primary/50 transition-colors bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <LineChart className="h-5 w-5 mr-2 text-primary" />
                  Explore Trending Tokens
                </CardTitle>
                <CardDescription>Discover the hottest tokens based on real trading activity</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">View trending tokens</span>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </CardContent>
            </Card>
          </Link>
        </CardGlow>

        <CardGlow>
          <Link href="/app/copy">
            <Card className="h-full border-border/50 hover:border-secondary/50 transition-colors bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Copy className="h-5 w-5 mr-2 text-secondary" />
                  Start Copy Trading
                </CardTitle>
                <CardDescription>Find and copy the most successful wallets on Solana</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">View top wallets</span>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </CardContent>
            </Card>
          </Link>
        </CardGlow>
      </motion.div>

      <motion.div variants={item}>
        <Tabs defaultValue="trending" className="mb-8">
          <TabsList className="grid grid-cols-2 mb-6 bg-muted/30 p-1">
            <TabsTrigger
              value="trending"
              className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
            >
              Trending Tokens
            </TabsTrigger>
            <TabsTrigger value="wallets" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
              Top Wallets
            </TabsTrigger>
          </TabsList>

          <TabsContent value="trending">
            <Card className="bg-card/50 backdrop-blur-sm border-border/50 overflow-hidden">
              <div className="grid grid-cols-5 gap-4 p-4 border-b border-border/50 bg-muted/30">
                <div className="col-span-2 font-medium">Token</div>
                <div className="text-right font-medium">Price</div>
                <div className="text-right font-medium">24h Change</div>
                <div className="text-right font-medium">Action</div>
              </div>

              {[
                { name: "SOL", price: "$142.58", change: "+5.2%", positive: true },
                { name: "BONK", price: "$0.00002341", change: "+12.8%", positive: true },
                { name: "JTO", price: "$3.87", change: "-2.1%", positive: false },
                { name: "PYTH", price: "$0.58", change: "+8.4%", positive: true },
                { name: "RNDR", price: "$7.21", change: "-0.5%", positive: false },
              ].map((token, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                  className="grid grid-cols-5 gap-4 p-4 border-b border-border/50 hover:bg-muted/20 transition-colors"
                >
                  <div className="col-span-2 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                      {token.name.charAt(0)}
                    </div>
                    <span>{token.name}</span>
                  </div>
                  <div className="text-right">{token.price}</div>
                  <div className={`text-right ${token.positive ? "text-green-500" : "text-red-500"}`}>
                    {token.change}
                  </div>
                  <div className="text-right">
                    <button className="btn-gradient text-xs px-3 py-1">
                      <Zap className="h-3 w-3 mr-1 inline" /> Snipe
                    </button>
                  </div>
                </motion.div>
              ))}
            </Card>

            <div className="mt-4 text-center">
              <Link href="/app/trending">
                <button className="bg-transparent border border-primary/50 text-primary font-bold rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5 transition-all duration-300 hover:bg-primary/10">
                  View All Trending Tokens <ArrowUpRight className="ml-2 h-4 w-4 inline" />
                </button>
              </Link>
            </div>
          </TabsContent>

          <TabsContent value="wallets">
            <Card className="bg-card/50 backdrop-blur-sm border-border/50 overflow-hidden">
              <div className="grid grid-cols-5 gap-4 p-4 border-b border-border/50 bg-muted/30">
                <div className="col-span-2 font-medium">Wallet</div>
                <div className="text-right font-medium">30d ROI</div>
                <div className="text-right font-medium">Followers</div>
                <div className="text-right font-medium">Action</div>
              </div>

              {[
                { address: "0xAb3...c7F", roi: "+142.5%", followers: "1.2K", positive: true },
                { address: "0xDe7...f9B", roi: "+87.3%", followers: "843", positive: true },
                { address: "0x58F...e2A", roi: "+65.8%", followers: "512", positive: true },
                { address: "0x91C...j7Y", roi: "+52.1%", followers: "378", positive: true },
                { address: "0xF3P...s9W", roi: "+48.7%", followers: "256", positive: true },
              ].map((wallet, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                  className="grid grid-cols-5 gap-4 p-4 border-b border-border/50 hover:bg-muted/20 transition-colors"
                >
                  <div className="col-span-2 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs">
                      {i + 1}
                    </div>
                    <span className="font-mono">{wallet.address}</span>
                  </div>
                  <div className={`text-right ${wallet.positive ? "text-green-500" : "text-red-500"}`}>
                    {wallet.roi}
                  </div>
                  <div className="text-right">{wallet.followers}</div>
                  <div className="text-right">
                    <button className="copy-button pulse text-xs px-3 py-1">
                      <Copy className="h-3 w-3 mr-1 inline" /> Copy
                    </button>
                  </div>
                </motion.div>
              ))}
            </Card>

            <div className="mt-4 text-center">
              <Link href="/app/copy">
                <button className="bg-transparent border border-primary/50 text-primary font-bold rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5 transition-all duration-300 hover:bg-primary/10">
                  View Full Leaderboard <ArrowUpRight className="ml-2 h-4 w-4 inline" />
                </button>
              </Link>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>

      <motion.div variants={item}>
        <CardGlow>
          <Card className="bg-card/50 backdrop-blur-sm border-border/50 p-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div>
                <h3 className="text-xl font-bold mb-2">New to Copy Trading?</h3>
                <p className="text-muted-foreground">
                  Learn how to set up your first copy trade and maximize your returns.
                </p>
              </div>
              <Link href="/docs/getting-started">
                <button className="btn-gradient">
                  Read the Guide <ArrowUpRight className="ml-2 h-4 w-4 inline" />
                </button>
              </Link>
            </div>
          </Card>
        </CardGlow>
      </motion.div>
    </motion.div>
  )
}
