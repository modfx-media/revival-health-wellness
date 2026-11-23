import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type ServiceCardProps = {
  title: string;
  description: string;
  href: string;
  Icon?: LucideIcon;
  className?: string;
};

export default function ServiceCard({
  title,
  description,
  href,
  Icon,
  className,
}: ServiceCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group flex flex-col gap-4 rounded-2xl border border-revival-gold/20 bg-revival-warm-white p-6 transition-all hover:-translate-y-1 hover:border-revival-gold hover:shadow-lg",
        className,
      )}
    >
      {Icon ? (
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-revival-gold/15 text-revival-gold">
          <Icon className="h-6 w-6" />
        </span>
      ) : null}
      <h3 className="text-xl text-revival-dark">{title}</h3>
      <p className="text-sm leading-relaxed text-revival-charcoal/80">
        {description}
      </p>
      <span className="mt-auto inline-flex items-center gap-1 text-sm font-medium text-revival-gold">
        Learn more
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
