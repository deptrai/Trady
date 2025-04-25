"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, Send } from "lucide-react"
import Link from "next/link"

export default function ChatPage() {
  const [message, setMessage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Token Chat</h1>
        <p className="text-muted-foreground">Chat with traders live during swaps. Know the vibe before you dive.</p>
      </div>

      <div className="relative mb-8">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search token chats..."
          className="pl-9"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Link href="/app/chat/sol">
          <Card className="hover:border-primary/50 transition-colors h-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">S</div>
                  <CardTitle>SOL</CardTitle>
                </div>
                <div className="bg-green-500/10 text-green-500 text-xs px-2 py-1 rounded-full">Active</div>
              </div>
              <CardDescription>1,245 traders online</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">Latest: "Huge buy wall at $140, looking bullish!"</div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/app/chat/bonk">
          <Card className="hover:border-primary/50 transition-colors h-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">B</div>
                  <CardTitle>BONK</CardTitle>
                </div>
                <div className="bg-green-500/10 text-green-500 text-xs px-2 py-1 rounded-full">Active</div>
              </div>
              <CardDescription>872 traders online</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                Latest: "Whale just bought 2B tokens, something brewing?"
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/app/chat/jto">
          <Card className="hover:border-primary/50 transition-colors h-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">J</div>
                  <CardTitle>JTO</CardTitle>
                </div>
                <div className="bg-green-500/10 text-green-500 text-xs px-2 py-1 rounded-full">Active</div>
              </div>
              <CardDescription>543 traders online</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">Latest: "New partnership announcement coming soon!"</div>
            </CardContent>
          </Card>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">S</div>
              <CardTitle>SOL Chat</CardTitle>
            </div>
            <div className="bg-green-500/10 text-green-500 text-xs px-2 py-1 rounded-full">1,245 online</div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="chat-window">
            {[
              { user: "Trader123", message: "SOL looking strong today!", time: "12:05 PM", sent: false },
              {
                user: "CryptoWhale",
                message: "Huge buy wall at $140, looking bullish!",
                time: "12:08 PM",
                sent: false,
              },
              {
                user: "SolanaFan",
                message: "Anyone else watching the BTC correlation?",
                time: "12:10 PM",
                sent: false,
              },
              { user: "DeFiDegen", message: "Just aped in another 10 SOL", time: "12:12 PM", sent: false },
              { user: "BlockchainDev", message: "New TPS record on mainnet today", time: "12:15 PM", sent: false },
              { user: "MoonBoi", message: "We're going to $200 EOW", time: "12:18 PM", sent: false },
              { user: "TradingPro", message: "Support at $138 is holding well", time: "12:20 PM", sent: false },
              { user: "SolTrader", message: "Volume picking up in the last hour", time: "12:22 PM", sent: false },
              { user: "CryptoCat", message: "Any news on the upcoming upgrade?", time: "12:25 PM", sent: false },
              { user: "You", message: "Not selling until $500", time: "12:28 PM", sent: true },
            ].map((message, i) => (
              <div key={i} className={`message ${message.sent ? "sent" : "received"}`}>
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs">
                    {message.user.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{message.user}</span>
                      <span className="text-xs text-muted-foreground">{message.time}</span>
                    </div>
                    <p className="text-sm">{message.message}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-2 mt-4">
            <Input placeholder="Type your message..." value={message} onChange={(e) => setMessage(e.target.value)} />
            <button className="btn-gradient p-2 rounded-lg">
              <Send className="h-4 w-4" />
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
