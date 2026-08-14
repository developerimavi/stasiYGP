import { PageSection, RevealItem } from "@/components/ui/PageSection";
import { LiturgicalDateBadge } from "@/components/liturgical/LiturgicalDateBadge";
import { formatDate, jakartaDateString } from "@/lib/format";
import { LITURGICAL_COLOR_SOFT, LITURGICAL_COLOR_STYLES } from "@/lib/liturgical-color";
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

  const readings = todayDay
    ? ([
        ["Bacaan I", todayDay.readings.first_reading],
        ["Mazmur", todayDay.readings.psalm],
        ["Bacaan II", todayDay.readings.second_reading],
        ["Injil", todayDay.readings.gospel],
        ["BcO", todayDay.readings.office_reading],
      ].filter(([, v]) => v) as [string, string][])
    : [];

  const soft = todayDay ? LITURGICAL_COLOR_SOFT[todayDay.liturgical_color] : null;

  return (
    <>
      {todayDay && soft && (
        <section
          className={`${soft.section} px-6 py-16 text-parish-900 transition-colors duration-500 sm:px-10 lg:px-14 lg:py-24`}
        >
          <div className="mx-auto max-w-[1240px]">
            <div className="reveal flex items-center gap-4" data-reveal-i={0}>
              <span className={`h-px w-[52px] ${soft.rule}`} />
              <span className={`text-[10px] uppercase tracking-[.34em] ${soft.accent}`}>
                Hari Ini
              </span>
            </div>

            <p className="reveal mt-8 text-sm text-parish-700/60" data-reveal-i={1}>
              {formatDate(todayDay.calendar_date)}
            </p>

            <h1
              className="reveal m-0 mt-3 max-w-[20ch] font-display text-[clamp(30px,4vw,58px)] leading-[1.05] tracking-[-.015em]"
              data-reveal-i={2}
            >
              {todayDay.celebration_name}
            </h1>

            <p
              className="reveal mt-5 flex items-center gap-2.5 text-sm text-parish-700/70"
              data-reveal-i={3}
            >
              <span
                className={`inline-block h-2.5 w-2.5 rounded-full ${LITURGICAL_COLOR_STYLES[todayDay.liturgical_color].dot}`}
              />
              Warna Liturgi: {LITURGICAL_COLOR_STYLES[todayDay.liturgical_color].label}
              {todayDay.rank && ` · ${todayDay.rank}`}
            </p>

            {readings.length > 0 && (
              <dl
                className="reveal mt-10 grid gap-x-14 gap-y-3 border-t border-parish-200/60 pt-8 sm:grid-cols-2"
                data-reveal-i={4}
              >
                {readings.map(([label, value]) => (
                  <div key={label} className="flex gap-3 text-sm">
                    <dt className="min-w-[72px] text-parish-700/50">{label}</dt>
                    <dd className="m-0 text-parish-800">{value}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
        </section>
      )}

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
