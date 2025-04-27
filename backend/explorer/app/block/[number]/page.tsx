import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

interface BlockPageProps {
  params: {
    number: string
  }
}

export default async function BlockPage({ params }: BlockPageProps) {
  const { number } = params
  const blockNumber = Number.parseInt(number)

  // Fetch block details from Helius API
  const response = await fetch(`https://mainnet.helius-rpc.com/?api-key=${process.env.HELIUS_API_KEY}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: "my-id",
      method: "getBlock",
      params: [blockNumber, { encoding: "jsonParsed", maxSupportedTransactionVersion: 0 }],
    }),
  })

  const data = await response.json()
  const block = data.result

  if (!block) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <Link href="/" className="flex items-center text-sm text-muted-foreground hover:text-white">
            <ArrowLeft className="h-4 w-4 mr-1" /> Back to Home
          </Link>
        </div>
        <div className="bg-muted/20 p-6 rounded-lg cyberpunk-border">
          <h1 className="text-2xl font-bold mb-4">Block Not Found</h1>
          <p className="text-muted-foreground">
            The block with number <span className="font-mono">{number}</span> could not be found.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <Link href="/" className="flex items-center text-sm text-muted-foreground hover:text-white">
          <ArrowLeft className="h-4 w-4 mr-1" /> Back to Home
        </Link>
      </div>

      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Block #{blockNumber.toLocaleString()}</h1>
        <div className="text-sm text-muted-foreground">
          {block.blockTime ? new Date(block.blockTime * 1000).toLocaleString() : "Unknown time"}
        </div>
      </div>

      <Card className="cyberpunk-border mb-6">
        <CardHeader>
          <CardTitle>Block Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-muted-foreground mb-1">Block Height</div>
              <div className="font-mono text-sm">{blockNumber.toLocaleString()}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">Timestamp</div>
              <div className="font-mono text-sm">
                {block.blockTime ? new Date(block.blockTime * 1000).toLocaleString() : "Unknown"}
              </div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">Transactions</div>
              <div className="font-mono text-sm">{block.transactions?.length || 0}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">Parent Slot</div>
              <div className="font-mono text-sm">{block.parentSlot}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">Previous Block Hash</div>
              <div className="font-mono text-sm break-all">{block.previousBlockhash}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">Block Hash</div>
              <div className="font-mono text-sm break-all">{block.blockhash}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="cyberpunk-border">
        <CardHeader>
          <CardTitle>Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          {block.transactions && block.transactions.length > 0 ? (
            <div className="space-y-3">
              {block.transactions.slice(0, 20).map((tx: any, index: number) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-2 border-b border-muted/20 last:border-0"
                >
                  <div className="flex items-center space-x-2">
                    <Link
                      href={`/tx/${tx.transaction.signatures[0]}`}
                      className="text-sm hover:text-neon-green transition-colors font-mono"
                    >
                      {tx.transaction.signatures[0].slice(0, 8)}...{tx.transaction.signatures[0].slice(-8)}
                    </Link>
                  </div>
                  <div className="text-xs text-muted-foreground">{tx.meta.err ? "Failed" : "Success"}</div>
                </div>
              ))}
              {block.transactions.length > 20 && (
                <div className="text-center mt-4">
                  <p className="text-sm text-muted-foreground">
                    Showing 20 of {block.transactions.length} transactions
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">No transactions found in this block</div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
