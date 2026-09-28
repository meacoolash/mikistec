import type { Metadata } from "next"
import { Header } from "@/app/[locale]/sections/header"
import { Footer } from "@/app/[locale]/sections/footer"
import { isLocale, pageMetadata, type Locale } from "@/lib/i18n"
import { PexesoGame } from "./PexesoGame"

const en = {
  title: "Let's play",
  description: "Flip the cards, find the iconic duos. Eight pairs, one of them is you.",
  heading: "Let's play.",
  intro: "Beat it in under 15 moves and get a simple custom game built into your own website. Free.",
}

const COPY: Record<Locale, typeof en> = {
  en,
  sk: {
    title: "Zahrajme si pexeso",
    description: "Otáčajte karty, hľadajte slávne dvojice. Osem párov, jeden z nich ste vy.",
    heading: "Zahrajme si.",
    intro: "Dajte to pod 15 ťahov a jednoduchú hru na mieru vám zabudujem do vášho webu. Zadarmo.",
  },
  cz: {
    title: "Zahrajme si pexeso",
    description: "Otáčejte karty, hledejte slavné dvojice. Osm párů, jeden z nich jste vy.",
    heading: "Zahrajme si.",
    intro: "Dejte to pod 15 tahů a jednoduchou hru na míru vám zabuduju do vašeho webu. Zdarma.",
  },
}

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params
  const locale = isLocale(raw) ? raw : "en"
  const t = COPY[locale]
  return pageMetadata(locale, "/games/pexeso", { title: t.title, description: t.description })
}

export default async function PexesoGamePage({ params }: Props) {
  const { locale: raw } = await params
  const t = COPY[isLocale(raw) ? raw : "en"]
  return (
    <>
      <Header />
      <main className="font-body">
        <section className="bg-paper px-6 py-16 text-ink md:py-20">
          <div className="mx-auto mb-10 flex max-w-2xl flex-col items-center gap-6 text-center">
            <h1 className="text-[clamp(2.25rem,1.5rem+3.5vw,4rem)] font-display font-black leading-[0.98] tracking-tighter">
              {t.heading}
            </h1>
            <p className="max-w-md text-lg text-ink/70">
              {t.intro}
            </p>
          </div>
          <PexesoGame />
        </section>
      </main>
      <Footer />
    </>
  )
}
