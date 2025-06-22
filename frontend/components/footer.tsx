import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-border/40 py-8 mt-20">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col items-center md:items-start">
            <Link href="/" className="flex items-center gap-2 mb-2">
              <span className="text-2xl font-bold font-space-grotesk text-primary">Chain Lens</span>
            </Link>
            <p className="text-sm text-muted-foreground">© Chain Lens 2025. Built on Solana.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-6 md:mt-0">
            <div className="flex flex-col gap-2">
              <h4 className="font-bold mb-2">Product</h4>
              <Link href="/app" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                App
              </Link>
              <Link href="/app/swap" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Swap
              </Link>
              <Link href="/app/copy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                CopySwap
              </Link>
            </div>

            <div className="flex flex-col gap-2">
              <h4 className="font-bold mb-2">Resources</h4>
              <Link href="/docs" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Docs
              </Link>
              <Link href="/blog" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Blog
              </Link>
              <Link href="/faq" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                FAQ
              </Link>
            </div>

            <div className="flex flex-col gap-2">
              <h4 className="font-bold mb-2">Company</h4>
              <Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                About
              </Link>
              <Link href="/careers" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Careers
              </Link>
              <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Contact
              </Link>
            </div>

            <div className="flex flex-col gap-2">
              <h4 className="font-bold mb-2">Legal</h4>
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Terms
              </Link>
              <Link href="/cookies" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>

        <div className="flex justify-center md:justify-end mt-8 gap-4">
          <Link
            href="https://twitter.com/Chain Lensxyz"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            Twitter
          </Link>
          <Link href="https://discord.gg/Chain Lens" className="text-muted-foreground hover:text-primary transition-colors">
            Discord
          </Link>
          <Link
            href="https://github.com/Chain Lensxyz"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            GitHub
          </Link>
        </div>
      </div>
    </footer>
  )
}
