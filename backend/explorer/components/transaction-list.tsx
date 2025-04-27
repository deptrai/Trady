"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { fetchLatestTransactions } from "@/lib/helius"
import type { SolanaTransaction } from "@/types/transaction"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { CheckCircle, XCircle } from "lucide-react"

export function TransactionList() {
  const [transactions, setTransactions] = useState<SolanaTransaction[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getTransactions = async () => {
      setLoading(true)
      const txs = await fetchLatestTransactions(10)
      setTransactions(txs)
      setLoading(false)
    }

    getTransactions()
    const interval = setInterval(getTransactions, 30000)
    return () => clearInterval(interval)
  }, [])

  const truncateSignature = (signature: string) => {
    return `${signature.slice(0, 6)}...${signature.slice(-6)}`
  }

  return (
    <Card className="cyber-border">
      <CardHeader>
        <CardTitle className="text-lg font-bold font-orbitron">Latest Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {loading ? (
            Array(5)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="flex items-center justify-between">
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-4 w-1/4" />
                </div>
              ))
          ) : (
            <div className="space-y-3">
              {transactions.map((tx) => (
                <div
                  key={tx.signature}
                  className="flex items-center justify-between py-2 border-b border-cyber-purple/20 last:border-0"
                >
                  <div className="flex items-center space-x-2">
                    {tx.err ? (
                      <XCircle className="h-4 w-4 text-cyber-pink" />
                    ) : (
                      <CheckCircle className="h-4 w-4 text-cyber-teal" />
                    )}
                    <Link href={`/tx/${tx.signature}`} className="text-sm hover:text-cyber-purple transition-colors">
                      {truncateSignature(tx.signature)}
                    </Link>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {tx.blockTime
                      ? formatDistanceToNow(tx.blockTime * 1000, {
                          addSuffix: true,
                        })
                      : "Pending"}
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="text-center mt-4">
            <Link href="/transactions" className="text-xs text-cyber-purple hover:underline">
              View All Transactions
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
