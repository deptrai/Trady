"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, Search, Shield, TrendingUp } from "lucide-react"
import Link from "next/link"

export default function LeaderboardPage() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Top Copy Traders</h1>
        <p className="text-muted-foreground">Find and copy the most successful wallets on Solana.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search wallets..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Tabs defaultValue="30d" className="w-full md:w-auto">
          <TabsList>
            <TabsTrigger value="7d">7D</TabsTrigger>
            <TabsTrigger value="30d">30D</TabsTrigger>
            <TabsTrigger value="all">All Time</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[
          {
            rank: 1,
            address: "0xAb3...c7F",
            roi: "+142.5%",
            followers: "1.2K",
            trades: 87,
            winRate: "78%",
            risk: "Low",
          },
          {
            rank: 2,
            address: "0xDe7...f9B",
            roi: "+87.3%",
            followers: "843",
            trades: 124,
            winRate: "72%",
            risk: "Medium",
          },
          { rank: 3, address: "0x58F...e2A", roi: "+65.8%", followers: "512", trades: 56, winRate: "82%", risk: "Low" },
        ].map((wallet, i) => (
          <Card key={i} className="leaderboard-entry">
            <CardContent className="p-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center font-bold">
                    {wallet.rank}
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
                <button className="copy-button pulse">
                  <Copy className="h-3 w-3 mr-1 inline" /> Copy
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="30d" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="7d">7D</TabsTrigger>
          <TabsTrigger value="30d">30D</TabsTrigger>
          <TabsTrigger value="all">All Time</TabsTrigger>
        </TabsList>

        <TabsContent value="30d">
          <div className="bg-card rounded-lg border border-border/50 overflow-hidden">
            <div className="grid grid-cols-7 gap-4 p-4 border-b border-border/50 bg-muted/30">
              <div className="font-medium">Rank</div>
              <div className="col-span-2 font-medium">Wallet</div>
              <div className="text-right font-medium">30d ROI</div>
              <div className="text-right font-medium">Win Rate</div>
              <div className="text-right font-medium">Followers</div>
              <div className="text-right font-medium">Action</div>
            </div>

            {[
              { rank: 1, address: "0xAb3...c7F", roi: "+142.5%", followers: "1.2K", winRate: "78%" },
              { rank: 2, address: "0xDe7...f9B", roi: "+87.3%", followers: "843", winRate: "72%" },
              { rank: 3, address: "0x58F...e2A", roi: "+65.8%", followers: "512", winRate: "82%" },
              { rank: 4, address: "0x91C...j7Y", roi: "+52.1%", followers: "378", winRate: "68%" },
              { rank: 5, address: "0xF3P...s9W", roi: "+48.7%", followers: "256", winRate: "75%" },
              { rank: 6, address: "0xK7L...r2P", roi: "+43.2%", followers: "187", winRate: "71%" },
              { rank: 7, address: "0xZ5M...t8N", roi: "+38.9%", followers: "142", winRate: "69%" },
              { rank: 8, address: "0xQ2B...h6G", roi: "+36.4%", followers: "118", winRate: "73%" },
              { rank: 9, address: "0xF9D...k4H", roi: "+32.8%", followers: "95", winRate: "67%" },
              { rank: 10, address: "0xY1C...j3R", roi: "+29.5%", followers: "82", winRate: "70%" },
            ].map((wallet, i) => (
              <div
                key={i}
                className="grid grid-cols-7 gap-4 p-4 border-b border-border/50 hover:bg-muted/20 transition-colors"
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs">
                    {wallet.rank}
                  </div>
                </div>
                <div className="col-span-2 flex items-center">
                  <span className="font-mono">{wallet.address}</span>
                </div>
                <div className="text-right text-green-500">{wallet.roi}</div>
                <div className="text-right">{wallet.winRate}</div>
                <div className="text-right">{wallet.followers}</div>
                <div className="text-right">
                  <button className="copy-button">
                    <Copy className="h-3 w-3 mr-1 inline" /> Copy
                  </button>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="7d">
          <div className="bg-card rounded-lg border border-border/50 p-8 text-center">
            <p className="text-muted-foreground">7 day data loading...</p>
          </div>
        </TabsContent>

        <TabsContent value="all">
          <div className="bg-card rounded-lg border border-border/50 p-8 text-center">
            <p className="text-muted-foreground">All time data loading...</p>
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-8 text-center">
        <Link href="/app/wallets">
          <button className="bg-transparent border border-primary/50 text-primary font-bold rounded-lg px-4 py-2 transition-all duration-300 hover:bg-primary/10">
            Check Wallet Reputation <Shield className="ml-2 h-4 w-4 inline" />
          </button>
        </Link>
      </div>
    </div>
  )
}
