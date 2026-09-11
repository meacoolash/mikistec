export const css = `
.r2 {
  --bone: #EFEAE1;
  --bone-2: #E4DDD0;
  --night: #121815;
  --night-2: #1B2420;
  --saffron: #C6802F;
  --saffron-2: #E0A45C;
  background: var(--bone);
  color: var(--night);
  font-family: var(--rr-sans), ui-sans-serif, system-ui, sans-serif;
  font-weight: 300;
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
}
.r2 h1, .r2 h2, .r2 h3, .r2 .serif {
  font-family: var(--rr-display), Georgia, serif;
  font-weight: 300;
  letter-spacing: -0.022em;
  margin: 0;
}
.r2 ::selection { background: var(--saffron); color: var(--night); }
.r2 p { margin: 0; }

/* layout */
.r2-band { padding: clamp(88px, 13vw, 168px) 24px; }
.r2-mid { max-width: 720px; margin: 0 auto; text-align: center;
  display: flex; flex-direction: column; align-items: center; gap: 26px; }
.r2-wide { max-width: 1180px; margin: 0 auto; }
.r2-night { background: var(--night); color: var(--bone); }
.r2-saff { background: var(--saffron); color: var(--night); }
.r2-h { font-size: clamp(2.6rem, 1.4rem + 6.2vw, 6.2rem); line-height: 0.94; }
.r2-h-sm { font-size: clamp(2.1rem, 1.4rem + 3.4vw, 4.2rem); line-height: 0.98; }
.r2-p { font-size: clamp(1.05rem, 1rem + 0.4vw, 1.3rem); line-height: 1.62; opacity: 0.72; max-width: 46ch; }

/* eyebrow */
.r2-eye {
  display: inline-flex; align-items: center; gap: 12px;
  font-size: 10.5px; letter-spacing: 0.32em; text-transform: uppercase;
  font-weight: 400; color: var(--saffron);
}
.r2-night .r2-eye { color: var(--saffron); }
.r2-saff .r2-eye { color: rgba(18,24,21,0.68); }
.r2-eye i { font-style: normal; opacity: 0.75; }

/* buttons */
.r2-btn {
  display: inline-flex; align-items: center; gap: 10px; cursor: pointer;
  font-family: var(--rr-sans); font-size: 12px; letter-spacing: 0.22em; text-transform: uppercase;
  padding: 17px 32px; border-radius: 999px; text-decoration: none;
  background: var(--saffron); color: var(--night); border: 1px solid var(--saffron);
  transition: transform 300ms cubic-bezier(.2,.7,.2,1), background 300ms, color 300ms;
}
.r2-btn:hover { transform: translateY(-2px); background: transparent; color: var(--saffron); }
.r2-night .r2-btn:hover { color: var(--saffron); }
.r2-link {
  font-size: 12px; letter-spacing: 0.18em; text-transform: uppercase;
  text-decoration: none; color: inherit; opacity: 0.62;
  border-bottom: 1px solid currentColor; padding-bottom: 3px;
  transition: opacity 250ms;
}
.r2-link:hover { opacity: 1; }
.r2-only-desk { display: none; }
.r2-only-mob { display: inline-block; }
@media (min-width: 900px) {
  .r2-only-desk { display: inline-block; }
  .r2-only-mob { display: none; }
}
.r2-cta-row { display: flex; flex-wrap: wrap; gap: 18px 28px; align-items: center; justify-content: center; margin-top: 6px; }

/* ---------- HERO ---------- */
.r2-hero {
  position: relative; min-height: 100svh; display: grid; place-items: center;
  background: var(--night); color: var(--bone); overflow: hidden; padding: 120px 24px 96px;
}
.r2-hero-img { position: absolute; inset: 0; }
.r2-hero-img img { width: 100%; height: 100%; object-fit: cover; object-position: 62% 45%;
  opacity: 0.42; animation: r2-zoom 30s ease-in-out infinite alternate; }
@keyframes r2-zoom { from { transform: scale(1.08) } to { transform: scale(1.2) } }
.r2-hero-scrim { position: absolute; inset: 0;
  background: radial-gradient(120% 85% at 50% 42%, rgba(18,24,21,0.25) 0%, rgba(18,24,21,0.82) 62%, rgba(18,24,21,0.96) 100%); }

/* breathing ring */
.r2-breath {
  position: absolute; left: 50%; top: 46%; translate: -50% -50%;
  width: min(74vw, 620px); aspect-ratio: 1; border-radius: 50%;
  border: 1px solid rgba(198,128,47,0.45);
  animation: r2-breathe 11s cubic-bezier(.4,0,.5,1) infinite;
  pointer-events: none;
}
.r2-breath::after {
  content: ""; position: absolute; inset: 12%; border-radius: 50%;
  border: 1px solid rgba(239,234,225,0.14);
}
@keyframes r2-breathe {
  0%   { transform: scale(0.86); opacity: 0.35; }
  40%  { transform: scale(1.08); opacity: 0.8; }
  55%  { transform: scale(1.08); opacity: 0.8; }
  100% { transform: scale(0.86); opacity: 0.35; }
}
.r2-breath-label {
  position: absolute; left: 50%; bottom: 42px; translate: -50% 0;
  font-size: 10px; letter-spacing: 0.4em; text-transform: uppercase;
  color: rgba(239,234,225,0.5); height: 14px;
}
.r2-breath-label span { position: absolute; left: 50%; translate: -50% 0; white-space: nowrap; }
.r2-breath-label .in  { animation: r2-inhale 11s ease-in-out infinite; }
.r2-breath-label .out { animation: r2-exhale 11s ease-in-out infinite; }
@keyframes r2-inhale { 0%,4% { opacity: 0 } 14%,40% { opacity: 1 } 50%,100% { opacity: 0 } }
@keyframes r2-exhale { 0%,52% { opacity: 0 } 62%,92% { opacity: 1 } 100%,100% { opacity: 0 } }

.r2-hero-in { position: relative; text-align: center; display: flex; flex-direction: column;
  align-items: center; gap: 30px; max-width: 940px; }
.r2-hero h1 { font-size: clamp(3rem, 1.4rem + 9vw, 8.2rem); line-height: 0.9; letter-spacing: -0.035em; }
.r2-hero h1 { min-height: 1.85em; display: grid; align-content: center; }
.r2-lines { display: grid; }
.r2-lines > span {
  grid-area: 1 / 1; white-space: pre-line;
  opacity: 0; filter: blur(10px); transform: scale(0.965);
  transition: opacity 1500ms ease, filter 1500ms ease, transform 1500ms cubic-bezier(.16,1,.3,1);
}
.r2-lines > span[data-show="true"] { opacity: 1; filter: none; transform: none; }
.r2-lines > span[data-show="gone"] { opacity: 0; filter: blur(10px); transform: scale(1.045); }
.r2-fade { opacity: 0; animation: r2-fade 1s ease forwards; }
@keyframes r2-fade { to { opacity: 1 } }

.r2-scroll {
  position: absolute; left: 50%; bottom: 26px; translate: -50% 0;
  display: grid; justify-items: center; gap: 10px;
  font-size: 9.5px; letter-spacing: 0.34em; text-transform: uppercase;
  color: rgba(239,234,225,0.45);
}
.r2-scroll i { display: block; width: 1px; height: 42px; background: linear-gradient(rgba(239,234,225,0.5), transparent);
  animation: r2-drop 2.4s ease-in-out infinite; transform-origin: top; }
@keyframes r2-drop { 0%,100% { transform: scaleY(0.4); opacity: 0.3 } 50% { transform: scaleY(1); opacity: 1 } }

@media (prefers-reduced-motion: reduce) {
  .r2-hero-img img, .r2-breath, .r2-breath-label span, .r2-scroll i { animation: none !important; }
  .r2-lines > span { transition: none; }
  .r2-fade { opacity: 1; animation: none; }
}

/* ---------- STEPS ---------- */
.r2-steps { display: grid; gap: 34px; width: 100%; text-align: left; margin-top: 8px; }
.r2-step { display: flex; gap: 22px; align-items: baseline; }
.r2-step .n {
  font-family: var(--rr-sans), ui-sans-serif, system-ui, sans-serif;
  font-size: 34px; font-weight: 600; line-height: 1; letter-spacing: -0.02em;
  font-variant-numeric: tabular-nums;
  color: var(--saffron); width: 48px; flex: none;
}
.r2-step h3 {
  font-family: var(--rr-sans), ui-sans-serif, system-ui, sans-serif;
  font-size: 23px; font-weight: 400; line-height: 1.25; letter-spacing: -0.015em; margin-bottom: 8px;
}
.r2-step p { opacity: 0.78; line-height: 1.62; font-size: 17px; }

/* ---------- WORDS ---------- */
.r2-words { display: grid; gap: 0; width: 100%; margin-top: 10px; }
.r2-word {
  display: grid; gap: 6px; padding: 30px 0; border-top: 1px solid rgba(239,234,225,0.16);
  text-align: left;
}
@media (min-width: 760px) { .r2-word { grid-template-columns: 300px 1fr; gap: 40px; align-items: baseline; } }
.r2-word:last-child { border-bottom: 1px solid rgba(239,234,225,0.16); }
.r2-word h3 { font-size: clamp(2.2rem, 1.4rem + 3.2vw, 3.6rem); line-height: 1; }
.r2-word p { opacity: 0.66; line-height: 1.65; font-size: 16.5px; max-width: 48ch; }

/* ---------- HOSTS ---------- */
.r2-hosts { display: grid; gap: 56px; margin-top: clamp(48px, 6vw, 80px); text-align: left; }
@media (min-width: 900px) { .r2-hosts { grid-template-columns: 1fr 1fr; gap: 72px; } }
.r2-host { display: flex; flex-direction: column; align-items: flex-start; gap: 16px;
  padding-top: 30px; border-top: 1px solid rgba(18,24,21,0.28); }
.r2-host h3 { font-size: clamp(2.2rem, 1.6rem + 2.2vw, 3.3rem); line-height: 1; }
.r2-host .role { font-size: 12px; letter-spacing: 0.18em; text-transform: uppercase; opacity: 0.72;
  line-height: 1.6; margin-bottom: 6px; }
.r2-host p:not(.role) { font-size: 16.5px; line-height: 1.65; opacity: 0.84; max-width: 52ch; }
.r2-host .r2-link { margin-top: 6px; opacity: 0.8; }

/* ---------- GALLERY ---------- */
.r2-gal-wrap { max-width: 1180px; margin: 0 auto; text-align: center; }
.r2-gal-wrap .r2-eye { margin-bottom: 28px; }
.r2-gal { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; }
.r2-gal figure { margin: 0; overflow: hidden; aspect-ratio: 1 / 1; }
.r2-gal figure.big { grid-column: span 2; }
@media (min-width: 760px) {
  .r2-gal { grid-template-columns: repeat(4, 1fr); gap: 14px; }
  .r2-gal figure.big { grid-column: span 2; grid-row: span 2; }
}
.r2-gal img { width: 100%; height: 100%; object-fit: cover; display: block;
  filter: grayscale(0.15) brightness(0.92);
  transition: filter 500ms ease, transform 900ms cubic-bezier(.2,.7,.2,1); }
.r2-gal figure:hover img { filter: none; transform: scale(1.04); }

/* ---------- PLACE ---------- */
.r2-place { max-width: 1180px; margin: 0 auto; display: grid; gap: 46px; text-align: left; }
@media (min-width: 980px) { .r2-place { grid-template-columns: 1.02fr 1fr; gap: 74px; align-items: center; } }
.r2-place h2 { font-size: clamp(2.2rem, 1.4rem + 3.2vw, 3.9rem); line-height: 1.02; margin-bottom: 22px; }
.r2-place .r2-eye { margin-bottom: 18px; }
.r2-place .r2-p { max-width: 44ch; opacity: 0.75; }
.r2-place .r2-p + .r2-p { margin-top: 18px; }
.r2-note { margin-top: 26px; font-size: 14px; line-height: 1.6; opacity: 0.5; }
.r2-stack { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.r2-stack figure { margin: 0; overflow: hidden; aspect-ratio: 4/3; }
.r2-stack figure:first-child { grid-column: 1 / -1; aspect-ratio: 16/9; }
.r2-stack img { width: 100%; height: 100%; object-fit: cover; display: block;
  transition: transform 900ms cubic-bezier(.2,.7,.2,1); }
.r2-stack figure:hover img { transform: scale(1.045); }

/* ---------- FACTS ---------- */
.r2-facts { display: grid; gap: 40px 24px; width: 100%; text-align: center; }
@media (min-width: 700px) { .r2-facts { grid-template-columns: repeat(4, 1fr); } }
.r2-fact .k { font-size: 10px; letter-spacing: 0.3em; text-transform: uppercase; opacity: 0.5; }
.r2-fact .v {
  font-family: var(--rr-sans), ui-sans-serif, system-ui, sans-serif;
  font-size: 23px; font-weight: 400; line-height: 1.3; letter-spacing: -0.015em;
  font-variant-numeric: tabular-nums; margin-top: 12px;
}

/* ---------- FORM ---------- */
.r2-form { display: grid; gap: 22px; width: 100%; text-align: left; margin-top: 6px; }
.r2-form label { display: block; font-size: 10px; letter-spacing: 0.26em; text-transform: uppercase;
  opacity: 0.5; margin-bottom: 8px; }
.r2-form input, .r2-form textarea {
  width: 100%; font-family: inherit; font-size: 16px; color: inherit; background: transparent;
  border: 0; border-bottom: 1px solid rgba(18,24,21,0.24); padding: 10px 2px; outline: none;
  border-radius: 0; transition: border-color 250ms;
}
.r2-form input::placeholder, .r2-form textarea::placeholder { color: rgba(18,24,21,0.3); }
.r2-form input:focus, .r2-form textarea:focus { border-color: var(--saffron); }
.r2-form textarea { resize: vertical; min-height: 80px; }

/* ---------- DEMO MARKERS ---------- */
.r2-demo-tag {
  position: absolute; top: 22px; left: 22px; z-index: 5;
  font-size: 10.5px; letter-spacing: 0.28em; text-transform: uppercase; font-weight: 400;
  color: var(--saffron-2); border: 1px solid rgba(224,164,92,0.6); border-radius: 999px;
  padding: 7px 14px; background: rgba(18,24,21,0.45); backdrop-filter: blur(6px);
}
.r2-form.is-demo { position: relative; }
.r2-form .r2-note { margin-top: 0; }
.r2-form .r2-btn:disabled { cursor: not-allowed; }
.r2-form.is-demo .r2-btn:disabled:hover { transform: none; background: var(--saffron); color: var(--night); }
.r2-stamp {
  position: absolute; inset: 0; z-index: 2; pointer-events: none;
  display: grid; place-items: center; overflow: hidden;
}
.r2-stamp span {
  transform: rotate(-16deg);
  font-family: var(--rr-sans), ui-sans-serif, system-ui, sans-serif;
  font-size: clamp(3.6rem, 2rem + 8vw, 6.4rem); font-weight: 600; line-height: 1;
  letter-spacing: 0.2em; text-transform: uppercase; padding: 0.12em 0.2em 0.12em 0.4em;
  color: rgba(198,128,47,0.4); border: 4px solid rgba(198,128,47,0.4); border-radius: 10px;
}

/* ---------- REVEAL ---------- */
.r2-rev { opacity: 0; transform: translateY(26px);
  transition: opacity 1s ease, transform 1s cubic-bezier(.16,1,.3,1); }
.r2-rev.in { opacity: 1; transform: none; }
@media (prefers-reduced-motion: reduce) { .r2-rev { opacity: 1; transform: none; } }

/* ---------- FOOT ---------- */
.r2-foot { background: var(--night); color: rgba(239,234,225,0.55); padding: 46px 24px 64px;
  text-align: center; font-size: 12px; letter-spacing: 0.14em; }
.r2-foot a { color: var(--saffron); text-decoration: none; }
.r2-credit {
  position: fixed; left: 0; right: 0; bottom: 0; z-index: 60; background: #0B0F0D;
  color: rgba(239,234,225,0.62); font-size: 10px; letter-spacing: 0.24em; text-transform: uppercase;
  padding: 9px 20px; display: flex; justify-content: flex-end; gap: 14px; flex-wrap: wrap;
}
.r2-credit a { color: var(--saffron); }

`;
