import type { LiturgicalColor } from "@/types/database";

/**
 * Muted tints of each liturgical colour, for large surfaces like the home page
 * section background. The saturated `solid`/`dot` variants below are right for
 * small badges but overwhelming across a full-width block, so these stay soft
 * and warm enough to sit beside the cream palette.
 */
export const LITURGICAL_COLOR_SOFT: Record<
  LiturgicalColor,
  { section: string; rule: string; accent: string }
> = {
  putih: {
    section: "bg-[#faf7f0]",
    rule: "bg-[#c9b892]",
    accent: "text-[#8a7742]",
  },
  merah: {
    section: "bg-[#fbf3f1]",
    rule: "bg-[#c98d80]",
    accent: "text-[#a15343]",
  },
  hijau: {
    section: "bg-[#f3f8f4]",
    rule: "bg-[#8bb69b]",
    accent: "text-[#3f7256]",
  },
  ungu: {
    section: "bg-[#f7f4fa]",
    rule: "bg-[#a99ec2]",
    accent: "text-[#6b5d8a]",
  },
  merah_muda: {
    section: "bg-[#fdf4f6]",
    rule: "bg-[#d9a3b3]",
    accent: "text-[#a05c73]",
  },
};

export const LITURGICAL_COLOR_STYLES: Record<
  LiturgicalColor,
  { label: string; dot: string; bg: string; text: string; solid: string; solidText: string }
> = {
  putih: {
    label: "Putih",
    dot: "bg-neutral-100 border border-neutral-300",
    bg: "bg-neutral-50",
    text: "text-neutral-700",
    solid: "bg-neutral-100 border border-neutral-300",
    solidText: "text-neutral-800",
  },
  merah: {
    label: "Merah",
    dot: "bg-red-600",
    bg: "bg-red-50",
    text: "text-red-700",
    solid: "bg-red-600",
    solidText: "text-white",
  },
  hijau: {
    label: "Hijau",
    dot: "bg-parish-600",
    bg: "bg-parish-50",
    text: "text-parish-700",
    solid: "bg-parish-600",
    solidText: "text-white",
  },
  ungu: {
    label: "Ungu",
    dot: "bg-violet-600",
    bg: "bg-violet-50",
    text: "text-violet-700",
    solid: "bg-violet-600",
    solidText: "text-white",
  },
  merah_muda: {
    label: "Merah Muda",
    dot: "bg-pink-400",
    bg: "bg-pink-50",
    text: "text-pink-700",
    solid: "bg-pink-400",
    solidText: "text-white",
  },
};
