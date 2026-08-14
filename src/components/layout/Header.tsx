"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

type NavItem = { href: string; label: string };
type NavEntry = NavItem | { label: string; items: NavItem[] };

const NAV: NavEntry[] = [
  { href: "/", label: "Beranda" },
  {
    label: "Profil",
    items: [
      { href: "/profil", label: "Profil Paroki" },
      { href: "/profil/sejarah", label: "Sejarah" },
      { href: "/profil/pastor", label: "Para Pastor" },
      { href: "/organisasi", label: "Struktur Organisasi" },
      { href: "/wilayah", label: "Wilayah & Lingkungan" },
    ],
  },
  {
    label: "Kegiatan",
    items: [
      { href: "/kategorial", label: "Kategorial" },
      { href: "/karya-sosial", label: "Karya Sosial" },
      { href: "/galeri", label: "Galeri" },
    ],
  },
  {
    label: "Info",
    items: [
      { href: "/artikel", label: "Artikel" },
      { href: "/pengumuman", label: "Pengumuman" },
      { href: "/kalender-liturgi", label: "Kalender Liturgi" },
      { href: "/formulir", label: "Formulir" },
      { href: "/intensi-misa", label: "Intensi Misa" },
    ],
  },
];

function DesktopDropdown({
  label,
  items,
  overlay,
}: {
  label: string;
  items: NavItem[];
  overlay?: boolean;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        className={cn(
          "flex items-center gap-1 text-sm font-medium transition-colors",
          overlay
            ? "text-white/75 hover:text-white"
            : "text-parish-800/80 hover:text-parish-700"
        )}
      >
        {label}
        <ChevronDown size={14} />
      </button>
      <div
        className={cn(
          "absolute left-1/2 top-full grid w-56 -translate-x-1/2 grid-cols-1 gap-0.5 border border-parish-100 bg-white p-2 shadow-lg transition-all",
          open ? "visible opacity-100" : "invisible opacity-0"
        )}
      >
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="px-3 py-2 text-sm text-parish-800 hover:bg-parish-50"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // The redesigned home page opens on a dark hero, so the header floats over
  // it transparently and only gains a background once you scroll past it.
  const overlay = pathname === "/";

  useEffect(() => {
    if (!overlay) return;
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [overlay]);

  return (
    <header
      className={cn(
        "top-0 z-50 transition-colors duration-300",
        // On the home page the header floats over the hero photo, so it has to
        // be fixed rather than sticky — sticky would occupy its own strip above
        // the hero and the "transparent" state would show the cream page
        // background, leaving the white text unreadable.
        overlay
          ? scrolled
            ? "fixed inset-x-0 border-b border-white/10 bg-parish-900/85 backdrop-blur"
            : "fixed inset-x-0 border-b border-transparent bg-gradient-to-b from-parish-900/70 to-transparent"
          : "sticky border-b border-parish-100/80 bg-cream-50/90 backdrop-blur"
      )}
    >
      <Container className="flex h-20 items-center justify-between gap-4">
        <Link
          href="/"
          className={cn(
            "flex shrink-0 items-center gap-2.5 transition-colors",
            overlay ? "text-white" : "text-parish-900"
          )}
        >
          <Image
            src="/logo.png"
            alt="Logo Paroki Yohanes Gabriel Perboyre"
            width={56}
            height={56}
            className="h-14 w-14 object-contain"
          />
          <span className="flex flex-col leading-tight">
            <span
              className={cn(
                "text-[11px] font-semibold uppercase tracking-wide",
                overlay ? "text-gold-400" : "text-gold-600"
              )}
            >
              Gereja Katolik
            </span>
            <span className="whitespace-nowrap font-display text-base sm:text-lg">
              Paroki Yohanes Gabriel Perboyre
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {NAV.map((entry) =>
            "items" in entry ? (
              <DesktopDropdown
                key={entry.label}
                label={entry.label}
                items={entry.items}
                overlay={overlay}
              />
            ) : (
              <Link
                key={entry.href}
                href={entry.href}
                className={cn(
                  "text-sm font-medium transition-colors",
                  overlay
                    ? "text-white/75 hover:text-white"
                    : "text-parish-800/80 hover:text-parish-700"
                )}
              >
                {entry.label}
              </Link>
            )
          )}
        </nav>

        <div className="hidden lg:block">
          <Button href="/jadwal-misa" size="sm">
            Lihat Jadwal Misa
          </Button>
        </div>

        <button
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-full md:hidden",
            overlay ? "text-white" : "text-parish-800"
          )}
          onClick={() => setOpen((v) => !v)}
          aria-label="Buka menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </Container>

      <div
        className={cn(
          "overflow-y-auto overflow-x-hidden border-t border-parish-100 bg-cream-50 md:hidden transition-[max-height] duration-300",
          open ? "max-h-[80vh]" : "max-h-0 border-t-0"
        )}
      >
        <Container className="flex flex-col gap-1 py-3">
          {NAV.map((entry) =>
            "items" in entry ? (
              <div key={entry.label} className="py-1">
                <p className="px-3 pb-1 text-xs font-semibold uppercase tracking-wide text-gold-600">
                  {entry.label}
                </p>
                {entry.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block px-3 py-2.5 text-sm font-medium text-parish-800 hover:bg-parish-50"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            ) : (
              <Link
                key={entry.href}
                href={entry.href}
                onClick={() => setOpen(false)}
                className="px-3 py-2.5 text-sm font-medium text-parish-800 hover:bg-parish-50"
              >
                {entry.label}
              </Link>
            )
          )}

          {/* The desktop CTA is the only route to the schedule now, so the
              mobile menu needs its own. */}
          <Link
            href="/jadwal-misa"
            onClick={() => setOpen(false)}
            className="mt-2 inline-flex items-center justify-center bg-parish-600 px-6 py-3 text-[11px] uppercase tracking-[.2em] text-white transition-colors duration-300 hover:bg-parish-700"
          >
            Lihat Jadwal Misa
          </Link>
        </Container>
      </div>
    </header>
  );
}
