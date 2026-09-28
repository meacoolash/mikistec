import Image from "next/image"
import Link from "@/lib/i18n-client"
import { isLocale, pageMetadata, type Locale } from "@/lib/i18n"
import { Header } from "@/app/[locale]/sections/header"
import { Footer } from "@/app/[locale]/sections/footer"

const en = {
  metaTitle: "Coaching",
  metaDescription: "I coach you to build your own website and your own AI agents.",
  heroAlt: "A figure crouched with head in hands, surrounded by other people's photos and a clock",
  heroEyebrow: "1:1 coaching",
  heroTitle: "Feeling left behind?",
  heroBody: "I coach you to build your own website and your own AI agents. From FOMO to shipping.",
  cta: "YES",
  getEyebrow: "With me next to you",
  getTitle: "Build it yourself.",
  getBody: "One-on-one sessions, on your laptop, on your business.",
  points: [
    "Your own website, apps or tools",
    "On your own domain, everything done through your agents",
    "Agents that do the work for you, e.g. research, emails, social posts",
  ],
  starStrong: "Nothing forgotten.",
  starRest: "Ready-made instructions for your AI, from my real projects. Your AI reads them every time.",
  problemEyebrow: "The problem",
  problemTitle: "You don't need to master AI. You need to know what it can do for you.",
  problemBody: "It's one afternoon of doing it next to someone who already does it every day.",
  priceTitle: "Start building with me",
  price: "€390",
  priceNote: "3 private sessions.",
  faqEyebrow: "Fair questions",
  faq: [
    {
      q: "I can't code. Is this for me?",
      a: "Yes. That's exactly who it's for. You'll describe what you want in plain language; the agent writes the code.",
    },
    {
      q: "So what's your job?",
      a: "I set everything up with you and explain it in plain words: how it all works, where it runs, and what to do when something breaks.",
    },
    {
      q: "Can't I just learn this from YouTube?",
      a: "Yes, you can. But it takes time, and it's easy to miss important details you don't yet know to look for.",
    },
    {
      q: "Which tools do we use?",
      a: "Whatever fits you. Mostly Claude and Claude Code, plus the tools you already use. I don't sell software, so I've no reason to push one.",
    },
  ],
  finalTitle: "Start building. Seriously. Now.",
  finalAlt: "Rather have me build it for you?",
}

const COPY: Record<Locale, typeof en> = {
  en,
  sk: {
    metaTitle: "Konzultácie",
    metaDescription: "Naučím vás postaviť si vlastný web a vlastných AI agentov.",
    heroAlt: "Postava schúlená s hlavou v dlaniach, obklopená fotkami iných ľudí a hodinami",
    heroEyebrow: "Konzultácie 1:1",
    heroTitle: "Máte pocit, že vám ujde vlak?",
    heroBody: "Naučím vás postaviť si vlastný web a vlastných AI agentov. Od FOMO k hotovej veci.",
    cta: "ÁNO",
    getEyebrow: "So mnou po boku",
    getTitle: "Postavte si to sami.",
    getBody: "Individuálne stretnutia, na vašom notebooku, na vašom podnikaní.",
    points: [
      "Vlastný web, aplikácie alebo nástroje",
      "Na vlastnej doméne, všetko cez vašich agentov",
      "Agenti, ktorí pracujú za vás, napr. prieskum, e-maily, príspevky na sociálne siete",
    ],
    starStrong: "Nič nezabudnete.",
    starRest: "Hotové inštrukcie pre vašu AI z mojich reálnych projektov. Vaša AI si ich prečíta zakaždým.",
    problemEyebrow: "Problém",
    problemTitle: "AI nemusíte ovládať dokonale. Stačí vedieť, čo pre vás dokáže urobiť.",
    problemBody: "Stačí jedno popoludnie vedľa niekoho, kto to robí každý deň.",
    priceTitle: "Začnite stavať so mnou",
    price: "390 €",
    priceNote: "3 súkromné stretnutia.",
    faqEyebrow: "Férové otázky",
    faq: [
      {
        q: "Neviem programovať. Je to pre mňa?",
        a: "Áno. Presne pre vás. Poviete bežnými slovami, čo chcete, a kód napíše agent.",
      },
      {
        q: "Tak čo je vaša úloha?",
        a: "Všetko s vami nastavím a vysvetlím zrozumiteľne: ako to celé funguje, kde to beží a čo robiť, keď sa niečo pokazí.",
      },
      {
        q: "Nenaučím sa to z YouTube?",
        a: "Áno, naučíte. Ale zaberie to čas a ľahko prehliadnete dôležité detaily, o ktorých ešte ani neviete, že ich máte hľadať.",
      },
      {
        q: "Aké nástroje použijeme?",
        a: "Tie, ktoré vám sedia. Najmä Claude a Claude Code, plus nástroje, ktoré už používate. Nepredávam softvér, takže nemám dôvod vám nejaký tlačiť.",
      },
    ],
    finalTitle: "Začnite stavať. Vážne. Teraz.",
    finalAlt: "Chcete radšej, aby som ho postavil ja?",
  },
  cz: {
    metaTitle: "Koučink",
    metaDescription: "Naučím vás postavit si vlastní web a vlastní AI agenty.",
    heroAlt: "Postava schoulená s hlavou v dlaních, obklopená fotkami jiných lidí a hodinami",
    heroEyebrow: "Koučink 1:1",
    heroTitle: "Máte pocit, že vám ujíždí vlak?",
    heroBody: "Naučím vás postavit si vlastní web a vlastní AI agenty. Od FOMO k hotové věci.",
    cta: "ANO",
    getEyebrow: "Se mnou po boku",
    getTitle: "Postavte si to sami.",
    getBody: "Individuální setkání, na vašem notebooku, na vašem podnikání.",
    points: [
      "Vlastní web, aplikace nebo nástroje",
      "Na vlastní doméně, všechno přes vaše agenty",
      "Agenti, kteří pracují za vás, např. průzkum, e-maily, příspěvky na sociální sítě",
    ],
    starStrong: "Nic nezapomenete.",
    starRest: "Hotové instrukce pro vaši AI z mých reálných projektů. Vaše AI si je přečte pokaždé.",
    problemEyebrow: "Problém",
    problemTitle: "AI nemusíte ovládat dokonale. Stačí vědět, co pro vás dokáže udělat.",
    problemBody: "Stačí jedno odpoledne vedle někoho, kdo to dělá každý den.",
    priceTitle: "Začněte stavět se mnou",
    price: "390 €",
    priceNote: "3 soukromá setkání.",
    faqEyebrow: "Férové otázky",
    faq: [
      {
        q: "Neumím programovat. Je to pro mě?",
        a: "Ano. Přesně pro vás. Řeknete běžnými slovy, co chcete, a kód napíše agent.",
      },
      {
        q: "Tak jaká je vaše role?",
        a: "Všechno s vámi nastavím a vysvětlím srozumitelně: jak to celé funguje, kde to běží a co dělat, když se něco rozbije.",
      },
      {
        q: "Nenaučím se to z YouTube?",
        a: "Ano, naučíte. Ale zabere to čas a snadno přehlédnete důležité detaily, o kterých ještě ani nevíte, že je máte hledat.",
      },
      {
        q: "Jaké nástroje použijeme?",
        a: "Ty, které vám sednou. Hlavně Claude a Claude Code, plus nástroje, které už používáte. Neprodávám software, takže nemám důvod vám nějaký vnucovat.",
      },
    ],
    finalTitle: "Začněte stavět. Vážně. Teď.",
    finalAlt: "Chcete raději, abych ho postavil já?",
  },
}

type Props = { params: Promise<{ locale: string }> }

async function getLocale(params: Props["params"]): Promise<Locale> {
  const { locale } = await params
  return isLocale(locale) ? locale : "en"
}

export async function generateMetadata({ params }: Props) {
  const locale = await getLocale(params)
  const t = COPY[locale]
  return pageMetadata(locale, "/coaching", { title: t.metaTitle, description: t.metaDescription })
}

function Eyebrow({ children, tone = "accent" }: { children: React.ReactNode; tone?: "accent" | "paper" }) {
  return (
    <p
      className={`flex items-center justify-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase ${
        tone === "paper" ? "text-paper" : "text-accent"
      }`}
    >
      <span aria-hidden="true">✛</span>
      {children}
      <span aria-hidden="true">✛</span>
    </p>
  )
}

const H2 = "text-[clamp(2rem,1.5rem+2.8vw,3.5rem)] font-display font-black leading-[0.98] tracking-tighter"

export default async function LearnPage({ params }: Props) {
  const t = COPY[await getLocale(params)]
  return (
    <div className="bg-white">
      <Header />
      <main className="font-body">
        {/* 1. Hero: a grey card with room around it on a white page; the FOMO painting melts into the grey */}
        <section className="px-4 md:px-7">
          <div className="isolate mx-auto flex min-h-[min(88svh,860px)] max-w-[1240px] items-center rounded-[14px] bg-[#EDECE8] px-5 py-14 text-ink md:px-16 md:py-16">
          <div className="mx-auto grid w-full max-w-5xl items-center gap-10 md:grid-cols-[5fr_7fr] md:gap-14">
            <div className="mx-auto w-60 mix-blend-multiply md:w-full md:max-w-sm">
              <Image
                src="/coaching-fomo.jpg"
                alt={t.heroAlt}
                width={800}
                height={1200}
                priority
                className="h-auto w-full brightness-[1.18] contrast-[1.12] saturate-[.6] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"
              />
            </div>
            <div className="flex flex-col items-center gap-6 text-center md:items-start md:text-left">
              <Eyebrow>{t.heroEyebrow}</Eyebrow>
              <h1 className="text-[clamp(2.5rem,1.5rem+4vw,4.5rem)] font-display font-black leading-[0.98] tracking-tighter">
                {t.heroTitle}
              </h1>
              <p className="max-w-md text-lg text-ink/70">
                {t.heroBody}
              </p>
              <Link
                href="/?path=learn#contact"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-accent px-7 py-3 text-sm font-semibold tracking-wide text-paper transition-opacity hover:opacity-90"
              >
                {t.cta} <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
          </div>
        </section>

        {/* 2. What you get */}
        <section className="bg-white px-6 py-24 text-ink md:py-32">
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-8 text-center">
            <Eyebrow>{t.getEyebrow}</Eyebrow>
            <h2 className={H2}>{t.getTitle}</h2>
            <p className="text-lg text-ink/70">
              {t.getBody}
            </p>
            <ul className="flex w-full flex-col gap-3 text-left">
              {t.points.map((p) => (
                <li key={p} className="flex gap-3 border-b border-ink/15 pb-3 text-ink/80">
                  <span className="text-accent" aria-hidden="true">→</span>
                  {p}
                </li>
              ))}
              <li className="flex gap-3 border-b border-ink/15 pb-3 text-ink/80">
                <span className="text-accent" aria-hidden="true">★</span>
                <span>
                  <strong className="font-semibold text-ink">{t.starStrong}</strong>{" "}
                  {t.starRest}
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* 3. Problem */}
        <section className="bg-white px-6 py-24 text-ink md:py-32">
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
            <Eyebrow>{t.problemEyebrow}</Eyebrow>
            <h2 className={H2}>
              {t.problemTitle}
            </h2>
            <p className="text-lg text-ink/70">
              {t.problemBody}
            </p>
          </div>
        </section>

        {/* 3b. Price */}
        <section className="bg-white px-6 pb-24 text-ink md:pb-32">
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-5 rounded-[14px] bg-paper px-6 py-14 text-center">
            <h2 className="font-display text-2xl font-extrabold">{t.priceTitle}</h2>
            <p className="font-display text-[clamp(3.5rem,2.5rem+4vw,5.5rem)] font-black leading-none tracking-tighter text-accent">
              {t.price}
            </p>
            <p className="text-lg text-ink/70">{t.priceNote}</p>
            <Link
              href="/?path=learn#contact"
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-md bg-[#FFD75E] px-7 py-3 text-sm font-semibold tracking-wide text-ink shadow-[0_0_18px_rgba(255,197,61,0.55)] transition-opacity hover:opacity-90"
            >
              {t.cta} <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>

        {/* 4. FAQ */}
        <section className="bg-white px-6 py-24 text-ink md:py-32">
          <div className="mx-auto flex max-w-2xl flex-col gap-8">
            <Eyebrow>{t.faqEyebrow}</Eyebrow>
            <div className="border-t border-ink/15">
              {t.faq.map((f) => (
                <details key={f.q} className="group border-b border-ink/15">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 font-display text-lg font-extrabold">
                    {f.q}
                    <span className="text-2xl font-normal text-accent transition-transform group-open:rotate-45" aria-hidden="true">+</span>
                  </summary>
                  <p className="pb-6 text-ink/70">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* 5. CTA */}
        <section className="bg-accent px-6 py-24 text-paper md:py-32">
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
            <h2 className={H2}>{t.finalTitle}</h2>
            <Link
              href="/?path=learn#contact"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-[#FFD75E] px-7 py-3 text-sm font-semibold tracking-wide text-ink shadow-[0_0_18px_rgba(255,197,61,0.55)] transition-opacity hover:opacity-90"
            >
              {t.cta} <span aria-hidden="true">→</span>
            </Link>
            <Link href="/?path=build#contact" className="text-sm text-paper/80 underline underline-offset-4 hover:text-paper">
              {t.finalAlt}
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
