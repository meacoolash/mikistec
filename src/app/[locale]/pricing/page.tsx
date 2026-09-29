import Link from "@/lib/i18n-client"
import { isLocale, pageMetadata, type Locale } from "@/lib/i18n"
import { Header } from "@/app/[locale]/sections/header"
import { Footer } from "@/app/[locale]/sections/footer"
import { RevenueShare } from "./RevenueShare"

const en = {
  metaTitle: "Pricing",
  metaDescription:
    "Two ways to work with me: learn to build with AI for €390, or have me build your website from €990.",
  eyebrow: "Pricing",
  title: "Two ways to work with me",
  from: "from",
  learnLabel: "Build it yourself",
  learnPrice: "€390",
  learnTitle: "Learn to build with AI",
  learnBody:
    "I set everything up with you and teach you how to turn your ideas into real things using AI.",
  learn: [
    "1:1 sessions with me",
    "3 sessions included in the price",
    "Your AI development setup",
    "My ready-made instructions for your AI",
    "Build on your own laptop",
    "Work on your own business",
    "Websites, tools & simple agents",
    "Learn how to continue without me",
  ],
  learnStrong: "You do the building. I show you how.",
  learnNote: "Best if you want to understand what's possible and become independent.",
  learnCta: "START BUILDING",
  buildLabel: "Have me build it",
  buildPrice: "€990",
  buildTitle: "Get a finished website",
  buildBody: "You give me your business. I take care of the rest.",
  buildMark: "A good website isn't one prompt.",
  buildDetails: "The real work is in the details: understanding your business, finding the right message, refining the copy, adjusting the design, fixing edge cases, testing, SEO, performance, mobile and all the small decisions between",
  buildWorks: "“it works”",
  buildAnd: "and",
  buildReady: "“it's ready.”",
  build: [
    "Research your business",
    "Positioning & structure",
    "Copywriting",
    "Design",
    "Mobile & responsive details",
    "SEO & technical setup",
    "Analytics",
    "Testing & refinement",
    "Deployment",
  ],
  buildCta: "BUILD IT FOR ME",
  upgradeLabel: "Upgrade",
  upgradeTitle: "Make it smart",
  upgradeBody: "AI chatbot · Lead capture · Mini CRM",
  upgradeCta: "See demo",
  // null hides the Express card for a language.
  express: { title: "Express", body: "Your website within 24 hours", cta: "Get in touch" } as { title: string; body: string; cta: string } | null,
}

const COPY: Record<Locale, typeof en> = {
  en,
  sk: {
    metaTitle: "Cenník",
    metaDescription:
      "Dva spôsoby spolupráce: naučte sa stavať s AI za 390 €, alebo vám postavím web od 990 €.",
    eyebrow: "Cenník",
    title: "Dva spôsoby, ako spolupracovať",
    from: "od",
    learnLabel: "Postavte si to sami",
    learnPrice: "390 €",
    learnTitle: "Naučte sa stavať s AI",
    learnBody:
      "Všetko s vami nastavím a naučím vás, ako s pomocou AI premeniť nápady na skutočné veci.",
    learn: [
      "Individuálne stretnutia so mnou",
      "3 stretnutia v cene",
      "Vaše vývojové prostredie s AI",
      "Moje hotové inštrukcie pre vašu AI",
      "Staviate na vlastnom notebooku",
      "Pracujete na vlastnom podnikaní",
      "Weby, nástroje a jednoduchí agenti",
      "Naučíte sa pokračovať beze mňa",
    ],
    learnStrong: "Stavať budete vy. Ja ukážem ako.",
    learnNote: "Ideálne, ak chcete pochopiť, čo je možné, a byť samostatní.",
    learnCta: "CHCEM KNOW HOW",
    buildLabel: "Postavím to za vás",
    buildPrice: "990 €",
    buildTitle: "Hotový web",
    buildBody: "Vy mi poviete o svojom podnikaní. O zvyšok sa postarám ja.",
    buildMark: "Dobrý web nie je jeden prompt.",
    buildDetails: "Skutočná práca je v detailoch: pochopiť vaše podnikanie, nájsť správny odkaz, vybrúsiť texty, doladiť dizajn, opraviť okrajové prípady, testovanie, SEO, výkon, mobil a všetky drobné rozhodnutia medzi",
    buildWorks: "„funguje to“",
    buildAnd: "a",
    buildReady: "„je to hotové.“",
    build: [
      "Prieskum vášho podnikania",
      "Positioning a štruktúra",
      "Copywriting",
      "Dizajn",
      "Mobil a responzívne detaily",
      "SEO a technické nastavenie",
      "Analytika",
      "Testovanie a ladenie",
      "Spustenie",
    ],
    buildCta: "CHCEM WEB",
    upgradeLabel: "Upgrade",
    upgradeTitle: "Smart web",
    upgradeBody: "AI chatbot · Zber kontaktov · Mini CRM",
    upgradeCta: "Pozrieť demo",
    express: { title: "Express", body: "Web do 24 hodín", cta: "Napíšte mi" },
  },
  cz: {
    metaTitle: "Ceník",
    metaDescription:
      "Dva způsoby spolupráce: naučte se stavět s AI za 390 €, nebo vám postavím web od 990 €.",
    eyebrow: "Ceník",
    title: "Dva způsoby, jak spolupracovat",
    from: "od",
    learnLabel: "Postavte si to sami",
    learnPrice: "390 €",
    learnTitle: "Naučte se stavět s AI",
    learnBody:
      "Všechno s vámi nastavím a naučím vás, jak s pomocí AI proměnit nápady ve skutečné věci.",
    learn: [
      "Individuální setkání se mnou",
      "3 setkání v ceně",
      "Vaše vývojové prostředí s AI",
      "Moje hotové instrukce pro vaši AI",
      "Stavíte na vlastním notebooku",
      "Pracujete na vlastním podnikání",
      "Weby, nástroje a jednoduší agenti",
      "Naučíte se pokračovat beze mě",
    ],
    learnStrong: "Stavět budete vy. Já ukážu jak.",
    learnNote: "Ideální, pokud chcete pochopit, co je možné, a být samostatní.",
    learnCta: "CHCI KNOW HOW",
    buildLabel: "Postavím to za vás",
    buildPrice: "990 €",
    buildTitle: "Hotový web",
    buildBody: "Vy mi řeknete o svém podnikání. O zbytek se postarám já.",
    buildMark: "Dobrý web není jeden prompt.",
    buildDetails: "Skutečná práce je v detailech: pochopit vaše podnikání, najít správné sdělení, vybrousit texty, doladit design, opravit okrajové případy, testování, SEO, výkon, mobil a všechna drobná rozhodnutí mezi",
    buildWorks: "„funguje to“",
    buildAnd: "a",
    buildReady: "„je to hotové.“",
    build: [
      "Průzkum vašeho podnikání",
      "Positioning a struktura",
      "Copywriting",
      "Design",
      "Mobil a responzivní detaily",
      "SEO a technické nastavení",
      "Analytika",
      "Testování a ladění",
      "Spuštění",
    ],
    buildCta: "CHCI WEB",
    upgradeLabel: "Upgrade",
    upgradeTitle: "Smart web",
    upgradeBody: "AI chatbot · Sběr kontaktů · Mini CRM",
    upgradeCta: "Podívat se na demo",
    express: { title: "Express", body: "Web do 24 hodin", cta: "Napište mi" },
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
  return pageMetadata(locale, "/pricing", { title: t.metaTitle, description: t.metaDescription })
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex items-center justify-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-accent">
      <span aria-hidden="true">✛</span>
      {children}
      <span aria-hidden="true">✛</span>
    </p>
  )
}

const LABEL = "text-xs font-semibold tracking-[0.2em] uppercase"
const PRICE = "font-display text-[clamp(3rem,2.4rem+2.4vw,4.25rem)] font-black leading-none tracking-tighter"
const TITLE = "font-display text-2xl font-extrabold leading-tight"
const CTA =
  "mt-auto inline-flex items-center justify-center gap-2 self-start rounded-md px-7 py-3 text-sm font-semibold tracking-wide transition-opacity hover:opacity-90"

export default async function PricingPage({ params }: Props) {
  const t = COPY[await getLocale(params)]
  return (
    <div className="bg-white">
      <Header />
      <main className="font-body">
        <section className="px-4 pb-24 pt-12 text-ink md:px-7 md:pb-32 md:pt-20">
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
            <Eyebrow>{t.eyebrow}</Eyebrow>
            <h1 className="text-[clamp(2.5rem,1.5rem+4vw,4.5rem)] font-display font-black leading-[0.98] tracking-tighter">
              {t.title}
            </h1>
          </div>

          <div className="mx-auto mt-14 grid max-w-5xl gap-5 md:grid-cols-2">
            {/* Build it yourself */}
            <article className="flex flex-col gap-6 rounded-[14px] bg-[#EDECE8] p-7 md:p-10">
              <p className={`${LABEL} text-accent`}>{t.learnLabel}</p>
              <p className={PRICE}>
                <span className="mr-2 align-middle font-body text-lg font-normal tracking-normal text-ink/60">
                  {t.from}
                </span>
                {t.learnPrice}
              </p>
              <div className="flex flex-col gap-3">
                <h2 className={TITLE}>{t.learnTitle}</h2>
                <p className="text-ink/70">
                  {t.learnBody}
                </p>
              </div>
              <ul className="flex flex-col border-t border-ink/15">
                {t.learn.map((item) => (
                  <li key={item} className="flex gap-3 border-b border-ink/15 py-3 text-ink/80">
                    <span className="text-accent" aria-hidden="true">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="flex flex-col gap-2">
                <p className="font-semibold">{t.learnStrong}</p>
                <p className="text-ink/70">
                  {t.learnNote}
                </p>
              </div>
              <Link href="/?path=learn#contact" className={`${CTA} bg-accent text-paper`}>
                {t.learnCta} <span aria-hidden="true">→</span>
              </Link>
            </article>

            {/* Have me build it */}
            <article className="flex flex-col gap-6 rounded-[14px] bg-accent p-7 text-paper md:p-10">
              <p className={`${LABEL} text-[#FFD75E]`}>{t.buildLabel}</p>
              <p className={PRICE}>
                <span className="mr-2 align-middle font-body text-lg font-normal tracking-normal text-paper/80">
                  {t.from}
                </span>
                {t.buildPrice}
                <RevenueShare className="ml-3 align-middle font-body text-lg font-semibold tracking-normal text-[#FFD75E]" />
              </p>
              <div className="flex flex-col gap-3">
                <h2 className={TITLE}>{t.buildTitle}</h2>
                <p className="text-paper/85">
                  {t.buildBody}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <p>
                  <mark className="rounded bg-[#FFD75E] px-1.5 py-0.5 font-semibold text-ink">
                    {t.buildMark}
                  </mark>
                </p>
                <p className="text-paper/85">
                  {t.buildDetails} <strong className="text-paper">{t.buildWorks}</strong> {t.buildAnd}{" "}
                  <strong className="text-paper">{t.buildReady}</strong>
                </p>
              </div>
              <ul className="flex flex-col border-t border-paper/30">
                {t.build.map((item) => (
                  <li key={item} className="flex gap-3 border-b border-paper/25 py-3 text-paper/85">
                    <span className="text-[#FFD75E]" aria-hidden="true">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/?path=build#contact"
                className={`${CTA} bg-[#FFD75E] text-ink shadow-[0_0_18px_rgba(255,197,61,0.45)]`}
              >
                {t.buildCta} <span aria-hidden="true">→</span>
              </Link>
            </article>

            {/* Smart upgrade: sits under the €990 column only, never folded into the base price */}
            <a
              href="https://sites.qviks.com/smart-demo"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col gap-4 rounded-[14px] border-2 border-dashed border-accent p-7 transition-colors hover:bg-accent/5 md:col-start-2 md:p-8"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                <div>
                  <p className={`${LABEL} text-accent`}>{t.upgradeLabel}</p>
                  <h2 className={`${TITLE} mt-2`}>{t.upgradeTitle}</h2>
                </div>
              </div>
              <p className="text-ink/80">{t.upgradeBody}</p>
              <span className="text-sm font-semibold text-accent underline-offset-4 group-hover:underline">
                {t.upgradeCta} <span aria-hidden="true">↗</span>
              </span>
            </a>

            {/* Express upgrade: same slot and style as Smart, asks via the contact form */}
            {t.express && (
            <Link
              href="/#contact"
              className="group flex flex-col gap-4 rounded-[14px] border-2 border-dashed border-accent p-7 transition-colors hover:bg-accent/5 md:col-start-2 md:p-8"
            >
              <div>
                <p className={`${LABEL} text-accent`}>{t.upgradeLabel}</p>
                <h2 className={`${TITLE} mt-2`}>{t.express.title}</h2>
              </div>
              <p className="text-ink/80">{t.express.body}</p>
              <span className="text-sm font-semibold text-accent underline-offset-4 group-hover:underline">
                {t.express.cta} <span aria-hidden="true">→</span>
              </span>
            </Link>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
