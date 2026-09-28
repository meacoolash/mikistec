"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { FIELDS, LINKS, PEOPLE, type Field, type Link as Edge, type Person } from "./data";

/* ---------------------------------------------------------------- scale */
// Time is not linear here. Antiquity gets room, the 20th century gets room,
// and the long medieval silence is compressed to almost nothing.
// One unit = one pixel at zoom 1, so labels are always at their real size.
const STOPS: [number, number][] = [
  [-650, 0], [-250, 230], [150, 350], [1450, 480], [1600, 660],
  [1700, 830], [1800, 1010], [1860, 1210], [1900, 1420], [1960, 1660],
];

function xOf(year: number) {
  for (let i = 0; i < STOPS.length - 1; i++) {
    const [y0, x0] = STOPS[i];
    const [y1, x1] = STOPS[i + 1];
    if (year <= y1 || i === STOPS.length - 2) {
      const t = (year - y0) / (y1 - y0);
      return x0 + t * (x1 - x0);
    }
  }
  return 0;
}

const PAD_X = 90;
const LANE_H = 158;
const SUB = 47;
const GAP = 128; // horizontal room a name needs before it must drop a row
const TOP = 52;
const W = xOf(1960) + PAD_X * 2;
const H = FIELDS.length * LANE_H + TOP + 24;

const TICKS = [-600, -400, -200, 1, 1500, 1600, 1700, 1800, 1850, 1900, 1950];
const tickLabel = (y: number) => (y < 0 ? `${-y} BCE` : y === 1 ? "CE" : `${y}`);

/* ------------------------------------------------------------- layout */
type Placed = Person & { x: number; y: number };

function layout(): Placed[] {
  const out: Placed[] = [];
  FIELDS.forEach((f, lane) => {
    const mid = TOP + lane * LANE_H + LANE_H / 2;
    const tail = [-9e9, -9e9, -9e9]; // last x used per sub-row
    PEOPLE.filter((p) => p.field === f.id)
      .sort((a, b) => a.born - b.born)
      .forEach((p) => {
        const x = PAD_X + xOf(p.born);
        let row = tail.indexOf(Math.min(...tail));
        for (let i = 0; i < 3; i++) {
          if (x - tail[i] > GAP) { row = i; break; }
        }
        tail[row] = x;
        out.push({ ...p, x, y: mid + (row - 1) * SUB });
      });
  });
  return out;
}

const KIND_LABEL: Record<Edge["kind"], string> = {
  taught: "taught",
  read: "read",
  against: "against",
  with: "alongside",
};

const fmtYear = (y: number) => (y < 0 ? `${-y} BCE` : `${y}`);

/* ------------------------------------------------------------ component */
export function LineageMap() {
  const nodes = useMemo(layout, []);
  const byId = useMemo(() => new Map(nodes.map((n) => [n.id, n])), [nodes]);

  const [hover, setHover] = useState<string | null>(null);
  const [open, setOpen] = useState<string | null>(null);
  const [kinds, setKinds] = useState<Edge["kind"][]>(["taught", "read", "against", "with"]);
  const [view, setView] = useState({ x: 0, y: 0, k: 1 });
  const [dragging, setDragging] = useState(false);
  const drag = useRef<{ px: number; py: number; ox: number; oy: number; moved: boolean } | null>(null);

  const focus = open ?? hover;
  const links = useMemo(() => LINKS.filter((l) => kinds.includes(l.kind)), [kinds]);

  const near = useMemo(() => {
    if (!focus) return null;
    const set = new Set<string>([focus]);
    links.forEach((l) => {
      if (l.from === focus) set.add(l.to);
      if (l.to === focus) set.add(l.from);
    });
    return set;
  }, [focus, links]);

  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, []);

  const person = open ? byId.get(open) : null;
  const edgesOf = open ? links.filter((l) => l.from === open || l.to === open) : [];

  const toggleKind = (k: Edge["kind"]) =>
    setKinds((cur) => (cur.includes(k) ? cur.filter((c) => c !== k) : [...cur, k]));

  const zoom = (d: number) =>
    setView((v) => ({ ...v, k: Math.min(1.8, Math.max(0.45, +(v.k + d).toFixed(2))) }));

  return (
    <>
      <header className="ln-bar">
        <h1>Lineage</h1>
        <span className="ln-sub">{PEOPLE.length} thinkers · who read whom</span>

        <div className="ln-keys">
          {(Object.keys(KIND_LABEL) as Edge["kind"][]).map((k) => (
            <button
              key={k}
              className={`ln-key ln-key-${k}${kinds.includes(k) ? " is-on" : ""}`}
              onClick={() => toggleKind(k)}
            >
              <i /> {KIND_LABEL[k]}
            </button>
          ))}
        </div>

        <div className="ln-zoom">
          <button onClick={() => zoom(-0.2)} aria-label="Zoom out">−</button>
          <button onClick={() => setView({ x: 0, y: 0, k: 1 })}>reset</button>
          <button onClick={() => zoom(0.2)} aria-label="Zoom in">+</button>
        </div>
      </header>

      <div
        className={`ln-stage${dragging ? " is-drag" : ""}`}
        onPointerDown={(e) => {
          drag.current = { px: e.clientX, py: e.clientY, ox: view.x, oy: view.y, moved: false };
          setDragging(true);
        }}
        onPointerMove={(e) => {
          const d = drag.current;
          if (!d) return;
          const dx = e.clientX - d.px;
          const dy = e.clientY - d.py;
          if (Math.abs(dx) + Math.abs(dy) > 3) d.moved = true;
          setView((v) => ({ ...v, x: d.ox + dx, y: d.oy + dy }));
        }}
        onPointerUp={() => { drag.current = null; setDragging(false); }}
        onPointerLeave={() => { drag.current = null; setDragging(false); }}
      >
        <div
          className="ln-plane"
          style={{
            width: W,
            height: H,
            transform: `translate(${view.x}px, ${view.y}px) scale(${view.k})`,
          }}
        >
          <svg className="ln-svg" width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
            {FIELDS.map((f, i) => (
              <g key={f.id}>
                <line className="ln-lane" x1={0} x2={W} y1={TOP + i * LANE_H} y2={TOP + i * LANE_H} />
                <text className="ln-lane-label" x={12} y={TOP + i * LANE_H + 20}>{f.label}</text>
              </g>
            ))}

            {TICKS.map((t) => (
              <g key={t}>
                <line className="ln-tick" x1={PAD_X + xOf(t)} x2={PAD_X + xOf(t)} y1={38} y2={H - 16} />
                <text className="ln-tick-label" x={PAD_X + xOf(t)} y={28}>{tickLabel(t)}</text>
              </g>
            ))}

            {links.map((l, i) => {
              const a = byId.get(l.from);
              const b = byId.get(l.to);
              if (!a || !b) return null;
              const on = focus === l.from || focus === l.to;
              const mx = (a.x + b.x) / 2;
              const my = (a.y + b.y) / 2 - Math.min(110, Math.abs(a.x - b.x) * 0.2) - 16;
              return (
                <path
                  key={i}
                  className={`ln-link ln-${l.kind}${on ? " is-on" : ""}${focus && !on ? " is-off" : ""}`}
                  d={`M${a.x} ${a.y} Q${mx} ${my} ${b.x} ${b.y}`}
                />
              );
            })}
          </svg>

          {/* people — real HTML text, so it stays readable */}
          {nodes.map((n) => {
            const dim = near ? !near.has(n.id) : false;
            return (
              <button
                key={n.id}
                className={`ln-node ln-f-${n.field}${dim ? " is-dim" : ""}${focus === n.id ? " is-focus" : ""}${n.also ? " is-bridge" : ""}`}
                style={{ left: n.x, top: n.y }}
                onPointerEnter={() => setHover(n.id)}
                onPointerLeave={() => setHover(null)}
                onClick={(e) => {
                  e.stopPropagation();
                  if (drag.current?.moved) return;
                  setOpen(n.id);
                }}
              >
                <span className="ln-name">{n.name}</span>
                <span className="ln-dot" />
              </button>
            );
          })}
        </div>

        <Link className="ln-back" href="/draft/list">drafts</Link>
        <span className="ln-hint">drag · click a name</span>
      </div>

      {person && (
        <div className="ln-modal" onClick={() => setOpen(null)}>
          <div className="ln-card" onClick={(e) => e.stopPropagation()}>
            <button className="ln-x" onClick={() => setOpen(null)} aria-label="Close">×</button>
            <span className="ln-eye">
              {FIELDS.find((f) => f.id === person.field)?.label}
              {person.also && ` · ${FIELDS.find((f) => f.id === person.also)?.label}`}
            </span>
            <h2>{person.name}</h2>
            <p className="ln-dates">
              {fmtYear(person.born)} — {person.died > 2020 ? "living" : fmtYear(person.died)}
            </p>
            <p className="ln-one">{person.one}</p>
            <ul className="ln-edges">
              {edgesOf.map((l, i) => {
                const other = byId.get(l.from === open ? l.to : l.from)!;
                return (
                  <li key={i} className={`ln-edge ln-${l.kind}`}>
                    <b title={l.to === open ? "came before" : "came after"}>
                      {l.to === open ? "←" : "→"}
                    </b>
                    <button onClick={() => setOpen(other.id)}>{other.name}</button>
                    <span>{KIND_LABEL[l.kind]}{l.note ? ` · ${l.note}` : ""}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}

export type { Field };
