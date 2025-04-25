"use client"

import { Bell, Copy, TrendingUp, Zap } from "lucide-react"
import { useState, useEffect } from "react"

export function RightPanel() {
  const [notifications, setNotifications] = useState([
    { type: "copy", message: "Wallet 0xAb3...c7F just copied 3 traders", time: "2m ago" },
    { type: "trending", message: "BONK volume up 12% in the last hour", time: "15m ago" },
    { type: "alert", message: "New trending token: MEME", time: "32m ago" },
    { type: "copy", message: "You're now following wallet 0xDe7...f9B", time: "1h ago" },
    { type: "alert", message: "Whale alert: 50,000 SOL moved", time: "2h ago" },
  ])

  useEffect(() => {
    // Simulate new notifications
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const newNotifications = [
          {
            type: "copy",
            message: "Wallet 0x" + Math.random().toString(16).substring(2, 6) + " started copying",
            time: "just now",
          },
          { type: "trending", message: "JTO up 5% in the last 10 minutes", time: "just now" },
          { type: "alert", message: "New whale transaction detected", time: "just now" },
        ]

        const randomNotification = newNotifications[Math.floor(Math.random() * newNotifications.length)]
        setNotifications((prev) => [randomNotification, ...prev.slice(0, 9)])
      }
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="right-panel">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold">Activity Feed</h3>
        <Bell size={16} />
      </div>

      <div className="space-y-3">
        {notifications.map((notification, index) => (
          <div key={index} className="p-3 bg-muted/20 rounded-lg text-sm">
            <div className="flex items-center gap-2 mb-1">
              {notification.type === "copy" && <Copy size={14} className="text-primary" />}
              {notification.type === "trending" && <TrendingUp size={14} className="text-secondary" />}
              {notification.type === "alert" && <Zap size={14} className="text-tertiary" />}
              <span className="text-xs text-muted-foreground">{notification.time}</span>
            </div>
            <p>{notification.message}</p>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <h3 className="font-bold mb-3">Top Wallets</h3>

        <div className="space-y-2">
          {[
            { address: "0xAb3...c7F", roi: "+142%", followers: 1243 },
            { address: "0xDe7...f9B", roi: "+87%", followers: 876 },
            { address: "0x58F...e2A", roi: "+65%", followers: 512 },
          ].map((wallet, index) => (
            <div key={index} className="p-2 bg-muted/20 rounded-lg text-sm flex items-center justify-between">
              <div>
                <p className="font-mono">{wallet.address}</p>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-green-500">{wallet.roi}</span>
                  <span className="text-xs text-muted-foreground">{wallet.followers} followers</span>
                </div>
              </div>
              <button className="copy-button text-xs px-2 py-1">Copy</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
