"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart2, Copy, Home, LogOut, MessageSquare, Settings, Shield, Shuffle, TrendingUp, User } from "lucide-react"
import { useState } from "react"

export function AppSidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  const isActive = (path: string) => pathname === path

  const sidebarItems = [
    { icon: <Home size={20} />, label: "Dashboard", path: "/app" },
    { icon: <Shuffle size={20} />, label: "Swap", path: "/app/swap" },
    { icon: <Copy size={20} />, label: "CopySwap", path: "/app/copy" },
    { icon: <TrendingUp size={20} />, label: "Trending", path: "/app/trending" },
    { icon: <BarChart2 size={20} />, label: "Leaderboard", path: "/app/leaderboard" },
    { icon: <Shield size={20} />, label: "Wallet Reputation", path: "/app/wallets" },
    { icon: <MessageSquare size={20} />, label: "Token Chat", path: "/app/chat" },
  ]

  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="p-4 border-b border-border/50 flex items-center justify-between">
        <Link href="/app" className="flex items-center gap-2">
          {!collapsed && <span className="text-xl font-bold font-space-grotesk text-primary">Trady</span>}
          {collapsed && <span className="text-xl font-bold font-space-grotesk text-primary">T</span>}
        </Link>
        <button onClick={() => setCollapsed(!collapsed)} className="p-1 rounded-md hover:bg-muted/50 transition-all">
          {collapsed ? "→" : "←"}
        </button>
      </div>

      <div className="p-2 mt-4">
        {sidebarItems.map((item, index) => (
          <Link href={item.path} key={index}>
            <div className={`sidebar-item ${isActive(item.path) ? "active" : ""}`}>
              {item.icon}
              {!collapsed && <span>{item.label}</span>}
            </div>
          </Link>
        ))}
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-2 border-t border-border/50">
        <div className="sidebar-item">
          <User size={20} />
          {!collapsed && <span>Profile</span>}
        </div>
        <div className="sidebar-item">
          <Settings size={20} />
          {!collapsed && <span>Settings</span>}
        </div>
        <div className="sidebar-item">
          <LogOut size={20} />
          {!collapsed && <span>Disconnect</span>}
        </div>
      </div>
    </div>
  )
}
