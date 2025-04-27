import type { TokenInfo } from "@/types/token"
import { tokenList } from "@/lib/token-list"

// Cache for token info
const tokenInfoCache: Record<string, TokenInfo & { lastFetched: number }> = {}

// Fetch token info from Dexscreener API
export async function fetchTokenInfoFromDexscreener(tokenAddress: string): Promise<TokenInfo | null> {
  try {
    // Check local token list first to avoid rate limits
    if (tokenList[tokenAddress]) {
      return {
        ...tokenList[tokenAddress],
        price: tokenList[tokenAddress].price || 0,
        marketCap: tokenList[tokenAddress].marketCap || 0,
        volume24h: tokenList[tokenAddress].volume24h || 0,
        holders: tokenList[tokenAddress].holders || 0,
      }
    }

    // Return from cache if recent
    const now = Date.now()
    const cacheExpiry = 30 * 60 * 1000 // 30 minutes
    if (tokenInfoCache[tokenAddress] && now - tokenInfoCache[tokenAddress].lastFetched < cacheExpiry) {
      return tokenInfoCache[tokenAddress]
    }

    // Add a small delay before API call
    await new Promise((resolve) => setTimeout(resolve, 100))

    console.log(`Fetching token info for ${tokenAddress} from Dexscreener`)
    const response = await fetch(`https://api.dexscreener.com/latest/dex/tokens/${tokenAddress}`, {
      headers: {
        Accept: "application/json",
        "User-Agent": "Trady-Explorer/1.0",
      },
      next: { revalidate: 3600 }, // 1 hour cache
    })

    // Handle rate limit
    if (response.status === 429) {
      console.warn("Rate limit hit for Dexscreener API")
      return createDefaultTokenInfo(tokenAddress)
    }

    if (!response.ok) {
      console.warn(`Dexscreener API error: ${response.status} ${response.statusText}`)
      return createDefaultTokenInfo(tokenAddress)
    }

    const data = await response.json()

    if (data.pairs && data.pairs.length > 0) {
      // Use first pair for token info
      const pair = data.pairs[0]
      const isBaseToken = pair.baseToken.address.toLowerCase() === tokenAddress.toLowerCase()

      const token = isBaseToken ? pair.baseToken : pair.quoteToken
      const priceUsd = isBaseToken ? Number.parseFloat(pair.priceUsd) : 1 / Number.parseFloat(pair.priceUsd)

      // Calculate market cap if available
      const marketCap = pair.fdv ? Number.parseFloat(pair.fdv) : 0

      // 24h volume
      const volume24h = pair.volume?.h24 ? Number.parseFloat(pair.volume.h24) : 0

      const tokenInfo = {
        address: token.address,
        name: token.name,
        symbol: token.symbol,
        decimals: token.decimals || 0,
        price: priceUsd,
        marketCap: marketCap,
        volume24h: volume24h,
        holders: 0, // Dexscreener doesn't provide holders info
        logoURI: null,
        lastFetched: Date.now(),
      }

      // Add to cache
      tokenInfoCache[tokenAddress] = tokenInfo
      return tokenInfo
    }

    // Return default info if no pairs found
    return createDefaultTokenInfo(tokenAddress)
  } catch (error) {
    console.error("Error fetching token info from Dexscreener:", error)
    return createDefaultTokenInfo(tokenAddress)
  }
}

// Create default token info
function createDefaultTokenInfo(tokenAddress: string): TokenInfo {
  return {
    address: tokenAddress,
    name: `Token: ${tokenAddress.slice(0, 6)}...${tokenAddress.slice(-6)}`,
    symbol: tokenAddress.slice(0, 4).toUpperCase(),
    decimals: 0,
    price: 0,
    marketCap: 0,
    volume24h: 0,
    holders: 0,
    logoURI: null,
    lastFetched: Date.now(),
  }
}

// Get token info (checks cache first, then Dexscreener)
export async function getTokenInfoFromDexscreener(tokenAddress: string): Promise<TokenInfo> {
  // Check local token list first
  if (tokenList[tokenAddress]) {
    return {
      ...tokenList[tokenAddress],
      price: tokenList[tokenAddress].price || 0,
      marketCap: tokenList[tokenAddress].marketCap || 0,
      volume24h: tokenList[tokenAddress].volume24h || 0,
      holders: tokenList[tokenAddress].holders || 0,
    }
  }

  // Return from cache if recent
  const now = Date.now()
  const cacheExpiry = 30 * 60 * 1000 // 30 minutes
  if (tokenInfoCache[tokenAddress] && now - tokenInfoCache[tokenAddress].lastFetched < cacheExpiry) {
    return tokenInfoCache[tokenAddress]
  }

  // Fetch from Dexscreener
  const tokenInfo = await fetchTokenInfoFromDexscreener(tokenAddress)

  // Return default info if not found
  if (!tokenInfo) {
    const defaultInfo = createDefaultTokenInfo(tokenAddress)
    tokenInfoCache[tokenAddress] = defaultInfo // Add to cache
    return defaultInfo
  }

  // Add to cache and return
  tokenInfoCache[tokenAddress] = tokenInfo
  return tokenInfo
}
