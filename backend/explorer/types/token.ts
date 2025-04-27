export interface TokenBalance {
  mint: string
  amount: number
  decimals: number
  tokenInfo?: TokenInfo
}

export interface TokenInfo {
  address: string
  name: string
  symbol: string
  decimals: number
  logoURI?: string | null
  price?: number
  marketCap?: number
  volume24h?: number
  holders?: number
  lastFetched?: number
}
