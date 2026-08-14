import Link from "next/link";
import { Radio } from "lucide-react";
import type { MassSchedule } from "@/types/database";

function ScheduleRow({ s, i }: { s: MassSchedule; i: number }) {
  return (
    <div
      className="reveal grid grid-cols-[38px_1fr] items-baseline gap-x-5 gap-y-1 border-b border-parish-100 py-6 transition-[background-color,padding-left] duration-300 hover:bg-parish-50 hover:pl-4 sm:grid-cols-[38px_minmax(0,1.1fr)_minmax(0,1fr)_40px] sm:items-center"
      data-reveal-i={i}
    >
      <span className="text-[11px] tracking-[.16em] text-parish-700/35">
        {String(i + 1).padStart(2, "0")}
      </span>

      <span className="font-display text-[28px] leading-none text-parish-900 sm:text-[34px]">
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
            Siaran Langsung
          </a>
        )}
      </span>

      <span className="hidden text-right text-gold-600 sm:block">→</span>
    </div>
  );
}

export function MassScheduleSection({ schedules }: { schedules: MassSchedule[] }) {
  const chapels = Array.from(new Set(schedules.map((s) => s.chapel)));

  return (
    <section className="bg-cream-50 px-6 py-16 text-parish-900 sm:px-10 lg:px-14 lg:py-24">
      <div className="mx-auto max-w-[1240px]">
        <div
          className="reveal flex flex-col justify-between gap-6 border-b border-parish-200/60 pb-10 sm:flex-row sm:items-end sm:gap-14"
          data-reveal-i={0}
        >
          <div>
            <div className="mb-5 flex items-center gap-4">
              <span className="h-px w-[52px] bg-gold-600" />
              <span className="text-[10px] uppercase tracking-[.34em] text-parish-700/60">
                Peribadatan
              </span>
            </div>
            <h2 className="m-0 max-w-[16ch] font-display text-[clamp(32px,4.4vw,64px)] leading-[1.02] tracking-[-.015em]">
              Jadwal ibadah pekan ini
            </h2>
          </div>
          <p className="m-0 max-w-[32ch] text-sm leading-[1.8] text-parish-700/70">
            Datang lebih awal bila ingin berdoa dalam hening terlebih dahulu.
          </p>
        </div>

        <div className="mt-2 grid items-start gap-x-16 lg:grid-cols-2">
          {chapels.map((chapel) => (
            <div key={chapel}>
              <p className="reveal pb-1 pt-8 text-[10px] uppercase tracking-[.3em] text-gold-600">
                {chapel}
              </p>
              {schedules
                .filter((s) => s.chapel === chapel)
                .map((s, i) => (
                  <ScheduleRow key={s.id} s={s} i={i} />
                ))}
            </div>
          ))}
        </div>

        <div className="reveal mt-12">
          <Link
            href="/jadwal-misa"
            className="inline-flex items-center border border-parish-600/40 px-6 py-3 text-[11px] uppercase tracking-[.2em] text-parish-800 transition-colors duration-300 hover:bg-parish-600 hover:text-white"
          >
            Lihat Semua Jadwal
          </Link>
        </div>
      </div>
    </section>
  );
}
