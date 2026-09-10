"use client";

import { useEffect } from "react";

/** Fades `.r2-rev` sections in as they scroll into view. Renders nothing. */
export function Reveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".r2-rev"));
    const reveal = (el: Element) => el.classList.add("in");

    if (!("IntersectionObserver" in window)) {
      els.forEach(reveal);
      return;
    }

    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) {
            reveal(e.target);
            io.unobserve(e.target);
          }
        }),
      { rootMargin: "0px 0px -10% 0px", threshold: 0 }
    );

    els.forEach((el) => {
      // anything already on screen at mount shows straight away
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) reveal(el);
      else io.observe(el);
    });

    // safety net: never leave a section invisible
    const t = window.setTimeout(() => els.forEach(reveal), 2500);

    return () => {
      io.disconnect();
      window.clearTimeout(t);
    };
  }, []);

  return null;
}
