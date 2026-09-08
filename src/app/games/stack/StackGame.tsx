"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"

const CONTAINER_WIDTH = 230
const PAD = 15
const BOX_WIDTH = CONTAINER_WIDTH + PAD * 2
const BOX_HEIGHT = 420
const BASE_WIDTH = 170
const BLOCK_HEIGHT = 40
const BLOCK_GAP = 4
const FIXED_TOP_Y = 56
const BASE_SPEED = 1.5
const SPEED_GROWTH = 0.045
const MAX_SPEED = 4.5
const MIN_OVERLAP = 6

const CORE_LABELS = ["Header", "Hero", "Features", "Testimonials", "Pricing", "FAQ"]
const CLUTTER_LABELS = [
  "Newsletter",
  "Social icons",
  "Cookie banner",
  "Popup",
  "Chat widget",
  "Autoplay video",
  "Sticky banner",
  "Exit-intent popup",
  "Another popup",
  "Parallax section",
  "Countdown timer",
  "Live chat bubble",
]

function labelForRow(row: number) {
  if (row < CORE_LABELS.length) return CORE_LABELS[row]
  return CLUTTER_LABELS[(row - CORE_LABELS.length) % CLUTTER_LABELS.length]
}

type Block = { row: number; x: number; width: number; label: string }
type Current = { x: number; width: number; dir: 1 | -1; speed: number }
type Debris = { id: number; x: number; width: number; dir: 1 | -1 }
type Phase = "idle" | "playing" | "over"

const BEST_KEY = "stack-game-best"

function renderY(row: number, topRow: number) {
  return FIXED_TOP_Y + (topRow - row) * BLOCK_HEIGHT
}

export function StackGame() {
  const [phase, setPhase] = useState<Phase>("idle")
  const [blocks, setBlocks] = useState<Block[]>([])
  const [current, setCurrent] = useState<Current | null>(null)
  const [debris, setDebris] = useState<Debris[]>([])
  const [best, setBest] = useState(0)
  const debrisId = useRef(1)

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(BEST_KEY)
      if (stored) setBest(Number(stored) || 0)
    } catch {
      // ignore
    }
  }, [])

  const score = Math.max(0, blocks.length - 1)

  useEffect(() => {
    if (phase !== "playing") return
    let raf: number
    let last = performance.now()

    const loop = (t: number) => {
      const dt = t - last
      last = t
      setCurrent((prev) => {
        if (!prev) return prev
        let nx = prev.x + prev.dir * prev.speed * (dt / 16.67)
        let dir = prev.dir
        if (nx <= 0) {
          nx = 0
          dir = 1
        }
        if (nx + prev.width >= CONTAINER_WIDTH) {
          nx = CONTAINER_WIDTH - prev.width
          dir = -1
        }
        return { ...prev, x: nx, dir }
      })
      raf = requestAnimationFrame(loop)
    }

    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [phase, blocks.length])

  const startGame = () => {
    setBlocks([{ row: 0, x: (CONTAINER_WIDTH - BASE_WIDTH) / 2, width: BASE_WIDTH, label: "Header" }])
    setCurrent({ x: 0, width: BASE_WIDTH, dir: 1, speed: BASE_SPEED })
    setDebris([])
    setPhase("playing")
  }

  const endGame = () => {
    setPhase("over")
    setCurrent(null)
    setBest((prevBest) => {
      const next = Math.max(prevBest, score)
      try {
        window.localStorage.setItem(BEST_KEY, String(next))
      } catch {
        // ignore
      }
      return next
    })
  }

  const handleDrop = () => {
    if (phase === "idle") {
      startGame()
      return
    }
    if (phase === "over") {
      startGame()
      return
    }
    if (phase !== "playing" || !current) return

    const last = blocks[blocks.length - 1]
    const overlapLeft = Math.max(current.x, last.x)
    const overlapRight = Math.min(current.x + current.width, last.x + last.width)
    const overlapWidth = overlapRight - overlapLeft

    if (overlapWidth < MIN_OVERLAP) {
      endGame()
      return
    }

    const pieces: Debris[] = []
    if (overlapLeft > current.x) {
      pieces.push({ id: debrisId.current++, x: current.x, width: overlapLeft - current.x, dir: -1 })
    }
    if (overlapRight < current.x + current.width) {
      pieces.push({ id: debrisId.current++, x: overlapRight, width: current.x + current.width - overlapRight, dir: 1 })
    }
    if (pieces.length) {
      setDebris((prev) => [...prev, ...pieces])
      pieces.forEach((p) => {
        setTimeout(() => setDebris((prev) => prev.filter((d) => d.id !== p.id)), 500)
      })
    }

    const newRow = blocks.length
    const newBlock: Block = { row: newRow, x: overlapLeft, width: overlapWidth, label: labelForRow(newRow) }
    setBlocks((prev) => [...prev, newBlock])

    const dir: 1 | -1 = newRow % 2 === 0 ? 1 : -1
    const speed = Math.min(MAX_SPEED, BASE_SPEED + newRow * SPEED_GROWTH)
    setCurrent({
      x: dir === 1 ? 0 : CONTAINER_WIDTH - overlapWidth,
      width: overlapWidth,
      dir,
      speed,
    })
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "Enter") {
        e.preventDefault()
        handleDrop()
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, current, blocks])

  const topRow = blocks.length

  return (
    <div className="mx-auto" style={{ width: BOX_WIDTH }}>
      <div className="mb-3 flex items-center justify-between text-xs text-ink/50">
        <span>
          SCORE <span className="font-display font-black text-ink">{score}</span>
        </span>
        <span>
          BEST <span className="font-display font-black text-ink">{best}</span>
        </span>
      </div>

      <div
        onClick={handleDrop}
        role="button"
        tabIndex={0}
        aria-label="Drop the current section"
        className="relative cursor-pointer select-none overflow-hidden border border-ink/20 bg-paper"
        style={{ width: BOX_WIDTH, height: BOX_HEIGHT }}
      >
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-16 bg-gradient-to-t from-paper to-transparent" />

        {blocks.map((b) => (
          <div
            key={b.row}
            className="absolute flex items-center justify-center border border-ink/25 bg-paper text-[9px] font-medium uppercase tracking-wide text-ink/55"
            style={{
              left: b.x + PAD,
              top: renderY(b.row, topRow),
              width: b.width,
              height: BLOCK_HEIGHT - BLOCK_GAP,
            }}
          >
            {b.label}
          </div>
        ))}

        {current && phase === "playing" && (
          <div
            className="absolute flex items-center justify-center border-2 border-accent bg-accent/5 text-[9px] font-semibold uppercase tracking-wide text-accent"
            style={{
              left: current.x + PAD,
              top: FIXED_TOP_Y,
              width: current.width,
              height: BLOCK_HEIGHT - BLOCK_GAP,
            }}
          >
            {labelForRow(blocks.length)}
          </div>
        )}

        {debris.map((d) => (
          <div
            key={d.id}
            className="absolute animate-[debris-fall_0.5s_ease-in_forwards] border border-ink/15 bg-paper/60"
            style={{
              left: d.x + PAD,
              top: FIXED_TOP_Y,
              width: d.width,
              height: BLOCK_HEIGHT - BLOCK_GAP,
            }}
          />
        ))}

        {phase === "idle" && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 bg-paper/95 px-8 text-center">
            <p className="text-sm text-ink/60">
              Tap to drop each section.
              <br />
              Land it clean, keep it standing.
            </p>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                startGame()
              }}
              className="bg-accent px-6 py-2.5 text-xs font-semibold tracking-wide text-paper transition-opacity hover:opacity-90"
            >
              Start ▸
            </button>
          </div>
        )}

        {phase === "over" && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-2 bg-paper/95 px-8 text-center">
            <p className="font-display text-xl font-black leading-tight tracking-tight">
              Your website has collapsed.
            </p>
            <p className="text-sm text-ink/60">You stacked {score} sections.</p>
            <p className="mt-1 text-xs italic text-ink/40">Or I can just build one that doesn&apos;t.</p>
            <Link
              href="/#contact"
              onClick={(e) => e.stopPropagation()}
              className="mt-3 inline-flex items-center justify-center gap-2 bg-accent px-6 py-2.5 text-xs font-semibold tracking-wide text-paper transition-opacity hover:opacity-90"
            >
              Build it for me <span aria-hidden="true">→</span>
            </Link>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                startGame()
              }}
              className="mt-1 text-xs text-ink/35 underline underline-offset-4 hover:text-ink/60"
            >
              Play again
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
