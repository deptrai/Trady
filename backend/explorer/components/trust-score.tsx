import { getTrustScoreDescription } from "@/lib/reputation"
import { Shield, AlertTriangle, CheckCircle, AlertCircle, BadgeCheck } from "lucide-react"

interface TrustScoreProps {
  score: number
  showLabel?: boolean
  size?: "sm" | "md" | "lg"
}

export function TrustScore({ score, showLabel = true, size = "md" }: TrustScoreProps) {
  const description = getTrustScoreDescription(score)

  // Determine size classes
  const sizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  }

  // Get the appropriate icon based on trust score
  const getTrustIcon = () => {
    if (score < 30) {
      return <AlertTriangle className="h-5 w-5 text-red-500" />
    } else if (score < 50) {
      return <AlertCircle className="h-5 w-5 text-orange-500" />
    } else if (score < 70) {
      return <Shield className="h-5 w-5 text-yellow-500" />
    } else if (score < 90) {
      return <CheckCircle className="h-5 w-5 text-green-500" />
    } else {
      return <BadgeCheck className="h-5 w-5 text-cyber-teal" />
    }
  }

  // Get color based on trust score
  const getColorClass = () => {
    if (score < 30) {
      return "from-red-500/20 to-transparent border-red-500/30"
    } else if (score < 50) {
      return "from-orange-500/20 to-transparent border-orange-500/30"
    } else if (score < 70) {
      return "from-yellow-500/20 to-transparent border-yellow-500/30"
    } else if (score < 90) {
      return "from-green-500/20 to-transparent border-green-500/30"
    } else {
      return "from-cyber-teal/20 to-transparent border-cyber-teal/30"
    }
  }

  // Get text color based on trust score
  const getTextColorClass = () => {
    if (score < 30) {
      return "text-red-500"
    } else if (score < 50) {
      return "text-orange-500"
    } else if (score < 70) {
      return "text-yellow-500"
    } else if (score < 90) {
      return "text-green-500"
    } else {
      return "text-cyber-teal"
    }
  }

  // For small size, return a simplified version
  if (size === "sm") {
    return (
      <div className="flex items-center space-x-1">
        {getTrustIcon()}
        <span className={`${sizeClasses[size]} font-medium ${getTextColorClass()}`}>
          {score}% - {description}
        </span>
      </div>
    )
  }

  return (
    <div className={`bg-gradient-to-r ${getColorClass()} p-4 rounded-lg border`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          {getTrustIcon()}
          <span className={`ml-2 font-bold ${getTextColorClass()}`}>{description}</span>
        </div>
        <div className={`text-xl font-bold ${getTextColorClass()}`}>{score}%</div>
      </div>

      {/* Trust score bar - using a more reliable approach */}
      <div className="relative h-3 bg-cyber-dark/50 rounded-full overflow-hidden">
        <div
          className={`absolute top-0 left-0 h-full rounded-full ${
            score < 30
              ? "bg-red-500"
              : score < 50
                ? "bg-orange-500"
                : score < 70
                  ? "bg-yellow-500"
                  : score < 90
                    ? "bg-green-500"
                    : "bg-cyber-teal"
          }`}
          style={{ width: `${score}%` }}
        ></div>
      </div>
    </div>
  )
}
