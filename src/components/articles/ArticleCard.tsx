import Image from "next/image";
import Link from "next/link";
import { formatDate, stripHtmlExcerpt } from "@/lib/format";
import type { Article } from "@/types/database";

export function ArticleCard({ article }: { article: Article }) {
  return (
    <Link href={`/artikel/${article.slug}`} className="group block">
      <div className="relative aspect-[16/11] w-full overflow-hidden bg-parish-100">
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
