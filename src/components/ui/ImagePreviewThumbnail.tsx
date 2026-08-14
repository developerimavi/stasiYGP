"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export function ImagePreviewThumbnail({
  src,
  alt,
  className,
  sizes = "64px",
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Lihat foto ${alt}`}
        className={cn(
          "relative shrink-0 overflow-hidden border border-parish-100 transition-opacity hover:opacity-90",
          className
        )}
      >
        <Image src={src} alt={alt} fill className="object-cover" sizes={sizes} />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6"
          onClick={() => setOpen(false)}
        >
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Tutup"
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
          >
            <X size={20} />
          </button>
          <div
            className="relative h-[80vh] w-full max-w-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={src}
              alt={alt}
              fill
              className="object-contain"
              sizes="(min-width: 768px) 672px, 100vw"
            />
          </div>
        </div>
      )}
    </>
  );
}
