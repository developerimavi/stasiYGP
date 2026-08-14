import { PageSection, RevealItem } from "@/components/ui/PageSection";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { CategoryFilter } from "@/components/articles/CategoryFilter";
import { Pagination } from "@/components/ui/Pagination";
import { getArticles, getCategories } from "@/lib/queries";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Artikel & Pengumuman — Paroki Yohanes Gabriel Perboyre",
};

export const revalidate = 300;

const PAGE_SIZE = 9;

export default async function ArtikelPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; page?: string }>;
}) {
  const params = await searchParams;
  const page = Number(params.page ?? "1");

  const [{ articles, total }, categories] = await Promise.all([
    getArticles({ categorySlug: params.category, page, pageSize: PAGE_SIZE }),
    getCategories(),
  ]);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <PageSection
      eyebrow="Kabar Paroki"
      title="Artikel & Pengumuman"
      description="Kumpulan berita, pengumuman, dan kegiatan seputar kehidupan menggereja di paroki kita."
    >
      <div className="reveal" data-reveal-i={1}>
        <CategoryFilter categories={categories} activeSlug={params.category} />
      </div>

      {articles.length === 0 ? (
        <p className="mt-16 text-center text-parish-700/70">
          Belum ada artikel untuk kategori ini.
        </p>
      ) : (
        <div className="mt-10 grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article, i) => (
            <RevealItem key={article.id} i={i + 2}>
              <ArticleCard article={article} />
            </RevealItem>
          ))}
        </div>
      )}

      <Pagination
        page={page}
        totalPages={totalPages}
        basePath="/artikel"
        searchParams={{ category: params.category }}
      />
    </PageSection>
  );
}
