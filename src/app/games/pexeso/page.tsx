import type { Metadata } from "next"
import { Header } from "../../sections/header"
import { Footer } from "../../sections/footer"
import { PexesoGame } from "./PexesoGame"

export const metadata: Metadata = {
  title: "Let's play",
  description:
    "Flip the cards, find the iconic duos. Eight pairs, one of them is you.",
  alternates: { canonical: "/games/pexeso" },
  openGraph: {
    title: "Let's play | Miki Stec",
    description:
      "Flip the cards, find the iconic duos. Eight pairs, one of them is you.",
    url: "/games/pexeso",
  },
  twitter: {
    title: "Let's play | Miki Stec",
    description:
      "Flip the cards, find the iconic duos. Eight pairs, one of them is you.",
  },
}

export default function PexesoGamePage() {
  return (
    <>
      <Header playLabel="All games" playHref="/games" />
      <main className="font-body">
        <section className="bg-paper px-6 py-16 text-ink md:py-20">
          <div className="mx-auto mb-10 flex max-w-2xl flex-col items-center gap-6 text-center">
            <h1 className="text-[clamp(2.25rem,1.5rem+3.5vw,4rem)] font-display font-black leading-[0.98] tracking-tighter">
              Let&apos;s play.
            </h1>
            <p className="max-w-md text-lg text-ink/70">
              Beat it in under 15 moves and get a simple custom game built
              into your own website. Free.
            </p>
          </div>
          <PexesoGame />
        </section>
      </main>
      <Footer />
    </>
  )
}
