import { Phone, Landmark } from "lucide-react";
import { PageSection, RevealItem } from "@/components/ui/PageSection";
import { RichTextContent } from "@/components/ui/RichTextContent";
import { getMassIntentionsInfo } from "@/lib/queries";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Intensi Misa — Paroki Yohanes Gabriel Perboyre",
};

export const revalidate = 300;

export default async function IntensiMisaPage() {
  const info = await getMassIntentionsInfo();

  if (!info) return null;

  const blocks = [
    ["Format Intensi", info.format_info],
    ["Batas Penyampaian", info.deadline_info],
    ["Persembahan", info.offering_info],
  ].filter(([, v]) => v) as [string, string][];

  return (
    <PageSection
      eyebrow="Liturgi"
      title="Intensi Misa"
      description="Informasi cara mengajukan intensi misa (syukur, arwah, atau niat khusus)."
    >
      <div className="max-w-[80ch]">
        {info.contact_wa && (
          <RevealItem i={1}>
            <div className="flex items-center gap-3 border-b border-parish-200/60 pb-6">
              <Phone size={18} className="shrink-0 text-gold-600" />
              <span className="text-sm text-parish-800">
                Hubungi <strong>{info.contact_wa}</strong> untuk menyampaikan intensi
                misa.
              </span>
            </div>
          </RevealItem>
        )}

        {blocks.map(([title, html], i) => (
          <RevealItem key={title} i={i + 2}>
            <div className="border-b border-parish-100 py-8">
              <h2 className="font-display text-2xl text-parish-900">{title}</h2>
              <RichTextContent
                html={html}
                className="mt-3 text-base text-parish-800/90"
              />
            </div>
          </RevealItem>
        ))}

        <RevealItem i={blocks.length + 2}>
          <div className="py-8">
            <h2 className="flex items-center gap-2.5 font-display text-2xl text-parish-900">
              <Landmark size={20} className="text-gold-600" />
              Rekening Persembahan
            </h2>
            <div className="mt-6 grid gap-8 sm:grid-cols-2">
              {info.church_account_number && (
                <div>
                  <p className="text-[10px] uppercase tracking-[.2em] text-gold-600">
                    Persembahan Gereja
                  </p>
                  <p className="mt-2 font-display text-lg text-parish-900">
                    {info.church_bank_name} — {info.church_account_number}
                  </p>
                  <p className="mt-0.5 text-sm text-parish-700/70">
                    a.n. {info.church_account_name}
                  </p>
                </div>
              )}
              {info.social_account_number && (
                <div>
                  <p className="text-[10px] uppercase tracking-[.2em] text-gold-600">
                    Karya Sosial
                  </p>
                  <p className="mt-2 font-display text-lg text-parish-900">
                    {info.social_bank_name} — {info.social_account_number}
                  </p>
                  <p className="mt-0.5 text-sm text-parish-700/70">
                    a.n. {info.social_account_name}
                  </p>
                </div>
              )}
            </div>
          </div>
        </RevealItem>
      </div>
    </PageSection>
  );
}
