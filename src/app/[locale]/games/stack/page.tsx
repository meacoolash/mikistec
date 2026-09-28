import type { Metadata } from "next"
import { Header } from "@/app/[locale]/sections/header"
import { Footer } from "@/app/[locale]/sections/footer"
import { isLocale, pageMetadata, type Locale } from "@/lib/i18n"
import { StackGame } from "./StackGame"

const en = {
  title: "Stack the Website: a small experiment",
  description:
    "Tap to drop each section into place. Land it clean, keep it standing, watch it get harder the taller it gets.",
  heading: "Stack your website.",
  intro: "Tap to drop each section. Land it clean, keep it standing.",
}

const COPY: Record<Locale, typeof en> = {
  en,
  sk: {
    title: "Postavte si web: malý experiment",
    description:
      "Ťuknite a pustite každú sekciu na miesto. Trafte ju presne, udržte vežu a sledujte, ako čím vyššie, tým ťažšie.",
    heading: "Poskladajte si web.",
    intro: "Ťuknutím pustíte sekciu. Trafte ju presne a udržte to celé na nohách.",
  },
  cz: {
    title: "Postavte si web: malý experiment",
    description:
      "Ťukněte a pusťte každou sekci na místo. Trefte ji přesně, udržte věž a sledujte, jak čím výš, tím hůř.",
    heading: "Poskládejte si web.",
    intro: "Ťuknutím pustíte sekci. Trefte ji přesně a udržte to celé na nohou.",
  },
}

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params
  const locale = isLocale(raw) ? raw : "en"
  const t = COPY[locale]
  return pageMetadata(locale, "/games/stack", { title: t.title, description: t.description })
}

export default async function StackGamePage({ params }: Props) {
  const { locale: raw } = await params
  const t = COPY[isLocale(raw) ? raw : "en"]
  return (
    <>
      <Header />
      <main className="font-body">
        <section className="bg-paper px-6 py-20 text-ink md:py-28">
          <div className="mx-auto mb-10 flex max-w-2xl flex-col items-center gap-6 text-center">
            <h1 className="text-[clamp(2.25rem,1.5rem+3.5vw,4rem)] font-display font-black leading-[0.98] tracking-tighter">
              {t.heading}
            </h1>
            <p className="max-w-md text-lg text-ink/70">
              {t.intro}
            </p>
          </div>
          <StackGame />
        </section>
      </main>
      <Footer />
    </>
  )
}
