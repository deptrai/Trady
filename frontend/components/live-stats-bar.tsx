"use client"

import { useEffect, useState } from "react"
import { TrendingUp, Users, Zap, Clock } from "lucide-react"

export const LiveStatsBar = () => {
  const [stats, setStats] = useState({
    lastBlock: 0,
    gasPrice: 0,
    txCount: 0,
    timestamp: new Date()
  })

  useEffect(() => {
    // Simulate fetching live stats
    const fetchStats = () => {
      // In a real app, this would be an API call
      setStats({
        lastBlock: Math.floor(16000000 + Math.random() * 1000),
        gasPrice: Math.floor(20 + Math.random() * 10),
        txCount: Math.floor(1000 + Math.random() * 500),
        timestamp: new Date()
      })
    }

    fetchStats()
    const interval = setInterval(fetchStats, 10000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="w-full bg-card/60 backdrop-blur-sm border-y border-border py-2 px-4 mb-8">
      <div className="container mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-primary" />
            <span>Latest Block: </span>
            <span className="font-semibold">{stats.lastBlock.toLocaleString()}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-primary" />
            <span>Gas Price: </span>
            <span className="font-semibold">{stats.gasPrice} Gwei</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary" />
            <span>Last Updated: </span>
            <span className="font-semibold">
              {stats.timestamp.toLocaleTimeString()}
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <span>Txns (24h): </span>
            <span className="font-semibold">{stats.txCount.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// Thêm export default để tương thích với cả hai cách import
export default LiveStatsBar
