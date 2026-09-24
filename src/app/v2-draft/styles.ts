export const css = `
.v2 {
  --base: #F2F2F2;
  --ink: #000;
  --grey: #5C5C5C;
  --blue: #5186EE;
  --orange: #FF8200;
  --sand: #F6EDE4;
  --white: #fff;
  background: var(--base);
  color: var(--ink);
  font-family: var(--v2-mono), ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 15px;
  line-height: 1.65;
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
}
.v2 *, .v2 *::before, .v2 *::after { box-sizing: border-box; }
.v2 h1, .v2 h2, .v2 h3, .v2 p, .v2 ul { margin: 0; }
.v2 h1, .v2 h2, .v2 h3 { font-family: inherit; }
.v2 ul { padding: 0; list-style: none; }
.v2 a { color: inherit; }
.v2 ::selection { background: var(--orange); color: var(--ink); }
.v2 :focus-visible { outline: 2px solid var(--orange); outline-offset: 3px; }

.v2-wrap { max-width: 1240px; margin: 0 auto; padding-inline: 16px; }
@media (min-width: 720px) { .v2-wrap { padding-inline: 28px; } }
.v2-inner { max-width: 1120px; margin: 0 auto; }

/* ---------- type ---------- */
.v2-h {
  font-size: clamp(1.9rem, 1.2rem + 2.6vw, 3.1rem);
  line-height: 1.08;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: -0.01em;
}
.v2-h3 { font-size: 13px; letter-spacing: 0.14em; text-transform: uppercase; font-weight: 500; }
.v2-eye { font-size: 12px; letter-spacing: 0.16em; text-transform: uppercase; font-weight: 500; }
.v2-muted { color: var(--grey); }
.v2-body p + p { margin-top: 1.1em; }

/* ---------- buttons ---------- */
.v2-btns { display: flex; flex-wrap: wrap; gap: 12px; }
.v2 .v2-btn {
  display: inline-flex; align-items: center; justify-content: center; gap: 10px;
  min-height: 46px; padding: 0 22px;
  font: inherit; font-size: 13.5px; font-weight: 500; text-decoration: none;
  border: 1px solid var(--ink); background: var(--ink); color: var(--white);
  cursor: pointer; transition: transform .15s ease, box-shadow .15s ease;
}
.v2 .v2-btn:hover { transform: translate(-2px, -2px); box-shadow: 3px 3px 0 var(--orange); }
.v2 .v2-btn--ghost { background: transparent; color: var(--ink); }
.v2 .v2-btn--white { background: var(--white); color: var(--ink); border-color: var(--white); }
.v2 .v2-btn--white:hover { box-shadow: 3px 3px 0 var(--ink); }
.v2 .v2-btn[disabled] { opacity: .45; cursor: not-allowed; transform: none; box-shadow: none; }

/* ---------- header ---------- */
.v2-head { display: flex; align-items: center; justify-content: space-between; gap: 16px; padding-block: 18px; }
.v2-logo { display: flex; align-items: center; gap: 10px; text-decoration: none; font-size: 15px; line-height: 0.95; letter-spacing: 0.02em; text-transform: uppercase; }
.v2-logo svg { width: 30px; height: 30px; flex: none; }
.v2-nav { display: flex; align-items: center; gap: 22px; font-size: 13.5px; }
.v2-nav a { text-decoration: none; }
.v2-nav a:hover { text-decoration: underline; text-underline-offset: 4px; }
.v2-nav .v2-hide { display: none; }
@media (min-width: 860px) { .v2-nav .v2-hide { display: inline; } }
.v2-fomo { border: 1px solid var(--ink); padding: 8px 16px; }
.v2-fomo:hover { background: var(--ink); color: var(--white); text-decoration: none !important; }

/* ---------- hero ---------- */
.v2-hero {
  position: relative; isolation: isolate;
  background: var(--blue); color: var(--white);
  min-height: min(88svh, 860px);
  display: grid; align-items: center; gap: 28px;
  padding: 40px 20px 56px; text-align: center; overflow: hidden;
}
@media (min-width: 900px) {
  .v2-hero { grid-template-columns: 5fr 7fr; gap: 56px; padding: 56px 64px 56px 32px; text-align: left; }
}
.v2-hero-art { mix-blend-mode: multiply; justify-self: center; width: min(300px, 70vw); }
@media (min-width: 900px) { .v2-hero-art { width: 100%; max-width: 440px; } }
.v2-hero-art img {
  display: block; width: 100%; height: auto;
  filter: saturate(.6) brightness(1.18) contrast(1.12);
  -webkit-mask-image: radial-gradient(ellipse 50% 50% at 50% 50%, #000 70%, transparent 100%);
          mask-image: radial-gradient(ellipse 50% 50% at 50% 50%, #000 70%, transparent 100%);
}
.v2-hero .v2-eye { margin-bottom: 18px; }
.v2-hero h1 {
  max-width: 21ch; margin-inline: auto;
  font-size: clamp(1.9rem, 1.1rem + 3.2vw, 3.6rem);
  line-height: 1.1; font-weight: 700; letter-spacing: -0.025em;
  text-shadow: 0 2px 24px rgba(0,0,0,.18);
}
.v2-hero .v2-lead { max-width: 58ch; margin: 22px auto 30px; font-size: 14.5px; line-height: 1.7; opacity: .95; }
@media (min-width: 900px) { .v2-hero h1, .v2-hero .v2-lead { margin-inline: 0; } }
.v2-badge {
  position: absolute; top: 14px; left: 14px;
  font-size: 11px; letter-spacing: .14em; text-transform: uppercase;
  background: var(--ink); color: var(--white); padding: 5px 10px;
}

/* ---------- strip ---------- */
.v2-strip {
  margin-top: 40px; border: 1px solid var(--ink);
  display: grid; gap: 22px; padding: 30px 22px;
}
@media (min-width: 860px) { .v2-strip { grid-template-columns: 1fr 1fr; align-items: center; padding: 44px 56px; gap: 56px; } }
.v2-strip h2 { font-size: clamp(1.25rem, 1rem + 0.9vw, 1.6rem); font-weight: 400; line-height: 1.25; text-transform: uppercase; }
.v2-strip p { margin-bottom: 18px; }

/* ---------- sections ---------- */
.v2-sec { padding-block: clamp(72px, 10vw, 128px); }
.v2-sec--tight { padding-top: 0; }

.v2-problem { display: grid; gap: 40px; }
@media (min-width: 900px) { .v2-problem { grid-template-columns: 1fr 1fr; gap: 72px; } }
.v2-problem .v2-h { max-width: 16ch; }
.v2-scribble { display: block; width: min(320px, 70%); margin-top: 28px; color: var(--orange); }
.v2-scribble path { stroke-dasharray: 1; stroke-dashoffset: 1; }
.v2-scribble.is-in path { animation: v2-draw 2.4s cubic-bezier(.6,.1,.3,1) forwards; }
@keyframes v2-draw { to { stroke-dashoffset: 0; } }
@media (min-width: 900px) { .v2-problem .v2-body { padding-top: 180px; } }
.v2-problem .v2-btns { margin-top: 32px; }

/* ---------- paths ---------- */
.v2-sec-head { display: grid; gap: 14px; margin-bottom: 44px; }
@media (min-width: 900px) { .v2-sec-head { grid-template-columns: 1fr 1fr; gap: 72px; align-items: end; } }
.v2-paths { display: grid; gap: 16px; }
@media (min-width: 900px) { .v2-paths { grid-template-columns: 1fr 1fr; } }
.v2-card { display: flex; flex-direction: column; padding: 30px 24px 32px; min-height: 100%; }
@media (min-width: 720px) { .v2-card { padding: 40px 40px 44px; } }
.v2-card--blue { background: var(--blue); color: var(--white); }
.v2-card--ink { background: var(--ink); color: var(--white); }
.v2-card-top { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 48px; }
.v2-card-n { font-size: 13px; opacity: .8; }
.v2-card h3 { font-size: clamp(1.6rem, 1.2rem + 1.4vw, 2.2rem); line-height: 1.1; font-weight: 700; letter-spacing: -0.02em; }
.v2-card > p { margin-top: 18px; opacity: .92; }
.v2-card ul { margin-top: 26px; border-top: 1px solid currentColor; }
.v2-card li { display: flex; gap: 12px; padding: 11px 0; border-bottom: 1px solid rgba(255,255,255,.28); font-size: 14px; }
.v2-card li::before { content: "→"; opacity: .7; }
.v2-card .v2-btn { margin-top: auto; align-self: flex-start; }
.v2-card ul + .v2-btn { margin-top: 32px; }
.v2-grow {
  margin-top: 16px; border: 1px solid var(--ink); background: var(--sand);
  display: grid; gap: 14px; padding: 24px;
}
@media (min-width: 900px) { .v2-grow { grid-template-columns: 200px 1fr auto; align-items: center; gap: 32px; padding: 26px 40px; } }
.v2-grow a { font-size: 13.5px; font-weight: 500; }

/* ---------- steps ---------- */
.v2-steps { display: grid; border-top: 1px solid var(--ink); }
@media (min-width: 900px) { .v2-steps { grid-template-columns: repeat(3, 1fr); border-top: 0; border-left: 1px solid var(--ink); } }
.v2-step { padding: 26px 0; border-bottom: 1px solid var(--ink); }
@media (min-width: 900px) { .v2-step { padding: 28px 32px 40px; border-bottom: 0; border-right: 1px solid var(--ink); border-top: 1px solid var(--ink); border-bottom: 1px solid var(--ink); } }
.v2-step-n { font-size: 13px; color: var(--blue); font-weight: 700; }
.v2-step h3 { margin: 26px 0 10px; font-size: 13px; letter-spacing: .14em; text-transform: uppercase; font-weight: 500; }
.v2-step p { color: var(--grey); font-size: 14px; }

/* ---------- about ---------- */
.v2-about { display: grid; gap: 36px; }
@media (min-width: 900px) { .v2-about { grid-template-columns: 360px 1fr; gap: 72px; align-items: start; } }
.v2-about-photo { position: relative; max-width: 360px; }
.v2-about-photo img { display: block; width: 100%; height: auto; filter: grayscale(1) contrast(1.1); }
.v2-about-photo::after { content: ""; position: absolute; inset: 0; background: var(--orange); mix-blend-mode: multiply; opacity: .0; transition: opacity .4s ease; }
.v2-about-photo:hover::after { opacity: .35; }
.v2-facts { border-top: 1px solid var(--ink); margin-top: 28px; }
.v2-facts li { display: grid; grid-template-columns: 3ch 1fr; gap: 14px; padding: 16px 0; border-bottom: 1px solid var(--ink); }
.v2-facts li span { color: var(--blue); font-weight: 700; font-size: 13px; }

/* ---------- faq ---------- */
.v2-faq { border-top: 1px solid var(--ink); }
.v2-faq details { border-bottom: 1px solid var(--ink); }
.v2-faq summary { list-style: none; cursor: pointer; display: flex; justify-content: space-between; gap: 20px; padding: 20px 0; font-weight: 500; }
.v2-faq summary::-webkit-details-marker { display: none; }
.v2-faq summary::after { content: "+"; font-weight: 400; font-size: 20px; line-height: 1; transition: transform .2s ease; }
.v2-faq details[open] summary::after { transform: rotate(45deg); }
.v2-faq details p { padding: 0 0 22px; max-width: 64ch; color: var(--grey); }

/* ---------- contact ---------- */
.v2-contact { border: 1px solid var(--ink); padding: clamp(32px, 6vw, 72px) 22px; }
@media (min-width: 720px) { .v2-contact { padding-inline: 56px; } }
.v2-contact-in { display: grid; gap: 36px; max-width: 1120px; margin: 0 auto; }
@media (min-width: 900px) { .v2-contact-in { grid-template-columns: 1fr 1fr; gap: 72px; } }
.v2-contact .v2-h { max-width: 14ch; }
.v2-contact .v2-lead { margin-top: 18px; color: var(--grey); }
.v2-form { display: grid; gap: 22px; }
.v2-form label, .v2-form legend { display: block; font-size: 12px; letter-spacing: .14em; text-transform: uppercase; color: var(--grey); margin-bottom: 6px; }
.v2-form input[type=text], .v2-form input[type=email] {
  width: 100%; font: inherit; color: var(--ink); background: transparent;
  border: 0; border-bottom: 1px solid var(--ink); padding: 10px 0;
}
.v2-form input:focus { outline: none; border-color: var(--blue); }
.v2-form input::placeholder { color: #9A9A9A; }
.v2-form fieldset { border: 0; padding: 0; margin: 0; }
.v2-choices { display: flex; flex-wrap: wrap; gap: 10px; }
.v2-choice input { position: absolute; opacity: 0; pointer-events: none; }
.v2-choice span { display: inline-block; border: 1px solid var(--ink); padding: 9px 16px; font-size: 13.5px; cursor: pointer; }
.v2-choice input:checked + span { background: var(--blue); border-color: var(--blue); color: var(--white); }
.v2-choice input:focus-visible + span { outline: 2px solid var(--orange); outline-offset: 3px; }
.v2-note { font-size: 12.5px; color: var(--grey); }

/* ---------- footer ---------- */
.v2-foot { display: flex; flex-wrap: wrap; gap: 10px 24px; justify-content: space-between; padding-block: 26px 36px; font-size: 12.5px; color: var(--grey); }
.v2-foot nav { display: flex; gap: 20px; }
.v2-foot a { text-decoration: none; }
.v2-foot a:hover { text-decoration: underline; }

@media (prefers-reduced-motion: reduce) {
  .v2 *, .v2 *::before, .v2 *::after { animation: none !important; transition: none !important; }
  .v2-scribble path { stroke-dashoffset: 0; }
}
`;
