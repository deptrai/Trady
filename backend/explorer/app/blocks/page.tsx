import { fetchLatestBlocks } from "@/lib/helius"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatDistanceToNow } from "date-fns"
import { Database, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { HexGrid } from "@/components/hex-grid"

export const revalidate = 60

export default async function BlocksPage() {
  const blocks = await fetchLatestBlocks(20)

  return (
    <>
      <HexGrid />
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="flex items-center mb-6">
          <Link href="/" className="flex items-center text-sm text-muted-foreground hover:text-white">
            <ArrowLeft className="h-4 w-4 mr-1" /> Back to Home
          </Link>
        </div>

        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2 font-orbitron cyber-gradient-text">Blocks</h1>
          <p className="text-muted-foreground">Browse the latest blocks on the Solana blockchain</p>
        </div>

        <Card className="cyber-border">
          <CardHeader>
            <CardTitle className="font-orbitron">Latest Blocks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full cyber-table">
                <thead>
                  <tr>
                    <th>Block Number</th>
                    <th>Time</th>
                    <th>Transactions</th>
                  </tr>
                </thead>
                <tbody>
                  {blocks.map((block) => (
                    <tr key={block.blockNumber}>
                      <td>
                        <div className="flex items-center space-x-2">
                          <Database className="h-4 w-4 text-cyber-teal" />
                          <Link
                            href={`/block/${block.blockNumber}`}
                            className="text-sm hover:text-cyber-purple transition-colors font-mono"
                          >
                            {block.blockNumber.toLocaleString()}
                          </Link>
                        </div>
                      </td>
                      <td className="text-sm text-muted-foreground">
                        {block.blockTime
                          ? formatDistanceToNow(block.blockTime * 1000, {
                              addSuffix: true,
                            })
                          : "Unknown"}
                      </td>
                      <td className="text-sm">{block.transactionCount} txs</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
