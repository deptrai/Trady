import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { HexGrid } from "@/components/hex-grid"

// Sample NFT collections for display
const popularCollections = [
  {
    id: "degods",
    name: "DeGods",
    image: "/stylized-deity-skull.png",
    floor: 56.7,
    volume: 1245.8,
  },
  {
    id: "okay_bears",
    name: "Okay Bears",
    image: "/abstract-bear-shapes.png",
    floor: 42.3,
    volume: 987.5,
  },
  {
    id: "solana_monkey_business",
    name: "Solana Monkey Business",
    image: "/pixelated-primate.png",
    floor: 128.9,
    volume: 2345.6,
  },
  {
    id: "degenerate_ape_academy",
    name: "Degenerate Ape Academy",
    image: "/stylized-apes.png",
    floor: 35.2,
    volume: 876.4,
  },
  {
    id: "aurory",
    name: "Aurory",
    image: "/mystical-aurory.png",
    floor: 18.5,
    volume: 543.2,
  },
  {
    id: "shadowy_super_coder",
    name: "Shadowy Super Coder",
    image: "/enigmatic-coder.png",
    floor: 8.7,
    volume: 321.9,
  },
  {
    id: "famous_fox_federation",
    name: "Famous Fox Federation",
    image: "/stylized-fox-collection.png",
    floor: 24.6,
    volume: 765.3,
  },
  {
    id: "cets_on_creck",
    name: "Cets on Creck",
    image: "/placeholder.svg?height=300&width=300&query=Cets on Creck NFT",
    floor: 12.3,
    volume: 432.1,
  },
]

export default function NFTsPage() {
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
          <h1 className="text-3xl font-bold mb-2 font-orbitron cyber-gradient-text">NFT Collections</h1>
          <p className="text-muted-foreground">Explore popular NFT collections on Solana</p>
        </div>

        <Card className="cyber-border mb-8">
          <CardHeader>
            <CardTitle className="font-orbitron">Popular Collections</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {popularCollections.map((collection) => (
                <Link key={collection.id} href={`/nft/collection/${collection.id}`} className="group">
                  <div className="bg-cyber-dark/50 rounded-lg overflow-hidden cyber-border transition-all duration-300 group-hover:bg-cyber-dark/70 group-hover:border-cyber-purple/50">
                    <div className="aspect-square relative">
                      <Image
                        src={collection.image || "/placeholder.svg"}
                        alt={collection.name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-medium mb-2">{collection.name}</h3>
                      <div className="flex justify-between text-sm">
                        <div>
                          <div className="text-muted-foreground">Floor</div>
                          <div className="font-medium">{collection.floor} SOL</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Volume</div>
                          <div className="font-medium">{collection.volume} SOL</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="cyber-border">
          <CardHeader>
            <CardTitle className="font-orbitron">Recent Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full cyber-table">
                <thead>
                  <tr>
                    <th>NFT</th>
                    <th>Collection</th>
                    <th>Price</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>
                  {[...Array(10)].map((_, index) => (
                    <tr key={index}>
                      <td>
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-cyber-dark rounded-md overflow-hidden">
                            <Image
                              src={`/placeholder.svg?height=40&width=40&query=NFT ${index + 1}`}
                              alt={`NFT ${index + 1}`}
                              width={40}
                              height={40}
                              className="object-cover"
                            />
                          </div>
                          <span className="font-medium">#{Math.floor(Math.random() * 10000)}</span>
                        </div>
                      </td>
                      <td>{popularCollections[index % popularCollections.length].name}</td>
                      <td>{(Math.random() * 100).toFixed(2)} SOL</td>
                      <td>{Math.floor(Math.random() * 24)} hours ago</td>
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
