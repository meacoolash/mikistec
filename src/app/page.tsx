"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useForm, ValidationError } from "@formspree/react"
import { Header } from "./sections/header"
import { Footer } from "./sections/footer"

const CTA_LABEL = "YES"

function Eyebrow({
  children,
  tone = "accent",
}: {
  children: React.ReactNode
  tone?: "accent" | "paper"
}) {
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

function SparklingGood() {
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
      good
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
  const styles =
    variant === "invert"
      ? "bg-ink text-paper"
      : "bg-accent text-paper"
  return (
    <Link
      href="#contact"
      className={`inline-flex items-center justify-center gap-2 rounded-md px-7 py-3 text-sm font-semibold tracking-wide transition-opacity hover:opacity-90 ${styles} ${className}`}
    >
      {CTA_LABEL} <span aria-hidden="true">→</span>
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

function ContactForm() {
  const [state, handleSubmit] = useForm("xldgqdnz")

  if (state.succeeded) {
    return (
      <p className="text-lg text-ink">
        Got it. I&apos;ll get back to you within a day or two.
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-5 text-left">
      <div>
        <label htmlFor="name" className="mb-1 block text-xs uppercase tracking-wide text-ink/50">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="w-full border-b border-ink/25 bg-transparent py-2 text-ink placeholder:text-ink/30 focus:border-accent focus:outline-none"
          placeholder="Your name"
        />
      </div>
      <div>
        <label htmlFor="email" className="mb-1 block text-xs uppercase tracking-wide text-ink/50">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full border-b border-ink/25 bg-transparent py-2 text-ink placeholder:text-ink/30 focus:border-accent focus:outline-none"
          placeholder="you@yourbusiness.com"
        />
        <ValidationError prefix="Email" field="email" errors={state.errors} className="mt-1 text-xs text-accent" />
      </div>
      <div>
        <label htmlFor="business" className="mb-1 block text-xs uppercase tracking-wide text-ink/50">
          What&apos;s your business?
        </label>
        <input
          id="business"
          name="business"
          type="text"
          required
          className="w-full border-b border-ink/25 bg-transparent py-2 text-ink placeholder:text-ink/30 focus:border-accent focus:outline-none"
          placeholder="e.g. a bakery, a design studio, a personal brand"
        />
      </div>
      <button
        type="submit"
        disabled={state.submitting}
        className="mt-3 inline-flex items-center justify-center gap-2 self-start rounded-md bg-accent px-7 py-3 text-sm font-semibold tracking-wide text-paper transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {CTA_LABEL} <span aria-hidden="true">→</span>
      </button>
    </form>
  )
}

export default function Page() {
  return (
    <>
      <Header />
      <main className="font-body">
      {/* 1. Hero */}
      <section className="bg-paper px-6 py-24 text-ink md:py-32">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-8 text-center">
          <Eyebrow>Websites that sell</Eyebrow>
          <h1 className="text-[clamp(2.5rem,1.5rem+5vw,5rem)] font-display font-black leading-[0.98] tracking-tighter">
            You&apos;re <SparklingGood />. Your website should be too.
          </h1>
          <p className="max-w-md text-lg text-ink/70">
            I research your business, write it, build it, and launch it. You just say{" "}
            <Link href="#contact" className="font-semibold text-accent hover:opacity-80">
              yes
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
              height={456}
              priority
              className="h-auto w-64 object-cover md:w-72"
            />
          </div>
          <CTAButton />
        </div>
      </section>

      {/* 2. Proof */}
      <section className="bg-ink px-6 py-24 text-paper md:py-32">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
          <Eyebrow>Why me</Eyebrow>
          <h2 className="text-[clamp(2rem,1.5rem+2.8vw,3.5rem)] font-display font-black leading-[0.98] tracking-tighter">
            I build things that sell.
          </h2>
          <p className="text-lg text-paper/75">
            25+ years across software architecture, graphic design, photography, and{" "}
            <GoldText as="span" size="text-lg">marketing.</GoldText>
          </p>
          <p className="text-lg text-paper/75">
            I build around proven frameworks like Donald Miller&apos;s{" "}
            <a
              href="https://storybrand.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 hover:text-orange-500"
            >
              StoryBrand
            </a>
            .
            <br />
            Clear message, clear structure, clear action.
          </p>
        </div>
      </section>

      {/* 3. Why not Wix / AI */}
      <section className="bg-accent px-6 py-24 text-paper md:py-32">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
          <h2 className="text-[clamp(1.75rem,1.3rem+2vw,2.75rem)] font-display font-black leading-[1] tracking-tighter">
            Why not Wix?
          </h2>
          <p className="text-lg text-paper/85">
            Wix, Squarespace and AI are great tools.
            <br />
            If you want, you can use them.
          </p>
          <GoldText>I give you simplicity.</GoldText>
          <p className="text-lg text-paper/85">
            + Speed, SEO, OG images, favicons, analytics
            <br />
            and much more.
          </p>
        </div>
      </section>

      {/* 4. How it works */}
      <section className="bg-paper px-6 py-24 text-ink md:py-32">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-10 text-center">
          <Eyebrow>How it works</Eyebrow>
          <h2 className="text-[clamp(2rem,1.5rem+2.8vw,3.5rem)] font-display font-black leading-[0.98] tracking-tighter">
            Easy.
          </h2>
          <div className="flex w-full flex-col gap-8">
            <Step n="1" title="I research you first">
              Instagram, LinkedIn, Google, wherever your business already shows up. Then I build
              a real, working first draft from what I find. You don&apos;t need to send me
              anything. Optionally, you can.
            </Step>
            <Step n="2" title="Refine and go live">
              We adjust it together, then we go live. I take care of the domain too.
              Nothing to learn. Nothing for you to manage.
            </Step>
            <Step n="3" title="Grow with me">
              CRM, email marketing, payments, booking, automation, your website is ready to
              connect when you need it. Ready to work with the tools and platforms you use today,
              and whatever comes next.
            </Step>
          </div>
        </div>
      </section>

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

      {/* 6. Contact */}
      <section id="contact" className="bg-paper px-6 py-24 text-ink md:py-32">
        <div className="mx-auto flex max-w-md flex-col items-center gap-8 text-center">
          <Eyebrow>Let&apos;s talk</Eyebrow>
          <h2 className="text-[clamp(2rem,1.5rem+2.8vw,3.5rem)] font-display font-black leading-[0.98] tracking-tighter">
            Tell me about your business.
          </h2>
          <ContactForm />
        </div>
      </section>
      </main>
      <Footer />
    </>
  )
}
