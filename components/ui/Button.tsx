import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  type?: "button" | "submit" | "reset";
  external?: boolean;
};

const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:
    "bg-revival-gold text-revival-dark hover:bg-revival-gold-light shadow-sm",
  secondary:
    "bg-revival-dark text-revival-warm-white hover:bg-revival-charcoal",
  outline:
    "border border-revival-gold text-revival-dark hover:bg-revival-gold/10",
  ghost: "text-revival-dark hover:bg-revival-gold/10",
};

const sizes: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-base",
  lg: "h-14 px-8 text-lg",
};

export default function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  className,
  type = "button",
  external = false,
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-wide transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-revival-gold focus-visible:ring-offset-2",
    variants[variant],
    sizes[size],
    className,
  );

  if (href) {
    return (
      <Link
        href={href}
        className={classes}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes}>
      {children}
    </button>
  );
}
