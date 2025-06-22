"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"

interface ChartDataPoint {
  name: string;
  txs: number;
}

export default function NetworkStats() {
  const [stats, setStats] = useState({
    totalTxs: "1,245,678",
    activeAddresses: "125,432",
    totalBlocks: "16,238,456",
    averageGasPrice: "25 Gwei",
    chartData: [
      { name: "Mon", txs: 1200 },
      { name: "Tue", txs: 1400 },
      { name: "Wed", txs: 1000 },
      { name: "Thu", txs: 1500 },
      { name: "Fri", txs: 2000 },
      { name: "Sat", txs: 1800 },
      { name: "Sun", txs: 1600 },
    ] as ChartDataPoint[]
  })

  // In a real app, you would fetch this data from your API
  useEffect(() => {
    // Simulate API fetch
    const fetchNetworkStats = async () => {
      try {
        // This would be replaced with actual API calls
        // const response = await fetch('/api/stats');
        // const data = await response.json();
        // setStats(data);
      } catch (error) {
        console.error("Failed to fetch network stats:", error)
      }
    }

    fetchNetworkStats()
  }, [])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      <Card className="col-span-1 lg:col-span-2 bg-card/60 backdrop-blur-sm border-muted">
        <CardHeader>
          <CardTitle>Transaction Activity (7 Days)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.chartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="txs" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card/60 backdrop-blur-sm border-muted">
        <CardHeader>
          <CardTitle>Network Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-border pb-2">
              <span className="text-muted-foreground">Total Transactions</span>
              <span className="font-medium">{stats.totalTxs}</span>
            </div>
            <div className="flex justify-between items-center border-b border-border pb-2">
              <span className="text-muted-foreground">Active Addresses</span>
              <span className="font-medium">{stats.activeAddresses}</span>
            </div>
            <div className="flex justify-between items-center border-b border-border pb-2">
              <span className="text-muted-foreground">Total Blocks</span>
              <span className="font-medium">{stats.totalBlocks}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Average Gas Price</span>
              <span className="font-medium">{stats.averageGasPrice}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
