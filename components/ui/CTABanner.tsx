import Button from "./Button";
import { cn } from "@/lib/utils";

type CTABannerProps = {
  title?: string;
  subtitle?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  className?: string;
};

export default function CTABanner({
  title = "Ready to start your revival?",
  subtitle = "Book a consultation with our medical team and build a plan made for you.",
  primaryLabel = "Book a Consultation",
  primaryHref = "/contact-us",
  secondaryLabel,
  secondaryHref,
  className,
}: CTABannerProps) {
  const showSecondary = Boolean(secondaryLabel && secondaryHref);
  return (
    <section
      className={cn(
        "rounded-3xl bg-revival-dark px-8 py-14 text-center text-revival-warm-white md:px-16",
        className,
      )}
    >
      <h2 className="mx-auto max-w-2xl text-3xl md:text-4xl">{title}</h2>
      <p className="mx-auto mt-4 max-w-xl text-revival-warm-white/80">
        {subtitle}
      </p>
      <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <Button href={primaryHref} variant="primary" size="lg">
          {primaryLabel}
        </Button>
        {showSecondary && (
          <Button
            href={secondaryHref!}
            variant="outline"
            size="lg"
            className="border-revival-gold-light text-revival-warm-white hover:bg-revival-warm-white/10"
          >
            {secondaryLabel}
          </Button>
        )}
      </div>
    </section>
  );
}
