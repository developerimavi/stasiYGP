import { cn } from "@/lib/utils";

export function Card({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        // Flat and squared to match the home page: depth comes from the rule,
        // not from a floating shadow.
        "border border-parish-100 bg-white transition-colors duration-300 hover:border-parish-200",
        className
      )}
    >
      {children}
    </div>
  );
}
