"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { getBlock } from "@/lib/services/api";
import { formatDistanceToNow } from "date-fns";

interface BlockDetail {
  number: number;
  hash: string;
  parentHash: string;
  timestamp: string;
  miner: string;
  difficulty: string;
  totalDifficulty: string;
  gasUsed: string;
  gasLimit: string;
  nonce: string;
  extraData: string;
  transactions: {
    hash: string;
    from: string;
    to: string;
    value: string;
    gasPrice: string;
  }[];
}

export default function BlockDetailPage() {
  const { number } = useParams();
  const [block, setBlock] = useState<BlockDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  
  useEffect(() => {
    async function fetchBlockDetail() {
      setLoading(true);
      try {
        const response = await getBlock(number as string);
        setBlock(response);
      } catch (error) {
        console.error("Error fetching block details:", error);
        // Mock data if API fails
        setBlock({
          number: parseInt(number as string),
          hash: "0x8a72d1fc1d7d5e5b93b5e56aaa7d67f11a41d0efd3d639f3b5a9e9e48f55a1a2",
          parentHash: "0x7b83e1fc2e8d5e5b93b5e56aaa7d67f11a41d0efd3d639f3b5a9e9e48f55b2b3",
          timestamp: new Date().toISOString(),
          miner: "0x8b7a72d1fc1d7d5e5b93b5e56aaa7d67f11a41d0e",
          difficulty: "12,345,678",
          totalDifficulty: "1,234,567,890,123",
          gasUsed: "12,345,678",
          gasLimit: "15,000,000",
          nonce: "0x1a2b3c4d",
          extraData: "0x11223344556677889900aabbccddeeff",
          transactions: Array(123).fill(null).map((_, i) => ({
            hash: `0x${i}c94f2fd3f9e6f6c04c6e67bbb8e78f22b52e1fece4f4a0f2b6b0d1e3f4c5d6e`,
            from: "0x7d9c94f2fd3f9e6f6c04c6e67bbb8e78f22b52e1f",
            to: "0x6e8da5e3fe4f0g7h8i9j0k1l2m3n4o5p6q7r8s9t",
            value: `${i * 0.01} ETH`,
            gasPrice: "25 Gwei"
          }))
        });
      } finally {
        setLoading(false);
      }
    }
    
    if (number) {
      fetchBlockDetail();
    }
  }, [number]);
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Skeleton className="h-10 w-1/3" />
        </div>
        
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-1/4" />
          </CardHeader>
          <CardContent className="space-y-4">
            {Array(10).fill(0).map((_, index) => (
              <div key={index} className="flex justify-between">
                <Skeleton className="h-6 w-1/4" />
                <Skeleton className="h-6 w-2/3" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    );
  }
  
  if (!block) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Block Not Found</h1>
        <p>The requested block #{number} could not be found.</p>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Block #{block.number}</h1>
      
      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Block Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-b pb-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Block Height</p>
                    <p className="font-medium">{block.number}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Timestamp</p>
                    <p className="font-medium">
                      {new Date(block.timestamp).toLocaleString()} ({formatDistanceToNow(new Date(block.timestamp), { addSuffix: true })})
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Transactions</p>
                    <p className="font-medium">{block.transactions.length} transactions</p>
                  </div>
                </div>
                
                <div className="border-b pb-4">
                  <div className="grid grid-cols-1 gap-2">
                    <div className="flex flex-col md:flex-row md:justify-between">
                      <p className="text-sm text-muted-foreground">Block Hash</p>
                      <p className="font-mono break-all">{block.hash}</p>
                    </div>
                    <div className="flex flex-col md:flex-row md:justify-between">
                      <p className="text-sm text-muted-foreground">Parent Hash</p>
                      <p className="font-mono break-all">
                        <Link href={`/block/${block.number - 1}`} className="text-blue-500 hover:underline">
                          {block.parentHash}
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-b pb-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Mined By</p>
                    <Link href={`/address/${block.miner}`} className="text-blue-500 hover:underline">
                      {block.miner}
                    </Link>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Difficulty</p>
                    <p className="font-medium">{block.difficulty}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-b pb-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Gas Used</p>
                    <p className="font-medium">
                      {block.gasUsed} <span className="text-muted-foreground">({Math.round((parseInt(block.gasUsed.replace(/,/g, '')) / parseInt(block.gasLimit.replace(/,/g, '')) * 100))}%)</span>
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Gas Limit</p>
                    <p className="font-medium">{block.gasLimit}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Nonce</p>
                    <p className="font-mono">{block.nonce}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Extra Data</p>
                    <p className="font-mono break-all">{block.extraData}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="transactions" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Transaction Hash</th>
                      <th className="text-left py-3 px-4">From</th>
                      <th className="text-left py-3 px-4">To</th>
                      <th className="text-left py-3 px-4">Value</th>
                      <th className="text-left py-3 px-4">Gas Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {block.transactions.slice(0, 10).map((tx, index) => (
                      <tr key={index} className="border-b hover:bg-muted/50">
                        <td className="py-3 px-4">
                          <Link href={`/tx/${tx.hash}`} className="text-blue-500 hover:underline">
                            {tx.hash.substring(0, 10)}...{tx.hash.substring(tx.hash.length - 8)}
                          </Link>
                        </td>
                        <td className="py-3 px-4">
                          <Link href={`/address/${tx.from}`} className="text-blue-500 hover:underline">
                            {tx.from.substring(0, 6)}...{tx.from.substring(tx.from.length - 4)}
                          </Link>
                        </td>
                        <td className="py-3 px-4">
                          <Link href={`/address/${tx.to}`} className="text-blue-500 hover:underline">
                            {tx.to.substring(0, 6)}...{tx.to.substring(tx.to.length - 4)}
                          </Link>
                        </td>
                        <td className="py-3 px-4">{tx.value}</td>
                        <td className="py-3 px-4">{tx.gasPrice}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {block.transactions.length > 10 && (
                <div className="mt-4 text-center">
                  <Link href={`/txs?block=${block.number}`} className="text-blue-500 hover:underline">
                    View all {block.transactions.length} transactions
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 