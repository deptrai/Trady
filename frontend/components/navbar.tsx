"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { useWallet } from "@/contexts/wallet-context"

export function Navbar({ variant = "landing" }: { variant?: "landing" | "app" }) {
  const isLanding = variant === "landing"
  const [scrolled, setScrolled] = useState(false)
  const [copyingCount, setCopyingCount] = useState(1245)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { publicKey, isLocked } = useWallet()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    // Simulate live count updates
    const interval = setInterval(() => {
      setCopyingCount((prev) => prev + Math.floor(Math.random() * 3) - 1)
    }, 3000)

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
      clearInterval(interval)
    }
  }, [])

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

  const handleCreateWallet = () => {
    router.push("/create")
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/80 backdrop-blur-md border-b border-border/40" : "bg-transparent"
      }`}
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold font-space-grotesk text-primary">Trady</span>
          </Link>

          {!isLanding && (
            <nav className="hidden md:flex items-center gap-4">
              {menuItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.path}
                  className={`text-sm px-3 py-1.5 rounded-md transition-colors ${
                    isActive(item.path) ? "bg-primary/10 text-primary" : "hover:bg-muted/30 hover:text-primary"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          )}
        </div>

        <div className="flex items-center gap-4">
          {isLanding ? (
            <>
              <div className="hidden md:flex items-center text-sm text-muted-foreground">
                <span className="animate-pulse text-primary mr-2">●</span>
                <span>{copyingCount} wallets copying now</span>
              </div>
              <Link href={publicKey && !isLocked ? "/app" : "/create"} className="hidden md:block">
                <button className="btn-gradient">Launch App</button>
              </Link>
            </>
          ) : (
            <button className="btn-gradient hidden md:block" onClick={handleCreateWallet}>
              {publicKey && !isLocked ? "Wallet Connected" : "Create Wallet"}
            </button>
          )}

          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="mobile-menu-button">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[85%] sm:w-[350px] p-0">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-4 border-b border-border/40">
                  <Link href="/" className="flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
                    <span className="text-2xl font-bold font-space-grotesk text-primary">Trady</span>
                  </Link>
                  <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(false)}>
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                <div className="flex-1 overflow-auto py-4">
                  <div className="flex flex-col gap-1 px-2">
                    {isLanding ? (
                      <Link href={publicKey && !isLocked ? "/app" : "/create"} onClick={() => setIsMenuOpen(false)}>
                        <button className="btn-gradient w-full mb-4">
                          {publicKey && !isLocked ? "Launch App" : "Create Wallet & Launch App"}
                        </button>
                      </Link>
                    ) : (
                      menuItems.map((item, index) => (
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
                      ))
                    )}
                  </div>
                </div>

                {!isLanding && (
                  <div className="p-4 border-t border-border/40">
                    <button
                      className="btn-gradient w-full"
                      onClick={() => {
                        setIsMenuOpen(false)
                        handleCreateWallet()
                      }}
                    >
                      {publicKey && !isLocked ? "Wallet Connected" : "Create Wallet"}
                    </button>
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
