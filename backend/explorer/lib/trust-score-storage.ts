// Type definition for stored trust scores
interface StoredTrustScore {
  address: string
  score: number
  timestamp: number // Unix timestamp in milliseconds
}

// In-memory cache
const trustScoreCache: Record<string, StoredTrustScore> = {}

// Get a trust score for an address
export function getTrustScore(address: string): StoredTrustScore | null {
  return trustScoreCache[address] || null
}

// Store a trust score for an address
export function storeTrustScore(address: string, score: number): void {
  trustScoreCache[address] = {
    address,
    score,
    timestamp: Date.now(),
  }
}

// Check if a trust score is still valid (less than 3 days old)
export function isTrustScoreValid(address: string): boolean {
  const storedScore = trustScoreCache[address]
  if (!storedScore) return false

  const now = Date.now()
  const threeDaysInMs = 3 * 24 * 60 * 60 * 1000 // 3 days in milliseconds

  return now - storedScore.timestamp < threeDaysInMs
}

// Clean up old scores (optional, can be run periodically)
export function cleanupOldScores(): void {
  const now = Date.now()
  const threeDaysInMs = 3 * 24 * 60 * 60 * 1000

  for (const address in trustScoreCache) {
    if (now - trustScoreCache[address].timestamp >= threeDaysInMs) {
      delete trustScoreCache[address]
    }
  }
}
