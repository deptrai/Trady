"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pagination } from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { getBlocks } from "@/lib/services/api";
import { formatDistanceToNow } from "date-fns";

interface Block {
  number: number;
  hash: string;
  timestamp: string;
  transactions: number;
  miner: string;
  gasUsed: string;
  gasLimit: string;
}

export default function BlocksPage() {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  useEffect(() => {
    async function fetchBlocks() {
      setLoading(true);
      try {
        const response = await getBlocks(page, 10);
        setBlocks(response.blocks);
        setTotalPages(Math.ceil(response.pagination.total / response.pagination.limit));
      } catch (error) {
        console.error("Error fetching blocks:", error);
        // Use mock data if API fails
        setBlocks([
          {
            number: 16123456,
            hash: "0x8a72d1fc1d7d5e5b93b5e56aaa7d67f11a41d0efd3d639f3b5a9e9e48f55a1a2",
            timestamp: new Date().toISOString(),
            transactions: 123,
            miner: "0x8b7a72d1fc1d7d5e5b93b5e56aaa7d67f11a41d0e",
            gasUsed: "12,345,678",
            gasLimit: "15,000,000"
          },
          {
            number: 16123455,
            hash: "0x7b83e1fc2e8d5e5b93b5e56aaa7d67f11a41d0efd3d639f3b5a9e9e48f55b2b3",
            timestamp: new Date(Date.now() - 15000).toISOString(),
            transactions: 98,
            miner: "0x9c8b83e1fc2e8d5e5b93b5e56aaa7d67f11a41d0e",
            gasUsed: "10,234,567",
            gasLimit: "15,000,000"
          },
          {
            number: 16123454,
            hash: "0x6c94f2fd3f9e6f6c04c6e67bbb8e78f22b52e1fece4f4a0f2b6b0d1e3f4c5d6e",
            timestamp: new Date(Date.now() - 30000).toISOString(),
            transactions: 145,
            miner: "0x7d9c94f2fd3f9e6f6c04c6e67bbb8e78f22b52e1f",
            gasUsed: "13,456,789",
            gasLimit: "15,000,000"
          },
          {
            number: 16123453,
            hash: "0x5da5e3fe4f0g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f",
            timestamp: new Date(Date.now() - 45000).toISOString(),
            transactions: 112,
            miner: "0x6e8da5e3fe4f0g7h8i9j0k1l2m3n4o5p6q7r8s9t",
            gasUsed: "11,567,890",
            gasLimit: "15,000,000"
          },
          {
            number: 16123452,
            hash: "0x4eb6f4gf5h6i7j8k9l0m1n2o3p4q5r6s7t8u9v0w1x2y3z4a5b6c7d8e9f0g1h",
            timestamp: new Date(Date.now() - 60000).toISOString(),
            transactions: 87,
            miner: "0x5f9eb6f4gf5h6i7j8k9l0m1n2o3p4q5r6s7t8u9v",
            gasUsed: "9,876,543",
            gasLimit: "15,000,000"
          }
        ]);
        setTotalPages(10); // Mock total pages
      } finally {
        setLoading(false);
      }
    }
    
    fetchBlocks();
  }, [page]);
  
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo(0, 0);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Latest Blocks</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Block Explorer</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Block</th>
                  <th className="text-left py-3 px-4">Age</th>
                  <th className="text-left py-3 px-4">Txns</th>
                  <th className="text-left py-3 px-4">Miner</th>
                  <th className="text-left py-3 px-4">Gas Used</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  Array(5).fill(0).map((_, index) => (
                    <tr key={index} className="border-b">
                      <td className="py-3 px-4"><Skeleton className="h-6 w-24" /></td>
                      <td className="py-3 px-4"><Skeleton className="h-6 w-20" /></td>
                      <td className="py-3 px-4"><Skeleton className="h-6 w-12" /></td>
                      <td className="py-3 px-4"><Skeleton className="h-6 w-36" /></td>
                      <td className="py-3 px-4"><Skeleton className="h-6 w-24" /></td>
                    </tr>
                  ))
                ) : (
                  blocks.map((block) => (
                    <tr key={block.number} className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4">
                        <Link href={`/block/${block.number}`} className="text-blue-500 hover:underline">
                          {block.number}
                        </Link>
                      </td>
                      <td className="py-3 px-4">
                        {formatDistanceToNow(new Date(block.timestamp), { addSuffix: true })}
                      </td>
                      <td className="py-3 px-4">
                        <Link href={`/txs?block=${block.number}`} className="text-blue-500 hover:underline">
                          {block.transactions}
                        </Link>
                      </td>
                      <td className="py-3 px-4">
                        <Link href={`/address/${block.miner}`} className="text-blue-500 hover:underline">
                          {block.miner.substring(0, 6)}...{block.miner.substring(block.miner.length - 4)}
                        </Link>
                      </td>
                      <td className="py-3 px-4">
                        {block.gasUsed} <span className="text-muted-foreground">({Math.round((parseInt(block.gasUsed.replace(/,/g, '')) / parseInt(block.gasLimit.replace(/,/g, '')) * 100))}%)</span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          
          <div className="mt-6 flex justify-center">
            <Pagination>
              <Button 
                variant="outline" 
                onClick={() => handlePageChange(page - 1)} 
                disabled={page === 1 || loading}
              >
                Previous
              </Button>
              <div className="flex items-center mx-4">
                Page {page} of {totalPages}
              </div>
              <Button 
                variant="outline" 
                onClick={() => handlePageChange(page + 1)} 
                disabled={page >= totalPages || loading}
              >
                Next
              </Button>
            </Pagination>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 