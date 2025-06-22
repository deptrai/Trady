"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, Activity } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useMobile } from "@/hooks/use-mobile"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()
  const isMobile = useMobile()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="border-b border-cyber-purple/20 backdrop-blur-md bg-cyber-dark/70 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative">
              <Activity className="h-6 w-6 text-cyber-purple" />
              <div className="absolute inset-0 bg-cyber-purple/20 blur-sm rounded-full"></div>
            </div>
            <span className="text-xl font-bold font-orbitron cyber-gradient-text">Chain Lens EXPLORER</span>
          </Link>

          {!isMobile && (
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/transactions" className="text-sm hover:text-cyber-purple transition-colors">
                Transactions
              </Link>
              <Link href="/blocks" className="text-sm hover:text-cyber-purple transition-colors">
                Blocks
              </Link>
              <Link href="/tokens" className="text-sm hover:text-cyber-purple transition-colors">
                Tokens
              </Link>
              <Link href="/nfts" className="text-sm hover:text-cyber-purple transition-colors">
                NFTs
              </Link>
              <Link href="/validators" className="text-sm hover:text-cyber-purple transition-colors">
                Validators
              </Link>
            </div>
          )}

          <div className="flex items-center space-x-4">
            {isMobile && (
              <Button variant="ghost" size="icon" onClick={toggleMenu}>
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobile && isMenuOpen && (
          <nav className="mt-3 py-4 border-t border-cyber-purple/20 flex flex-col space-y-4">
            <Link
              href="/transactions"
              className="text-sm hover:text-cyber-purple transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Transactions
            </Link>
            <Link
              href="/blocks"
              className="text-sm hover:text-cyber-purple transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Blocks
            </Link>
            <Link
              href="/tokens"
              className="text-sm hover:text-cyber-purple transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Tokens
            </Link>
            <Link
              href="/nfts"
              className="text-sm hover:text-cyber-purple transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              NFTs
            </Link>
            <Link
              href="/validators"
              className="text-sm hover:text-cyber-purple transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Validators
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}
