"use client"

import { useState, useEffect } from "react"
import { StatsCard } from "@/components/stats-card"
import { fetchSolPrice } from "@/lib/helius"
import { Coins } from "lucide-react"

export function SolPriceCard() {
  const [price, setPrice] = useState<number | null>(null)
  const [previousPrice, setPreviousPrice] = useState<number | null>(null)
  const [trend, setTrend] = useState<"up" | "down" | "neutral">("neutral")
  const [trendValue, setTrendValue] = useState<string>("0%")

  useEffect(() => {
    const getPrice = async () => {
      const newPrice = await fetchSolPrice()

      if (price !== null && newPrice !== price) {
        setPreviousPrice(price)
        const priceDiff = ((newPrice - price) / price) * 100
        setTrendValue(`${Math.abs(priceDiff).toFixed(2)}%`)
        setTrend(priceDiff > 0 ? "up" : priceDiff < 0 ? "down" : "neutral")
      }

      setPrice(newPrice)
    }

    getPrice()
    const interval = setInterval(getPrice, 60000)
    return () => clearInterval(interval)
  }, [price])

  return (
    <StatsCard
      title="SOL Price"
      value={price ? `$${price.toFixed(2)}` : "Loading..."}
      icon={<Coins className="h-4 w-4" />}
      trend={trend}
      trendValue={trendValue}
      className="bg-gradient-to-br from-cyber-dark to-cyber-dark/70"
    />
  )
}
