"use client"

import { useEffect, useRef } from "react"

export function BackgroundGradient() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let width = window.innerWidth
    let height = window.innerHeight

    const resizeCanvas = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Create gradient points
    const gradientPoints = [
      { x: width * 0.1, y: height * 0.1, radius: Math.max(width, height) * 0.15, color: "rgba(0, 255, 178, 0.03)" },
      { x: width * 0.8, y: height * 0.3, radius: Math.max(width, height) * 0.2, color: "rgba(162, 89, 255, 0.025)" },
      { x: width * 0.3, y: height * 0.7, radius: Math.max(width, height) * 0.25, color: "rgba(0, 224, 255, 0.02)" },
    ]

    // Animation variables
    let animationFrame: number
    const animate = () => {
      ctx.clearRect(0, 0, width, height)

      // Draw each gradient point
      gradientPoints.forEach((point, i) => {
        // Update position with subtle movement
        point.x += Math.sin(Date.now() * 0.0002 + i) * 0.5
        point.y += Math.cos(Date.now() * 0.0001 + i) * 0.5

        // Keep within bounds
        if (point.x < 0) point.x = width
        if (point.x > width) point.x = 0
        if (point.y < 0) point.y = height
        if (point.y > height) point.y = 0

        // Create radial gradient
        const gradient = ctx.createRadialGradient(point.x, point.y, 0, point.x, point.y, point.radius)

        gradient.addColorStop(0, point.color)
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)")

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(point.x, point.y, point.radius, 0, Math.PI * 2)
        ctx.fill()
      })

      animationFrame = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrame)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 -z-10 opacity-70" />
}
