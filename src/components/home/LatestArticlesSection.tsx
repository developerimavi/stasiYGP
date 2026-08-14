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
      <div className="relative aspect-[16/11] w-full overflow-hidden bg-paper/5">
        {article.cover_image_url ? (
          <Image
            src={article.cover_image_url}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
            sizes="(min-width: 1024px) 380px, 100vw"
          />
        ) : (
          <div className="h-full w-full bg-paper/5" />
        )}
      </div>

      <div className="flex items-center gap-3 pt-5 text-[10px] uppercase tracking-[.22em] text-paper/40">
        {article.category && (
          <>
            <span className="text-accent">{article.category.name}</span>
            <span className="h-px w-4 bg-paper/20" />
          </>
        )}
        <span>{formatDate(article.published_at)}</span>
      </div>

      <h3 className="mt-3 font-display-alt text-[26px] font-light leading-[1.15] text-paper transition-colors duration-300 group-hover:text-accent">
        {article.title}
      </h3>

      <p className="mt-2.5 line-clamp-2 text-sm leading-[1.7] text-paper/50">
        {stripHtmlExcerpt(article.content)}
      </p>
    </Link>
  );
}

export function LatestArticlesSection({ articles }: { articles: Article[] }) {
  if (articles.length === 0) return null;

  return (
    <section className="bg-ink px-6 py-24 font-sans-alt sm:px-10 lg:px-14 lg:py-32">
      <div className="mx-auto max-w-[1240px]">
        <div
          className="reveal flex flex-col justify-between gap-6 border-b border-paper/10 pb-10 sm:flex-row sm:items-end sm:gap-14"
          data-reveal-i={0}
        >
          <div>
            <div className="mb-5 flex items-center gap-4">
              <span className="h-px w-[52px] bg-accent" />
              <span className="text-[10px] uppercase tracking-[.34em] text-paper/55">
                Kabar Paroki
              </span>
            </div>
            <h2 className="m-0 max-w-[16ch] font-display-alt text-[clamp(32px,4.4vw,64px)] font-light leading-[1.02] tracking-[-.015em] text-paper">
              Artikel &amp; Berita Terbaru
            </h2>
          </div>
          <p className="m-0 max-w-[32ch] text-sm leading-[1.8] text-paper/50">
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
            className="inline-flex items-center border border-accent/50 px-6 py-3 text-[11px] uppercase tracking-[.2em] text-paper transition-colors duration-300 hover:bg-accent hover:text-ink"
          >
            Lihat Semua Artikel
          </Link>
        </div>
      </div>
    </section>
  );
}
