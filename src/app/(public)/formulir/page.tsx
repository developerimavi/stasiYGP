import { ExternalLink } from "lucide-react";
import { PageSection, RevealItem } from "@/components/ui/PageSection";
import { RichTextContent } from "@/components/ui/RichTextContent";
import { getSacramentForms } from "@/lib/queries";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Formulir — Paroki Yohanes Gabriel Perboyre",
};

export const revalidate = 300;

export default async function FormulirPage() {
  const forms = await getSacramentForms();

  return (
    <PageSection
      eyebrow="Administrasi"
      title="Formulir"
      description="Unduh formulir untuk keperluan sakramen dan administrasi paroki."
    >
      <div>
        {forms.map((f, i) => (
          <RevealItem key={f.id} i={i + 1}>
            <a
              href={f.file_url}
              target="_blank"
              rel="noopener noreferrer"
              className="grid grid-cols-1 items-baseline gap-x-8 gap-y-2 border-b border-parish-100 py-6 transition-[background-color,padding-left] duration-300 hover:bg-parish-50 hover:pl-4 sm:grid-cols-[32px_minmax(0,1.3fr)_minmax(0,1fr)_32px] sm:items-center"
            >
              <span className="text-[11px] tracking-[.16em] text-parish-700/35">
                {String(i + 1).padStart(2, "0")}
              </span>

              <span>
                <span className="block font-display text-[20px] leading-snug text-parish-900 sm:text-[22px]">
                  {f.name}
                </span>
                <span className="mt-1 block text-[10px] uppercase tracking-[.16em] text-gold-600">
                  {f.category}
                </span>
              </span>

              <span className="text-sm text-parish-700/70">
                {f.description ? (
                  <RichTextContent html={f.description} className="line-clamp-2" />
                ) : (
                  <span className="inline-flex items-center gap-1.5">
                    Buka di Google Drive
                    <ExternalLink size={13} />
                  </span>
                )}
              </span>

              <span className="hidden text-right text-gold-600 sm:block">→</span>
            </a>
          </RevealItem>
        ))}
      </div>
    </PageSection>
  );
}
