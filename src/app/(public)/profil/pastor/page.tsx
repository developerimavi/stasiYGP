import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RichTextContent } from "@/components/ui/RichTextContent";
import { getPastors } from "@/lib/queries";
import type { Metadata } from "next";
import type { Pastor } from "@/types/database";

export const metadata: Metadata = {
  title: "Para Pastor — Paroki Yohanes Gabriel Perboyre",
};

export const revalidate = 300;

function PastorCard({ pastor }: { pastor: Pastor }) {
  const initials = pastor.name
    .replace(/^RD\.\s*/i, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <Card className="p-5">
      <div className="flex gap-4">
        {pastor.photo_url ? (
          <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl border border-parish-100">
            <Image
              src={pastor.photo_url}
              alt={pastor.name}
              fill
              className="object-cover"
              sizes="96px"
            />
          </div>
        ) : (
          <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-xl bg-parish-50 font-display text-2xl text-parish-500">
            {initials}
          </div>
        )}

        <div className="min-w-0 flex-1">
          <h3 className="font-display text-lg text-parish-900">{pastor.name}</h3>
          <p className="text-sm text-parish-700/70">
            {pastor.priest_type}
            {pastor.serve_from &&
              ` · ${pastor.serve_from}${pastor.serve_to ? `–${pastor.serve_to}` : '–sekarang'}`}
          </p>
        </div>
      </div>
      {pastor.biography && (
        <RichTextContent
          html={pastor.biography}
          className="mt-3 text-sm text-parish-800/90"
        />
      )}
    </Card>
  );
}

export default async function PastorPage() {
  const pastors = await getPastors();
  const active = pastors.filter((p) => p.pastor_type === "Gembala Kami");
  const past = pastors.filter((p) => p.pastor_type === "Pernah Berkarya");

  return (
    <Container className="py-16">
      <SectionHeading
        eyebrow="Gembala Umat"
        title="Para Pastor"
        description="Para pastor yang melayani dan pernah berkarya di Paroki Yohanes Gabriel Perboyre."
      />

      <div className="mt-10 space-y-12">
        <div>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gold-600">
            Gembala Kami Saat Ini
          </h2>
          <div className="grid gap-4">
            {active.map((p) => (
              <PastorCard key={p.id} pastor={p} />
            ))}
          </div>
        </div>

        {past.length > 0 && (
          <div>
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gold-600">
              Pernah Berkarya
            </h2>
            <div className="grid gap-4">
              {past.map((p) => (
                <PastorCard key={p.id} pastor={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </Container>
  );
}
