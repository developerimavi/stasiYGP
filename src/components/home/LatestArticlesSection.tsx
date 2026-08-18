import Link from "next/link";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { RevealItem } from "@/components/ui/PageSection";
import type { Article } from "@/types/database";

export function LatestArticlesSection({ articles }: { articles: Article[] }) {
  if (articles.length === 0) return null;

  return (
    <section className="bg-white px-6 py-16 text-parish-900 sm:px-10 lg:px-14 lg:py-24">
      <div className="mx-auto max-w-[1240px]">
        <div
          className="reveal flex flex-col justify-between gap-6 border-b border-parish-200/60 pb-10 sm:flex-row sm:items-end sm:gap-14"
          data-reveal-i={0}
        >
          <div>
            <div className="mb-5 flex items-center gap-4">
              <span className="h-px w-[52px] bg-gold-600" />
              <span className="text-[10px] uppercase tracking-[.34em] text-parish-700/60">
                Kabar Paroki
              </span>
            </div>
            <h2 className="m-0 max-w-[16ch] font-display text-[clamp(32px,4.4vw,64px)] leading-[1.02] tracking-[-.015em]">
              Artikel &amp; Berita Terbaru
            </h2>
          </div>
          <p className="m-0 max-w-[32ch] text-sm leading-[1.8] text-parish-700/70">
            Ikuti perkembangan kegiatan dan berita terkini dari paroki kita.
          </p>
        </div>

        <div className="mt-14 grid gap-x-10 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article, i) => (
            <RevealItem key={article.id} i={i + 1}>
              <ArticleCard article={article} />
            </RevealItem>
          ))}
        </div>

        <div className="reveal mt-16">
          <Link
            href="/artikel"
            className="inline-flex items-center border border-parish-600/40 px-6 py-3 text-[11px] uppercase tracking-[.2em] text-parish-800 transition-colors duration-300 hover:bg-parish-600 hover:text-white"
          >
            Lihat Semua Artikel
          </Link>
        </div>
      </div>
    </section>
  );
}
