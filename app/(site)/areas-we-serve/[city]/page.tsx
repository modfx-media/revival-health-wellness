import type { Metadata } from "next";
import { cmsPageMetadata } from "@/lib/cms/generateMeta";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { MapPin, ArrowRight, Clock, Phone } from "lucide-react";
import { buildMetadata } from "@/lib/metadata";
import { breadcrumbSchema, jsonLd } from "@/lib/schema";
import PageHero from "@/components/ui/PageHero";
import CTABanner from "@/components/ui/CTABanner";
import {
  getCity,
  getLiveCities,
  getLiveServices,
  getNearbyLiveCities,
  areaPath,
} from "@/lib/areas";
import { CLINICS, telHref } from "@/lib/content/clinics";

// ─── Static params for pre-rendering ─────────────────────────────────────

export async function generateStaticParams() {
  return getLiveCities().map((c) => ({ city: c.slug }));
}

// ─── Metadata ────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city: citySlug } = await params;
  const city = getCity(citySlug);
  if (!city || !city.live) {
    return { title: "Not Found" };
  }
  const title = `${city.name}, NV Medical Wellness Clinic Serving Local Residents`;
  const description = `Concierge medical wellness in ${city.name}, NV. Revival Health and Wellness delivers hormone therapy, medical weight loss, sexual wellness, and aesthetic care to ${city.name} and surrounding ${city.county} communities.`;
  return cmsPageMetadata(
    buildMetadata({
      title,
      description,
      path: areaPath(city.slug),
    }),
  );
}

// ─── Page ────────────────────────────────────────────────────────────────

export default async function CityHubPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city: citySlug } = await params;
  const city = getCity(citySlug);
  if (!city || !city.live) notFound();

  const services = getLiveServices();
  const nearbyCities = getNearbyLiveCities(city);
  const clinic = CLINICS.find((c) => c.name === city.nearestClinic);
  const path = areaPath(city.slug);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd([
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Areas We Serve", path: "/areas-we-serve/" },
              { name: city.name, path },
            ]),
            {
              "@context": "https://schema.org",
              "@type": "MedicalBusiness",
              name: `Revival Health and Wellness - ${city.name}`,
              areaServed: {
                "@type": "City",
                name: city.name,
                containedInPlace: {
                  "@type": "AdministrativeArea",
                  name: city.county,
                },
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: city.lat,
                longitude: city.lng,
              },
              url: `https://revivalhealthandwellnessgroup.com${path}`,
            },
          ]),
        }}
      />

      <PageHero
        eyebrow={`${city.county} · Nevada`}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Areas We Serve", href: "/areas-we-serve/" },
          { label: city.name },
        ]}
        title={
          <>
            Medical wellness in{" "}
            <span className="italic text-revival-gold">{city.name}</span>
          </>
        }
        description={`Revival Health and Wellness serves ${city.name}, NV from our ${city.nearestClinic} clinic — ${city.driveTimeFromClinic}. Explore the concierge medical services we deliver locally.`}
        compact
      />

      {/* City intro + clinic info */}
      <section className="relative bg-revival-warm-white py-16 lg:py-24">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.4fr_1fr] lg:gap-16 lg:px-8">
          <div>
            <span className="text-tagline text-xs text-revival-gold">
              About the area
            </span>
            <h2
              className="mt-3 font-heading font-medium leading-[1.1] text-revival-dark"
              style={{ fontSize: "clamp(1.7rem, 2.8vw, 2.4rem)" }}
            >
              Concierge care for {city.name} residents
            </h2>
            {city.intro ? (
              <p className="mt-6 text-base font-light leading-relaxed text-revival-charcoal/85 sm:text-lg">
                {city.intro}
              </p>
            ) : null}
            {city.nearbyLandmarks.length > 0 && (
              <div className="mt-8">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-revival-gold">
                  Neighborhoods & landmarks nearby
                </p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {city.nearbyLandmarks.map((l) => (
                    <li
                      key={l}
                      className="rounded-full border border-revival-gold/25 bg-revival-cream px-3.5 py-1.5 text-sm text-revival-charcoal/85"
                    >
                      {l}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {clinic ? (
            <aside className="relative overflow-hidden rounded-[1.75rem] border border-revival-gold/20 bg-white p-6 shadow-sm sm:p-8">
              <p className="text-tagline text-[0.65rem] text-revival-gold">
                Your Nearest Clinic
              </p>
              <h3 className="mt-2 font-heading text-xl text-revival-dark sm:text-2xl">
                {clinic.name}
              </h3>
              <p className="mt-3 flex items-start gap-2 text-sm font-light text-revival-charcoal/80">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-revival-gold" />
                {clinic.address}
              </p>
              <p className="mt-2 flex items-start gap-2 text-sm font-light text-revival-charcoal/80">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-revival-gold" />
                {city.driveTimeFromClinic}
              </p>
              <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5">
                {clinic.phones.map((p) => (
                  <a
                    key={p}
                    href={telHref(p)}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-revival-charcoal transition-colors hover:text-revival-gold"
                  >
                    <Phone className="h-4 w-4 shrink-0 text-revival-gold" />
                    {p}
                  </a>
                ))}
              </div>
              <a
                href={clinic.mapHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-revival-dark px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-revival-warm-white transition-colors hover:bg-revival-charcoal"
              >
                Get Directions
                <ArrowRight className="h-3.5 w-3.5 text-revival-gold" />
              </a>
            </aside>
          ) : null}
        </div>
      </section>

      {/* Services in this city */}
      <section className="relative bg-revival-cream py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-tagline text-xs text-revival-gold">
              Services in {city.name}
            </span>
            <h2
              className="mt-3 font-heading font-medium leading-[1.1] text-revival-dark"
              style={{ fontSize: "clamp(1.9rem, 3.2vw, 2.75rem)" }}
            >
              What we treat for {city.name} patients
            </h2>
          </div>
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <li key={s.slug}>
                <Link
                  href={areaPath(city.slug, s.slug)}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-revival-gold/20 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-revival-gold/50 hover:shadow-[0_20px_50px_-20px_rgba(15,15,15,0.25)]"
                >
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={s.heroImage}
                      alt={`${s.name} for ${city.name}, NV residents`}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-revival-gold">
                      {s.category}
                    </p>
                    <h3 className="mt-2 font-heading text-lg text-revival-dark">
                      {s.name} in {city.name}
                    </h3>
                    <p className="mt-3 flex-1 text-sm font-light leading-relaxed text-revival-charcoal/75">
                      {s.shortDescription}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-1 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-revival-gold">
                      Learn more
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Nearby cities */}
      {nearbyCities.length > 0 && (
        <section className="relative bg-revival-warm-white py-16 lg:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 flex items-end justify-between">
              <div>
                <span className="text-tagline text-xs text-revival-gold">
                  Nearby cities we also serve
                </span>
                <h2 className="mt-2 font-heading text-2xl text-revival-dark sm:text-3xl">
                  Other {city.county} communities
                </h2>
              </div>
              <Link
                href="/areas-we-serve/"
                className="hidden text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-revival-gold transition-colors hover:text-revival-dark sm:inline-flex sm:items-center sm:gap-1"
              >
                All areas
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {nearbyCities.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={areaPath(c.slug)}
                    className="group flex items-center justify-between rounded-xl border border-revival-gold/15 bg-white px-4 py-3 text-sm font-medium text-revival-dark transition-colors hover:border-revival-gold/50 hover:text-revival-gold"
                  >
                    <span>{c.name}</span>
                    <ArrowRight className="h-4 w-4 text-revival-gold transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <CTABanner
          title={`Ready to book in ${city.name}?`}
          subtitle={`Same-week consultations available. Our team will get you scheduled at the ${clinic?.name ?? "nearest"} clinic - and answer any questions about the service you're considering.`}
        />
      </div>
    </>
  );
}
