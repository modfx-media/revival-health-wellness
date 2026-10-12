import { MapPin, Navigation } from "lucide-react";
import { CLINICS } from "@/lib/content/clinics";

/** Client-provided display addresses for the ONDA Pro landing page. */
const DISPLAY = [
  {
    label: "Southwest",
    address: "7220 S. Cimarron Rd., Suite 140, Las Vegas, NV 89113",
    match: "Southwest",
  },
  {
    label: "Northwest",
    address: "2585 Box Canyon Dr., Suite 150, Las Vegas, NV 89128",
    match: "Northwest",
  },
] as const;

export default function OndaProLocations() {
  const locations = DISPLAY.map((d) => {
    const clinic = CLINICS.find((c) => c.name.includes(d.match));
    return {
      ...d,
      mapHref: clinic?.mapHref ?? "#",
      phone: clinic?.phones[0],
    };
  });

  return (
    <section className="relative overflow-hidden bg-revival-warm-white py-14 sm:py-20 lg:py-28">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-6 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-gradient-to-r from-transparent via-revival-gold to-revival-gold/60" />
            <span className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-revival-gold">
              Locations
            </span>
            <span className="h-px w-8 bg-gradient-to-l from-transparent via-revival-gold to-revival-gold/60" />
          </div>
          <h2 className="font-heading text-3xl leading-[1.1] tracking-[-0.015em] text-revival-dark sm:text-4xl lg:text-[2.75rem]">
            Visit us in Las Vegas
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base font-light leading-relaxed text-revival-charcoal/80 sm:text-lg">
            Two Revival Health &amp; Wellness locations ready to talk with you
            about ONDA Pro.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-2">
          {locations.map((loc) => (
            <article
              key={loc.label}
              className="relative overflow-hidden rounded-[1.75rem] border border-revival-gold/20 bg-white p-6 shadow-sm sm:p-8"
            >
              <p className="text-tagline text-[0.65rem] text-revival-gold">
                {loc.label}
              </p>
              <h3 className="mt-2 font-heading text-xl text-revival-dark sm:text-2xl">
                Revival Health &amp; Wellness
              </h3>
              <a
                href={loc.mapHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-start gap-2 text-sm font-light leading-relaxed text-revival-charcoal/80 transition-colors hover:text-revival-gold"
              >
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-revival-gold" />
                {loc.address}
              </a>
              <div className="mt-6">
                <a
                  href={loc.mapHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-revival-gold/35 bg-revival-cream/60 px-5 py-2.5 text-sm font-medium text-revival-dark transition-colors hover:border-revival-gold hover:bg-revival-gold/10"
                >
                  <Navigation className="h-4 w-4 text-revival-gold" />
                  Open in Maps
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
