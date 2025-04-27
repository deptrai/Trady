import { getTrustScore, storeTrustScore, isTrustScoreValid } from "./trust-score-storage"

/**
 * Calculates trust score for a wallet based on SOL balance
 * @param solBalance SOL balance
 * @param address Wallet address
 * @returns Trust score between 0-100
 */
export function calculateTrustScore(solBalance: number, address: string): number {
  // Check if we have a valid stored score
  if (address && isTrustScoreValid(address)) {
    const storedScore = getTrustScore(address)
    if (storedScore) {
      return storedScore.score
    }
  }

  // Calculate a new score
  let score: number

  // Less than 1 SOL
  if (solBalance < 1) {
    score = Math.floor(Math.random() * 25) // 0-25 range
  }
  // 1-25 SOL
  else if (solBalance >= 1 && solBalance < 25) {
    score = Math.floor(Math.random() * (37 - 25 + 1) + 25) // 25-37 range
  }
  // 25-50 SOL
  else if (solBalance >= 25 && solBalance < 50) {
    score = Math.floor(Math.random() * (45 - 37 + 1) + 37) // 37-45 range
  }
  // 50-100 SOL
  else if (solBalance >= 50 && solBalance < 100) {
    score = Math.floor(Math.random() * (63 - 45 + 1) + 45) // 45-63 range
  }
  // 100-200 SOL
  else if (solBalance >= 100 && solBalance < 200) {
    score = Math.floor(Math.random() * (75 - 63 + 1) + 63) // 63-75 range
  }
  // 200-400 SOL
  else if (solBalance >= 200 && solBalance < 400) {
    score = Math.floor(Math.random() * (80 - 75 + 1) + 75) // 75-80 range
  }
  // 400-800 SOL
  else if (solBalance >= 400 && solBalance < 800) {
    score = Math.floor(Math.random() * (88 - 80 + 1) + 80) // 80-88 range
  }
  // 800-1000 SOL
  else if (solBalance >= 800 && solBalance < 1000) {
    score = Math.floor(Math.random() * (93 - 88 + 1) + 88) // 88-93 range
  }
  // 1000+ SOL
  else {
    score = Math.floor(Math.random() * (99 - 93 + 1) + 93) // 93-99 range
  }

  // Store the new score if we have an address
  if (address) {
    storeTrustScore(address, score)
  }

  return score
}

/**
 * Returns color class based on trust score
 * @param trustScore Trust score (0-100)
 * @returns Tailwind color class
 */
export function getTrustScoreColorClass(trustScore: number): string {
  if (trustScore < 30) {
    return "text-red-500" // Low trust
  } else if (trustScore < 50) {
    return "text-orange-500" // Medium-low trust
  } else if (trustScore < 70) {
    return "text-yellow-500" // Medium trust
  } else if (trustScore < 90) {
    return "text-green-500" // High trust
  } else {
    return "text-cyber-teal" // Very high trust
  }
}

/**
 * Returns description based on trust score
 * @param trustScore Trust score (0-100)
 * @returns Trust description
 */
export function getTrustScoreDescription(trustScore: number): string {
  if (trustScore < 30) {
    return "Low Trust"
  } else if (trustScore < 50) {
    return "Medium-Low Trust"
  } else if (trustScore < 70) {
    return "Medium Trust"
  } else if (trustScore < 90) {
    return "High Trust"
  } else {
    return "Very High Trust"
  }
}
