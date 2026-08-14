import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

// Squared, letter-spaced buttons to match the home page redesign.
const variantClasses: Record<Variant, string> = {
  primary: "bg-parish-600 text-white hover:bg-parish-700",
  secondary: "bg-gold-600 text-white hover:bg-gold-500",
  outline:
    "border border-parish-600/40 text-parish-800 hover:bg-parish-600 hover:text-white",
  ghost: "text-parish-700 hover:bg-parish-50",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-4 py-2 text-[10px] uppercase tracking-[.2em]",
  md: "px-6 py-3 text-[11px] uppercase tracking-[.2em]",
  lg: "px-8 py-4 text-xs uppercase tracking-[.2em]",
};

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
}

export function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  className,
  onClick,
  type = "button",
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 font-medium transition-colors duration-300",
    variantClasses[variant],
    sizeClasses[size],
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
