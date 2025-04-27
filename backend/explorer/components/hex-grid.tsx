"use client"

import { useEffect, useRef } from "react"

export function HexGrid() {
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

    // Hex grid parameters
    const hexSize = 30
    const hexHeight = hexSize * Math.sqrt(3)
    const hexWidth = hexSize * 2
    const hexVerticalSpacing = hexHeight
    const hexHorizontalSpacing = hexWidth * 0.75

    // Calculate number of hexagons needed
    const columns = Math.ceil(canvas.width / hexHorizontalSpacing) + 1
    const rows = Math.ceil(canvas.height / hexVerticalSpacing) + 1

    // Colors
    const colors = [
      { r: 149, g: 76, b: 233, a: 0.03 }, // cyber-purple
      { r: 45, g: 212, b: 191, a: 0.03 }, // cyber-teal
      { r: 236, g: 72, b: 153, a: 0.03 }, // cyber-pink
    ]

    // Draw hexagon
    function drawHexagon(x: number, y: number, color: { r: number; g: number; b: number; a: number }) {
      ctx.beginPath()
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i
        const hx = x + hexSize * Math.cos(angle)
        const hy = y + hexSize * Math.sin(angle)
        if (i === 0) {
          ctx.moveTo(hx, hy)
        } else {
          ctx.lineTo(hx, hy)
        }
      }
      ctx.closePath()
      ctx.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a * 2})`
      ctx.stroke()
      ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`
      ctx.fill()
    }

    // Animation variables
    const activeHexagons: { x: number; y: number; color: number; alpha: number; targetAlpha: number; speed: number }[] =
      []
    const maxActiveHexagons = 15

    // Initialize some random active hexagons
    for (let i = 0; i < maxActiveHexagons; i++) {
      const col = Math.floor(Math.random() * columns)
      const row = Math.floor(Math.random() * rows)
      const x = col * hexHorizontalSpacing + (row % 2 === 0 ? 0 : hexHorizontalSpacing / 2)
      const y = row * hexVerticalSpacing

      activeHexagons.push({
        x,
        y,
        color: Math.floor(Math.random() * colors.length),
        alpha: 0,
        targetAlpha: 0.1 + Math.random() * 0.3,
        speed: 0.01 + Math.random() * 0.02,
      })
    }

    // Animation function
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw all hexagons with base opacity
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < columns; col++) {
          const x = col * hexHorizontalSpacing + (row % 2 === 0 ? 0 : hexHorizontalSpacing / 2)
          const y = row * hexVerticalSpacing

          // Alternate colors
          const colorIndex = (row + col) % colors.length
          drawHexagon(x, y, colors[colorIndex])
        }
      }

      // Update and draw active hexagons
      for (let i = 0; i < activeHexagons.length; i++) {
        const hex = activeHexagons[i]

        // Update alpha
        if (Math.random() < 0.01) {
          hex.targetAlpha = 0.1 + Math.random() * 0.3
        }

        hex.alpha += (hex.targetAlpha - hex.alpha) * hex.speed

        // Draw with updated alpha
        const color = { ...colors[hex.color], a: hex.alpha }
        drawHexagon(hex.x, hex.y, color)

        // Randomly change target hexagon
        if (Math.random() < 0.005) {
          const col = Math.floor(Math.random() * columns)
          const row = Math.floor(Math.random() * rows)
          hex.x = col * hexHorizontalSpacing + (row % 2 === 0 ? 0 : hexHorizontalSpacing / 2)
          hex.y = row * hexVerticalSpacing
          hex.color = Math.floor(Math.random() * colors.length)
          hex.alpha = 0
        }
      }

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10 opacity-40" />
}
