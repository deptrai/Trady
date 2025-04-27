import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Copy } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { HexGrid } from "@/components/hex-grid"
import { fetchTokenTransactions } from "@/lib/helius"
import { getTokenInfoFromDexscreener } from "@/lib/dexscreener"

interface TokenPageProps {
  params: {
    address: string
  }
}

export default async function TokenPage({ params }: TokenPageProps) {
  const { address } = params

  // Token bilgilerini al
  const tokenInfo = await getTokenInfoFromDexscreener(address)

  // Token işlemlerini al - hata yönetimi ekleyelim
  let transactions = []
  try {
    transactions = await fetchTokenTransactions(address, 10)
  } catch (error) {
    console.error("Error fetching token transactions:", error)
    // Hata durumunda boş dizi kullanacağız
  }

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
          <h1 className="text-3xl font-bold mb-2 font-orbitron cyber-gradient-text">Token Details</h1>
          <div className="flex items-center flex-wrap">
            <div className="font-mono text-sm break-all mr-2">{address}</div>
            <button className="text-muted-foreground hover:text-white">
              <Copy className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="cyber-border md:col-span-2">
            <CardHeader>
              <CardTitle className="font-orbitron">Token Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-cyber-dark rounded-full flex items-center justify-center border border-cyber-purple/30 overflow-hidden flex-shrink-0">
                  {tokenInfo.logoURI ? (
                    <Image
                      src={tokenInfo.logoURI || "/placeholder.svg"}
                      alt={tokenInfo.symbol}
                      width={64}
                      height={64}
                      className="object-cover"
                    />
                  ) : (
                    <span className="text-xl font-bold">{tokenInfo.symbol.slice(0, 2)}</span>
                  )}
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-1">{tokenInfo.name}</h2>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Symbol:</span>{" "}
                      <span className="font-mono">{tokenInfo.symbol}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Decimals:</span>{" "}
                      <span className="font-mono">{tokenInfo.decimals}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Last Updated:</span>{" "}
                      <span className="font-mono">1m ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="cyber-border">
            <CardHeader>
              <CardTitle className="font-orbitron">Contract</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Token Address</div>
                  <div className="font-mono text-sm break-all">{address}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Token Type</div>
                  <div className="font-mono text-sm">SPL Token</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Token Program</div>
                  <div className="font-mono text-sm break-all">TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="cyber-border mb-8">
          <CardHeader>
            <CardTitle className="font-orbitron">Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            {transactions && transactions.length > 0 ? (
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
                        <td className="text-sm text-muted-foreground">{tx.blockTime ? "1m ago" : "Pending"}</td>
                        <td>
                          <div className="flex items-center">
                            {tx.err ? (
                              <span className="text-sm text-cyber-pink">Failed</span>
                            ) : (
                              <span className="text-sm text-cyber-teal">Success</span>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <p>No transactions found for this token</p>
                <p className="text-xs mt-2">
                  This may be due to API limitations or the token contract not having direct transactions
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  )
}
