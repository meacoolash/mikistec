export const css = `
.v3 {
  --base: #EEE6D8;
  --ink: #1E1A16;
  --grey: #6B6258;
  --blue: #C4461F;   /* ember: hero, first card, numbers */
  --orange: #1F5F5B; /* deep green: scribble, hovers, focus */
  --sand: #DFE8DA;   /* pale sage */
  --white: #FFFBF4;
  --shadow: 5px 5px 0 var(--ink);
  background-color: var(--base);
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0.12 0 0 0 0 0.1 0 0 0 0 0.08 0 0 0 .09 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
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
  cursor: pointer; transition: transform .15s ease, box-shadow .15s ease;
}
.v3 .v3-btn { box-shadow: 3px 3px 0 var(--blue); }
.v3 .v3-btn:hover { transform: translate(-2px, -2px); box-shadow: 5px 5px 0 var(--blue); }
.v3 .v3-btn--ghost { background: transparent; color: var(--ink); }
.v3 .v3-btn--white { background: var(--white); color: var(--ink); border-color: var(--white); }
.v3 .v3-btn--white { box-shadow: 3px 3px 0 var(--ink); }
.v3 .v3-btn--white:hover { box-shadow: 5px 5px 0 var(--ink); }
.v3 .v3-btn[disabled] { box-shadow: none; }
.v3 .v3-btn[disabled] { opacity: .45; cursor: not-allowed; transform: none; box-shadow: none; }

/* ---------- header ---------- */
.v3-head { display: flex; align-items: center; justify-content: space-between; gap: 16px; padding-block: 18px; }
.v3-logo { display: flex; align-items: center; gap: 10px; text-decoration: none; font-size: 15px; line-height: 0.95; letter-spacing: 0.02em; text-transform: uppercase; }
.v3-logo svg { width: 30px; height: 30px; flex: none; }
.v3-nav { display: flex; align-items: center; gap: 22px; font-size: 13.5px; }
.v3-nav a { text-decoration: none; }
.v3-nav a:hover { text-decoration: underline; text-underline-offset: 4px; }
.v3-nav .v3-hide { display: none; }
@media (min-width: 860px) { .v3-nav .v3-hide { display: inline; } }
.v3-fomo { border: 1.5px solid var(--ink); padding: 8px 16px; background: var(--blue); color: var(--white) !important; transform: rotate(-3deg); box-shadow: 3px 3px 0 var(--ink); }
.v3-fomo:hover { transform: rotate(0); text-decoration: none !important; }

/* ---------- hero ---------- */
.v3-hero {
  position: relative; isolation: isolate; border: 1.5px solid var(--ink); box-shadow: var(--shadow);
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
  text-shadow: 0 2px 24px rgba(0,0,0,.18);
}
.v3-hero .v3-lead { max-width: 58ch; margin: 22px auto 30px; font-size: 14.5px; line-height: 1.7; opacity: .95; }
@media (min-width: 900px) { .v3-hero h1, .v3-hero .v3-lead { margin-inline: 0; } }
.v3-badge {
  position: absolute; top: 14px; left: 14px;
  font-size: 11px; letter-spacing: .14em; text-transform: uppercase;
  background: var(--ink); color: var(--white); padding: 5px 10px;
}

/* ---------- strip ---------- */
.v3-strip {
  margin-top: 40px; border: 1.5px solid var(--ink); box-shadow: var(--shadow); background: var(--white);
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
.v3-scribble { display: block; width: min(320px, 70%); margin-top: 28px; color: var(--orange); }
.v3-scribble path { stroke-dasharray: 1; stroke-dashoffset: 1; }
.v3-scribble.is-in path { animation: v3-draw 2.4s cubic-bezier(.6,.1,.3,1) forwards; }
@keyframes v3-draw { to { stroke-dashoffset: 0; } }
@media (min-width: 900px) { .v3-problem .v3-body { padding-top: 180px; } }
.v3-problem .v3-btns { margin-top: 32px; }

/* ---------- paths ---------- */
.v3-sec-head { display: grid; gap: 14px; margin-bottom: 44px; }
@media (min-width: 900px) { .v3-sec-head { grid-template-columns: 1fr 1fr; gap: 72px; align-items: end; } }
.v3-paths { display: grid; gap: 24px; }
@media (min-width: 900px) { .v3-paths { grid-template-columns: 1fr 1fr; } }
.v3-card { border: 1.5px solid var(--ink); box-shadow: var(--shadow); display: flex; flex-direction: column; padding: 30px 24px 32px; min-height: 100%; }
@media (min-width: 720px) { .v3-card { padding: 40px 40px 44px; } }
.v3-card--blue { background: var(--blue); color: var(--white); }
.v3-card--ink { background: var(--ink); color: var(--white); box-shadow: 5px 5px 0 var(--blue); }
.v3-card-top { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 48px; }
.v3-card-n { font-size: 13px; opacity: .8; }
.v3-card h3 { font-size: clamp(1.6rem, 1.2rem + 1.4vw, 2.2rem); line-height: 1.1; font-weight: 700; letter-spacing: -0.02em; }
.v3-card > p { margin-top: 18px; opacity: .92; }
.v3-card ul { margin-top: 26px; border-top: 1px solid currentColor; }
.v3-card li { display: flex; gap: 12px; padding: 11px 0; border-bottom: 1px solid rgba(255,255,255,.28); font-size: 14px; }
.v3-card li::before { content: "→"; opacity: .7; }
.v3-card .v3-btn { margin-top: auto; align-self: flex-start; }
.v3-card ul + .v3-btn { margin-top: 32px; }
.v3-grow {
  margin-top: 24px; border: 1.5px solid var(--ink); box-shadow: var(--shadow); background: var(--sand);
  display: grid; gap: 14px; padding: 24px;
}
@media (min-width: 900px) { .v3-grow { grid-template-columns: 200px 1fr auto; align-items: center; gap: 32px; padding: 26px 40px; } }
.v3-grow a { font-size: 13.5px; font-weight: 500; }

/* ---------- steps ---------- */
.v3-steps { display: grid; border-top: 1px solid var(--ink); }
@media (min-width: 900px) { .v3-steps { grid-template-columns: repeat(3, 1fr); border-top: 0; border-left: 1px solid var(--ink); } }
.v3-step { padding: 26px 0; border-bottom: 1px solid var(--ink); }
@media (min-width: 900px) { .v3-step { padding: 28px 32px 40px; border-bottom: 0; border-right: 1px solid var(--ink); border-top: 1px solid var(--ink); border-bottom: 1px solid var(--ink); } }
.v3-step-n { font-size: 13px; color: var(--blue); font-weight: 700; }
.v3-step h3 { margin: 26px 0 10px; font-size: 13px; letter-spacing: .14em; text-transform: uppercase; font-weight: 500; }
.v3-step p { color: var(--grey); font-size: 14px; }

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

/* ---------- faq ---------- */
.v3-faq { border-top: 1px solid var(--ink); }
.v3-faq details { border-bottom: 1px solid var(--ink); }
.v3-faq summary { list-style: none; cursor: pointer; display: flex; justify-content: space-between; gap: 20px; padding: 20px 0; font-weight: 500; }
.v3-faq summary::-webkit-details-marker { display: none; }
.v3-faq summary::after { content: "+"; font-weight: 400; font-size: 20px; line-height: 1; transition: transform .2s ease; }
.v3-faq details[open] summary::after { transform: rotate(45deg); }
.v3-faq details p { padding: 0 0 22px; max-width: 64ch; color: var(--grey); }

/* ---------- contact ---------- */
.v3-contact { background: var(--white); box-shadow: var(--shadow); border: 1.5px solid var(--ink); padding: clamp(32px, 6vw, 72px) 22px; }
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
  .v3-scribble path { stroke-dashoffset: 0; }
}
`;
