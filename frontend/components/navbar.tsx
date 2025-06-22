"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { useRouter } from "next/navigation"

export function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) return
    
    router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
  }
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
              ChainLens
            </span>
          </Link>
        </div>
        
        <div className="flex items-center justify-between flex-1">
          <nav className="flex items-center space-x-4 lg:space-x-6 mx-6">
            <Link
              href="/blocks"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === "/blocks" ? "text-primary" : "text-muted-foreground"
              )}
            >
              Blocks
            </Link>
            <Link
              href="/transactions"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === "/transactions" ? "text-primary" : "text-muted-foreground"
              )}
            >
              Transactions
            </Link>
            <Link
              href="/tokens"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === "/tokens" ? "text-primary" : "text-muted-foreground"
              )}
            >
              Tokens
            </Link>
            <Link
              href="/nfts"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === "/nfts" ? "text-primary" : "text-muted-foreground"
              )}
            >
              NFTs
            </Link>
          </nav>
          
          <div className="flex-1 flex items-center justify-end">
            <form onSubmit={handleSearch} className="w-full max-w-sm lg:max-w-md flex items-center space-x-2">
              <Input
                type="search"
                placeholder="Search by Address / Txn Hash / Block / Token"
                className="flex-1"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button type="submit" size="icon">
                <Search className="h-4 w-4" />
                <span className="sr-only">Search</span>
              </Button>
            </form>
          </div>
        </div>
      </div>
    </header>
  )
}
