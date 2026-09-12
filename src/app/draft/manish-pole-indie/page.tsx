import Image from "next/image";
import { css } from "./styles";
import { BreathOrb, Collage, Reveal, type Photo } from "./_interactive";
import {
  EVENTS,
  FACTS,
  GALLERY,
  PATH,
  PROFILE,
  TEACHES,
  VOICES,
  type EventItem,
} from "../manish-pole/content";
import { KIND, isoDate, timeLabel, upcoming, whenLabel } from "../manish-pole/events";

/* Draft badge. Flip to false once the content is confirmed. */
const DEMO = true;

/* The calendar is time-sensitive, so the page re-renders every hour. */
export const revalidate = 3600;

export const metadata = {
  title: `${PROFILE.name} — ${PROFILE.quote}`,
  description: `Yoga, wisdom and meditation teacher in ${PROFILE.location}. ${PROFILE.since}.`,
  robots: { index: false, follow: false },
};

const TICKER = [
  PROFILE.disciplines,
  PROFILE.since,
  PROFILE.location,
  PROFILE.school,
  PROFILE.quote,
];

const PHOTOS: Photo[] = [
  { ...GALLERY[0], caption: "Teaching a circle", x: 4, y: 8, rot: -4.5 },
  { ...GALLERY[1], caption: "Awaken, with Rana", x: 58, y: 64, rot: 3 },
  { ...GALLERY[2], caption: "An hour of practice", x: 96, y: 14, rot: -1.5 },
  {
    src: PROFILE.heroImage,
    alt: `${PROFILE.name} sitting in meditation`,
    caption: "Sitting",
    x: 24,
    y: 92,
    rot: 5,
  },
];

function EventMeta({ ev, now }: { ev: EventItem; now: Date }) {
  const time = timeLabel(ev);
  return (
    <p className="mpi-meta">
      <time dateTime={isoDate(ev, now)}>{whenLabel(ev, now)}</time>
      {time && <span>{time}</span>}
      {ev.location && <span>{ev.location}</span>}
    </p>
  );
}

export default function ManishPoleIndiePage() {
  const now = new Date();
  const events = upcoming(EVENTS, now);
  const [featured, ...rest] = events;

  return (
    <div className="mpi">
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div className="mpi-grain" aria-hidden="true" />

      {DEMO && (
        <div className="mpi-demo">
          <b>Draft</b> <span>Concept · unconfirmed</span>
        </div>
      )}

      {/* Hero */}
      <header className="mpi-hero">
        <div className="mpi-stamp" aria-hidden="true">
          <b>2003</b>
          <span>Est.</span>
        </div>
        <div className="mpi-wide mpi-hero-in">
          <div>
            <span className="mpi-eye">{PROFILE.location}</span>
            <h1>
              <span>Manish</span>
              <span className="mpi-pole">Pole</span>
            </h1>
            <p className="mpi-hero-q">&ldquo;{PROFILE.quote}&rdquo;</p>
            <div className="mpi-hero-meta">
              <span>{PROFILE.disciplines}</span>
              <span>{PROFILE.since}</span>
            </div>
            {events.length > 0 && (
              <p style={{ marginTop: 28 }}>
                <a className="mpi-btn" href="#calendar">
                  What&rsquo;s coming up
                </a>
              </p>
            )}
          </div>

          <BreathOrb />
        </div>
      </header>

      {/* Ticker */}
      <div className="mpi-marq" aria-hidden="true">
        <div>
          {[0, 1].map((copy) => (
            <span key={copy}>
              {TICKER.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* Who */}
      <section className="mpi-band">
        <Reveal className="mpi-col">
          <span className="mpi-eye">Who is teaching</span>
          <h2 className="mpi-h" style={{ margin: "18px 0 22px" }}>
            {PROFILE.headline[0]} <em>{PROFILE.headline[1]}</em>
          </h2>
          {PROFILE.intro.map((p) => (
            <p className="mpi-lead" key={p.slice(0, 24)} style={{ marginBottom: 16 }}>
              {p}
            </p>
          ))}
          <p style={{ display: "flex", gap: 26, flexWrap: "wrap", marginTop: 26 }}>
            {FACTS.map((f) => (
              <span key={f.l} style={{ fontSize: 12, letterSpacing: "0.12em" }}>
                <b className="mpi-count" style={{ fontSize: 22, fontWeight: 500 }}>
                  {f.n}
                </b>{" "}
                {f.l}
              </span>
            ))}
          </p>
        </Reveal>
      </section>

      {/* Collage */}
      <Collage photos={PHOTOS} />

      {/* Calendar */}
      <section className="mpi-band" id="calendar">
        <div className="mpi-wide">
          <Reveal>
            <span className="mpi-eye">The calendar</span>
            <h2 className="mpi-h" style={{ margin: "16px 0 34px" }}>
              What&rsquo;s <em>coming up</em>
            </h2>
          </Reveal>

          {featured ? (
            <div className="mpi-cards">
              <Reveal>
                <article className="mpi-card mpi-card-featured">
                  <span className="mpi-kind">Next up · {KIND[featured.eventType]}</span>
                  {featured.imageUrl && (
                    <div className="mpi-card-img">
                      <Image
                        src={featured.imageUrl}
                        alt={featured.title}
                        fill
                        sizes="(min-width: 900px) 560px, 100vw"
                      />
                    </div>
                  )}
                  <h3>{featured.title}</h3>
                  {featured.description && <p>{featured.description}</p>}
                  <EventMeta ev={featured} now={now} />
                  {featured.note && <p className="mpi-note">{featured.note}</p>}
                  <p style={{ marginTop: 6 }}>
                    <a className="mpi-btn" href="#contact">
                      Ask about a place
                    </a>
                  </p>
                </article>
              </Reveal>

              <div className="mpi-rest">
                {rest.map((ev, i) => (
                  <Reveal key={ev.id} delay={90 * (i + 1)}>
                    <article className="mpi-card">
                      <span className="mpi-kind">{KIND[ev.eventType]}</span>
                      <h3>{ev.title}</h3>
                      {ev.description && <p>{ev.description}</p>}
                      <EventMeta ev={ev} now={now} />
                      {ev.note && <p className="mpi-note">{ev.note}</p>}
                    </article>
                  </Reveal>
                ))}
              </div>
            </div>
          ) : (
            <Reveal>
              <div className="mpi-card mpi-empty">
                <h3>Nothing on the calendar right now.</h3>
                <p>New sessions, workshops and retreats are posted here as soon as they are set.</p>
                <a className="mpi-btn" href="#contact">
                  Ask what is next
                </a>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* Four things */}
      <section className="mpi-band">
        <div className="mpi-wide">
          <Reveal>
            <span className="mpi-eye">What the practice holds</span>
            <h2 className="mpi-h" style={{ margin: "16px 0 30px" }}>
              Four things, <em>every time</em>
            </h2>
          </Reveal>
          <Reveal>
            <div className="mpi-four">
              {TEACHES.map((t, i) => (
                <div key={t.h}>
                  <h3>
                    <span>0{i + 1}</span>
                    {t.h}
                  </h3>
                  <p>{t.p}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Path */}
      <section className="mpi-band" style={{ background: "var(--paper-2)" }}>
        <div className="mpi-col">
          <Reveal>
            <span className="mpi-eye">The path so far</span>
            <div className="mpi-path" style={{ marginTop: 30 }}>
              {PATH.map((p) => (
                <div key={p.y}>
                  <b>{p.y}</b>
                  <p>{p.t}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Voices */}
      <section className="mpi-band">
        <div className="mpi-wide">
          <Reveal>
            <span className="mpi-eye">Students</span>
          </Reveal>
          <div className="mpi-notes" style={{ marginTop: 30 }}>
            {VOICES.map((v, i) => (
              <Reveal key={v.n} delay={90 * i}>
                <figure className="mpi-note-card" style={{ margin: 0 }}>
                  <blockquote>&ldquo;{v.q}&rdquo;</blockquote>
                  <figcaption>
                    {v.n} · {v.c}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="mpi-band" id="contact">
        <Reveal className="mpi-col" >
          <div style={{ textAlign: "center" }}>
            <span className="mpi-eye">Come and sit</span>
            <h2 className="mpi-h" style={{ margin: "18px 0 20px" }}>
              Start with <em>an hour</em>
            </h2>
            <p className="mpi-lead" style={{ marginBottom: 28 }}>
              Write before you come, or simply turn up a few minutes early. Everything else —
              retreats, teacher training, coaching — grows out of that same hour.
            </p>
            <a className="mpi-btn" href={`mailto:${PROFILE.email}`}>
              {PROFILE.email}
            </a>
          </div>
        </Reveal>
      </section>

      <footer className="mpi-foot">
        <div className="mpi-foot-in">
          <span>
            {PROFILE.name} · {PROFILE.location} · {PROFILE.school}
          </span>
          <a
            href="https://mikistec.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mpi-link"
          >
            Website draft by Miki Stec →
          </a>
        </div>
      </footer>
    </div>
  );
}
