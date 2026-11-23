import { Star } from "lucide-react";
import { TESTIMONIALS, REVIEWS, type Testimonial } from "@/lib/content/home";

const AVATAR_COLORS = [
  "#4E7AC7",
  "#D96570",
  "#4DA167",
  "#C58B2E",
  "#8E67B0",
  "#3E9DA6",
];

const FEATURED_NAMES = [
  "Nura Sadeghian",
  "Jennifer Laluangphet",
  "Coltyn Simmons",
  "Marcus T.",
  "Jessica Dominguez",
  "jobu",
];

function GoogleLogo({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1Z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84Z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.06l3.66 2.84C6.71 7.3 9.14 5.38 12 5.38Z"
      />
    </svg>
  );
}

/**
 * Real Google-review testimonials (lib/content/home.ts) styled to look like
 * actual Google review cards, auto-scrolling in an infinite marquee (pauses
 * on hover/focus; frozen under reduced-motion - see `.marquee-track` in
 * app/globals.css). Defaults to a sitewide featured mix; pass `treatment` to
 * show only reviews tagged for that service (e.g. "Emsella"). Uses
 * `.lp-reveal` instead of framer-motion `whileInView` (see app/globals.css)
 * since the latter gets stuck at opacity:0 in this stack.
 */
export default function GoogleReviewsSection({
  limit = 5,
  bgClassName = "bg-white",
  treatment,
  reviews: liveReviews,
  meta,
}: {
  limit?: number;
  bgClassName?: string;
  /** When set, only shows reviews tagged with this exact `treatment` instead of the sitewide featured mix. */
  treatment?: string;
  /** Live Google reviews to show instead of the curated TESTIMONIALS set. */
  reviews?: { name: string; quote: string; treatment?: string }[];
  /** Live rating/count/url to show instead of the static REVIEWS constant. */
  meta?: { rating: number; reviewCount: number; reviewsUrl: string };
}) {
  const rating = meta?.rating ?? REVIEWS.rating;
  const reviewCount = meta?.reviewCount ?? REVIEWS.count;
  const reviewsUrl = meta?.reviewsUrl ?? REVIEWS.url;

  const reviews = liveReviews
    ? liveReviews.slice(0, limit)
    : treatment
      ? TESTIMONIALS.filter((t) => t.treatment === treatment).slice(0, limit)
      : FEATURED_NAMES.map((n) => TESTIMONIALS.find((t) => t.name === n))
          .filter((t): t is Testimonial => Boolean(t))
          .slice(0, limit);

  return (
    <section className={`${bgClassName} py-16 lg:py-24`}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span
            className="lp-reveal inline-flex items-center gap-2 rounded-full border border-revival-gold/25 bg-revival-warm-white px-4 py-1.5 text-tagline text-xs text-revival-gold"
            style={{ "--reveal-delay": "0ms" } as React.CSSProperties}
          >
            <GoogleLogo className="h-4 w-4" />
            {REVIEWS.badge} &middot; {rating.toFixed(1)}&#9733;
          </span>
          <h2
            className="lp-reveal mt-4 font-heading text-3xl leading-tight text-revival-dark sm:text-4xl"
            style={{ "--reveal-delay": "100ms" } as React.CSSProperties}
          >
            Rated {rating.toFixed(1)} on Google by {reviewCount}+ Las
            Vegas patients.
          </h2>
          <p
            className="lp-reveal mt-5 text-base font-light leading-relaxed text-revival-charcoal/80"
            style={{ "--reveal-delay": "200ms" } as React.CSSProperties}
          >
            Real, verified Google reviews from Revival Health &amp; Wellness
            patients.
          </p>
        </div>

        <div
          className="lp-reveal relative mt-10 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]"
          style={{ "--reveal-delay": "250ms" } as React.CSSProperties}
        >
          <div
            className="marquee-track flex w-max gap-5"
            style={{ "--marquee-duration": `${reviews.length * 7}s` } as React.CSSProperties}
          >
            {[...reviews, ...reviews].map((t, i) => {
              const initials = t.name
                .split(" ")
                .map((p) => p[0])
                .join("")
                .slice(0, 2)
                .toUpperCase();
              const color = AVATAR_COLORS[i % AVATAR_COLORS.length];
              return (
                <div
                  key={`${t.name}-${i}`}
                  aria-hidden={i >= reviews.length}
                  className="flex h-full w-[320px] shrink-0 flex-col rounded-2xl border border-revival-charcoal/10 bg-white p-6 shadow-sm sm:w-[360px]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span
                        aria-hidden
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white"
                        style={{ background: color }}
                      >
                        {initials}
                      </span>
                      <div>
                        <p className="text-sm font-medium text-revival-dark">
                          {t.name}
                        </p>
                        {t.treatment && (
                          <p className="text-xs font-light text-revival-charcoal/50">
                            {t.treatment}
                          </p>
                        )}
                      </div>
                    </div>
                    <GoogleLogo className="h-5 w-5 shrink-0" />
                  </div>
                  <div className="mt-3 flex gap-0.5" aria-hidden>
                    {Array.from({ length: 5 }).map((_, si) => (
                      <Star
                        key={si}
                        className="h-4 w-4 fill-[#FBBC04] text-[#FBBC04]"
                      />
                    ))}
                  </div>
                  <p className="mt-3 flex-1 text-sm font-light leading-relaxed text-revival-charcoal/80">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div
          className="lp-reveal mt-10 flex justify-center"
          style={{ "--reveal-delay": "250ms" } as React.CSSProperties}
        >
          <a
            href={reviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-revival-gold/30 bg-revival-warm-white px-6 py-3 text-sm font-medium text-revival-dark shadow-sm transition-transform duration-300 hover:scale-105"
          >
            <GoogleLogo className="h-4 w-4" />
            Read all {reviewCount}+ Google reviews
          </a>
        </div>
      </div>
    </section>
  );
}
