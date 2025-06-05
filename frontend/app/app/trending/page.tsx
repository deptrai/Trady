"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowUpRight, Search, Zap, AlertTriangle, Loader2 } from "lucide-react"
import Link from "next/link"
import { getTrendingTokens } from "@/lib/services/explorer"

// Định nghĩa kiểu dữ liệu cho token
type Token = {
  name: string;
  price: string;
  change: string;
  positive: boolean;
  volume: string;
  isRealData?: boolean;
}

export default function TrendingPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [timeframe, setTimeframe] = useState<"1h" | "24h" | "7d">("24h")
  const [trendingTokens, setTrendingTokens] = useState<Token[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // Lấy dữ liệu token trending theo khung thời gian
  useEffect(() => {
    async function fetchTrendingTokens() {
      setLoading(true)
      setError(null)
      
      try {
        const tokens = await getTrendingTokens(timeframe)
        
        if (tokens && tokens.length > 0) {
          // Chuyển đổi dữ liệu từ API sang định dạng UI
          const formattedTokens: Token[] = tokens.map(token => ({
            name: token.name || token.symbol || "Unknown",
            price: `$${parseFloat(token.price).toFixed(token.price < 0.01 ? 8 : 2)}`,
            change: `${token.priceChange >= 0 ? '+' : ''}${token.priceChange.toFixed(1)}%`,
            positive: token.priceChange >= 0,
            volume: `$${(token.volume / 1000000).toFixed(1)}M`,
            isRealData: token.isRealData || false
          }))
          
          setTrendingTokens(formattedTokens)
        } else {
          // Nếu API trả về mảng rỗng hoặc null, sử dụng dữ liệu mẫu
          setTrendingTokens([
            { name: "SOL", price: "$142.58", change: "+5.2%", positive: true, volume: "$24.5M" },
            { name: "BONK", price: "$0.00002341", change: "+12.8%", positive: true, volume: "$8.2M" },
            { name: "JTO", price: "$3.87", change: "-2.1%", positive: false, volume: "$5.7M" },
            { name: "PYTH", price: "$0.58", change: "+8.4%", positive: true, volume: "$3.9M" },
            { name: "RNDR", price: "$7.21", change: "-0.5%", positive: false, volume: "$2.8M" },
          ])
          setError("Không thể lấy dữ liệu token trending thật. Hiển thị dữ liệu mẫu.")
        }
      } catch (err: any) {
        console.error("Lỗi khi lấy dữ liệu token trending:", err)
        // Fallback to sample data
        setTrendingTokens([
          { name: "SOL", price: "$142.58", change: "+5.2%", positive: true, volume: "$24.5M" },
          { name: "BONK", price: "$0.00002341", change: "+12.8%", positive: true, volume: "$8.2M" },
          { name: "JTO", price: "$3.87", change: "-2.1%", positive: false, volume: "$5.7M" },
          { name: "PYTH", price: "$0.58", change: "+8.4%", positive: true, volume: "$3.9M" },
          { name: "RNDR", price: "$7.21", change: "-0.5%", positive: false, volume: "$2.8M" },
        ])
        setError(`Lỗi khi lấy dữ liệu token trending: ${err.message || 'Không xác định'}`)
      } finally {
        setLoading(false)
      }
    }
    
    fetchTrendingTokens()
  }, [timeframe])
  
  // Lọc tokens theo từ khóa tìm kiếm
  const filteredTokens = trendingTokens.filter(token => 
    token.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

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

        <Tabs 
          defaultValue="24h" 
          className="w-full md:w-auto"
          onValueChange={(value) => setTimeframe(value as "1h" | "24h" | "7d")}
        >
          <TabsList>
            <TabsTrigger value="1h">1H</TabsTrigger>
            <TabsTrigger value="24h">24H</TabsTrigger>
            <TabsTrigger value="7d">7D</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Hiển thị thông báo loading/lỗi */}
      {loading && (
        <div className="flex items-center justify-center py-10">
          <Loader2 className="h-6 w-6 animate-spin mr-2 text-primary" />
          <p>Đang tải dữ liệu token trending...</p>
        </div>
      )}
      
      {error && !loading && (
        <div className="flex items-center mb-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-md">
          <AlertTriangle className="h-4 w-4 text-yellow-500 mr-2" />
          <p className="text-sm">{error}</p>
        </div>
      )}
      
      {/* Grid hiển thị token trending */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {filteredTokens.slice(0, 3).map((token, index) => (
          <Card key={index} className="trending-card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                {token.name.charAt(0)}
              </div>
              <div>
                <p className="font-medium">{token.name}</p>
                <div className="flex items-center gap-2">
                  <p className={`text-xs ${token.positive ? "text-green-500" : "text-red-500"}`}>
                    {token.change}
                  </p>
                  <p className="text-xs text-muted-foreground">{token.price}</p>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="font-medium">{token.volume}</p>
              <p className="text-xs text-muted-foreground">Volume ({timeframe})</p>
            </div>
          </Card>
        ))}
      </div>

      <Tabs 
        defaultValue="24h" 
        className="w-full"
        value={timeframe}
        onValueChange={(value) => setTimeframe(value as "1h" | "24h" | "7d")}
      >
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
