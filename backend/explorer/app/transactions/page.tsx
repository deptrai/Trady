import { fetchLatestTransactions } from "@/lib/helius"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatDistanceToNow } from "date-fns"
import { CheckCircle, XCircle, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { HexGrid } from "@/components/hex-grid"

export const revalidate = 30

export default async function TransactionsPage() {
  const transactions = await fetchLatestTransactions(20)

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
          <h1 className="text-3xl font-bold mb-2 font-orbitron cyber-gradient-text">Transactions</h1>
          <p className="text-muted-foreground">Browse the latest transactions on the Solana blockchain</p>
        </div>

        <Card className="cyber-border">
          <CardHeader>
            <CardTitle className="font-orbitron">Latest Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full cyber-table">
                <thead>
                  <tr>
                    <th>Signature</th>
                    <th>Block</th>
                    <th>Time</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((tx) => (
                    <tr key={tx.signature}>
                      <td>
                        <Link
                          href={`/tx/${tx.signature}`}
                          className="text-sm hover:text-cyber-purple transition-colors font-mono"
                        >
                          {tx.signature.slice(0, 8)}...{tx.signature.slice(-8)}
                        </Link>
                      </td>
                      <td>
                        <Link
                          href={`/block/${tx.slot}`}
                          className="text-sm hover:text-cyber-teal transition-colors font-mono"
                        >
                          {tx.slot}
                        </Link>
                      </td>
                      <td className="text-sm text-muted-foreground">
                        {tx.blockTime
                          ? formatDistanceToNow(tx.blockTime * 1000, {
                              addSuffix: true,
                            })
                          : "Pending"}
                      </td>
                      <td>
                        <div className="flex items-center">
                          {tx.err ? (
                            <>
                              <XCircle className="h-4 w-4 text-cyber-pink mr-1" />
                              <span className="text-sm text-cyber-pink">Failed</span>
                            </>
                          ) : (
                            <>
                              <CheckCircle className="h-4 w-4 text-cyber-teal mr-1" />
                              <span className="text-sm text-cyber-teal">Success</span>
                            </>
                          )}
                        </div>
                      </td>
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
