import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

type ReviewWidgetProps = {
  rating?: number;
  reviewCount?: number;
  source?: string;
  className?: string;
};

/** Compact star-rating summary, e.g. for Google reviews. */
export default function ReviewWidget({
  rating = 4.9,
  reviewCount = 300,
  source = "Google",
  className,
}: ReviewWidgetProps) {
  const fullStars = Math.round(rating);

  return (
    <div
      className={cn(
        "inline-flex items-center gap-3 rounded-full border border-revival-gold/20 bg-revival-warm-white px-5 py-2.5",
        className,
      )}
    >
      <div className="flex" aria-hidden>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={cn(
              "h-4 w-4",
              i < fullStars
                ? "fill-revival-gold text-revival-gold"
                : "text-revival-gold/30",
            )}
          />
        ))}
      </div>
      <span className="text-sm text-revival-charcoal">
        <strong className="text-revival-dark">{rating.toFixed(1)}</strong> from{" "}
        {reviewCount}+ {source} reviews
      </span>
    </div>
  );
}
