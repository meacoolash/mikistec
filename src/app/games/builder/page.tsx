import type { Metadata } from "next"
import { Header } from "../../sections/header"
import { Footer } from "../../sections/footer"
import { BuildYourOwnWebsiteGame } from "./BuildYourOwnWebsiteGame"

export const metadata: Metadata = {
  title: "Build Your Own Website: a small experiment",
  description:
    "Drag a few blocks onto a page and see how it feels to build your own website. Spoiler: you can. You just don't have to.",
  alternates: { canonical: "/games/builder" },
  openGraph: {
    title: "Build Your Own Website: a small experiment | Miki Stec",
    description:
      "Drag a few blocks onto a page and see how it feels to build your own website. Spoiler: you can. You just don't have to.",
    url: "/games/builder",
  },
  twitter: {
    title: "Build Your Own Website: a small experiment | Miki Stec",
    description:
      "Drag a few blocks onto a page and see how it feels to build your own website. Spoiler: you can. You just don't have to.",
  },
}

export default function BuilderGamePage() {
  return (
    <>
      <Header playLabel="All games" playHref="/games" />
      <main className="font-body">
        <section className="bg-paper px-6 py-20 text-ink md:py-28">
          <div className="mx-auto mb-14 flex max-w-2xl flex-col items-center gap-6 text-center">
            <h1 className="text-[clamp(2.25rem,1.5rem+3.5vw,4rem)] font-display font-black leading-[0.98] tracking-tighter">
              Build your own website.
            </h1>
            <p className="max-w-md text-lg text-ink/70">
              Drag a few blocks onto the page. See how far you get before it
              stops being fun.
            </p>
          </div>
          <BuildYourOwnWebsiteGame />
        </section>
      </main>
      <Footer />
    </>
  )
}
