export const css = `
.ss {
  --nori: #0E1211;
  --rice: #F2ECDF;
  --grey: #98A09A;
  --rule: rgba(242,236,223,0.14);
  --mint: #7FD0C0;
  --salmon: #E8714A;
  background: var(--nori);
  color: var(--rice);
  font-family: var(--font-body), ui-sans-serif, system-ui, sans-serif;
  min-height: 100svh;
  -webkit-font-smoothing: antialiased;
  padding-bottom: 80px;
}
.ss *, .ss *::before, .ss *::after { box-sizing: border-box; }
.ss h1, .ss h2, .ss h3 { margin: 0; }
.ss p { margin: 0; }
.ss-col { max-width: 1120px; margin: 0 auto; padding-inline: 22px; }

/* head ------------------------------------------------------------- */
.ss-head { padding: 56px 0 34px; }
.ss-eye {
  display: block; font-size: 11px; letter-spacing: 0.26em;
  text-transform: uppercase; color: var(--grey);
}
.ss-head h1 {
  margin-top: 16px;
  font-family: var(--font-display), ui-sans-serif, system-ui, sans-serif;
  font-weight: 900;
  font-size: clamp(2.6rem, 1.6rem + 4.4vw, 5rem);
  line-height: 0.92; letter-spacing: -0.045em;
}
.ss-head p {
  margin-top: 20px; max-width: 56ch;
  font-size: 16px; line-height: 1.62; color: rgba(242,236,223,0.72);
}

/* game ------------------------------------------------------------- */
.ss-game {
  display: grid; gap: 28px; align-items: start;
  padding: 8px 0 4px;
}
@media (min-width: 940px) {
  .ss-game { grid-template-columns: minmax(0,1fr) 340px; gap: 36px; }
}
.ss-board { min-width: 0; }
.ss-svg {
  display: block; width: 100%; height: auto;
  touch-action: none; cursor: grab; outline: none;
  border-radius: 14px;
}
.ss-svg.is-drag { cursor: grabbing; }
.ss-svg:focus-visible { box-shadow: 0 0 0 2px var(--mint); }
.ss-tag {
  font-family: var(--font-body), sans-serif;
  font-size: 0.62px; letter-spacing: 0.02em;
  fill: rgba(242,236,223,0.78);
}
.ss-handle { cursor: ns-resize; }

/* the slice strip -------------------------------------------------- */
.ss-slice { margin-top: 18px; }
.ss-slice-head { display: flex; justify-content: space-between; align-items: baseline; gap: 16px; }
.ss-slice-hint { font-size: 10.5px; letter-spacing: 0.1em; color: var(--grey); }
.ss-slice-label {
  font-size: 10.5px; letter-spacing: 0.24em; text-transform: uppercase; color: var(--grey);
}
.ss-strip {
  position: relative; height: 78px; margin-top: 10px;
  border: 1px solid var(--rule); border-radius: 10px;
  background: rgba(242,236,223,0.03);
  overflow: hidden;
}
.ss-strip-line {
  position: absolute; left: 4%; right: 4%; top: 50%;
  height: 1px; background: var(--rule);
}
.ss-pill {
  position: absolute; top: 50%; transform: translate(-50%, -50%);
  display: flex; flex-direction: column; align-items: center; gap: 5px;
  transition: left 90ms linear;
}
.ss-dot {
  width: 16px; height: 16px; border-radius: 50%;
  transition: transform 90ms linear, opacity 120ms linear;
}
.ss-when {
  font-size: 9.5px; letter-spacing: 0.16em; text-transform: uppercase;
  color: var(--grey);
}

/* panel ------------------------------------------------------------ */
.ss-panel {
  border: 1px solid var(--rule); border-radius: 14px;
  padding: 20px; background: rgba(242,236,223,0.035);
}
.ss-nav { display: flex; gap: 8px; margin-bottom: 18px; }
.ss-chip {
  width: 30px; height: 30px; border-radius: 50%;
  border: 1px solid var(--rule); background: none; color: var(--grey);
  font-family: inherit; font-size: 12.5px; font-variant-numeric: tabular-nums;
  cursor: pointer; transition: all 120ms ease;
}
.ss-chip:hover { border-color: rgba(242,236,223,0.4); color: var(--rice); }
.ss-chip.is-done { border-color: rgba(139,168,96,0.7); color: #A9C57E; }
.ss-chip.is-on { background: var(--rice); border-color: var(--rice); color: var(--nori); }

.ss-title {
  font-family: var(--font-display), sans-serif; font-weight: 800;
  font-size: 24px; letter-spacing: -0.03em; line-height: 1.05;
}
.ss-brief {
  margin-top: 10px; font-size: 14px; line-height: 1.6;
  color: rgba(242,236,223,0.74);
}

.ss-read {
  display: grid; grid-template-columns: 1fr 1fr; gap: 10px;
  margin-top: 18px; padding-top: 16px; border-top: 1px solid var(--rule);
}
.ss-read > div { display: flex; flex-direction: column; gap: 4px; }
.ss-k { font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--grey); }
.ss-v { font-size: 19px; font-variant-numeric: tabular-nums; letter-spacing: -0.01em; }

.ss-slider { display: block; margin-top: 16px; }
.ss-slider input {
  -webkit-appearance: none; appearance: none;
  width: 100%; margin-top: 10px; height: 3px; border-radius: 3px;
  background: rgba(242,236,223,0.22); outline: none; cursor: pointer;
}
.ss-slider input::-webkit-slider-thumb {
  -webkit-appearance: none; appearance: none;
  width: 17px; height: 17px; border-radius: 50%;
  background: var(--rice); border: none; cursor: grab;
}
.ss-slider input::-moz-range-thumb {
  width: 17px; height: 17px; border-radius: 50%;
  background: var(--rice); border: none; cursor: grab;
}

.ss-limit {
  margin-top: 14px; font-size: 12.5px; line-height: 1.55;
  color: var(--mint);
}

.ss-quiz { margin-top: 18px; display: grid; gap: 8px; }
.ss-btn {
  width: 100%; padding: 11px 14px; border-radius: 9px;
  border: 1px solid rgba(242,236,223,0.3); background: none;
  color: var(--rice); font-family: inherit; font-size: 13.5px;
  cursor: pointer; transition: all 120ms ease; text-align: left;
}
.ss-btn:hover { background: rgba(242,236,223,0.08); border-color: var(--rice); }
.ss-wrong { font-size: 12.5px; line-height: 1.55; color: var(--salmon); }

.ss-won {
  margin-top: 18px; padding-top: 16px; border-top: 1px solid var(--rule);
}
.ss-won h3 {
  font-family: var(--font-display), sans-serif; font-weight: 800;
  font-size: 17px; letter-spacing: -0.02em; color: #A9C57E;
}
.ss-won p { margin-top: 8px; font-size: 13.5px; line-height: 1.6; color: rgba(242,236,223,0.8); }
.ss-next {
  margin-top: 14px; text-align: center;
  background: var(--rice); color: var(--nori); border-color: var(--rice);
}
.ss-next:hover { background: #fff; color: var(--nori); }

.ss-reset {
  margin-top: 16px; padding: 0; border: none; background: none;
  color: var(--grey); font-family: inherit; font-size: 11.5px;
  letter-spacing: 0.14em; text-transform: uppercase; cursor: pointer;
}
.ss-reset:hover { color: var(--rice); }

/* note ------------------------------------------------------------- */
.ss-note {
  margin-top: 52px; padding-top: 26px; border-top: 1px solid var(--rule);
  max-width: 64ch;
}
.ss-note h2 {
  font-family: var(--font-display), sans-serif; font-weight: 800;
  font-size: 20px; letter-spacing: -0.03em;
}
.ss-note p { margin-top: 12px; font-size: 14.5px; line-height: 1.65; color: rgba(242,236,223,0.72); }
.ss-num { font-variant-numeric: tabular-nums; color: var(--rice); }
.ss-src { font-size: 13px !important; color: var(--grey) !important; }

.ss-foot {
  margin-top: 44px; padding-top: 18px; border-top: 1px solid var(--rule);
  display: flex; gap: 22px;
}
.ss-foot a {
  font-size: 12px; letter-spacing: 0.14em; text-transform: uppercase;
  color: var(--grey); text-decoration: none;
}
.ss-foot a:hover { color: var(--rice); }
`;
