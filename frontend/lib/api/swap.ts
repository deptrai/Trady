import { Connection, Transaction } from "@solana/web3.js"
import { getQuote, getSwapTransaction, type QuoteRequest, type QuoteResponse } from "./jupiter"
import type { TokenInfo } from "@solana/spl-token-registry"
import type * as web3 from "@solana/web3.js"

// Solana RPC endpoint
const SOLANA_RPC_ENDPOINT = "https://api.mainnet-beta.solana.com"

// Connection instance
const connection = new Connection(SOLANA_RPC_ENDPOINT)

/**
 * Interface for swap result
 */
export interface SwapResult {
  success: boolean
  signature?: string
  error?: string
}

/**
 * Execute swap transaction
 */
export async function executeSwap(
  fromToken: TokenInfo,
  toToken: TokenInfo,
  amount: string,
  slippageBps: number,
  wallet: web3.Keypair,
): Promise<SwapResult> {
  try {
    // Get quote
    const quoteRequest: QuoteRequest = {
      inputMint: fromToken.address,
      outputMint: toToken.address,
      amount,
      slippageBps,
      userPublicKey: wallet.publicKey.toString(),
    }

    const quoteResponse = await getQuote(quoteRequest)

    if (!quoteResponse) {
      return {
        success: false,
        error: "Failed to get quote",
      }
    }

    // Get swap transaction
    const swapTransactionResponse = await getSwapTransaction(quoteResponse, wallet.publicKey.toString())

    if (!swapTransactionResponse) {
      return {
        success: false,
        error: "Failed to create swap transaction",
      }
    }

    // Deserialize transaction
    const swapTransactionBuf = Buffer.from(swapTransactionResponse.swapTransaction, "base64")
    const transaction = Transaction.from(swapTransactionBuf)

    // Sign and send transaction
    transaction.partialSign(wallet)

    const signature = await connection.sendRawTransaction(transaction.serialize())

    // Wait for confirmation
    await connection.confirmTransaction(signature)

    return {
      success: true,
      signature,
    }
  } catch (error) {
    console.error("Error executing swap:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    }
  }
}

/**
 * Get route breakdown by DEX
 */
export function getRouteBreakdown(quoteResponse: QuoteResponse): { dex: string; percentage: number }[] {
  const breakdown: { dex: string; percentage: number }[] = []

  if (!quoteResponse.routePlan) return breakdown

  quoteResponse.routePlan.forEach((route) => {
    route.swapInfo.forEach((swap) => {
      const existingDex = breakdown.find((item) => item.dex === swap.sourceLabel)

      if (existingDex) {
        existingDex.percentage += route.percent
      } else {
        breakdown.push({
          dex: swap.sourceLabel,
          percentage: route.percent,
        })
      }
    })
  })

  return breakdown.sort((a, b) => b.percentage - a.percentage)
}

/**
 * Calculate price impact
 */
export function calculatePriceImpact(quoteResponse: QuoteResponse): string {
  return quoteResponse.priceImpactPct
}

/**
 * Calculate minimum received amount
 */
export function calculateMinimumReceived(quoteResponse: QuoteResponse): string {
  const outAmount = BigInt(quoteResponse.outAmount)
  const slippageBps = quoteResponse.slippageBps

  const slippageFactor = BigInt(10000 - slippageBps)
  const minimumReceived = (outAmount * slippageFactor) / BigInt(10000)

  return minimumReceived.toString()
}

/**
 * Format price
 */
export function formatPrice(
  inputAmount: string,
  outputAmount: string,
  inputDecimals: number,
  outputDecimals: number,
): string {
  const inputBigInt = BigInt(inputAmount)
  const outputBigInt = BigInt(outputAmount)

  const inputDivisor = BigInt(10) ** BigInt(inputDecimals)
  const outputDivisor = BigInt(10) ** BigInt(outputDecimals)

  const inputFloat = Number(inputBigInt) / Number(inputDivisor)
  const outputFloat = Number(outputBigInt) / Number(outputDivisor)

  const price = outputFloat / inputFloat

  return price.toFixed(outputDecimals > 6 ? 6 : outputDecimals)
}
