"use client"

import Image from "next/image"
import Link from "next/link"
import { useForm, ValidationError } from "@formspree/react"
import { Nav, Footer, Serif } from "./_ui"

function Eyebrow({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`text-xs font-semibold uppercase tracking-[0.25em] ${className}`}>{children}</p>
  )
}

const PILLARS = [
  {
    title: "Ayurveda",
    body: "The three doshas — Vata, Pitta, Kapha — your own constitution, and simple daily rituals (Dinacharya) to bring your body back into balance.",
  },
  {
    title: "Somatic Practices",
    body: "Body mapping, sensory awareness, authentic movement and gentle release work to help you feel more at home in your body.",
  },
  {
    title: "Meditation",
    body: "Yoga Nidra, Vipassana, Pranayama and Metta — guided practices for stillness, presence and integration.",
  },
  {
    title: "Reparenting & Inner Child",
    body: "A kinder relationship with yourself: emotional awareness, healthy boundaries, and self-compassion practices.",
  },
  {
    title: "Nature",
    body: "A guided somatic forest hike, quiet time outdoors, and space to simply notice.",
  },
  {
    title: "Culture",
    body: "Kathmandu's sacred spaces, local food, and a traditional Nepali dress experience.",
  },
  {
    title: "Community",
    body: "Opening and closing circles, shared meals, storytelling and real connection with your group.",
  },
]

const INCLUDED = [
  "4 nights accommodation *",
  "Welcome herbal tea on arrival",
  "Ayurvedic meals & celebratory feasts",
  "Guided somatic sessions throughout",
  "Ayurveda teachings on doshas & daily rituals",
  "Daily meditation practices",
  "Guided somatic forest hike",
  "Kathmandu sightseeing excursion",
  "Visit to Boudhanath Stupa or Swayambhunath",
  "Traditional Newari or local organic lunch",
  "Integration & journaling time",
  "Traditional Nepali dress experience",
  "Professional individual & group photoshoot",
  "Farewell feast, closing circle & storytelling",
  "A take-home \"Home Sanctuary\" plan",
]

const GALLERY = [
  { src: "/draft/return-to-roots-serif/durbar-day.jpg", alt: "Patan Durbar Square in daylight" },
  { src: "/draft/return-to-roots-serif/swayambhunath.jpg", alt: "Swayambhunath Stupa at sunset with the Himalayas behind" },
  { src: "/draft/return-to-roots-serif/resort-exterior.jpg", alt: "The retreat venue's grounds and traditional architecture" },
  { src: "/draft/return-to-roots-serif/durbar-closeup.jpg", alt: "Temple rooftops in Kathmandu's Durbar Square" },
  { src: "/draft/return-to-roots-serif/pool.jpg", alt: "Indoor pool and lounge at the retreat venue" },
  { src: "/draft/return-to-roots-serif/night-durbar.jpg", alt: "Kathmandu Durbar Square at night" },
  { src: "/draft/return-to-roots-serif/forest-course.jpg", alt: "Forest grounds surrounding the retreat venue" },
  { src: "/draft/return-to-roots-serif/market.jpg", alt: "Traditional masks and jewelry at a Kathmandu market" },
]

function ApplyForm() {
  const [state, handleSubmit] = useForm("xldgqdnz")

  if (state.succeeded) {
    return (
      <div className="flex flex-col items-center gap-4 text-center">
        <span className="text-5xl" aria-hidden="true">
          🙏
        </span>
        <Serif as="p" className="text-2xl text-[#F7F1E6]">
          Thank you.
        </Serif>
        <p className="max-w-sm text-[#F7F1E6]/70">
          We&apos;ll follow up within a day or two with pricing and booking details.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-5 text-left">
      <div>
        <label htmlFor="name" className="mb-1 block text-xs uppercase tracking-wide text-[#F7F1E6]/50">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="w-full border-b border-[#F7F1E6]/25 bg-transparent py-2 text-[#F7F1E6] placeholder:text-[#F7F1E6]/30 focus:border-[#C9A24B] focus:outline-none"
          placeholder="Your name"
        />
      </div>
      <div>
        <label htmlFor="email" className="mb-1 block text-xs uppercase tracking-wide text-[#F7F1E6]/50">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full border-b border-[#F7F1E6]/25 bg-transparent py-2 text-[#F7F1E6] placeholder:text-[#F7F1E6]/30 focus:border-[#C9A24B] focus:outline-none"
          placeholder="you@email.com"
        />
        <ValidationError prefix="Email" field="email" errors={state.errors} className="mt-1 text-xs text-[#C9A24B]" />
      </div>
      <div>
        <label htmlFor="message" className="mb-1 block text-xs uppercase tracking-wide text-[#F7F1E6]/50">
          What draws you to this retreat?
        </label>
        <textarea
          id="message"
          name="message"
          rows={3}
          className="w-full resize-none border-b border-[#F7F1E6]/25 bg-transparent py-2 text-[#F7F1E6] placeholder:text-[#F7F1E6]/30 focus:border-[#C9A24B] focus:outline-none"
          placeholder="Tell us a little about you (optional)"
        />
      </div>
      <button
        type="submit"
        disabled={state.submitting}
        className="mt-3 inline-flex items-center justify-center gap-2 self-start rounded-full bg-[#C9A24B] px-7 py-3 text-sm font-semibold uppercase tracking-wide text-[#1C160F] transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        Request Your Spot <span aria-hidden="true">→</span>
      </button>
    </form>
  )
}

export default function ReturnToRootsPage() {
  return (
    <>
      <Nav current="home" />
      <main className="bg-[#F7F1E6] text-[#1C160F]">
        {/* Hero */}
        <section className="relative flex min-h-[92vh] items-end overflow-hidden">
          <Image
            src="/draft/return-to-roots-serif/hero-patan.jpg"
            alt="Aerial view of Patan Durbar Square, Kathmandu, with the Himalayas in the distance"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1C160F] via-[#1C160F]/35 to-[#1C160F]/10" />
          <div className="absolute inset-0 bg-[#B5502E]/10 mix-blend-multiply" />

          <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-16 pt-40 sm:pb-24">
            <Eyebrow className="text-[#F7F1E6]/80">October 15–19, 2026 · Kathmandu, Nepal</Eyebrow>
            <Serif
              as="h1"
              className="mt-4 text-[clamp(3rem,2rem+6vw,7rem)] font-light leading-[0.95] tracking-tight text-[#F7F1E6]"
            >
              Return to Roots
            </Serif>
            <p className="mt-3 text-lg uppercase tracking-[0.15em] text-[#F7F1E6]/85 sm:text-xl">
              A Reparenting, Ayurveda &amp; Somatic Retreat
            </p>
            <Serif as="p" className="mt-6 max-w-md text-xl italic text-[#F7F1E6]/90">
              A deeper connection to yourself. A kinder way forward.
            </Serif>

            <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm uppercase tracking-[0.2em] text-[#F7F1E6]/70">
              <span>Reconnect</span>
              <span aria-hidden="true">·</span>
              <span>Heal</span>
              <span aria-hidden="true">·</span>
              <span>Nourish</span>
              <span aria-hidden="true">·</span>
              <span>Belong</span>
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#apply"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#C9A24B] px-7 py-3 text-sm font-semibold uppercase tracking-wide text-[#1C160F] transition-opacity hover:opacity-90"
              >
                Reserve Your Spot <span aria-hidden="true">→</span>
              </a>
              <Link
                href="/draft/return-to-roots-serif/itinerary"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#F7F1E6]/40 px-7 py-3 text-sm font-semibold uppercase tracking-wide text-[#F7F1E6] transition-colors hover:bg-[#F7F1E6]/10"
              >
                View the Itinerary
              </Link>
            </div>
          </div>
        </section>

        {/* Intro */}
        <section className="px-6 py-24 sm:py-32">
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
            <Eyebrow className="text-[#B5502E]">4 Nights · 5 Days</Eyebrow>
            <Serif as="h2" className="text-[clamp(2rem,1.5rem+2vw,3.25rem)] font-light leading-[1.05] tracking-tight">
              Five days built around one return: to yourself.
            </Serif>
            <p className="text-lg text-[#1C160F]/70">
              Through the body, through stillness, through nature, Ayurveda, meditation and a shared
              experience with a small group of people doing the same inner work.
            </p>
            <div className="mt-2 flex flex-wrap justify-center gap-x-2 gap-y-2 text-sm">
              {["Ayurveda", "Somatic Practices", "Inner Child Healing", "Culture & Nature", "Community"].map(
                (tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-[#1C160F]/15 px-4 py-1.5 text-[#1C160F]/70"
                  >
                    {tag}
                  </span>
                ),
              )}
            </div>
          </div>
        </section>

        {/* Pillars */}
        <section className="bg-[#1C160F] px-6 py-24 text-[#F7F1E6] sm:py-32">
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto mb-16 flex max-w-2xl flex-col items-center gap-4 text-center">
              <Eyebrow className="text-[#C9A24B]">What this retreat weaves together</Eyebrow>
              <Serif as="h2" className="text-[clamp(2rem,1.5rem+2vw,3.25rem)] font-light leading-[1.05] tracking-tight">
                Seven threads, one experience.
              </Serif>
            </div>
            <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {PILLARS.map((p) => (
                <div key={p.title}>
                  <Serif as="h3" className="text-xl font-medium text-[#C9A24B]">
                    {p.title}
                  </Serif>
                  <p className="mt-2 text-[#F7F1E6]/70">{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Included */}
        <section id="included" className="px-6 py-24 sm:py-32">
          <div className="mx-auto max-w-4xl">
            <div className="mx-auto mb-14 flex max-w-2xl flex-col items-center gap-4 text-center">
              <Eyebrow className="text-[#B5502E]">The Experience</Eyebrow>
              <Serif as="h2" className="text-[clamp(2rem,1.5rem+2vw,3.25rem)] font-light leading-[1.05] tracking-tight">
                What&apos;s included.
              </Serif>
            </div>
            <ul className="grid grid-cols-1 gap-x-10 gap-y-4 sm:grid-cols-2">
              {INCLUDED.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[#1C160F]/80">
                  <span className="mt-1 text-[#B5502E]" aria-hidden="true">
                    ✦
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-sm italic text-[#1C160F]/45">
              * Final room details to be confirmed.
            </p>
          </div>
        </section>

        {/* Gallery */}
        <section id="gallery" className="bg-[#EFE6D6] px-6 py-24 sm:py-32">
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto mb-14 flex max-w-2xl flex-col items-center gap-4 text-center">
              <Eyebrow className="text-[#B5502E]">Kathmandu &amp; the Venue</Eyebrow>
              <Serif as="h2" className="text-[clamp(2rem,1.5rem+2vw,3.25rem)] font-light leading-[1.05] tracking-tight">
                A city of temples. A home in the forest.
              </Serif>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {GALLERY.map((img, i) => (
                <div
                  key={img.src}
                  className={`relative overflow-hidden rounded-sm ${
                    i === 0 || i === 5 ? "col-span-2 row-span-2" : ""
                  }`}
                  style={{ aspectRatio: i === 0 || i === 5 ? "1 / 1" : "1 / 1" }}
                >
                  <Image src={img.src} alt={img.alt} fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Location + Dates */}
        <section className="px-6 py-24 sm:py-32">
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-16 sm:grid-cols-2">
            <div>
              <Eyebrow className="text-[#B5502E]">Location</Eyebrow>
              <Serif as="h2" className="mt-4 text-3xl font-light leading-tight tracking-tight">
                Kathmandu, Nepal
              </Serif>
              <p className="mt-4 text-[#1C160F]/70">
                The retreat is held at a quiet forest venue just outside Kathmandu, with an excursion
                into the city to visit its Durbar Squares and sacred stupas — Boudhanath or
                Swayambhunath.
              </p>
              <p className="mt-3 text-sm italic text-[#1C160F]/45">Exact venue to be confirmed.</p>
            </div>
            <div>
              <Eyebrow className="text-[#B5502E]">Dates</Eyebrow>
              <Serif as="h2" className="mt-4 text-3xl font-light leading-tight tracking-tight">
                October 15–19, 2026
              </Serif>
              <p className="mt-4 text-[#1C160F]/70">
                Thursday to Monday. 4 nights, 5 days.
              </p>
              <Link
                href="/draft/return-to-roots-serif/itinerary"
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#B5502E] hover:opacity-80"
              >
                See the full day-by-day itinerary <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Apply */}
        <section id="apply" className="bg-[#1C160F] px-6 py-24 text-[#F7F1E6] sm:py-32">
          <div className="mx-auto flex max-w-md flex-col items-center gap-8 text-center">
            <Eyebrow className="text-[#C9A24B]">Reserve Your Spot</Eyebrow>
            <Serif as="h2" className="text-[clamp(2rem,1.5rem+2vw,3rem)] font-light leading-[1.05] tracking-tight">
              Ready to come home to yourself?
            </Serif>
            <p className="text-[#F7F1E6]/70">
              Spots are limited to keep the group intimate. Tell us a little about you and we&apos;ll
              follow up with pricing and booking details.
            </p>
            <ApplyForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
