import { searchByQuery } from "@/lib/helius"
import { redirect } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { HexGrid } from "@/components/hex-grid"

interface SearchPageProps {
  searchParams: { q?: string }
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q

  if (!query) {
    return redirect("/")
  }

  let result
  try {
    result = await searchByQuery(query)
  } catch (error) {
    console.error("Search error:", error)

    return (
      <>
        <HexGrid />
        <div className="container mx-auto px-4 py-8 relative z-10">
          <div className="flex items-center mb-6">
            <Link href="/" className="flex items-center text-sm text-muted-foreground hover:text-white">
              <ArrowLeft className="h-4 w-4 mr-1" /> Back to Home
            </Link>
          </div>

          <Card className="cyber-border bg-cyber-dark/50 p-6 rounded-lg">
            <CardContent className="p-0">
              <h1 className="text-2xl font-bold mb-4 font-orbitron text-cyber-pink">Search Error</h1>
              <p className="text-muted-foreground mb-4">
                An error occurred while searching for: <span className="font-mono">{query}</span>
              </p>
              <p className="text-muted-foreground">Please try again later or try a different search term.</p>
            </CardContent>
          </Card>
        </div>
      </>
    )
  }

  // Redirect işlemlerini try/catch bloğunun dışında yapıyoruz
  if (result.type === "transaction" && result.data) {
    redirect(`/tx/${query}`)
  }

  if (result.type === "account" && result.data) {
    redirect(`/address/${query}`)
  }

  if (result.type === "block" && result.data) {
    redirect(`/block/${query}`)
  }

  // Sonuç bulunamadıysa
  return (
    <>
      <HexGrid />
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="flex items-center mb-6">
          <Link href="/" className="flex items-center text-sm text-muted-foreground hover:text-white">
            <ArrowLeft className="h-4 w-4 mr-1" /> Back to Home
          </Link>
        </div>

        <Card className="cyber-border bg-cyber-dark/50 p-6 rounded-lg">
          <CardContent className="p-0">
            <h1 className="text-2xl font-bold mb-4 font-orbitron">No Results Found</h1>
            <p className="text-muted-foreground mb-4">
              No results found for: <span className="font-mono">{query}</span>
            </p>
            <p className="text-muted-foreground">Try searching for:</p>
            <ul className="list-disc list-inside mt-2 text-muted-foreground">
              <li>Transaction signatures (88+ characters)</li>
              <li>Wallet addresses (32-44 characters)</li>
              <li>Block numbers</li>
              <li>Token addresses</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
