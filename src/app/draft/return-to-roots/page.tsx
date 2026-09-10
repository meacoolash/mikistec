import Image from "next/image";
import Link from "next/link";
import { css } from "./styles";
import { Programme } from "./itinerary2/Programme";
import { ApplyForm } from "./_ApplyForm";
import { HeroHeadline } from "./_HeroHeadline";
import { Reveal } from "./_Reveal";

const IMG = "/draft/return-to-roots";

const LINE = "You’ve carried it\nlong enough.";
const BRAND = "Return\nto Roots";

/* Photographs used nowhere else on the page — the venue shots live in "The place". */
const GALLERY = [
  { src: `${IMG}/durbar-dusk.jpeg`, alt: "Kathmandu Durbar Square at dusk", big: true },
  { src: `${IMG}/swayambhunath.jpeg`, alt: "Swayambhunath stupa with prayer flags" },
  { src: `${IMG}/forest.jpeg`, alt: "A green valley enclosed by forest" },
  { src: `${IMG}/durbar-square.jpeg`, alt: "Temple courtyards in the old city" },
  { src: `${IMG}/pagoda-roofs.jpeg`, alt: "Pagoda roofs stacked against the sky" },
  { src: `${IMG}/bhaktapur.jpeg`, alt: "A temple square in Bhaktapur", big: true },
  { src: `${IMG}/market-masks.jpeg`, alt: "Masks and beads at a Kathmandu market stall", big: true },
];

const WORDS = [
  { w: "Reconnect", t: "With a body you stopped listening to somewhere around your late twenties." },
  { w: "Heal", t: "Gently. Through somatic practice and a kinder conversation with your younger self." },
  { w: "Nourish", t: "Ayurvedic food cooked for the season, and rest you don't have to earn." },
  { w: "Belong", t: "A circle that opens on the first evening and still writes to each other in December." },
];

const STEPS = [
  { n: "1", h: "Say hello", p: "One short form. No payment, no commitment." },
  { n: "2", h: "We send everything", p: "Programme, venue, rooms, price. You decide in your own time." },
  { n: "3", h: "Arrive", p: "From the welcome tea to the last blessing, the week is held for you." },
];

const FACTS = [
  { k: "Dates", v: "Oct 15–19, 2026" },
  { k: "Length", v: "4 nights, 5 days" },
  { k: "Place", v: "Kathmandu, Nepal" },
  { k: "Circle", v: "Deliberately small" },
];

function Eye({ children }: { children: React.ReactNode }) {
  return <p className="r2-eye">{children}</p>;
}

export default function ReturnToRoots2() {
  return (
    <div className="r2">
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <Reveal />

      {/* ---------- HERO ---------- */}
      <header className="r2-hero">
        <div className="r2-hero-img">
          <Image
            src={`${IMG}/hero-patan-aerial.jpeg`}
            alt="Kathmandu at golden hour with the Himalaya behind"
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "62% 45%" }}
          />
        </div>
        <div className="r2-hero-scrim" />
        <div className="r2-breath" aria-hidden />

        <div className="r2-hero-in">
          <div className="r2-fade" style={{ animationDelay: "1.1s" }}>
            <Eye>Kathmandu · October 2026</Eye>
          </div>

          <HeroHeadline line={LINE} brand={BRAND} />

          <p className="r2-p r2-fade" style={{ animationDelay: "1.25s", opacity: 0 }}>
            Five days in Nepal to set it down — and find your own way back.
          </p>

          <div className="r2-cta-row r2-fade" style={{ animationDelay: "1.45s", opacity: 0 }}>
            <a className="r2-btn" href="#apply">
              Join <span aria-hidden>→</span>
            </a>
            <a className="r2-link r2-only-desk" href="#five-days">
              See the five days
            </a>
            <Link className="r2-link r2-only-mob" href="/draft/return-to-roots/itinerary2">
              See the five days
            </Link>
          </div>
        </div>

        <div className="r2-breath-label" aria-hidden>
          <span className="in">Inhale</span>
          <span className="out">Exhale</span>
        </div>

        <div className="r2-scroll" aria-hidden>
          <i />
        </div>
      </header>

      {/* ---------- PROBLEM ---------- */}
      <section className="r2-band">
        <div className="r2-mid r2-rev">
          <h2 className="r2-h">Rest keeps waiting for a better week.</h2>
          <p className="r2-p">
            You are not tired from doing too much. You are tired from carrying it alone.
          </p>
        </div>
      </section>

      {/* ---------- GUIDE ---------- */}
      <section className="r2-band r2-night">
        <div className="r2-mid r2-rev">
          <Eye>Your guides</Eye>
          <h2 className="r2-h">We hold the week. You just arrive.</h2>
          <p className="r2-p">
            Ayurveda, somatic practice and meditation — taught plainly, in a forest at the edge of
            Kathmandu, with a circle small enough to learn everyone&apos;s name on the first night.
          </p>
        </div>
      </section>

      {/* ---------- ITINERARY (same component as /itinerary2) ---------- */}
      <div id="five-days">
        <Programme />
      </div>

      {/* ---------- PLAN ---------- */}
      <section className="r2-band">
        <div className="r2-mid r2-rev">
          <h2 className="r2-h">How</h2>
          <Eye>Three steps</Eye>
          <div className="r2-steps">
            {STEPS.map((s) => (
              <div className="r2-step" key={s.n}>
                <span className="n">{s.n}</span>
                <div>
                  <h3>{s.h}</h3>
                  <p>{s.p}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="r2-cta-row">
            <a className="r2-btn" href="#apply">
              Join <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </section>

      {/* ---------- PLACE ---------- */}
      <section className="r2-band">
        <div className="r2-place r2-rev">
          <div className="r2-stack">
            <figure>
              <Image src={`${IMG}/venue.jpeg`} alt="The retreat venue among old trees" width={1024} height={683} sizes="(max-width: 980px) 100vw, 560px" />
            </figure>
            <figure>
              <Image src={`${IMG}/deer.jpeg`} alt="Spotted deer crossing the grass at dawn" width={1280} height={900} sizes="(max-width: 980px) 50vw, 280px" />
            </figure>
            <figure>
              <Image src={`${IMG}/pool.jpeg`} alt="The indoor pool at the venue" width={1280} height={853} sizes="(max-width: 980px) 50vw, 280px" />
            </figure>
          </div>
          <div>
            <p className="r2-eye">The place</p>
            <h2>Forest on one side. A living old city on the other.</h2>
            <p className="r2-p">
              Old trees, wide lawns, deer on the grass at dawn, and a valley to walk in silence
              before breakfast.
            </p>
            <p className="r2-p">
              One full day belongs to Kathmandu — a mindful walk through Boudhanath or
              Swayambhunath, lunch in the old streets, the mountains ahead of you on the way back.
            </p>
            <p className="r2-note">Exact venue, rooms and transfers confirmed with your booking.</p>
          </div>
        </div>
      </section>

      {/* ---------- GALLERY ---------- */}
      <section className="r2-band r2-night" aria-label="Photographs from Kathmandu and the valley">
        <div className="r2-gal-wrap">
          <Eye>Kathmandu and the valley</Eye>
          <div className="r2-gal">
            {GALLERY.map((g) => (
              <figure key={g.src} className={g.big ? "big" : undefined}>
                <Image
                  src={g.src}
                  alt={g.alt}
                  width={1280}
                  height={1280}
                  sizes={
                    g.big
                      ? "(max-width: 699px) 100vw, (max-width: 1240px) 48vw, 583px"
                      : "(max-width: 699px) 50vw, (max-width: 1240px) 24vw, 284px"
                  }
                />
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- SUCCESS ---------- */}
      <section className="r2-band r2-night">
        <div className="r2-mid r2-rev">
          <Eye>What you leave with</Eye>
          <h2 className="r2-h">Four words.</h2>
          <div className="r2-words">
            {WORDS.map((x) => (
              <div className="r2-word" key={x.w}>
                <h3>{x.w}</h3>
                <p>{x.t}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- STAKES ---------- */}
      <section className="r2-band r2-saff">
        <div className="r2-mid r2-rev">
          <h2 className="r2-h">Or October passes like the last one.</h2>
          <p className="r2-p" style={{ opacity: 0.78 }}>
            Same weeks, same weight, same promise to rest — moved quietly to next year.
          </p>
        </div>
      </section>

      {/* ---------- FACTS ---------- */}
      <section className="r2-band r2-night" style={{ paddingBlock: "clamp(56px,7vw,88px)" }}>
        <div className="r2-mid r2-rev" style={{ maxWidth: 980 }}>
          <div className="r2-facts">
            {FACTS.map((f) => (
              <div className="r2-fact" key={f.k}>
                <div className="k">{f.k}</div>
                <div className="v">{f.v}</div>
              </div>
            ))}
          </div>
          <a className="r2-link r2-only-desk" href="#five-days" style={{ marginTop: 18 }}>
            The full itinerary
          </a>
          <Link
            className="r2-link r2-only-mob"
            href="/draft/return-to-roots/itinerary2"
            style={{ marginTop: 18 }}
          >
            The full itinerary
          </Link>
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="r2-band" id="apply">
        <div className="r2-mid r2-rev" style={{ maxWidth: 560 }}>
          <ApplyForm />
        </div>
      </section>

      <footer className="r2-foot">
        <div className="serif" style={{ fontSize: 24, letterSpacing: 0, color: "var(--bone)" }}>
          Return to Roots
        </div>
        <div style={{ marginTop: 10 }}>Kathmandu, Nepal · October 15–19, 2026</div>
        <div style={{ marginTop: 18 }}>
          <Link href="/draft/return-to-roots-editorial">The editorial concept</Link>
        </div>
      </footer>

      <div className="r2-draft">
        <span>Draft 2 · concept two</span>
        <span>
          Built by <Link href="/">Miki Stec</Link>
        </span>
      </div>
    </div>
  );
}
