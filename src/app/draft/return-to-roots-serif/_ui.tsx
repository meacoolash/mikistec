import Link from "next/link"

export const INK = "#1C160F"
export const PAPER = "#F7F1E6"
export const TERRACOTTA = "#B5502E"
export const GOLD = "#C9A24B"

export function Serif({
  as: Tag = "span",
  className = "",
  children,
}: {
  as?: React.ElementType
  className?: string
  children: React.ReactNode
}) {
  return (
    <Tag className={className} style={{ fontFamily: "var(--font-rt-serif)" }}>
      {children}
    </Tag>
  )
}

export function Nav({ current }: { current: "home" | "itinerary" }) {
  return (
    <header className="sticky top-0 z-30 border-b border-[#1C160F]/10 bg-[#F7F1E6]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/draft/return-to-roots-serif" className="flex items-baseline gap-2">
          <Serif as="span" className="text-lg font-medium tracking-tight text-[#1C160F]">
            Return to Roots
          </Serif>
        </Link>
        <nav className="flex items-center gap-4 sm:gap-6">
          <Link
            href={current === "itinerary" ? "/draft/return-to-roots-serif#included" : "#included"}
            className="hidden text-sm text-[#1C160F]/70 hover:text-[#1C160F] sm:inline"
          >
            Included
          </Link>
          <Link
            href={current === "itinerary" ? "/draft/return-to-roots-serif" : "/draft/return-to-roots-serif/itinerary"}
            className="hidden text-sm text-[#1C160F]/70 hover:text-[#1C160F] sm:inline"
          >
            {current === "itinerary" ? "Overview" : "Itinerary"}
          </Link>
          <Link
            href={current === "itinerary" ? "/draft/return-to-roots-serif#apply" : "#apply"}
            className="inline-flex items-center justify-center rounded-full bg-[#B5502E] px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#F7F1E6] transition-opacity hover:opacity-90 sm:px-5"
          >
            Reserve
          </Link>
        </nav>
      </div>
    </header>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-[#1C160F]/10 px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 text-center sm:flex-row sm:justify-between sm:text-left">
        <p className="text-xs text-[#1C160F]/50">
          Return to Roots — Kathmandu, Nepal · October 15–19, 2026
        </p>
        <a
          href="https://mikistec.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-[#1C160F]/40 hover:text-[#1C160F]/70"
        >
          Website draft by Miki Stec →
        </a>
      </div>
    </footer>
  )
}
