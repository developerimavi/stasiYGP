"use client";

import { useEffect, useState } from "react";

const SEEN_KEY = "ygp-veil-seen";

/**
 * Cinematic opening curtain. Shows once per browser session so returning
 * visitors don't sit through it on every navigation. See DESIGN-SYSTEM.md §3.
 */
export function OpeningVeil() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || sessionStorage.getItem(SEEN_KEY)) return;

    sessionStorage.setItem(SEEN_KEY, "1");
    setShow(true);
    const t = setTimeout(() => setShow(false), 2700);
    return () => clearTimeout(t);
  }, []);

  if (!show) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[200]" aria-hidden>
      <div
        className="absolute inset-0 bg-cream-100"
        style={{
          animation:
            "veilUp calc(1000ms * var(--m)) cubic-bezier(.78,0,.22,1) calc(1400ms * var(--m)) both",
        }}
      />
      <div
        className="absolute inset-0 flex flex-col items-center justify-center gap-6 bg-parish-900"
        style={{
          animation:
            "veilUp calc(1000ms * var(--m)) cubic-bezier(.78,0,.22,1) calc(1520ms * var(--m)) both",
        }}
      >
        <div
          className="relative h-7 w-7"
          style={{ animation: "fadeIn calc(700ms * var(--m)) ease-out both" }}
        >
          <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gold-400" />
          <span className="absolute left-0 top-[34%] h-px w-full bg-gold-400" />
        </div>
        <div
          className="h-[52px] w-px origin-top"
          style={{
            background: "linear-gradient(rgba(237,231,220,.5), rgba(237,231,220,0))",
            animation:
              "hairlineY calc(1250ms * var(--m)) cubic-bezier(.22,1,.36,1) calc(140ms * var(--m)) both",
          }}
        />
        <div
          className="pl-[.42em] text-[10px] uppercase tracking-[.42em] text-white/50"
          style={{
            animation:
              "fadeIn calc(800ms * var(--m)) ease-out calc(320ms * var(--m)) both",
          }}
        >
          Paroki Yohanes Gabriel Perboyre
        </div>
      </div>
    </div>
  );
}
