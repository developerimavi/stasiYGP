import { Clock, MapPin, Radio } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { MassSchedule } from "@/types/database";

function ScheduleCard({ s }: { s: MassSchedule }) {
  return (
    <Card className="flex h-full flex-col p-5">
      <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-gold-600">
        <MapPin size={13} />
        {s.chapel}
      </p>
      <p className="mt-1 flex items-center gap-1.5 font-display text-2xl text-parish-900">
        <Clock size={18} className="text-parish-500" />
        {s.time}
      </p>
      <p className="mt-2 text-sm font-medium text-parish-800">{s.category}</p>
      <p className="mt-1 text-sm text-parish-700/70">{s.day_label}</p>
      {s.stream_url && (
        <a
          href={s.stream_url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-parish-600 hover:text-parish-700"
        >
          <Radio size={14} />
          Siaran Langsung
        </a>
      )}
    </Card>
  );
}

export function MassScheduleSection({ schedules }: { schedules: MassSchedule[] }) {
  const chapels = Array.from(new Set(schedules.map((s) => s.chapel)));

  return (
    <section>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeading
          eyebrow="Peribadatan"
          title="Jadwal Misa"
          description="Bergabunglah dalam perayaan Ekaristi bersama umat paroki."
        />
        <Button href="/jadwal-misa" variant="outline" size="sm">
          Lihat Semua Jadwal
        </Button>
      </div>

      <div
        className="mt-8 grid items-start gap-6"
        style={{ gridTemplateColumns: `repeat(${Math.max(chapels.length, 1)}, minmax(0, 1fr))` }}
      >
        {chapels.map((chapel) => (
          <div key={chapel} className="grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2">
            {schedules
              .filter((s) => s.chapel === chapel)
              .map((s) => (
                <ScheduleCard key={s.id} s={s} />
              ))}
          </div>
        ))}
      </div>
    </section>
  );
}
