import { Connection } from "@solana/web3.js"
import type { TokenInfo } from "@solana/spl-token-registry"
import JSBI from "jsbi"

// Jupiter API endpoint
const JUPITER_API_ENDPOINT = "https://quote-api.jup.ag/v6"

// Solana RPC endpoint
const SOLANA_RPC_ENDPOINT = "https://api.mainnet-beta.solana.com"

// Connection instance
const connection = new Connection(SOLANA_RPC_ENDPOINT)

// Token list cache
let tokenListCache: TokenInfo[] | null = null

/**
 * Fetch token list from Jupiter
 */
export async function getTokenList(): Promise<TokenInfo[]> {
  if (tokenListCache) return tokenListCache

  try {
    const response = await fetch("https://token.jup.ag/all")
    const tokens = await response.json()
    tokenListCache = tokens
    return tokens
  } catch (error) {
    console.error("Error fetching token list:", error)
    return []
  }
}

/**
 * Get token by mint address
 */
export async function getTokenByMint(mintAddress: string): Promise<TokenInfo | undefined> {
  const tokens = await getTokenList()
  return tokens.find((token) => token.address === mintAddress)
}

/**
 * Get token by symbol
 */
export async function getTokenBySymbol(symbol: string): Promise<TokenInfo | undefined> {
  const tokens = await getTokenList()
  return tokens.find((token) => token.symbol === symbol)
}

/**
 * Get popular tokens
 */
export async function getPopularTokens(): Promise<TokenInfo[]> {
  const tokens = await getTokenList()
  const popularSymbols = ["SOL", "USDC", "BONK", "JTO", "PYTH", "RNDR", "BOME", "JUP", "MEAN"]

  return tokens.filter((token) => popularSymbols.includes(token.symbol))
}

/**
 * Interface for quote request
 */
export interface QuoteRequest {
  inputMint: string
  outputMint: string
  amount: string // In lamports/smallest unit
  slippageBps: number // Basis points (e.g., 50 = 0.5%)
  onlyDirectRoutes?: boolean
  asLegacyTransaction?: boolean
  userPublicKey?: string
}

/**
 * Interface for quote response
 */
export interface QuoteResponse {
  inputMint: string
  outputMint: string
  inAmount: string
  outAmount: string
  otherAmountThreshold: string
  swapMode: string
  slippageBps: number
  platformFee: {
    amount: string
    feeBps: number
  }
  priceImpactPct: string
  routePlan: {
    swapInfo: {
      amountIn: number
      amountOut: number
      inputMint: string
      outputMint: string
      sourceLabel: string // DEX name (e.g., "Raydium", "Meteora")
      fee: {
        amount: string
        mint: string
        pct: string
      }
    }[]
    percent: number
  }[]
  contextSlot: number
  timeTaken: number
}

/**
 * Get quote from Jupiter
 */
export async function getQuote(quoteRequest: QuoteRequest): Promise<QuoteResponse | null> {
  try {
    // Convert request to URL params
    const searchParams = new URLSearchParams()
    searchParams.append("inputMint", quoteRequest.inputMint)
    searchParams.append("outputMint", quoteRequest.outputMint)
    searchParams.append("amount", quoteRequest.amount)
    searchParams.append("slippageBps", quoteRequest.slippageBps.toString())

    if (quoteRequest.onlyDirectRoutes) {
      searchParams.append("onlyDirectRoutes", quoteRequest.onlyDirectRoutes.toString())
    }

    if (quoteRequest.asLegacyTransaction) {
      searchParams.append("asLegacyTransaction", quoteRequest.asLegacyTransaction.toString())
    }

    if (quoteRequest.userPublicKey) {
      searchParams.append("userPublicKey", quoteRequest.userPublicKey)
    }

    const response = await fetch(`${JUPITER_API_ENDPOINT}/quote?${searchParams.toString()}`)

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Error fetching quote: ${errorText}`)
    }

    const quoteResponse: QuoteResponse = await response.json()
    return quoteResponse
  } catch (error) {
    console.error("Error getting quote:", error)
    return null
  }
}

/**
 * Format amount based on token decimals
 */
export function formatAmount(amount: string, decimals: number): string {
  const amountBigInt = JSBI.BigInt(amount)
  const divisorBigInt = JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(decimals))
  const wholePart = JSBI.divide(amountBigInt, divisorBigInt).toString()

  const fractionBigInt = JSBI.remainder(amountBigInt, divisorBigInt)
  let fractionString = fractionBigInt.toString().padStart(decimals, "0")

  // Remove trailing zeros
  fractionString = fractionString.replace(/0+$/, "")

  if (fractionString.length > 0) {
    return `${wholePart}.${fractionString}`
  }

  return wholePart
}

/**
 * Parse amount to lamports/smallest unit
 */
export function parseAmount(amount: string, decimals: number): string {
  if (!amount || isNaN(Number(amount))) return "0"

  const parts = amount.split(".")
  const wholePart = parts[0] || "0"
  const fractionPart = parts[1] || ""

  const wholePartBigInt = JSBI.multiply(
    JSBI.BigInt(wholePart),
    JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(decimals)),
  )

  let fractionPartBigInt = JSBI.BigInt(0)
  if (fractionPart) {
    const paddedFractionPart = fractionPart.padEnd(decimals, "0").slice(0, decimals)
    fractionPartBigInt = JSBI.BigInt(paddedFractionPart)
  }

  return JSBI.add(wholePartBigInt, fractionPartBigInt).toString()
}

/**
 * Get swap transaction
 */
export async function getSwapTransaction(
  quoteResponse: QuoteResponse,
  userPublicKey: string,
): Promise<{ swapTransaction: string } | null> {
  try {
    const response = await fetch(`${JUPITER_API_ENDPOINT}/swap`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        quoteResponse,
        userPublicKey,
        wrapAndUnwrapSol: true,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Error creating swap transaction: ${errorText}`)
    }

    const swapResponse = await response.json()
    return swapResponse
  } catch (error) {
    console.error("Error getting swap transaction:", error)
    return null
  }
}

/**
 * Get DEX logos
 */
export function getDexLogo(dexName: string): string {
  const dexLogos: Record<string, string> = {
    Raydium: "/dex-logos/raydium.png",
    Meteora: "/dex-logos/meteora.png",
    Orca: "/dex-logos/orca.png",
    Openbook: "/dex-logos/openbook.png",
    Cykura: "/dex-logos/cykura.png",
    Saber: "/dex-logos/saber.png",
    Lifinity: "/dex-logos/lifinity.png",
    Cropper: "/dex-logos/cropper.png",
    Aldrin: "/dex-logos/aldrin.png",
    Serum: "/dex-logos/serum.png",
    Dexlab: "/dex-logos/dexlab.png",
  }

  return dexLogos[dexName] || "/dex-logos/default.png"
}
