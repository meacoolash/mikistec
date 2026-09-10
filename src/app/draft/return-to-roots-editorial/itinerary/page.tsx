import Image from "next/image";
import Link from "next/link";
import { css } from "../styles";
import { BASE } from "../content";

const extra = `
.rr-it-hero { position: relative; min-height: 56svh; display: flex; align-items: flex-end; background: var(--deep); overflow: hidden; }
.rr-it-hero img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.rr-it-scrim { position: absolute; inset: 0; background: linear-gradient(to top, rgba(20,28,36,0.88), rgba(20,28,36,0.25)); }
.rr-it-inner { position: relative; padding: 120px 0 48px; width: 100%; color: #F5EFE4; }
.rr-it-inner h1 { font-size: clamp(44px,8vw,96px); line-height: 0.92; margin: 14px 0 16px; }
.rr-back { display: inline-flex; gap: 10px; font-size: 11px; letter-spacing: 0.24em; text-transform: uppercase; text-decoration: none; color: inherit; opacity: 0.8; }
.rr-back:hover { opacity: 1; }
.rr-dayblock { border-top: 1px solid var(--line); padding: 46px 0 10px; }
.rr-dayblock:first-of-type { border-top: 0; }
.rr-dayhead { display: grid; gap: 10px; margin-bottom: 30px; }
@media (min-width: 900px) { .rr-dayhead { grid-template-columns: 200px 1fr; gap: 40px; align-items: baseline; } }
.rr-dayhead .k { font-size: 10.5px; letter-spacing: 0.3em; text-transform: uppercase; color: var(--clay); }
.rr-dayhead h2 { font-size: clamp(30px,4.4vw,50px); margin: 0; line-height: 1.05; }
.rr-slot { display: grid; gap: 6px; padding: 20px 0; border-top: 1px solid var(--line); }
@media (min-width: 900px) { .rr-slot { grid-template-columns: 200px 1fr; gap: 40px; } }
.rr-slot .t { font-size: 12.5px; letter-spacing: 0.16em; color: var(--ink-soft); white-space: nowrap; padding-top: 5px; }
.rr-slot h3 { font-size: 24px; margin: 0 0 6px; }
.rr-slot p { margin: 0; color: var(--ink-soft); line-height: 1.7; font-size: 16px; max-width: 62ch; }
.rr-slot em { font-style: italic; color: var(--ink); }
.rr-sublist { margin: 10px 0 0; padding: 0; list-style: none; display: grid; gap: 8px; }
.rr-sublist li { display: flex; gap: 12px; color: var(--ink-soft); font-size: 15px; line-height: 1.6; }
.rr-sublist li span:first-child { color: var(--clay); white-space: nowrap; font-size: 12.5px; letter-spacing: 0.1em; padding-top: 3px; min-width: 96px; }
`;

type Slot = {
  time: string;
  title: string;
  body?: string;
  sub?: { time: string; text: string }[];
};

const DAYS: { k: string; title: string; date: string; slots: Slot[] }[] = [
  {
    k: "Day one",
    date: "Thursday, October 15",
    title: "Grounding & settling",
    slots: [
      {
        time: "14:00 – 16:00",
        title: "Arrival & check-in",
        body: "A welcome grounding herbal tea — a ginger-tulsi blend — and orientation to your room and the grounds.",
      },
      {
        time: "16:30 – 18:00",
        title: "Opening circle & body-mapping",
        body: "Setting intentions and community agreements, then a gentle somatic exercise to map where travel and tension are being held in the body.",
      },
      {
        time: "18:30 – 20:00",
        title: "Welcome feast",
        body: "A warm, grounding, Vata-balancing Ayurvedic dinner.",
      },
      {
        time: "20:30 – 21:30",
        title: "Evening meditation",
        body: "Yoga Nidra — psychic sleep — to settle the nervous system and invite deep rest on the first night.",
      },
    ],
  },
  {
    k: "Day two",
    date: "Friday, October 16",
    title: "Nature & somatic release",
    slots: [
      {
        time: "07:00 – 10:30",
        title: "Somatic forest hiking",
        body: "A guided morning hike in silence, using somatic tracking and sensory awareness — sight, sound and touch connected directly to a calming nervous system.",
      },
      {
        time: "10:30 – 11:30",
        title: "Hearty brunch",
        body: "A nourishing meal to restore energy after the walk.",
      },
      {
        time: "12:00 – 13:30",
        title: "Ayurveda teachings",
        body: "An introduction to the three doshas — Vata, Pitta and Kapha — and to your own body-mind constitution.",
      },
      {
        time: "13:30 – 16:30",
        title: "Unstructured integration window",
        body: "Time for solo reflection, journaling, a swim or a nap. Nothing is asked of you.",
      },
      {
        time: "16:30 – 18:00",
        title: "Somatic session",
        body: "Unwinding the nervous system: therapeutic shaking mechanics and authentic movement, to let held emotional energy move through and out.",
      },
      { time: "18:30 – 20:00", title: "Dinner" },
      {
        time: "20:30 – 21:30",
        title: "Evening meditation",
        body: "Gentle breath awareness — Pranayama — and a guided integration meditation for deep stillness.",
      },
    ],
  },
  {
    k: "Day three",
    date: "Saturday, October 17",
    title: "Kathmandu & sacred spaces",
    slots: [
      {
        time: "07:30 – 08:30",
        title: "Morning meditation",
        body: "Vipassana — silent mindfulness practice — before the day opens.",
      },
      {
        time: "10:00 – 15:30",
        title: "Sightseeing excursion in Kathmandu",
        sub: [
          { time: "10:00", text: "Travel into central Kathmandu." },
          {
            time: "11:00",
            text: "A mindful walking tour of Boudhanath Stupa or Swayambhunath, witnessing living sacred ritual rather than observing a monument.",
          },
          { time: "14:00", text: "Traditional Newari or organic local lunch in the city before heading back." },
        ],
      },
      {
        time: "16:30 – 18:00",
        title: "Ayurveda & re-centering",
        body: "A group decompression circle on Dinacharya — daily self-care rituals — and tools for keeping internal balance in busy, over-stimulating environments.",
      },
      {
        time: "18:30 – 20:30",
        title: "Celebratory dinner",
        body: "A rich, warming Ayurvedic feast built around the autumn harvest.",
      },
    ],
  },
  {
    k: "Day four",
    date: "Sunday, October 18",
    title: "Integration, culture & photoshoot",
    slots: [
      {
        time: "10:00 – 11:30",
        title: "Somatic & meditation synergy",
        body: "Loving-kindness meditation — Metta — paired with gentle heart-opening somatic boundary work.",
      },
      { time: "11:30 – 13:00", title: "Lunch" },
      {
        time: "13:00 – 15:30",
        title: "Cultural dress preparation",
        body: "Being adorned in traditional Nepali attire — saris, kurtas and ethnic garments — with the help of local assistants.",
      },
      {
        time: "15:30 – 18:00",
        title: "Farewell photoshoot",
        body: "A professional group and individual shoot in the landscape of the venue, to keep what the five days have changed.",
      },
      {
        time: "18:30 – 21:30",
        title: "Farewell feast & closing circle",
        body: "A festive dinner, then an evening indoors of storytelling, open-mic reflections and shared takeaways — still in your cultural dress.",
      },
    ],
  },
  {
    k: "Day five",
    date: "Monday, October 19",
    title: "Re-entry & embodiment",
    slots: [
      { time: "07:30 – 09:30", title: "Morning packing & room check-out" },
      {
        time: "09:30 – 11:30",
        title: "Closing circle — your Home Sanctuary",
        body: "Practical planning for how Ayurvedic daily habits and brief somatic check-ins survive a busy schedule back home. A final group blessing.",
      },
      { time: "11:30", title: "Departure", body: "Final farewells and checkout." },
    ],
  },
];

export const metadata = {
  title: "Itinerary · Return to Roots",
};

export default function Itinerary() {
  return (
    <div className="rr">
      <style dangerouslySetInnerHTML={{ __html: css + extra }} />

      <header className="rr-it-hero">
        <Image
          src={`${BASE}/forest.jpeg`}
          alt="A green valley enclosed by forest near Kathmandu"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />
        <div className="rr-it-scrim" />
        <div className="rr-it-inner">
          <div className="rr-wrap">
            <Link className="rr-back" href="/draft/return-to-roots-editorial">
              <span aria-hidden>←</span> Return to Roots
            </Link>
            <h1>The full itinerary</h1>
            <p className="rr-sub">Four nights · five days · October 15–19, 2026</p>
          </div>
        </div>
      </header>

      <main className="rr-sec">
        <div className="rr-wrap">
          <p className="rr-lede" style={{ marginBottom: 52 }}>
            A draft rhythm rather than a timetable to obey. Times shift with the weather, the group
            and the light — the shape of each day stays.
          </p>

          {DAYS.map((d) => (
            <section className="rr-dayblock" key={d.k}>
              <div className="rr-dayhead">
                <div>
                  <div className="k">{d.k}</div>
                  <div className="k" style={{ color: "var(--ink-soft)", marginTop: 8 }}>
                    {d.date}
                  </div>
                </div>
                <h2>{d.title}</h2>
              </div>

              {d.slots.map((s) => (
                <div className="rr-slot" key={s.time + s.title}>
                  <div className="t">{s.time}</div>
                  <div>
                    <h3>{s.title}</h3>
                    {s.body && <p>{s.body}</p>}
                    {s.sub && (
                      <ul className="rr-sublist">
                        {s.sub.map((x) => (
                          <li key={x.time}>
                            <span>{x.time}</span>
                            <span>{x.text}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </section>
          ))}

          <div style={{ marginTop: 64, display: "flex", gap: 18, flexWrap: "wrap" }}>
            <Link className="rr-btn" href="/draft/return-to-roots-editorial#apply">
              Request a place <span aria-hidden>→</span>
            </Link>
            <Link className="rr-btn rr-btn-ghost" href="/draft/return-to-roots-editorial">
              Back to the retreat
            </Link>
          </div>
        </div>
      </main>

      <footer className="rr-foot">
        <div className="rr-wrap rr-foot-row">
          <div className="serif" style={{ fontSize: 22 }}>Return to Roots</div>
          <div>Kathmandu, Nepal · October 2026</div>
        </div>
      </footer>

      <div className="rr-draft">
        <span>Draft 2 · concept only</span>
        <span>
          Built by <Link href="/">Miki Stec</Link>
        </span>
      </div>
    </div>
  );
}
