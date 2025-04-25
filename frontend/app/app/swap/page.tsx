"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowDown, ChevronDown, Info, Settings, Zap, RefreshCw, TrendingUp } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useWallet } from "@/contexts/wallet-context"
import { useToast } from "@/hooks/use-toast"

export default function SwapPage() {
  // Token state
  const [fromToken, setFromToken] = useState({ symbol: "SOL", name: "Solana", balance: "12.45", icon: "S" })
  const [toToken, setToToken] = useState({ symbol: "BONK", name: "Bonk", balance: "1,245,678", icon: "B" })
  const [fromAmount, setFromAmount] = useState("1")
  const [toAmount, setToAmount] = useState("42,568")
  const [slippage, setSlippage] = useState("0.5")

  // UI state
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  // Recent swaps
  const [recentSwaps, setRecentSwaps] = useState([
    { from: "SOL", to: "BONK", amount: "1.2", value: "$172", time: "2 mins ago" },
    { from: "BONK", to: "JTO", amount: "50,000", value: "$12", time: "15 mins ago" },
  ])

  const router = useRouter()
  const { wallet, isLocked } = useWallet()
  const { toast } = useToast()

  // Redirect to create wallet page if no wallet exists or is locked
  useEffect(() => {
    if (!wallet || isLocked) {
      router.push("/create")
    }
  }, [wallet, isLocked, router])

  // Update toAmount when fromAmount changes
  useEffect(() => {
    if (fromToken.symbol === "SOL" && toToken.symbol === "BONK") {
      setToAmount((Number(fromAmount) * 42568).toLocaleString())
    } else if (fromToken.symbol === "BONK" && toToken.symbol === "SOL") {
      setToAmount((Number(fromAmount) / 42568).toFixed(8))
    } else {
      // Random calculation for other pairs
      const randomFactor = Math.random() * 10 + 0.1
      setToAmount((Number(fromAmount) * randomFactor).toLocaleString())
    }
  }, [fromAmount, fromToken, toToken])

  const handleSwap = () => {
    setIsLoading(true)

    // Simulate swap process
    setTimeout(() => {
      setIsLoading(false)
      setShowConfetti(true)

      // Add to recent swaps
      setRecentSwaps([
        {
          from: fromToken.symbol,
          to: toToken.symbol,
          amount: fromAmount,
          value: `$${(Number.parseFloat(fromAmount.replace(/,/g, "")) * 142).toFixed(2)}`,
          time: "just now",
        },
        ...recentSwaps.slice(0, 4),
      ])

      toast({
        title: "Swap successful!",
        description: `Successfully swapped ${fromAmount} ${fromToken.symbol} to ${toAmount} ${toToken.symbol}`,
      })

      // Reset animations after delay
      setTimeout(() => {
        setShowConfetti(false)
      }, 3000)
    }, 1500)
  }

  const switchTokens = () => {
    setFromToken(toToken)
    setToToken(fromToken)
    setFromAmount(toAmount)
    setToAmount(fromAmount)
  }

  // If no wallet or wallet is locked, show loading state
  if (!wallet || isLocked) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Swap Tokens Instantly</h1>
        <p className="text-muted-foreground">Trade tokens with style. Fast, secure, and simple.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card className="overflow-hidden border-primary/20 bg-card/80 backdrop-blur-sm">
              <CardHeader className="bg-muted/20">
                <div className="flex items-center justify-between">
                  <CardTitle>Swap</CardTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                    className="rounded-full hover:bg-muted/50"
                  >
                    <Settings size={18} />
                  </Button>
                </div>
                <CardDescription>Trade tokens in an instant</CardDescription>
              </CardHeader>

              <CardContent className="p-6">
                <AnimatePresence>
                  {isSettingsOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="mb-4 overflow-hidden"
                    >
                      <div className="bg-muted/30 rounded-lg p-4 mb-4">
                        <h3 className="font-medium mb-2">Slippage Tolerance</h3>
                        <div className="flex items-center gap-2">
                          <Button
                            variant={slippage === "0.1" ? "default" : "outline"}
                            size="sm"
                            onClick={() => setSlippage("0.1")}
                            className={slippage === "0.1" ? "bg-primary text-primary-foreground" : ""}
                          >
                            0.1%
                          </Button>
                          <Button
                            variant={slippage === "0.5" ? "default" : "outline"}
                            size="sm"
                            onClick={() => setSlippage("0.5")}
                            className={slippage === "0.5" ? "bg-primary text-primary-foreground" : ""}
                          >
                            0.5%
                          </Button>
                          <Button
                            variant={slippage === "1" ? "default" : "outline"}
                            size="sm"
                            onClick={() => setSlippage("1")}
                            className={slippage === "1" ? "bg-primary text-primary-foreground" : ""}
                          >
                            1.0%
                          </Button>
                          <div className="flex items-center gap-2 ml-2">
                            <Input
                              type="text"
                              value={slippage}
                              onChange={(e) => setSlippage(e.target.value)}
                              className="w-16 h-8 text-sm"
                            />
                            <span className="text-sm">%</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* From Token */}
                <div className="mb-2">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span>From</span>
                    <span className="text-muted-foreground">
                      Balance: {fromToken.balance} {fromToken.symbol}
                    </span>
                  </div>
                  <div className="bg-muted/30 rounded-lg p-4 flex items-center justify-between">
                    <Input
                      type="text"
                      value={fromAmount}
                      onChange={(e) => setFromAmount(e.target.value)}
                      className="border-0 bg-transparent text-lg p-0 h-auto focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                    <motion.button
                      className="token-select flex items-center gap-2 bg-muted/50 rounded-lg px-3 py-2"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                        {fromToken.icon}
                      </div>
                      <span>{fromToken.symbol}</span>
                      <ChevronDown size={16} />
                    </motion.button>
                  </div>
                </div>

                {/* Swap Direction Button */}
                <div className="flex justify-center my-3">
                  <motion.button
                    className="w-10 h-10 rounded-full bg-muted/50 flex items-center justify-center hover:bg-muted/80 transition-all"
                    onClick={switchTokens}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ArrowDown size={18} />
                  </motion.button>
                </div>

                {/* To Token */}
                <div className="mb-6">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span>To</span>
                    <span className="text-muted-foreground">
                      Balance: {toToken.balance} {toToken.symbol}
                    </span>
                  </div>
                  <div className="bg-muted/30 rounded-lg p-4 flex items-center justify-between">
                    <Input
                      type="text"
                      value={toAmount}
                      readOnly
                      className="border-0 bg-transparent text-lg p-0 h-auto focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                    <motion.button
                      className="token-select flex items-center gap-2 bg-muted/50 rounded-lg px-3 py-2"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center">
                        {toToken.icon}
                      </div>
                      <span>{toToken.symbol}</span>
                      <ChevronDown size={16} />
                    </motion.button>
                  </div>
                </div>

                {/* Route Preview */}
                <div className="bg-muted/30 p-4 rounded-lg mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm">Route</span>
                    <div className="flex items-center gap-1 text-primary text-sm">
                      <Zap size={14} />
                      <span>Best price</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs">
                      {fromToken.symbol.charAt(0)}
                    </div>
                    <span className="text-muted-foreground">→</span>
                    <div className="w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center text-xs">
                      {toToken.symbol.charAt(0)}
                    </div>
                    <span className="text-xs text-muted-foreground ml-2">via Jupiter</span>
                    <div className="ml-auto flex items-center gap-1 text-xs text-green-500">
                      <RefreshCw size={12} />
                      <span>Refreshed 5s ago</span>
                    </div>
                  </div>
                </div>

                {/* Price Info */}
                <div className="text-sm text-muted-foreground mb-6 space-y-2">
                  <div className="flex items-center justify-between">
                    <span>Price</span>
                    <span>
                      1 {fromToken.symbol} = {fromToken.symbol === "SOL" ? "42,568" : "0.00002349"} {toToken.symbol}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Minimum received</span>
                    <span>
                      {(Number(toAmount.replace(/,/g, "")) * 0.995).toLocaleString()} {toToken.symbol}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1">
                      Price Impact <Info size={12} />
                    </span>
                    <span className="text-green-500">0.05%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Network Fee</span>
                    <span>~0.000005 SOL</span>
                  </div>
                </div>

                {/* Swap Button */}
                <motion.button
                  className="w-full btn-gradient py-3 relative overflow-hidden"
                  onClick={handleSwap}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <RefreshCw size={18} className="animate-spin mr-2" />
                      <span>Swapping...</span>
                    </div>
                  ) : (
                    <span>Swap Now</span>
                  )}

                  {showConfetti && (
                    <div className="confetti-container">
                      {[...Array(30)].map((_, i) => (
                        <div
                          key={i}
                          className="confetti"
                          style={{
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 0.5}s`,
                            backgroundColor: `hsl(${Math.random() * 360}, 100%, 50%)`,
                          }}
                        />
                      ))}
                    </div>
                  )}
                </motion.button>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="border-primary/20 bg-card/80 backdrop-blur-sm h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp size={18} className="text-primary" />
                  Recent Swaps
                </CardTitle>
                <CardDescription>Latest transactions on Trady</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentSwaps.map((swap, i) => (
                    <motion.div
                      key={i}
                      initial={i === 0 && swap.time === "just now" ? { opacity: 0, y: -20 } : {}}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-muted/30 rounded-lg p-3"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center">
                            <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs z-10">
                              {swap.from.charAt(0)}
                            </div>
                            <div className="w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center text-xs -ml-2">
                              {swap.to.charAt(0)}
                            </div>
                          </div>
                          <span className="text-sm font-medium">
                            {swap.from} → {swap.to}
                          </span>
                        </div>
                        <span className="text-xs text-muted-foreground">{swap.time}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>
                          {swap.amount} {swap.from}
                        </span>
                        <span className="text-green-500">{swap.value}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t border-border/40">
                  <h3 className="text-sm font-medium mb-2">Market Overview</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">24h Volume</span>
                      <span>$1.24M</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Total Swaps</span>
                      <span>5,432</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Active Traders</span>
                      <span>842</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
