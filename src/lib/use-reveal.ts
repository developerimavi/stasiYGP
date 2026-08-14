"use client";

import { useEffect } from "react";

/**
 * Reveals elements marked with `.reveal` as they scroll into view.
 * Children are staggered by their `data-reveal-i` index (80ms apart).
 * Each element is unobserved once shown, so it doesn't re-animate on the
 * way back up. See DESIGN-SYSTEM.md §3.
 */
export function useReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    if (els.length === 0) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      els.forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "none";
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          const delay = Number(el.dataset.revealI ?? 0) * 80;
          el.style.transition =
            `opacity 700ms cubic-bezier(.22,1,.36,1) ${delay}ms,` +
            `transform 700ms cubic-bezier(.22,1,.36,1) ${delay}ms`;
          el.style.opacity = "1";
          el.style.transform = "none";
          observer.unobserve(el);
        });
      },
      { threshold: 0.18 }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}
