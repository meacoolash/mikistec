"use client";

import { useEffect, useState } from "react";

/**
 * The hero headline: the line settles in, rests, lifts away, and the name
 * arrives. Client-only so the rest of the page can stay server-rendered.
 */
export function HeroHeadline({ line, brand }: { line: string; brand: string }) {
  const [stage, setStage] = useState<"idle" | "line" | "out" | "brand">("idle");

  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setStage("brand");
      return;
    }
    const t = [
      window.setTimeout(() => setStage("line"), 400),
      window.setTimeout(() => setStage("out"), 3600),
      window.setTimeout(() => setStage("brand"), 3600),
    ];
    return () => t.forEach(window.clearTimeout);
  }, []);

  return (
    <h1 aria-label="Return to Roots">
      <span className="r2-lines">
        <span data-show={stage === "line" ? "true" : stage === "idle" ? "false" : "gone"} aria-hidden>
          {line}
        </span>
        <span data-show={stage === "brand"} aria-hidden>
          {brand}
        </span>
      </span>
    </h1>
  );
}
