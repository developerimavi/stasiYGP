import { PageSection, RevealItem } from "@/components/ui/PageSection";
import { OrganizationTree } from "@/components/organization/OrganizationTree";
import { getOrganizationMembers } from "@/lib/queries";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Struktur Organisasi — Paroki Yohanes Gabriel Perboyre",
};

export const revalidate = 300;

export default async function OrganisasiPage() {
  const [bgks, dps] = await Promise.all([
    getOrganizationMembers("BGKS"),
    getOrganizationMembers("DPS"),
  ]);

  return (
    <PageSection
      eyebrow="Kepengurusan"
      title="Struktur Organisasi"
      description="Badan Gereja Katolik Paroki (BGKP) dan Dewan Pastoral Paroki (DPP) Yohanes Gabriel Perboyre."
    >
      <div className="grid items-start gap-x-16 gap-y-12 lg:grid-cols-2">
        <RevealItem i={1}>
          <p className="pb-3 text-[10px] uppercase tracking-[.3em] text-gold-600">
            BGKP
          </p>
          <h2 className="border-b border-parish-200/60 pb-5 font-display text-2xl text-parish-900">
            Badan Gereja Katolik Paroki
          </h2>
          <div className="mt-6">
            <OrganizationTree members={bgks} />
          </div>
        </RevealItem>

        <RevealItem i={2}>
          <p className="pb-3 text-[10px] uppercase tracking-[.3em] text-gold-600">
            DPP
          </p>
          <h2 className="border-b border-parish-200/60 pb-5 font-display text-2xl text-parish-900">
            Dewan Pastoral Paroki
          </h2>
          <div className="mt-6">
            <OrganizationTree members={dps} />
          </div>
        </RevealItem>
      </div>
    </PageSection>
  );
}
