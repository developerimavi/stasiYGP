import Image from "next/image";
import Link from "next/link";
import { formatDate, stripHtmlExcerpt } from "@/lib/format";
import type { Article } from "@/types/database";

function ArticleTile({ article, i }: { article: Article; i: number }) {
  return (
    <Link
      href={`/artikel/${article.slug}`}
      className="reveal group block"
      data-reveal-i={i}
    >
      <div className="relative aspect-[16/11] w-full overflow-hidden rounded-2xl bg-parish-100">
        {article.cover_image_url ? (
          <Image
            src={article.cover_image_url}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
            sizes="(min-width: 1024px) 380px, 100vw"
          />
        ) : (
          <div className="h-full w-full bg-parish-100" />
        )}
      </div>

      <div className="flex items-center gap-3 pt-5 text-[10px] uppercase tracking-[.22em] text-parish-700/50">
        {article.category && (
          <>
            <span className="text-gold-600">{article.category.name}</span>
            <span className="h-px w-4 bg-parish-200" />
          </>
        )}
        <span>{formatDate(article.published_at)}</span>
      </div>

      <h3 className="mt-3 font-display text-[26px] leading-[1.15] text-parish-900 transition-colors duration-300 group-hover:text-parish-600">
        {article.title}
      </h3>

      <p className="mt-2.5 line-clamp-2 text-sm leading-[1.7] text-parish-700/70">
        {stripHtmlExcerpt(article.content)}
      </p>
    </Link>
  );
}

export function LatestArticlesSection({ articles }: { articles: Article[] }) {
  if (articles.length === 0) return null;

  return (
    <section className="bg-cream-50 px-6 py-24 text-parish-900 sm:px-10 lg:px-14 lg:py-32">
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
            <ArticleTile key={article.id} article={article} i={i + 1} />
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
