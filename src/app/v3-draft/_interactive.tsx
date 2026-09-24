"use client";

import { useEffect, useRef, useState } from "react";

/* Fires once when the element scrolls into view. */
function useInView<T extends Element>(threshold = 0.4) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, inView] as const;
}

/* The orange hand-drawn tangle next to the problem headline. */
export function Scribble() {
  const [ref, inView] = useInView<SVGSVGElement>(0.5);
  return (
    <svg
      ref={ref}
      viewBox="0 0 320 240"
      fill="none"
      aria-hidden="true"
      className={`v3-scribble${inView ? " is-in" : ""}`}
    >
      <path
        pathLength={1}
        d="M58 122C18 84 58 22 132 30c80 9 118 78 80 138-38 58-140 54-162-6-15-50 40-92 92-82 50 10 60 70 20 90-40 20-72-18-52-45 15-20 50-10 42 14-6 18-30 16-30 2M150 150c20 30 90 60 150 38"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

