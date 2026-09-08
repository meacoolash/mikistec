import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "../sections/header"
import { Footer } from "../sections/footer"

export const metadata: Metadata = {
  title: "Games — Miki Stec",
  description: "A few small, playful experiments. Nothing you need. Just fun.",
}

type Game = {
  href: string
  title: string
  description: string
}

const GAMES: Game[] = [
  {
    href: "/games/builder",
    title: "Build Your Own Website",
    description:
      "Drag a few blocks onto a page and see how it feels to build your own website.",
  },
]

export default function GamesIndexPage() {
  return (
    <>
      <Header />
      <main className="font-body">
        <section className="bg-paper px-6 py-20 text-ink md:py-28">
          <div className="mx-auto mb-14 flex max-w-2xl flex-col items-center gap-6 text-center">
            <p className="flex items-center justify-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-accent">
              <span aria-hidden="true">✛</span>
              Not the point of the website
              <span aria-hidden="true">✛</span>
            </p>
            <h1 className="text-[clamp(2.25rem,1.5rem+3.5vw,4rem)] font-display font-black leading-[0.98] tracking-tighter">
              Games.
            </h1>
            <p className="max-w-md text-lg text-ink/70">
              A few small experiments I built for fun. No sales pitch here.
            </p>
          </div>

          <div className="mx-auto flex max-w-lg flex-col gap-4">
            {GAMES.map((game) => (
              <Link
                key={game.href}
                href={game.href}
                className="group flex items-center justify-between gap-6 border border-ink/15 px-6 py-5 transition-colors hover:border-ink/40"
              >
                <span>
                  <span className="block font-display text-lg font-black tracking-tight">
                    {game.title}
                  </span>
                  <span className="mt-1 block text-sm text-ink/60">
                    {game.description}
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className="shrink-0 text-ink/30 transition-transform group-hover:translate-x-1 group-hover:text-ink"
                >
                  →
                </span>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
