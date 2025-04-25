"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { AlertTriangle, CheckCircle, Search, Shield, XCircle } from "lucide-react"

export default function WalletsPage() {
  const [walletAddress, setWalletAddress] = useState("0xAb3...c7F")
  const [isAnalyzed, setIsAnalyzed] = useState(true)

  const handleAnalyze = () => {
    // In a real app, this would call an API to analyze the wallet
    setIsAnalyzed(true)
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Check Wallet Safety</h1>
        <p className="text-muted-foreground">Verify any wallet's reputation before copying their trades.</p>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Analyze Wallet</CardTitle>
          <CardDescription>Enter a wallet address to check its reputation and trading history.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Enter wallet address..."
                className="pl-9"
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
              />
            </div>
            <button className="btn-gradient" onClick={handleAnalyze}>
              Analyze
            </button>
          </div>
        </CardContent>
      </Card>

      {isAnalyzed && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Smart Score
                </CardTitle>
                <CardDescription>Based on win rate, token selection, and timing.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Score</span>
                  <span className="font-bold text-lg">89/100</span>
                </div>
                <Progress value={89} className="h-2 bg-muted" />

                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Win Rate</span>
                    <span>78%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Avg. ROI</span>
                    <span className="text-green-500">+142.5%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Trading Frequency</span>
                    <span>High</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-500" />
                  Risk Rating
                </CardTitle>
                <CardDescription>Checks for previous rugs, liquidity pull signs, and unusual behavior.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Risk Level</span>
                  <span className="font-bold text-lg text-green-500">Low</span>
                </div>
                <Progress value={25} className="h-2 bg-muted" />

                <div className="mt-4 space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Rug History</span>
                    <span className="flex items-center text-green-500">
                      <CheckCircle className="h-4 w-4 mr-1" /> None
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Suspicious Activity</span>
                    <span className="flex items-center text-green-500">
                      <CheckCircle className="h-4 w-4 mr-1" /> None
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Liquidity Pulls</span>
                    <span className="flex items-center text-green-500">
                      <CheckCircle className="h-4 w-4 mr-1" /> None
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  Verification
                </CardTitle>
                <CardDescription>Identity verification and social proof.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Status</span>
                  <span className="font-bold text-lg text-yellow-500">Partial</span>
                </div>
                <Progress value={50} className="h-2 bg-muted" />

                <div className="mt-4 space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Twitter</span>
                    <span className="flex items-center text-green-500">
                      <CheckCircle className="h-4 w-4 mr-1" /> Verified
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Discord</span>
                    <span className="flex items-center text-green-500">
                      <CheckCircle className="h-4 w-4 mr-1" /> Verified
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">KYC</span>
                    <span className="flex items-center text-red-500">
                      <XCircle className="h-4 w-4 mr-1" /> Not Verified
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Trading History</CardTitle>
                <CardDescription>Recent trades and performance metrics.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { token: "BONK", action: "Buy", amount: "$2,500", result: "+42.3%", date: "2 days ago", win: true },
                    { token: "JTO", action: "Sell", amount: "$1,800", result: "+15.7%", date: "4 days ago", win: true },
                    { token: "PYTH", action: "Buy", amount: "$3,200", result: "+8.4%", date: "1 week ago", win: true },
                    { token: "MEAN", action: "Sell", amount: "$950", result: "-3.2%", date: "2 weeks ago", win: false },
                    {
                      token: "BOME",
                      action: "Buy",
                      amount: "$1,200",
                      result: "+18.7%",
                      date: "3 weeks ago",
                      win: true,
                    },
                  ].map((trade, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-muted/20 rounded-md">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                          {trade.token.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium">{trade.token}</p>
                          <p className="text-xs text-muted-foreground">{trade.date}</p>
                        </div>
                      </div>
                      <div>
                        <p className="font-medium">
                          {trade.action} {trade.amount}
                        </p>
                        <p className={`text-xs text-right ${trade.win ? "text-green-500" : "text-red-500"}`}>
                          {trade.result}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Token Preferences</CardTitle>
                <CardDescription>Most traded tokens and success rates.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { token: "SOL", trades: 24, winRate: "83%", avgROI: "+12.5%" },
                    { token: "BONK", trades: 18, winRate: "78%", avgROI: "+32.8%" },
                    { token: "JTO", trades: 15, winRate: "73%", avgROI: "+8.7%" },
                    { token: "PYTH", trades: 12, winRate: "67%", avgROI: "+15.2%" },
                    { token: "BOME", trades: 8, winRate: "75%", avgROI: "+22.4%" },
                  ].map((token, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-muted/20 rounded-md">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                          {token.token.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium">{token.token}</p>
                          <p className="text-xs text-muted-foreground">{token.trades} trades</p>
                        </div>
                      </div>
                      <div>
                        <p className="font-medium text-right">{token.winRate} win rate</p>
                        <p className="text-xs text-right text-green-500">{token.avgROI} avg. ROI</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  )
}
