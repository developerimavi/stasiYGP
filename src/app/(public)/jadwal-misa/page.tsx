import { Radio } from "lucide-react";
import { PageSection, RevealItem } from "@/components/ui/PageSection";
import { LiturgicalWeekList } from "@/components/liturgical/LiturgicalWeekList";
import { getAllMassSchedules } from "@/lib/queries";
import { getEffectiveRange } from "@/lib/liturgical-effective";
import { jakartaDateString } from "@/lib/format";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jadwal Misa — Paroki Yohanes Gabriel Perboyre",
};

export const revalidate = 300;

function groupByChapel(schedules: Awaited<ReturnType<typeof getAllMassSchedules>>) {
  const groups = new Map<string, typeof schedules>();
  for (const s of schedules) {
    const list = groups.get(s.chapel) ?? [];
    list.push(s);
    groups.set(s.chapel, list);
  }
  return [...groups.entries()];
}

export default async function JadwalMisaPage() {
  const from = jakartaDateString();
  const to = jakartaDateString(7);

  const [schedules, liturgicalDays] = await Promise.all([
    getAllMassSchedules(),
    getEffectiveRange(from, to),
  ]);

  const grouped = groupByChapel(schedules);

  return (
    <PageSection
      eyebrow="Peribadatan"
      title="Jadwal Misa"
      description="Jadwal perayaan Ekaristi mingguan di Paroki Yohanes Gabriel Perboyre. Silakan datang tepat waktu dan berpakaian sopan."
    >
      <div className="grid items-start gap-x-16 gap-y-12 lg:grid-cols-3">
        <div className="space-y-12 lg:col-span-2">
          {grouped.map(([chapel, items], gi) => (
            <RevealItem key={chapel} i={gi + 1}>
              <p className="pb-2 text-[10px] uppercase tracking-[.3em] text-gold-600">
                {chapel}
              </p>
              <div>
                {items.map((s, i) => (
                  <div
                    key={s.id}
                    className="grid grid-cols-[32px_1fr] items-baseline gap-x-4 gap-y-1 border-b border-parish-100 py-5 transition-[background-color,padding-left] duration-300 hover:bg-parish-50 hover:pl-4 sm:grid-cols-[32px_minmax(0,1.4fr)_minmax(0,1fr)_32px] sm:items-center"
                  >
                    <span className="text-[11px] tracking-[.16em] text-parish-700/35">
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    <span className="font-display text-[19px] leading-snug text-parish-900 sm:whitespace-nowrap sm:text-[22px]">
                      {s.day_label} <span className="text-gold-600">{s.time}</span>
                    </span>

                    <span className="col-start-2 text-sm text-parish-700/70 sm:col-start-3">
                      {s.category}
                      {s.stream_url && (
                        <a
                          href={s.stream_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-3 inline-flex items-center gap-1.5 text-parish-600 hover:underline"
                        >
                          <Radio size={13} />
                          Live
                        </a>
                      )}
                    </span>

                    <span className="hidden text-right text-gold-600 sm:block">→</span>
                  </div>
                ))}
              </div>
            </RevealItem>
          ))}
        </div>

        <RevealItem i={grouped.length + 1}>
          <p className="pb-4 text-[10px] uppercase tracking-[.3em] text-gold-600">
            Kalender Liturgi 7 Hari Ke Depan
          </p>
          <LiturgicalWeekList days={liturgicalDays} />
        </RevealItem>
      </div>
    </PageSection>
  );
}
