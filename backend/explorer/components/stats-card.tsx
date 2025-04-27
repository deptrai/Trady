import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface StatsCardProps {
  title: string
  value: string | number
  icon?: React.ReactNode
  description?: string
  className?: string
  trend?: "up" | "down" | "neutral"
  trendValue?: string | number
}

export function StatsCard({ title, value, icon, description, className, trend, trendValue }: StatsCardProps) {
  return (
    <Card className={cn("cyber-border overflow-hidden", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold font-orbitron">{value}</div>
        {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
        {trend && trendValue && (
          <div className="flex items-center mt-2">
            <span
              className={cn(
                "text-xs font-medium",
                trend === "up" && "text-cyber-teal",
                trend === "down" && "text-cyber-pink",
              )}
            >
              {trend === "up" && "↑"}
              {trend === "down" && "↓"}
              {trend === "neutral" && "→"} {trendValue}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
