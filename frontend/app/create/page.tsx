"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useWallet, WalletProvider } from "@/contexts/wallet-context"
import { useToast } from "@/components/ui/use-toast"
import { motion } from "framer-motion"
import { Copy, ArrowRight, Download, Key, AlertTriangle, CheckCircle } from "lucide-react"

// Tạo component con để sử dụng hook useWallet
function CreateWalletContent() {
  const [step, setStep] = useState(1)
  const [privateKey, setPrivateKey] = useState("")
  const [confirmed, setConfirmed] = useState(false)
  const { wallet, createWallet, exportWallet, getShortAddress, publicKey } = useWallet()
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    // If wallet exists, skip to step 3
    if (wallet) {
      setStep(3)
      const exportedKey = exportWallet()
      if (exportedKey) setPrivateKey(exportedKey)
    }
  }, [wallet, exportWallet])

  const handleCreate = () => {
    createWallet()
    const exportedKey = exportWallet()
    if (exportedKey) setPrivateKey(exportedKey)
    setStep(2)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(privateKey)
    toast({
      title: "Private key copied!",
      description: "Make sure to store it in a safe place.",
    })
  }

  const handleExport = () => {
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

  const handleContinue = () => {
    if (!confirmed) {
      toast({
        title: "Please confirm backup",
        description: "You need to confirm that you've saved your private key.",
        variant: "destructive",
      })
      return
    }
    setStep(3)
  }

  const handleEnterApp = () => {
    router.push("/app")
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background relative overflow-hidden">
      <div className="animated-bg"></div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md z-10">
        <Card className="border-primary/30 bg-card/90 backdrop-blur-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl md:text-3xl">
              {step === 1 && "Create Your Chain Lens Wallet"}
              {step === 2 && "Backup Your Wallet"}
              {step === 3 && "Wallet Ready!"}
            </CardTitle>
            <CardDescription>
              {step === 1 && "We'll generate a secure Solana wallet for you. No installs needed."}
              {step === 2 && "Store your private key safely. It's only shown once."}
              {step === 3 && "Your wallet is now ready to use with Chain Lens!"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {step === 1 && (
              <div className="space-y-6">
                <div className="flex flex-col gap-4 items-center">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                    <Key className="h-8 w-8 text-primary" />
                  </div>
                  <p className="text-sm text-center text-muted-foreground">
                    This wallet will let you trade, chat, and copy other traders instantly.
                  </p>
                </div>
                <Button className="w-full btn-gradient" onClick={handleCreate}>
                  Generate Wallet
                </Button>
                <p className="text-xs text-center text-muted-foreground">
                  By creating a wallet, you accept our Terms of Service.
                </p>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div className="p-3 bg-muted/30 rounded-lg overflow-hidden relative">
                  <p className="font-mono text-xs break-all select-all">{privateKey}</p>
                </div>

                <div className="bg-yellow-500/10 text-yellow-500 p-3 rounded-lg flex items-start gap-2 text-sm">
                  <AlertTriangle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                  <p>Anyone with this key can access your funds. Store it safely and never share it.</p>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1" onClick={handleCopy}>
                    <Copy className="h-4 w-4 mr-2" /> Copy Key
                  </Button>
                  <Button variant="outline" className="flex-1" onClick={handleExport}>
                    <Download className="h-4 w-4 mr-2" /> Export
                  </Button>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="confirm-backup"
                    checked={confirmed}
                    onChange={(e) => setConfirmed(e.target.checked)}
                    className="rounded border-primary/50 text-primary focus:ring-primary"
                  />
                  <label htmlFor="confirm-backup" className="text-sm">
                    I've saved my private key securely
                  </label>
                </div>

                <Button className="w-full btn-gradient" onClick={handleContinue}>
                  Continue <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div className="flex flex-col gap-4 items-center">
                  <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center">
                    <CheckCircle className="h-8 w-8 text-green-500" />
                  </div>

                  <div className="text-center">
                    <p className="text-lg font-bold">Wallet Created Successfully</p>
                    <p className="text-sm text-muted-foreground">Your wallet address:</p>
                    <p className="font-mono text-sm mt-1">{publicKey}</p>
                  </div>
                </div>

                <Button className="w-full btn-gradient animate-pulse" onClick={handleEnterApp}>
                  Enter Chain Lens App <ArrowRight className="h-4 w-4 ml-2" />
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  You can always access wallet settings from the profile menu.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

// Component chính bọc trong WalletProvider
export default function CreateWalletPage() {
  return (
    <WalletProvider>
      <CreateWalletContent />
    </WalletProvider>
  )
}
