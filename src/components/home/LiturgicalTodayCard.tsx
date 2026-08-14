import Link from "next/link";
import { formatDate } from "@/lib/format";
import { LITURGICAL_COLOR_STYLES } from "@/lib/liturgical-color";
import type { EffectiveLiturgicalDay } from "@/lib/liturgical-effective";

export function LiturgicalTodayCard({ day }: { day: EffectiveLiturgicalDay | null }) {
  if (!day) return null;
  const color = LITURGICAL_COLOR_STYLES[day.liturgical_color];
  const r = day.readings;
  const readings = [
    ["Bacaan I", r.first_reading],
    ["Mazmur", r.psalm],
    ["Bacaan II", r.second_reading],
    ["Injil", r.gospel],
    ["BcO", r.office_reading],
  ].filter(([, v]) => v) as [string, string][];

  return (
    <section className="bg-ink px-6 py-24 font-sans-alt sm:px-10 lg:px-14 lg:py-32">
      <div className="mx-auto max-w-[1240px]">
        <div className="reveal flex items-center gap-4" data-reveal-i={0}>
          <span className="h-px w-[52px] bg-accent" />
          <span className="text-[10px] uppercase tracking-[.34em] text-paper/55">
            Kalender Liturgi Hari Ini
          </span>
        </div>

        <p className="reveal mt-8 text-sm text-paper/45" data-reveal-i={1}>
          {formatDate(day.calendar_date)}
        </p>

        <h2
          className="reveal m-0 mt-3 max-w-[20ch] font-display-alt text-[clamp(30px,4vw,58px)] font-light leading-[1.05] tracking-[-.015em] text-paper"
          data-reveal-i={2}
        >
          {day.celebration_name}
        </h2>

        <p
          className="reveal mt-5 flex items-center gap-2.5 text-sm text-paper/55"
          data-reveal-i={3}
        >
          <span className={`inline-block h-2.5 w-2.5 rounded-full ${color.dot}`} />
          Warna Liturgi: {color.label}
          {day.rank && ` · ${day.rank}`}
        </p>

        {readings.length > 0 && (
          <dl
            className="reveal mt-10 grid gap-x-14 gap-y-3 border-t border-paper/10 pt-8 sm:grid-cols-2"
            data-reveal-i={4}
          >
            {readings.map(([label, value]) => (
              <div key={label} className="flex gap-3 text-sm">
                <dt className="min-w-[72px] text-paper/40">{label}</dt>
                <dd className="m-0 text-paper/75">{value}</dd>
              </div>
            ))}
          </dl>
        )}

        <div className="reveal mt-10" data-reveal-i={5}>
          <Link
            href="/kalender-liturgi"
            className="inline-flex items-center border border-accent/50 px-6 py-3 text-[11px] uppercase tracking-[.2em] text-paper transition-colors duration-300 hover:bg-accent hover:text-ink"
          >
            Kalender Lengkap
          </Link>
        </div>
      </div>
    </section>
  );
}
