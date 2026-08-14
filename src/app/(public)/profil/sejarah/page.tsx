import { PageSection, RevealItem } from "@/components/ui/PageSection";
import { RichTextContent } from "@/components/ui/RichTextContent";
import { getParishHistory } from "@/lib/queries";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sejarah Paroki — Paroki Yohanes Gabriel Perboyre",
};

export const revalidate = 300;

export default async function SejarahPage() {
  const history = await getParishHistory();

  return (
    <PageSection
      eyebrow="Perjalanan Kami"
      title="Sejarah Paroki"
      description="Perjalanan Paroki Yohanes Gabriel Perboyre dari masa ke masa."
    >
      <div>
        {history.map((h, i) => (
          <RevealItem key={h.id} i={i + 1}>
            <div className="grid grid-cols-1 gap-x-12 gap-y-3 border-b border-parish-100 py-8 sm:grid-cols-[140px_minmax(0,1fr)]">
              <div>
                <p className="font-display text-[34px] leading-none text-gold-600">
                  {h.year}
                </p>
                <p className="mt-2 text-[10px] uppercase tracking-[.2em] text-parish-700/50">
                  {h.category}
                </p>
              </div>
              <RichTextContent
                html={h.content}
                className="text-base text-parish-800/90"
              />
            </div>
          </RevealItem>
        ))}
      </div>
    </PageSection>
  );
}
