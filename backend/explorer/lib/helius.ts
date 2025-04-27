import type { SolanaTransaction } from "@/types/transaction"
import type { Block } from "@/types/block"
import type { TokenBalance } from "@/types/token"
import { tokenList } from "@/lib/token-list"

// Replace with your own API key in .env.local
const HELIUS_API_KEY = process.env.HELIUS_API_KEY || "YOUR_API_KEY"
const HELIUS_RPC_URL = `https://mainnet.helius-rpc.com/?api-key=${HELIUS_API_KEY}`

// Cache for API calls
const apiCache = new Map()
const CACHE_DURATION = 60 * 1000 // 1 minute

// Cached fetch function to reduce API calls
async function cachedFetch(url: string, options: RequestInit, cacheKey: string, cacheDuration = CACHE_DURATION) {
  const now = Date.now()
  const cachedItem = apiCache.get(cacheKey)

  // Return from cache if valid
  if (cachedItem && now - cachedItem.timestamp < cacheDuration) {
    return cachedItem.data
  }

  try {
    // Fetch from API if not in cache or expired
    const response = await fetch(url, options)
    const data = await response.json()

    // Save to cache
    apiCache.set(cacheKey, {
      data,
      timestamp: now,
    })

    return data
  } catch (error) {
    // Use stale cache if available on error
    if (cachedItem) {
      console.warn(`Error fetching data, using stale cache for ${cacheKey}:`, error)
      return cachedItem.data
    }
    throw error
  }
}

export async function fetchSolPrice(): Promise<number> {
  try {
    const cacheKey = "sol-price"
    const data = await cachedFetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd",
      {},
      cacheKey,
      5 * 60 * 1000, // 5 minutes cache
    )
    return data.solana.usd
  } catch (error) {
    console.error("Error fetching SOL price:", error)
    return 150 // Default value
  }
}

export async function fetchLatestTransactions(limit = 10, address?: string): Promise<SolanaTransaction[]> {
  try {
    // If an address is provided, fetch transactions for that address
    // Otherwise, fetch general transactions
    const targetAddress = address || "1nc1nerator11111111111111111111111111111111"
    const cacheKey = `transactions-${targetAddress}-${limit}`

    const data = await cachedFetch(
      HELIUS_RPC_URL,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: "my-id",
          method: "getSignaturesForAddress",
          params: [targetAddress, { limit }],
        }),
      },
      cacheKey,
    )

    return data.result || []
  } catch (error) {
    console.error("Error fetching latest transactions:", error)
    return []
  }
}

export async function fetchTransactionDetails(signature: string): Promise<any> {
  try {
    const cacheKey = `transaction-${signature}`

    const data = await cachedFetch(
      HELIUS_RPC_URL,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: "my-id",
          method: "getTransaction",
          params: [signature, { encoding: "jsonParsed", maxSupportedTransactionVersion: 0 }],
        }),
      },
      cacheKey,
      30 * 60 * 1000, // 30 minutes cache (transactions don't change)
    )

    return data.result
  } catch (error) {
    console.error("Error fetching transaction details:", error)
    return null
  }
}

export async function fetchLatestBlocks(limit = 10): Promise<Block[]> {
  try {
    const latestHeight = await getLatestBlockHeight()
    const cacheKey = `blocks-${latestHeight}-${limit}`

    const data = await cachedFetch(
      HELIUS_RPC_URL,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: "my-id",
          method: "getBlocks",
          params: [latestHeight, latestHeight - limit],
        }),
      },
      cacheKey,
    )

    const blockNumbers = data.result || []

    // Fetch details for each block - but limit concurrent requests
    const blockDetails = []

    // Process blocks in batches of 3 to avoid overwhelming the API
    for (let i = 0; i < blockNumbers.length; i += 3) {
      const batch = blockNumbers.slice(i, i + 3)
      const batchResults = await Promise.all(
        batch.map(async (blockNumber: number) => {
          const blockCacheKey = `block-${blockNumber}`

          const blockData = await cachedFetch(
            HELIUS_RPC_URL,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                jsonrpc: "2.0",
                id: "my-id",
                method: "getBlock",
                params: [blockNumber, { encoding: "jsonParsed", maxSupportedTransactionVersion: 0 }],
              }),
            },
            blockCacheKey,
            10 * 60 * 1000, // 10 minutes cache (blocks don't change)
          )

          return {
            blockNumber,
            blockTime: blockData.result?.blockTime || 0,
            transactionCount: blockData.result?.transactions?.length || 0,
          }
        }),
      )

      blockDetails.push(...batchResults)
    }

    return blockDetails
  } catch (error) {
    console.error("Error fetching latest blocks:", error)
    return []
  }
}

export async function getLatestBlockHeight(): Promise<number> {
  try {
    const cacheKey = "latest-block-height"

    const data = await cachedFetch(
      HELIUS_RPC_URL,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: "my-id",
          method: "getLatestBlockhash",
          params: [],
        }),
      },
      cacheKey,
      30 * 1000, // 30 seconds cache
    )

    return data.result?.lastValidBlockHeight || 0
  } catch (error) {
    console.error("Error fetching latest block height:", error)
    return 0
  }
}

export async function fetchAccountInfo(address: string): Promise<any> {
  try {
    const cacheKey = `account-${address}`

    const data = await cachedFetch(
      HELIUS_RPC_URL,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: "my-id",
          method: "getAccountInfo",
          params: [address, { encoding: "jsonParsed" }],
        }),
      },
      cacheKey,
      2 * 60 * 1000, // 2 minutes cache
    )

    return data.result
  } catch (error) {
    console.error("Error fetching account info:", error)
    return null
  }
}

export async function fetchTokenBalances(address: string): Promise<TokenBalance[]> {
  try {
    const cacheKey = `token-balances-${address}`

    const data = await cachedFetch(
      HELIUS_RPC_URL,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: "my-id",
          method: "getTokenAccountsByOwner",
          params: [address, { programId: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA" }, { encoding: "jsonParsed" }],
        }),
      },
      cacheKey,
      2 * 60 * 1000, // 2 minutes cache
    )

    if (!data.result?.value) {
      return []
    }

    // Map the results to our TokenBalance type
    const tokenBalances = data.result.value
      .map((item: any) => {
        const parsedInfo = item.account?.data?.parsed?.info
        if (!parsedInfo) return null

        return {
          mint: parsedInfo.mint,
          amount: parsedInfo.tokenAmount?.uiAmount || 0,
          decimals: parsedInfo.tokenAmount?.decimals || 0,
        }
      })
      .filter(Boolean)

    // Process tokens with local token list first
    const tokensWithInfo = tokenBalances.map((token) => {
      // Check local token list first
      if (tokenList[token.mint]) {
        return {
          ...token,
          tokenInfo: tokenList[token.mint],
        }
      }

      // If not in local list, show contract address
      return {
        ...token,
        tokenInfo: {
          address: token.mint,
          name: `Token: ${token.mint.slice(0, 6)}...${token.mint.slice(-6)}`,
          symbol: token.mint.slice(0, 4).toUpperCase(),
          decimals: token.decimals,
          logoURI: null,
        },
      }
    })

    return tokensWithInfo
  } catch (error) {
    console.error("Error fetching token balances:", error)
    return []
  }
}

export async function fetchNFTs(address: string): Promise<any[]> {
  try {
    const cacheKey = `nfts-${address}`

    const data = await cachedFetch(
      `https://api.helius.xyz/v0/addresses/${address}/nfts?api-key=${HELIUS_API_KEY}`,
      {},
      cacheKey,
      5 * 60 * 1000, // 5 minutes cache
    )

    return data.nfts || []
  } catch (error) {
    console.error("Error fetching NFTs:", error)
    return []
  }
}

export async function fetchSupplyInfo(): Promise<{
  total: number
  circulating: number
}> {
  try {
    // Check if API key is available
    if (!HELIUS_API_KEY) {
      console.warn("Helius API key is not set. Using fallback supply values.")
      return { total: 555000000, circulating: 410000000 } // Fallback values
    }

    const cacheKey = "supply-info"

    const data = await cachedFetch(
      HELIUS_RPC_URL,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: "my-id",
          method: "getSupply",
          params: [],
        }),
      },
      cacheKey,
      10 * 60 * 1000, // 10 minutes cache
    )

    if (data.error) {
      console.error("API returned error:", data.error)
      throw new Error(`API error: ${data.error.message || JSON.stringify(data.error)}`)
    }

    if (!data.result?.value) {
      console.error("Invalid response format:", data)
      throw new Error("Invalid response format")
    }

    return {
      total: data.result.value.total / 10 ** 9 || 0,
      circulating: data.result.value.circulating / 10 ** 9 || 0,
    }
  } catch (error) {
    console.error("Error fetching supply info:", error)
    // Return fallback values on error
    return { total: 555000000, circulating: 410000000 }
  }
}

export async function fetchEpochInfo(): Promise<{
  epoch: number
  slotIndex: number
  slotsInEpoch: number
}> {
  try {
    // Check if API key is available
    if (!HELIUS_API_KEY) {
      console.warn("Helius API key is not set. Using fallback epoch values.")
      return { epoch: 420, slotIndex: 432000, slotsInEpoch: 864000 }
    }

    const cacheKey = "epoch-info"

    const data = await cachedFetch(
      HELIUS_RPC_URL,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: "my-id",
          method: "getEpochInfo",
          params: [],
        }),
      },
      cacheKey,
      10 * 60 * 1000, // 10 minutes cache
    )

    if (data.error) {
      console.error("API returned error:", data.error)
      throw new Error(`API error: ${data.error.message || JSON.stringify(data.error)}`)
    }

    return {
      epoch: data.result?.epoch || 0,
      slotIndex: data.result?.slotIndex || 0,
      slotsInEpoch: data.result?.slotsInEpoch || 0,
    }
  } catch (error) {
    console.error("Error fetching epoch info:", error)
    // Return fallback values on error
    return { epoch: 420, slotIndex: 432000, slotsInEpoch: 864000 }
  }
}

export async function searchByQuery(query: string): Promise<any> {
  // Check if it's a transaction signature (base58 encoded string, typically 88 characters)
  if (/^[1-9A-HJ-NP-Za-km-z]{88,}$/.test(query)) {
    return {
      type: "transaction",
      data: await fetchTransactionDetails(query),
    }
  }

  // Check if it's a Solana address (base58 encoded string, typically 32-44 characters)
  if (/^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(query)) {
    const accountInfo = await fetchAccountInfo(query)
    return {
      type: "account",
      data: {
        address: query,
        accountInfo,
        tokenBalances: await fetchTokenBalances(query),
        nfts: await fetchNFTs(query),
      },
    }
  }

  // Check if it's a block number
  if (/^\d+$/.test(query)) {
    const blockNumber = Number.parseInt(query)
    const cacheKey = `block-search-${blockNumber}`

    const data = await cachedFetch(
      HELIUS_RPC_URL,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: "my-id",
          method: "getBlock",
          params: [blockNumber, { encoding: "jsonParsed", maxSupportedTransactionVersion: 0 }],
        }),
      },
      cacheKey,
      30 * 60 * 1000, // 30 minutes cache
    )

    return {
      type: "block",
      data: data.result,
    }
  }

  return {
    type: "unknown",
    data: null,
  }
}

export async function fetchTokenTransactions(tokenAddress: string, limit = 10): Promise<SolanaTransaction[]> {
  try {
    const cacheKey = `token-transactions-${tokenAddress}-${limit}`

    const data = await cachedFetch(
      HELIUS_RPC_URL,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: "my-id",
          method: "getSignaturesForAddress",
          params: [tokenAddress, { limit }],
        }),
      },
      cacheKey,
      2 * 60 * 1000, // 2 minutes cache
    )

    if (data.error) {
      console.error("Error fetching token transactions:", data.error)
      return []
    }

    return data.result || []
  } catch (error) {
    console.error("Error fetching token transactions:", error)
    return []
  }
}

// Get token holders (simulated data)
export async function fetchTokenHolders(tokenAddress: string): Promise<number> {
  // For real data, use Solana RPC or another API
  // For now, return a random number
  const randomHolders = Math.floor(Math.random() * 10000) + 100
  return randomHolders
}
