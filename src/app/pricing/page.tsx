import Link from "next/link"
import { Header } from "../sections/header"
import { Footer } from "../sections/footer"
import { RevenueShare } from "./RevenueShare"

export const metadata = {
  title: "Pricing",
  description:
    "Two ways to work with me: learn to build with AI for €390, or have me build your website from €990.",
  alternates: { canonical: "/pricing" },
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

const LEARN = [
  "1:1 sessions with me",
  "3 sessions included in the price",
  "Your AI development setup",
  "My ready-made instructions for your AI",
  "Build on your own laptop",
  "Work on your own business",
  "Websites, tools & simple agents",
  "Learn how to continue without me",
]

const BUILD = [
  "Research your business",
  "Positioning & structure",
  "Copywriting",
  "Design",
  "Mobile & responsive details",
  "SEO & technical setup",
  "Analytics",
  "Testing & refinement",
  "Deployment",
]

const LABEL = "text-xs font-semibold tracking-[0.2em] uppercase"
const PRICE = "font-display text-[clamp(3rem,2.4rem+2.4vw,4.25rem)] font-black leading-none tracking-tighter"
const TITLE = "font-display text-2xl font-extrabold leading-tight"
const CTA =
  "mt-auto inline-flex items-center justify-center gap-2 self-start rounded-md px-7 py-3 text-sm font-semibold tracking-wide transition-opacity hover:opacity-90"

export default function PricingPage() {
  return (
    <div className="bg-white">
      <Header />
      <main className="font-body">
        <section className="px-4 pb-24 pt-12 text-ink md:px-7 md:pb-32 md:pt-20">
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
            <Eyebrow>Pricing</Eyebrow>
            <h1 className="text-[clamp(2.5rem,1.5rem+4vw,4.5rem)] font-display font-black leading-[0.98] tracking-tighter">
              Two ways to work with me
            </h1>
          </div>

          <div className="mx-auto mt-14 grid max-w-5xl gap-5 md:grid-cols-2">
            {/* Build it yourself */}
            <article className="flex flex-col gap-6 rounded-[14px] bg-[#EDECE8] p-7 md:p-10">
              <p className={`${LABEL} text-accent`}>Build it yourself</p>
              <p className={PRICE}>
                <span className="mr-2 align-middle font-body text-lg font-normal tracking-normal text-ink/60">
                  from
                </span>
                €390
              </p>
              <div className="flex flex-col gap-3">
                <h2 className={TITLE}>Learn to build with AI</h2>
                <p className="text-ink/70">
                  I set everything up with you and teach you how to turn your ideas into real
                  things using AI.
                </p>
              </div>
              <ul className="flex flex-col border-t border-ink/15">
                {LEARN.map((item) => (
                  <li key={item} className="flex gap-3 border-b border-ink/15 py-3 text-ink/80">
                    <span className="text-accent" aria-hidden="true">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="flex flex-col gap-2">
                <p className="font-semibold">You do the building. I show you how.</p>
                <p className="text-ink/70">
                  Best if you want to understand what&apos;s possible and become independent.
                </p>
              </div>
              <Link href="/?path=learn#contact" className={`${CTA} bg-accent text-paper`}>
                START BUILDING <span aria-hidden="true">→</span>
              </Link>
            </article>

            {/* Have me build it */}
            <article className="flex flex-col gap-6 rounded-[14px] bg-accent p-7 text-paper md:p-10">
              <p className={`${LABEL} text-[#FFD75E]`}>Have me build it</p>
              <p className={PRICE}>
                <span className="mr-2 align-middle font-body text-lg font-normal tracking-normal text-paper/80">
                  from
                </span>
                €990
                <RevenueShare className="ml-3 align-middle font-body text-lg font-semibold tracking-normal text-[#FFD75E]" />
              </p>
              <div className="flex flex-col gap-3">
                <h2 className={TITLE}>Get a finished website</h2>
                <p className="text-paper/85">
                  You give me your business. I take care of the rest.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <p>
                  <mark className="rounded bg-[#FFD75E] px-1.5 py-0.5 font-semibold text-ink">
                    A good website isn&apos;t one prompt.
                  </mark>
                </p>
                <p className="text-paper/85">
                  The real work is in the details: understanding
                  your business, finding the right message, refining the copy, adjusting the
                  design, fixing edge cases, testing, SEO, performance, mobile and all the small
                  decisions between <strong className="text-paper">&ldquo;it works&rdquo;</strong> and{" "}
                  <strong className="text-paper">&ldquo;it&apos;s ready.&rdquo;</strong>
                </p>
              </div>
              <ul className="flex flex-col border-t border-paper/30">
                {BUILD.map((item) => (
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
                BUILD IT FOR ME <span aria-hidden="true">→</span>
              </Link>
            </article>

            {/* Smart upgrade: sits under the €990 column only, never folded into the base price */}
            <a
              href="https://www.qviks.com/smart-web"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col gap-4 rounded-[14px] border-2 border-dashed border-accent p-7 transition-colors hover:bg-accent/5 md:col-start-2 md:p-8"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                <div>
                  <p className={`${LABEL} text-accent`}>Upgrade</p>
                  <h2 className={`${TITLE} mt-2`}>Make it smart</h2>
                </div>
              </div>
              <p className="text-ink/80">AI chatbot · Lead capture · Mini CRM</p>
              <span className="text-sm font-semibold text-accent underline-offset-4 group-hover:underline">
                See demo <span aria-hidden="true">↗</span>
              </span>
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
