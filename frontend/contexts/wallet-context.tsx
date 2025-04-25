"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import * as web3 from "@solana/web3.js"
import bs58 from "bs58"

const WALLET_STORAGE_KEY = "trady_wallet"
const WALLET_LOCK_KEY = "trady_wallet_locked"
const AUTO_LOCK_TIME = 15 * 60 * 1000 // 15 dakika

type WalletContextType = {
  wallet: web3.Keypair | null
  publicKey: string | null
  isLocked: boolean
  isCreating: boolean
  createWallet: () => void
  importWallet: (privateKey: string) => void
  exportWallet: () => string | null
  lockWallet: () => void
  unlockWallet: (password?: string) => void
  resetWallet: () => void
  getShortAddress: () => string | null
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

export function WalletProvider({ children }: { children: ReactNode }) {
  const [wallet, setWallet] = useState<web3.Keypair | null>(null)
  const [publicKey, setPublicKey] = useState<string | null>(null)
  const [isLocked, setIsLocked] = useState<boolean>(false)
  const [isCreating, setIsCreating] = useState<boolean>(false)
  const [lastActivity, setLastActivity] = useState<number>(Date.now())

  // Check for existing wallet on startup
  useEffect(() => {
    const storedWallet = localStorage.getItem(WALLET_STORAGE_KEY)
    const isLocked = localStorage.getItem(WALLET_LOCK_KEY) === "true"

    if (storedWallet && !isLocked) {
      try {
        const secretKey = Uint8Array.from(bs58.decode(storedWallet))
        const loadedWallet = web3.Keypair.fromSecretKey(secretKey)
        setWallet(loadedWallet)
        setPublicKey(loadedWallet.publicKey.toString())
      } catch (error) {
        console.error("Failed to load wallet:", error)
      }
    }

    setIsLocked(isLocked)
  }, [])

  // Auto-lock after inactivity
  useEffect(() => {
    const handleActivity = () => {
      setLastActivity(Date.now())
    }

    window.addEventListener("mousemove", handleActivity)
    window.addEventListener("keydown", handleActivity)

    const interval = setInterval(() => {
      if (wallet && Date.now() - lastActivity > AUTO_LOCK_TIME) {
        lockWallet()
      }
    }, 60000) // Check every minute

    return () => {
      window.removeEventListener("mousemove", handleActivity)
      window.removeEventListener("keydown", handleActivity)
      clearInterval(interval)
    }
  }, [wallet, lastActivity])

  const createWallet = () => {
    setIsCreating(true)
    try {
      const newWallet = web3.Keypair.generate()
      const secretKeyString = bs58.encode(newWallet.secretKey)
      localStorage.setItem(WALLET_STORAGE_KEY, secretKeyString)
      localStorage.removeItem(WALLET_LOCK_KEY)
      setWallet(newWallet)
      setPublicKey(newWallet.publicKey.toString())
      setIsLocked(false)
    } catch (error) {
      console.error("Failed to create wallet:", error)
    }
    setIsCreating(false)
  }

  const importWallet = (privateKey: string) => {
    try {
      const secretKey = Uint8Array.from(bs58.decode(privateKey))
      const importedWallet = web3.Keypair.fromSecretKey(secretKey)
      const secretKeyString = bs58.encode(importedWallet.secretKey)
      localStorage.setItem(WALLET_STORAGE_KEY, secretKeyString)
      localStorage.removeItem(WALLET_LOCK_KEY)
      setWallet(importedWallet)
      setPublicKey(importedWallet.publicKey.toString())
      setIsLocked(false)
    } catch (error) {
      console.error("Failed to import wallet:", error)
      throw new Error("Invalid private key format")
    }
  }

  const exportWallet = () => {
    if (!wallet) return null
    return bs58.encode(wallet.secretKey)
  }

  const lockWallet = () => {
    localStorage.setItem(WALLET_LOCK_KEY, "true")
    setIsLocked(true)
  }

  const unlockWallet = (password?: string) => {
    // In a real app, we would verify the password first
    const storedWallet = localStorage.getItem(WALLET_STORAGE_KEY)
    if (storedWallet) {
      try {
        const secretKey = Uint8Array.from(bs58.decode(storedWallet))
        const loadedWallet = web3.Keypair.fromSecretKey(secretKey)
        setWallet(loadedWallet)
        setPublicKey(loadedWallet.publicKey.toString())
        localStorage.removeItem(WALLET_LOCK_KEY)
        setIsLocked(false)
      } catch (error) {
        console.error("Failed to unlock wallet:", error)
      }
    }
  }

  const resetWallet = () => {
    localStorage.removeItem(WALLET_STORAGE_KEY)
    localStorage.removeItem(WALLET_LOCK_KEY)
    setWallet(null)
    setPublicKey(null)
    setIsLocked(false)
  }

  const getShortAddress = () => {
    if (!publicKey) return null
    return `${publicKey.slice(0, 4)}...${publicKey.slice(-4)}`
  }

  return (
    <WalletContext.Provider
      value={{
        wallet,
        publicKey,
        isLocked,
        isCreating,
        createWallet,
        importWallet,
        exportWallet,
        lockWallet,
        unlockWallet,
        resetWallet,
        getShortAddress,
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}

export function useWallet() {
  const context = useContext(WalletContext)
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider")
  }
  return context
}
