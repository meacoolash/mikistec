import Link from "next/link";

export const metadata = { title: "Drafts" };

type Entry = {
  name: string;
  href: string;
  status?: string;
  note: string;
  pages?: { label: string; href: string; note: string }[];
};

const PROJECTS: { project: string; meta: string; entries: Entry[] }[] = [
  {
    project: "Return to Roots",
    meta: "Reparenting, Ayurveda & Somatic Retreat · Kathmandu · 15–19 Oct 2026",
    entries: [
      {
        name: "Return to Roots",
        href: "/draft/return-to-roots",
        status: "Main",
        note: "Minimal, StoryBrand-structured landing page. Bone / night / saffron bands, breathing hero, photo marquee.",
        pages: [
          {
            label: "Itinerary — columns",
            href: "/draft/return-to-roots/itinerary2",
            note: "Five days as five columns. The one linked from the page.",
          },
          {
            label: "Itinerary — list",
            href: "/draft/return-to-roots/itinerary",
            note: "The same programme as one running list. Alternative.",
          },
        ],
      },
      {
        name: "Return to Roots — editorial",
        href: "/draft/return-to-roots-editorial",
        note: "Long-form editorial concept. Terracotta and cream, poster-style hero, gallery with lightbox.",
        pages: [
          {
            label: "Itinerary",
            href: "/draft/return-to-roots-editorial/itinerary",
            note: "Hour-by-hour, in the editorial styling.",
          },
        ],
      },
      {
        name: "Return to Roots — serif",
        href: "/draft/return-to-roots-serif",
        note: "Warm serif concept with a fixed nav and a full What's-included section.",
        pages: [
          {
            label: "Itinerary",
            href: "/draft/return-to-roots-serif/itinerary",
            note: "Day-by-day schedule.",
          },
        ],
      },
      {
        name: "Return to Roots — bold",
        href: "/draft/return-to-roots-bold",
        note: "Closest to the mikistec.com house style: heavy display type, tight centred column.",
      },
    ],
  },
];

export default function DraftList() {
  return (
    <div className="dl">
      <style
        dangerouslySetInnerHTML={{
          __html: `
.dl {
  --ink: #000; --grey: #5A5A5A; --rule: #DCDCDC;
  background: #fff; color: var(--ink);
  font-family: var(--rr-sans), ui-sans-serif, system-ui, sans-serif;
  font-weight: 300; -webkit-font-smoothing: antialiased;
  min-height: 100svh; padding-bottom: 90px;
}
.dl *, .dl *::before, .dl *::after { box-sizing: border-box; }
.dl h1, .dl h2, .dl h3 { margin: 0; font-weight: 400; }
.dl p { margin: 0; }
.dl-col { max-width: 1000px; margin: 0 auto; padding-inline: 28px; }

.dl-head { padding: 44px 0 30px; border-bottom: 2px solid var(--ink); }
.dl-eye { display: block; font-size: 11px; letter-spacing: 0.26em; text-transform: uppercase; color: var(--grey); }
.dl-head h1 { margin-top: 14px; font-size: clamp(2rem, 1.4rem + 2.4vw, 3rem); line-height: 1; letter-spacing: -0.035em; }
.dl-head p { margin-top: 14px; font-size: 14.5px; line-height: 1.55; color: var(--grey); max-width: 62ch; }

.dl-proj { padding-top: 44px; }
.dl-proj > header { padding-bottom: 12px; border-bottom: 1.5px solid var(--ink); }
.dl-proj h2 { font-size: 22px; letter-spacing: -0.028em; }
.dl-proj header p { margin-top: 6px; font-size: 12.5px; letter-spacing: 0.02em; color: var(--grey); }

.dl-item { padding: 22px 0; border-bottom: 1px solid var(--rule); }
.dl-item-top { display: grid; gap: 8px 28px; align-items: baseline; }
@media (min-width: 780px) { .dl-item-top { grid-template-columns: 300px 1fr; } }
.dl-name { display: flex; align-items: baseline; gap: 12px; flex-wrap: wrap; }
.dl-name a { font-size: 21px; line-height: 1.15; letter-spacing: -0.026em; color: var(--ink); text-decoration: none; }
.dl-name a:hover { text-decoration: underline; text-underline-offset: 4px; }
.dl-tag { font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase; background: var(--ink); color: #fff; padding: 3px 8px; }
.dl-note { font-size: 14px; line-height: 1.55; color: var(--grey); max-width: 60ch; }
.dl-url { margin-top: 4px; font-size: 12px; color: #9A9A9A; font-variant-numeric: tabular-nums; }

.dl-sub { margin: 16px 0 0; padding: 0; list-style: none; display: grid; gap: 0; }
@media (min-width: 780px) { .dl-sub { margin-left: 328px; } }
.dl-sub li { display: grid; gap: 4px 20px; padding: 11px 0; border-top: 1px dotted var(--rule); }
@media (min-width: 600px) { .dl-sub li { grid-template-columns: 220px 1fr; align-items: baseline; } }
.dl-sub a { font-size: 15px; color: var(--ink); text-decoration: none; }
.dl-sub a:hover { text-decoration: underline; text-underline-offset: 4px; }
.dl-sub p { font-size: 13px; line-height: 1.5; color: var(--grey); }

.dl-foot { margin-top: 52px; border-top: 1px solid var(--rule); padding-top: 20px;
  font-size: 12px; line-height: 1.7; color: var(--grey); }
.dl-foot code { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 11.5px; color: var(--ink); }
`,
        }}
      />

      <div className="dl-col">
        <header className="dl-head">
          <span className="dl-eye">Miki Stec · work in progress</span>
          <h1>Drafts</h1>
          <p>
            Concept pages, not live sites. Nothing here is indexed and nothing here is final — each
            entry is one direction we can take, with its sub-pages listed underneath.
          </p>
        </header>

        {PROJECTS.map((p) => (
          <section className="dl-proj" key={p.project}>
            <header>
              <h2>{p.project}</h2>
              <p>{p.meta}</p>
            </header>

            {p.entries.map((e) => (
              <article className="dl-item" key={e.href}>
                <div className="dl-item-top">
                  <div>
                    <div className="dl-name">
                      <Link href={e.href}>{e.name}</Link>
                      {e.status && <span className="dl-tag">{e.status}</span>}
                    </div>
                    <div className="dl-url">{e.href}</div>
                  </div>
                  <p className="dl-note">{e.note}</p>
                </div>

                {e.pages && (
                  <ul className="dl-sub">
                    {e.pages.map((s) => (
                      <li key={s.href}>
                        <Link href={s.href}>{s.label}</Link>
                        <p>{s.note}</p>
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </section>
        ))}

        <footer className="dl-foot">
          Every draft lives at <code>/draft/&lt;name&gt;</code>, its sub-pages under it. This index is{" "}
          <code>/draft/list</code>. Images sit in <code>public/draft/&lt;name&gt;/</code>.
        </footer>
      </div>
    </div>
  );
}
