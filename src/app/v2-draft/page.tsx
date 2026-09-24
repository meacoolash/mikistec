import Image from "next/image";
import Link from "next/link";
import { css } from "./styles";
import { Scribble } from "./_interactive";
import {
  ABOUT,
  CONTACT,
  FAQ,
  GROW,
  HERO,
  PATHS,
  PROBLEM,
  STEPS,
  STRIP,
} from "./content";

/* Draft badge + switched-off form. Flip to false once the copy is confirmed. */
const DEMO = true;

function Logo() {
  return (
    <Link href="/" className="v2-logo" aria-label="Miki Stec, home">
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path
          d="M16 1l3 9 9-3-6 8 8 5-10 1 1 10-5-8-6 8 1-10-10-1 8-5-6-8 9 3z"
          fill="currentColor"
        />
      </svg>
      <span>
        Miki
        <br />
        Stec
      </span>
    </Link>
  );
}

export default function V2Draft() {
  return (
    <div className="v2">
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <div className="v2-wrap">
        <header className="v2-head">
          <Logo />
          <nav className="v2-nav" aria-label="Main">
            <a className="v2-hide" href="#learn">Learn it</a>
            <a className="v2-hide" href="#build">Done for you</a>
            <a className="v2-hide" href="#about">About</a>
            <a className="v2-fomo" href="#contact">FOMO?</a>
          </nav>
        </header>

        <main>
          {/* Hero */}
          <section className="v2-hero">
            <div className="v2-hero-art">
              <Image
                src="/draft/v2/fomo.jpg"
                alt="A figure crouched with head in hands, surrounded by other people's photos and a clock"
                width={800}
                height={1200}
                priority
              />
            </div>
            <div className="v2-hero-text">
              <p className="v2-eye">{HERO.eyebrow}</p>
              <h1>{HERO.title}</h1>
              <p className="v2-lead">{HERO.lead}</p>
              <a className="v2-btn v2-btn--white" href="#contact">
                {HERO.cta}
              </a>
            </div>
          </section>

          {/* Strip */}
          <section className="v2-strip" aria-labelledby="v2-strip-h">
            <h2 id="v2-strip-h">{STRIP.title}</h2>
            <div>
              <p>{STRIP.body}</p>
              <div className="v2-btns">
                <a className="v2-btn" href="#learn">{STRIP.learn}</a>
                <a className="v2-btn v2-btn--ghost" href="#build">{STRIP.build}</a>
              </div>
            </div>
          </section>

          {/* Problem */}
          <section className="v2-sec">
            <div className="v2-inner v2-problem">
              <div>
                <h2 className="v2-h" style={{ whiteSpace: "pre-line" }}>{PROBLEM.title}</h2>
                <Scribble />
              </div>
              <div className="v2-body">
                {PROBLEM.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
                <div className="v2-btns">
                  <a className="v2-btn" href="#paths">{PROBLEM.primary}</a>
                  <a className="v2-btn v2-btn--ghost" href="#contact">{PROBLEM.secondary}</a>
                </div>
              </div>
            </div>
          </section>

          {/* Two paths */}
          <section id="paths" className="v2-sec v2-sec--tight">
            <div className="v2-sec-head">
              <h2 className="v2-h">Two ways to stop watching</h2>
              <p className="v2-muted">
                Learn to do it yourself, or hand it to me. Either way you end up with something
                live, not a folder of bookmarks.
              </p>
            </div>
            <div className="v2-paths">
              {PATHS.map((p) => (
                <article key={p.id} id={p.id} className={`v2-card v2-card--${p.tone}`}>
                  <div className="v2-card-top">
                    <span className="v2-h3">{p.label}</span>
                    <span className="v2-card-n">{p.n}</span>
                  </div>
                  <h3>{p.title}</h3>
                  <p>{p.body}</p>
                  <ul>
                    {p.points.map((pt) => (
                      <li key={pt}>{pt}</li>
                    ))}
                  </ul>
                  <a className="v2-btn v2-btn--white" href="#contact">
                    {p.cta} <span aria-hidden="true">→</span>
                  </a>
                </article>
              ))}
            </div>
            <div className="v2-grow">
              <span className="v2-h3">{GROW.label}</span>
              <p>{GROW.body}</p>
              <a href={GROW.link.href} target="_blank" rel="noopener noreferrer">
                {GROW.link.label} →
              </a>
            </div>
          </section>

          {/* Steps */}
          <section className="v2-sec v2-sec--tight">
            <div className="v2-sec-head">
              <h2 className="v2-h">How it works</h2>
            </div>
            <ol className="v2-steps" style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {STEPS.map((s) => (
                <li key={s.n} className="v2-step">
                  <span className="v2-step-n">{s.n}</span>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </li>
              ))}
            </ol>
          </section>

          {/* About */}
          <section id="about" className="v2-sec v2-sec--tight">
            <div className="v2-inner v2-about">
              <div className="v2-about-photo">
                <Image src="/miki-portrait.jpg" alt="Miki Stec" width={680} height={680} />
              </div>
              <div>
                <h2 className="v2-h">{ABOUT.title}</h2>
                <ul className="v2-facts">
                  {ABOUT.facts.map((f, i) => (
                    <li key={f}>
                      <span>{String(i + 1).padStart(2, "0")}</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="v2-sec v2-sec--tight">
            <div className="v2-inner v2-about">
              <h2 className="v2-h">Fair questions</h2>
              <div className="v2-faq">
                {FAQ.map((f) => (
                  <details key={f.q}>
                    <summary>{f.q}</summary>
                    <p>{f.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>

          {/* Contact */}
          <section id="contact" className="v2-contact" aria-labelledby="v2-contact-h">
            <div className="v2-contact-in">
              <div>
                <h2 id="v2-contact-h" className="v2-h">{CONTACT.title}</h2>
                <p className="v2-lead">{CONTACT.lead}</p>
              </div>
              <form className="v2-form" action="#" aria-describedby={DEMO ? "v2-demo-note" : undefined}>
                <fieldset>
                  <legend>What do you want?</legend>
                  <div className="v2-choices">
                    {CONTACT.choices.map((c, i) => (
                      <label key={c.value} className="v2-choice" style={{ margin: 0 }}>
                        <input type="radio" name="path" value={c.value} defaultChecked={i === 0} />
                        <span>{c.label}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>
                <div>
                  <label htmlFor="v2-name">Name</label>
                  <input id="v2-name" name="name" type="text" placeholder="Your name" required />
                </div>
                <div>
                  <label htmlFor="v2-email">Email</label>
                  <input id="v2-email" name="email" type="email" placeholder="you@yourbusiness.com" required />
                </div>
                <div>
                  <label htmlFor="v2-msg">What you do, in one line</label>
                  <input id="v2-msg" name="message" type="text" placeholder="e.g. bakery in Paris @mysweetdonut" required />
                </div>
                <div>
                  <button type="submit" className="v2-btn" disabled={DEMO}>
                    {CONTACT.submit} <span aria-hidden="true">→</span>
                  </button>
                  {DEMO && (
                    <p id="v2-demo-note" className="v2-note" style={{ marginTop: 12 }}>
                      {CONTACT.disabledNote}
                    </p>
                  )}
                </div>
              </form>
            </div>
          </section>
        </main>

        <footer className="v2-foot">
          <span>© {new Date().getFullYear()} Miki Stec</span>
          <nav>
            <Link href="/legal/privacy">Privacy</Link>
            <Link href="/legal/terms">Terms</Link>
            <Link href="/legal/cookies">Cookies</Link>
          </nav>
        </footer>
      </div>
    </div>
  );
}
