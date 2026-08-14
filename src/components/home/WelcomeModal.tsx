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
        className="flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-parish-100 px-6 py-4">
          {slides.length > 1 ? (
            <div className="flex gap-1">
              {slides.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setActiveId(s.id)}
                  className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                    s.id === active.id
                      ? "bg-parish-600 text-white"
                      : "text-parish-700 hover:bg-parish-50"
                  }`}
                >
                  {s.title}
                </button>
              ))}
            </div>
          ) : (
            <h2 className="font-display text-lg text-parish-900">{active.title}</h2>
          )}
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Tutup"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-parish-500 hover:bg-parish-50"
          >
            <X size={18} />
          </button>
        </div>

        <div className="overflow-y-auto px-6 py-6">
          <div className="flex gap-4">
            {active.photo_url ? (
              <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl border border-parish-100">
                <Image
                  src={active.photo_url}
                  alt={active.name ?? active.title}
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              </div>
            ) : (
              active.name && (
                <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-xl bg-parish-50 font-display text-2xl text-parish-500">
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

            {active.name && (
              <div className="min-w-0 flex-1 self-center">
                <p className="font-display text-lg text-parish-900">{active.name}</p>
              </div>
            )}
          </div>

          <RichTextContent html={active.content} className="mt-4 text-sm text-parish-800/90" />
        </div>
      </div>
    </div>
  );
}
