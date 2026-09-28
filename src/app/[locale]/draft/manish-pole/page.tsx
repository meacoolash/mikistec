import Image from "next/image";
import { css } from "./styles";
import {
  EVENTS,
  FACTS,
  GALLERY,
  PATH,
  PROFILE,
  TEACHES,
  VOICES,
  type EventItem,
} from "./content";
import { KIND, isoDate, timeLabel, upcoming, whenLabel } from "./events";

/* Draft badge. Flip to false once the content is confirmed. */
const DEMO = true;

/* The event list is time-sensitive, so the page re-renders every hour. */
export const revalidate = 3600;

export const metadata = {
  title: `${PROFILE.name} — ${PROFILE.quote}`,
  description: `Yoga, wisdom and meditation teacher in ${PROFILE.location}. ${PROFILE.since}.`,
  robots: { index: false, follow: false },
};

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="mp-eye">
      <i className="mp-rule" aria-hidden="true" />
      {children}
    </span>
  );
}

function EventMeta({ ev, now }: { ev: EventItem; now: Date }) {
  const time = timeLabel(ev);
  return (
    <p className="mp-meta">
      <time dateTime={isoDate(ev, now)}>{whenLabel(ev, now)}</time>
      {time && <span>{time}</span>}
      {ev.location && <span>{ev.location}</span>}
    </p>
  );
}

export default function ManishPolePage() {
  const now = new Date();
  const events = upcoming(EVENTS, now);
  const [featured, ...rest] = events;

  return (
    <div className="mp">
      <style dangerouslySetInnerHTML={{ __html: css }} />

      {DEMO && (
        <div className="mp-demo">
          <b>Draft</b> <span>Concept page · details unconfirmed</span>
        </div>
      )}

      {/* Hero */}
      <header className="mp-hero">
        <div className="mp-hero-img">
          <Image
            src={PROFILE.heroImage}
            alt={`${PROFILE.name} sitting in meditation in front of a circle of students`}
            fill
            priority
            sizes="100vw"
          />
        </div>
        <div className="mp-hero-veil" />
        <div className="mp-hero-in">
          <Eyebrow>{PROFILE.location}</Eyebrow>
          <h1>{PROFILE.name}</h1>
          <p className="mp-hero-q">&ldquo;{PROFILE.quote}&rdquo;</p>
          <div className="mp-hero-meta">
            <span>{PROFILE.disciplines}</span>
            <span>{PROFILE.since}</span>
          </div>
          {events.length > 0 && (
            <div style={{ marginTop: 10 }}>
              <a className="mp-btn" href="#events">
                What&rsquo;s coming up
              </a>
            </div>
          )}
        </div>
      </header>

      {/* Who */}
      <section className="mp-band mp-col mp-center">
        <Eyebrow>Who is teaching</Eyebrow>
        <h2 className="mp-h">
          {PROFILE.headline[0]}
          <br />
          {PROFILE.headline[1]}
        </h2>
        {PROFILE.intro.map((p) => (
          <p className="mp-lead" key={p.slice(0, 24)}>
            {p}
          </p>
        ))}
      </section>

      <div className="mp-facts">
        {FACTS.map((f) => (
          <div className="mp-fact" key={f.l}>
            <b>{f.n}</b>
            <span>{f.l}</span>
          </div>
        ))}
      </div>

      {/* Events — everything below comes from the feed */}
      <section className="mp-band mp-dark" id="events">
        <div className="mp-wide">
          {featured ? (
            <>
              <div className="mp-event">
                {featured.imageUrl ? (
                  <div className="mp-poster">
                    <Image
                      src={featured.imageUrl}
                      alt={featured.title}
                      fill
                      sizes="(min-width: 860px) 420px, 100vw"
                    />
                  </div>
                ) : (
                  <div className="mp-poster mp-poster-blank" aria-hidden="true">
                    <span>{KIND[featured.eventType]}</span>
                  </div>
                )}

                <div className="mp-event-body">
                  <Eyebrow>Next up · {KIND[featured.eventType]}</Eyebrow>
                  <h2>{featured.title}</h2>
                  {featured.description && (
                    <p className="mp-lead" style={{ opacity: 0.74 }}>
                      {featured.description}
                    </p>
                  )}
                  <EventMeta ev={featured} now={now} />
                  {featured.note && <p className="mp-price">{featured.note}</p>}

                  <div style={{ display: "flex", flexWrap: "wrap", gap: 18, alignItems: "center" }}>
                    <a className="mp-btn" href="#contact">
                      Ask about a place
                    </a>
                    {rest.length > 0 && (
                      <a className="mp-link" href="#more">
                        {rest.length} more ahead
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {rest.length > 0 && (
                <div className="mp-list" id="more">
                  {rest.map((ev) => (
                    <article key={ev.id}>
                      <div>
                        <span className="mp-kind">{KIND[ev.eventType]}</span>
                        <h3>{ev.title}</h3>
                        <EventMeta ev={ev} now={now} />
                      </div>
                      <div>
                        {ev.description && <p>{ev.description}</p>}
                        {ev.note && <p className="mp-price">{ev.note}</p>}
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="mp-center">
              <Eyebrow>The calendar</Eyebrow>
              <h2 className="mp-h-sm">Nothing on the calendar right now.</h2>
              <p className="mp-lead" style={{ opacity: 0.74 }}>
                New sessions, workshops and retreats are posted here as soon as they are set.
              </p>
              <a className="mp-btn" href="#contact">
                Ask what is next
              </a>
            </div>
          )}
        </div>
      </section>

      {/* What the teaching holds */}
      <section className="mp-band">
        <div className="mp-wide">
          <div className="mp-center" style={{ marginBottom: "clamp(34px, 5vw, 60px)" }}>
            <Eyebrow>What the practice holds</Eyebrow>
            <h2 className="mp-h-sm">Four things, every time.</h2>
          </div>
          <div className="mp-four">
            {TEACHES.map((t) => (
              <div key={t.h}>
                <h3>{t.h}</h3>
                <p>{t.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Photographs */}
      <section style={{ padding: "0 22px clamp(72px, 10vw, 132px)" }}>
        <div className="mp-wide mp-gal">
          <figure className="mp-g1">
            <Image
              src={GALLERY[0].src}
              alt={GALLERY[0].alt}
              fill
              sizes="(min-width: 700px) 640px, 100vw"
            />
          </figure>
          <div className="mp-g-stack">
            {GALLERY.slice(1).map((g) => (
              <figure key={g.src}>
                <Image src={g.src} alt={g.alt} fill sizes="(min-width: 700px) 460px, 100vw" />
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* The path */}
      <section className="mp-band mp-tint">
        <div className="mp-col">
          <div className="mp-center" style={{ marginBottom: "clamp(30px, 4vw, 48px)" }}>
            <Eyebrow>The path so far</Eyebrow>
          </div>
          <div className="mp-time">
            {PATH.map((p) => (
              <div key={p.y}>
                <b>{p.y}</b>
                <p>{p.t}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Voices */}
      <section className="mp-band">
        <div className="mp-wide">
          <div className="mp-center" style={{ marginBottom: "clamp(34px, 5vw, 56px)" }}>
            <Eyebrow>Students</Eyebrow>
          </div>
          <div className="mp-quotes">
            {VOICES.map((v) => (
              <figure className="mp-quote" key={v.n} style={{ margin: 0 }}>
                <blockquote>&ldquo;{v.q}&rdquo;</blockquote>
                <figcaption>
                  {v.n} · {v.c}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="mp-band mp-col mp-center" id="contact">
        <Eyebrow>Come and sit</Eyebrow>
        <h2 className="mp-h">Start with an hour.</h2>
        <p className="mp-lead">
          Write before you come, or simply turn up a few minutes early. Everything else — retreats,
          teacher training, coaching — grows out of that same hour.
        </p>
        <a className="mp-btn" href={`mailto:${PROFILE.email}`}>
          {PROFILE.email}
        </a>
      </section>

      <footer className="mp-foot">
        <div className="mp-foot-in">
          <span>
            {PROFILE.name} · {PROFILE.location} · {PROFILE.school}
          </span>
          <a
            href="https://mikistec.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mp-link"
          >
            Website draft by Miki Stec →
          </a>
        </div>
      </footer>
    </div>
  );
}
