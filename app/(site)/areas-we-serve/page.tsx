import { cmsPageMetadata } from "@/lib/cms/generateMeta";
import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import { buildMetadata } from "@/lib/metadata";
import { breadcrumbSchema, jsonLd } from "@/lib/schema";
import PageHero from "@/components/ui/PageHero";
import CTABanner from "@/components/ui/CTABanner";
import {
  getLiveCities,
  getLiveServices,
  areaPath,
} from "@/lib/areas";

const TITLE = "Areas We Serve";
const PATH = "/areas-we-serve/";
const DESCRIPTION =
  "Revival Health and Wellness serves the entire Las Vegas valley from two clinic locations. Explore the cities and neighborhoods where our concierge medical team delivers hormone therapy, medical weight loss, sexual wellness, and aesthetic care.";

export async function generateMetadata() {
  const fallback = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
});
  return cmsPageMetadata(fallback);
}

export default function AreasWeServeIndexPage() {
  const cities = getLiveCities();
  const services = getLiveServices();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd([
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: TITLE, path: PATH },
            ]),
          ]),
        }}
      />

      <PageHero
        eyebrow="Local Care Across the Valley"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: TITLE },
        ]}
        title={
          <>
            Areas we{" "}
            <span className="italic text-revival-gold">serve</span>
          </>
        }
        description="Two Las Vegas clinics. One concierge standard of care. Wherever you live in the valley, Revival Health and Wellness is your local medical wellness team."
        compact
      />

      {/* City grid */}
      <section className="relative bg-revival-warm-white py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-tagline text-xs text-revival-gold">
              Choose your city
            </span>
            <h2
              className="mt-3 font-heading font-medium leading-[1.1] text-revival-dark"
              style={{ fontSize: "clamp(1.9rem, 3.2vw, 2.75rem)" }}
            >
              {cities.length} Las Vegas-area communities we serve
            </h2>
            <p className="mt-5 text-base font-light text-revival-charcoal/80 sm:text-lg">
              Click any city below to see the full list of services we deliver
              there, complete with directions from your neighborhood to the
              nearest Revival clinic.
            </p>
          </div>

          <ul className="mx-auto mt-12 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {cities.map((c) => (
              <li key={c.slug}>
                <Link
                  href={areaPath(c.slug)}
                  className="group flex h-full flex-col rounded-2xl border border-revival-gold/20 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-revival-gold/50 hover:shadow-[0_20px_50px_-20px_rgba(15,15,15,0.25)]"
                >
                  <div className="flex items-start justify-between">
                    <MapPin className="h-5 w-5 text-revival-gold" />
                    <ArrowRight className="h-4 w-4 text-revival-charcoal/40 transition-transform group-hover:translate-x-1 group-hover:text-revival-gold" />
                  </div>
                  <h3 className="mt-4 font-heading text-xl text-revival-dark">
                    {c.name}
                  </h3>
                  <p className="mt-1 text-xs font-medium uppercase tracking-[0.14em] text-revival-charcoal/50">
                    {c.county} · {c.state}
                  </p>
                  <p className="mt-3 flex-1 text-sm font-light leading-relaxed text-revival-charcoal/75">
                    {c.driveTimeFromClinic}
                  </p>
                  <p className="mt-4 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-revival-gold">
                    {services.length} services available
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Services offered across the valley */}
      <section className="relative overflow-clip bg-revival-cream py-16 lg:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="text-tagline text-xs text-revival-gold">
              Services we deliver locally
            </span>
            <h2
              className="mt-3 font-heading font-medium leading-[1.1] text-revival-dark"
              style={{ fontSize: "clamp(1.7rem, 2.8vw, 2.4rem)" }}
            >
              Every service, every neighborhood
            </h2>
          </div>
          <ul className="mt-10 grid gap-3 sm:grid-cols-2">
            {services.map((s) => (
              <li
                key={s.slug}
                className="flex items-start gap-3 rounded-xl border border-revival-gold/15 bg-white/80 px-5 py-4 shadow-sm"
              >
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-revival-gold" />
                <div>
                  <p className="font-heading text-base text-revival-dark">
                    {s.name}
                  </p>
                  <p className="mt-1 text-xs font-medium uppercase tracking-[0.14em] text-revival-charcoal/50">
                    {s.category}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Full directory of every city × service page */}
      <section className="relative bg-revival-warm-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-tagline text-xs text-revival-gold">
              Full local directory
            </span>
            <h2
              className="mt-3 font-heading font-medium leading-[1.1] text-revival-dark"
              style={{ fontSize: "clamp(1.9rem, 3.2vw, 2.75rem)" }}
            >
              All {cities.length * services.length} local service pages
            </h2>
            <p className="mt-5 text-base font-light text-revival-charcoal/80 sm:text-lg">
              Every service, mapped to every community we serve. Jump to your
              city, then choose the treatment you&rsquo;re researching.
            </p>
          </div>

          {/* City quick-jump */}
          <nav
            aria-label="Jump to city"
            className="mx-auto mt-10 flex max-w-6xl flex-wrap justify-center gap-2"
          >
            {cities.map((c) => (
              <a
                key={c.slug}
                href={`#city-${c.slug}`}
                className="rounded-full border border-revival-gold/30 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-revival-charcoal transition-colors hover:border-revival-gold hover:bg-revival-gold hover:text-white"
              >
                {c.name}
              </a>
            ))}
          </nav>

          <div className="mt-14 space-y-12">
            {cities.map((c) => (
              <div
                key={c.slug}
                id={`city-${c.slug}`}
                className="scroll-mt-28 rounded-3xl border border-revival-gold/20 bg-white p-6 shadow-sm sm:p-8"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-revival-gold/15 pb-4">
                  <div>
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-revival-gold">
                      {c.county} · {c.state}
                    </p>
                    <h3 className="mt-1 font-heading text-2xl text-revival-dark sm:text-3xl">
                      <Link
                        href={areaPath(c.slug)}
                        className="hover:text-revival-gold"
                      >
                        {c.name}
                      </Link>
                    </h3>
                  </div>
                  <Link
                    href={areaPath(c.slug)}
                    className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.14em] text-revival-gold hover:text-revival-dark"
                  >
                    View {c.name} hub
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>

                <ul className="mt-6 grid gap-x-6 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
                  {services.map((s) => (
                    <li key={s.slug}>
                      <Link
                        href={areaPath(c.slug, s.slug)}
                        className="group flex items-start gap-2 rounded-lg py-1.5 text-sm text-revival-charcoal transition-colors hover:text-revival-gold"
                      >
                        <ArrowRight className="mt-1 h-3.5 w-3.5 shrink-0 text-revival-gold/60 transition-transform group-hover:translate-x-0.5 group-hover:text-revival-gold" />
                        <span>
                          {s.name}{" "}
                          <span className="text-revival-charcoal/50">
                            in {c.name}
                          </span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <CTABanner
          title="Not sure which clinic is closest?"
          subtitle="Give us a call and our team will confirm the nearest location and answer any questions about the service you're considering."
        />
      </div>
    </>
  );
}
