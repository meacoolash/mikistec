"use client";

import Image from "next/image";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

/* ------------------------------------------------------------------ reveal */

export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`mpi-reveal ${seen ? "is-in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------- breathing orb */

const CYCLE = 12_000;
const IN = 4_000;
const HOLD = 6_000;
const RINGS: { delay: number; scale: number }[] = [
  { delay: 0, scale: 1 },
  { delay: -350, scale: 0.97 },
  { delay: -700, scale: 0.94 },
  { delay: -1_500, scale: 0.74 },
];

const PHASES = [
  { until: IN, word: "Breathe in", beats: 4 },
  { until: HOLD, word: "Hold", beats: 2 },
  { until: CYCLE, word: "Breathe out", beats: 6 },
];

/** 0.62 → 1 → 0.62, eased, so the rings swell like a chest. */
function scaleAt(t: number) {
  const c = ((t % CYCLE) + CYCLE) % CYCLE;
  const ease = (x: number) => 0.5 - Math.cos(Math.PI * x) / 2;
  if (c < IN) return 0.62 + 0.38 * ease(c / IN);
  if (c < HOLD) return 1;
  return 1 - 0.38 * ease((c - HOLD) / (CYCLE - HOLD));
}

export function BreathOrb() {
  const [running, setRunning] = useState(true);
  const [elapsed, setElapsed] = useState(0);
  const offset = useRef(0);

  /* Someone who asked for less motion gets the orb at rest until they start it. */
  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) setRunning(false);
  }, []);

  useEffect(() => {
    if (!running) return;
    const startedAt = performance.now() - offset.current;
    let frame = requestAnimationFrame(function tick() {
      offset.current = performance.now() - startedAt;
      setElapsed(offset.current);
      frame = requestAnimationFrame(tick);
    });
    return () => cancelAnimationFrame(frame);
  }, [running]);

  const inCycle = elapsed % CYCLE;
  const phase = PHASES.find((p) => inCycle < p.until) ?? PHASES[0];
  const left = Math.max(1, Math.ceil((phase.until - inCycle) / 1000));
  const rounds = Math.floor(elapsed / CYCLE);

  return (
    <div className="mpi-breath">
      <div className="mpi-orb">
        {RINGS.map((r) => (
          <i
            key={r.delay}
            aria-hidden="true"
            style={{ transform: `scale(${(scaleAt(elapsed + r.delay) * r.scale).toFixed(4)})` }}
          />
        ))}
        <p className="mpi-orb-label">
          <b>{running ? phase.word : "Breathe"}</b>
          <span className="mpi-count">{running ? left : `${phase.beats} · ${PHASES.length}`}</span>
        </p>
      </div>

      <button type="button" className="mpi-btn mpi-btn-ghost" onClick={() => setRunning((r) => !r)}>
        {running ? "Pause the breath" : "Breathe with it"}
      </button>
      <p className="mpi-breath-note">
        <span className="mpi-count">{rounds}</span> {rounds === 1 ? "round" : "rounds"} together · 4
        in, 2 hold, 6 out
      </p>
    </div>
  );
}

/* ---------------------------------------------------------------- collage */

export type Photo = { src: string; alt: string; caption: string; x: number; y: number; rot: number };

export function Collage({ photos }: { photos: Photo[] }) {
  const box = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<{ x: number; y: number }[]>([]);
  const [held, setHeld] = useState<number | null>(null);
  const [order, setOrder] = useState<number[]>(() => photos.map((_, i) => i));
  const grab = useRef({ dx: 0, dy: 0 });

  const place = useCallback(() => {
    const el = box.current;
    if (!el) return;
    const { width, height } = el.getBoundingClientRect();
    const card = el.querySelector<HTMLElement>(".mpi-photo");
    const cw = card?.offsetWidth ?? 260;
    const ch = card?.offsetHeight ?? 260;
    setPos(
      photos.map((p) => ({
        x: (p.x / 100) * Math.max(0, width - cw),
        y: (p.y / 100) * Math.max(0, height - ch),
      })),
    );
  }, [photos]);

  useLayoutEffect(() => {
    place();
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, [place]);

  const onDown = (i: number) => (e: React.PointerEvent<HTMLDivElement>) => {
    const el = box.current;
    if (!el || !pos[i]) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    const rect = el.getBoundingClientRect();
    grab.current = { dx: e.clientX - rect.left - pos[i].x, dy: e.clientY - rect.top - pos[i].y };
    setHeld(i);
    setOrder((o) => [...o.filter((n) => n !== i), i]);
  };

  const onMove = (i: number) => (e: React.PointerEvent<HTMLDivElement>) => {
    if (held !== i) return;
    const el = box.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const card = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - grab.current.dx;
    const y = e.clientY - rect.top - grab.current.dy;
    const clamp = (v: number, max: number) => Math.max(-24, Math.min(v, max));
    setPos((prev) =>
      prev.map((p, n) =>
        n === i
          ? { x: clamp(x, rect.width - card.width + 24), y: clamp(y, rect.height - card.height + 24) }
          : p,
      ),
    );
  };

  const onUp = () => setHeld(null);

  return (
    <div className="mpi-collage" ref={box}>
      {photos.map((p, i) => (
        <div
          key={p.src}
          className={`mpi-photo ${held === i ? "is-held" : ""}`}
          style={{
            transform: `translate3d(${pos[i]?.x ?? 0}px, ${pos[i]?.y ?? 0}px, 0) rotate(${
              held === i ? 0 : p.rot
            }deg)`,
            zIndex: order.indexOf(i) + 1,
            transition: held === i ? "none" : "transform 320ms cubic-bezier(.2,.7,.2,1)",
            opacity: pos.length ? 1 : 0,
          }}
          onPointerDown={onDown(i)}
          onPointerMove={onMove(i)}
          onPointerUp={onUp}
          onPointerCancel={onUp}
        >
          <figure>
            <Image src={p.src} alt={p.alt} fill sizes="300px" draggable={false} />
          </figure>
          <figcaption>{p.caption}</figcaption>
        </div>
      ))}
      <span className="mpi-drag-hint">Drag the photographs</span>
    </div>
  );
}
