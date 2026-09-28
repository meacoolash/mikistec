"use client"

import Image from "next/image"
import Link from "next/link"
import { useContactForm, Honeypot } from "@/lib/use-contact-form"
import { Eyebrow, GoldText, FadeIn, CTAButton, Nav, Footer } from "./_ui"

function Step({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-5">
      <span className="w-8 shrink-0 font-display text-2xl font-black text-accent">{n}</span>
      <div className="text-left">
        <h3 className="mb-1 font-display text-lg font-extrabold">{title}</h3>
        <p className="text-ink/70">{children}</p>
      </div>
    </div>
  )
}

function ApplyForm() {
  const state = useContactForm("return-to-roots")

  if (state.succeeded) {
    return (
      <div className="flex flex-col items-center gap-5 text-center">
        <span className="text-6xl" aria-hidden="true">
          🙏
        </span>
        <p className="text-lg text-ink">We&apos;ll be in touch within a day or two.</p>
      </div>
    )
  }

  return (
    <form onSubmit={state.handleSubmit} className="flex w-full flex-col gap-5 text-left">
      <Honeypot />
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
          placeholder="you@email.com"
        />
      </div>
      <button
        type="submit"
        disabled={state.submitting}
        className="mt-3 inline-flex items-center justify-center gap-2 self-start rounded-md bg-accent px-7 py-3 text-sm font-semibold tracking-wide text-paper transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        I&apos;m in <span aria-hidden="true">→</span>
      </button>
      {state.error && <p role="alert" className="text-sm text-accent">{state.error}</p>}
    </form>
  )
}

export default function ReturnToRoots2Page() {
  return (
    <>
      <Nav />
      <main className="font-body">
        {/* Hero */}
        <section className="relative flex h-[100svh] min-h-[560px] items-center justify-center overflow-hidden bg-ink text-paper">
          <div className="absolute inset-0">
            <Image
              src="/draft/return-to-roots-serif/hero-patan.jpg"
              alt="Kathmandu at golden hour, the Himalayas behind"
              fill
              priority
              className="animate-kenburns object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/40 to-ink" />
          </div>

          <div
            className="relative z-10 mx-auto flex max-w-2xl flex-col items-center gap-6 px-6 text-center opacity-0"
            style={{ animation: "fade-up 900ms 200ms ease-out forwards" }}
          >
            <Eyebrow>Kathmandu · Oct 15–19, 2026</Eyebrow>
            <h1 className="text-[clamp(3rem,2rem+6vw,6.5rem)] font-display font-black leading-[0.92] tracking-tighter">
              Come home to yourself.
            </h1>
            <p className="max-w-md text-lg text-paper/70">
              5 days of Ayurveda, somatic work and community — a{" "}
              <span className="font-semibold text-paper">Return to Roots</span>.
            </p>
            <CTAButton className="mt-2" />
          </div>

          <Link
            href="#problem"
            aria-label="Scroll down"
            className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-bounce text-paper/50 hover:text-paper"
          >
            ↓
          </Link>
        </section>

        {/* Problem */}
        <section id="problem" className="bg-ink px-6 py-24 text-paper md:py-32">
          <FadeIn className="mx-auto flex max-w-xl flex-col items-center gap-6 text-center">
            <Eyebrow>Sound familiar?</Eyebrow>
            <h2 className="text-[clamp(2rem,1.5rem+2.8vw,3.5rem)] font-display font-black leading-[0.98] tracking-tighter">
              Running on empty. Always on. Disconnected from your body.
            </h2>
            <GoldText size="text-2xl">There&apos;s a way back.</GoldText>
          </FadeIn>
        </section>

        {/* Guide */}
        <section className="bg-paper px-6 py-24 text-ink md:py-32">
          <FadeIn className="mx-auto flex max-w-xl flex-col items-center gap-6 text-center">
            <Eyebrow>Why this retreat</Eyebrow>
            <h2 className="text-[clamp(2rem,1.5rem+2.8vw,3.5rem)] font-display font-black leading-[0.98] tracking-tighter">
              Not another vacation.
              <br />
              Actual space to feel.
            </h2>
            <p className="flex flex-wrap justify-center gap-x-2 gap-y-2 text-sm text-ink/60">
              {["Ayurveda", "Somatic Work", "Small Group", "Kathmandu, Nepal"].map((tag) => (
                <span key={tag} className="rounded-full border border-ink/15 px-4 py-1.5">
                  {tag}
                </span>
              ))}
            </p>
          </FadeIn>
        </section>

        {/* Plan */}
        <section className="bg-paper px-6 pb-24 pt-4 text-ink md:pb-32">
          <FadeIn className="mx-auto flex max-w-2xl flex-col items-center gap-10 text-center">
            <Eyebrow>The plan</Eyebrow>
            <h2 className="text-[clamp(2rem,1.5rem+2.8vw,3.5rem)] font-display font-black leading-[0.98] tracking-tighter">
              Simple.
            </h2>
            <div className="flex w-full flex-col gap-8">
              <Step n="1" title="Arrive & ground">
                Settle in, welcome tea, opening circle.
              </Step>
              <Step n="2" title="Release & restore">
                Somatic work, Ayurveda, forest, culture.
              </Step>
              <Step n="3" title="Return home different">
                Closing circle, home practice, community.
              </Step>
            </div>
            <Link href="/draft/return-to-roots-serif/itinerary" className="text-sm font-semibold text-accent hover:opacity-80">
              Full day-by-day itinerary →
            </Link>
          </FadeIn>
        </section>

        {/* CTA band */}
        <section className="bg-accent px-6 py-24 text-paper md:py-32">
          <FadeIn className="mx-auto flex max-w-xl flex-col items-center gap-6 text-center">
            <GoldText>5 days. One return.</GoldText>
            <p className="text-lg text-paper/85">Small group. Limited spots.</p>
            <CTAButton variant="invert" />
          </FadeIn>
        </section>

        {/* Apply */}
        <section id="apply" className="bg-paper px-6 py-24 text-ink md:py-32">
          <FadeIn className="mx-auto flex max-w-md flex-col items-center gap-8 text-center">
            <Eyebrow>Reserve your spot</Eyebrow>
            <h2 className="text-[clamp(2rem,1.5rem+2.8vw,3.5rem)] font-display font-black leading-[0.98] tracking-tighter">
              I&apos;m in.
            </h2>
            <ApplyForm />
          </FadeIn>
        </section>
      </main>
      <Footer />
    </>
  )
}
