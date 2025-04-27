"use client"

import React from "react"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { fetchSolPrice, fetchSupplyInfo, fetchEpochInfo } from "@/lib/helius"
import { Zap, Database, Layers, Coins } from "lucide-react"

// Cache constants
const CACHE_KEY = "network-stats-cache"
const CACHE_EXPIRY = 2 * 60 * 1000 // 2 minutes

// Get data from cache
function getFromCache() {
  if (typeof window === "undefined") return null

  try {
    const cachedData = localStorage.getItem(CACHE_KEY)
    if (!cachedData) return null

    const { data, timestamp } = JSON.parse(cachedData)
    if (Date.now() - timestamp > CACHE_EXPIRY) return null

    return data
  } catch (error) {
    console.error("Error reading from cache:", error)
    return null
  }
}

// Save data to cache
function saveToCache(data) {
  if (typeof window === "undefined") return

  try {
    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({
        data,
        timestamp: Date.now(),
      }),
    )
  } catch (error) {
    console.error("Error saving to cache:", error)
  }
}

export function NetworkStats() {
  // Default values
  const defaultSolPrice = 150 // Approximate SOL price
  const defaultSupplyInfo = { total: 555000000, circulating: 410000000 }
  const defaultEpochInfo = { epoch: 420, slotIndex: 432000, slotsInEpoch: 864000 }

  const [solPrice, setSolPrice] = useState<number>(defaultSolPrice)
  const [supplyInfo, setSupplyInfo] = useState<{ total: number; circulating: number }>(defaultSupplyInfo)
  const [epochInfo, setEpochInfo] = useState<{ epoch: number; slotIndex: number; slotsInEpoch: number }>(
    defaultEpochInfo,
  )
  const [loading, setLoading] = useState(true)

  // Initial load from cache
  const initialLoadRef = useRef(false)

  useEffect(() => {
    if (initialLoadRef.current) return
    initialLoadRef.current = true

    // Load from cache
    const cachedData = getFromCache()
    if (cachedData) {
      setSolPrice(cachedData.solPrice)
      setSupplyInfo(cachedData.supplyInfo)
      setEpochInfo(cachedData.epochInfo)
      setLoading(false)
    }

    // Data fetching function
    const fetchData = async () => {
      try {
        // Fetch all data in parallel
        const [priceResult, supplyResult, epochResult] = await Promise.allSettled([
          fetchSolPrice(),
          fetchSupplyInfo(),
          fetchEpochInfo(),
        ])

        // Process results
        const newData = {
          solPrice: priceResult.status === "fulfilled" ? priceResult.value : defaultSolPrice,
          supplyInfo: supplyResult.status === "fulfilled" ? supplyResult.value : defaultSupplyInfo,
          epochInfo: epochResult.status === "fulfilled" ? epochResult.value : defaultEpochInfo,
        }

        // Update state
        setSolPrice(newData.solPrice)
        setSupplyInfo(newData.supplyInfo)
        setEpochInfo(newData.epochInfo)

        // Save to cache
        saveToCache(newData)
      } catch (error) {
        console.error("Error fetching network stats:", error)
      } finally {
        setLoading(false)
      }
    }

    // Fetch data
    fetchData()

    // Update every minute
    const interval = setInterval(fetchData, 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  const epochProgress = Math.round((epochInfo.slotIndex / epochInfo.slotsInEpoch) * 100) || 0

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
      <StatItem
        icon={<Coins className="h-5 w-5 text-cyber-purple" />}
        label="SOL Price"
        value={`$${solPrice.toFixed(2)}`}
        loading={loading}
        color="purple"
      />

      <StatItem
        icon={<Zap className="h-5 w-5 text-cyber-teal" />}
        label="SOL Supply"
        value={`${supplyInfo.total.toLocaleString()} SOL`}
        subValue={`Circulating: ${supplyInfo.circulating.toLocaleString()} SOL`}
        loading={loading}
        color="teal"
      />

      <StatItem
        icon={<Layers className="h-5 w-5 text-cyber-pink" />}
        label="Epoch"
        value={epochInfo.epoch.toString()}
        subValue={`Progress: ${epochProgress}%`}
        loading={loading}
        color="pink"
      />

      <StatItem
        icon={<Database className="h-5 w-5 text-cyber-purple" />}
        label="Network"
        value="Mainnet"
        subValue="Solana Blockchain"
        loading={false} // Always false as this is static info
        color="purple"
      />
    </div>
  )
}

interface StatItemProps {
  icon: React.ReactNode
  label: string
  value: string
  subValue?: string
  loading: boolean
  color: "purple" | "teal" | "pink"
}

// Use React.memo to prevent unnecessary re-renders
const StatItem = React.memo(function StatItem({ icon, label, value, subValue, loading, color }: StatItemProps) {
  const colorClasses = {
    purple: "from-cyber-purple/10 to-transparent border-cyber-purple/30 hover:border-cyber-purple/50",
    teal: "from-cyber-teal/10 to-transparent border-cyber-teal/30 hover:border-cyber-teal/50",
    pink: "from-cyber-pink/10 to-transparent border-cyber-pink/30 hover:border-cyber-pink/50",
  }

  return (
    <Card
      className={`cyber-border bg-gradient-to-br ${colorClasses[color]} transition-all duration-300 hover:shadow-lg hover:shadow-${color === "purple" ? "cyber-purple" : color === "teal" ? "cyber-teal" : "cyber-pink"}/5`}
    >
      <CardContent className="p-4">
        <div className="flex items-center mb-2">
          {icon}
          <span className="text-xs text-muted-foreground ml-2">{label}</span>
        </div>
        {loading ? (
          <div className="h-6 bg-cyber-dark/50 rounded animate-pulse"></div>
        ) : (
          <div className="text-xl font-bold font-orbitron">{value}</div>
        )}
        {subValue && <div className="text-xs text-muted-foreground mt-1">{subValue}</div>}
      </CardContent>
    </Card>
  )
})
