export const css = `
.ln {
  --paper: #FAF8F3;
  --card: #FFFFFF;
  --ink: #1B1B21;
  --soft: #6B6B76;
  --rule: rgba(27,27,33,0.12);
  --hair: rgba(27,27,33,0.06);
  --gold: #A87615;
  --sky: #3A6BA5;
  --rust: #B8442A;
  --moss: #3B7F57;
  position: fixed; inset: 0;
  display: flex; flex-direction: column;
  background: var(--paper);
  color: var(--ink);
  font-family: var(--rr-sans), ui-sans-serif, system-ui, sans-serif;
  font-weight: 300;
  -webkit-font-smoothing: antialiased;
}
.ln *, .ln *::before, .ln *::after { box-sizing: border-box; }
.ln h1, .ln h2 { margin: 0; font-weight: 400; }
.ln p { margin: 0; }

/* top bar ----------------------------------------------------------- */
.ln-bar {
  flex: none; display: flex; align-items: center; gap: 14px 18px;
  flex-wrap: wrap; padding: 14px 20px;
  border-bottom: 1px solid var(--rule);
}
.ln-bar h1 {
  font-family: var(--rr-display), Georgia, serif;
  font-size: 26px; letter-spacing: -0.01em; line-height: 1;
}
.ln-sub {
  font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase;
  color: var(--soft);
}
.ln-keys { display: flex; flex-wrap: wrap; gap: 7px; margin-left: auto; }
.ln-key {
  display: inline-flex; align-items: center; gap: 7px;
  padding: 5px 11px; border-radius: 999px; cursor: pointer;
  border: 1px solid var(--rule); background: var(--card);
  color: var(--soft); font: inherit; font-size: 11.5px; letter-spacing: 0.05em;
  opacity: 0.5; transition: opacity .15s, color .15s, border-color .15s;
}
.ln-key.is-on { opacity: 1; color: var(--ink); border-color: rgba(27,27,33,0.26); }
.ln-key i { width: 14px; height: 2px; border-radius: 2px; background: currentColor; }
.ln-key-taught i { background: var(--gold); }
.ln-key-read i { background: var(--sky); }
.ln-key-against i { background: var(--rust); }
.ln-key-with i { background: var(--moss); }
.ln-zoom { display: flex; gap: 6px; }
.ln-zoom button {
  min-width: 34px; height: 28px; padding: 0 10px; cursor: pointer;
  border: 1px solid var(--rule); border-radius: 7px; background: var(--card);
  color: var(--soft); font: inherit; font-size: 12px;
}
.ln-zoom button:hover { color: var(--ink); border-color: rgba(27,27,33,0.3); }

/* stage ------------------------------------------------------------- */
.ln-stage {
  position: relative; flex: 1; min-height: 0; overflow: hidden;
  background: radial-gradient(120% 90% at 20% 0%, #FFFFFF 0%, #F6F3EC 100%);
  cursor: grab; touch-action: none; user-select: none;
}
.ln-stage.is-drag { cursor: grabbing; }
.ln-plane { position: absolute; left: 0; top: 0; transform-origin: 0 0; }
.ln-svg { position: absolute; left: 0; top: 0; pointer-events: none; }
.ln-hint, .ln-back {
  position: absolute; bottom: 12px;
  font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase;
  color: rgba(27,27,33,0.3);
}
.ln-hint { right: 16px; pointer-events: none; }
.ln-back { left: 16px; text-decoration: none; }
.ln-back:hover { color: var(--ink); }

.ln-lane { stroke: var(--hair); stroke-width: 1; }
.ln-lane-label {
  fill: rgba(27,27,33,0.3); font-size: 10.5px; font-weight: 500;
  letter-spacing: 0.22em; text-transform: uppercase;
}
.ln-tick { stroke: rgba(27,27,33,0.05); stroke-width: 1; }
.ln-tick-label {
  fill: rgba(27,27,33,0.34); font-size: 10.5px;
  letter-spacing: 0.12em; text-anchor: middle;
}

/* links ------------------------------------------------------------- */
.ln-link {
  fill: none; stroke-width: 1.1; opacity: 0.28;
  transition: opacity .18s, stroke-width .18s;
}
.ln-taught { stroke: var(--gold); }
.ln-read { stroke: var(--sky); }
.ln-against { stroke: var(--rust); stroke-dasharray: 5 4; }
.ln-with { stroke: var(--moss); }
.ln-link.is-on { opacity: 1; stroke-width: 2; }
.ln-link.is-off { opacity: 0.07; }

/* people ------------------------------------------------------------ */
.ln-node {
  position: absolute; width: 0; height: 0; padding: 0;
  border: 0; background: none; cursor: pointer; transition: opacity .18s;
}
.ln-node.is-dim { opacity: 0.18; }
.ln-dot {
  position: absolute; left: 0; top: 0;
  width: 9px; height: 9px; margin: -4.5px 0 0 -4.5px;
  border-radius: 50%; background: var(--ink);
  box-shadow: 0 0 0 4px var(--paper);
}
.ln-node.is-bridge .ln-dot { box-shadow: 0 0 0 3px var(--paper), 0 0 0 4.5px rgba(27,27,33,0.35); }
.ln-name {
  position: absolute; left: 0; top: -13px;
  transform: translate(-50%, -100%);
  white-space: nowrap; padding: 3px 6px; border-radius: 5px;
  font-size: 14px; font-weight: 400;
  color: #33333B; background: rgba(250,248,243,0.82);
  transition: color .15s, background .15s;
}
.ln-node:hover .ln-name, .ln-node.is-focus .ln-name {
  color: var(--ink); font-weight: 500; background: var(--card);
  box-shadow: 0 1px 10px rgba(27,27,33,0.1);
}
.ln-f-philosophy .ln-dot { background: #8A6A2E; }
.ln-f-mathematics .ln-dot { background: #3A6BA5; }
.ln-f-physics .ln-dot { background: #C1761B; }
.ln-f-psychology .ln-dot { background: #8A4E86; }
.ln-f-life .ln-dot { background: #3B7F57; }

/* modal ------------------------------------------------------------- */
.ln-modal {
  position: fixed; inset: 0; z-index: 20;
  display: flex; align-items: center; justify-content: center;
  padding: 24px; background: rgba(27,27,33,0.32);
  backdrop-filter: blur(2px);
  animation: ln-fade .16s ease-out;
}
@keyframes ln-fade { from { opacity: 0 } to { opacity: 1 } }
.ln-card {
  position: relative; width: min(460px, 100%);
  max-height: min(78vh, 660px); overflow: auto;
  padding: 26px 26px 24px; border-radius: 16px;
  background: var(--card); box-shadow: 0 24px 60px rgba(27,27,33,0.22);
  animation: ln-rise .18s ease-out;
}
@keyframes ln-rise { from { transform: translateY(8px) } to { transform: none } }
.ln-x {
  position: absolute; top: 14px; right: 14px;
  width: 28px; height: 28px; cursor: pointer; line-height: 1;
  border: 0; border-radius: 50%; background: none;
  color: var(--soft); font: inherit; font-size: 20px;
}
.ln-x:hover { background: rgba(27,27,33,0.06); color: var(--ink); }
.ln-eye {
  display: block; font-size: 10px; letter-spacing: 0.22em;
  text-transform: uppercase; color: var(--soft);
}
.ln-card h2 {
  margin-top: 9px;
  font-family: var(--rr-display), Georgia, serif;
  font-size: 36px; line-height: 1.02; letter-spacing: -0.015em;
}
.ln-dates {
  margin-top: 5px; font-size: 12px; letter-spacing: 0.08em;
  color: var(--soft); font-variant-numeric: tabular-nums;
}
.ln-one { margin-top: 13px; font-size: 15.5px; line-height: 1.5; }
.ln-edges {
  list-style: none; margin: 18px 0 0; padding: 16px 0 0;
  border-top: 1px solid var(--rule); display: grid; gap: 9px;
}
.ln-edge {
  display: grid; grid-template-columns: 18px auto; gap: 0 6px;
  font-size: 12.5px; line-height: 1.4;
}
.ln-edge b { font-weight: 400; color: rgba(27,27,33,0.3); }
.ln-edge button {
  justify-self: start; padding: 0; border: 0; background: none; cursor: pointer;
  font: inherit; font-size: 14px; color: var(--ink);
  border-bottom: 1px solid rgba(27,27,33,0.25);
}
.ln-edge button:hover { border-color: var(--ink); }
.ln-edge span { grid-column: 2; color: var(--soft); }
.ln-edge.ln-taught span { color: var(--gold); }
.ln-edge.ln-against span { color: var(--rust); }
.ln-edge.ln-with span { color: var(--moss); }
.ln-edge.ln-read span { color: var(--sky); }

@media (max-width: 720px) {
  .ln-bar { gap: 10px 12px; padding: 12px 14px; }
  .ln-bar h1 { font-size: 21px; }
  .ln-sub { display: none; }
  .ln-keys { margin-left: 0; order: 3; width: 100%; }
}
`;
