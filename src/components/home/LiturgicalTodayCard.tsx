import Link from "next/link";
import { formatDate } from "@/lib/format";
import { LITURGICAL_COLOR_STYLES } from "@/lib/liturgical-color";
import type { EffectiveLiturgicalDay } from "@/lib/liturgical-effective";

export function LiturgicalTodayCard({
  day,
  showLink = true,
}: {
  day: EffectiveLiturgicalDay | null;
  /** Hidden on the calendar page itself, where the link would lead nowhere. */
  showLink?: boolean;
}) {
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

  // The section carries the day's liturgical colour at full strength, the same
  // as the calendar page. `solidText` already resolves to white on the dark
  // colours (red/green/purple) and to ink on the light ones (white/pink).
  const onDark = color.solidText.includes("white");
  const rule = onDark ? "bg-white/40" : "bg-black/20";
  const muted = onDark ? "opacity-75" : "opacity-70";
  const divider = onDark ? "border-white/20" : "border-black/10";

  return (
    <section
      className={`${color.solid} ${color.solidText} px-6 py-16 transition-colors duration-500 sm:px-10 lg:px-14 lg:py-24`}
    >
      <div className="mx-auto max-w-[1240px]">
        <div className="reveal flex items-center gap-4" data-reveal-i={0}>
          <span className={`h-px w-[52px] ${rule}`} />
          <span className={`text-[10px] uppercase tracking-[.34em] ${muted}`}>
            Kalender Liturgi Hari Ini
          </span>
        </div>

        <p className={`reveal mt-8 text-sm ${muted}`} data-reveal-i={1}>
          {formatDate(day.calendar_date)}
        </p>

        <h2
          className="reveal m-0 mt-3 max-w-[20ch] font-display text-[clamp(30px,4vw,58px)] leading-[1.05] tracking-[-.015em]"
          data-reveal-i={2}
        >
          {day.celebration_name}
        </h2>

        <p className={`reveal mt-5 text-sm ${muted}`} data-reveal-i={3}>
          Warna Liturgi: {color.label}
          {day.rank && ` · ${day.rank}`}
        </p>

        {readings.length > 0 && (
          <dl
            className={`reveal mt-10 grid gap-x-14 gap-y-3 border-t ${divider} pt-8 sm:grid-cols-2`}
            data-reveal-i={4}
          >
            {readings.map(([label, value]) => (
              <div key={label} className="flex gap-3 text-sm">
                <dt className={`min-w-[72px] ${muted}`}>{label}</dt>
                <dd className="m-0">{value}</dd>
              </div>
            ))}
          </dl>
        )}

        {showLink && (
          <div className="reveal mt-10" data-reveal-i={5}>
            <Link
              href="/kalender-liturgi"
              className={`inline-flex items-center border px-6 py-3 text-[11px] uppercase tracking-[.2em] transition-colors duration-300 ${
                onDark
                  ? "border-white/40 hover:bg-white hover:text-parish-900"
                  : "border-black/25 hover:bg-parish-900 hover:text-white"
              }`}
            >
              Kalender Lengkap
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
