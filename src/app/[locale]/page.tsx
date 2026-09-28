"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link, { useLocale } from "@/lib/i18n-client"
import { localePath } from "@/lib/i18n"
import { useContactForm, Honeypot } from "@/lib/use-contact-form"
import { Header } from "./sections/header"
import { Footer } from "./sections/footer"
import { COPY } from "./copy"

function useCopy() {
  return COPY[useLocale()]
}

function Eyebrow({
  children,
  tone = "accent",
}: {
  children: React.ReactNode
  tone?: "accent" | "paper" | "gold"
}) {
  return (
    <p
      className={`flex items-center justify-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase ${
        tone === "paper" ? "text-paper" : tone === "gold" ? "text-[#FFD75E]" : "text-accent"
      }`}
    >
      <span aria-hidden="true">✛</span>
      {children}
      <span aria-hidden="true">✛</span>
    </p>
  )
}

function Sparkle({
  className = "",
  style,
}: {
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={`pointer-events-none absolute text-[#FFC53D] opacity-0 ${className}`}
      style={style}
    >
      <path
        d="M12 0C12 6.627 17.373 12 24 12C17.373 12 12 17.373 12 24C12 17.373 6.627 12 0 12C6.627 12 12 6.627 12 0Z"
        fill="currentColor"
      />
    </svg>
  )
}

const SPARKLES = [
  { top: "-14%", left: "-14%", size: "h-3 w-3", delay: 0.55 },
  { top: "-28%", left: "48%", size: "h-2.5 w-2.5", delay: 0.7 },
  { top: "6%", right: "-16%", size: "h-3.5 w-3.5", delay: 0.85 },
  { bottom: "-18%", left: "12%", size: "h-2 w-2", delay: 1 },
  { bottom: "-22%", right: "2%", size: "h-2.5 w-2.5", delay: 0.65 },
]

// One-shot 4s show, starting 1s after the page loads: every icon takes a
// turn (shuffled, evenly spaced across the 4s), then everything settles back
// to rest. Transform + opacity only, so it runs on the compositor thread and
// stays framerate-independent (same fix QVIKS needed for its popcorn rain).
const ICONS = ["🏆", "💰", "🥇", "💸", "🎉", "⭐", "✨", "💵"]
const SIZES = ["text-2xl", "text-3xl", "text-4xl"]
const SHOW_MS = 4000

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min)
}

function shuffled<T>(arr: T[]): T[] {
  const copy = [...arr]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

type Particle = { id: number; icon: string; dx: number; dy: number; rot: number; size: string }

function SparklingGood({ word }: { word: string }) {
  const [popped, setPopped] = useState(false)
  const [showSparkles, setShowSparkles] = useState(false)
  const [particles, setParticles] = useState<Particle[]>([])
  const nextId = useRef(0)
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(() => {
    const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false
    if (reducedMotion) return

    const spawn = (icon: string) => {
      const id = nextId.current++
      const angle = Math.random() * Math.PI * 2
      const dist = randomBetween(45, 78)
      const particle: Particle = {
        id,
        icon,
        dx: Math.cos(angle) * dist,
        dy: Math.sin(angle) * dist,
        rot: randomBetween(-30, 30),
        size: SIZES[Math.floor(Math.random() * SIZES.length)],
      }
      setParticles((prev) => [...prev, particle])
      timers.current.push(setTimeout(() => setParticles((prev) => prev.filter((p) => p.id !== id)), 950))
    }

    timers.current.push(
      setTimeout(() => {
        setPopped(true)
        setShowSparkles(true)
        timers.current.push(setTimeout(() => setShowSparkles(false), SHOW_MS))

        const order = shuffled(ICONS)
        const interval = SHOW_MS / order.length
        order.forEach((icon, i) => timers.current.push(setTimeout(() => spawn(icon), i * interval)))
      }, 1000),
    )

    return () => timers.current.forEach(clearTimeout)
  }, [])

  return (
    <span
      className="relative inline-block"
      style={
        popped
          ? { animation: `word-pop 700ms ease-out, word-glow-pulse ${SHOW_MS - 700}ms ease-in-out 700ms forwards` }
          : undefined
      }
    >
      {word}
      {particles.map((p) => (
        <span
          key={p.id}
          aria-hidden="true"
          className={`pointer-events-none absolute left-1/2 top-1/2 select-none opacity-0 ${p.size}`}
          style={
            {
              textShadow: "0 3px 5px rgba(0,0,0,0.3)",
              "--dx": `${p.dx}px`,
              "--dy": `${p.dy}px`,
              "--rot": `${p.rot}deg`,
              animation: "particle-burst 900ms cubic-bezier(0.22, 0.61, 0.36, 1) forwards",
            } as React.CSSProperties
          }
        >
          {p.icon}
        </span>
      ))}
      {showSparkles &&
        SPARKLES.map((s, i) => (
          <Sparkle
            key={i}
            className={s.size}
            style={{
              top: s.top,
              left: s.left,
              right: s.right,
              bottom: s.bottom,
              animation: `sparkle-pop 0.4s ease-out ${s.delay}s forwards, sparkle-twinkle 1.8s ease-in-out ${
                s.delay + 0.4
              }s infinite`,
            }}
          />
        ))}
    </span>
  )
}

function CTAButton({
  variant = "solid",
  className = "",
}: {
  variant?: "solid" | "invert"
  className?: string
}) {
  const t = useCopy()
  const styles =
    variant === "invert"
      ? "bg-ink text-paper"
      : "bg-accent text-paper"
  return (
    <Link
      href="#contact"
      className={`inline-flex items-center justify-center gap-2 rounded-md px-7 py-3 text-sm font-semibold tracking-wide transition-opacity hover:opacity-90 ${styles} ${className}`}
    >
      {t.cta} <span aria-hidden="true">→</span>
    </Link>
  )
}

function GoldText({
  children,
  as = "p",
  size = "text-2xl",
}: {
  children: React.ReactNode
  as?: "p" | "span"
  size?: string
}) {
  const ref = useRef<HTMLElement>(null)
  const [shine, setShine] = useState(false)

  useEffect(() => {
    const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false
    if (reducedMotion) return
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShine(true)
          observer.disconnect()
        }
      },
      { threshold: 0.6 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const className = `text-gold font-display ${size} font-black leading-tight tracking-tight ${
    shine ? "text-gold-shine" : ""
  }`

  const Tag = as
  return (
    <Tag ref={ref as React.RefObject<HTMLParagraphElement & HTMLSpanElement>} className={className}>
      {children}
    </Tag>
  )
}

function QviksInfo({
  label = "QVIKS",
  triggerClassName = "font-semibold underline underline-offset-4 hover:text-orange-500",
}: {
  label?: string
  triggerClassName?: string
}) {
  const t = useCopy()
  const [open, setOpen] = useState(false)

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={triggerClassName}>
        {label}
      </button>
      {open && (
        <span
          role="dialog"
          aria-modal="true"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 flex items-center justify-center bg-ink/10 px-6 backdrop-blur-sm"
        >
          <span
            onClick={(e) => e.stopPropagation()}
            className="relative block w-full max-w-sm animate-[pop-in_0.2s_ease-out] border border-ink/10 bg-paper p-7 text-center shadow-xl"
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={t.close}
              className="absolute right-2 top-2 text-2xl leading-none text-ink/40 hover:text-ink"
            >
              ×
            </button>
            <span className="block font-display text-lg font-black leading-tight text-ink">
              QVIKS
            </span>
            <span className="mt-2 block text-sm text-ink/70">
              {t.qviksAbout}
            </span>
            <a
              href="https://qviks.com"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="mt-4 inline-flex items-center justify-center gap-2 rounded-md bg-accent px-6 py-2.5 text-sm font-semibold text-paper transition-opacity hover:opacity-90"
            >
              {t.visitQviks} <span aria-hidden="true">→</span>
            </a>
          </span>
        </span>
      )}
    </>
  )
}

function Step({
  n,
  title,
  children,
}: {
  n: string
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="flex gap-5">
      <span className="w-8 shrink-0 font-display text-2xl font-black text-accent">
        {n}
      </span>
      <div className="text-left">
        <h3 className="mb-1 font-display text-lg font-extrabold">{title}</h3>
        <p className="text-ink/70">{children}</p>
      </div>
    </div>
  )
}

const WORK = [
  {
    href: "https://joymeseci.com",
    image: "/work/joymeseci.jpg",
    domain: "joymeseci.com",
  },
  {
    href: "https://joymeseci.com/return-to-roots",
    image: "/work/return-to-roots.jpg",
    domain: "joymeseci.com/return-to-roots",
  },
  {
    href: "https://www.qviks.com/smart-web",
    image: "/work/smart-web.jpg",
    domain: "qviks.com/smart-web",
  },
  {
    href: "https://www.qviks.com",
    image: "/work/qviks.jpg",
    domain: "qviks.com",
  },
  {
    href: "/games/pexeso",
    image: "/work/pexeso.jpg",
    domain: "mikistec.com/games/pexeso",
  },
]

// Joy's own words (quote and role live in ./copy). Never invent a client quote.
const TESTIMONIAL_NAME = "Joy Sevinç Meşeci"

function WorkCard({
  href,
  image,
  domain,
  title,
  note,
}: (typeof WORK)[number] & { title: string; note: string }) {
  const locale = useLocale()
  return (
    <a
      href={localePath(locale, href)}
      {...(href.startsWith("http") && { target: "_blank", rel: "noopener noreferrer" })}
      className="group flex flex-col gap-3 text-left"
    >
      <div className="overflow-hidden rounded-md border border-ink/10 bg-white shadow-[0_12px_28px_-18px_rgba(0,0,0,0.4)] transition-transform duration-300 group-hover:-translate-y-1">
        <div className="flex items-center gap-1 border-b border-ink/10 px-2 py-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-ink/15" />
          <span className="h-1.5 w-1.5 rounded-full bg-ink/15" />
          <span className="h-1.5 w-1.5 rounded-full bg-ink/15" />
        </div>
        <Image
          src={image}
          alt={`${title}: ${domain}`}
          width={1440}
          height={900}
          sizes="(min-width: 1024px) 200px, (min-width: 768px) 300px, 50vw"
          className="h-auto w-full"
        />
      </div>
      <div>
        <h3 className="font-display text-base font-extrabold leading-tight">
          {title}{" "}
          <span aria-hidden="true" className="text-accent transition-transform group-hover:translate-x-0.5">
            ↗
          </span>
        </h3>
        <p className="mt-1 text-sm text-ink/60">{note}</p>
      </div>
    </a>
  )
}

function RecentWork() {
  const t = useCopy()
  const TESTIMONIAL = { quote: t.testimonialQuote, name: TESTIMONIAL_NAME, role: t.testimonialRole }
  return (
    <section id="work" className="bg-paper px-6 pb-24 text-ink md:pb-32">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-10 text-center">
        <div className="flex max-w-2xl flex-col items-center gap-6">
          <Eyebrow>{t.workEyebrow}</Eyebrow>
          <h2 className="text-[clamp(2rem,1.5rem+2.8vw,3.5rem)] font-display font-black leading-[0.98] tracking-tighter">
            {t.workTitle}
          </h2>
        </div>
        <div className="grid w-full grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 md:gap-6 lg:grid-cols-5">
          {WORK.map((w, i) => (
            <WorkCard key={w.href} {...w} {...t.work[i]} />
          ))}
        </div>
        <figure className="mt-2 flex max-w-xl flex-col items-center gap-3">
          <span aria-hidden="true" className="font-display text-4xl font-black leading-none text-accent">
            &ldquo;
          </span>
          <blockquote
            className={`text-lg font-medium leading-snug ${
              TESTIMONIAL.quote ? "text-ink" : "italic text-ink/35"
            }`}
          >
            {TESTIMONIAL.quote ?? "Joy's words go here, two or three sentences in her own voice."}
          </blockquote>
          <figcaption className="text-sm">
            <span className="font-semibold text-ink">{TESTIMONIAL.name}</span>
            <span className="text-ink/50"> · {TESTIMONIAL.role}</span>
          </figcaption>
        </figure>
      </div>
    </section>
  )
}

const PATHS = ["build", "learn", "unsure"] as const

function ContactForm() {
  const t = useCopy()
  // The coaching page links here with ?path=learn (or ?path=build), so "Coach me" comes preselected.
  const [path, setPath] = useState("build")
  useEffect(() => {
    const wanted = new URLSearchParams(window.location.search).get("path")
    if (wanted && PATHS.some((p) => p === wanted)) setPath(wanted)
  }, [])
  const state = useContactForm("landing")

  if (state.succeeded) {
    return (
      <div className="flex flex-col items-center gap-5 text-center">
        <span className="text-6xl" aria-hidden="true">
          🎉
        </span>
        <p className="text-lg text-ink">
          {t.success}
        </p>
        <Link
          href="/games/pexeso"
          className="inline-flex items-center justify-center gap-2 rounded-md bg-accent px-7 py-3 text-sm font-semibold tracking-wide text-paper transition-opacity hover:opacity-90"
        >
          {t.play} <span aria-hidden="true">→</span>
        </Link>
      </div>
    )
  }

  return (
    <>
      <div className="mb-8 flex flex-col items-center gap-8">
        <Eyebrow>{t.contactEyebrow}</Eyebrow>
        <h2 className="text-center text-[clamp(2rem,1.5rem+2.8vw,3.5rem)] font-display font-black leading-[0.98] tracking-tighter">
          {t.contactTitle}
        </h2>
      </div>
      <form onSubmit={state.handleSubmit} className="flex w-full flex-col gap-5 text-left">
      <Honeypot />
      <fieldset>
        <legend className="mb-2 block text-xs uppercase tracking-wide text-ink/50">{t.wantLegend}</legend>
        <div className="flex flex-wrap gap-2">
          {PATHS.map((p) => (
            <label key={p} className="cursor-pointer">
              <input
                type="radio"
                name="path"
                value={p}
                checked={path === p}
                onChange={() => setPath(p)}
                className="peer sr-only"
              />
              <span className="inline-block rounded-md border border-ink/20 px-4 py-2 text-sm font-semibold text-ink/70 transition-colors hover:border-ink/40 peer-checked:border-accent peer-checked:bg-accent peer-checked:text-paper peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent">
                {t.paths[p]}
              </span>
            </label>
          ))}
        </div>
      </fieldset>
      <div>
        <label htmlFor="name" className="mb-1 block text-xs uppercase tracking-wide text-ink/50">
          {t.nameLabel}
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="w-full border-b border-ink/25 bg-transparent py-2 text-ink placeholder:text-ink/30 focus:border-accent focus:outline-none"
          placeholder={t.namePlaceholder}
        />
      </div>
      <div>
        <label htmlFor="email" className="mb-1 block text-xs uppercase tracking-wide text-ink/50">
          {t.emailLabel}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full border-b border-ink/25 bg-transparent py-2 text-ink placeholder:text-ink/30 focus:border-accent focus:outline-none"
          placeholder={t.emailPlaceholder}
        />
      </div>
      <div>
        <label htmlFor="business" className="mb-1 block text-xs uppercase tracking-wide text-ink/50">
          {t.businessLabel}
        </label>
        <input
          id="business"
          name="message"
          type="text"
          required
          className="w-full border-b border-ink/25 bg-transparent py-2 text-ink placeholder:text-ink/30 focus:border-accent focus:outline-none"
          placeholder={t.businessPlaceholder}
        />
      </div>
      <button
        type="submit"
        disabled={state.submitting}
        className="mt-3 inline-flex items-center justify-center gap-2 self-start rounded-md bg-accent px-7 py-3 text-sm font-semibold tracking-wide text-paper transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {t.cta} <span aria-hidden="true">→</span>
      </button>
      {state.error && <p role="alert" className="text-sm text-accent">{state.error}</p>}
      </form>
    </>
  )
}

export default function Page() {
  const t = useCopy()
  return (
    <>
      <Header />
      <main className="font-body">
      {/* 1. Hero */}
      <section className="bg-paper px-6 py-24 text-ink md:py-32">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-8 text-center">
          <Eyebrow>{t.heroEyebrow}</Eyebrow>
          <h1 className="text-[clamp(2.5rem,1.5rem+5vw,5rem)] font-display font-black leading-[0.98] tracking-tighter">
            {t.heroBefore}
            <SparklingGood word={t.heroWord} />
            {t.heroAfter}
          </h1>
          <p className="max-w-md text-lg text-ink/70">
            {t.heroSub}{" "}
            <Link href="#contact" className="font-semibold text-accent hover:opacity-80">
              {t.heroYes}
            </Link>
            .
          </p>
          <div className="relative mt-2">
            <span className="pointer-events-none absolute -left-2 -top-2 text-accent" aria-hidden="true">✛</span>
            <span className="pointer-events-none absolute -right-2 -top-2 text-accent" aria-hidden="true">✛</span>
            <span className="pointer-events-none absolute -bottom-2 -left-2 text-accent" aria-hidden="true">✛</span>
            <span className="pointer-events-none absolute -bottom-2 -right-2 text-accent" aria-hidden="true">✛</span>
            <Image
              src="/miki-portrait.jpg"
              alt="Miki Stec"
              width={320}
              height={320}
              priority
              className="h-auto w-44 object-cover md:w-52"
            />
          </div>
          <CTAButton />
        </div>
      </section>

      {/* 1b. Learn teaser: one quiet line, no card, same centred type as the rest */}
      <section className="bg-paper px-6 pb-24 text-ink md:pb-32">
        <p className="mx-auto max-w-2xl border-t border-ink/10 pt-10 text-center text-lg text-ink/70">
          <span className="font-display font-extrabold text-ink">{t.learnQuestion}</span>{" "}
          <Link
            href="/coaching"
            className="font-semibold text-accent underline-offset-4 hover:underline"
          >
            {t.learnLink} <span aria-hidden="true">→</span>
          </Link>
        </p>
      </section>

      {/* 2. Proof */}
      <section className="bg-ink px-6 py-24 text-paper md:py-32">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
          <Eyebrow>{t.whyEyebrow}</Eyebrow>
          <h2 className="text-[clamp(2rem,1.5rem+2.8vw,3.5rem)] font-display font-black leading-[0.98] tracking-tighter">
            {t.whyTitle}
          </h2>
          <p className="text-lg text-paper/75">
            {t.years}{" "}
            <GoldText as="span" size="text-lg">{t.yearsGold}</GoldText>
          </p>
          <p className="text-lg text-paper/75">
            {t.frameworksBefore}{" "}
            <a
              href="https://storybrand.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 hover:text-orange-500"
            >
              StoryBrand
            </a>
            {t.frameworksAfter}
            <br />
            {t.clear}
          </p>
          <p className="text-lg text-paper/75">
            {t.founder}{" "}
            <QviksInfo
              label="Qviks"
              triggerClassName="underline underline-offset-4 hover:text-orange-500"
            />
            .
          </p>
          <p className="text-lg text-paper/75">
            {t.aiDaily}
          </p>
        </div>
      </section>

      {/* 3. Why not Wix / AI */}
      <section className="bg-accent px-6 py-24 text-paper md:py-32">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
          <GoldText>{t.simplicity}</GoldText>
          <p className="text-lg text-paper/85">
            {t.extras}
            <br />
            {t.extrasMore}
          </p>
          <p className="text-lg text-paper/85">
            {t.nothingToLearn}{" "}
            <Link href="/coaching" className="text-paper underline underline-offset-4 hover:opacity-80">
              {t.unlessYouWant} <span aria-hidden="true">→</span>
            </Link>
          </p>
        </div>
      </section>

      {/* 4. How it works (the assistant's phone launcher appears from here, see assistant.tsx) */}
      <section id="how" className="bg-paper px-6 py-24 text-ink md:py-32">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-10 text-center">
          <Eyebrow>{t.howEyebrow}</Eyebrow>
          <h2 className="text-[clamp(2rem,1.5rem+2.8vw,3.5rem)] font-display font-black leading-[0.98] tracking-tighter">
            {t.howTitle}
          </h2>
          <div className="flex w-full flex-col gap-8">
            <Step n="1" title={t.step1Title}>
              {t.step1}
            </Step>
            <Step n="2" title={t.step2Title}>
              {t.step2}
            </Step>
            <Step n="3" title={t.step3Title}>
              {t.step3}{" "}
              <QviksInfo triggerClassName="font-semibold underline underline-offset-4 hover:text-orange-500" />.
            </Step>
          </div>
        </div>
      </section>

      {/* 4a. Recent work + testimonial */}
      <RecentWork />

      {/* 5. Offer
      <section className="bg-accent px-6 py-24 text-paper md:py-32">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
          <Eyebrow tone="paper">The offer</Eyebrow>
          <h2 className="text-[clamp(2rem,1.5rem+2.8vw,3.5rem)] font-display font-black leading-[0.98] tracking-tighter">
            One page. One price. €990.
          </h2>
          <p className="max-w-md text-lg text-paper/85">
            One page, up to six sections, a research-driven first draft, one revision round,
            copywriting included, launch. No tiers. No &ldquo;starting at.&rdquo; No hidden add-ons.
          </p>
          <CTAButton variant="invert" />
        </div>
      </section>
      */}

      {/* 4b. Upgrades (Smart website, Express): the idea only, the price lives on /pricing */}
      <section className="bg-paper px-6 pb-24 text-ink md:pb-32">
        <a
          href="https://www.qviks.com/smart-web"
          target="_blank"
          rel="noopener noreferrer"
          className="group mx-auto flex max-w-2xl flex-col items-center gap-4 rounded-[14px] border-2 border-dashed border-accent px-6 py-10 text-center transition-colors hover:bg-accent/5 md:px-12"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">{t.smartEyebrow}</p>
          <h2 className="font-display text-[clamp(1.75rem,1.4rem+1.6vw,2.5rem)] font-black leading-[1.05] tracking-tighter">
            {t.smartTitle}
          </h2>
          <p className="text-ink/80">{t.smartFeatures}</p>
          <p className="max-w-md text-lg text-ink/70">
            {t.smartBody}
          </p>
          <span className="text-sm font-semibold text-accent group-hover:underline underline-offset-4">
            {t.smartDemo} <span aria-hidden="true">↗</span>
          </span>
        </a>
        {/* Express: same card, no price here either */}
        {t.express && (
        <Link
          href="/#contact"
          className="group mx-auto mt-6 flex max-w-2xl flex-col items-center gap-4 rounded-[14px] border-2 border-dashed border-accent px-6 py-10 text-center transition-colors hover:bg-accent/5 md:px-12"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">{t.express.eyebrow}</p>
          <h2 className="font-display text-[clamp(1.75rem,1.4rem+1.6vw,2.5rem)] font-black leading-[1.05] tracking-tighter">
            {t.express.title}
          </h2>
          <p className="text-ink/80">{t.express.features}</p>
          <p className="max-w-md text-lg text-ink/70">
            {t.express.body}
          </p>
          <span className="text-sm font-semibold text-accent group-hover:underline underline-offset-4">
            {t.express.cta} <span aria-hidden="true">→</span>
          </span>
        </Link>
        )}
      </section>

      {/* 5. Support */}
      <section className="bg-ink px-6 py-24 text-paper md:py-32">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
          <Eyebrow tone="gold">{t.supportEyebrow}</Eyebrow>
          <h2 className="text-[clamp(2rem,1.5rem+2.8vw,3.5rem)] font-display font-black leading-[0.98] tracking-tighter">
            {t.supportTitle}
          </h2>
          <p className="text-lg text-paper/75">
            {t.supportBefore}
            <GoldText as="span" size="text-lg">{t.supportGold}</GoldText>
            {t.supportAfter}
          </p>
        </div>
      </section>

      {/* 6. Contact */}
      <section id="contact" className="bg-paper px-6 py-24 text-ink md:py-32">
        <div className="mx-auto flex max-w-md flex-col items-center gap-8 text-center">
          <ContactForm />
        </div>
      </section>
      </main>
      <Footer />
    </>
  )
}
