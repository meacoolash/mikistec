export const css = `
.it {
  --ink: #000000;
  --grey: #5A5A5A;
  --rule: #DCDCDC;
  background: #FFFFFF;
  color: var(--ink);
  font-family: var(--rr-sans), ui-sans-serif, system-ui, sans-serif;
  font-weight: 300;
  -webkit-font-smoothing: antialiased;
  padding-bottom: 52px;
}
.it *, .it *::before, .it *::after { box-sizing: border-box; }
.it h1, .it h2, .it h3 { margin: 0; font-weight: 400; }
.it p, .it ul { margin: 0; }
.it ::selection { background: #000; color: #fff; }

.it-col { max-width: 1120px; margin: 0 auto; padding-inline: 28px; }

/* ---------- HEADER ---------- */
.it-head { padding: 28px 0 40px; border-bottom: 2px solid var(--ink); }
.it-back {
  display: inline-flex; align-items: center; gap: 9px; text-decoration: none; color: var(--grey);
  font-size: 11.5px; letter-spacing: 0.16em; text-transform: uppercase;
}
.it-back:hover { color: var(--ink); }
.it-headline { display: grid; gap: 18px; align-items: end; margin-top: 40px; }
@media (min-width: 900px) { .it-headline { grid-template-columns: 1fr 360px; gap: 48px; } }
.it-eye {
  display: block; margin-bottom: 14px; color: var(--grey);
  font-size: 11px; letter-spacing: 0.26em; text-transform: uppercase; font-weight: 400;
}
.it-head h1 {
  font-size: clamp(2.2rem, 1.4rem + 3vw, 3.4rem); line-height: 1; letter-spacing: -0.035em; font-weight: 400;
}
.it-lede { font-size: 15px; line-height: 1.55; color: var(--grey); max-width: 46ch; }

/* ---------- PROGRAMME ---------- */
.it-day { padding-top: 44px; }
.it-dayhead {
  display: grid; gap: 4px; align-items: baseline;
  padding-bottom: 12px; border-bottom: 1.5px solid var(--ink);
}
@media (min-width: 860px) { .it-dayhead { grid-template-columns: 152px 1fr auto; gap: 34px; } }
.it-dayn { font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; font-weight: 400; color: var(--ink); }
.it-dayhead h2 { font-size: clamp(1.6rem, 1.2rem + 1.4vw, 2.1rem); line-height: 1.1; letter-spacing: -0.025em; }
.it-daysum { font-size: 13px; line-height: 1.5; color: var(--grey); max-width: 40ch; }
@media (min-width: 860px) { .it-daysum { justify-self: end; text-align: right; } }

.it-row {
  display: grid; gap: 6px 34px; align-items: baseline;
  padding: 15px 0; border-bottom: 1px solid var(--rule);
}
@media (min-width: 1000px) { .it-row { grid-template-columns: 152px minmax(220px, 0.8fr) 1.3fr; } }
@media (min-width: 860px) and (max-width: 999px) { .it-row { grid-template-columns: 140px 1fr; } }

.it-time {
  font-size: 19px; font-weight: 400; line-height: 1.2; letter-spacing: 0;
  color: var(--ink); font-variant-numeric: tabular-nums; white-space: nowrap;
}
.it-title { font-size: 24px; font-weight: 400; line-height: 1.12; letter-spacing: -0.028em; color: var(--ink); }
.it-desc { font-size: 14.5px; line-height: 1.55; color: var(--grey); max-width: 54ch; }

.it-sub { padding: 0; list-style: none; display: grid; gap: 4px; }
.it-sub li { display: grid; grid-template-columns: 50px 1fr; gap: 12px; align-items: baseline; }
.it-sub .t { font-size: 12.5px; color: var(--ink); font-variant-numeric: tabular-nums; }
.it-sub .x { font-size: 14.5px; line-height: 1.55; color: var(--grey); }

/* ---------- CLOSE ---------- */
.it-close { margin-top: 60px; border-top: 2px solid var(--ink); padding: 46px 0 10px; }
.it-close-in { display: grid; gap: 20px; align-items: center; }
@media (min-width: 780px) { .it-close-in { grid-template-columns: 1fr auto; gap: 40px; } }
.it-close h2 { font-size: clamp(1.5rem, 1.2rem + 1.2vw, 2rem); line-height: 1.1; letter-spacing: -0.028em; }
.it-close p { margin-top: 8px; font-size: 14.5px; line-height: 1.55; color: var(--grey); max-width: 50ch; }
.it-btn {
  display: inline-flex; align-items: center; gap: 10px; text-decoration: none; white-space: nowrap;
  font-size: 11.5px; letter-spacing: 0.2em; text-transform: uppercase;
  padding: 15px 28px; background: var(--ink); color: #fff; border: 1px solid var(--ink);
  transition: background 200ms, color 200ms;
}
.it-btn:hover { background: #fff; color: var(--ink); }

/* ---------- FOOT ---------- */
.it-foot {
  margin-top: 56px; border-top: 1px solid var(--rule); padding: 22px 0 0;
  display: flex; justify-content: space-between; gap: 16px; flex-wrap: wrap;
  font-size: 12px; color: var(--grey);
}
.it-foot a { color: var(--ink); text-decoration: none; }
.it-draft {
  position: fixed; left: 0; right: 0; bottom: 0; z-index: 60; background: #000;
  color: #fff; font-size: 10px; letter-spacing: 0.22em; text-transform: uppercase;
  padding: 9px 20px; display: flex; justify-content: space-between; gap: 14px; flex-wrap: wrap;
}
.it-draft a { color: #fff; }

/* ---------- NARROW ---------- */
@media (max-width: 859px) {
  .it-col { padding-inline: 20px; }
  .it-day { padding-top: 34px; }
  .it-daysum { margin-top: 6px; }
  .it-row { gap: 4px; padding: 15px 0; }
  .it-time { font-size: 15px; color: var(--grey); }
  .it-title { font-size: 21px; }
  .it-desc, .it-sub .x { font-size: 14px; }
}

/* ---------- PRINT ---------- */
@media print {
  .it { padding: 0; }
  .it-draft, .it-back, .it-btn { display: none !important; }
  .it-head { padding: 0 0 14pt; }
  .it-day { break-inside: avoid; padding-top: 18pt; }
  .it-row { break-inside: avoid; padding: 6pt 0; }
  .it-col { max-width: none; padding-inline: 0; }
}
`;
