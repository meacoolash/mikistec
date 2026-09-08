import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "../../sections/header"
import { Footer } from "../../sections/footer"
import { StackGame } from "./StackGame"

export const metadata: Metadata = {
  title: "Stack the Website: a small experiment",
  description:
    "Tap to drop each section into place. Land it clean, keep it standing, watch it get harder the taller it gets.",
  alternates: { canonical: "/games/stack" },
  openGraph: {
    title: "Stack the Website: a small experiment | Miki Stec",
    description:
      "Tap to drop each section into place. Land it clean, keep it standing, watch it get harder the taller it gets.",
    url: "/games/stack",
  },
  twitter: {
    title: "Stack the Website: a small experiment | Miki Stec",
    description:
      "Tap to drop each section into place. Land it clean, keep it standing, watch it get harder the taller it gets.",
  },
}

export default function StackGamePage() {
  return (
    <>
      <Header />
      <main className="font-body">
        <section className="bg-paper px-6 py-20 text-ink md:py-28">
          <div className="mx-auto mb-10 flex max-w-2xl flex-col items-center gap-6 text-center">
            <Link href="/games" className="text-xs text-ink/40 hover:text-ink/70">
              ← All games
            </Link>
            <h1 className="text-[clamp(2.25rem,1.5rem+3.5vw,4rem)] font-display font-black leading-[0.98] tracking-tighter">
              Stack your website.
            </h1>
            <p className="max-w-md text-lg text-ink/70">
              Tap to drop each section. Land it clean, keep it standing.
            </p>
          </div>
          <StackGame />
        </section>
      </main>
      <Footer />
    </>
  )
}
