"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pagination } from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { getTransactions } from "@/lib/services/api";
import { formatDistanceToNow } from "date-fns";

interface Transaction {
  hash: string;
  blockNumber: number;
  timestamp: string;
  from: string;
  to: string;
  value: string;
  gasPrice: string;
  status: boolean;
}

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  useEffect(() => {
    async function fetchTransactions() {
      setLoading(true);
      try {
        const response = await getTransactions(page, 20);
        setTransactions(response.transactions);
        setTotalPages(Math.ceil(response.pagination.total / response.pagination.limit));
      } catch (error) {
        console.error("Error fetching transactions:", error);
        // Mock data if API fails
        setTransactions(Array(20).fill(null).map((_, i) => ({
          hash: `0x${i}c94f2fd3f9e6f6c04c6e67bbb8e78f22b52e1fece4f4a0f2b6b0d1e3f4c5d6e`,
          blockNumber: 16123456 - i,
          timestamp: new Date(Date.now() - i * 15000).toISOString(),
          from: "0x7d9c94f2fd3f9e6f6c04c6e67bbb8e78f22b52e1f",
          to: "0x6e8da5e3fe4f0g7h8i9j0k1l2m3n4o5p6q7r8s9t",
          value: `${(Math.random() * 10).toFixed(4)} ETH`,
          gasPrice: "25 Gwei",
          status: Math.random() > 0.1 // 90% success rate
        })));
        setTotalPages(50); // Mock total pages
      } finally {
        setLoading(false);
      }
    }
    
    fetchTransactions();
  }, [page]);
  
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo(0, 0);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Latest Transactions</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Transaction Explorer</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Txn Hash</th>
                  <th className="text-left py-3 px-4">Block</th>
                  <th className="text-left py-3 px-4">Age</th>
                  <th className="text-left py-3 px-4">From</th>
                  <th className="text-left py-3 px-4">To</th>
                  <th className="text-left py-3 px-4">Value</th>
                  <th className="text-left py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  Array(10).fill(0).map((_, index) => (
                    <tr key={index} className="border-b">
                      <td className="py-3 px-4"><Skeleton className="h-6 w-36" /></td>
                      <td className="py-3 px-4"><Skeleton className="h-6 w-16" /></td>
                      <td className="py-3 px-4"><Skeleton className="h-6 w-24" /></td>
                      <td className="py-3 px-4"><Skeleton className="h-6 w-36" /></td>
                      <td className="py-3 px-4"><Skeleton className="h-6 w-36" /></td>
                      <td className="py-3 px-4"><Skeleton className="h-6 w-20" /></td>
                      <td className="py-3 px-4"><Skeleton className="h-6 w-16" /></td>
                    </tr>
                  ))
                ) : (
                  transactions.map((tx, index) => (
                    <tr key={index} className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4">
                        <Link href={`/tx/${tx.hash}`} className="text-blue-500 hover:underline">
                          {tx.hash.substring(0, 10)}...{tx.hash.substring(tx.hash.length - 8)}
                        </Link>
                      </td>
                      <td className="py-3 px-4">
                        <Link href={`/block/${tx.blockNumber}`} className="text-blue-500 hover:underline">
                          {tx.blockNumber}
                        </Link>
                      </td>
                      <td className="py-3 px-4">
                        {formatDistanceToNow(new Date(tx.timestamp), { addSuffix: true })}
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
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded text-xs ${tx.status ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'}`}>
                          {tx.status ? 'Success' : 'Failed'}
                        </span>
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