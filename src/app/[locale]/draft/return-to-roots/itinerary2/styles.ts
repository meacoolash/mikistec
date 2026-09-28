export const css = `
.i2 {
  --ink: #000000;
  --grey: #5A5A5A;
  --rule: #DCDCDC;
  background: #FFFFFF;
  color: var(--ink);
  font-family: var(--rr-sans), ui-sans-serif, system-ui, sans-serif;
  font-weight: 300;
  -webkit-font-smoothing: antialiased;
  padding-bottom: 56px;
}
.i2 *, .i2 *::before, .i2 *::after { box-sizing: border-box; }
.i2 h1, .i2 h2, .i2 h3, .i2 h4 {
  margin: 0;
  font-family: var(--font-display), ui-sans-serif, system-ui, sans-serif;
  font-weight: 800;
}
.i2 p, .i2 ul { margin: 0; }
.i2 ::selection { background: #000; color: #fff; }

.i2-col { max-width: 1560px; margin: 0 auto; padding-inline: 32px; }

/* ---------- HEADER ---------- */
.i2-head { padding: 28px 0 34px; border-bottom: 2px solid var(--ink); }
.i2-back {
  display: inline-flex; align-items: center; gap: 9px; text-decoration: none; color: var(--grey);
  font-size: 11.5px; letter-spacing: 0.16em; text-transform: uppercase;
}
.i2-back:hover { color: var(--ink); }
.i2-headline { display: grid; gap: 16px; align-items: end; margin-top: 36px; }
@media (min-width: 900px) { .i2-headline { grid-template-columns: 1fr 420px; gap: 48px; } }
.i2-eye {
  display: block; margin-bottom: 12px; color: var(--grey);
  font-size: 11px; letter-spacing: 0.26em; text-transform: uppercase; font-weight: 400;
}
.i2-title { font-size: clamp(2rem, 1.4rem + 2.4vw, 3rem); line-height: 1; letter-spacing: -0.035em; }
.i2-lede { font-size: 14.5px; line-height: 1.55; color: var(--grey); max-width: 52ch; }

/* ---------- COLUMNS ---------- */
.i2-grid { display: grid; gap: 0; }
@media (min-width: 1200px) { .i2-grid { grid-template-columns: repeat(5, 1fr); } }
@media (min-width: 860px) and (max-width: 1199px) { .i2-grid { grid-template-columns: repeat(3, 1fr); } }
@media (min-width: 620px) and (max-width: 859px) { .i2-grid { grid-template-columns: repeat(2, 1fr); } }

.i2-day { padding: 26px 26px 40px; border-left: 1px solid var(--rule); }
@media (min-width: 1200px) { .i2-day:nth-child(5n + 1) { border-left: 0; padding-left: 0; } }
@media (min-width: 860px) and (max-width: 1199px) { .i2-day:nth-child(3n + 1) { border-left: 0; padding-left: 0; } }
@media (min-width: 620px) and (max-width: 859px) { .i2-day:nth-child(2n + 1) { border-left: 0; padding-left: 0; } }
@media (max-width: 619px) { .i2-day { border-left: 0; padding-inline: 0; border-top: 1px solid var(--rule); } .i2-day:first-child { border-top: 0; } }

.i2-dayhead { min-height: 138px; padding-bottom: 16px; border-bottom: 1.5px solid var(--ink); }
@media (max-width: 619px) { .i2-dayhead { min-height: 0; } }
.i2-dayn { font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--grey); }
.i2-daytitle { margin-top: 10px; font-size: 22px; line-height: 1.1; letter-spacing: -0.028em; }
.i2-daysum { margin-top: 9px; font-size: 12.5px; line-height: 1.5; color: var(--grey); }

.i2-slot { padding: 15px 0; border-bottom: 1px solid var(--rule); }
.i2-time {
  font-size: 13px; letter-spacing: 0.03em; color: var(--ink);
  font-variant-numeric: tabular-nums; white-space: nowrap;
}
.i2-slottitle { margin-top: 5px; font-size: 18px; line-height: 1.15; letter-spacing: -0.022em; }
.i2-desc { margin-top: 7px; font-size: 13px; line-height: 1.5; color: var(--grey); }

.i2-sub { margin-top: 8px; padding: 0; list-style: none; display: grid; gap: 5px; }
.i2-sub li { display: grid; grid-template-columns: 44px 1fr; gap: 9px; align-items: baseline; }
.i2-sub .t { font-size: 11.5px; color: var(--ink); font-variant-numeric: tabular-nums; }
.i2-sub .x { font-size: 13px; line-height: 1.5; color: var(--grey); }

/* ---------- CLOSE ---------- */
.i2-close { margin-top: 20px; border-top: 2px solid var(--ink); padding: 42px 0 10px; }
.i2-close-in { display: grid; gap: 20px; align-items: center; }
@media (min-width: 780px) { .i2-close-in { grid-template-columns: 1fr auto; gap: 40px; } }
.i2-closetitle { font-size: clamp(1.5rem, 1.2rem + 1.2vw, 2rem); line-height: 1.1; letter-spacing: -0.028em; }
.i2-close p { margin-top: 8px; font-size: 14.5px; line-height: 1.55; color: var(--grey); max-width: 50ch; }
.i2-btn {
  display: inline-flex; align-items: center; gap: 10px; text-decoration: none; white-space: nowrap;
  font-size: 11.5px; letter-spacing: 0.2em; text-transform: uppercase;
  padding: 15px 28px; background: var(--ink); color: #fff; border: 1px solid var(--ink);
  transition: background 200ms, color 200ms;
}
.i2-btn:hover { background: #fff; color: var(--ink); }

.i2-foot {
  margin-top: 52px; border-top: 1px solid var(--rule); padding: 22px 0 0;
  display: flex; justify-content: space-between; gap: 16px; flex-wrap: wrap;
  font-size: 12px; color: var(--grey);
}
.i2-foot a { color: var(--ink); text-decoration: none; }
.i2-draft {
  position: fixed; left: 0; right: 0; bottom: 0; z-index: 60; background: #000; color: #fff;
  font-size: 10px; letter-spacing: 0.22em; text-transform: uppercase;
  padding: 9px 20px; display: flex; justify-content: space-between; gap: 14px; flex-wrap: wrap;
}
.i2-draft a { color: #fff; }

/* ---------- EMBEDDED IN THE LANDING PAGE ---------- */
.i2-embed { padding-block: clamp(64px, 8vw, 104px) clamp(56px, 7vw, 88px); padding-bottom: clamp(56px, 7vw, 88px); }
.i2-embed .i2-head { padding-top: 0; }
.i2-embed .i2-headline { margin-top: 0; }
.i2-embed-out { margin-top: 40px; }
@media (min-width: 900px) { .i2-embed-out { display: none; } }

/* On phones the embedded programme collapses to a short day list + a link out. */
.i2-brief { display: none; }
.i2-brieflist { list-style: none; margin: 0; padding: 0; }
.i2-brieflist li { padding-block: 22px; border-top: 1px solid var(--rule); }
.i2-brieflist li:first-child { border-top: 0; padding-top: 6px; }
.i2-brieflist .i2-daytitle { margin-top: 8px; }
@media (max-width: 699px) {
  .i2-brief { display: block; }
  .i2-embed .i2-gridwrap { display: none; }
  .i2-embed-out { margin-top: 28px; }
}

/* ---------- PRINT (landscape, five columns) ---------- */
@media print {
  @page { size: landscape; margin: 12mm; }
  .i2 { padding: 0; }
  .i2-draft, .i2-back, .i2-btn { display: none !important; }
  .i2-head { padding: 0 0 12pt; }
  .i2-col { max-width: none; padding-inline: 0; }
  .i2-grid { grid-template-columns: repeat(5, 1fr) !important; }
  .i2-day { padding: 12pt 10pt 0; break-inside: avoid; }
  .i2-day:nth-child(5n + 1) { border-left: 0; padding-left: 0; }
  .i2-slot { padding: 6pt 0; break-inside: avoid; }
}
`;
