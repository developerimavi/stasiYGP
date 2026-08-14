import Link from "next/link";
import { Megaphone } from "lucide-react";
import { PageSection, RevealItem } from "@/components/ui/PageSection";
import { formatDate, stripHtmlExcerpt } from "@/lib/format";
import { getAnnouncements } from "@/lib/queries";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pengumuman — Paroki Yohanes Gabriel Perboyre",
};

export const revalidate = 300;

export default async function PengumumanPage() {
  const announcements = await getAnnouncements();

  return (
    <PageSection
      eyebrow="Info Paroki"
      title="Pengumuman"
      description="Pernikahan, tahbisan, dan pengumuman penting seputar kehidupan paroki."
    >
      <div>
        {announcements.map((a, i) => (
          <RevealItem key={a.id} i={i + 1}>
            <Link
              href={`/pengumuman/${a.slug}`}
              className="grid grid-cols-1 items-baseline gap-x-8 gap-y-2 border-b border-parish-100 py-8 transition-[background-color,padding-left] duration-300 hover:bg-parish-50 hover:pl-4 sm:grid-cols-[150px_minmax(0,1fr)_32px] sm:items-center"
            >
              <span className="text-[11px] uppercase tracking-[.16em] text-parish-700/50">
                {formatDate(a.published_at)}
              </span>

              <span>
                <span className="flex flex-wrap items-center gap-2.5">
                  <span className="font-display text-[24px] leading-tight text-parish-900 sm:text-[28px]">
                    {a.title}
                  </span>
                  <span className="shrink-0 text-[10px] uppercase tracking-[.16em] text-gold-600">
                    {a.category}
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
          </RevealItem>
        ))}
      </div>
    </PageSection>
  );
}
