import Image from "next/image"
import Link from "next/link"
import { Header } from "../sections/header"
import { Footer } from "../sections/footer"

export const metadata = {
  title: "Coaching",
  description: "I coach you to build your own website and your own AI agents.",
  alternates: { canonical: "/coaching" },
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
  "Your own website, apps or tools",
  "On your own domain, everything done through your agents",
  "Agents that do the work for you, e.g. research, emails, social posts",
]

const FAQ = [
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
]

const H2 = "text-[clamp(2rem,1.5rem+2.8vw,3.5rem)] font-display font-black leading-[0.98] tracking-tighter"

export default function LearnPage() {
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
                alt="A figure crouched with head in hands, surrounded by other people's photos and a clock"
                width={800}
                height={1200}
                priority
                className="h-auto w-full brightness-[1.18] contrast-[1.12] saturate-[.6] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"
              />
            </div>
            <div className="flex flex-col items-center gap-6 text-center md:items-start md:text-left">
              <Eyebrow>1:1 coaching</Eyebrow>
              <h1 className="text-[clamp(2.5rem,1.5rem+4vw,4.5rem)] font-display font-black leading-[0.98] tracking-tighter">
                Feeling left behind?
              </h1>
              <p className="max-w-md text-lg text-ink/70">
                I coach you to build your own website and your own AI agents. From FOMO to shipping.
              </p>
              <Link
                href="/?path=learn#contact"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-accent px-7 py-3 text-sm font-semibold tracking-wide text-paper transition-opacity hover:opacity-90"
              >
                YES <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
          </div>
        </section>

        {/* 2. What you get */}
        <section className="bg-white px-6 py-24 text-ink md:py-32">
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-8 text-center">
            <Eyebrow>With me next to you</Eyebrow>
            <h2 className={H2}>Build it yourself.</h2>
            <p className="text-lg text-ink/70">
              One-on-one sessions, on your laptop, on your business.
            </p>
            <ul className="flex w-full flex-col gap-3 text-left">
              {POINTS.map((p) => (
                <li key={p} className="flex gap-3 border-b border-ink/15 pb-3 text-ink/80">
                  <span className="text-accent" aria-hidden="true">→</span>
                  {p}
                </li>
              ))}
              <li className="flex gap-3 border-b border-ink/15 pb-3 text-ink/80">
                <span className="text-accent" aria-hidden="true">★</span>
                <span>
                  <strong className="font-semibold text-ink">Nothing forgotten.</strong>{" "}
                  Ready-made instructions for your AI, from my real projects. Your AI reads them
                  every time.
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* 3. Problem */}
        <section className="bg-white px-6 py-24 text-ink md:py-32">
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
            <Eyebrow>The problem</Eyebrow>
            <h2 className={H2}>
              You don&apos;t need to master AI. You need to know what it can do for you.
            </h2>
            <p className="text-lg text-ink/70">
              It&apos;s one afternoon of doing it next to someone who already does it every day.
            </p>
          </div>
        </section>

        {/* 3b. Price */}
        <section className="bg-white px-6 pb-24 text-ink md:pb-32">
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-5 rounded-[14px] bg-paper px-6 py-14 text-center">
            <h2 className="font-display text-2xl font-extrabold">Start building with me</h2>
            <p className="font-display text-[clamp(3.5rem,2.5rem+4vw,5.5rem)] font-black leading-none tracking-tighter text-accent">
              €390
            </p>
            <p className="text-lg text-ink/70">3 private sessions.</p>
            <Link
              href="/?path=learn#contact"
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-md bg-[#FFD75E] px-7 py-3 text-sm font-semibold tracking-wide text-ink shadow-[0_0_18px_rgba(255,197,61,0.55)] transition-opacity hover:opacity-90"
            >
              YES <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>

        {/* 4. FAQ */}
        <section className="bg-white px-6 py-24 text-ink md:py-32">
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
              href="/?path=learn#contact"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-[#FFD75E] px-7 py-3 text-sm font-semibold tracking-wide text-ink shadow-[0_0_18px_rgba(255,197,61,0.55)] transition-opacity hover:opacity-90"
            >
              YES <span aria-hidden="true">→</span>
            </Link>
            <Link href="/?path=build#contact" className="text-sm text-paper/80 underline underline-offset-4 hover:text-paper">
              Rather have me build it for you?
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
