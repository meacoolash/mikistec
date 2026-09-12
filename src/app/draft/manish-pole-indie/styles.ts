export const css = `
.mpi {
  --paper: #F4EFE4;
  --paper-2: #EAE2D2;
  --ink: #191714;
  --riso-blue: #3C5BA9;
  --riso-red: #E4573D;
  --riso-yellow: #E9B949;
  background: var(--paper);
  color: var(--ink);
  font-family: var(--mpi-sans), ui-sans-serif, system-ui, sans-serif;
  font-weight: 300;
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
  position: relative;
}
.mpi *, .mpi *::before, .mpi *::after { box-sizing: border-box; }
.mpi h1, .mpi h2, .mpi h3, .mpi .serif {
  font-family: var(--mpi-display), Georgia, serif;
  font-weight: 400; letter-spacing: -0.015em; margin: 0;
}
.mpi p { margin: 0; }
.mpi ::selection { background: var(--riso-yellow); color: var(--ink); }

/* paper grain over the whole page */
.mpi-grain {
  position: fixed; inset: 0; z-index: 60; pointer-events: none; opacity: 0.4;
  mix-blend-mode: multiply;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='0.32'/%3E%3C/svg%3E");
}

/* ---------- shared ---------- */
.mpi-band { padding: clamp(64px, 9vw, 118px) 20px; position: relative; }
.mpi-wide { max-width: 1160px; margin: 0 auto; }
.mpi-col { max-width: 680px; margin: 0 auto; }
.mpi-lead { font-size: clamp(1rem, 0.96rem + 0.3vw, 1.14rem); line-height: 1.66; opacity: 0.76; }
.mpi-eye {
  display: inline-flex; align-items: center; gap: 9px;
  font-size: 10.5px; letter-spacing: 0.26em; text-transform: uppercase; font-weight: 500;
}
.mpi-eye::before { content: ""; width: 22px; height: 2px; background: var(--riso-red); }
.mpi-h { font-size: clamp(2.4rem, 1.5rem + 4vw, 4.4rem); line-height: 0.98; }
.mpi-h em { font-style: italic; color: var(--riso-blue); }

.mpi-btn {
  display: inline-flex; align-items: center; gap: 10px; cursor: pointer;
  font-family: inherit; font-size: 12px; font-weight: 500; letter-spacing: 0.14em;
  text-transform: uppercase; text-decoration: none;
  padding: 14px 24px; border: 2px solid var(--ink); background: var(--riso-yellow); color: var(--ink);
  box-shadow: 4px 4px 0 var(--ink);
  transition: transform 160ms ease, box-shadow 160ms ease;
}
.mpi-btn:hover { transform: translate(2px, 2px); box-shadow: 2px 2px 0 var(--ink); }
.mpi-btn:active { transform: translate(4px, 4px); box-shadow: 0 0 0 var(--ink); }
.mpi-btn-ghost { background: transparent; }

.mpi-link {
  font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase; color: inherit;
  text-decoration: none; border-bottom: 2px solid var(--riso-red); padding-bottom: 2px;
}

/* ---------- marquee ---------- */
.mpi-marq {
  border-top: 2px solid var(--ink); border-bottom: 2px solid var(--ink);
  background: var(--riso-blue); color: var(--paper);
  overflow: hidden; padding: 9px 0; display: flex;
}
.mpi-marq div { display: flex; gap: 34px; padding-right: 34px; flex: none; animation: mpi-slide 34s linear infinite; }
.mpi-marq span {
  font-size: 11px; letter-spacing: 0.28em; text-transform: uppercase; white-space: nowrap;
  display: inline-flex; gap: 34px;
}
.mpi-marq span::after { content: "✦"; opacity: 0.6; }
@keyframes mpi-slide { from { transform: translateX(0); } to { transform: translateX(-100%); } }

/* ---------- hero ---------- */
.mpi-hero { padding: clamp(30px, 5vw, 56px) 20px clamp(48px, 7vw, 84px); }
.mpi-hero-in { display: grid; gap: clamp(28px, 4vw, 54px); align-items: center; }
@media (min-width: 900px) { .mpi-hero-in { grid-template-columns: 1.05fr 0.95fr; } }
.mpi-hero h1 {
  font-size: clamp(3.4rem, 1.6rem + 10vw, 8rem); line-height: 0.86; letter-spacing: -0.03em;
}
.mpi-hero h1 span { display: block; }
.mpi-hero h1 .mpi-pole { margin-left: clamp(12px, 5vw, 74px); font-style: italic; color: var(--riso-blue); }
.mpi-hero-q {
  font-family: var(--mpi-display), Georgia, serif; font-size: clamp(1.3rem, 1rem + 1.1vw, 1.75rem);
  line-height: 1.34; max-width: 24ch; margin-top: 22px;
}
.mpi-hero-meta {
  margin-top: 24px; display: flex; flex-wrap: wrap; gap: 10px 18px; align-items: center;
  font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; opacity: 0.66;
}
.mpi-stamp {
  position: absolute; top: clamp(8px, 2vw, 26px); right: clamp(12px, 4vw, 60px);
  transform: rotate(9deg); border: 2px solid var(--riso-red); color: var(--riso-red);
  padding: 9px 13px; text-align: center; line-height: 1.15; background: rgba(244,239,228,0.6);
}
.mpi-stamp b { display: block; font-size: 19px; font-weight: 600; letter-spacing: 0.02em; }
.mpi-stamp span { font-size: 8.5px; letter-spacing: 0.24em; text-transform: uppercase; }

/* ---------- breathing orb ---------- */
.mpi-breath { display: flex; flex-direction: column; align-items: center; gap: 18px; }
.mpi-orb {
  position: relative; width: min(100%, 360px); aspect-ratio: 1; display: grid; place-items: center;
}
.mpi-orb i {
  position: absolute; inset: 0; border-radius: 50%; border: 2px solid var(--ink);
  transform: scale(0.62); will-change: transform;
}
.mpi-orb i:nth-child(2) { border-color: var(--riso-blue); opacity: 0.75; }
.mpi-orb i:nth-child(3) { border-color: var(--riso-red); opacity: 0.5; }
.mpi-orb i:nth-child(4) {
  background: var(--riso-yellow); border-color: transparent; opacity: 0.5;
  mix-blend-mode: multiply;
}
.mpi-orb-label {
  position: relative; z-index: 2; text-align: center;
  font-size: 11px; letter-spacing: 0.3em; text-transform: uppercase;
}
.mpi-orb-label b { display: block; font-family: var(--mpi-display), Georgia, serif;
  font-size: 2rem; letter-spacing: 0; text-transform: none; font-weight: 400; margin-bottom: 4px; }
.mpi-breath-note { font-size: 11.5px; letter-spacing: 0.12em; text-transform: uppercase; opacity: 0.55; }
.mpi-count { font-variant-numeric: tabular-nums; }
/* ---------- events ---------- */
.mpi-cards { display: grid; gap: clamp(20px, 3vw, 30px); grid-template-columns: 1fr; }
@media (min-width: 900px) { .mpi-cards { grid-template-columns: 1.25fr 1fr; align-items: start; } }
.mpi-card {
  position: relative; background: var(--paper); border: 2px solid var(--ink);
  box-shadow: 6px 6px 0 var(--ink); padding: clamp(20px, 2.6vw, 30px);
  display: flex; flex-direction: column; gap: 12px;
  transition: transform 220ms cubic-bezier(.2,.7,.2,1), box-shadow 220ms;
}
.mpi-card:hover { transform: translate(-3px, -3px) rotate(-0.4deg); box-shadow: 10px 10px 0 var(--ink); }
.mpi-card h3 { font-size: clamp(1.5rem, 1.2rem + 1vw, 2.1rem); line-height: 1.06; }
.mpi-card-featured h3 { font-size: clamp(1.9rem, 1.3rem + 2vw, 3rem); }
.mpi-card p { font-size: 14.5px; line-height: 1.62; opacity: 0.74; }
.mpi-card-img {
  position: relative; aspect-ratio: 4 / 5; border: 2px solid var(--ink); overflow: hidden;
  margin-bottom: 4px;
}
.mpi-card-img img { object-fit: cover; }
.mpi-kind {
  position: absolute; top: -13px; left: 18px; background: var(--riso-red); color: var(--paper);
  font-size: 9.5px; letter-spacing: 0.24em; text-transform: uppercase; padding: 5px 10px;
  transform: rotate(-1.6deg);
}
.mpi-meta {
  display: flex; flex-wrap: wrap; gap: 4px 12px; font-size: 12px; letter-spacing: 0.04em;
  font-variant-numeric: tabular-nums; border-top: 2px dotted rgba(25,23,20,0.3); padding-top: 12px;
}
.mpi-meta time { font-weight: 600; }
.mpi-meta span::before { content: "·"; margin-right: 12px; opacity: 0.5; }
.mpi-note { font-size: 12.5px; letter-spacing: 0.04em; font-variant-numeric: tabular-nums; opacity: 0.85; }
.mpi-rest { display: grid; gap: clamp(20px, 3vw, 30px); }
.mpi-empty { text-align: center; display: flex; flex-direction: column; align-items: center; gap: 20px; }

/* ---------- collage ---------- */
.mpi-collage {
  position: relative; height: clamp(460px, 58vw, 620px); touch-action: none; overflow: hidden;
  border-top: 2px dashed rgba(25,23,20,0.25); border-bottom: 2px dashed rgba(25,23,20,0.25);
}
.mpi-photo {
  position: absolute; width: clamp(180px, 26vw, 300px); background: var(--paper);
  padding: 10px 10px 38px; border: 2px solid var(--ink); box-shadow: 5px 5px 0 rgba(25,23,20,0.85);
  cursor: grab; user-select: none; touch-action: none;
}
.mpi-photo.is-held { cursor: grabbing; box-shadow: 12px 12px 0 rgba(25,23,20,0.55); }
.mpi-photo figure { position: relative; margin: 0; aspect-ratio: 4 / 3; overflow: hidden; }
.mpi-photo img { object-fit: cover; filter: grayscale(0.75) contrast(1.05); transition: filter 420ms ease; }
.mpi-photo:hover img, .mpi-photo.is-held img { filter: none; }
.mpi-photo figure::after {
  content: ""; position: absolute; inset: 0; background: var(--riso-blue);
  mix-blend-mode: screen; opacity: 0.2; transition: opacity 420ms ease; pointer-events: none;
}
.mpi-photo:hover figure::after, .mpi-photo.is-held figure::after { opacity: 0; }
.mpi-photo figcaption {
  position: absolute; left: 12px; right: 12px; bottom: 11px;
  font-size: 10.5px; letter-spacing: 0.12em; text-transform: uppercase; opacity: 0.6;
}
.mpi-drag-hint {
  position: absolute; top: 12px; right: 14px; z-index: 50; pointer-events: none;
  transform: rotate(2deg); background: var(--riso-yellow); border: 2px solid var(--ink);
  padding: 4px 9px; font-size: 9.5px; letter-spacing: 0.22em; text-transform: uppercase;
}

/* ---------- four ---------- */
.mpi-four { display: grid; gap: 0; grid-template-columns: 1fr; border: 2px solid var(--ink); }
@media (min-width: 760px) { .mpi-four { grid-template-columns: repeat(2, 1fr); } }
.mpi-four > div { padding: clamp(22px, 3vw, 34px); border-bottom: 2px solid var(--ink); }
.mpi-four > div:nth-child(odd) { border-right: 2px solid var(--ink); }
@media (max-width: 759px) { .mpi-four > div:nth-child(odd) { border-right: none; } }
.mpi-four > div:last-child, .mpi-four > div:nth-last-child(2):nth-child(odd) { border-bottom: none; }
@media (max-width: 759px) { .mpi-four > div:nth-last-child(2):nth-child(odd) { border-bottom: 2px solid var(--ink); } }
.mpi-four h3 { font-size: 1.7rem; margin-bottom: 8px; }
.mpi-four h3 span { color: var(--riso-red); font-family: var(--mpi-sans); font-size: 11px;
  letter-spacing: 0.2em; vertical-align: super; margin-right: 8px; }
.mpi-four p { font-size: 14.5px; line-height: 1.62; opacity: 0.72; }

/* ---------- path ---------- */
.mpi-path { position: relative; padding-left: 26px; }
.mpi-path::before {
  content: ""; position: absolute; left: 5px; top: 6px; bottom: 6px; width: 2px;
  background: repeating-linear-gradient(180deg, var(--ink) 0 6px, transparent 6px 12px);
}
.mpi-path > div { position: relative; padding: 16px 0; }
.mpi-path > div::before {
  content: ""; position: absolute; left: -26px; top: 22px; width: 12px; height: 12px;
  border-radius: 50%; background: var(--paper); border: 2px solid var(--riso-blue);
}
.mpi-path b { font-weight: 500; font-size: 12px; letter-spacing: 0.16em;
  font-variant-numeric: tabular-nums; color: var(--riso-blue); display: block; margin-bottom: 5px; }
.mpi-path p { font-size: 15px; line-height: 1.6; }

/* ---------- voices ---------- */
.mpi-notes { display: grid; gap: clamp(22px, 3vw, 34px); grid-template-columns: 1fr; }
@media (min-width: 820px) { .mpi-notes { grid-template-columns: repeat(2, 1fr); } }
.mpi-note-card {
  background: var(--paper-2); padding: clamp(22px, 3vw, 32px); border: 2px solid var(--ink);
  box-shadow: 5px 5px 0 var(--ink);
}
.mpi-note-card:nth-child(even) { transform: rotate(0.5deg); }
.mpi-note-card:nth-child(odd) { transform: rotate(-0.6deg); }
.mpi-note-card blockquote {
  margin: 0; font-family: var(--mpi-display), Georgia, serif;
  font-size: clamp(1.1rem, 1rem + 0.5vw, 1.32rem); line-height: 1.45;
}
.mpi-note-card figcaption { margin-top: 14px; font-size: 11px; letter-spacing: 0.18em;
  text-transform: uppercase; opacity: 0.6; }

/* ---------- reveal ---------- */
.mpi-reveal { opacity: 0; transform: translateY(18px); transition: opacity 700ms ease, transform 700ms cubic-bezier(.2,.7,.2,1); }
.mpi-reveal.is-in { opacity: 1; transform: none; }

/* ---------- footer ---------- */
.mpi-foot { border-top: 2px solid var(--ink); padding: 34px 20px 78px; }
.mpi-foot-in { max-width: 1160px; margin: 0 auto; display: flex; flex-wrap: wrap;
  gap: 12px 24px; justify-content: space-between; align-items: baseline;
  font-size: 11.5px; letter-spacing: 0.08em; }
.mpi-foot a { color: inherit; }

/* ---------- draft badge ---------- */
.mpi-demo {
  position: fixed; right: 14px; bottom: 14px; z-index: 70;
  background: var(--ink); color: var(--paper); border: 2px solid var(--ink);
  font-size: 9.5px; letter-spacing: 0.2em; text-transform: uppercase; padding: 7px 12px;
  display: inline-flex; gap: 8px; white-space: nowrap;
}
.mpi-demo b { color: var(--riso-yellow); font-weight: 500; }

@media (prefers-reduced-motion: reduce) {
  .mpi-marq div { animation: none; }
  .mpi-reveal { opacity: 1; transform: none; transition: none; }
}
`;
