"use client"

import Image from "next/image"
import Link from "next/link"
import { useCallback, useEffect, useRef, useState } from "react"
import { getAudioCtx } from "./audioContext"
import { ConfettiLayer } from "./ConfettiLayer"
import { useConfetti } from "./useConfetti"

const FREE_GAME_MOVE_LIMIT = 15
const CLAIM_CODE = `CARDSHARK${FREE_GAME_MOVE_LIMIT}`

type CardContent =
  | { kind: "image"; src: string; alt: string }
  | { kind: "text"; label: string }

type PairDef = { id: number; a: CardContent; b: CardContent }

const PAIRS: PairDef[] = [
  {
    id: 0,
    a: { kind: "image", src: "/games/pexeso/alice.png", alt: "Alice" },
    b: { kind: "image", src: "/games/pexeso/white-rabbit.png", alt: "White Rabbit" },
  },
  {
    id: 1,
    a: { kind: "image", src: "/games/pexeso/little-prince.png", alt: "The Little Prince" },
    b: { kind: "image", src: "/games/pexeso/fox.png", alt: "The Fox" },
  },
  {
    id: 2,
    a: { kind: "image", src: "/games/pexeso/peter-pan.png", alt: "Peter Pan" },
    b: { kind: "image", src: "/games/pexeso/tinker-bell.png", alt: "Tinker Bell" },
  },
  {
    id: 3,
    a: { kind: "image", src: "/games/pexeso/pinocchio.png", alt: "Pinocchio" },
    b: { kind: "image", src: "/games/pexeso/geppetto.png", alt: "Geppetto" },
  },
  {
    id: 4,
    a: { kind: "image", src: "/games/pexeso/mowgli.png", alt: "Mowgli" },
    b: { kind: "image", src: "/games/pexeso/baloo.png", alt: "Baloo" },
  },
  {
    id: 5,
    a: { kind: "image", src: "/games/pexeso/robin-hood.png", alt: "Robin Hood" },
    b: { kind: "image", src: "/games/pexeso/little-john.png", alt: "Little John" },
  },
  {
    id: 6,
    a: { kind: "image", src: "/games/pexeso/elizabeth-bennet.png", alt: "Elizabeth Bennet" },
    b: { kind: "image", src: "/games/pexeso/mr-darcy.png", alt: "Mr. Darcy" },
  },
  {
    id: 7,
    a: { kind: "text", label: "You" },
    b: { kind: "text", label: "Me" },
  },
]

type Card = { uid: number; pairId: number; content: CardContent }

const BEST_KEY = "pexeso-game-best"

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function createDeck(): Card[] {
  const cards = PAIRS.flatMap((pair) => [
    { uid: pair.id * 2, pairId: pair.id, content: pair.a },
    { uid: pair.id * 2 + 1, pairId: pair.id, content: pair.b },
  ])
  return shuffle(cards)
}

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${String(s).padStart(2, "0")}`
}

function playMatchSound() {
  const ctx = getAudioCtx()
  if (!ctx) return
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.type = "sine"
  osc.frequency.setValueAtTime(600, ctx.currentTime)
  osc.frequency.linearRampToValueAtTime(900, ctx.currentTime + 0.15)
  gain.gain.setValueAtTime(0.2, ctx.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3)
  osc.connect(gain)
  gain.connect(ctx.destination)
  osc.start()
  osc.stop(ctx.currentTime + 0.3)
}

function playWinChime() {
  const ctx = getAudioCtx()
  if (!ctx) return
  const notes = [523.25, 659.25, 783.99]
  notes.forEach((freq, i) => {
    const start = ctx.currentTime + i * 0.12
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = "sine"
    osc.frequency.setValueAtTime(freq, start)
    gain.gain.setValueAtTime(0.001, start)
    gain.gain.exponentialRampToValueAtTime(0.22, start + 0.02)
    gain.gain.exponentialRampToValueAtTime(0.01, start + 0.35)
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start(start)
    osc.stop(start + 0.4)
  })
}

function CardBack() {
  return (
    <svg viewBox="0 0 100 100" className="h-full w-full text-accent" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.25" />
      <circle cx="50" cy="50" r="10" fill="none" stroke="currentColor" strokeWidth="0.6" opacity="0.3" />
      <circle cx="50" cy="50" r="2.5" fill="currentColor" opacity="0.35" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
        <ellipse
          key={angle}
          cx="50"
          cy="25"
          rx="4"
          ry="12"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.6"
          opacity="0.2"
          transform={`rotate(${angle} 50 50)`}
        />
      ))}
      {[
        [12, 12],
        [88, 12],
        [12, 88],
        [88, 88],
      ].map(([cx, cy]) => (
        <g key={`${cx}-${cy}`}>
          <circle cx={cx} cy={cy} r="5" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.18" />
          <circle cx={cx} cy={cy} r="1.5" fill="currentColor" opacity="0.2" />
        </g>
      ))}
      {[
        [50, 8],
        [50, 92],
        [8, 50],
        [92, 50],
      ].map(([cx, cy]) => (
        <rect
          key={`${cx}-${cy}`}
          x={cx - 2}
          y={cy - 2}
          width="4"
          height="4"
          fill="currentColor"
          opacity="0.2"
          transform={`rotate(45 ${cx} ${cy})`}
        />
      ))}
    </svg>
  )
}

export function PexesoGame() {
  const [cards, setCards] = useState<Card[]>([])
  const [flipped, setFlipped] = useState<number[]>([])
  const [matched, setMatched] = useState<Set<number>>(new Set())
  const [moves, setMoves] = useState(0)
  const [locked, setLocked] = useState(false)
  const [started, setStarted] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const [best, setBest] = useState<number | null>(null)
  const [muted, setMuted] = useState(false)
  const [codeCopied, setCodeCopied] = useState(false)
  const startTime = useRef<number | null>(null)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const { confetti, spawnConfetti } = useConfetti()
  const mutedRef = useRef(muted)

  useEffect(() => {
    mutedRef.current = muted
  }, [muted])

  useEffect(() => {
    setCards(createDeck())
    try {
      const stored = window.localStorage.getItem(BEST_KEY)
      if (stored) setBest(Number(stored))
    } catch {
      // ignore
    }
  }, [])

  const won = matched.size === PAIRS.length

  const reset = useCallback(() => {
    setCards(createDeck())
    setFlipped([])
    setMatched(new Set())
    setMoves(0)
    setLocked(false)
    setStarted(false)
    setElapsed(0)
    startTime.current = null
    if (timerRef.current) clearInterval(timerRef.current)
  }, [])

  useEffect(() => {
    if (flipped.length !== 2) return
    setLocked(true)
    const [a, b] = flipped
    const cardA = cards[a]
    const cardB = cards[b]

    if (cardA.pairId === cardB.pairId) {
      const timeout = setTimeout(() => {
        setMatched((prev) => new Set(prev).add(cardA.pairId))
        setFlipped([])
        setLocked(false)
        if (!mutedRef.current) playMatchSound()
        spawnConfetti(15)
      }, 500)
      return () => clearTimeout(timeout)
    }

    const timeout = setTimeout(() => {
      setFlipped([])
      setLocked(false)
    }, 800)
    return () => clearTimeout(timeout)
  }, [flipped, cards, spawnConfetti])

  useEffect(() => {
    if (!won) return
    if (timerRef.current) clearInterval(timerRef.current)
    setBest((prevBest) => {
      const next = prevBest === null ? moves : Math.min(prevBest, moves)
      try {
        window.localStorage.setItem(BEST_KEY, String(next))
      } catch {
        // ignore
      }
      return next
    })
    if (!mutedRef.current) playWinChime()
    spawnConfetti(80)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [won])

  function handleClick(index: number) {
    if (locked) return
    if (flipped.includes(index)) return
    if (matched.has(cards[index].pairId)) return
    if (flipped.length >= 2) return

    if (!started) {
      setStarted(true)
      startTime.current = Date.now()
      timerRef.current = setInterval(() => {
        if (startTime.current) setElapsed(Math.floor((Date.now() - startTime.current) / 1000))
      }, 1000)
    }

    const next = [...flipped, index]
    setFlipped(next)
    if (next.length === 2) setMoves((m) => m + 1)
  }

  function isVisible(index: number) {
    return flipped.includes(index) || matched.has(cards[index].pairId)
  }

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(CLAIM_CODE)
      setCodeCopied(true)
      setTimeout(() => setCodeCopied(false), 2000)
    } catch {
      // ignore
    }
  }

  return (
    <div className="mx-auto max-w-xl">
      <ConfettiLayer pieces={confetti} />
      <div className="mb-4 flex items-center justify-between text-xs text-ink/50">
        <div className="flex gap-4">
          <span>
            MOVES <span className="font-display font-black text-ink">{moves}</span>
          </span>
          <span>
            TIME <span className="font-display font-black text-ink">{formatTime(elapsed)}</span>
          </span>
          {best !== null && (
            <span>
              BEST <span className="font-display font-black text-ink">{best}</span>
            </span>
          )}
        </div>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setMuted((m) => !m)}
            className="cursor-pointer text-ink/40 hover:text-ink/70"
          >
            {muted ? "Unmute" : "Mute"}
          </button>
          {started && !won && (
            <button
              type="button"
              onClick={reset}
              className="cursor-pointer text-ink/40 hover:text-ink/70"
            >
              Restart
            </button>
          )}
        </div>
      </div>

      <div className="relative">
        <div className="grid grid-cols-4 gap-2 sm:gap-3">
          {cards.map((card, index) => {
            const visible = isVisible(index)
            const isMatched = matched.has(card.pairId)
            return (
              <button
                key={card.uid}
                type="button"
                onClick={() => handleClick(index)}
                aria-label={visible ? undefined : "Flip card"}
                className="aspect-square cursor-pointer [perspective:800px]"
              >
                <div
                  className={`relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d] ${
                    visible ? "[transform:rotateY(180deg)]" : ""
                  }`}
                >
                  <div className="absolute inset-0 flex items-center justify-center border border-ink/15 bg-paper p-2 [backface-visibility:hidden] hover:border-ink/30">
                    <CardBack />
                  </div>
                  <div
                    className={`absolute inset-0 overflow-hidden border bg-paper [backface-visibility:hidden] [transform:rotateY(180deg)] ${
                      isMatched ? "border-accent/40" : "border-ink/15"
                    }`}
                  >
                    {card.content.kind === "image" ? (
                      <Image
                        src={card.content.src}
                        alt={card.content.alt}
                        fill
                        sizes="(max-width: 640px) 20vw, 160px"
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <span className="font-display text-lg font-black text-accent">
                          {card.content.label}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </button>
            )
          })}
        </div>

        {won && (
          <div className="absolute inset-0 z-20 flex items-center justify-center">
            <div className="w-full max-w-xs animate-[pop-in_0.3s_ease-out] space-y-4 border border-ink/15 bg-paper/95 p-6 text-center">
              <p className="flex items-center justify-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-accent">
                <span aria-hidden="true">✛</span>
                Found them all
                <span aria-hidden="true">✛</span>
              </p>
              <div className="flex justify-center gap-6 text-sm text-ink/60">
                <span>Time {formatTime(elapsed)}</span>
                <span>Moves {moves}</span>
              </div>
              {moves <= FREE_GAME_MOVE_LIMIT ? (
                <div className="space-y-3 border-t border-ink/10 pt-4">
                  <p className="text-sm text-ink/70">
                    {FREE_GAME_MOVE_LIMIT} moves or under. Here&apos;s your code, mention it
                    when you reach out and I&apos;ll build you a simple custom game for your
                    website. Free.
                  </p>
                  <button
                    type="button"
                    onClick={copyCode}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-dashed border-accent/50 bg-accent/5 px-4 py-2 font-display text-sm font-black tracking-wide text-accent transition-colors hover:bg-accent/10"
                  >
                    {codeCopied ? "Copied!" : CLAIM_CODE}
                  </button>
                  <Link
                    href="/#contact"
                    className="inline-flex items-center justify-center gap-2 rounded-md bg-accent px-6 py-2.5 text-xs font-semibold tracking-wide text-paper transition-opacity hover:opacity-90"
                  >
                    Claim it <span aria-hidden="true">→</span>
                  </Link>
                </div>
              ) : null}
              <button
                type="button"
                onClick={reset}
                className="cursor-pointer rounded-md border border-ink/20 px-6 py-2.5 text-xs font-semibold tracking-wide text-ink/70 transition-colors hover:border-ink/40 hover:text-ink"
              >
                Play again
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
