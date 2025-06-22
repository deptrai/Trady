import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from "@/components/navbar"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ChainLens - Modern Blockchain Explorer",
  description: "A modern blockchain explorer for EVM-compatible networks",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <footer className="py-6 border-t">
              <div className="container flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
                <div className="text-sm text-muted-foreground">
                  © {new Date().getFullYear()} ChainLens. All rights reserved.
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <a href="/api" className="hover:underline">API</a>
                  <a href="https://github.com/chainlens/chainlens" className="hover:underline">GitHub</a>
                  <a href="/docs" className="hover:underline">Documentation</a>
                </div>
              </div>
            </footer>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}

import './globals.css'