"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

interface CardGlowProps {
  children: React.ReactNode
  className?: string
}

export function CardGlow({ children, className = "" }: CardGlowProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const card = cardRef.current
    const glow = glowRef.current

    if (!card || !glow) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      glow.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(0, 255, 178, 0.15) 0%, rgba(0, 0, 0, 0) 70%)`
    }

    const handleMouseLeave = () => {
      glow.style.background = "transparent"
    }

    card.addEventListener("mousemove", handleMouseMove)
    card.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      card.removeEventListener("mousemove", handleMouseMove)
      card.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  return (
    <motion.div
      ref={cardRef}
      className={`relative overflow-hidden ${className}`}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <div ref={glowRef} className="absolute inset-0 pointer-events-none z-0" />
      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}
