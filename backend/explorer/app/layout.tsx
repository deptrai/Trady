import type React from "react"
import type { Metadata } from "next"
import { Inter, Orbitron } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const orbitron = Orbitron({ subsets: ["latin"], variable: "--font-orbitron" })

export const metadata: Metadata = {
  title: "Trady - Solana Blockchain Explorer",
  description: "Explore the Solana blockchain with Trady Explorer",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${orbitron.variable} font-sans bg-cyber-darker text-white`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <div className="cyber-noise"></div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
