"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { RichTextContent } from "@/components/ui/RichTextContent";
import type { WelcomeSlide } from "@/types/database";

export function WelcomeModal({ slides }: { slides: WelcomeSlide[] }) {
  const [open, setOpen] = useState(true);
  const [activeId, setActiveId] = useState(slides[0]?.id);

  useEffect(() => {
    if (slides.length === 0 || !open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, slides.length]);

  if (slides.length === 0 || !open) return null;

  const active = slides.find((s) => s.id === activeId) ?? slides[0];

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4"
      onClick={() => setOpen(false)}
    >
      <div
        className="flex max-h-[85vh] w-full max-w-3xl flex-col overflow-hidden bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-parish-100 px-8 py-5">
          {slides.length > 1 ? (
            <div className="flex flex-wrap gap-1">
              {slides.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setActiveId(s.id)}
                  className={`px-4 py-2 text-[11px] uppercase tracking-[.16em] transition-colors ${
                    s.id === active.id
                      ? "bg-parish-600 text-white"
                      : "text-parish-700/70 hover:bg-parish-50"
                  }`}
                >
                  {s.title}
                </button>
              ))}
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-gold-600" />
              <span className="text-[10px] uppercase tracking-[.3em] text-parish-700/55">
                Selamat Datang
              </span>
            </div>
          )}
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Tutup"
            className="flex h-8 w-8 shrink-0 items-center justify-center text-parish-500 transition-colors hover:bg-parish-50 hover:text-parish-800"
          >
            <X size={18} />
          </button>
        </div>

        {/* Photo on the left, with the title, name and greeting all running
            down the right so the column beside the portrait isn't left empty. */}
        <div className="overflow-y-auto px-8 py-7">
          <div className="flex flex-col gap-6 sm:flex-row">
            {active.photo_url ? (
              <div className="relative aspect-[3/4] w-full shrink-0 overflow-hidden border border-parish-100 sm:h-[336px] sm:w-[252px]">
                <Image
                  src={active.photo_url}
                  alt={active.name ?? active.title}
                  fill
                  className="object-cover"
                  sizes="(min-width: 640px) 252px, 100vw"
                />
              </div>
            ) : (
              active.name && (
                <div className="flex aspect-[3/4] w-full shrink-0 items-center justify-center bg-parish-50 font-display text-6xl text-parish-500 sm:h-[336px] sm:w-[252px]">
                  {active.name
                    .split(" ")
                    .filter(Boolean)
                    .slice(0, 2)
                    .map((w) => w[0])
                    .join("")
                    .toUpperCase()}
                </div>
              )
            )}

            <div className="min-w-0 flex-1">
              <h2 className="font-display text-2xl leading-snug text-parish-900">
                {active.title}
              </h2>
              {active.name && (
                <p className="mt-2 text-sm uppercase tracking-[.16em] text-parish-700/60">
                  {active.name}
                </p>
              )}
              <RichTextContent
                html={active.content}
                className="mt-5 text-base text-parish-800/90"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
