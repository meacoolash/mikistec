"use client"

import { useCallback, useRef, useState } from "react"

export type ConfettiPiece = {
  id: number
  x: number
  color: string
  delay: number
  size: number
  drift: number
}

const COLORS = ["hsl(226 74% 53%)", "hsl(226 74% 72%)", "#ffc53d", "hsl(220 14% 9%)"]

export function useConfetti() {
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([])
  const idRef = useRef(0)

  const spawnConfetti = useCallback((count: number) => {
    const pieces: ConfettiPiece[] = Array.from({ length: count }, () => ({
      id: idRef.current++,
      x: Math.random() * 100,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      delay: Math.random() * 0.5,
      size: 6 + Math.random() * 8,
      drift: -50 + Math.random() * 100,
    }))
    setConfetti((prev) => [...prev, ...pieces])
    setTimeout(() => setConfetti((prev) => prev.filter((p) => !pieces.includes(p))), 3000)
  }, [])

  return { confetti, spawnConfetti }
}
