"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Bell, ChevronDown, Menu, User, Lock, LogOut, Copy, Download } from "lucide-react"
import { useState } from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useWallet } from "@/contexts/wallet-context"
import { useToast } from "@/hooks/use-toast"

export function AppHeader() {
  const pathname = usePathname()
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { wallet, publicKey, isLocked, lockWallet, resetWallet, exportWallet, getShortAddress } = useWallet()
  const { toast } = useToast()

  const isActive = (path: string) => pathname === path

  const menuItems = [
    { label: "Home", path: "/app" },
    { label: "Swap", path: "/app/swap" },
    { label: "CopySwap", path: "/app/copy" },
    { label: "Trending", path: "/app/trending" },
    { label: "Leaderboard", path: "/app/leaderboard" },
    { label: "Wallet Reputation", path: "/app/wallets" },
    { label: "Token Chat", path: "/app/chat" },
  ]

  const handleExportWallet = () => {
    const privateKey = exportWallet()
    if (privateKey) {
      navigator.clipboard.writeText(privateKey)
      toast({
        title: "Private key copied!",
        description: "Make sure to store it in a safe place.",
      })
    }
  }

  const handleDownloadWallet = () => {
    const privateKey = exportWallet()
    if (privateKey) {
      const blob = new Blob([privateKey], { type: "text/plain" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `Chain Lens-wallet-${getShortAddress()}.txt`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      toast({
        title: "Private key exported!",
        description: "Keep this file secure and private.",
      })
    }
  }

  const handleLockWallet = () => {
    lockWallet()
    toast({
      title: "Wallet locked",
      description: "Your wallet has been locked for security.",
    })
    router.push("/create")
  }

  const handleResetWallet = () => {
    if (confirm("Are you sure you want to reset your wallet? This action cannot be undone.")) {
      resetWallet()
      toast({
        title: "Wallet reset",
        description: "Your wallet has been reset successfully.",
      })
      router.push("/create")
    }
  }

  return (
    <header className="Chain Lens">
      <div className="Chain Lens-content">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold font-space-grotesk text-primary">Chain Lens</span>
          </Link>

          <div className="hidden md:flex app-tabs">
            {menuItems.map((item, index) => (
              <Link key={index} href={item.path} className={`app-tab ${isActive(item.path) ? "active" : ""}`}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="hidden md:flex relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-primary"></span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 bg-card border-border">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-[300px] overflow-y-auto">
                {[1, 2, 3, 4, 5].map((i) => (
                  <DropdownMenuItem key={i} className="py-2 cursor-pointer">
                    <div className="flex flex-col gap-1">
                      <p className="text-sm font-medium">New trending token: BONK</p>
                      <p className="text-xs text-muted-foreground">2 minutes ago</p>
                    </div>
                  </DropdownMenuItem>
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {publicKey && !isLocked ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                    <User className="h-3.5 w-3.5" />
                  </div>
                  <span className="text-sm font-mono">{getShortAddress()}</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-card border-border">
                <DropdownMenuLabel>Chain Lens Wallet</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleExportWallet}>
                  <Copy className="h-4 w-4 mr-2" /> Copy Private Key
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleDownloadWallet}>
                  <Download className="h-4 w-4 mr-2" /> Download Key
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLockWallet}>
                  <Lock className="h-4 w-4 mr-2" /> Lock Wallet
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleResetWallet} className="text-red-500">
                  <LogOut className="h-4 w-4 mr-2" /> Reset Wallet
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button onClick={() => router.push("/create")} className="hidden md:flex btn-gradient">
              {isLocked ? "Unlock Wallet" : "Create Wallet"}
            </Button>
          )}

          {/* Hamburger Menu Button for Mobile */}
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[85%] sm:w-[350px] p-0">
              <div className="flex flex-col h-full">
                <div className="p-4 border-b border-border/40">
                  {publicKey && !isLocked ? (
                    <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/30">
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                        <User className="h-3.5 w-3.5" />
                      </div>
                      <span className="text-sm font-mono">{getShortAddress()}</span>
                    </div>
                  ) : (
                    <Button
                      onClick={() => {
                        setIsMenuOpen(false)
                        router.push("/create")
                      }}
                      className="w-full btn-gradient"
                    >
                      {isLocked ? "Unlock Wallet" : "Create Wallet"}
                    </Button>
                  )}
                </div>

                <div className="flex-1 overflow-auto py-4">
                  <div className="flex flex-col gap-1 px-2">
                    {menuItems.map((item, index) => (
                      <Link
                        key={index}
                        href={item.path}
                        onClick={() => setIsMenuOpen(false)}
                        className={`p-3 rounded-md transition-colors ${
                          isActive(item.path) ? "bg-primary/10 text-primary" : "hover:bg-muted/30"
                        }`}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>

                {publicKey && !isLocked && (
                  <div className="p-4 border-t border-border/40">
                    <div className="grid grid-cols-2 gap-2 mb-2">
                      <Button variant="outline" size="sm" onClick={handleExportWallet}>
                        <Copy className="h-4 w-4 mr-1" /> Copy Key
                      </Button>
                      <Button variant="outline" size="sm" onClick={handleLockWallet}>
                        <Lock className="h-4 w-4 mr-1" /> Lock
                      </Button>
                    </div>
                    <Button onClick={handleResetWallet} variant="destructive" className="w-full">
                      Reset Wallet
                    </Button>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
