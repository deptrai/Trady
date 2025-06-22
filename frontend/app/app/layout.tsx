import type React from "react"
import LiveStatsBar from "@/components/live-stats-bar"
import { AppHeader } from "@/components/app-header"
import { BackgroundGradient } from "@/components/background-gradient"
import { FloatingElements } from "@/components/floating-elements"
import { WalletProvider } from "@/contexts/wallet-context"

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <WalletProvider>
      <div className="flex min-h-screen flex-col">
        <BackgroundGradient />
        <FloatingElements />
        <AppHeader />
        <main className="center-panel">{children}</main>
        <LiveStatsBar />
      </div>
    </WalletProvider>
  )
}
