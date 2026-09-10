import Link from "next/link";
import { DAYS } from "../itinerary/data";
import { css } from "./styles";

/**
 * The five-column programme. Rendered by BOTH /itinerary2 and the landing page,
 * so the two can never drift apart.
 *   standalone -> its own page (back link, closing band, footer)
 *   embedded   -> a section inside the landing page (one link out)
 */
export function Programme({ standalone = false }: { standalone?: boolean }) {
  const Title = (standalone ? "h1" : "h2") as "h1" | "h2";
  const DayTitle = (standalone ? "h2" : "h3") as "h2" | "h3";
  const SlotTitle = (standalone ? "h3" : "h4") as "h3" | "h4";
  const CloseTitle = (standalone ? "h2" : "h3") as "h2" | "h3";

  return (
    <div className={standalone ? "i2" : "i2 i2-embed"}>
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <header className="i2-head">
        <div className="i2-col">
          {standalone && (
            <Link className="i2-back" href="/draft/return-to-roots">
              <span aria-hidden>←</span> Return to Roots
            </Link>
          )}
          <div className="i2-headline">
            <div>
              <span className="i2-eye">Kathmandu · 15–19 October 2026</span>
              <Title className="i2-title">The five days</Title>
            </div>
            <p className="i2-lede">
              A rhythm, not a timetable. Times move with the weather and the group — the shape of
              each day stays. Four nights, five days.
            </p>
          </div>
        </div>
      </header>

      {!standalone && (
        <div className="i2-col i2-brief">
          <ol className="i2-brieflist">
            {DAYS.map((d) => (
              <li key={d.id}>
                <span className="i2-dayn">
                  Day {d.n} · {d.meta}
                </span>
                <DayTitle className="i2-daytitle">{d.title}</DayTitle>
                <p className="i2-daysum">{d.summary}</p>
              </li>
            ))}
          </ol>
        </div>
      )}

      <div className="i2-col i2-gridwrap">
        <div className="i2-grid">
          {DAYS.map((d) => (
            <section className="i2-day" key={d.id}>
              <div className="i2-dayhead">
                <div className="i2-dayn">
                  Day {d.n} · {d.meta}
                </div>
                <DayTitle className="i2-daytitle">{d.title}</DayTitle>
                <p className="i2-daysum">{d.summary}</p>
              </div>

              {d.slots.map((s) => (
                <article className="i2-slot" key={s.time + s.title}>
                  <div className="i2-time">{s.time}</div>
                  <SlotTitle className="i2-slottitle">{s.title}</SlotTitle>
                  {s.body && <p className="i2-desc">{s.body}</p>}
                  {s.sub && (
                    <ul className="i2-sub">
                      {s.sub.map((x) => (
                        <li key={x.time}>
                          <span className="t">{x.time}</span>
                          <span className="x">{x.text}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </article>
              ))}
            </section>
          ))}
        </div>
      </div>

      {standalone ? (
        <>
          <section className="i2-close">
            <div className="i2-col i2-close-in">
              <div>
                <CloseTitle className="i2-closetitle">Four nights. Five days.</CloseTitle>
                <p>Everything above is included, from the welcome tea to the final blessing.</p>
              </div>
              <Link className="i2-btn" href="/draft/return-to-roots#apply">
                Join <span aria-hidden>→</span>
              </Link>
            </div>
          </section>

          <footer className="i2-col i2-foot">
            <span>Return to Roots · Kathmandu, Nepal · 15–19 October 2026</span>
            <Link href="/draft/return-to-roots/itinerary">See the list version</Link>
          </footer>

          <div className="i2-draft">
            <span>Draft 2 · itinerary · columns</span>
            <span>
              Built by <Link href="/">Miki Stec</Link>
            </span>
          </div>
        </>
      ) : (
        <div className="i2-col i2-embed-out">
          <Link className="i2-btn" href="/draft/return-to-roots/itinerary2">
            See the full day-by-day itinerary <span aria-hidden>→</span>
          </Link>
        </div>
      )}
    </div>
  );
}
