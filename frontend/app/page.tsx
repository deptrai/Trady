import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AnimatedWalletLines } from "@/components/animated-wallet-lines"
import { LiveStatsBar } from "@/components/live-stats-bar"
import { Copy, MessageSquare, Shield, Zap, Users, TrendingUp } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col relative overflow-hidden">
      <Navbar variant="landing" />
      <AnimatedWalletLines />

      {/* Hero Section */}
      <section className="pt-28 md:pt-32 pb-16 md:pb-20 relative">
        <div className="animated-bg"></div>
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6">
              Trade Smarter.
              <br />
              <span className="text-primary">Copy Better.</span>
            </h1>
            <p className="mt-4 text-base md:text-lg text-muted-foreground mb-8">
              The social copy trading DEX for Solana.
              <br className="hidden sm:block" />
              Discover top wallets. Mirror their trades. Win together.
            </p>
            <Link href="/create">
              <button className="bg-gradient-to-r from-primary to-tertiary text-primary-foreground font-bold rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20">
                Create Wallet & Launch App
              </button>
            </Link>

            <div className="mt-12 md:mt-16 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              <div className="stats-card p-4 md:p-6">
                <p className="text-xl md:text-3xl font-bold text-primary">$12M+</p>
                <p className="text-xs md:text-sm text-muted-foreground">Trading Volume</p>
              </div>
              <div className="stats-card p-4 md:p-6">
                <p className="text-xl md:text-3xl font-bold text-secondary">5.2K+</p>
                <p className="text-xs md:text-sm text-muted-foreground">Active Traders</p>
              </div>
              <div className="stats-card p-4 md:p-6">
                <p className="text-xl md:text-3xl font-bold text-tertiary">1.8K+</p>
                <p className="text-xs md:text-sm text-muted-foreground">Copy Traders</p>
              </div>
              <div className="stats-card p-4 md:p-6">
                <p className="text-xl md:text-3xl font-bold text-primary">24/7</p>
                <p className="text-xs md:text-sm text-muted-foreground">Market Coverage</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-20 bg-muted/10">
        <div className="container">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="section-title">Not Just Another Swap Platform</h2>
            <p className="section-subtitle">We built Trady to feel like a product—not just a protocol.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="bg-card p-6 md:p-8 rounded-lg border border-border/50 hover:border-primary/50 transition-all duration-300">
              <div className="feature-icon bg-primary/10">
                <Copy className="h-5 w-5 md:h-6 md:w-6 text-primary" />
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-3">CopySwap</h3>
              <p className="text-sm md:text-base text-muted-foreground">
                Auto-mirror smart wallets with one click. Let the pros do the work while you earn.
              </p>
            </div>

            <div className="bg-card p-6 md:p-8 rounded-lg border border-border/50 hover:border-secondary/50 transition-all duration-300">
              <div className="feature-icon bg-secondary/10">
                <MessageSquare className="h-5 w-5 md:h-6 md:w-6 text-secondary" />
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-3">Live Token Chat</h3>
              <p className="text-sm md:text-base text-muted-foreground">
                Talk while you trade. Get real-time insights from other traders before making your move.
              </p>
            </div>

            <div className="bg-card p-6 md:p-8 rounded-lg border border-border/50 hover:border-tertiary/50 transition-all duration-300">
              <div className="feature-icon bg-tertiary/10">
                <Shield className="h-5 w-5 md:h-6 md:w-6 text-tertiary" />
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-3">Wallet Reputation</h3>
              <p className="text-sm md:text-base text-muted-foreground">
                See who's legit before copying. Our reputation system helps you avoid scams and find winners.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Live Stats Section */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="section-title">Live Market Pulse</h2>
            <p className="section-subtitle">Real-time insights into what's happening on Trady right now.</p>
          </div>

          <div className="stats-grid">
            <div className="stats-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg md:text-xl font-bold">Wallets Copying</h3>
                <Users className="h-4 w-4 md:h-5 md:w-5 text-primary" />
              </div>
              <p className="text-2xl md:text-4xl font-bold">1,245</p>
              <p className="text-xs md:text-sm text-muted-foreground mt-2">+12% from last week</p>
            </div>

            <div className="stats-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg md:text-xl font-bold">24h Volume</h3>
                <TrendingUp className="h-4 w-4 md:h-5 md:w-5 text-secondary" />
              </div>
              <p className="text-2xl md:text-4xl font-bold">$345K</p>
              <p className="text-xs md:text-sm text-muted-foreground mt-2">+8% from yesterday</p>
            </div>

            <div className="stats-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg md:text-xl font-bold">Trending Tokens</h3>
                <Zap className="h-4 w-4 md:h-5 md:w-5 text-tertiary" />
              </div>
              <p className="text-2xl md:text-4xl font-bold">22</p>
              <p className="text-xs md:text-sm text-muted-foreground mt-2">Updated every minute</p>
            </div>
          </div>
        </div>
      </section>

      {/* App Preview Section */}
      <section className="py-16 md:py-20 bg-muted/10">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6">Trade Smarter, Not Harder</h2>
              <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6">
                Trady goes beyond basic DEX platforms by making swapping social, smart, and simple. It's built for both
                degens and first-timers who want an edge without doing all the work.
              </p>
              <p className="text-sm md:text-base text-muted-foreground mb-6 md:mb-8">
                By following the right wallets, you can ride their wave — automatically.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                <Link href="/app">
                  <button className="bg-gradient-to-r from-primary to-tertiary text-primary-foreground font-bold rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20">
                    Launch App
                  </button>
                </Link>
                <Link href="/docs">
                  <button className="bg-transparent border border-primary/50 text-primary font-bold rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5 transition-all duration-300 hover:bg-primary/10">
                    Read Docs
                  </button>
                </Link>
              </div>
            </div>

            <div className="relative mt-8 lg:mt-0">
              <div className="relative z-10 rounded-lg overflow-hidden border border-border/50 shadow-xl">
                <Image
                  src="/dark-crypto-dashboard.png"
                  alt="Trady App Interface"
                  width={800}
                  height={600}
                  className="w-full h-auto"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 -z-10 w-full h-full bg-gradient-to-br from-primary/20 via-secondary/20 to-tertiary/20 rounded-lg blur-md" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-semibold mb-3 md:mb-4">Ready to Trady?</h3>
            <p className="text-sm md:text-base text-muted-foreground mb-6 md:mb-8">
              No sign-ups. No guesswork. Just connect & copy.
            </p>
            <Link href="/app">
              <button className="bg-primary text-primary-foreground font-bold rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20">
                Launch App
              </button>
            </Link>
            <p className="text-xs md:text-sm text-muted-foreground mt-4">
              No sign-up required. Just connect your wallet.
            </p>
          </div>
        </div>
      </section>

      <LiveStatsBar />
      <Footer />
    </main>
  )
}
