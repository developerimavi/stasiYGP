import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", className)}>
      {eyebrow && (
        <div className="mb-5 flex items-center gap-4">
          <span className="h-px w-[52px] bg-gold-600" />
          <span className="text-[10px] uppercase tracking-[.34em] text-parish-700/60">
            {eyebrow}
          </span>
        </div>
      )}
      <h2 className="max-w-[16ch] font-display text-[clamp(28px,4vw,52px)] leading-[1.05] tracking-[-.015em] text-parish-900">
        {title}
      </h2>
      {description && (
        <p className="mt-4 max-w-[46ch] text-sm leading-[1.8] text-parish-700/70">
          {description}
        </p>
      )}
    </div>
  );
}
