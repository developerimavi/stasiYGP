import Link from "next/link";
import { Megaphone } from "lucide-react";
import { formatDate, stripHtmlExcerpt } from "@/lib/format";
import type { Announcement } from "@/types/database";

export function AnnouncementSection({ announcements }: { announcements: Announcement[] }) {
  if (announcements.length === 0) return null;

  return (
    <section className="bg-cream-100 px-6 py-16 text-parish-900 sm:px-10 lg:px-14 lg:py-24">
      <div className="mx-auto max-w-[1240px]">
        <div
          className="reveal flex flex-col justify-between gap-6 border-b border-parish-200/60 pb-10 sm:flex-row sm:items-end sm:gap-14"
          data-reveal-i={0}
        >
          <div>
            <div className="mb-5 flex items-center gap-4">
              <span className="h-px w-[52px] bg-gold-600" />
              <span className="text-[10px] uppercase tracking-[.34em] text-parish-700/60">
                Info Paroki
              </span>
            </div>
            <h2 className="m-0 max-w-[16ch] font-display text-[clamp(32px,4.4vw,64px)] leading-[1.02] tracking-[-.015em]">
              Pengumuman
            </h2>
          </div>
          <p className="m-0 max-w-[32ch] text-sm leading-[1.8] text-parish-700/70">
            Pernikahan, tahbisan, dan kabar penting seputar kehidupan paroki.
          </p>
        </div>

        <div>
          {announcements.map((a, i) => (
            <Link
              key={a.id}
              href={`/pengumuman/${a.slug}`}
              className="reveal grid grid-cols-1 items-baseline gap-x-8 gap-y-2 border-b border-parish-100 py-8 transition-[background-color,padding-left] duration-300 hover:bg-parish-50 hover:pl-4 sm:grid-cols-[150px_minmax(0,1fr)_40px] sm:items-center"
              data-reveal-i={i + 1}
            >
              <span className="text-[11px] uppercase tracking-[.16em] text-parish-700/50">
                {formatDate(a.published_at)}
              </span>

              <span>
                <span className="flex items-center gap-2.5">
                  <span className="font-display text-[24px] leading-tight sm:text-[30px]">
                    {a.title}
                  </span>
                  {a.is_priority && (
                    <span className="flex shrink-0 items-center gap-1 text-[10px] uppercase tracking-[.16em] text-gold-600">
                      <Megaphone size={11} />
                      Penting
                    </span>
                  )}
                </span>
                <span className="mt-1.5 line-clamp-1 block text-sm text-parish-700/70">
                  {stripHtmlExcerpt(a.content)}
                </span>
              </span>

              <span className="hidden text-right text-gold-600 sm:block">→</span>
            </Link>
          ))}
        </div>

        <div className="reveal mt-12">
          <Link
            href="/pengumuman"
            className="inline-flex items-center border border-parish-600/40 px-6 py-3 text-[11px] uppercase tracking-[.2em] text-parish-800 transition-colors duration-300 hover:bg-parish-600 hover:text-white"
          >
            Lihat Semua Pengumuman
          </Link>
        </div>
      </div>
    </section>
  );
}
