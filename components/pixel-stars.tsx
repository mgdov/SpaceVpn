"use client"

import { useEffect, useState } from "react"

interface Star {
  id: number
  x: number
  y: number
  size: number
  delay: number
  type: "dot" | "cross"
}

export function PixelStars() {
  const [stars, setStars] = useState<Star[]>([])

  useEffect(() => {
    const generateStars = () => {
      const newStars: Star[] = []
      for (let i = 0; i < 100; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() > 0.8 ? 2 : 1,
          delay: Math.random() * 3,
          type: Math.random() > 0.7 ? "cross" : "dot",
        })
      }
      setStars(newStars)
    }
    generateStars()
  }, [])

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute star"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            animationDelay: `${star.delay}s`,
          }}
        >
          {star.type === "cross" ? (
            <div className="text-blue-300 text-opacity-60" style={{ fontSize: `${star.size * 6}px` }}>
              +
            </div>
          ) : (
            <div
              className="bg-cyan-300 rounded-none"
              style={{
                width: `${star.size * 2}px`,
                height: `${star.size * 2}px`,
              }}
            />
          )}
        </div>
      ))}
    </div>
  )
}
