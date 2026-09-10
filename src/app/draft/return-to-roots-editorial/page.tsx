"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { css } from "./styles";
import { BASE, DAYS, FACTS, GALLERY, INCLUDED, PILLARS, THREADS } from "./content";

function useReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".rr-rev"));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

export default function ReturnToRoots() {
  const [solid, setSolid] = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [sent, setSent] = useState(false);
  const heroRef = useRef<HTMLElement | null>(null);

  useReveal();

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") setLightbox((i) => ((i ?? 0) + 1) % GALLERY.length);
      if (e.key === "ArrowLeft") setLightbox((i) => ((i ?? 0) - 1 + GALLERY.length) % GALLERY.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox]);

  return (
    <div className="rr">
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <nav className="rr-nav" data-solid={solid}>
        <span className="rr-nav-mark serif">Return to Roots</span>
        <div className="rr-nav-links">
          <a href="#retreat">The retreat</a>
          <a href="#place">The place</a>
          <a href="#days">The days</a>
          <a href="#included">Included</a>
        </div>
        <a className="rr-nav-cta" href="#apply">
          Request a place
        </a>
      </nav>

      {/* ---------------- HERO ---------------- */}
      <header className="rr-hero" ref={heroRef}>
        <div className="rr-hero-img">
          <Image
            src={`${BASE}/hero-patan-aerial.jpeg`}
            alt="Patan Durbar Square at golden hour, the Himalaya rising behind Kathmandu"
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "60% 42%" }}
          />
        </div>
        <div className="rr-hero-scrim" />
        <div className="rr-hero-inner">
          <div className="rr-wrap rr-hero-grid">
            <div>
              <h1>
                <span>Return</span>
                <span>to Roots</span>
              </h1>
              <p className="rr-sub">Reparenting, Ayurveda and Somatic Retreat</p>
              <div className="rr-hero-meta">
                <div style={{ width: 46, height: 1, background: "rgba(247,242,231,0.5)", margin: "22px 0" }} />
                <div>October 15–19, 2026</div>
                <div>Kathmandu, Nepal</div>
                <div style={{ width: 46, height: 1, background: "rgba(247,242,231,0.5)", margin: "22px 0" }} />
              </div>
              <p className="rr-hero-tag">
                A deeper connection to yourself.
                <br />A kinder way forward.
              </p>
            </div>

            <div className="rr-hero-verbs">
              <span>Reconnect</span>
              <span>Heal</span>
              <span>Nourish</span>
              <span>Belong</span>
              <div className="rr-vline" />
            </div>
          </div>

          <div className="rr-wrap">
            <div className="rr-hero-themes">
              <span>Ayurveda</span>
              <span>Somatic practices</span>
              <span>Inner child healing</span>
              <span>Culture &amp; nature</span>
              <span>Community</span>
            </div>
          </div>
        </div>
      </header>

      {/* ---------------- INTRO ---------------- */}
      <section className="rr-sec" id="retreat">
        <div className="rr-wrap rr-rev">
          <div className="rr-sec-head">
            <span className="rr-eyebrow">Four nights · five days</span>
            <h2>Five days built around coming back to yourself.</h2>
            <p className="rr-lede">
              Not a course to complete or a version of you to fix. A held, unhurried week in the
              Kathmandu valley — through the body, through stillness, through food, forest and the
              company of a small group of people doing the same thing.
            </p>
          </div>
        </div>

        <div className="rr-pillars rr-rev">
          {PILLARS.map((p) => (
            <article className="rr-pillar" key={p.title}>
              <div className="n">{p.n}</div>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ---------------- QUOTE BAND ---------------- */}
      <section className="rr-band rr-sec">
        <div className="rr-narrow rr-rev" style={{ textAlign: "center" }}>
          <span className="rr-eyebrow">Why now</span>
          <p className="rr-quote" style={{ marginTop: 26 }}>
            “Most of us are not tired from doing too much. We are tired from carrying it alone.”
          </p>
        </div>
      </section>

      {/* ---------------- THREADS ---------------- */}
      <section className="rr-sec">
        <div className="rr-wrap">
          <div className="rr-sec-head rr-rev">
            <span className="rr-eyebrow">What the retreat brings together</span>
            <h2>Six threads, woven across five days.</h2>
          </div>
          <div className="rr-threads rr-rev">
            {THREADS.map((t) => (
              <article className="rr-thread" key={t.title}>
                <h3>{t.title}</h3>
                <p>{t.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- PLACE ---------------- */}
      <section className="rr-sec" id="place" style={{ background: "var(--paper-2)" }}>
        <div className="rr-wrap rr-split rr-rev">
          <div className="rr-stack">
            <figure className="rr-figure">
              <Image src={`${BASE}/venue.jpeg`} alt="The retreat venue among old trees" width={1024} height={683} />
            </figure>
            <figure className="rr-figure">
              <Image src={`${BASE}/deer.jpeg`} alt="Spotted deer crossing the grass" width={1280} height={900} />
            </figure>
            <figure className="rr-figure">
              <Image src={`${BASE}/pool.jpeg`} alt="The indoor pool at the venue" width={1280} height={853} />
            </figure>
          </div>
          <div>
            <span className="rr-eyebrow">The place</span>
            <h2 style={{ fontSize: "clamp(34px,5vw,58px)", lineHeight: 1.05, margin: "18px 0 22px" }}>
              Forest on one side. A living old city on the other.
            </h2>
            <p className="rr-lede" style={{ marginBottom: 22 }}>
              The retreat sits in the green edge of the Kathmandu valley — old trees, wide lawns,
              deer at dawn, and a valley to walk in silence before breakfast.
            </p>
            <p className="rr-lede">
              One full day belongs to the city: a mindful walk through Boudhanath or Swayambhunath,
              lunch in the old streets, and the drive back with the mountains ahead of you.
            </p>
            <p className="rr-note" style={{ marginTop: 26 }}>
              Exact venue, rooms and transfers confirmed with your booking.
            </p>
          </div>
        </div>
      </section>

      {/* ---------------- GALLERY ---------------- */}
      <section className="rr-sec">
        <div className="rr-wrap">
          <div className="rr-sec-head rr-rev">
            <span className="rr-eyebrow">Gallery</span>
            <h2>Where you will be.</h2>
          </div>
          <div className="rr-gal rr-rev">
            {GALLERY.map((g, i) => (
              <button key={g.src} className={g.cls} onClick={() => setLightbox(i)} aria-label={`Open ${g.cap}`}>
                <Image src={g.src} alt={g.alt} width={1200} height={800} />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- DAYS ---------------- */}
      <section className="rr-sec" id="days" style={{ paddingTop: 0 }}>
        <div className="rr-wrap">
          <div className="rr-sec-head rr-rev">
            <span className="rr-eyebrow">The rhythm</span>
            <h2>How the days move.</h2>
            <p className="rr-lede">
              Mornings practise, afternoons open, evenings gather. The full hour-by-hour programme
              lives on its own page.
            </p>
          </div>
        </div>
        <div className="rr-days rr-rev">
          {DAYS.map((d) => (
            <article className="rr-day" key={d.d}>
              <div className="d">{d.d}</div>
              <h3>{d.title}</h3>
              <p>{d.body}</p>
            </article>
          ))}
        </div>
        <div className="rr-wrap rr-rev" style={{ marginTop: 44 }}>
          <Link className="rr-btn" href={`/draft/return-to-roots-editorial/itinerary`}>
            See the full itinerary <span aria-hidden>→</span>
          </Link>
        </div>
      </section>

      {/* ---------------- INCLUDED ---------------- */}
      <section className="rr-sec rr-band" id="included">
        <div className="rr-wrap">
          <div className="rr-sec-head rr-rev">
            <span className="rr-eyebrow">What is included</span>
            <h2>Everything from the welcome tea to the last blessing.</h2>
          </div>
          <ul className="rr-incl rr-rev" style={{ borderTop: "1px solid rgba(241,234,220,0.18)" }}>
            {INCLUDED.map((x) => (
              <li key={x} style={{ borderColor: "rgba(241,234,220,0.18)" }}>
                {x}
              </li>
            ))}
          </ul>
          <p className="rr-note rr-rev" style={{ marginTop: 26, color: "rgba(241,234,220,0.6)" }}>
            Flights, visa, travel insurance and personal spending are not included.
          </p>
        </div>
      </section>

      {/* ---------------- FACTS ---------------- */}
      <section className="rr-sec" style={{ paddingBottom: 0 }}>
        <div className="rr-wrap">
          <div className="rr-facts rr-rev">
            {FACTS.map((f) => (
              <dl className="rr-fact" key={f.dt}>
                <dt>{f.dt}</dt>
                <dd className="serif">
                  {f.dd}
                  <small>{f.small}</small>
                </dd>
              </dl>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- APPLY ---------------- */}
      <section className="rr-sec" id="apply">
        <div className="rr-wrap rr-split rr-rev" style={{ alignItems: "start" }}>
          <div>
            <span className="rr-eyebrow">Request a place</span>
            <h2 style={{ fontSize: "clamp(34px,5vw,58px)", lineHeight: 1.05, margin: "18px 0 22px" }}>
              Tell us a little, and we will write back.
            </h2>
            <p className="rr-lede">
              The circle is deliberately small, so we read every note ourselves. Leave your details
              and we will send you the full programme, the venue, pricing and how to hold a room.
            </p>
            <figure className="rr-figure" style={{ marginTop: 34, aspectRatio: "4/3" }}>
              <Image
                src={`${BASE}/swayambhunath.jpeg`}
                alt="Swayambhunath stupa with prayer flags"
                width={1200}
                height={800}
              />
            </figure>
          </div>

          {sent ? (
            <div className="rr-thanks">
              <h3 className="serif">Thank you.</h3>
              <p className="rr-note">
                Your note is with us. We usually reply within two days — do check the spam folder if
                it goes quiet.
              </p>
            </div>
          ) : (
            <form
              className="rr-form"
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
            >
              <div className="rr-field">
                <label htmlFor="rr-name">Your name</label>
                <input id="rr-name" name="name" required autoComplete="name" />
              </div>
              <div className="rr-field">
                <label htmlFor="rr-email">Email</label>
                <input id="rr-email" name="email" type="email" required autoComplete="email" />
              </div>
              <div className="rr-field">
                <label htmlFor="rr-country">Travelling from</label>
                <input id="rr-country" name="country" placeholder="City or country" />
              </div>
              <div className="rr-field">
                <label htmlFor="rr-people">Places wanted</label>
                <select id="rr-people" name="people" defaultValue="1">
                  <option value="1">Just me</option>
                  <option value="2">Two</option>
                  <option value="3+">Three or more</option>
                </select>
              </div>
              <div className="rr-field full">
                <label htmlFor="rr-why">What brings you to this retreat?</label>
                <textarea id="rr-why" name="why" placeholder="A few sentences is plenty." />
              </div>
              <div className="rr-field full">
                <label htmlFor="rr-notes">Anything we should know</label>
                <textarea
                  id="rr-notes"
                  name="notes"
                  placeholder="Dietary needs, injuries, first time on a retreat…"
                />
              </div>
              <div className="full" style={{ display: "flex", flexWrap: "wrap", gap: 20, alignItems: "center" }}>
                <button className="rr-btn" type="submit">
                  Send request <span aria-hidden>→</span>
                </button>
                <span className="rr-note" style={{ maxWidth: "34ch" }}>
                  No payment now. Requesting a place does not commit you to anything.
                </span>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* ---------------- FOOTER ---------------- */}
      <footer className="rr-foot">
        <div className="rr-wrap rr-foot-row">
          <div>
            <div className="serif" style={{ fontSize: 22 }}>Return to Roots</div>
            <div style={{ marginTop: 6 }}>October 15–19, 2026 · Kathmandu, Nepal</div>
          </div>
          <div style={{ display: "flex", gap: 26, flexWrap: "wrap" }}>
            <a href="#retreat">The retreat</a>
            <Link href="/draft/return-to-roots-editorial/itinerary">Itinerary</Link>
            <a href="#apply">Request a place</a>
          </div>
        </div>
      </footer>

      <div className="rr-draft">
        <span>Draft 2 · concept only</span>
        <span>
          Built by <Link href="/">Miki Stec</Link>
        </span>
      </div>

      {lightbox !== null && (
        <div className="rr-lightbox" onClick={() => setLightbox(null)} role="dialog" aria-modal="true">
          <button className="x" aria-label="Close" onClick={() => setLightbox(null)}>
            ×
          </button>
          <Image
            src={GALLERY[lightbox].src}
            alt={GALLERY[lightbox].alt}
            width={1600}
            height={1100}
            style={{ width: "auto", height: "auto" }}
          />
          <div className="cap">{GALLERY[lightbox].cap}</div>
        </div>
      )}
    </div>
  );
}
