"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, Shield, TrendingUp, AlertTriangle, Loader2, CheckCircle } from "lucide-react"
import { getTrustedWallets, getFollowedWallets, followWallet, unfollowWallet } from "@/lib/services/api"

// Định nghĩa kiểu dữ liệu cho wallet
type Wallet = {
  address: string;
  roi: string;
  followers: number;
  trades: number;
  winRate: string;
  risk: string;
  isRealData?: boolean;
}

export default function CopyPage() {
  // State cho dữ liệu
  const [wallets, setWallets] = useState<Wallet[]>([])
  const [followingWallets, setFollowingWallets] = useState<Wallet[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [dataStatus, setDataStatus] = useState<'real' | 'mixed' | 'mock'>('mock')
  
  // Fetch dữ liệu khi component mount
  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      setError(null)
      
      try {
        // Lấy danh sách ví từ API
        const trustedWallets = await getTrustedWallets();
        const followed = await getFollowedWallets();
        
        // Kiểm tra xem có dữ liệu thật không
        const hasRealData = trustedWallets.some(wallet => wallet.isRealData === true);
        const allMockData = trustedWallets.every(wallet => wallet.isRealData === false);
        
        setDataStatus(hasRealData ? (allMockData ? 'real' : 'mixed') : 'mock');
        
        // Chuyển đổi sang định dạng UI
        if (trustedWallets && trustedWallets.length > 0) {            
          const formattedWallets = trustedWallets.map(wallet => ({
            address: wallet.address || '0x000...000',
            roi: wallet.performance ? `+${wallet.performance}%` : '+0.0%',
            followers: wallet.followerCount || 0,
            trades: wallet.tradeCount || 0,
            winRate: wallet.winRate ? `${wallet.winRate}%` : '0%',
            risk: wallet.riskLevel || 'Medium',
            isRealData: wallet.isRealData || false
          }));
          
          setWallets(formattedWallets);
        } else {
          // Dữ liệu mẫu khi API không trả về dữ liệu
          setWallets([
            { address: "0xAb3...c7F", roi: "+142.5%", followers: 1243, trades: 87, winRate: "78%", risk: "Low", isRealData: false },
            { address: "0xDe7...f9B", roi: "+87.3%", followers: 876, trades: 124, winRate: "72%", risk: "Medium", isRealData: false },
            { address: "0x58F...e2A", roi: "+65.8%", followers: 512, trades: 56, winRate: "82%", risk: "Low", isRealData: false },
            { address: "0x91C...j7Y", roi: "+52.1%", followers: 378, trades: 68, winRate: "75%", risk: "Low", isRealData: false },
            { address: "0xF3P...s9W", roi: "+48.7%", followers: 256, trades: 92, winRate: "70%", risk: "Medium", isRealData: false },
            { address: "0xK7L...r2P", roi: "+43.2%", followers: 187, trades: 45, winRate: "80%", risk: "Low", isRealData: false },
          ]);
        }
        
        // Lấy danh sách ví đang theo dõi từ localStorage
        if (followed && followed.length > 0) {
          setFollowingWallets(followed);
        }
      } catch (err: any) {
        console.error('Lỗi khi lấy dữ liệu ví:', err);
        setError(`Lỗi khi lấy dữ liệu ví: ${err.message || 'Không xác định'}`);
        
        // Dùng dữ liệu mẫu khi có lỗi
        setWallets([
          { address: "0xAb3...c7F", roi: "+142.5%", followers: 1243, trades: 87, winRate: "78%", risk: "Low", isRealData: false },
          { address: "0xDe7...f9B", roi: "+87.3%", followers: 876, trades: 124, winRate: "72%", risk: "Medium", isRealData: false },
          { address: "0x58F...e2A", roi: "+65.8%", followers: 512, trades: 56, winRate: "82%", risk: "Low", isRealData: false },
          { address: "0x91C...j7Y", roi: "+52.1%", followers: 378, trades: 68, winRate: "75%", risk: "Low", isRealData: false },
          { address: "0xF3P...s9W", roi: "+48.7%", followers: 256, trades: 92, winRate: "70%", risk: "Medium", isRealData: false },
          { address: "0xK7L...r2P", roi: "+43.2%", followers: 187, trades: 45, winRate: "80%", risk: "Low", isRealData: false },
        ]);
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
  }, []);

  const toggleFollow = async (wallet: Wallet) => {
    // Kiểm tra xem ví đã được theo dõi chưa
    const isFollowing = followingWallets.some(w => w.address === wallet.address);
    
    if (isFollowing) {
      // Hủy theo dõi ví
      const success = await unfollowWallet(wallet.address);
      if (success) {
        setFollowingWallets(followingWallets.filter((w) => w.address !== wallet.address));
      }
    } else {
      // Thêm ví vào danh sách theo dõi
      const success = await followWallet(wallet);
      if (success) {
        setFollowingWallets([...followingWallets, wallet]);

        // Tạo hiệu ứng theo dõi ví
        const trailElement = document.createElement("div");
        trailElement.className = "wallet-trail";
        trailElement.style.left = `${Math.random() * 80 + 10}%`;
        trailElement.style.top = "0";
        document.body.appendChild(trailElement);

        setTimeout(() => {
          document.body.removeChild(trailElement);
        }, 2000);
      }
    }
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Auto-Mirror Smart Wallets</h1>
        <p className="text-muted-foreground">Pick a wallet. Let Trady handle the swaps.</p>
      </div>

      {/* Chỉ báo trạng thái dữ liệu */}
      {!loading && (
        <div className="flex justify-end mb-4">
          {dataStatus === 'real' && (
            <span className="text-xs flex items-center text-green-500">
              <CheckCircle className="h-3 w-3 mr-1" />
              Dữ liệu thật
            </span>
          )}
          {dataStatus === 'mock' && (
            <span className="text-xs flex items-center text-amber-500">
              <AlertTriangle className="h-3 w-3 mr-1" />
              Dữ liệu mẫu
            </span>
          )}
          {dataStatus === 'mixed' && (
            <span className="text-xs flex items-center text-blue-500">
              <AlertTriangle className="h-3 w-3 mr-1" />
              Dữ liệu hỗn hợp
            </span>
          )}
        </div>
      )}
      
      {followingWallets.length > 0 && (
        <div className="bg-primary/10 rounded-lg p-4 mb-8 border border-primary/30">
          <h3 className="font-bold mb-2 flex items-center gap-2">
            <Copy size={16} className="text-primary" />
            Đang theo dõi {followingWallets.length} ví{followingWallets.length > 1 ? "" : ""}
          </h3>
          <div className="flex flex-wrap gap-2">
            {followingWallets.map((wallet, index) => (
              <div key={index} className="bg-muted/50 rounded-lg px-3 py-1 text-sm flex items-center gap-2">
                <span className="font-mono">{wallet.address}</span>
                <button
                  onClick={() => toggleFollow(wallet)}
                  className="text-red-500 hover:text-red-400 transition-colors"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Thông báo lỗi */}
      {error && !loading && (
        <div className="flex items-center mb-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-md">
          <AlertTriangle className="h-4 w-4 text-yellow-500 mr-2" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      <Tabs defaultValue="top" className="mb-8">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="top">Top Wallets</TabsTrigger>
          <TabsTrigger value="trending">Trending</TabsTrigger>
          <TabsTrigger value="safe">Safest</TabsTrigger>
        </TabsList>

        <TabsContent value="top">
          {loading ? (
            <div className="flex items-center justify-center py-10">
              <Loader2 className="h-6 w-6 animate-spin mr-2 text-primary" />
              <p>Đang tải dữ liệu ví...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wallets.map((wallet, i) => (
              <Card key={i} className="wallet-card">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center font-bold">
                        {i + 1}
                      </div>
                      <div>
                        <p className="font-mono">{wallet.address}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex items-center text-xs text-green-500 gap-1">
                            <TrendingUp className="h-3 w-3" />
                            <span>{wallet.roi}</span>
                          </div>
                          <div className="w-1 h-1 rounded-full bg-muted-foreground" />
                          <div className="text-xs text-muted-foreground">{wallet.followers} followers</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center mb-4">
                    <div className="bg-muted/30 p-2 rounded-md">
                      <p className="text-xs text-muted-foreground">Trades</p>
                      <p className="font-medium">{wallet.trades}</p>
                    </div>
                    <div className="bg-muted/30 p-2 rounded-md">
                      <p className="text-xs text-muted-foreground">Win Rate</p>
                      <p className="font-medium">{wallet.winRate}</p>
                    </div>
                    <div className="bg-muted/30 p-2 rounded-md">
                      <p className="text-xs text-muted-foreground">Risk</p>
                      <p className="font-medium flex items-center justify-center gap-1">
                        <Shield className="h-3 w-3 text-green-500" />
                        {wallet.risk}
                      </p>
                    </div>
                  </div>

                  <button
                    className={`copy-button w-full ${followingWallets.some(w => w.address === wallet.address) ? "bg-green-500" : ""} ${!followingWallets.some(w => w.address === wallet.address) ? "pulse" : ""}`}
                    onClick={() => toggleFollow(wallet)}
                  >
                    {followingWallets.some(w => w.address === wallet.address) ? <>Đang theo dõi</> : <>Theo dõi ví này</>}
                  </button>
                </CardContent>
              </Card>
            ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="trending">
          <div className="bg-card rounded-lg border border-border/50 p-8 text-center">
            <p className="text-muted-foreground">Trending wallets loading...</p>
          </div>
        </TabsContent>

        <TabsContent value="safe">
          <div className="bg-card rounded-lg border border-border/50 p-8 text-center">
            <p className="text-muted-foreground">Safest wallets loading...</p>
          </div>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>How Copy Trading Works</CardTitle>
          <CardDescription>Trady automatically mirrors trades from wallets you follow</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-muted/20 p-4 rounded-lg">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mb-3">1</div>
              <h3 className="font-bold mb-2">Choose Wallets</h3>
              <p className="text-sm text-muted-foreground">
                Select from our curated list of top-performing wallets with proven track records.
              </p>
            </div>
            <div className="bg-muted/20 p-4 rounded-lg">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mb-3">2</div>
              <h3 className="font-bold mb-2">Set Parameters</h3>
              <p className="text-sm text-muted-foreground">
                Customize your risk level, maximum allocation per trade, and other settings.
              </p>
            </div>
            <div className="bg-muted/20 p-4 rounded-lg">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mb-3">3</div>
              <h3 className="font-bold mb-2">Auto-Execute</h3>
              <p className="text-sm text-muted-foreground">
                Trady automatically executes trades when your followed wallets make moves.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
