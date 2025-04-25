"use client"

import { useEffect, useRef } from "react"

export function AnimatedWalletLines() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Wallet nodes
    const wallets: { x: number; y: number; vx: number; vy: number; size: number; connected: boolean }[] = []
    const maxWallets = 30

    // Initialize wallets
    for (let i = 0; i < maxWallets; i++) {
      wallets.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        connected: Math.random() > 0.7,
      })
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw wallets
      wallets.forEach((wallet, i) => {
        // Update position
        wallet.x += wallet.vx
        wallet.y += wallet.vy

        // Bounce off edges
        if (wallet.x < 0 || wallet.x > canvas.width) wallet.vx *= -1
        if (wallet.y < 0 || wallet.y > canvas.height) wallet.vy *= -1

        // Draw wallet node
        ctx.beginPath()
        ctx.arc(wallet.x, wallet.y, wallet.size, 0, Math.PI * 2)
        ctx.fillStyle = wallet.connected ? "rgba(0, 255, 178, 0.6)" : "rgba(255, 255, 255, 0.3)"
        ctx.fill()

        // Draw connections
        if (wallet.connected) {
          // Connect to center
          const centerX = canvas.width / 2
          const centerY = canvas.height / 2
          ctx.beginPath()
          ctx.moveTo(wallet.x, wallet.y)
          ctx.lineTo(centerX, centerY)
          ctx.strokeStyle = "rgba(0, 255, 178, 0.1)"
          ctx.lineWidth = 0.5
          ctx.stroke()

          // Occasionally draw a pulse
          if (Math.random() > 0.99) {
            drawPulse(wallet.x, wallet.y, centerX, centerY)
          }
        }

        // Connect nearby wallets
        wallets.forEach((otherWallet, j) => {
          if (i === j) return
          const dx = wallet.x - otherWallet.x
          const dy = wallet.y - otherWallet.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.beginPath()
            ctx.moveTo(wallet.x, wallet.y)
            ctx.lineTo(otherWallet.x, otherWallet.y)
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - distance / 100)})`
            ctx.lineWidth = 0.3
            ctx.stroke()
          }
        })
      })

      // Draw central node
      ctx.beginPath()
      ctx.arc(canvas.width / 2, canvas.height / 2, 4, 0, Math.PI * 2)
      ctx.fillStyle = "rgba(0, 255, 178, 0.8)"
      ctx.fill()

      // Draw glow around central node
      ctx.beginPath()
      ctx.arc(canvas.width / 2, canvas.height / 2, 15, 0, Math.PI * 2)
      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        4,
        canvas.width / 2,
        canvas.height / 2,
        15,
      )
      gradient.addColorStop(0, "rgba(0, 255, 178, 0.4)")
      gradient.addColorStop(1, "rgba(0, 255, 178, 0)")
      ctx.fillStyle = gradient
      ctx.fill()

      requestAnimationFrame(animate)
    }

    // Function to draw pulse effect
    const drawPulse = (startX: number, startY: number, endX: number, endY: number) => {
      // Create a pulse that travels along the line
      const pulseCount = 5
      for (let i = 0; i < pulseCount; i++) {
        const t = i / pulseCount
        const x = startX + (endX - startX) * t
        const y = startY + (endY - startY) * t

        ctx.beginPath()
        ctx.arc(x, y, 2, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(0, 255, 178, 0.8)"
        ctx.fill()
      }
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-60" />
}
