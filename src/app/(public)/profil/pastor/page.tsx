import Image from "next/image";
import { PageSection, RevealItem } from "@/components/ui/PageSection";
import { RichTextContent } from "@/components/ui/RichTextContent";
import { getPastors } from "@/lib/queries";
import type { Metadata } from "next";
import type { Pastor } from "@/types/database";

export const metadata: Metadata = {
  title: "Para Pastor — Paroki Yohanes Gabriel Perboyre",
};

export const revalidate = 300;

function PastorEntry({ pastor }: { pastor: Pastor }) {
  const initials = pastor.name
    .replace(/^RD\.\s*/i, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <div className="border-b border-parish-100 py-8">
      <div className="flex flex-col gap-5 sm:flex-row">
        {pastor.photo_url ? (
          <div className="relative h-32 w-32 shrink-0 overflow-hidden border border-parish-100">
            <Image
              src={pastor.photo_url}
              alt={pastor.name}
              fill
              className="object-cover"
              sizes="128px"
            />
          </div>
        ) : (
          <div className="flex h-32 w-32 shrink-0 items-center justify-center bg-parish-50 font-display text-3xl text-parish-500">
            {initials}
          </div>
        )}

        <div className="min-w-0 flex-1">
          <h3 className="font-display text-2xl leading-tight text-parish-900">
            {pastor.name}
          </h3>
          <p className="mt-1.5 text-[10px] uppercase tracking-[.2em] text-gold-600">
            {pastor.priest_type}
            {pastor.serve_from &&
              ` · ${pastor.serve_from}${pastor.serve_to ? `–${pastor.serve_to}` : "–sekarang"}`}
          </p>
          {pastor.biography && (
            <RichTextContent
              html={pastor.biography}
              className="mt-4 text-sm leading-[1.8] text-parish-800/90"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default async function PastorPage() {
  const pastors = await getPastors();
  const active = pastors.filter((p) => p.pastor_type === "Gembala Kami");
  const past = pastors.filter((p) => p.pastor_type === "Pernah Berkarya");

  return (
    <PageSection
      eyebrow="Gembala Umat"
      title="Para Pastor"
      description="Para pastor yang melayani dan pernah berkarya di Paroki Yohanes Gabriel Perboyre."
    >
      <div className="space-y-14">
        <div>
          <p className="pb-2 text-[10px] uppercase tracking-[.3em] text-gold-600">
            Gembala Kami Saat Ini
          </p>
          {active.map((p, i) => (
            <RevealItem key={p.id} i={i + 1}>
              <PastorEntry pastor={p} />
            </RevealItem>
          ))}
        </div>

        {past.length > 0 && (
          <div>
            <p className="pb-2 text-[10px] uppercase tracking-[.3em] text-gold-600">
              Pernah Berkarya
            </p>
            {past.map((p, i) => (
              <RevealItem key={p.id} i={i + 1}>
                <PastorEntry pastor={p} />
              </RevealItem>
            ))}
          </div>
        )}
      </div>
    </PageSection>
  );
}
