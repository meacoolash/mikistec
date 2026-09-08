"use client"

import Image from "next/image"
import Link from "next/link"
import { useForm, ValidationError } from "@formspree/react"
import { Footer } from "./sections/footer"

const CTA_LABEL = "Let's sell"

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
      className={`inline-flex items-center justify-center gap-2 px-7 py-3 text-sm font-semibold tracking-wide transition-opacity hover:opacity-90 ${styles} ${className}`}
    >
      {CTA_LABEL} <span aria-hidden="true">→</span>
    </Link>
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
          placeholder="e.g. career coaching for engineers"
        />
      </div>
      <button
        type="submit"
        disabled={state.submitting}
        className="mt-3 inline-flex items-center justify-center gap-2 self-start bg-accent px-7 py-3 text-sm font-semibold tracking-wide text-paper transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {CTA_LABEL} <span aria-hidden="true">→</span>
      </button>
    </form>
  )
}

export default function Page() {
  return (
    <main className="font-body">
      {/* 1. Hero */}
      <section className="bg-paper px-6 py-24 text-ink md:py-32">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-8 text-center">
          <Eyebrow>Websites that sell</Eyebrow>
          <h1 className="text-[clamp(2.5rem,1.5rem+5vw,5rem)] font-display font-black leading-[0.98] tracking-tighter">
            You&apos;re good. Your website should be too.
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
            <span className="font-display font-black text-orange-500">marketing.</span>
          </p>
          <p className="text-lg text-paper/75">
            I build around proven frameworks like Donald Miller&apos;s StoryBrand.
            <br />
            Clear message, clear structure, clear action.
          </p>
        </div>
      </section>

      {/* 3. Why not Wix / AI */}
      <section className="bg-accent px-6 py-24 text-paper md:py-32">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
          <Eyebrow tone="paper">Why not you</Eyebrow>
          <h2 className="text-[clamp(1.75rem,1.3rem+2vw,2.75rem)] font-display font-black leading-[1] tracking-tighter">
            Why not Wix?
          </h2>
          <p className="text-lg text-paper/85">
            Wix, Squarespace and AI are great tools.
            <br />
            If you want, you can.
            <br />
            I use AI too.
          </p>
          <p className="font-display text-2xl font-black leading-tight tracking-tight text-orange-500">
            I give you simplicity.
          </p>
          <p className="text-lg text-paper/85">Fast. SEO-ready. Built for you.</p>
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
              Instagram, press, link-in-bio, directory listings — wherever your business already
              shows up. You don&apos;t need to send me anything. Optionally, you can.
            </Step>
            <Step n="2" title="You get a draft">
              A real, working page, built from what I found.
            </Step>
            <Step n="3" title="Refine and go live.">
              We adjust it together, then go live. I take care of the domain too.
              Nothing to learn. Nothing for you to manage.
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

      <Footer />
    </main>
  )
}
