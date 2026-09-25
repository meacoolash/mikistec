import Image from "next/image"
import Link from "next/link"
import { Header } from "../_header"
import { Footer } from "../../sections/footer"

export const metadata = {
  title: "Learn AI with Miki Stec",
  description: "I coach you to build your own website and your own AI agents.",
  robots: { index: false, follow: false },
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

const POINTS = [
  "Your own website, built and live",
  "An agent that researches for you",
  "An agent that drafts your emails and posts",
]

const FAQ = [
  {
    q: "I can't code. Is this for me?",
    a: "Yes. That's exactly who it's for. You'll describe what you want in plain language; the agent writes the code. My job is to show you how to steer it and how to check its work.",
  },
  {
    q: "Can't I just learn this from YouTube?",
    a: "You can, and you've probably tried. Tutorials are generic and go stale in weeks. We work on your business, with the tools that work today.",
  },
  {
    q: "Which tools do we use?",
    a: "Whatever fits you. Mostly Claude and Claude Code, plus the tools you already use. I don't sell software, so I've no reason to push one.",
  },
  {
    q: "How much does it cost?",
    a: "We start with a free concept. Once we know we work well together, I'll make you an offer and we'll find a number that makes sense for your business.",
  },
]

const H2 = "text-[clamp(2rem,1.5rem+2.8vw,3.5rem)] font-display font-black leading-[0.98] tracking-tighter"

export default function LearnPage() {
  return (
    <>
      <Header />
      <main className="font-body">
        {/* 1. Hero: the FOMO painting melts into the accent blue */}
        <section className="bg-accent px-6 py-20 text-paper md:py-28">
          <div className="mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-[5fr_7fr] md:gap-14">
            <div className="mx-auto w-60 mix-blend-multiply md:w-full md:max-w-sm">
              <Image
                src="/draft/v2/fomo.jpg"
                alt="A figure crouched with head in hands, surrounded by other people's photos and a clock"
                width={800}
                height={1200}
                priority
                className="h-auto w-full brightness-[1.18] contrast-[1.12] saturate-[.6] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"
              />
            </div>
            <div className="flex flex-col items-center gap-6 text-center md:items-start md:text-left">
              <Eyebrow tone="paper">Learn AI</Eyebrow>
              <h1 className="text-[clamp(2.5rem,1.5rem+4vw,4.5rem)] font-display font-black leading-[0.98] tracking-tighter">
                Everyone around you is building with AI. Are you?
              </h1>
              <p className="max-w-md text-lg text-paper/85">
                I coach you to build your own website and your own AI agents. From FOMO to shipping.
              </p>
              <Link
                href="/v4-draft#contact"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-ink px-7 py-3 text-sm font-semibold tracking-wide text-paper transition-opacity hover:opacity-90"
              >
                Teach me <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </section>

        {/* 2. Problem */}
        <section className="bg-paper px-6 py-24 text-ink md:py-32">
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
            <Eyebrow>The problem</Eyebrow>
            <h2 className={H2}>
              The problem is not mastering AI. You need to know what&apos;s possible for you.
            </h2>
            <p className="text-lg text-ink/70">
              Your feed is full of people with agents that write, research, answer email and ship
              websites overnight. So you bookmark the threads, watch half a tutorial that assumes
              you code, and close the tab.
            </p>
            <p className="text-lg text-ink/70">
              The gap between you and them isn&apos;t talent. It&apos;s one afternoon of doing it
              next to someone who already does it every day.
            </p>
          </div>
        </section>

        {/* 3. What you get */}
        <section className="bg-ink px-6 py-24 text-paper md:py-32">
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-8 text-center">
            <Eyebrow>With me next to you</Eyebrow>
            <h2 className={H2}>Build it yourself.</h2>
            <p className="text-lg text-paper/75">
              One-on-one sessions, on your laptop, on your business. You leave owning it and
              knowing how it works.
            </p>
            <ul className="flex w-full flex-col gap-3 text-left">
              {POINTS.map((p) => (
                <li key={p} className="flex gap-3 border-b border-paper/15 pb-3 text-paper/85">
                  <span className="text-accent" aria-hidden="true">→</span>
                  {p}
                </li>
              ))}
              <li className="flex gap-3 rounded-md bg-accent px-4 py-4 text-paper">
                <span aria-hidden="true">★</span>
                <span>
                  <strong className="font-semibold">My skills.</strong> Hand-curated from real
                  projects, so your AI never forgets what matters.
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* 4. FAQ */}
        <section className="bg-paper px-6 py-24 text-ink md:py-32">
          <div className="mx-auto flex max-w-2xl flex-col gap-8">
            <Eyebrow>Fair questions</Eyebrow>
            <div className="border-t border-ink/15">
              {FAQ.map((f) => (
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
            <h2 className={H2}>Start building. Seriously. Now.</h2>
            <Link
              href="/v4-draft#contact"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-ink px-7 py-3 text-sm font-semibold tracking-wide text-paper transition-opacity hover:opacity-90"
            >
              YES <span aria-hidden="true">→</span>
            </Link>
            <Link href="/v4-draft" className="text-sm text-paper/80 underline underline-offset-4 hover:text-paper">
              Rather have me build it for you?
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
