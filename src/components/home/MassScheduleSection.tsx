import { Clock, MapPin, Radio } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { MassSchedule } from "@/types/database";

function ScheduleRow({ s }: { s: MassSchedule }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-t border-parish-100 py-3 first:border-0 first:pt-0">
      <div className="flex items-center gap-2">
        <Clock size={16} className="shrink-0 text-parish-500" />
        <span className="font-display text-lg text-parish-900">{s.time}</span>
        <span className="text-sm text-parish-700/70">{s.day_label}</span>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-sm text-parish-700/70">{s.category}</span>
        {s.stream_url && (
          <a
            href={s.stream_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-parish-600 hover:text-parish-700"
          >
            <Radio size={14} />
            Siaran Langsung
          </a>
        )}
      </div>
    </div>
  );
}

function ChapelCard({ chapel, schedules }: { chapel: string; schedules: MassSchedule[] }) {
  return (
    <Card className="p-5">
      <p className="flex items-center gap-1.5 font-display text-lg text-parish-900">
        <MapPin size={16} className="text-parish-500" />
        {chapel}
      </p>
      <div className="mt-2">
        {schedules.map((s) => (
          <ScheduleRow key={s.id} s={s} />
        ))}
      </div>
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
          <ChapelCard
            key={chapel}
            chapel={chapel}
            schedules={schedules.filter((s) => s.chapel === chapel)}
          />
        ))}
      </div>
    </section>
  );
}
