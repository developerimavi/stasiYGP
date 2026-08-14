"use client";

import { useReveal } from "@/lib/use-reveal";

/** Activates scroll reveal for every `.reveal` element on the page. */
export function RevealProvider() {
  useReveal();
  return null;
}
