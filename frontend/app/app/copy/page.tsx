"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, Shield, TrendingUp } from "lucide-react"

export default function CopyPage() {
  const [followingWallets, setFollowingWallets] = useState<string[]>([])

  const toggleFollow = (walletAddress: string) => {
    if (followingWallets.includes(walletAddress)) {
      setFollowingWallets(followingWallets.filter((w) => w !== walletAddress))
    } else {
      setFollowingWallets([...followingWallets, walletAddress])

      // Create wallet trail effect
      const trailElement = document.createElement("div")
      trailElement.className = "wallet-trail"
      trailElement.style.left = `${Math.random() * 80 + 10}%`
      trailElement.style.top = "0"
      document.body.appendChild(trailElement)

      setTimeout(() => {
        document.body.removeChild(trailElement)
      }, 2000)
    }
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Auto-Mirror Smart Wallets</h1>
        <p className="text-muted-foreground">Pick a wallet. Let Trady handle the swaps.</p>
      </div>

      {followingWallets.length > 0 && (
        <div className="bg-primary/10 rounded-lg p-4 mb-8 border border-primary/30">
          <h3 className="font-bold mb-2 flex items-center gap-2">
            <Copy size={16} className="text-primary" />
            Following {followingWallets.length} wallet{followingWallets.length > 1 ? "s" : ""}
          </h3>
          <div className="flex flex-wrap gap-2">
            {followingWallets.map((wallet, index) => (
              <div key={index} className="bg-muted/50 rounded-lg px-3 py-1 text-sm flex items-center gap-2">
                <span className="font-mono">{wallet}</span>
                <button
                  onClick={() => toggleFollow(wallet)}
                  className="text-red-500 hover:text-red-400 transition-colors"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <Tabs defaultValue="top" className="mb-8">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="top">Top Wallets</TabsTrigger>
          <TabsTrigger value="trending">Trending</TabsTrigger>
          <TabsTrigger value="safe">Safest</TabsTrigger>
        </TabsList>

        <TabsContent value="top">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { address: "0xAb3...c7F", roi: "+142.5%", followers: 1243, trades: 87, winRate: "78%", risk: "Low" },
              { address: "0xDe7...f9B", roi: "+87.3%", followers: 876, trades: 124, winRate: "72%", risk: "Medium" },
              { address: "0x58F...e2A", roi: "+65.8%", followers: 512, trades: 56, winRate: "82%", risk: "Low" },
              { address: "0x91C...j7Y", roi: "+52.1%", followers: 378, trades: 68, winRate: "75%", risk: "Low" },
              { address: "0xF3P...s9W", roi: "+48.7%", followers: 256, trades: 92, winRate: "70%", risk: "Medium" },
              { address: "0xK7L...r2P", roi: "+43.2%", followers: 187, trades: 45, winRate: "80%", risk: "Low" },
            ].map((wallet, i) => (
              <Card key={i} className="wallet-card">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center font-bold">
                        {i + 1}
                      </div>
                      <div>
                        <p className="font-mono">{wallet.address}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex items-center text-xs text-green-500 gap-1">
                            <TrendingUp className="h-3 w-3" />
                            <span>{wallet.roi}</span>
                          </div>
                          <div className="w-1 h-1 rounded-full bg-muted-foreground" />
                          <div className="text-xs text-muted-foreground">{wallet.followers} followers</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center mb-4">
                    <div className="bg-muted/30 p-2 rounded-md">
                      <p className="text-xs text-muted-foreground">Trades</p>
                      <p className="font-medium">{wallet.trades}</p>
                    </div>
                    <div className="bg-muted/30 p-2 rounded-md">
                      <p className="text-xs text-muted-foreground">Win Rate</p>
                      <p className="font-medium">{wallet.winRate}</p>
                    </div>
                    <div className="bg-muted/30 p-2 rounded-md">
                      <p className="text-xs text-muted-foreground">Risk</p>
                      <p className="font-medium flex items-center justify-center gap-1">
                        <Shield className="h-3 w-3 text-green-500" />
                        {wallet.risk}
                      </p>
                    </div>
                  </div>

                  <button
                    className={`copy-button w-full ${followingWallets.includes(wallet.address) ? "bg-green-500" : ""} ${!followingWallets.includes(wallet.address) ? "pulse" : ""}`}
                    onClick={() => toggleFollow(wallet.address)}
                  >
                    {followingWallets.includes(wallet.address) ? <>Following</> : <>Copy This Wallet</>}
                  </button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="trending">
          <div className="bg-card rounded-lg border border-border/50 p-8 text-center">
            <p className="text-muted-foreground">Trending wallets loading...</p>
          </div>
        </TabsContent>

        <TabsContent value="safe">
          <div className="bg-card rounded-lg border border-border/50 p-8 text-center">
            <p className="text-muted-foreground">Safest wallets loading...</p>
          </div>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>How Copy Trading Works</CardTitle>
          <CardDescription>Trady automatically mirrors trades from wallets you follow</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-muted/20 p-4 rounded-lg">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mb-3">1</div>
              <h3 className="font-bold mb-2">Choose Wallets</h3>
              <p className="text-sm text-muted-foreground">
                Select from our curated list of top-performing wallets with proven track records.
              </p>
            </div>
            <div className="bg-muted/20 p-4 rounded-lg">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mb-3">2</div>
              <h3 className="font-bold mb-2">Set Parameters</h3>
              <p className="text-sm text-muted-foreground">
                Customize your risk level, maximum allocation per trade, and other settings.
              </p>
            </div>
            <div className="bg-muted/20 p-4 rounded-lg">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mb-3">3</div>
              <h3 className="font-bold mb-2">Auto-Execute</h3>
              <p className="text-sm text-muted-foreground">
                Trady automatically executes trades when your followed wallets make moves.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
