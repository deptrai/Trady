import { fetchTransactionDetails } from "@/lib/helius"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatDistanceToNow } from "date-fns"
import { CheckCircle, XCircle, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { HexGrid } from "@/components/hex-grid"

interface TransactionPageProps {
  params: {
    signature: string
  }
}

export default async function TransactionPage({ params }: TransactionPageProps) {
  const { signature } = params
  const transaction = await fetchTransactionDetails(signature)

  if (!transaction) {
    return (
      <>
        <HexGrid />
        <div className="container mx-auto px-4 py-8 relative z-10">
          <div className="flex items-center mb-6">
            <Link href="/" className="flex items-center text-sm text-muted-foreground hover:text-white">
              <ArrowLeft className="h-4 w-4 mr-1" /> Back to Home
            </Link>
          </div>
          <div className="bg-cyber-dark/50 p-6 rounded-lg cyber-border">
            <h1 className="text-2xl font-bold mb-4 font-orbitron">Transaction Not Found</h1>
            <p className="text-muted-foreground">
              The transaction with signature <span className="font-mono">{signature}</span> could not be found.
            </p>
          </div>
        </div>
      </>
    )
  }

  // Add safe access to transaction properties
  const isSuccess = transaction.meta && !transaction.meta.err
  const fee = transaction.meta?.fee ? transaction.meta.fee / 10 ** 9 : 0
  const timestamp = transaction.blockTime ? transaction.blockTime * 1000 : Date.now()
  const accountKeys = transaction.transaction?.message?.accountKeys || []
  const instructions = transaction.transaction?.message?.instructions || []

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
          <h1 className="text-3xl font-bold mb-2 font-orbitron cyber-gradient-text">Transaction Details</h1>
          <div className="flex items-center">
            <div className="flex items-center">
              {isSuccess ? (
                <CheckCircle className="h-5 w-5 text-cyber-teal mr-2" />
              ) : (
                <XCircle className="h-5 w-5 text-cyber-pink mr-2" />
              )}
              <span className="text-lg">{isSuccess ? "Success" : "Failed"}</span>
            </div>
            <div className="ml-4 text-sm text-muted-foreground">
              {formatDistanceToNow(timestamp, { addSuffix: true })}
            </div>
          </div>
        </div>

        <Card className="cyber-border mb-6">
          <CardHeader>
            <CardTitle className="font-orbitron">Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-muted-foreground mb-1">Signature</div>
                <div className="font-mono text-sm break-all">{signature}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">Block</div>
                <div className="font-mono text-sm">
                  <Link href={`/block/${transaction.slot}`} className="hover:text-cyber-teal">
                    {transaction.slot}
                  </Link>
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">Timestamp</div>
                <div className="font-mono text-sm">{new Date(timestamp).toLocaleString()}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">Fee</div>
                <div className="font-mono text-sm">{fee} SOL</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">Recent Blockhash</div>
                <div className="font-mono text-sm break-all">{transaction.transaction.message.recentBlockhash}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="cyber-border mb-6">
          <CardHeader>
            <CardTitle className="font-orbitron">Account Inputs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {accountKeys && accountKeys.length > 0 ? (
                accountKeys.map((account, index) => (
                  <div
                    key={index}
                    className="flex items-start justify-between py-2 border-b border-cyber-purple/20 last:border-0"
                  >
                    <div className="flex items-center space-x-2">
                      <div className="text-sm font-mono">
                        <Link href={`/address/${account.pubkey}`} className="hover:text-cyber-purple">
                          {account.pubkey}
                        </Link>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {account.signer && <span className="cyber-badge">Signer</span>}
                      {account.writable && <span className="cyber-badge-teal">Writable</span>}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-4 text-muted-foreground">No account inputs available</div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="cyber-border mb-6">
          <CardHeader>
            <CardTitle className="font-orbitron">Instructions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {instructions && instructions.length > 0 ? (
                instructions.map((instruction, index) => (
                  <div key={index} className="p-4 bg-cyber-dark/50 rounded-lg border border-cyber-purple/20">
                    <div className="text-sm text-muted-foreground mb-2">
                      Program: {(accountKeys && accountKeys[instruction.programIdIndex]?.pubkey) || "Unknown"}
                    </div>
                    <div className="text-sm mb-2">
                      <span className="text-muted-foreground">Accounts:</span>
                      <div className="ml-4 space-y-1 mt-1">
                        {instruction.accounts &&
                          instruction.accounts.map((accountIndex, i) => (
                            <div key={i} className="font-mono text-xs">
                              {(accountKeys && accountKeys[accountIndex]?.pubkey) || `Account #${accountIndex}`}
                            </div>
                          ))}
                      </div>
                    </div>
                    <div className="text-sm">
                      <span className="text-muted-foreground">Data:</span>
                      <div className="ml-4 font-mono text-xs break-all mt-1">{instruction.data || "No data"}</div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-4 text-muted-foreground">No instructions available</div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="cyber-border">
          <CardHeader>
            <CardTitle className="font-orbitron">Log Messages</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="cyber-code cyber-scrollbar max-h-96 overflow-y-auto">
              {transaction.meta?.logMessages && transaction.meta.logMessages.length > 0
                ? transaction.meta.logMessages.join("\n")
                : "No log messages"}
            </pre>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
