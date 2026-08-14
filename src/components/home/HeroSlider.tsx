"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import type { HeroSlide } from "@/types/database";

export function HeroSlider({ slides }: { slides: HeroSlide[] }) {
  const [active, setActive] = useState(0);
  const photoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const next = useCallback(() => {
    setActive((v) => (v + 1) % slides.length);
  }, [slides.length]);

  const prev = () => setActive((v) => (v - 1 + slides.length) % slides.length);

  useEffect(() => {
    if (slides.length < 2) return;
    const id = setInterval(next, 6000);
    return () => clearInterval(id);
  }, [next, slides.length]);

  // Damped parallax: the photo and copy trail the cursor and scroll rather
  // than tracking them exactly. Desktop only. See DESIGN-SYSTEM.md §3.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const p = { mx: 0, my: 0, tx: 0, ty: 0 };
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      if (window.innerWidth <= 900) return;
      p.tx = (e.clientX / window.innerWidth - 0.5) * 28;
      p.ty = (e.clientY / window.innerHeight - 0.5) * 18;
    };

    const loop = () => {
      const y = window.scrollY || 0;
      p.mx += (p.tx - p.mx) * 0.08;
      p.my += (p.ty - p.my) * 0.08;

      if (photoRef.current) {
        photoRef.current.style.transform = `translate3d(${(-p.mx).toFixed(2)}px,${(
          y * 0.3 -
          p.my
        ).toFixed(2)}px,0)`;
      }
      if (textRef.current) {
        textRef.current.style.transform = `translate3d(${(p.mx * 0.35).toFixed(2)}px,${(
          y * 0.14
        ).toFixed(2)}px,0)`;
        textRef.current.style.opacity = String(Math.max(0, 1 - y / 620));
      }
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (slides.length === 0) return null;

  const slide = slides[active];
  // Break the headline into words so each line can rise out of its own mask.
  const words = slide.title.split(" ");
  const mid = Math.ceil(words.length / 2);
  const lines = words.length > 3 ? [words.slice(0, mid).join(" "), words.slice(mid).join(" ")] : [slide.title];

  return (
    <section className="relative min-h-[86vh] w-full overflow-hidden bg-parish-900">
      <div ref={photoRef} className="absolute inset-0 will-change-transform">
        {slides.map((s, i) => (
          <div
            key={s.id}
            className={cn(
              "absolute inset-0 transition-opacity duration-1000 ease-out",
              i === active ? "opacity-100" : "opacity-0"
            )}
          >
            <Image
              src={s.image_url}
              alt={s.title}
              fill
              priority={i === 0}
              className="scale-110 object-cover"
              sizes="100vw"
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-parish-900 via-parish-900/80 to-parish-900/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-parish-900 via-transparent to-parish-900/40" />
      </div>

      <div
        ref={textRef}
        className="relative z-10 flex min-h-[86vh] flex-col justify-center gap-7 px-6 py-32 sm:px-10 lg:px-14"
      >
        <div
          className="flex items-center gap-4"
          style={{
            animation:
              "fadeUp calc(750ms * var(--m)) cubic-bezier(.22,1,.36,1) calc(200ms * var(--m)) both",
          }}
        >
          <span
            className="h-px w-[52px] origin-left bg-gold-400"
            style={{
              animation:
                "hairline calc(900ms * var(--m)) cubic-bezier(.22,1,.36,1) calc(200ms * var(--m)) both",
            }}
          />
          <span className="text-[10px] uppercase tracking-[.34em] text-white/55">
            Gereja Katolik
          </span>
        </div>

        <h1
          key={slide.id}
          className="m-0 max-w-4xl font-display text-[clamp(40px,5.6vw,92px)]  leading-[.98] tracking-[-.015em] text-white"
        >
          {lines.map((line, i) => (
            <span key={i} className="block overflow-hidden pb-[.05em]">
              <span
                className="block"
                style={{
                  animation: `lineUp calc(1000ms * var(--m)) cubic-bezier(.22,1,.36,1) calc(${
                    300 + i * 120
                  }ms * var(--m)) both`,
                }}
              >
                {line}
              </span>
            </span>
          ))}
        </h1>

        {slide.subtitle && (
          <p
            className="m-0 max-w-[46ch] text-base leading-[1.75] text-white/60"
            style={{
              animation:
                "fadeUp calc(850ms * var(--m)) cubic-bezier(.22,1,.36,1) calc(680ms * var(--m)) both",
            }}
          >
            {slide.subtitle}
          </p>
        )}

        {slide.link_url && (
          <Link
            href={slide.link_url}
            className="mt-2 inline-flex w-fit items-center border border-gold-400/50 px-6 py-3 text-[11px] uppercase tracking-[.2em] text-white transition-colors duration-300 hover:bg-gold-400 hover:text-parish-900"
            style={{
              animation:
                "fadeUp calc(850ms * var(--m)) cubic-bezier(.22,1,.36,1) calc(820ms * var(--m)) both",
            }}
          >
            Selengkapnya
          </Link>
        )}
      </div>

      {slides.length > 1 && (
        <div className="absolute bottom-10 left-6 z-10 flex items-center gap-5 sm:left-10 lg:left-14">
          <div className="flex gap-2">
            {slides.map((s, i) => (
              <button
                key={s.id}
                aria-label={`Ke slide ${i + 1}`}
                onClick={() => setActive(i)}
                className={cn(
                  "h-px transition-all duration-500",
                  i === active ? "w-10 bg-gold-400" : "w-5 bg-white/30 hover:bg-white/60"
                )}
              />
            ))}
          </div>
          <span className="text-[10px] uppercase tracking-[.22em] text-white/40">
            {String(active + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
          </span>
          <div className="flex gap-1">
            <button
              onClick={prev}
              aria-label="Slide sebelumnya"
              className="px-2 text-white/40 transition-colors hover:text-white"
            >
              ←
            </button>
            <button
              onClick={next}
              aria-label="Slide berikutnya"
              className="px-2 text-white/40 transition-colors hover:text-white"
            >
              →
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
