import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { tokenList } from "@/lib/token-list"
import { HexGrid } from "@/components/hex-grid"

export default function TokensPage() {
  // Convert tokenList object to array for easier rendering
  const tokens = Object.values(tokenList)

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
          <h1 className="text-3xl font-bold mb-2 font-orbitron cyber-gradient-text">Tokens</h1>
          <p className="text-muted-foreground">Browse popular tokens on the Solana blockchain</p>
        </div>

        <Card className="cyber-border">
          <CardHeader>
            <CardTitle className="font-orbitron">Popular Tokens</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full cyber-table">
                <thead>
                  <tr>
                    <th>Token</th>
                    <th>Symbol</th>
                    <th>Address</th>
                    <th>Decimals</th>
                  </tr>
                </thead>
                <tbody>
                  {tokens.map((token) => (
                    <tr key={token.address}>
                      <td>
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-cyber-dark rounded-full flex items-center justify-center border border-cyber-purple/30 overflow-hidden">
                            {token.logoURI ? (
                              <Image
                                src={token.logoURI || "/placeholder.svg"}
                                alt={token.symbol}
                                width={32}
                                height={32}
                                className="object-cover"
                              />
                            ) : (
                              <span className="text-xs">{token.symbol.slice(0, 2)}</span>
                            )}
                          </div>
                          <span className="font-medium">{token.name}</span>
                        </div>
                      </td>
                      <td className="font-mono">{token.symbol}</td>
                      <td>
                        <Link
                          href={`/token/${token.address}`}
                          className="text-sm hover:text-cyber-purple transition-colors font-mono"
                        >
                          {token.address.slice(0, 4)}...{token.address.slice(-4)}
                        </Link>
                      </td>
                      <td>{token.decimals}</td>
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
