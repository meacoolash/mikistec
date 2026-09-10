import Link from "next/link"
import { Nav, Footer, Serif } from "../_ui"

type Session = { time: string; title: string; body: string }
type Day = { label: string; date: string; sessions: Session[] }

const DAYS: Day[] = [
  {
    label: "Day 1",
    date: "Thursday, October 15 — Grounding & Settling",
    sessions: [
      { time: "14:00–16:00", title: "Arrival & Check-in", body: "Welcome grounding herbal tea (ginger-tulsi blend) and room orientation." },
      { time: "16:30–18:00", title: "Opening Circle & Body-Mapping", body: "Intentions setting, community agreements, and a gentle somatic exercise to map where travel stress and tension are held in the body." },
      { time: "18:30–20:00", title: "Welcome Feast", body: "A warm, grounding, Vata-balancing Ayurvedic dinner." },
      { time: "20:30–21:30", title: "Evening Meditation", body: "Yoga Nidra for deep rest and settling into the retreat." },
    ],
  },
  {
    label: "Day 2",
    date: "Friday, October 16 — Nature Connection & Somatic Release",
    sessions: [
      { time: "07:00–10:30", title: "Somatic Forest Hiking", body: "A guided morning hike using somatic tracking and sensory awareness — moving in silence, connecting sight, sound and touch." },
      { time: "10:30–11:30", title: "Hearty Brunch", body: "A nourishing meal to restore energy after the hike." },
      { time: "12:00–13:30", title: "Ayurveda Teachings", body: "Introduction to the three doshas (Vata, Pitta, Kapha) and your own body-mind constitution." },
      { time: "13:30–16:30", title: "Unstructured Integration Window", body: "Time for solo reflection, journaling, or napping." },
      { time: "16:30–18:00", title: "Somatic Practices", body: "Gentle movement, therapeutic shaking and authentic movement to support nervous-system regulation." },
      { time: "18:30–20:00", title: "Dinner", body: "" },
      { time: "20:30–21:30", title: "Evening Meditation", body: "Gentle breath awareness (Pranayama) and a guided integration meditation." },
    ],
  },
  {
    label: "Day 3",
    date: "Saturday, October 17 — Kathmandu Exploration & Sacred Spaces",
    sessions: [
      { time: "07:30–08:30", title: "Morning Meditation", body: "Vipassana — silent mindfulness meditation." },
      { time: "10:00–15:30", title: "Sightseeing Excursion", body: "Travel to central Kathmandu, a mindful walking tour of Boudhanath Stupa or Swayambhunath, and a traditional Newari or organic local lunch." },
      { time: "16:30–18:00", title: "Ayurveda & Re-centering", body: "Group circle on Dinacharya (daily self-care rituals) and tools for staying balanced in busy environments." },
      { time: "18:30–20:30", title: "Celebratory Dinner", body: "A rich, warming Ayurvedic feast celebrating seasonal autumn harvests." },
    ],
  },
  {
    label: "Day 4",
    date: "Sunday, October 18 — Deep Integration, Cultural Celebration & Photoshoot",
    sessions: [
      { time: "10:00–11:30", title: "Somatic & Meditation Synergy", body: "Loving-Kindness meditation (Metta) paired with gentle heart-opening somatic work." },
      { time: "11:30–13:00", title: "Lunch", body: "" },
      { time: "13:00–15:30", title: "Cultural Dress Preparation", body: "Adorning traditional Nepali attire with the support of local assistants." },
      { time: "15:30–18:00", title: "Farewell Photoshoot", body: "A professional group and individual photoshoot against the venue's natural landscape." },
      { time: "18:30–21:30", title: "Farewell Feast & Closing Circle", body: "Festive dinner followed by storytelling, open-mic reflections, and sharing group takeaways in your cultural dress." },
    ],
  },
  {
    label: "Day 5",
    date: "Monday, October 19 — Re-entry & Embodiment",
    sessions: [
      { time: "07:30–09:30", title: "Morning Packing & Room Check-out", body: "" },
      { time: "09:30–11:30", title: "Closing Circle", body: "Designing your \"Home Sanctuary\" — practical planning to bring Ayurvedic habits and somatic check-ins into daily life. Final group blessing." },
      { time: "11:30", title: "Departure", body: "Final farewells and checkout." },
    ],
  },
]

export default function ItineraryPage() {
  return (
    <>
      <Nav current="itinerary" />
      <main className="bg-[#F7F1E6] px-6 py-20 text-[#1C160F] sm:py-28">
        <div className="mx-auto max-w-3xl">
          <Link href="/draft/return-to-roots-serif" className="text-sm text-[#B5502E] hover:opacity-80">
            ← Back to overview
          </Link>

          <p className="mt-8 text-xs font-semibold uppercase tracking-[0.25em] text-[#B5502E]">
            October 15–19, 2026 · Kathmandu, Nepal
          </p>
          <Serif as="h1" className="mt-4 text-[clamp(2.25rem,1.75rem+2.5vw,3.5rem)] font-light leading-[1.02] tracking-tight">
            The Itinerary
          </Serif>
          <p className="mt-4 max-w-xl text-lg text-[#1C160F]/70">
            4 nights, 5 days, built day by day around grounding, release, culture, celebration and
            re-entry. Times are approximate and may shift slightly on-site.
          </p>

          <div className="mt-16 flex flex-col gap-16">
            {DAYS.map((day) => (
              <div key={day.label}>
                <div className="flex items-baseline gap-3 border-b border-[#1C160F]/15 pb-3">
                  <Serif as="h2" className="text-2xl font-medium text-[#B5502E]">
                    {day.label}
                  </Serif>
                  <span className="text-sm text-[#1C160F]/60">{day.date}</span>
                </div>
                <div className="mt-6 flex flex-col gap-6">
                  {day.sessions.map((s) => (
                    <div key={s.time + s.title} className="flex flex-col gap-1 sm:flex-row sm:gap-6">
                      <span className="shrink-0 text-sm font-semibold uppercase tracking-wide text-[#1C160F]/50 sm:w-32">
                        {s.time}
                      </span>
                      <div>
                        <p className="font-semibold text-[#1C160F]">{s.title}</p>
                        {s.body && <p className="mt-1 text-[#1C160F]/70">{s.body}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-20 flex flex-col items-center gap-4 rounded-lg border border-[#1C160F]/10 bg-[#EFE6D6] px-6 py-10 text-center">
            <Serif as="p" className="text-2xl font-light">
              Ready to join?
            </Serif>
            <Link
              href="/draft/return-to-roots-serif#apply"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#B5502E] px-7 py-3 text-sm font-semibold uppercase tracking-wide text-[#F7F1E6] transition-opacity hover:opacity-90"
            >
              Reserve Your Spot <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
