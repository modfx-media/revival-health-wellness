import { ExternalLink, Play } from "lucide-react";

const REELS = [
  {
    href: "https://www.facebook.com/share/r/1fNfU8iunC/",
    title: "ONDA Pro reel 1",
    label: "Watch on Facebook",
  },
  {
    href: "https://www.facebook.com/share/r/1DWTDWH14D/",
    title: "ONDA Pro reel 2",
    label: "Watch on Facebook",
  },
  {
    href: "https://www.facebook.com/share/r/1DZwwtHr3C/",
    title: "ONDA Pro reel 3",
    label: "Watch on Facebook",
  },
  {
    href: "https://www.facebook.com/share/r/1DJe46k4i5/",
    title: "ONDA Pro reel 4",
    label: "Watch on Facebook",
  },
  {
    href: "https://www.facebook.com/share/r/1HdgQLt8S7/",
    title: "ONDA Pro reel 5",
    label: "Watch on Facebook",
  },
] as const;

/**
 * Facebook share/r reel short-links do not embed reliably via the public
 * video plugin (no stable video ID without Graph API). Styled link cards
 * keep the page functional and on-brand.
 */
export default function FacebookReels() {
  return (
    <section className="relative overflow-hidden bg-revival-cream py-14 sm:py-20 lg:py-28">
      <span
        aria-hidden
        className="pointer-events-none absolute -left-32 top-16 h-96 w-96 rounded-full bg-revival-gold/10 blur-[140px]"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -right-32 bottom-16 h-96 w-96 rounded-full bg-revival-gold/10 blur-[140px]"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-6 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-gradient-to-r from-transparent via-revival-gold to-revival-gold/60" />
            <span className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-revival-gold">
              From our Facebook
            </span>
            <span className="h-px w-8 bg-gradient-to-l from-transparent via-revival-gold to-revival-gold/60" />
          </div>
          <h2 className="font-heading text-3xl leading-[1.1] tracking-[-0.015em] text-revival-dark sm:text-4xl lg:text-[2.75rem]">
            See ONDA Pro on Facebook
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base font-light leading-relaxed text-revival-charcoal/80 sm:text-lg">
            Short reels from Revival Health &amp; Wellness introducing ONDA Pro
            body contouring in Las Vegas.
          </p>
        </div>

        <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {REELS.map((reel, index) => (
            <li key={reel.href}>
              <a
                href={reel.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-revival-gold/20 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-revival-gold/45 hover:shadow-[0_24px_60px_-28px_rgba(15,15,15,0.35)]"
              >
                <div className="relative aspect-[9/16] max-h-[280px] overflow-hidden bg-revival-dark">
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(201,169,110,0.28),transparent_60%)]"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-revival-dark via-revival-dark/40 to-transparent"
                  />
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-revival-gold to-revival-gold-light text-revival-dark shadow-[0_16px_40px_-12px_rgba(201,169,110,0.7)] transition-transform duration-300 group-hover:scale-110">
                      <Play className="relative ml-0.5 h-6 w-6 fill-current" strokeWidth={0} />
                    </span>
                  </span>
                  <span className="absolute bottom-3 left-3 right-3 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-revival-gold">
                    Reel {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="flex flex-1 items-center justify-between gap-3 px-4 py-4">
                  <div>
                    <p className="font-heading text-base text-revival-dark">
                      {reel.title}
                    </p>
                    <p className="mt-1 text-xs font-light text-revival-charcoal/65">
                      {reel.label}
                    </p>
                  </div>
                  <ExternalLink className="h-4 w-4 shrink-0 text-revival-gold transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
