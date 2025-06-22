"use client"

import { useEffect, useState } from "react"
import { TrendingUp, Users, Zap } from "lucide-react"

export function LiveStatsBar() {
  const [walletCount, setWalletCount] = useState(1245)
  const [volume, setVolume] = useState(345)
  const [trendingCount, setTrendingCount] = useState(22)
  const [notification, setNotification] = useState<string | null>(null)

  useEffect(() => {
    // Simulate live updates
    const walletInterval = setInterval(() => {
      setWalletCount((prev) => prev + Math.floor(Math.random() * 3) - 1)
    }, 3000)

    const volumeInterval = setInterval(() => {
      setVolume((prev) => prev + Math.floor(Math.random() * 5) - 2)
    }, 5000)

    const trendingInterval = setInterval(() => {
      setTrendingCount((prev) => {
        const change = Math.random() > 0.7 ? (Math.random() > 0.5 ? 1 : -1) : 0
        return Math.max(10, prev + change)
      })
    }, 10000)

    // Simulate notifications
    const notifications = [
      "Wallet 0xAb3...c7F just copied 3 traders",
      "BONK volume up 12% in the last hour",
      "New trending token: MEME",
      "Whale alert: 50,000 SOL moved",
      "Top trader made +32% on JTO",
    ]

    const notificationInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        const randomNotification = notifications[Math.floor(Math.random() * notifications.length)]
        setNotification(randomNotification)

        // Clear notification after 5 seconds
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      }
    }, 8000)

    return () => {
      clearInterval(walletInterval)
      clearInterval(volumeInterval)
      clearInterval(trendingInterval)
      clearInterval(notificationInterval)
    }
  }, [])

  return (
    <>
      <div className="live-stats-bar">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-primary" />
            <span>{walletCount} copying</span>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-secondary" />
            <span>${volume}K volume (24h)</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-tertiary" />
            <span>{trendingCount} trending tokens</span>
          </div>
        </div>
        <div className="text-xs text-muted-foreground hidden md:block">Powered by Chain Lens Protocol</div>
      </div>

      {notification && (
        <div className={`notification ${notification ? "visible" : "hidden"}`}>
          <Zap className="h-4 w-4 text-primary" />
          <span>{notification}</span>
        </div>
      )}
    </>
  )
}
