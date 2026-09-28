import type { ConfettiPiece } from "./useConfetti"

export function ConfettiLayer({ pieces }: { pieces: ConfettiPiece[] }) {
  if (pieces.length === 0) return null
  return (
    <div className="pointer-events-none fixed inset-0 z-50">
      {pieces.map((p) => (
        <div
          key={p.id}
          className="absolute animate-[confetti-fall_2.5s_ease-in_forwards]"
          style={{
            left: `${p.x}%`,
            top: "-20px",
            animationDelay: `${p.delay}s`,
            ["--drift" as string]: `${p.drift}px`,
          }}
        >
          <div
            className="animate-[confetti-spin_1s_linear_infinite]"
            style={{
              width: p.size,
              height: p.size * 0.6,
              backgroundColor: p.color,
              borderRadius: "2px",
            }}
          />
        </div>
      ))}
    </div>
  )
}
