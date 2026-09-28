import type { Metadata } from "next"
import Link from "@/lib/i18n-client"
import { isLocale, pageMetadata, type Locale } from "@/lib/i18n"
import { Header } from "@/app/[locale]/sections/header"
import { Footer } from "@/app/[locale]/sections/footer"

type Game = {
  href: string
  title: string
  description: string
}

const en = {
  metaTitle: "Games",
  metaDescription: "A few small, playful experiments. Nothing you need. Just fun.",
  heading: "Games.",
  games: [
    {
      href: "/games/stack",
      title: "Stack the Website",
      description:
        "Tap to drop each section into place. Land it clean, keep it standing.",
    },
    {
      href: "/games/builder",
      title: "Build Your Own Website",
      description:
        "Drag a few blocks onto a page and see how it feels to build your own website.",
    },
    {
      href: "/games/pexeso",
      title: "Pexeso",
      description:
        "Flip the cards, find the iconic duos. Ten pairs, one of them is you.",
    },
  ] as Game[],
}

const COPY: Record<Locale, typeof en> = {
  en,
  sk: {
    metaTitle: "Hry",
    metaDescription: "Pár malých hravých experimentov. Nič, čo potrebujete. Len pre radosť.",
    heading: "Hry.",
    games: [
      {
        href: "/games/stack",
        title: "Poskladajte web",
        description: "Ťuknutím pustite každú sekciu na miesto. Presne, nech to stojí.",
      },
      {
        href: "/games/builder",
        title: "Postavte si vlastný web",
        description: "Pretiahnite pár blokov na stránku a vyskúšajte, aké je postaviť si vlastný web.",
      },
      {
        href: "/games/pexeso",
        title: "Pexeso",
        description: "Otáčajte karty, nájdite slávne dvojice. Desať párov, jeden z nich ste vy.",
      },
    ],
  },
  cz: {
    metaTitle: "Hry",
    metaDescription: "Pár malých hravých experimentů. Nic, co potřebujete. Jen pro radost.",
    heading: "Hry.",
    games: [
      {
        href: "/games/stack",
        title: "Poskládejte web",
        description: "Ťuknutím pusťte každou sekci na místo. Přesně, ať to stojí.",
      },
      {
        href: "/games/builder",
        title: "Postavte si vlastní web",
        description: "Přetáhněte pár bloků na stránku a vyzkoušejte si, jaké je postavit si vlastní web.",
      },
      {
        href: "/games/pexeso",
        title: "Pexeso",
        description: "Otáčejte karty, najděte slavné dvojice. Deset párů, jeden z nich jste vy.",
      },
    ],
  },
}

type Props = { params: Promise<{ locale: string }> }

async function getLocale(params: Props["params"]): Promise<Locale> {
  const { locale } = await params
  return isLocale(locale) ? locale : "en"
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await getLocale(params)
  const t = COPY[locale]
  return pageMetadata(locale, "/games", { title: t.metaTitle, description: t.metaDescription })
}

export default async function GamesIndexPage({ params }: Props) {
  const t = COPY[await getLocale(params)]
  return (
    <>
      <Header />
      <main className="font-body">
        <section className="bg-paper px-6 py-20 text-ink md:py-28">
          <div className="mx-auto mb-14 flex max-w-2xl flex-col items-center gap-6 text-center">
            <h1 className="text-[clamp(2.25rem,1.5rem+3.5vw,4rem)] font-display font-black leading-[0.98] tracking-tighter">
              {t.heading}
            </h1>
          </div>

          <div className="mx-auto flex max-w-lg flex-col gap-4">
            {t.games.map((game) => (
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
