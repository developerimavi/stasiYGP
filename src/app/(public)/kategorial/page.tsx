import { Card } from "@/components/ui/Card";
import { PageSection, RevealItem } from "@/components/ui/PageSection";
import { RichTextContent } from "@/components/ui/RichTextContent";
import { getCategoricalGroups } from "@/lib/queries";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kategorial — Paroki Yohanes Gabriel Perboyre",
};

export const revalidate = 300;

export default async function KategorialPage() {
  const groups = await getCategoricalGroups();

  return (
    <PageSection
      eyebrow="Kelompok Umat"
      title="Kategorial"
      description="Berbagai kelompok kategorial yang aktif melayani di Paroki Yohanes Gabriel Perboyre."
    >
      <div className="grid gap-6 sm:grid-cols-2">
        {groups.map((g, i) => (
          <RevealItem key={g.id} i={i + 1}>
            <Card className="h-full p-6">
              <h3 className="font-display text-xl text-parish-900">{g.name}</h3>
              <RichTextContent
                html={g.content}
                className="mt-3 text-base text-parish-800/90"
              />
              <div className="mt-4 space-y-1 border-t border-parish-100 pt-4 text-sm text-parish-700/80">
                {g.schedule && <p>Jadwal: {g.schedule}</p>}
                {g.contact && <p>Kontak: {g.contact}</p>}
              </div>
            </Card>
          </RevealItem>
        ))}
      </div>
    </PageSection>
  );
}
