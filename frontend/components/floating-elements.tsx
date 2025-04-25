"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface FloatingElement {
  id: number
  x: number
  y: number
  size: number
  duration: number
  delay: number
  opacity: number
  type: "circle" | "square" | "triangle"
}

export function FloatingElements() {
  const [elements, setElements] = useState<FloatingElement[]>([])

  useEffect(() => {
    // Create random floating elements
    const newElements: FloatingElement[] = []
    const count = window.innerWidth < 768 ? 8 : 15

    for (let i = 0; i < count; i++) {
      newElements.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 40 + 10,
        duration: Math.random() * 20 + 10,
        delay: Math.random() * 5,
        opacity: Math.random() * 0.07 + 0.02,
        type: ["circle", "square", "triangle"][Math.floor(Math.random() * 3)] as "circle" | "square" | "triangle",
      })
    }

    setElements(newElements)
  }, [])

  const renderShape = (element: FloatingElement) => {
    const commonClasses = `absolute opacity-${Math.floor(element.opacity * 100)}`

    switch (element.type) {
      case "circle":
        return (
          <div
            className={`${commonClasses} rounded-full bg-primary`}
            style={{
              width: element.size,
              height: element.size,
              left: `${element.x}%`,
              top: `${element.y}%`,
            }}
          />
        )
      case "square":
        return (
          <div
            className={`${commonClasses} bg-secondary`}
            style={{
              width: element.size,
              height: element.size,
              left: `${element.x}%`,
              top: `${element.y}%`,
            }}
          />
        )
      case "triangle":
        return (
          <div
            className={`${commonClasses} border-l-transparent border-r-transparent border-b-tertiary`}
            style={{
              width: 0,
              height: 0,
              borderLeft: `${element.size / 2}px solid transparent`,
              borderRight: `${element.size / 2}px solid transparent`,
              borderBottom: `${element.size}px solid`,
              left: `${element.x}%`,
              top: `${element.y}%`,
            }}
          />
        )
    }
  }

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
      {elements.map((element) => (
        <motion.div
          key={element.id}
          initial={{ x: `${element.x}%`, y: `${element.y}%` }}
          animate={{
            y: [`${element.y}%`, `${element.y - 10}%`, `${element.y}%`],
            x: [`${element.x}%`, `${element.x + 5}%`, `${element.x}%`],
          }}
          transition={{
            duration: element.duration,
            delay: element.delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="absolute"
        >
          {renderShape(element)}
        </motion.div>
      ))}
    </div>
  )
}
