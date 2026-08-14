import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * Full-bleed page section matching the home page: alternating cream
 * backgrounds, a ruled heading, and scroll-reveal on its contents.
 *
 * `tone` alternates so stacked sections read as distinct bands, the way the
 * home page does.
 */
export function PageSection({
  eyebrow,
  title,
  description,
  tone = "light",
  children,
  className,
}: {
  eyebrow?: string;
  title?: string;
  description?: string;
  tone?: "light" | "muted";
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "px-6 py-16 text-parish-900 sm:px-10 lg:px-14 lg:py-24",
        tone === "muted" ? "bg-cream-100" : "bg-cream-50",
        className
      )}
    >
      <div className="mx-auto max-w-[1240px]">
        {title && (
          <div
            className="reveal border-b border-parish-200/60 pb-10"
            data-reveal-i={0}
          >
            <SectionHeading
              eyebrow={eyebrow}
              title={title}
              description={description}
            />
          </div>
        )}
        <div className={title ? "mt-12" : undefined}>{children}</div>
      </div>
    </section>
  );
}

/** Wraps a grid item so it reveals in sequence as it scrolls into view. */
export function RevealItem({
  i,
  className,
  children,
}: {
  i: number;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("reveal", className)} data-reveal-i={i} suppressHydrationWarning>
      {children}
    </div>
  );
}
