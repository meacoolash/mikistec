"use client";

import { useEffect, useMemo, useRef, useState } from "react";

/* ------------------------------------------------------------------ *
 * Spacetime Sushi
 *
 * The block of spacetime is a sushi roll. How you slice it decides
 * what counts as one "now". Tilt the knife (= move faster) and events
 * that were simultaneous come apart, events that were apart line up,
 * and some pairs swap order entirely.
 *
 * Units: c = 1, so the light cone is at 45° and the knife can never
 * tilt past it. The slice through your position P with tilt β is
 *   t = pt + β (x − px),
 * which is exactly the surface of simultaneity of an observer moving
 * at speed β. For that observer an event sits at
 *   t' = γ (t − β x),  x' = γ (x − β t).
 * ------------------------------------------------------------------ */

const RICE_GRAIN = "#F2ECDF";
const SALMON = "#E8714A";
const AVOCADO = "#8BA860";
const ROE = "#F0A93B";
const TUNA = "#CF4B5C";

const HALF = 10; // the roll spans −10..10 in both x and t
const BETA_MAX = 0.9;
const ALIGN_TOL = 0.45; // how close an event must sit to the knife
const ORDER_TOL = 0.35; // how clearly one event must precede another

type Ev = { id: string; x: number; t: number; fill: string; name: string };

type Goal =
  | { kind: "align"; ids: string[] }
  | { kind: "order"; first: string; second: string }
  | { kind: "quiz"; answer: "impossible" };

type Level = {
  title: string;
  brief: string;
  events: Ev[];
  start: { px: number; pt: number; beta: number };
  goal: Goal;
  cones?: string[]; // draw the light cone of these events
  solvedTitle: string;
  solvedBody: string;
};

const LEVELS: Level[] = [
  {
    title: "One cut",
    brief:
      "Drag anywhere to move yourself through the roll. The bright line is your now — everything on it happens at the same moment for you. Put the salmon on it.",
    events: [{ id: "A", x: 2, t: 3, fill: SALMON, name: "Salmon" }],
    start: { px: 0, pt: -4.5, beta: 0 },
    goal: { kind: "align", ids: ["A"] },
    solvedTitle: "That is a now.",
    solvedBody:
      "Nothing moved inside the roll. The roll is the whole of spacetime, already there. All you did was choose where to cut it — and the cut is what you call the present moment.",
  },
  {
    title: "Two at once",
    brief:
      "Standing still, the avocado happens well after the salmon. Grab the knife handle on the right edge and tilt it — that is you picking up speed — until both sit on the same slice.",
    events: [
      { id: "A", x: -4, t: -1, fill: SALMON, name: "Salmon" },
      { id: "B", x: 4, t: 2, fill: AVOCADO, name: "Avocado" },
    ],
    start: { px: 0, pt: 0, beta: 0 },
    goal: { kind: "align", ids: ["A", "B"] },
    solvedTitle: "Simultaneous — for you.",
    solvedBody:
      "Someone standing still still sees the salmon happen three units of time before the avocado. You see them happen together. Neither of you is wrong. “At the same time” is not a property of the two events; it is a property of your slice.",
  },
  {
    title: "Reverse it",
    brief:
      "At rest, the salmon comes first and the roe follows. Tilt far enough and the order flips. Make the roe happen before the salmon.",
    events: [
      { id: "A", x: -3, t: -1, fill: SALMON, name: "Salmon" },
      { id: "B", x: 3, t: 1, fill: ROE, name: "Roe" },
    ],
    start: { px: 0, pt: 0, beta: 0 },
    goal: { kind: "order", first: "B", second: "A" },
    solvedTitle: "The order swapped.",
    solvedBody:
      "Past the tilt where they were simultaneous, the sequence turns around: for you the roe is already over while the salmon has not happened yet. Two events far enough apart in space have no shared before and after. There is no universal order of things — only the order on your own slice.",
  },
  {
    title: "Three in a row",
    brief:
      "Three fillings, scattered through the block. There is exactly one speed at which all three belong to the same moment. Find it.",
    events: [
      { id: "A", x: -6, t: -2, fill: AVOCADO, name: "Avocado" },
      { id: "B", x: 0, t: 1, fill: SALMON, name: "Salmon" },
      { id: "C", x: 5, t: 3.5, fill: ROE, name: "Roe" },
    ],
    start: { px: 0, pt: -3, beta: 0 },
    goal: { kind: "align", ids: ["A", "B", "C"] },
    solvedTitle: "One slice, three events.",
    solvedBody:
      "Every observer carves the same block into a different stack of nows. Yours is the only one in which these three moments are the same moment. The block never changed — the stack of slices did.",
  },
  {
    title: "The impossible cut",
    brief:
      "The tuna sits inside the light cone of the salmon — close in space, far apart in time. Try every tilt you can reach, then answer: can any slice put them in the same now?",
    events: [
      { id: "A", x: -1, t: -3, fill: SALMON, name: "Salmon" },
      { id: "B", x: 1, t: 3, fill: TUNA, name: "Tuna" },
    ],
    start: { px: 0, pt: 0, beta: 0 },
    cones: ["A"],
    goal: { kind: "quiz", answer: "impossible" },
    solvedTitle: "Never. And that is the point.",
    solvedBody:
      "To line those two up the knife would have to tilt past 45° — past the speed of light. It cannot. When one event lies inside the light cone of another, every possible observer agrees on which came first. Light and causation are what is left of order once the universal now is gone: what can influence what, and nothing more.",
  },
];

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

/* Deterministic rice grains, so the roll looks the same on every render. */
function grains(n: number) {
  let s = 20260912;
  const r = () => ((s = (s * 1103515245 + 12345) % 2147483648) / 2147483648);
  return Array.from({ length: n }, () => ({
    x: r() * 2 * HALF - HALF,
    t: r() * 2 * HALF - HALF,
    rx: 0.1 + r() * 0.16,
    o: 0.05 + r() * 0.1,
  }));
}

export function SpacetimeSushi() {
  const rice = useMemo(() => grains(90), []);
  const [levelIndex, setLevelIndex] = useState(0);
  const [done, setDone] = useState<boolean[]>(() => LEVELS.map(() => false));
  const [answered, setAnswered] = useState<"impossible" | "possible" | null>(null);
  const [px, setPx] = useState(LEVELS[0].start.px);
  const [pt, setPt] = useState(LEVELS[0].start.pt);
  const [beta, setBeta] = useState(LEVELS[0].start.beta);
  const [drag, setDrag] = useState<"slide" | "tilt" | null>(null);

  const level = LEVELS[levelIndex];
  const svgRef = useRef<SVGSVGElement>(null);

  const gamma = 1 / Math.sqrt(1 - beta * beta);
  const tPrime = (e: Ev) => gamma * (e.t - beta * e.x);
  const xPrime = (e: Ev) => gamma * (e.x - beta * e.t);
  const tPrimeMe = gamma * (pt - beta * px);
  const gap = (e: Ev) => tPrime(e) - tPrimeMe; // < 0 past, > 0 future
  const offKnife = (e: Ev) =>
    Math.abs(beta * (e.x - px) - (e.t - pt)) / Math.sqrt(1 + beta * beta);
  const onKnife = (e: Ev) => offKnife(e) < ALIGN_TOL;

  let solved = false;
  if (level.goal.kind === "align") {
    solved = level.goal.ids.every((id) => {
      const e = level.events.find((v) => v.id === id);
      return e ? onKnife(e) : false;
    });
  } else if (level.goal.kind === "order") {
    const first = level.events.find((e) => e.id === (level.goal as { first: string }).first);
    const second = level.events.find((e) => e.id === (level.goal as { second: string }).second);
    solved = !!first && !!second && tPrime(second) - tPrime(first) > ORDER_TOL;
  } else {
    solved = answered === "impossible";
  }

  useEffect(() => {
    if (!solved) return;
    setDone((d) => (d[levelIndex] ? d : d.map((v, i) => (i === levelIndex ? true : v))));
  }, [solved, levelIndex]);

  function goTo(i: number) {
    const l = LEVELS[i];
    setLevelIndex(i);
    setPx(l.start.px);
    setPt(l.start.pt);
    setBeta(l.start.beta);
    setAnswered(null);
    setDrag(null);
  }

  /* ---- pointer handling ------------------------------------------ */

  /* The handle rides the rim of the roll: the knife leaves through the right
     edge, or through the top / bottom when the tilt is steep. */
  const handle = (() => {
    const tAtEdge = pt + beta * (HALF - px);
    if (Math.abs(tAtEdge) <= HALF) return { x: HALF, t: tAtEdge };
    const rim = tAtEdge > 0 ? HALF : -HALF;
    return { x: px + (rim - pt) / beta, t: rim };
  })();

  function toUnits(clientX: number, clientY: number) {
    const r = svgRef.current!.getBoundingClientRect();
    const span = 2 * (HALF + 1);
    return {
      x: ((clientX - r.left) / r.width) * span - (HALF + 1),
      t: -(((clientY - r.top) / r.height) * span - (HALF + 1)),
    };
  }

  function onDown(e: React.PointerEvent<SVGSVGElement>) {
    const p = toUnits(e.clientX, e.clientY);
    const near = Math.hypot(p.x - handle.x, p.t - handle.t) < 1.9;
    const mode = near ? "tilt" : "slide";
    setDrag(mode);
    (e.target as Element).setPointerCapture?.(e.pointerId);
    apply(mode, p);
  }

  function onMove(e: React.PointerEvent<SVGSVGElement>) {
    if (!drag) return;
    apply(drag, toUnits(e.clientX, e.clientY));
  }

  function apply(mode: "slide" | "tilt", p: { x: number; t: number }) {
    if (mode === "tilt") {
      /* swing the line around yourself; too close to the pivot has no angle */
      const dx = p.x - px;
      if (Math.abs(dx) < 0.8) return;
      setBeta(clamp((p.t - pt) / dx, -BETA_MAX, BETA_MAX));
    } else {
      setPx(clamp(p.x, -6, 6));
      setPt(clamp(p.t, -8, 8));
    }
  }

  function onKey(e: React.KeyboardEvent<SVGSVGElement>) {
    const step = e.shiftKey ? 0.02 : 0.1;
    if (e.key === "ArrowLeft") setBeta((b) => clamp(b - step, -BETA_MAX, BETA_MAX));
    else if (e.key === "ArrowRight") setBeta((b) => clamp(b + step, -BETA_MAX, BETA_MAX));
    else if (e.key === "ArrowUp") setPt((v) => clamp(v + step * 4, -8, 8));
    else if (e.key === "ArrowDown") setPt((v) => clamp(v - step * 4, -8, 8));
    else return;
    e.preventDefault();
  }

  /* ---- geometry --------------------------------------------------- */

  const EDGE = HALF + 0.6;
  const knifeY = (x: number) => -(pt + beta * (x - px)); // screen y
  const atLimit = Math.abs(beta) >= BETA_MAX - 0.001;

  const xs = level.events.map(xPrime);
  const lo = Math.min(...xs) - 2.5;
  const hi = Math.max(...xs) + 2.5;
  const strip = level.events
    .map((e) => ({ e, left: ((xPrime(e) - lo) / (hi - lo)) * 100, d: gap(e) }))
    .sort((a, b) => a.left - b.left);

  return (
    <div className="ss-game">
      <div className="ss-board">
        <svg
          ref={svgRef}
          viewBox={`${-(HALF + 1)} ${-(HALF + 1)} ${2 * (HALF + 1)} ${2 * (HALF + 1)}`}
          className={`ss-svg${drag ? " is-drag" : ""}`}
          tabIndex={0}
          role="application"
          aria-label="Spacetime roll. Drag to move, drag the handle on the right edge to tilt your slice. Arrow keys work too."
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={() => setDrag(null)}
          onPointerCancel={() => setDrag(null)}
          onKeyDown={onKey}
        >
          <defs>
            <clipPath id="ss-roll">
              <rect x={-HALF} y={-HALF} width={2 * HALF} height={2 * HALF} rx={1.4} />
            </clipPath>
            <linearGradient id="ss-rice" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#20211C" />
              <stop offset="100%" stopColor="#171814" />
            </linearGradient>
          </defs>

          {/* the roll: a block of spacetime, all of it already there */}
          <rect
            x={-HALF}
            y={-HALF}
            width={2 * HALF}
            height={2 * HALF}
            rx={1.4}
            fill="url(#ss-rice)"
            stroke="#2B3A2E"
            strokeWidth={0.5}
          />

          <g clipPath="url(#ss-roll)">
            {rice.map((g, i) => (
              <ellipse
                key={i}
                cx={g.x}
                cy={-g.t}
                rx={g.rx}
                ry={g.rx * 0.7}
                fill={RICE_GRAIN}
                opacity={g.o}
              />
            ))}

            {/* axes: the rest frame, for comparison */}
            <line x1={-HALF} y1={0} x2={HALF} y2={0} stroke="#FFFFFF" strokeWidth={0.05} opacity={0.14} />
            <line x1={0} y1={-HALF} x2={0} y2={HALF} stroke="#FFFFFF" strokeWidth={0.05} opacity={0.14} />

            {/* light cones of the events that need one */}
            {level.cones?.map((id) => {
              const e = level.events.find((v) => v.id === id);
              if (!e) return null;
              return (
                <g key={id} opacity={0.5}>
                  <polygon
                    points={`${e.x},${-e.t} ${e.x + 22},${-e.t - 22} ${e.x - 22},${-e.t - 22}`}
                    fill="#F0A93B"
                    opacity={0.07}
                  />
                  <line x1={e.x - 22} y1={-e.t + 22} x2={e.x + 22} y2={-e.t - 22} stroke="#F0A93B" strokeWidth={0.07} opacity={0.5} />
                  <line x1={e.x + 22} y1={-e.t + 22} x2={e.x - 22} y2={-e.t - 22} stroke="#F0A93B" strokeWidth={0.07} opacity={0.5} />
                </g>
              );
            })}

            {/* your own light cone — the tilt you can never pass */}
            <g opacity={atLimit ? 0.75 : 0.32}>
              <line x1={px - 24} y1={-pt + 24} x2={px + 24} y2={-pt - 24} stroke="#7FD0C0" strokeWidth={0.07} strokeDasharray="0.5 0.45" />
              <line x1={px + 24} y1={-pt + 24} x2={px - 24} y2={-pt - 24} stroke="#7FD0C0" strokeWidth={0.07} strokeDasharray="0.5 0.45" />
            </g>

            {/* the knife: your surface of simultaneity */}
            <line
              x1={-EDGE}
              y1={knifeY(-EDGE)}
              x2={EDGE}
              y2={knifeY(EDGE)}
              stroke="#0B0C0A"
              strokeWidth={0.42}
              opacity={0.6}
            />
            <line
              x1={-EDGE}
              y1={knifeY(-EDGE)}
              x2={EDGE}
              y2={knifeY(EDGE)}
              stroke={solved ? "#8BA860" : "#F2ECDF"}
              strokeWidth={0.16}
            />

            {/* fillings */}
            {level.events.map((e) => {
              const hit = onKnife(e);
              return (
                <g key={e.id}>
                  {hit && <circle cx={e.x} cy={-e.t} r={1.15} fill={e.fill} opacity={0.22} />}
                  <circle
                    cx={e.x}
                    cy={-e.t}
                    r={0.62}
                    fill={e.fill}
                    stroke={hit ? "#F2ECDF" : "#0E1211"}
                    strokeWidth={hit ? 0.14 : 0.1}
                  />
                  <circle cx={e.x - 0.2} cy={-e.t - 0.2} r={0.16} fill="#FFFFFF" opacity={0.35} />
                  <text x={e.x + 1} y={-e.t - 0.9} className="ss-tag">
                    {e.name}
                  </text>
                </g>
              );
            })}

            {/* you */}
            <circle cx={px} cy={-pt} r={0.5} fill="none" stroke="#7FD0C0" strokeWidth={0.14} />
            <circle cx={px} cy={-pt} r={0.16} fill="#7FD0C0" />
          </g>

          {/* the handle that tilts the knife */}
          <g className="ss-handle">
            <circle cx={handle.x} cy={-handle.t} r={1.1} fill="#F2ECDF" opacity={0.13} />
            <circle
              cx={handle.x}
              cy={-handle.t}
              r={0.52}
              fill="#F2ECDF"
              stroke="#0E1211"
              strokeWidth={0.12}
            />
          </g>
        </svg>

        {/* the slice you just cut, laid out in your own space */}
        <div className="ss-slice">
          <div className="ss-slice-head">
            <span className="ss-slice-label">Your now</span>
            <span className="ss-slice-hint">higher = later, for you</span>
          </div>
          <div className="ss-strip">
            <div className="ss-strip-line" />
            {strip.map(({ e, left, d }) => (
              <div key={e.id} className="ss-pill" style={{ left: `${left}%` }}>
                <span
                  className="ss-dot"
                  style={{
                    background: e.fill,
                    opacity: Math.abs(d) < ALIGN_TOL ? 1 : 0.35,
                    transform: `translateY(${clamp(-d * 4, -22, 22)}px)`,
                  }}
                />
                <span className="ss-when">
                  {Math.abs(d) < ALIGN_TOL ? "now" : d > 0 ? "not yet" : "over"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <aside className="ss-panel">
        <nav className="ss-nav" aria-label="Levels">
          {LEVELS.map((l, i) => (
            <button
              key={l.title}
              type="button"
              className={`ss-chip${i === levelIndex ? " is-on" : ""}${done[i] ? " is-done" : ""}`}
              onClick={() => goTo(i)}
              aria-current={i === levelIndex}
            >
              {i + 1}
            </button>
          ))}
        </nav>

        <h2 className="ss-title">{level.title}</h2>
        <p className="ss-brief">{level.brief}</p>

        <div className="ss-read">
          <div>
            <span className="ss-k">Your speed</span>
            <span className="ss-v">{Math.abs(beta).toFixed(2)} c</span>
          </div>
          <div>
            <span className="ss-k">Slice tilt</span>
            <span className="ss-v">{((Math.atan(beta) * 180) / Math.PI).toFixed(0)}°</span>
          </div>
        </div>

        <label className="ss-slider">
          <span className="ss-k">Tilt the knife</span>
          <input
            type="range"
            min={-BETA_MAX}
            max={BETA_MAX}
            step={0.005}
            value={beta}
            onChange={(ev) => setBeta(Number(ev.target.value))}
          />
        </label>

        {atLimit && (
          <p className="ss-limit">
            The knife has reached 45°. Past that it would have to cut faster than light, and the
            roll does not let it.
          </p>
        )}

        {level.goal.kind === "quiz" && !solved && (
          <div className="ss-quiz">
            <button type="button" className="ss-btn" onClick={() => setAnswered("possible")}>
              Some slice can do it
            </button>
            <button type="button" className="ss-btn" onClick={() => setAnswered("impossible")}>
              No slice ever can
            </button>
            {answered === "possible" && (
              <p className="ss-wrong">
                Keep tilting. The tuna stays in the salmon&rsquo;s future however hard you push.
              </p>
            )}
          </div>
        )}

        {solved && (
          <div className="ss-won">
            <h3>{level.solvedTitle}</h3>
            <p>{level.solvedBody}</p>
            {levelIndex < LEVELS.length - 1 ? (
              <button type="button" className="ss-btn ss-next" onClick={() => goTo(levelIndex + 1)}>
                Next cut
              </button>
            ) : (
              <button type="button" className="ss-btn ss-next" onClick={() => goTo(0)}>
                Start again
              </button>
            )}
          </div>
        )}

        <button type="button" className="ss-reset" onClick={() => goTo(levelIndex)}>
          Reset this cut
        </button>
      </aside>
    </div>
  );
}
