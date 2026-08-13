import Image from "next/image";
import { Users } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getTerritories } from "@/lib/queries";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wilayah & Lingkungan — Paroki Yohanes Gabriel Perboyre",
};

export const revalidate = 300;

export default async function WilayahPage() {
  const territories = await getTerritories();

  return (
    <Container className="py-16">
      <SectionHeading
        eyebrow="Struktur Teritorial"
        title="Wilayah & Lingkungan"
        description="Pembagian wilayah dan lingkungan umat Paroki Yohanes Gabriel Perboyre."
      />

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        {territories.map((t) => (
          <Card key={t.id} className="p-6">
            <div className="flex items-center gap-4">
              {t.photo_url ? (
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-parish-100">
                  <Image
                    src={t.photo_url}
                    alt={t.name}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>
              ) : (
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-parish-50 font-display text-lg text-parish-500">
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
                <h3 className="font-display text-lg text-parish-900">{t.name}</h3>
                <p className="text-sm text-parish-700/70">Ketua Wilayah: {t.chairman}</p>
              </div>
            </div>
            <div className="mt-4 divide-y divide-parish-100 border-t border-parish-100">
              {t.neighborhoods.map((n) => (
                <div key={n.id} className="flex items-center justify-between gap-2 py-2.5">
                  <div>
                    <p className="text-sm font-medium text-parish-800">{n.name}</p>
                    <p className="text-xs text-parish-700/70">Ketua: {n.chairman}</p>
                  </div>
                  <span className="flex items-center gap-1 text-xs text-parish-500">
                    <Users size={12} />
                    {n.family_count} KK
                  </span>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </Container>
  );
}
