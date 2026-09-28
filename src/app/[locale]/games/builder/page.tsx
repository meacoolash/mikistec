import type { Metadata } from "next"
import { Header } from "@/app/[locale]/sections/header"
import { Footer } from "@/app/[locale]/sections/footer"
import { isLocale, pageMetadata, type Locale } from "@/lib/i18n"
import { BuildYourOwnWebsiteGame } from "./BuildYourOwnWebsiteGame"

const en = {
  title: "Build Your Own Website: a small experiment",
  description:
    "Drag a few blocks onto a page and see how it feels to build your own website. Spoiler: you can. You just don't have to.",
  heading: "Build your own website.",
  intro: "Drag a few blocks onto the page. See how far you get before it stops being fun.",
}

const COPY: Record<Locale, typeof en> = {
  en,
  sk: {
    title: "Postavte si vlastný web: malý experiment",
    description:
      "Potiahnite pár blokov na stránku a vyskúšajte si, aké je postaviť si vlastný web. Spoiler: zvládnete to. Len nemusíte.",
    heading: "Postavte si vlastný web.",
    intro: "Potiahnite pár blokov na stránku. Uvidíte, ako ďaleko sa dostanete, kým vás to prestane baviť.",
  },
  cz: {
    title: "Postavte si vlastní web: malý experiment",
    description:
      "Přetáhněte pár bloků na stránku a vyzkoušejte si, jaké je postavit si vlastní web. Spoiler: zvládnete to. Jen nemusíte.",
    heading: "Postavte si vlastní web.",
    intro: "Přetáhněte pár bloků na stránku. Uvidíte, jak daleko se dostanete, než vás to přestane bavit.",
  },
}

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params
  const locale = isLocale(raw) ? raw : "en"
  const t = COPY[locale]
  return pageMetadata(locale, "/games/builder", { title: t.title, description: t.description })
}

export default async function BuilderGamePage({ params }: Props) {
  const { locale: raw } = await params
  const t = COPY[isLocale(raw) ? raw : "en"]
  return (
    <>
      <Header />
      <main className="font-body">
        <section className="bg-paper px-6 py-20 text-ink md:py-28">
          <div className="mx-auto mb-14 flex max-w-2xl flex-col items-center gap-6 text-center">
            <h1 className="text-[clamp(2.25rem,1.5rem+3.5vw,4rem)] font-display font-black leading-[0.98] tracking-tighter">
              {t.heading}
            </h1>
            <p className="max-w-md text-lg text-ink/70">
              {t.intro}
            </p>
          </div>
          <BuildYourOwnWebsiteGame />
        </section>
      </main>
      <Footer />
    </>
  )
}
