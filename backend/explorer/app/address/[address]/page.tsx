import { fetchAccountInfo, fetchTokenBalances, fetchNFTs, fetchLatestTransactions } from "@/lib/helius"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { formatDistanceToNow } from "date-fns"
import { ArrowLeft, Copy, CheckCircle, XCircle, Wallet, Coins } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { HexGrid } from "@/components/hex-grid"
import { TrustScore } from "@/components/trust-score"
import { calculateTrustScore } from "@/lib/reputation"

interface AddressPageProps {
  params: {
    address: string
  }
}

export default async function AddressPage({ params }: AddressPageProps) {
  const { address } = params
  const accountInfo = await fetchAccountInfo(address)
  const tokenBalances = await fetchTokenBalances(address)
  const nfts = await fetchNFTs(address)
  const transactions = await fetchLatestTransactions(10, address)

  // Calculate SOL balance
  const solBalance = accountInfo?.value?.lamports ? accountInfo.value.lamports / 10 ** 9 : 0

  // Calculate trust score
  const trustScore = calculateTrustScore(solBalance, address)

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
          <h1 className="text-3xl font-bold mb-2 font-orbitron cyber-gradient-text">Address</h1>
          <div className="flex items-center flex-wrap">
            <div className="font-mono text-sm break-all mr-2">{address}</div>
            <button className="text-muted-foreground hover:text-white">
              <Copy className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Redesigned Trust Score Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="md:col-span-2">
            <TrustScore score={trustScore} size="lg" />
          </div>

          <Card className="cyber-border bg-cyber-dark/40 h-full">
            <CardContent className="p-4 flex flex-col justify-center h-full">
              <div className="flex items-center mb-2">
                <Wallet className="h-4 w-4 text-cyber-purple mr-2" />
                <span className="text-sm text-muted-foreground">SOL Balance</span>
              </div>
              <div className="text-2xl font-bold mb-1">{solBalance.toFixed(4)} SOL</div>

              <div className="flex items-center mt-4 mb-2">
                <Coins className="h-4 w-4 text-cyber-teal mr-2" />
                <span className="text-sm text-muted-foreground">Token Types</span>
              </div>
              <div className="text-xl font-bold">{tokenBalances.length}</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="mb-8">
          <TabsList className="cyber-tabs">
            <TabsTrigger value="overview" className="cyber-tab">
              Overview
            </TabsTrigger>
            <TabsTrigger value="tokens" className="cyber-tab">
              Tokens
            </TabsTrigger>
            <TabsTrigger value="nfts" className="cyber-tab">
              NFTs
            </TabsTrigger>
            <TabsTrigger value="transactions" className="cyber-tab">
              Transactions
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <Card className="cyber-border">
              <CardHeader>
                <CardTitle className="font-orbitron">Account Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Address</div>
                    <div className="font-mono text-sm break-all">{address}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">SOL Balance</div>
                    <div className="font-mono text-sm">{solBalance.toFixed(9)} SOL</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Token Accounts</div>
                    <div className="font-mono text-sm">{tokenBalances.length}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">NFTs</div>
                    <div className="font-mono text-sm">{nfts.length}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Trust Score</div>
                    <div className="font-mono text-sm">
                      <TrustScore score={trustScore} size="sm" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tokens">
            <Card className="cyber-border">
              <CardHeader>
                <CardTitle className="font-orbitron">Token Balances</CardTitle>
              </CardHeader>
              <CardContent>
                {tokenBalances.length > 0 ? (
                  <div className="space-y-4">
                    {tokenBalances.map((token, index) => {
                      const tokenInfo = token.tokenInfo || {
                        name: `Token: ${token.mint.slice(0, 6)}...${token.mint.slice(-6)}`,
                        symbol: token.mint.slice(0, 4).toUpperCase(),
                        logoURI: null,
                      }

                      return (
                        <div
                          key={index}
                          className="flex items-center justify-between py-2 border-b border-cyber-purple/20 last:border-0"
                        >
                          <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-cyber-dark rounded-full flex items-center justify-center border border-cyber-purple/30 overflow-hidden">
                              {tokenInfo.logoURI ? (
                                <Image
                                  src={tokenInfo.logoURI || "/placeholder.svg"}
                                  alt={tokenInfo.symbol}
                                  width={32}
                                  height={32}
                                  className="object-cover"
                                />
                              ) : (
                                <span className="text-xs">{tokenInfo.symbol.slice(0, 2)}</span>
                              )}
                            </div>
                            <div>
                              <div className="font-medium text-sm">
                                {tokenInfo.name}{" "}
                                {tokenInfo.symbol !== token.mint.slice(0, 4).toUpperCase() && `(${tokenInfo.symbol})`}
                              </div>
                              <div className="text-xs text-muted-foreground font-mono">
                                <Link href={`/token/${token.mint}`} className="hover:text-cyber-purple">
                                  {token.mint.slice(0, 6)}...{token.mint.slice(-6)}
                                </Link>
                              </div>
                            </div>
                          </div>
                          <div className="font-mono text-sm">
                            {token.amount.toLocaleString()} {tokenInfo.symbol}
                            {tokenInfo.price && (
                              <div className="text-xs text-muted-foreground">
                                ≈ ${(token.amount * tokenInfo.price).toFixed(2)}
                              </div>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">No token balances found for this address</div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="nfts">
            <Card className="cyber-border">
              <CardHeader>
                <CardTitle className="font-orbitron">NFTs</CardTitle>
              </CardHeader>
              <CardContent>
                {nfts.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {nfts.map((nft: any, index) => (
                      <div key={index} className="bg-cyber-dark/50 rounded-lg overflow-hidden cyber-border">
                        <div className="aspect-square relative">
                          <Image
                            src={nft.content?.files?.[0]?.uri || `/placeholder.svg?height=300&width=300&query=NFT`}
                            alt={nft.content?.metadata?.name || "NFT"}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="p-3">
                          <h3 className="text-sm font-medium truncate">
                            {nft.content?.metadata?.name || "Unnamed NFT"}
                          </h3>
                          <p className="text-xs text-muted-foreground truncate mt-1">
                            {nft.content?.metadata?.collection?.name || "Unknown Collection"}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">No NFTs found for this address</div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transactions">
            <Card className="cyber-border">
              <CardHeader>
                <CardTitle className="font-orbitron">Recent Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                {transactions.length > 0 ? (
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
                          <Link
                            href={`/tx/${tx.signature}`}
                            className="text-sm hover:text-cyber-purple transition-colors font-mono"
                          >
                            {tx.signature.slice(0, 8)}...{tx.signature.slice(-8)}
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
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    No recent transactions found for this address
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}
