import Link from "next/link";
import { Megaphone } from "lucide-react";
import { formatDate, stripHtmlExcerpt } from "@/lib/format";
import type { Announcement } from "@/types/database";

export function AnnouncementSection({ announcements }: { announcements: Announcement[] }) {
  if (announcements.length === 0) return null;

  return (
    <section className="bg-paper px-6 py-24 font-sans-alt text-ink-soft sm:px-10 lg:px-14 lg:py-32">
      <div className="mx-auto max-w-[1240px]">
        <div
          className="reveal flex flex-col justify-between gap-6 border-b border-ink-soft/14 pb-10 sm:flex-row sm:items-end sm:gap-14"
          data-reveal-i={0}
        >
          <div>
            <div className="mb-5 flex items-center gap-4">
              <span className="h-px w-[52px] bg-accent-ink" />
              <span className="text-[10px] uppercase tracking-[.34em] text-ink-soft/50">
                Info Paroki
              </span>
            </div>
            <h2 className="m-0 max-w-[16ch] font-display-alt text-[clamp(32px,4.4vw,64px)] font-light leading-[1.02] tracking-[-.015em]">
              Pengumuman
            </h2>
          </div>
          <p className="m-0 max-w-[32ch] text-sm leading-[1.8] text-ink-soft/55">
            Pernikahan, tahbisan, dan kabar penting seputar kehidupan paroki.
          </p>
        </div>

        <div>
          {announcements.map((a, i) => (
            <Link
              key={a.id}
              href={`/pengumuman/${a.slug}`}
              className="reveal grid grid-cols-1 items-baseline gap-x-8 gap-y-2 border-b border-ink-soft/12 py-8 transition-[background-color,padding-left] duration-300 hover:bg-accent/[.14] hover:pl-4 sm:grid-cols-[150px_minmax(0,1fr)_40px] sm:items-center"
              data-reveal-i={i + 1}
            >
              <span className="text-[11px] uppercase tracking-[.16em] text-ink-soft/40">
                {formatDate(a.published_at)}
              </span>

              <span>
                <span className="flex items-center gap-2.5">
                  <span className="font-display-alt text-[24px] leading-tight sm:text-[30px]">
                    {a.title}
                  </span>
                  {a.is_priority && (
                    <span className="flex shrink-0 items-center gap-1 text-[10px] uppercase tracking-[.16em] text-accent-ink">
                      <Megaphone size={11} />
                      Penting
                    </span>
                  )}
                </span>
                <span className="mt-1.5 line-clamp-1 block text-sm text-ink-soft/55">
                  {stripHtmlExcerpt(a.content)}
                </span>
              </span>

              <span className="hidden text-right text-accent-ink sm:block">→</span>
            </Link>
          ))}
        </div>

        <div className="reveal mt-12">
          <Link
            href="/pengumuman"
            className="inline-flex items-center border border-accent-ink/40 px-6 py-3 text-[11px] uppercase tracking-[.2em] transition-colors duration-300 hover:bg-accent-ink hover:text-paper"
          >
            Lihat Semua Pengumuman
          </Link>
        </div>
      </div>
    </section>
  );
}
