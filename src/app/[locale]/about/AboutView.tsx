"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link, { useLocale } from "@/lib/i18n-client"
import { Header } from "../sections/header"
import { Footer } from "../sections/footer"
import { CHAPTER_IDS, COPY, type ChapterId } from "./copy"
import { FACES, FaceImg, FaceStrip, type Face } from "./faces"

const DIR = "/about"

const CHAPTER_FACE: Record<ChapterId, Face> = {
  birth: "1981",
  childhood: "1988",
  school: "1999",
  flash: "1999",
  systems: "2004",
  photo: "2010",
  visual: "2010",
  direction: "2015",
  corporate: "2019",
  nomad: "2022",
  beyond: "2022",
  now: "2026",
}

type Media = {
  src: string
  alt: string
  /** Tailwind aspect class; grid tiles default to 4:5 so rows line up. */
  ratio?: string
  /** Spans the full gallery width. */
  wide?: boolean
  /** Plays a muted looping clip inside a browser frame; src is the poster. */
  video?: string
  /** Scan of a printed portfolio page: shown whole on white, not cropped. */
  paper?: boolean
  pos?: string
}

const TILE = "aspect-[4/5]"

const MEDIA: Partial<Record<ChapterId, Media[]>> = {
  birth: [{ src: "mikinko.jpg", alt: "Miki as a toddler among flowers, 1981", ratio: "aspect-[16/9]", wide: true, pos: "center 40%" }],
  childhood: [
    { src: "kid-guitar.jpg", alt: "Miki as a boy playing guitar at home" },
    { src: "kid-harmonica.jpg", alt: "Miki as a small boy in a folk costume playing harmonica" },
    { src: "commodore.jpg", alt: "A Commodore home computer" },
  ],
  flash: [
    { src: "flash.jpg", video: "flash.mp4", alt: "Recording of Miki's first Flash website from 2003", ratio: "aspect-[16/9]", wide: true },
  ],
  photo: [
    { src: "portrait-blue.jpg", alt: "Close-up studio portrait of a woman with blue eyes" },
    { src: "family-vintage.jpg", alt: "Vintage-styled family portrait with dolls and a pram" },
    { src: "portrait-brim.jpg", alt: "Portrait of a woman with her eyes hidden under a wide hat brim" },
    { src: "kid-frame.jpg", alt: "A smiling girl holding a golden picture frame" },
    { src: "portrait-gold.jpg", alt: "Portrait with gold glitter make-up" },
    { src: "exhibition-poster.jpg", alt: "Poster of the Pure Beauty photo exhibition, 2014", pos: "top" },
    { src: "exhibition-wall.jpg", alt: "Framed photographs hanging at the exhibition" },
    { src: "wedding-hall.jpg", alt: "Wedding couple in a baroque hall" },
    { src: "families-cloud.jpg", alt: "Collage of hundreds of family photo sessions" },
  ],
  visual: [
    { src: "visual-posters.jpg", alt: "Portfolio page: posters", ratio: "aspect-[1075/1521]", paper: true },
    { src: "visual-ecommerce.jpg", alt: "Portfolio page: e-commerce", ratio: "aspect-[1075/1521]", paper: true },
    { src: "visual-web.jpg", alt: "Portfolio page: websites", ratio: "aspect-[1075/1521]", paper: true },
    { src: "visual-sales.jpg", alt: "Portfolio page: sales material", ratio: "aspect-[1075/1521]", paper: true },
    { src: "visual-interiors.jpg", alt: "Portfolio page: interior redesign", ratio: "aspect-[1075/1521]", paper: true },
    { src: "drawing.jpg", alt: "Charcoal portrait drawing by Miki", ratio: "aspect-[1075/1521]" },
  ],
  direction: [
    { src: "london-badge.jpg", alt: "Business Show London 2016 badge reading Nick Stec, Entrepreneur" },
  ],
  corporate: [
    { src: "uniqa.jpg", video: "uniqa.mp4", alt: "UNIQA travel insurance calculator in use", ratio: "aspect-[16/9]", wide: true },
    { src: "gin.jpg", video: "gin.mp4", alt: "Swiss Re natural-hazard map of Switzerland", ratio: "aspect-[16/9]" },
    { src: "varden.jpg", video: "varden.mp4", alt: "VARDEN healthcare booking platform", ratio: "aspect-[16/9]" },
    { src: "solar2.jpg", alt: "Offshore oil platform", ratio: "aspect-[16/9]" },
    { src: "selos.jpg", alt: "Škoda energy logistics platform dashboard", ratio: "aspect-[16/9]", pos: "top left" },
  ],
  nomad: [
    { src: "boat-anchor.jpg", alt: "Miki's blue sailboat at anchor in the Caribbean", ratio: "aspect-[16/9]", wide: true },
    { src: "captain.jpg", alt: "Miki in a captain's cap at the helm" },
    { src: "laptop-bar.jpg", alt: "Working on a laptop in a Caribbean beach bar" },
    { src: "sail-son.jpg", alt: "Sailing at sunset" },
    { src: "laptop-beach.jpg", alt: "Working on a laptop on a tropical beach" },
    { src: "pyramids.jpg", alt: "On horseback at the pyramids of Giza" },
    { src: "nyc.jpg", alt: "Sunset over Manhattan" },
    { src: "laptop-jungle.jpg", alt: "Laptop and coffee overlooking a jungle" },
    { src: "surf.jpg", alt: "With a surfboard on the beach" },
    { src: "seaplane.jpg", alt: "In the cockpit of a yellow seaplane" },
  ],
}

const BEYOND_MEDIA: [Media, Media][] = [
  [
    { src: "keys-live.jpg", alt: "Playing keys live in a bar" },
    { src: "recording.jpg", alt: "Recording at the piano with headphones" },
  ],
  [
    { src: "chinese-2.jpg", alt: "Notebook full of hand-written Chinese characters" },
    { src: "chinese-1.jpg", alt: "Study notes on Chinese characters" },
  ],
  [
    { src: "yoga.jpg", alt: "Yoga on the beach at dawn" },
    { src: "line-tea.jpg", alt: "Line drawing of a figure drinking tea under the sun" },
  ],
]

const NOW_MEDIA: Media[] = [
  { src: "beach-joy.jpg", alt: "Miki on the beach, arms wide open" },
  { src: "beach-stand.jpg", alt: "Miki standing by the sea" },
  { src: "beach-run.jpg", alt: "Miki running along the shore" },
]

const H2 = "text-[clamp(2rem,1.5rem+2.8vw,3.5rem)] font-display font-black leading-[0.98] tracking-tighter"

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
      <span aria-hidden="true">✛</span>
      {children}
      <span aria-hidden="true">✛</span>
    </p>
  )
}

/** Muted looping clip that only plays while on screen, framed like a browser window. */
function BrowserVideo({ m }: { m: Media }) {
  const ref = useRef<HTMLVideoElement>(null)
  useEffect(() => {
    const v = ref.current
    if (!v) return
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause()), {
      threshold: 0.4,
    })
    io.observe(v)
    return () => io.disconnect()
  }, [])
  return (
    <div className="overflow-hidden rounded-md border border-ink/10 bg-white shadow-[0_12px_28px_-18px_rgba(0,0,0,0.4)]">
      <div className="flex items-center gap-1 border-b border-ink/10 px-2 py-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-ink/15" />
        <span className="h-1.5 w-1.5 rounded-full bg-ink/15" />
        <span className="h-1.5 w-1.5 rounded-full bg-ink/15" />
      </div>
      <video
        ref={ref}
        src={`${DIR}/${m.video}`}
        poster={`${DIR}/${m.src}`}
        aria-label={m.alt}
        muted
        loop
        playsInline
        preload="none"
        className={`block w-full bg-ink/5 object-cover ${m.ratio ?? "aspect-[16/9]"}`}
      />
    </div>
  )
}

function Tile({ m, sizes }: { m: Media; sizes: string }) {
  if (m.video) return <BrowserVideo m={m} />
  return (
    <div
      className={`relative overflow-hidden rounded-md ${m.ratio ?? TILE} ${
        m.paper ? "border border-ink/10 bg-white shadow-[0_12px_28px_-18px_rgba(0,0,0,0.4)]" : "bg-ink/5"
      }`}
    >
      <Image
        src={`${DIR}/${m.src}`}
        alt={m.alt}
        fill
        sizes={sizes}
        style={m.pos ? { objectPosition: m.pos } : undefined}
        className={`${m.paper ? "object-contain" : "object-cover"} transition-transform duration-700 hover:scale-[1.03]`}
      />
    </div>
  )
}

function Gallery({ items, cols = 3 }: { items: Media[]; cols?: 2 | 3 }) {
  return (
    <div className={`mt-8 grid grid-cols-2 gap-3 ${cols === 3 ? "md:grid-cols-3" : ""}`}>
      {items.map((m) => (
        <div key={m.src} className={m.wide ? `col-span-2 ${cols === 3 ? "md:col-span-3" : ""}` : ""}>
          <Tile m={m} sizes={m.wide ? "(min-width: 1024px) 800px, 100vw" : `(min-width: 1024px) ${cols === 3 ? 270 : 400}px, 50vw`} />
        </div>
      ))}
    </div>
  )
}

export function AboutView() {
  const locale = useLocale()
  const t = COPY[locale]
  const [active, setActive] = useState<ChapterId>("birth")
  const refs = useRef<Partial<Record<ChapterId, HTMLElement | null>>>({})

  // The chapter crossing the upper third of the screen drives the sticky face and year.
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id as ChapterId)
      },
      { rootMargin: "-30% 0px -65% 0px" },
    )
    for (const el of Object.values(refs.current)) if (el) io.observe(el)
    return () => io.disconnect()
  }, [])

  const activeFace = CHAPTER_FACE[active]
  const activeIndex = CHAPTER_IDS.indexOf(active)

  return (
    <div className="bg-paper">
      <Header />
      <main className="font-body text-ink">
        {/* 1. Hero: headline and the faces through the years */}
        <section className="px-6 pb-16 pt-12 md:pb-24 md:pt-20">
          <div className="mx-auto flex max-w-5xl flex-col items-center gap-8 text-center">
            <Eyebrow>{t.eyebrow}</Eyebrow>
            <h1 className="max-w-4xl text-[clamp(2.5rem,1.5rem+5vw,5.5rem)] font-display font-black leading-[0.95] tracking-tighter">
              {t.title}
            </h1>
            <p className="max-w-xl text-lg text-ink/70">{t.intro}</p>

            <figure className="mt-6 w-full">
              <FaceStrip priority />
            </figure>
          </div>
        </section>

        {/* 2. Numbers */}
        <section className="border-y border-ink/10 bg-white px-6 py-12">
          <dl className="mx-auto grid max-w-5xl grid-cols-2 gap-x-6 gap-y-8 text-center sm:grid-cols-3 lg:grid-cols-5">
            {t.stats.map((s) => (
              <div key={s.label} className="flex flex-col items-center gap-1">
                <dt className="order-2 text-sm leading-snug text-ink/60">{s.label}</dt>
                <dd className="order-1 font-display text-4xl font-black tracking-tighter text-accent">{s.n}</dd>
              </div>
            ))}
          </dl>
          <p className="mx-auto mt-10 max-w-2xl text-center text-lg font-medium text-ink">{t.statsNote}</p>
        </section>

        {/* 3. Timeline: sticky face on the left follows the chapter being read */}
        <section className="px-6 py-20 md:py-28">
          <p className="mb-14 text-center text-xs font-semibold uppercase tracking-[0.2em] text-ink/40">
            {t.scrollHint} ↓
          </p>
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[260px_1fr] lg:gap-20">
            <aside className="hidden lg:block" aria-hidden="true">
              <div className="sticky top-32 flex flex-col items-center gap-5">
                <div className="relative h-52 w-52 rounded-full border-4 border-white shadow-[0_20px_40px_-20px_rgba(0,0,0,0.5)]">
                  {FACES.map((f) => (
                    <FaceImg
                      key={f}
                      face={f}
                      size={208}
                      className={`absolute inset-0 transition-opacity duration-700 ${f === activeFace ? "opacity-100" : "opacity-0"}`}
                    />
                  ))}
                </div>
                <p key={active} className="animate-[fade-up_0.4s_ease-out] font-display text-4xl font-black tracking-tighter">
                  {t.chapters[active].years}
                </p>
                <div className="h-1 w-40 overflow-hidden rounded-full bg-ink/10">
                  <div
                    className="h-full rounded-full bg-accent transition-[width] duration-500"
                    style={{ width: `${((activeIndex + 1) / CHAPTER_IDS.length) * 100}%` }}
                  />
                </div>
              </div>
            </aside>

            <ol className="relative flex flex-col border-l-2 border-ink/10 lg:border-l-0">
              {CHAPTER_IDS.map((id) => {
                const c = t.chapters[id]
                return (
                  <li
                    key={id}
                    id={id}
                    ref={(el) => {
                      refs.current[id] = el
                    }}
                    className="relative scroll-mt-24 pb-24 pl-8 last:pb-0 md:pb-32 lg:pl-0"
                  >
                    <span
                      aria-hidden="true"
                      className="absolute -left-[7px] top-2 h-3 w-3 rounded-full bg-accent ring-4 ring-paper lg:hidden"
                    />
                    <div className="mb-4 flex items-center gap-4">
                      <div className="h-14 w-14 shrink-0 lg:hidden">
                        <FaceImg face={CHAPTER_FACE[id]} size={56} />
                      </div>
                      <p className="font-display text-2xl font-black tracking-tighter text-accent">{c.years}</p>
                    </div>
                    <h2 className={H2}>{c.title}</h2>
                    {c.body.length > 0 && (
                      <div className="mt-6 flex max-w-2xl flex-col gap-4 text-lg leading-relaxed text-ink/75">
                      {c.body.map((p) => (
                        <p key={p}>{p}</p>
                      ))}
                    </div>
                    )}

                    {id === "corporate" && (
                      <ul className="mt-6 flex flex-wrap gap-2">
                        {t.corporateClients.map((n) => (
                          <li key={n} className="rounded-md border border-ink/15 bg-white px-3 py-1.5 text-sm font-semibold">
                            {n}
                          </li>
                        ))}
                      </ul>
                    )}

                    {MEDIA[id] && <Gallery items={MEDIA[id]} cols={id === "corporate" ? 2 : 3} />}
                    {id === "flash" && <p className="mt-3 text-sm font-semibold text-ink/60">{t.flashCaption}</p>}

                    {id === "beyond" && (
                      <>
                        <div className="mt-10 grid gap-10 md:grid-cols-3 md:gap-6">
                          {t.beyond.map((b, i) => (
                            <div key={b.title} className="flex flex-col gap-4">
                              <div className="grid grid-cols-2 gap-2">
                                {BEYOND_MEDIA[i].map((m) => (
                                  <Tile key={m.src} m={m} sizes="(min-width: 1024px) 130px, 50vw" />
                                ))}
                              </div>
                              <h3 className="font-display text-xl font-extrabold">{b.title}</h3>
                              <p className="text-ink/70">{b.body}</p>
                            </div>
                          ))}
                        </div>
                        <figure className="mt-14 rounded-[14px] bg-white px-6 py-10 text-center">
                          <p lang="zh-Hant" className="text-3xl tracking-[0.3em] text-ink md:text-4xl">
                            千里之行，始於足下
                          </p>
                          <blockquote className="mt-4 text-lg text-ink/70">{t.taoQuote}</blockquote>
                          <figcaption className="mt-2 text-sm text-ink/50">{t.taoSource}</figcaption>
                        </figure>
                      </>
                    )}

                    {id === "now" && <Gallery items={NOW_MEDIA} />}
                  </li>
                )
              })}
            </ol>
          </div>
        </section>

        {/* 4. Why it matters */}
        <section className="bg-white px-6 py-24 md:py-32">
          <div className="mx-auto flex max-w-5xl flex-col items-center gap-12 text-center">
            <h2 className={H2}>{t.whyTitle}</h2>
            <div className="grid w-full gap-10 text-left md:grid-cols-3 md:gap-8">
              {t.why.map((w, i) => (
                <div key={w.title} className="flex gap-5">
                  <span className="w-8 shrink-0 font-display text-2xl font-black text-accent">{i + 1}</span>
                  <div>
                    <h3 className="mb-1 font-display text-lg font-extrabold">{w.title}</h3>
                    <p className="text-ink/70">{w.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. CTA */}
        <section className="bg-accent px-6 py-24 text-paper md:py-32">
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
            <div className="h-24 w-24 rounded-full border-4 border-paper/80">
              <FaceImg face="2026" size={96} />
            </div>
            <h2 className={H2}>{t.finalTitle}</h2>
            <Link
              href="/#contact"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-[#FFD75E] px-7 py-3 text-sm font-semibold tracking-wide text-ink shadow-[0_0_18px_rgba(255,197,61,0.55)] transition-opacity hover:opacity-90"
            >
              {t.cta} <span aria-hidden="true">→</span>
            </Link>
            <Link href="/pricing" className="text-sm text-paper/80 underline underline-offset-4 hover:text-paper">
              {t.finalAlt}
            </Link>
          </div>
        </section>
      </main>
      <Footer hideAssistant />
    </div>
  )
}
