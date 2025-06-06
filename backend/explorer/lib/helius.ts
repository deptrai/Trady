import type { SolanaTransaction } from "@/types/transaction"
import type { Block } from "@/types/block"
import type { TokenBalance } from "@/types/token"
import { tokenList } from "@/lib/token-list"

// API key từ .env.local hoặc sử dụng API key cụ thể
const HELIUS_API_KEY = process.env.HELIUS_API_KEY || "3a4ab1c9-d59e-47d4-93d4-8e40600532e0"
const HELIUS_RPC_URL = `https://mainnet.helius-rpc.com/?api-key=${HELIUS_API_KEY}`
console.log("Sử dụng Helius API Key:", HELIUS_API_KEY.substring(0, 5) + "..." + HELIUS_API_KEY.substring(HELIUS_API_KEY.length - 4)) // Debug

// Xác minh API key có hiệu lực bằng cách kiểm tra định dạng
const isValidApiKey = HELIUS_API_KEY && HELIUS_API_KEY.length >= 30
if (!isValidApiKey) {
  console.warn("⚠️ HELIUS_API_KEY không hợp lệ hoặc không đủ độ dài! Sẽ sử dụng dữ liệu mẫu.")
}

// Cache for API calls
const apiCache = new Map()
const CACHE_DURATION = 30 * 1000 // 30 seconds (giảm thời gian cache để dữ liệu cập nhật nhanh hơn)

// Kiểm tra xem URL có tham số no-cache không
function shouldBypassCache(): boolean {
  if (typeof window === "undefined") return false
  return window.location.href.includes("nocache=true")
}

// Cached fetch function to reduce API calls
async function cachedFetch(url: string, options: RequestInit, cacheKey: string, cacheDuration = CACHE_DURATION) {
  const now = Date.now()
  const cachedItem = apiCache.get(cacheKey)
  const bypassCache = shouldBypassCache()

  // Debug log cho việc sử dụng cache
  if (bypassCache) {
    console.log(`🚫 Bỏ qua cache cho ${cacheKey} (nocache=true trong URL)`)
  } else if (cachedItem && now - cachedItem.timestamp < cacheDuration) {
    console.log(`📦 Sử dụng dữ liệu từ cache cho ${cacheKey} (còn ${Math.round((cacheDuration - (now - cachedItem.timestamp))/1000)}s)`)
    return cachedItem.data
  } else {
    console.log(`🔄 Fetching dữ liệu mới cho ${cacheKey}`)
  }

  try {
    // Fetch from API if not in cache or expired or bypass cache
    const response = await fetch(url, options)
    
    if (!response.ok) {
      throw new Error(`API response error: ${response.status} ${response.statusText}`)
    }
    
    const data = await response.json()

    // Save to cache
    apiCache.set(cacheKey, {
      data,
      timestamp: now,
    })

    console.log(`✅ Đã nhận dữ liệu mới cho ${cacheKey}`)
    return data
  } catch (error) {
    // Use stale cache if available on error
    if (cachedItem) {
      console.warn(`⚠️ Lỗi khi fetch data, sử dụng cache cũ cho ${cacheKey}:`, error)
      return cachedItem.data
    }
    console.error(`❌ Lỗi khi fetch data cho ${cacheKey} và không có cache:`, error)
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

    // Check if we received real data
    const hasRealData = data && data.result && data.result.value && 
                      (data.result.value.lamports > 0 || data.result.value.owner)

    if (hasRealData) {
      console.log("✅ Nhận được dữ liệu thật về account từ blockchain")
      return data.result
    } else {
      console.warn("⚠️ Lỗi cấu trúc dữ liệu account từ API. Sử dụng giá trị mẫu.")
      return { value: { lamports: 0, owner: "" } } // Fallback values
    }
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
    const tokensWithInfo = tokenBalances.map((token: TokenBalance) => {
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
  isRealData: boolean
}> {
  try {
    // Check if API key is available and valid
    if (!isValidApiKey) {
      console.warn("⚠️ Helius API key không hợp lệ. Sử dụng giá trị mẫu.")
      return { total: 555000000, circulating: 410000000, isRealData: false } // Fallback values
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
          params: [{ commitment: "processed" }],
        }),
      },
      cacheKey,
      10 * 60 * 1000, // 10 minutes cache
    )

    // Check if we received real data
    const hasRealData = data && data.result && data.result.value && 
                      (data.result.value.total > 0 || data.result.value.circulating > 0)

    if (hasRealData) {
      console.log("✅ Nhận được dữ liệu thật về supply từ blockchain")
      return {
        total: data.result.value.total / 1000000000 || 0, // Convert lamports to SOL
        circulating: data.result.value.circulating / 1000000000 || 0,
        isRealData: true
      }
    } else {
      console.warn("⚠️ Lỗi cấu trúc dữ liệu supply từ API. Sử dụng giá trị mẫu.")
      return { total: 555000000, circulating: 410000000, isRealData: false } // Fallback values
    }
  } catch (error) {
    console.error("Error fetching supply info:", error)
    // Return fallback values on error
    return { total: 555000000, circulating: 410000000, isRealData: false }
  }
}

export async function fetchEpochInfo(): Promise<{
  epoch: number
  slotIndex: number
  slotsInEpoch: number
  isRealData: boolean
}> {
  try {
    // Check if API key is available and valid
    if (!isValidApiKey) {
      console.warn("⚠️ Helius API key không hợp lệ. Sử dụng giá trị mẫu cho epoch.")
      return { epoch: 420, slotIndex: 432000, slotsInEpoch: 864000, isRealData: false } // Fallback values
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

    // Check if we received real data
    const hasRealData = data && data.result && 
                      (data.result.epoch > 0 || data.result.slotIndex > 0 || data.result.slotsInEpoch > 0)

    if (hasRealData) {
      console.log("✅ Nhận được dữ liệu thật về epoch từ blockchain")
      return {
        epoch: data.result.epoch || 0,
        slotIndex: data.result.slotIndex || 0,
        slotsInEpoch: data.result.slotsInEpoch || 0,
        isRealData: true
      }
    } else {
      console.warn("⚠️ Lỗi cấu trúc dữ liệu epoch từ API. Sử dụng giá trị mẫu.")
      return { epoch: 420, slotIndex: 432000, slotsInEpoch: 864000, isRealData: false } // Fallback values
    }
  } catch (error) {
    console.error("❌ Lỗi khi lấy thông tin epoch:", error)
    return { epoch: 420, slotIndex: 432000, slotsInEpoch: 864000, isRealData: false } // Fallback values
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
