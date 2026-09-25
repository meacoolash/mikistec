export const css = `
.v3 {
  --base: #FBF8F1;
  --ink: #1E1A16;
  --grey: #5F5D59;
  --blue: #4D72EC;   /* light cobalt: hero, first card, numbers */
  --orange: #F2542D; /* tomato: selection, focus */
  --sand: #DFE8DA;   /* pale sage */
  --white: #FFFFFF;
  --radius: 14px;
  background-color: var(--base);
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0.1 0 0 0 0 0.1 0 0 0 0 0.1 0 0 0 .06 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"), linear-gradient(180deg, #FFF5D1 0%, #F5F2E9 50%, #ECEBE8 100%);
  color: var(--ink);
  font-family: var(--v3-mono), ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 15px;
  line-height: 1.65;
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
}
.v3 *, .v3 *::before, .v3 *::after { box-sizing: border-box; }
.v3 h1, .v3 h2, .v3 h3, .v3 p, .v3 ul { margin: 0; }
.v3 h1, .v3 h2, .v3 h3 { font-family: inherit; }
.v3 ul { padding: 0; list-style: none; }
.v3 a { color: inherit; }
.v3 ::selection { background: var(--orange); color: var(--ink); }
.v3 :focus-visible { outline: 2px solid var(--orange); outline-offset: 3px; }

.v3-wrap { max-width: 1240px; margin: 0 auto; padding-inline: 16px; }
@media (min-width: 720px) { .v3-wrap { padding-inline: 28px; } }
.v3-inner { max-width: 1120px; margin: 0 auto; }

/* ---------- type ---------- */
.v3-h {
  font-size: clamp(1.9rem, 1.2rem + 2.6vw, 3.1rem);
  line-height: 1.08;
  font-weight: 700;
  letter-spacing: -0.03em;
}
.v3-h3 { font-size: 13px; letter-spacing: 0.14em; text-transform: uppercase; font-weight: 500; }
.v3-eye { font-size: 12px; letter-spacing: 0.16em; text-transform: uppercase; font-weight: 500; }
.v3-muted { color: var(--grey); }
.v3-body p + p { margin-top: 1.1em; }

/* ---------- buttons ---------- */
.v3-btns { display: flex; flex-wrap: wrap; gap: 12px; }
.v3 .v3-btn {
  display: inline-flex; align-items: center; justify-content: center; gap: 10px;
  min-height: 46px; padding: 0 22px;
  font: inherit; font-size: 13.5px; font-weight: 500; text-decoration: none;
  border: 1px solid var(--ink); background: var(--ink); color: var(--white);
  cursor: pointer; transition: opacity .15s ease;
}
.v3 .v3-btn:hover { opacity: .85; }
.v3 .v3-btn--ghost { background: transparent; color: var(--ink); }
.v3 .v3-btn--white { background: var(--white); color: var(--ink); border-color: var(--white); }
.v3 .v3-btn[disabled] { opacity: .45; cursor: not-allowed; }

/* ---------- header ---------- */
.v3-head { display: flex; align-items: center; justify-content: space-between; gap: 16px; padding-block: 18px; }
.v3-logo { display: flex; align-items: center; gap: 10px; text-decoration: none; font-size: 15px; line-height: 0.95; letter-spacing: 0.02em; text-transform: uppercase; }
.v3-logo svg { width: 30px; height: 30px; flex: none; }
.v3-nav { display: flex; align-items: center; gap: 22px; font-size: 13.5px; }
.v3-nav a { text-decoration: none; }
.v3-nav a:hover { text-decoration: underline; text-underline-offset: 4px; }
.v3-nav .v3-hide { display: none; }
@media (min-width: 860px) { .v3-nav .v3-hide { display: inline; } }
.v3-fomo { border: 1.5px solid #E0362C; padding: 8px 16px; background: #E0362C; color: var(--white) !important; }
.v3-fomo:hover { opacity: .85; text-decoration: none !important; }

/* ---------- hero ---------- */
.v3-hero {
  position: relative; isolation: isolate; border-radius: var(--radius);
  background: var(--blue); color: var(--white);
  min-height: min(88svh, 860px);
  display: grid; align-items: center; gap: 28px;
  padding: 40px 20px 56px; text-align: center; overflow: hidden;
}
@media (min-width: 900px) {
  .v3-hero { grid-template-columns: 5fr 7fr; gap: 56px; padding: 56px 64px 56px 32px; text-align: left; }
}
.v3-hero-art { mix-blend-mode: multiply; justify-self: center; width: min(300px, 70vw); }
@media (min-width: 900px) { .v3-hero-art { width: 100%; max-width: 440px; } }
.v3-hero-art img {
  display: block; width: 100%; height: auto;
  filter: saturate(.6) brightness(1.18) contrast(1.12);
  -webkit-mask-image: radial-gradient(ellipse 50% 50% at 50% 50%, #000 70%, transparent 100%);
          mask-image: radial-gradient(ellipse 50% 50% at 50% 50%, #000 70%, transparent 100%);
}
.v3-hero .v3-eye { margin-bottom: 18px; }
.v3-hero h1 {
  max-width: 21ch; margin-inline: auto;
  font-size: clamp(1.9rem, 1.1rem + 3.2vw, 3.6rem);
  line-height: 1.1; font-weight: 700; letter-spacing: -0.025em;
}
.v3-hero .v3-lead { max-width: 58ch; margin: 22px auto 30px; font-size: 14.5px; line-height: 1.7; opacity: .95; }
.v3-yes { background: #FF8A1F; color: var(--ink); font-weight: 700; padding: 1px 6px; border-radius: 4px; -webkit-box-decoration-break: clone; box-decoration-break: clone; }
@media (min-width: 900px) { .v3-hero h1, .v3-hero .v3-lead { margin-inline: 0; } }
.v3-badge {
  position: absolute; top: 14px; left: 14px;
  font-size: 11px; letter-spacing: .14em; text-transform: uppercase;
  background: var(--ink); color: var(--white); padding: 5px 10px;
}

/* ---------- strip ---------- */
.v3-strip {
  margin-top: 40px; border-radius: var(--radius); background: var(--white);
  display: grid; gap: 22px; padding: 30px 22px;
}
@media (min-width: 860px) { .v3-strip { grid-template-columns: 1fr 1fr; align-items: center; padding: 44px 56px; gap: 56px; } }
.v3-strip h2 { font-size: clamp(1.25rem, 1rem + 0.9vw, 1.6rem); font-weight: 700; line-height: 1.25; letter-spacing: -0.02em; }
.v3-strip p { margin-bottom: 18px; }

/* ---------- sections ---------- */
.v3-sec { padding-block: clamp(72px, 10vw, 128px); }
.v3-sec--tight { padding-top: 0; }

.v3-problem { display: grid; gap: 40px; }
@media (min-width: 900px) { .v3-problem { grid-template-columns: 1fr 1fr; gap: 72px; } }
.v3-problem .v3-h { max-width: 16ch; }
.v3-problem .v3-btns { margin-top: 32px; }

/* ---------- paths ---------- */
.v3-sec-head { display: grid; gap: 14px; margin-bottom: 44px; }
@media (min-width: 900px) { .v3-sec-head { grid-template-columns: 1fr 1fr; gap: 72px; align-items: end; } }
.v3-paths { display: grid; gap: 24px; }
@media (min-width: 900px) { .v3-paths { grid-template-columns: 1fr 1fr; } }
.v3-card { border-radius: var(--radius); display: flex; flex-direction: column; padding: 30px 24px 32px; min-height: 100%; }
@media (min-width: 720px) { .v3-card { padding: 40px 40px 44px; } }
.v3-card--blue { background: var(--blue); color: var(--white); }
.v3-card--ink { background: var(--ink); color: var(--white); }
.v3-card-top { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 48px; }
.v3-card-n { font-size: 13px; opacity: .8; }
.v3-card h3 { font-size: clamp(1.6rem, 1.2rem + 1.4vw, 2.2rem); line-height: 1.1; font-weight: 700; letter-spacing: -0.02em; }
.v3-card > p { margin-top: 18px; opacity: .92; }
.v3-card ul { margin-top: 26px; border-top: 1px solid currentColor; }
.v3-card li { display: flex; gap: 12px; padding: 11px 0; border-bottom: 1px solid rgba(255,255,255,.28); font-size: 14px; }
.v3-card li::before { content: "→"; opacity: .7; }
.v3-card .v3-btn { margin-top: auto; align-self: flex-start; }
.v3-card ul { margin-bottom: 32px; }

/* ---------- steps ---------- */
/* Same as the original mikistec.com "Easy." block: centred head, steps stacked,
   heavy Archivo numerals and titles, body in the sans. Never the mono. */
/* White band, edge to edge of the viewport. */
.v3-easy { --green: var(--blue); background: var(--white); margin-inline: calc(50% - 50vw); padding: 56px 16px 64px; }
@media (min-width: 720px) { .v3-easy { padding: 88px 28px 96px; } }
.v3-easy-head { text-align: center; margin-bottom: 48px; }
.v3-easy-eye { font-family: var(--font-body), ui-sans-serif, system-ui, sans-serif; font-size: 13px; font-weight: 600; letter-spacing: .22em; text-transform: uppercase; color: var(--green); }
.v3-easy-eye span { margin: 0 .5em; }
.v3-easy-h { margin-top: 20px !important; font-family: var(--font-display), ui-sans-serif, system-ui, sans-serif !important; font-size: clamp(2.6rem, 1.8rem + 3vw, 4.2rem); line-height: 1; font-weight: 900; letter-spacing: -0.04em; }
.v3-steps { display: grid; gap: 40px; max-width: 760px; margin: 0 auto !important; }
.v3-step { display: flex; gap: 22px; }
.v3-step-n { flex: none; width: 1.3ch; font-family: var(--font-display), ui-sans-serif, system-ui, sans-serif; font-size: 34px; line-height: 1; font-weight: 900; color: var(--green); }
.v3-step h3 { margin: 2px 0 8px; font-family: var(--font-display), ui-sans-serif, system-ui, sans-serif; font-size: 22px; line-height: 1.2; font-weight: 800; }
.v3-step p { font-family: var(--font-body), ui-sans-serif, system-ui, sans-serif; font-size: 17px; line-height: 1.65; color: var(--grey); }

/* ---------- about ---------- */
.v3-about { display: grid; gap: 36px; }
@media (min-width: 900px) { .v3-about { grid-template-columns: 360px 1fr; gap: 72px; align-items: start; } }
.v3-about-photo { position: relative; max-width: 360px; }
.v3-about-photo img { display: block; width: 100%; height: auto; filter: grayscale(1) contrast(1.1); }
.v3-about-photo::after { content: ""; position: absolute; inset: 0; background: var(--orange); mix-blend-mode: multiply; opacity: .0; transition: opacity .4s ease; }
.v3-about-photo:hover::after { opacity: .35; }
.v3-facts { border-top: 1px solid var(--ink); margin-top: 28px; }
.v3-facts li { display: grid; grid-template-columns: 3ch 1fr; gap: 14px; padding: 16px 0; border-bottom: 1px solid var(--ink); }
.v3-facts li span { color: var(--blue); font-weight: 700; font-size: 13px; }

/* ---------- support ---------- */
.v3-support { display: grid; gap: 28px; background: var(--white); border-radius: var(--radius); padding: 32px 24px; }
@media (min-width: 900px) { .v3-support { grid-template-columns: 1fr 1fr; gap: 72px; padding: 56px; } }

/* ---------- faq ---------- */
.v3-faq { border-top: 1px solid var(--ink); }
.v3-faq details { border-bottom: 1px solid var(--ink); }
.v3-faq summary { list-style: none; cursor: pointer; display: flex; justify-content: space-between; gap: 20px; padding: 20px 0; font-weight: 500; }
.v3-faq summary::-webkit-details-marker { display: none; }
.v3-faq summary::after { content: "+"; font-weight: 400; font-size: 20px; line-height: 1; transition: transform .2s ease; }
.v3-faq details[open] summary::after { transform: rotate(45deg); }
.v3-faq details p { padding: 0 0 22px; max-width: 64ch; color: var(--grey); }

/* ---------- contact ---------- */
.v3-contact { border-radius: var(--radius); background: var(--white); padding: clamp(32px, 6vw, 72px) 22px; }
@media (min-width: 720px) { .v3-contact { padding-inline: 56px; } }
.v3-contact-in { display: grid; gap: 36px; max-width: 1120px; margin: 0 auto; }
@media (min-width: 900px) { .v3-contact-in { grid-template-columns: 1fr 1fr; gap: 72px; } }
.v3-contact .v3-h { max-width: 14ch; }
.v3-contact .v3-lead { margin-top: 18px; color: var(--grey); }
.v3-form { display: grid; gap: 22px; }
.v3-form label, .v3-form legend { display: block; font-size: 12px; letter-spacing: .14em; text-transform: uppercase; color: var(--grey); margin-bottom: 6px; }
.v3-form input[type=text], .v3-form input[type=email] {
  width: 100%; font: inherit; color: var(--ink); background: transparent;
  border: 0; border-bottom: 1px solid var(--ink); padding: 10px 0;
}
.v3-form input:focus { outline: none; border-color: var(--blue); }
.v3-form input::placeholder { color: #9A9A9A; }
.v3-form fieldset { border: 0; padding: 0; margin: 0; }
.v3-choices { display: flex; flex-wrap: wrap; gap: 10px; }
.v3-choice input { position: absolute; opacity: 0; pointer-events: none; }
.v3-choice span { display: inline-block; border: 1px solid var(--ink); padding: 9px 16px; font-size: 13.5px; cursor: pointer; }
.v3-choice input:checked + span { background: var(--blue); border-color: var(--blue); color: var(--white); }
.v3-choice input:focus-visible + span { outline: 2px solid var(--orange); outline-offset: 3px; }
.v3-note { font-size: 12.5px; color: var(--grey); }

/* ---------- footer ---------- */
.v3-foot { display: flex; flex-wrap: wrap; gap: 10px 24px; justify-content: space-between; padding-block: 26px 36px; font-size: 12.5px; color: var(--grey); }
.v3-foot nav { display: flex; gap: 20px; }
.v3-foot a { text-decoration: none; }
.v3-foot a:hover { text-decoration: underline; }

@media (prefers-reduced-motion: reduce) {
  .v3 *, .v3 *::before, .v3 *::after { animation: none !important; transition: none !important; }
}
`;
