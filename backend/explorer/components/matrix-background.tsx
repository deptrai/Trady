"use client"

import { useEffect, useRef } from "react"

interface MatrixBackgroundProps {
  className?: string
}

export function MatrixBackground({ className }: MatrixBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Matrix rain effect
    const characters = "01"
    const fontSize = 14
    const columns = Math.floor(canvas.width / fontSize)
    const drops: number[] = []

    // Initialize drops
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.floor(Math.random() * -canvas.height)
    }

    const draw = () => {
      // Semi-transparent black to create fade effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Set text color and font
      ctx.fillStyle = "#00ffaa"
      ctx.font = `${fontSize}px monospace`

      // Draw characters
      for (let i = 0; i < drops.length; i++) {
        // Random character
        const text = characters.charAt(Math.floor(Math.random() * characters.length))

        // Draw the character
        ctx.fillText(text, i * fontSize, drops[i] * fontSize)

        // Move the drop down
        drops[i]++

        // Reset drop position when it reaches bottom
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
      }
    }

    // Animation loop
    const interval = setInterval(draw, 50)

    return () => {
      clearInterval(interval)
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return <canvas ref={canvasRef} className={`fixed top-0 left-0 w-full h-full -z-10 opacity-20 ${className}`} />
}
