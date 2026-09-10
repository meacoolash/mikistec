export const css = `
.rr {
  --paper: #F5EFE4;
  --paper-2: #EDE4D4;
  --ink: #221C17;
  --ink-soft: #5B5147;
  --clay: #A9542F;
  --clay-soft: #C9784E;
  --deep: #22303C;
  --line: rgba(34,28,23,0.16);
  background: var(--paper);
  color: var(--ink);
  font-family: var(--rr-sans), ui-sans-serif, system-ui, sans-serif;
  font-weight: 300;
  -webkit-font-smoothing: antialiased;
}
.rr h1, .rr h2, .rr h3, .rr .serif {
  font-family: var(--rr-display), Georgia, serif;
  font-weight: 300;
  letter-spacing: -0.01em;
}
.rr ::selection { background: var(--clay); color: var(--paper); }

.rr-wrap { max-width: 1180px; margin: 0 auto; padding-inline: 24px; }
.rr-narrow { max-width: 760px; margin: 0 auto; padding-inline: 24px; }

.rr-eyebrow {
  font-size: 11px; letter-spacing: 0.34em; text-transform: uppercase;
  font-weight: 400; color: var(--clay);
}
.rr-rule { width: 46px; height: 1px; background: currentColor; opacity: 0.5; }

/* ---------- NAV ---------- */
.rr-nav {
  position: fixed; inset: 0 0 auto 0; z-index: 50;
  display: flex; align-items: center; justify-content: space-between;
  gap: 16px; padding: 16px 24px;
  transition: background 400ms ease, box-shadow 400ms ease, color 400ms ease;
  color: #F5EFE4;
}
.rr-nav[data-solid="true"] {
  background: rgba(245,239,228,0.94);
  backdrop-filter: blur(10px);
  box-shadow: 0 1px 0 var(--line);
  color: var(--ink);
}
.rr-nav-mark { font-size: 13px; letter-spacing: 0.28em; text-transform: uppercase; }
.rr-nav-links { display: none; gap: 30px; }
@media (min-width: 900px) { .rr-nav-links { display: flex; } }
.rr-nav-links a {
  font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase;
  opacity: 0.8; text-decoration: none; color: inherit; padding-bottom: 2px;
  border-bottom: 1px solid transparent; transition: opacity 200ms, border-color 200ms;
}
.rr-nav-links a:hover { opacity: 1; border-color: currentColor; }
.rr-nav-cta {
  font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase;
  border: 1px solid currentColor; padding: 9px 18px; border-radius: 999px;
  text-decoration: none; color: inherit; transition: background 250ms, color 250ms;
  white-space: nowrap;
}
.rr-nav-cta:hover { background: var(--clay); border-color: var(--clay); color: var(--paper); }

/* ---------- HERO ---------- */
.rr-hero { position: relative; min-height: 100svh; display: flex; align-items: flex-end;
  overflow: hidden; background: var(--deep); }
.rr-hero-img { position: absolute; inset: 0; }
.rr-hero-img img { width: 100%; height: 100%; object-fit: cover; object-position: 60% 42%;
  animation: rr-drift 26s ease-in-out infinite alternate; }
@keyframes rr-drift { from { transform: scale(1.06); } to { transform: scale(1.14); } }
@media (prefers-reduced-motion: reduce) { .rr-hero-img img { animation: none; transform: scale(1.06); } }
.rr-hero-scrim {
  position: absolute; inset: 0;
  background:
    linear-gradient(to right, rgba(20,28,36,0.82) 0%, rgba(20,28,36,0.5) 42%, rgba(20,28,36,0.12) 72%),
    linear-gradient(to top, rgba(20,28,36,0.75) 0%, rgba(20,28,36,0) 45%);
}
.rr-hero-inner { position: relative; width: 100%; padding: 120px 0 56px; }
.rr-hero-grid { display: grid; gap: 40px; }
@media (min-width: 1000px) { .rr-hero-grid { grid-template-columns: minmax(0,1fr) auto; align-items: start; } }
.rr-hero h1 {
  color: #F7F2E7; font-size: clamp(58px, 13.5vw, 168px); line-height: 0.84;
  margin: 0 0 26px; letter-spacing: -0.025em; text-wrap: balance;
}
.rr-hero h1 span { display: block; }
.rr-hero h1 span:last-child { padding-left: 0.06em; }
.rr-sub {
  color: rgba(247,242,231,0.9); font-size: clamp(12px, 1.5vw, 15px);
  letter-spacing: 0.28em; text-transform: uppercase; line-height: 1.8; max-width: 22ch;
}
.rr-hero-meta { color: rgba(247,242,231,0.92); margin-top: 26px; }
.rr-hero-meta div { font-size: clamp(13px,1.6vw,16px); letter-spacing: 0.2em; text-transform: uppercase; line-height: 1.9; }
.rr-hero-tag {
  font-family: var(--rr-display), Georgia, serif; font-style: italic;
  font-size: clamp(19px, 2.4vw, 27px); line-height: 1.35; color: rgba(247,242,231,0.94);
  margin-top: 26px; max-width: 18ch;
}
.rr-hero-verbs { display: flex; flex-direction: column; gap: 6px; align-items: flex-start; }
@media (min-width: 1000px) { .rr-hero-verbs { align-items: flex-end; } }
.rr-hero-verbs span {
  color: rgba(247,242,231,0.88); font-size: 12px; letter-spacing: 0.42em; text-transform: uppercase;
}
.rr-hero-verbs .rr-vline { width: 1px; height: 58px; background: rgba(247,242,231,0.5); margin-top: 12px; }
.rr-hero-themes {
  margin-top: 54px; display: flex; flex-wrap: wrap; gap: 10px 22px;
  color: rgba(247,242,231,0.8); font-size: 10.5px; letter-spacing: 0.28em; text-transform: uppercase;
}
.rr-hero-themes span { display: inline-flex; align-items: center; gap: 22px; }
.rr-hero-themes span::after { content: ""; width: 3px; height: 3px; border-radius: 50%; background: currentColor; opacity: 0.7; }
.rr-hero-themes span:last-child::after { display: none; }

/* ---------- SECTION SHELL ---------- */
.rr-sec { padding: clamp(72px, 10vw, 132px) 0; }
.rr-sec-head { display: grid; gap: 18px; margin-bottom: 52px; }
.rr-sec-head h2 { font-size: clamp(34px, 5.2vw, 62px); line-height: 1.03; margin: 0; max-width: 20ch; }
.rr-lede { font-size: clamp(17px,2vw,21px); line-height: 1.65; color: var(--ink-soft); max-width: 60ch; font-weight: 300; }

/* ---------- PILLARS ---------- */
.rr-pillars { display: grid; gap: 1px; background: var(--line); border-block: 1px solid var(--line); }
@media (min-width: 760px) { .rr-pillars { grid-template-columns: repeat(4, 1fr); } }
.rr-pillar { background: var(--paper); padding: 40px 26px 44px; transition: background 300ms ease; }
.rr-pillar:hover { background: var(--paper-2); }
.rr-pillar .n { font-size: 11px; letter-spacing: 0.3em; color: var(--clay); }
.rr-pillar h3 { font-size: clamp(30px,3.4vw,40px); margin: 16px 0 12px; }
.rr-pillar p { color: var(--ink-soft); line-height: 1.7; font-size: 15.5px; margin: 0; }

/* ---------- THREADS ---------- */
.rr-threads { display: grid; gap: 34px 46px; }
@media (min-width: 700px) { .rr-threads { grid-template-columns: repeat(2, 1fr); } }
@media (min-width: 1050px) { .rr-threads { grid-template-columns: repeat(3, 1fr); } }
.rr-thread { border-top: 1px solid var(--line); padding-top: 20px; }
.rr-thread h3 { font-size: 27px; margin: 0 0 10px; }
.rr-thread p { color: var(--ink-soft); line-height: 1.72; font-size: 15.5px; margin: 0; }

/* ---------- BANDS ---------- */
.rr-band { background: var(--deep); color: #F1EADC; }
.rr-band .rr-lede { color: rgba(241,234,220,0.78); }
.rr-band .rr-eyebrow { color: var(--clay-soft); }
.rr-quote {
  font-family: var(--rr-display), Georgia, serif; font-style: italic;
  font-size: clamp(27px, 4.4vw, 52px); line-height: 1.28; text-wrap: balance; margin: 0;
}

/* ---------- SPLIT ---------- */
.rr-split { display: grid; gap: 44px; align-items: center; }
@media (min-width: 900px) { .rr-split { grid-template-columns: 1.05fr 1fr; gap: 72px; } }
.rr-figure { position: relative; overflow: hidden; }
.rr-figure img { width: 100%; height: 100%; object-fit: cover; display: block;
  transition: transform 900ms cubic-bezier(.2,.7,.2,1); }
.rr-figure:hover img { transform: scale(1.045); }
.rr-stack { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.rr-stack .rr-figure:first-child { grid-column: 1 / -1; aspect-ratio: 16/9; }
.rr-stack .rr-figure { aspect-ratio: 4/3; }

/* ---------- FACTS ---------- */
.rr-facts { display: grid; gap: 1px; background: var(--line); border: 1px solid var(--line); }
@media (min-width: 640px) { .rr-facts { grid-template-columns: repeat(2,1fr); } }
@media (min-width: 980px) { .rr-facts { grid-template-columns: repeat(4,1fr); } }
.rr-fact { background: var(--paper); padding: 30px 24px; }
.rr-fact dt { font-size: 10.5px; letter-spacing: 0.3em; text-transform: uppercase; color: var(--clay); }
.rr-fact dd { margin: 12px 0 0; font-family: var(--rr-display), Georgia, serif; font-size: 27px; line-height: 1.2; }
.rr-fact dd small { display: block; font-family: var(--rr-sans); font-size: 13px; letter-spacing: 0.04em; color: var(--ink-soft); margin-top: 6px; }

/* ---------- INCLUDED ---------- */
.rr-incl { columns: 1; column-gap: 56px; list-style: none; padding: 0; margin: 0; }
@media (min-width: 700px) { .rr-incl { columns: 2; } }
.rr-incl li {
  break-inside: avoid; display: flex; gap: 14px; align-items: baseline;
  padding: 13px 0; border-bottom: 1px solid var(--line); font-size: 16px; line-height: 1.5;
}
.rr-incl li::before { content: "—"; color: var(--clay); flex: none; }

/* ---------- GALLERY ---------- */
.rr-gal { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }
@media (min-width: 820px) { .rr-gal { grid-template-columns: repeat(6, 1fr); gap: 14px; } }
.rr-gal button { border: 0; padding: 0; margin: 0; background: none; cursor: zoom-in; overflow: hidden; display: block; }
.rr-gal img { width: 100%; height: 100%; object-fit: cover; display: block;
  transition: transform 800ms cubic-bezier(.2,.7,.2,1), filter 500ms ease; filter: saturate(0.94); }
.rr-gal button:hover img { transform: scale(1.05); filter: saturate(1.05); }
.rr-gal button { aspect-ratio: 1/1; }
@media (min-width: 820px) {
  .rr-gal .g-a { grid-column: span 3; aspect-ratio: 3/2; }
  .rr-gal .g-b { grid-column: span 3; aspect-ratio: 3/2; }
  .rr-gal .g-c { grid-column: span 2; aspect-ratio: 1/1; }
  .rr-gal .g-d { grid-column: span 2; aspect-ratio: 1/1; }
  .rr-gal .g-e { grid-column: span 2; aspect-ratio: 1/1; }
  .rr-gal .g-f { grid-column: span 4; aspect-ratio: 2/1; }
  .rr-gal .g-g { grid-column: span 2; aspect-ratio: 1/1; }
}
.rr-lightbox {
  position: fixed; inset: 0; z-index: 90; background: rgba(18,15,12,0.94);
  display: grid; place-items: center; padding: 24px; cursor: zoom-out;
  animation: rr-fade 260ms ease;
}
@keyframes rr-fade { from { opacity: 0 } to { opacity: 1 } }
.rr-lightbox img { max-width: min(1100px, 94vw); max-height: 86vh; object-fit: contain; }
.rr-lightbox .cap { position: absolute; bottom: 26px; left: 0; right: 0; text-align: center;
  color: rgba(245,239,228,0.7); font-size: 11px; letter-spacing: 0.28em; text-transform: uppercase; }
.rr-lightbox .x { position: absolute; top: 20px; right: 24px; color: rgba(245,239,228,0.8);
  font-size: 26px; background: none; border: 0; cursor: pointer; line-height: 1; }

/* ---------- DAYS TEASER ---------- */
.rr-days { display: grid; gap: 1px; background: var(--line); border-block: 1px solid var(--line); }
@media (min-width: 900px) { .rr-days { grid-template-columns: repeat(5, 1fr); } }
.rr-day { background: var(--paper); padding: 32px 22px 38px; }
.rr-day .d { font-size: 10.5px; letter-spacing: 0.3em; text-transform: uppercase; color: var(--clay); }
.rr-day h3 { font-size: 25px; margin: 14px 0 10px; line-height: 1.2; }
.rr-day p { font-size: 14.5px; line-height: 1.65; color: var(--ink-soft); margin: 0; }

/* ---------- BUTTONS ---------- */
.rr-btn {
  display: inline-flex; align-items: center; gap: 12px; text-decoration: none;
  font-size: 11.5px; letter-spacing: 0.24em; text-transform: uppercase;
  padding: 16px 30px; border-radius: 999px; border: 1px solid var(--clay);
  background: var(--clay); color: #FBF7EF; cursor: pointer;
  transition: background 280ms ease, color 280ms ease, transform 280ms ease;
}
.rr-btn:hover { background: transparent; color: var(--clay); transform: translateY(-1px); }
.rr-btn-ghost { background: transparent; color: inherit; border-color: currentColor; }
.rr-btn-ghost:hover { background: var(--clay); border-color: var(--clay); color: #FBF7EF; }

/* ---------- FORM ---------- */
.rr-form { display: grid; gap: 22px; }
@media (min-width: 720px) { .rr-form { grid-template-columns: 1fr 1fr; } }
.rr-field { display: grid; gap: 8px; }
.rr-field.full { grid-column: 1 / -1; }
.rr-field label { font-size: 10.5px; letter-spacing: 0.26em; text-transform: uppercase; color: var(--ink-soft); }
.rr-field input, .rr-field textarea, .rr-field select {
  font-family: inherit; font-size: 16px; color: var(--ink); background: transparent;
  border: 0; border-bottom: 1px solid var(--line); padding: 10px 2px; outline: none;
  border-radius: 0; transition: border-color 250ms ease;
}
.rr-field input:focus, .rr-field textarea:focus, .rr-field select:focus { border-color: var(--clay); }
.rr-field textarea { resize: vertical; min-height: 96px; }
.rr-note { font-size: 13px; color: var(--ink-soft); line-height: 1.6; }
.rr-thanks { border: 1px solid var(--line); padding: 40px 32px; text-align: center; }
.rr-thanks h3 { font-size: 34px; margin: 0 0 12px; }

/* ---------- FOOTER ---------- */
.rr-foot { background: var(--deep); color: rgba(241,234,220,0.72); padding: 56px 0 40px; font-size: 13px; }
.rr-foot a { color: inherit; }
.rr-foot-row { display: flex; flex-wrap: wrap; gap: 18px 34px; justify-content: space-between; align-items: baseline; }

/* ---------- REVEAL ---------- */
.rr-rev { opacity: 0; transform: translateY(22px); transition: opacity 900ms ease, transform 900ms cubic-bezier(.2,.7,.2,1); }
.rr-rev.in { opacity: 1; transform: none; }
@media (prefers-reduced-motion: reduce) { .rr-rev { opacity: 1; transform: none; } }

/* ---------- DRAFT BAR ---------- */
.rr-draft {
  position: fixed; left: 0; right: 0; bottom: 0; z-index: 60;
  background: var(--ink); color: rgba(245,239,228,0.8);
  font-size: 10.5px; letter-spacing: 0.2em; text-transform: uppercase;
  padding: 9px 24px; display: flex; justify-content: space-between; gap: 16px; flex-wrap: wrap;
}
.rr-draft a { color: var(--clay-soft); }
`;
