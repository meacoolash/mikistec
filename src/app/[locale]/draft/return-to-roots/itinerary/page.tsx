import Link from "next/link";
import { css } from "./styles";
import { DAYS } from "./data";

export const metadata = { title: "The five days · Return to Roots" };

export default function Itinerary() {
  return (
    <div className="it">
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <header className="it-head">
        <div className="it-col">
          <Link className="it-back" href="/draft/return-to-roots">
            <span aria-hidden>←</span> Return to Roots
          </Link>
          <div className="it-headline">
            <div>
              <span className="it-eye">Kathmandu · 15–19 October 2026</span>
              <h1>The five days</h1>
            </div>
            <p className="it-lede">
              A rhythm, not a timetable. Times move with the weather and the group — the shape of
              each day stays.
            </p>
          </div>
        </div>
      </header>

      <main className="it-prog">
        <div className="it-col">
          {DAYS.map((d) => (
            <section className="it-day" key={d.id} aria-labelledby={`${d.id}-t`}>
              <div className="it-dayhead">
                <div className="it-dayn">
                  Day {d.n} · {d.meta}
                </div>
                <h2 id={`${d.id}-t`}>{d.title}</h2>
                <p className="it-daysum">{d.summary}</p>
              </div>

              {d.slots.map((s) => (
                <article className="it-row" key={s.time + s.title}>
                  <div className="it-time">{s.time}</div>
                  <h3 className="it-title">{s.title}</h3>
                  {s.sub ? (
                    <ul className="it-sub">
                      {s.sub.map((x) => (
                        <li key={x.time}>
                          <span className="t">{x.time}</span>
                          <span className="x">{x.text}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="it-desc">{s.body ?? ""}</p>
                  )}
                </article>
              ))}
            </section>
          ))}
        </div>
      </main>

      <section className="it-close">
        <div className="it-col it-close-in">
          <div>
            <h2>Four nights. Five days.</h2>
            <p>Everything above is included, from the welcome tea to the final blessing.</p>
          </div>
          <Link className="it-btn" href="/draft/return-to-roots#apply">
            Join <span aria-hidden>&rarr;</span>
          </Link>
        </div>
      </section>

      <footer className="it-col it-foot">
        <span>Return to Roots · Kathmandu, Nepal · 15–19 October 2026</span>
        <Link href="/draft/return-to-roots">Back to the retreat</Link>
      </footer>

      <div className="it-draft">
        <span>Draft 2 · itinerary</span>
        <span>
          Built by <Link href="/">Miki Stec</Link>
        </span>
      </div>
    </div>
  );
}
