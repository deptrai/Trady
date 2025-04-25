"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowUpRight, Search, Zap } from "lucide-react"
import Link from "next/link"

export default function TrendingPage() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">What's Pumping Now?</h1>
        <p className="text-muted-foreground">Discover the hottest tokens on Solana based on real trading activity.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tokens..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Tabs defaultValue="1h" className="w-full md:w-auto">
          <TabsList>
            <TabsTrigger value="1h">1H</TabsTrigger>
            <TabsTrigger value="24h">24H</TabsTrigger>
            <TabsTrigger value="7d">7D</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="trending-card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">S</div>
            <div>
              <p className="font-medium">SOL</p>
              <div className="flex items-center gap-2">
                <p className="text-xs text-green-500">+5.2%</p>
                <p className="text-xs text-muted-foreground">$142.58</p>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="font-medium">$24.5M</p>
            <p className="text-xs text-muted-foreground">Volume (1h)</p>
          </div>
        </Card>

        <Card className="trending-card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center">B</div>
            <div>
              <p className="font-medium">BONK</p>
              <div className="flex items-center gap-2">
                <p className="text-xs text-green-500">+42.3%</p>
                <p className="text-xs text-muted-foreground">$0.00002341</p>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="font-medium">$8.2M</p>
            <p className="text-xs text-muted-foreground">Volume (1h)</p>
          </div>
        </Card>

        <Card className="trending-card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-tertiary/20 flex items-center justify-center">J</div>
            <div>
              <p className="font-medium">JTO</p>
              <div className="flex items-center gap-2">
                <p className="text-xs text-red-500">-2.1%</p>
                <p className="text-xs text-muted-foreground">$3.87</p>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="font-medium">$5.7M</p>
            <p className="text-xs text-muted-foreground">Volume (1h)</p>
          </div>
        </Card>
      </div>

      <Tabs defaultValue="1h" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="1h">1H</TabsTrigger>
          <TabsTrigger value="24h">24H</TabsTrigger>
          <TabsTrigger value="7d">7D</TabsTrigger>
        </TabsList>

        <TabsContent value="1h">
          <div className="bg-card rounded-lg border border-border/50 overflow-hidden">
            <div className="grid grid-cols-7 gap-4 p-4 border-b border-border/50 bg-muted/30">
              <div className="col-span-2 font-medium">Token</div>
              <div className="text-right font-medium">Price</div>
              <div className="text-right font-medium">1h Change</div>
              <div className="text-right font-medium">Volume</div>
              <div className="text-right font-medium">Swaps</div>
              <div className="text-right font-medium">Action</div>
            </div>

            {[
              { name: "SOL", price: "$142.58", change: "+5.2%", volume: "$24.5M", swaps: "450", positive: true },
              { name: "BONK", price: "$0.00002341", change: "+42.3%", volume: "$8.2M", swaps: "1,245", positive: true },
              { name: "JTO", price: "$3.87", change: "-2.1%", volume: "$5.7M", swaps: "324", positive: false },
              { name: "PYTH", price: "$0.58", change: "+8.4%", volume: "$4.2M", swaps: "287", positive: true },
              { name: "RNDR", price: "$7.21", change: "-0.5%", volume: "$3.8M", swaps: "156", positive: false },
              { name: "BOME", price: "$0.0183", change: "+18.7%", volume: "$3.5M", swaps: "432", positive: true },
              { name: "MNGO", price: "$0.0421", change: "+3.2%", volume: "$2.9M", swaps: "198", positive: true },
              { name: "MEAN", price: "$0.0752", change: "-1.8%", volume: "$2.4M", swaps: "143", positive: false },
              { name: "DUST", price: "$1.24", change: "+0.7%", volume: "$2.1M", swaps: "87", positive: true },
              { name: "HADES", price: "$0.0034", change: "+28.5%", volume: "$1.8M", swaps: "356", positive: true },
            ].map((token, i) => (
              <div
                key={i}
                className="grid grid-cols-7 gap-4 p-4 border-b border-border/50 hover:bg-muted/20 transition-colors"
              >
                <div className="col-span-2 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                    {token.name.charAt(0)}
                  </div>
                  <span>{token.name}</span>
                </div>
                <div className="text-right">{token.price}</div>
                <div className={`text-right ${token.positive ? "text-green-500" : "text-red-500"}`}>{token.change}</div>
                <div className="text-right">{token.volume}</div>
                <div className="text-right">{token.swaps}</div>
                <div className="text-right">
                  <button className="btn-gradient text-xs px-3 py-1">
                    <Zap className="h-3 w-3 mr-1 inline" /> Snipe
                  </button>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="24h">
          <div className="bg-card rounded-lg border border-border/50 p-8 text-center">
            <p className="text-muted-foreground">24 hour data loading...</p>
          </div>
        </TabsContent>

        <TabsContent value="7d">
          <div className="bg-card rounded-lg border border-border/50 p-8 text-center">
            <p className="text-muted-foreground">7 day data loading...</p>
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-8 text-center">
        <Link href="/app/chat">
          <button className="bg-transparent border border-primary/50 text-primary font-bold rounded-lg px-4 py-2 transition-all duration-300 hover:bg-primary/10">
            Join Token Chat Rooms <ArrowUpRight className="ml-2 h-4 w-4 inline" />
          </button>
        </Link>
      </div>
    </div>
  )
}
