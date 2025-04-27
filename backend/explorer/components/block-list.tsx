"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { fetchLatestBlocks } from "@/lib/helius"
import type { Block } from "@/types/block"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { Database } from "lucide-react"

export function BlockList() {
  const [blocks, setBlocks] = useState<Block[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getBlocks = async () => {
      setLoading(true)
      const latestBlocks = await fetchLatestBlocks(5)
      setBlocks(latestBlocks)
      setLoading(false)
    }

    getBlocks()
    const interval = setInterval(getBlocks, 60000)
    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="cyber-border">
      <CardHeader>
        <CardTitle className="text-lg font-bold font-orbitron">Latest Blocks</CardTitle>
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
              {blocks.map((block) => (
                <div
                  key={block.blockNumber}
                  className="flex items-center justify-between py-2 border-b border-cyber-purple/20 last:border-0"
                >
                  <div className="flex items-center space-x-2">
                    <Database className="h-4 w-4 text-cyber-teal" />
                    <Link
                      href={`/block/${block.blockNumber}`}
                      className="text-sm hover:text-cyber-purple transition-colors"
                    >
                      {block.blockNumber.toLocaleString()}
                    </Link>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-xs text-muted-foreground">{block.transactionCount} txs</div>
                    <div className="text-xs text-muted-foreground">
                      {block.blockTime
                        ? formatDistanceToNow(block.blockTime * 1000, {
                            addSuffix: true,
                          })
                        : "Unknown"}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="text-center mt-4">
            <Link href="/blocks" className="text-xs text-cyber-purple hover:underline">
              View All Blocks
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
