import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { PageSection, RevealItem } from "@/components/ui/PageSection";
import { getGalleries } from "@/lib/queries";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Galeri — Paroki Yohanes Gabriel Perboyre",
};

export const revalidate = 300;

export default async function GaleriPage() {
  const galleries = await getGalleries();

  return (
    <PageSection
      eyebrow="Dokumentasi"
      title="Galeri Foto"
      description="Momen-momen kegiatan Paroki Yohanes Gabriel Perboyre."
    >
      <div className="space-y-16">
        {galleries.map((g, i) => (
          <RevealItem key={g.id} i={i + 1}>
            <div className="flex flex-wrap items-end justify-between gap-3 border-b border-parish-200/60 pb-4">
              <h3 className="font-display text-2xl text-parish-900">{g.title}</h3>
              {g.google_photo_url && (
                <a
                  href={g.google_photo_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[.2em] text-gold-600 hover:text-parish-700"
                >
                  Lihat album lengkap
                  <ExternalLink size={12} />
                </a>
              )}
            </div>
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {(g.images ?? []).map((img) => (
                <div
                  key={img.id}
                  className="relative aspect-square overflow-hidden bg-parish-100"
                >
                  <Image
                    src={img.image_url}
                    alt={img.caption ?? g.title}
                    fill
                    className="object-cover transition-transform duration-[900ms] ease-out hover:scale-105"
                    sizes="(min-width: 640px) 240px, 50vw"
                  />
                </div>
              ))}
            </div>
          </RevealItem>
        ))}
      </div>
    </PageSection>
  );
}
