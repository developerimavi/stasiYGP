import { Heart, Gift, Calendar, BookOpen } from "lucide-react";
import { PageSection, RevealItem } from "@/components/ui/PageSection";
import { RichTextContent } from "@/components/ui/RichTextContent";
import { getSocialMinistries } from "@/lib/queries";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Karya Sosial — Paroki Yohanes Gabriel Perboyre",
};

export const revalidate = 300;

const ICONS: Record<string, typeof Heart> = { Heart, Gift, Calendar, BookOpen };

export default async function KaryaSosialPage() {
  const ministries = await getSocialMinistries();

  return (
    <PageSection
      eyebrow="Pelayanan Kasih"
      title="Karya Sosial"
      description="Wujud kepedulian dan pelayanan kasih Paroki Yohanes Gabriel Perboyre kepada sesama."
    >
      <div className="grid items-start gap-x-14 gap-y-12 lg:grid-cols-2">
        {ministries.map((m, i) => {
          const Icon = ICONS[m.icon ?? "Heart"] ?? Heart;
          return (
            <RevealItem key={m.id} i={i + 1}>
              <div className="border-b border-parish-200/60 pb-5">
                <span className="flex h-10 w-10 items-center justify-center bg-parish-50 text-parish-600">
                  <Icon size={20} />
                </span>
                <h3 className="mt-4 font-display text-2xl text-parish-900">{m.name}</h3>
              </div>
              {m.description && (
                <RichTextContent
                  html={m.description}
                  className="mt-5 text-sm leading-[1.8] text-parish-800/90"
                />
              )}
              {m.activities && (
                <RichTextContent
                  html={m.activities}
                  className="mt-4 text-sm leading-[1.8] text-parish-700/70"
                />
              )}
            </RevealItem>
          );
        })}
      </div>
    </PageSection>
  );
}
