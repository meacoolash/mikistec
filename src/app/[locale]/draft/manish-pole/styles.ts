export const css = `
.mp {
  --bone: #F1ECE3;
  --bone-2: #E6DFD3;
  --ink: #16191B;
  --ink-2: #20272C;
  --blue: #8FA6C2;
  background: var(--bone);
  color: var(--ink);
  font-family: var(--rr-sans), ui-sans-serif, system-ui, sans-serif;
  font-weight: 300;
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
}
.mp *, .mp *::before, .mp *::after { box-sizing: border-box; }
.mp h1, .mp h2, .mp h3, .mp .serif {
  font-family: var(--rr-display), Georgia, serif;
  font-weight: 300;
  letter-spacing: -0.02em;
  margin: 0;
}
.mp p { margin: 0; }
.mp ::selection { background: var(--blue); color: var(--ink); }

/* ---------- layout ---------- */
.mp-band { padding: clamp(72px, 10vw, 132px) 22px; }
.mp-col { max-width: 700px; margin: 0 auto; }
.mp-wide { max-width: 1120px; margin: 0 auto; }
.mp-center { text-align: center; display: flex; flex-direction: column; align-items: center; gap: 22px; }
.mp-dark { background: var(--ink); color: var(--bone); }
.mp-tint { background: var(--bone-2); }

.mp-h { font-size: clamp(2.3rem, 1.5rem + 3.6vw, 4rem); line-height: 1.02; }
.mp-h-sm { font-size: clamp(1.8rem, 1.4rem + 1.8vw, 2.6rem); line-height: 1.08; }
.mp-lead { font-size: clamp(1.02rem, 0.98rem + 0.3vw, 1.18rem); line-height: 1.68; opacity: 0.72; max-width: 52ch; }

.mp-eye {
  display: inline-flex; align-items: center; gap: 10px;
  font-size: 10.5px; letter-spacing: 0.3em; text-transform: uppercase;
  font-weight: 400; color: #7A8CA5;
}
.mp-dark .mp-eye, .mp-hero .mp-eye { color: var(--blue); }
.mp-rule { width: 34px; height: 1px; background: currentColor; opacity: 0.45; }

/* ---------- buttons ---------- */
.mp-btn {
  display: inline-flex; align-items: center; gap: 10px;
  font-family: var(--rr-sans); font-size: 11.5px; letter-spacing: 0.22em;
  text-transform: uppercase; text-decoration: none;
  padding: 16px 30px; border-radius: 999px;
  background: var(--ink); color: var(--bone); border: 1px solid var(--ink);
  transition: transform 280ms cubic-bezier(.2,.7,.2,1), background 280ms, color 280ms;
}
.mp-btn:hover { transform: translateY(-2px); background: transparent; color: var(--ink); }
.mp-dark .mp-btn, .mp-hero .mp-btn { background: var(--blue); color: var(--ink); border-color: var(--blue); }
.mp-dark .mp-btn:hover, .mp-hero .mp-btn:hover { background: transparent; color: var(--blue); }
.mp-link {
  font-size: 11.5px; letter-spacing: 0.18em; text-transform: uppercase;
  text-decoration: none; color: inherit; opacity: 0.6;
  border-bottom: 1px solid currentColor; padding-bottom: 3px;
  transition: opacity 220ms;
}
.mp-link:hover { opacity: 1; }

/* ---------- demo badge ---------- */
.mp-demo {
  position: fixed; z-index: 40; right: 16px; bottom: 16px;
  display: inline-flex; align-items: center; gap: 9px; white-space: nowrap;
  background: rgba(22,25,27,0.9); color: var(--bone);
  font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase;
  padding: 9px 16px; border-radius: 999px; backdrop-filter: blur(6px);
}
.mp-demo b { font-weight: 500; color: var(--blue); }

/* ---------- hero ---------- */
.mp-hero {
  position: relative; min-height: 100svh; display: flex; align-items: flex-end;
  background: var(--ink); color: var(--bone); overflow: hidden;
}
.mp-hero-img { position: absolute; inset: 0; }
.mp-hero-img img { object-fit: cover; object-position: 50% 22%; opacity: 0.8; }
.mp-hero-veil {
  position: absolute; inset: 0;
  background: linear-gradient(180deg, rgba(20,23,25,0.5) 0%, rgba(20,23,25,0.12) 26%, rgba(20,23,25,0.72) 58%, rgba(20,23,25,0.94) 78%, rgba(20,23,25,0.99) 100%);
}
.mp-hero-in {
  position: relative; z-index: 2; width: 100%; max-width: 1120px; margin: 0 auto;
  padding: 0 22px clamp(48px, 8vw, 88px);
  display: flex; flex-direction: column; gap: 20px;
  animation: mp-up 900ms 120ms cubic-bezier(.2,.7,.2,1) both;
}
.mp-hero h1 {
  font-size: clamp(3rem, 1.6rem + 8vw, 7rem); line-height: 0.92; letter-spacing: -0.035em;
}
.mp-hero-q {
  font-family: var(--rr-display), Georgia, serif; font-style: italic;
  font-size: clamp(1.35rem, 1.1rem + 1.2vw, 2rem); line-height: 1.32;
  max-width: 20ch; opacity: 0.88;
}
.mp-hero-meta {
  display: flex; flex-wrap: wrap; gap: 10px 22px; align-items: center;
  font-size: 11.5px; letter-spacing: 0.16em; text-transform: uppercase; opacity: 0.6;
}
@keyframes mp-up { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: none; } }

/* ---------- facts ---------- */
.mp-facts {
  display: grid; gap: 1px; background: rgba(22,25,27,0.13);
  border-top: 1px solid rgba(22,25,27,0.13); border-bottom: 1px solid rgba(22,25,27,0.13);
  grid-template-columns: 1fr;
}
@media (min-width: 680px) { .mp-facts { grid-template-columns: repeat(3, 1fr); } }
.mp-fact { background: var(--bone); padding: 30px 24px; text-align: center; }
.mp-fact b {
  display: block; font-weight: 300; font-size: clamp(2rem, 1.4rem + 2vw, 2.9rem);
  line-height: 1; letter-spacing: -0.03em; font-variant-numeric: tabular-nums;
}
.mp-fact span {
  display: block; margin-top: 10px;
  font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; opacity: 0.55;
}

/* ---------- event ---------- */
.mp-event { display: grid; gap: clamp(28px, 5vw, 56px); align-items: center; }
@media (min-width: 860px) { .mp-event { grid-template-columns: 0.82fr 1fr; } }
.mp-poster {
  position: relative; aspect-ratio: 4 / 5; overflow: hidden; border-radius: 2px;
  background: var(--ink-2);
}
.mp-poster img { object-fit: cover; }
.mp-event-body { display: flex; flex-direction: column; gap: 22px; }
.mp-event-body h2 { font-size: clamp(2.1rem, 1.5rem + 2.6vw, 3.4rem); line-height: 1; }
.mp-meta {
  display: flex; flex-wrap: wrap; align-items: baseline; gap: 6px 14px;
  font-size: 12.5px; letter-spacing: 0.05em; opacity: 0.62;
  font-variant-numeric: tabular-nums;
}
.mp-meta time { font-weight: 400; opacity: 1; }
.mp-meta span::before { content: "·"; margin-right: 14px; opacity: 0.6; }
.mp-price { font-size: 13px; letter-spacing: 0.04em; opacity: 0.78; font-variant-numeric: tabular-nums; }
.mp-poster-blank {
  display: flex; align-items: center; justify-content: center;
  border: 1px solid rgba(241,236,227,0.16); background: transparent;
}
.mp-poster-blank span {
  font-size: 11px; letter-spacing: 0.3em; text-transform: uppercase; opacity: 0.45;
}

/* ---------- the rest of the calendar ---------- */
.mp-list { margin-top: clamp(44px, 6vw, 76px); border-top: 1px solid rgba(241,236,227,0.18); }
.mp-list article {
  display: grid; gap: 10px 40px; grid-template-columns: 1fr;
  padding: clamp(22px, 3vw, 32px) 0; border-bottom: 1px solid rgba(241,236,227,0.18);
}
@media (min-width: 820px) { .mp-list article { grid-template-columns: 0.9fr 1fr; } }
.mp-list h3 { font-size: clamp(1.4rem, 1.2rem + 0.7vw, 1.85rem); line-height: 1.12; margin: 6px 0 8px; }
.mp-list p { font-size: 14.5px; line-height: 1.62; opacity: 0.66; }
.mp-list p + p { margin-top: 8px; }
.mp-kind {
  font-size: 10.5px; letter-spacing: 0.26em; text-transform: uppercase; color: var(--blue);
}

/* ---------- list of four ---------- */
.mp-four { display: grid; gap: 1px; background: rgba(22,25,27,0.12); grid-template-columns: 1fr; }
@media (min-width: 760px) { .mp-four { grid-template-columns: repeat(2, 1fr); } }
.mp-four > div { background: var(--bone-2); padding: clamp(26px, 3.4vw, 40px); }
.mp-four h3 { font-size: 1.5rem; margin-bottom: 9px; }
.mp-four p { font-size: 15px; line-height: 1.62; opacity: 0.68; }

/* ---------- gallery ---------- */
.mp-gal { display: grid; gap: 10px; grid-template-columns: 1fr; }
@media (min-width: 700px) { .mp-gal { grid-template-columns: 1.4fr 1fr; } }
.mp-gal figure { position: relative; margin: 0; overflow: hidden; background: var(--bone-2); }
.mp-gal img { object-fit: cover; transition: transform 900ms cubic-bezier(.2,.7,.2,1); }
.mp-gal figure:hover img { transform: scale(1.03); }
.mp-gal .mp-g1 { aspect-ratio: 3 / 2; }
@media (min-width: 700px) { .mp-gal .mp-g1 { aspect-ratio: auto; min-height: 100%; } }
.mp-gal .mp-g-stack { display: grid; gap: 10px; }
.mp-gal .mp-g-stack figure { aspect-ratio: 16 / 9; }

/* ---------- timeline ---------- */
.mp-time { display: grid; gap: 0; }
.mp-time > div {
  display: grid; grid-template-columns: 1fr; gap: 4px;
  padding: 18px 0; border-bottom: 1px solid rgba(22,25,27,0.14);
}
@media (min-width: 640px) {
  .mp-time > div { grid-template-columns: 130px 1fr; gap: 24px; align-items: baseline; }
}
.mp-time b {
  font-weight: 400; font-size: 12.5px; letter-spacing: 0.14em;
  font-variant-numeric: tabular-nums; opacity: 0.5;
}
.mp-time p { font-size: 15.5px; line-height: 1.58; }

/* ---------- quotes ---------- */
.mp-quotes { display: grid; gap: clamp(26px, 4vw, 44px); grid-template-columns: 1fr; }
@media (min-width: 820px) { .mp-quotes { grid-template-columns: repeat(2, 1fr); } }
.mp-quote blockquote {
  margin: 0; font-family: var(--rr-display), Georgia, serif; font-size: clamp(1.15rem, 1rem + 0.6vw, 1.4rem);
  line-height: 1.46; opacity: 0.92;
}
.mp-quote figcaption {
  margin-top: 14px; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; opacity: 0.5;
}

/* ---------- footer ---------- */
.mp-foot { padding: 46px 22px 74px; border-top: 1px solid rgba(22,25,27,0.14); }
.mp-foot-in {
  max-width: 1120px; margin: 0 auto; display: flex; flex-wrap: wrap; gap: 14px 26px;
  align-items: baseline; justify-content: space-between;
  font-size: 12px; letter-spacing: 0.04em; opacity: 0.6;
}
.mp-foot a { color: inherit; }
`;
