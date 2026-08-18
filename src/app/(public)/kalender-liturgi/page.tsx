import { PageSection, RevealItem } from "@/components/ui/PageSection";
import { LiturgicalDateBadge } from "@/components/liturgical/LiturgicalDateBadge";
import { LiturgicalTodayCard } from "@/components/home/LiturgicalTodayCard";
import { formatDate, jakartaDateString } from "@/lib/format";
import { getEffectiveToday, getEffectiveRange } from "@/lib/liturgical-effective";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kalender Liturgi — Paroki Yohanes Gabriel Perboyre",
};

export const revalidate = 21600;

export default async function KalenderLiturgiPage() {
  const from = jakartaDateString();
  const to = jakartaDateString(14);

  const [todayDay, upcoming] = await Promise.all([
    getEffectiveToday(),
    getEffectiveRange(from, to),
  ]);

  const rest = upcoming.filter((d) => d.calendar_date !== from);

  return (
    <>
      {/* Same block as the home page, so today's liturgical colour reads
          identically in both places. */}
      <LiturgicalTodayCard day={todayDay} showLink={false} />


      <PageSection
        eyebrow="Liturgi"
        title="Hari-Hari Mendatang"
        description="Perayaan liturgi, warna liturgi, dan bacaan harian dua pekan ke depan."
        tone="muted"
      >
        <div>
          {rest.map((day, i) => (
            <RevealItem key={day.calendar_date} i={i + 1}>
              <div className="flex items-center gap-5 border-b border-parish-100 py-5 transition-[background-color,padding-left] duration-300 hover:bg-parish-50 hover:pl-4">
                <LiturgicalDateBadge
                  date={day.calendar_date}
                  color={day.liturgical_color}
                />
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] uppercase tracking-[.16em] text-parish-700/50">
                    {formatDate(day.calendar_date)}
                  </p>
                  <p className="mt-1 font-display text-[20px] leading-tight text-parish-900">
                    {day.celebration_name}
                  </p>
                  {day.rank && (
                    <p className="mt-0.5 text-sm text-parish-700/60">{day.rank}</p>
                  )}
                </div>
              </div>
            </RevealItem>
          ))}
        </div>

        <p className="mt-10 max-w-[70ch] text-xs leading-[1.8] text-parish-700/60">
          Referensi bacaan harian bersumber dari{" "}
          <a
            href="https://www.imankatolik.or.id"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-parish-700"
          >
            imankatolik.or.id
          </a>
          . Nama perayaan &amp; warna liturgi dihitung berdasarkan Kalender Romawi Umum.
          Untuk tanggal khusus paroki, data dapat diisi manual oleh admin.
        </p>
      </PageSection>
    </>
  );
}
