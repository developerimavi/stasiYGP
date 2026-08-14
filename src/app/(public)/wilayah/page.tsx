import { Users } from "lucide-react";
import { PageSection, RevealItem } from "@/components/ui/PageSection";
import { ImagePreviewThumbnail } from "@/components/ui/ImagePreviewThumbnail";
import { getTerritories } from "@/lib/queries";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wilayah & Lingkungan — Paroki Yohanes Gabriel Perboyre",
};

export const revalidate = 300;

export default async function WilayahPage() {
  const territories = await getTerritories();

  return (
    <PageSection
      eyebrow="Struktur Teritorial"
      title="Wilayah & Lingkungan"
      description="Pembagian wilayah dan lingkungan umat Paroki Yohanes Gabriel Perboyre."
    >
      <div className="grid items-start gap-x-14 gap-y-14 lg:grid-cols-2">
        {territories.map((t, i) => (
          <RevealItem key={t.id} i={i + 1}>
            <div className="flex items-center gap-5 border-b border-parish-200/60 pb-5">
              {t.photo_url ? (
                <ImagePreviewThumbnail
                  src={t.photo_url}
                  alt={t.name}
                  className="h-20 w-20"
                  sizes="80px"
                />
              ) : (
                <div className="flex h-20 w-20 shrink-0 items-center justify-center bg-parish-50 font-display text-xl text-parish-500">
                  {t.name
                    .replace(/^Wilayah\s*/i, "")
                    .split(" ")
                    .filter(Boolean)
                    .slice(0, 2)
                    .map((w) => w[0])
                    .join("")
                    .toUpperCase()}
                </div>
              )}
              <div className="min-w-0 flex-1">
                <h3 className="font-display text-2xl leading-tight text-parish-900">
                  {t.name}
                </h3>
                <p className="mt-1 text-[10px] uppercase tracking-[.16em] text-parish-700/55">
                  Ketua: {t.chairman}
                </p>
              </div>
            </div>

            <div>
              {t.neighborhoods.map((n) => (
                <div
                  key={n.id}
                  className="flex items-center justify-between gap-3 border-b border-parish-100 py-3.5 transition-[background-color,padding-left] duration-300 hover:bg-parish-50 hover:pl-3"
                >
                  <div className="min-w-0">
                    <p className="font-display text-[17px] text-parish-900">{n.name}</p>
                    <p className="text-xs text-parish-700/60">Ketua: {n.chairman}</p>
                  </div>
                  <span className="flex shrink-0 items-center gap-1.5 text-[11px] tracking-[.1em] text-gold-600">
                    <Users size={12} />
                    {n.family_count} KK
                  </span>
                </div>
              ))}
            </div>
          </RevealItem>
        ))}
      </div>
    </PageSection>
  );
}
