import type { Metadata } from "next";
import { cmsPageMetadata } from "@/lib/cms/generateMeta";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  ArrowRight,
  Clock,
  Phone,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { buildMetadata, SITE } from "@/lib/metadata";
import { breadcrumbSchema, faqSchema, jsonLd } from "@/lib/schema";
import PageHero from "@/components/ui/PageHero";
import CTABanner from "@/components/ui/CTABanner";
import {
  getCity,
  getService,
  getLiveAreaPages,
  getNearbyLiveCities,
  areaPath,
} from "@/lib/areas";
import { CLINICS, telHref } from "@/lib/content/clinics";

// ─── Static params for pre-rendering ─────────────────────────────────────

export async function generateStaticParams() {
  return getLiveAreaPages().map(({ city, service }) => ({
    city: city.slug,
    service: service.slug,
  }));
}

// ─── Metadata (unique per city × service combination) ────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string; service: string }>;
}): Promise<Metadata> {
  const { city: citySlug, service: serviceSlug } = await params;
  const city = getCity(citySlug);
  const service = getService(serviceSlug);
  if (!city?.live || !service?.live) return { title: "Not Found" };

  // Vary the title pattern by service category to avoid duplicate patterns
  // across pages — every leaf has a distinct <title>.
  const titleVariants: Record<string, string> = {
    "Hormone Therapy": `Hormone Replacement Therapy in ${city.name}, NV | Bio-Identical HRT`,
    "Weight Loss": `Medical Weight Loss in ${city.name}, NV | GLP-1 & Semaglutide Programs`,
    "Sexual Wellness": `${service.name} in ${city.name}, NV | Concierge Sexual Wellness`,
    Aesthetics: `${service.name} in ${city.name}, NV | Expert Injectors`,
    "Body Contouring": `${service.name} in ${city.name}, NV | Non-Invasive Body Sculpting`,
    Wellness: `${service.name} in ${city.name}, NV | Concierge IV & Wellness`,
  };
  const title =
    titleVariants[service.category] ??
    `${service.name} in ${city.name}, NV`;

  const description = `${service.shortDescription} Serving ${city.name} and greater ${city.county} — ${city.driveTimeFromClinic}.`;

  return cmsPageMetadata(
    buildMetadata({
      title,
      description,
      path: areaPath(city.slug, service.slug),
      images: [service.heroImage],
    }),
  );
}

// ─── Page ────────────────────────────────────────────────────────────────

export default async function CityServiceLeafPage({
  params,
}: {
  params: Promise<{ city: string; service: string }>;
}) {
  const { city: citySlug, service: serviceSlug } = await params;
  const city = getCity(citySlug);
  const service = getService(serviceSlug);
  if (!city?.live || !service?.live) notFound();

  const clinic = CLINICS.find((c) => c.name === city.nearestClinic);
  const nearbyCities = getNearbyLiveCities(city);
  const path = areaPath(city.slug, service.slug);
  const canonicalUrl = new URL(path, SITE.url).toString();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd([
            // Breadcrumb: Home > Areas We Serve > [City] > [Service]
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Areas We Serve", path: "/areas-we-serve/" },
              { name: city.name, path: areaPath(city.slug) },
              { name: service.name, path },
            ]),
            // Service + MedicalBusiness combined
            {
              "@context": "https://schema.org",
              "@type": "MedicalBusiness",
              "@id": `${canonicalUrl}#business`,
              name: `Revival Health and Wellness - ${city.name}`,
              url: canonicalUrl,
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
              medicalSpecialty: service.category,
              availableService: {
                "@type": "MedicalTherapy",
                name: service.name,
                description: service.shortDescription,
              },
            },
            // FAQPage
            faqSchema(service.faqs),
          ]),
        }}
      />

      <PageHero
        eyebrow={`${service.category} · ${city.name}, NV`}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Areas We Serve", href: "/areas-we-serve/" },
          { label: city.name, href: areaPath(city.slug) },
          { label: service.name },
        ]}
        title={
          <>
            {service.name} in{" "}
            <span className="italic text-revival-gold">{city.name}</span>
          </>
        }
        description={`${service.shortDescription} Serving ${city.name} residents from our ${city.nearestClinic} clinic - ${city.driveTimeFromClinic}.`}
        gallery={[service.heroImage]}
        compact
      />

      {/* ── Section 1: Overview + why local matters ─────────────────────── */}
      <section className="relative bg-revival-warm-white py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
            <div>
              <span className="text-tagline text-xs text-revival-gold">
                {service.name} for {city.name}
              </span>
              <h2
                className="mt-3 font-heading font-medium leading-[1.1] text-revival-dark"
                style={{ fontSize: "clamp(1.9rem, 3vw, 2.6rem)" }}
              >
                Local {service.category.toLowerCase()} care, delivered the
                Revival way
              </h2>
              {service.longDescription.map((p, i) => (
                <p
                  key={i}
                  className="mt-6 text-base font-light leading-relaxed text-revival-charcoal/85 sm:text-lg"
                >
                  {p}
                </p>
              ))}
              {city.intro ? (
                <p className="mt-6 text-base font-light leading-relaxed text-revival-charcoal/85 sm:text-lg">
                  <span className="font-semibold text-revival-dark">
                    Why {city.name} residents choose Revival:{" "}
                  </span>
                  {city.intro}
                </p>
              ) : null}
            </div>

            {clinic ? (
              <aside className="relative h-fit overflow-hidden rounded-[1.75rem] border border-revival-gold/20 bg-white p-6 shadow-sm sm:p-8">
                <p className="text-tagline text-[0.65rem] text-revival-gold">
                  Nearest Clinic for {city.name}
                </p>
                <h3 className="mt-2 font-heading text-xl text-revival-dark">
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
                <Link
                  href={service.pillarHref}
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-revival-gold px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-revival-dark shadow-sm transition-transform hover:scale-[1.03]"
                >
                  Full {service.name} Details
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </aside>
            ) : null}
          </div>
        </div>
      </section>

      {/* ── Section 2: Benefits ─────────────────────────────────────────── */}
      {service.benefits.length > 0 && (
        <section className="relative bg-revival-cream py-16 lg:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-tagline text-xs text-revival-gold">
                Benefits
              </span>
              <h2
                className="mt-3 font-heading font-medium leading-[1.1] text-revival-dark"
                style={{ fontSize: "clamp(1.7rem, 2.8vw, 2.4rem)" }}
              >
                Why {city.name} patients choose {service.name}
              </h2>
            </div>
            <ul className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-2">
              {service.benefits.map((b) => (
                <li
                  key={b}
                  className="flex items-start gap-3 rounded-2xl border border-revival-gold/15 bg-white px-5 py-4 shadow-sm"
                >
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-revival-gold" />
                  <span className="text-sm leading-relaxed text-revival-charcoal/85 sm:text-base">
                    {b}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ── Section 3: Treatment process ────────────────────────────────── */}
      {service.processSteps.length > 0 && (
        <section className="relative bg-revival-warm-white py-16 lg:py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <span className="text-tagline text-xs text-revival-gold">
                What to expect
              </span>
              <h2
                className="mt-3 font-heading font-medium leading-[1.1] text-revival-dark"
                style={{ fontSize: "clamp(1.7rem, 2.8vw, 2.4rem)" }}
              >
                Your {service.name} process in {city.name}
              </h2>
            </div>
            <ol className="mt-12 space-y-6">
              {service.processSteps.map((s, i) => (
                <li
                  key={s.title}
                  className="flex gap-5 rounded-2xl border border-revival-gold/15 bg-white p-6 shadow-sm sm:p-7"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-revival-gold text-sm font-bold text-revival-dark">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-heading text-lg text-revival-dark sm:text-xl">
                      {s.title}
                    </h3>
                    <p className="mt-2 text-sm font-light leading-relaxed text-revival-charcoal/80 sm:text-base">
                      {s.text}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* ── Section 4: Serving the area ─────────────────────────────────── */}
      <section className="relative bg-revival-cream py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
            <div>
              <span className="text-tagline text-xs text-revival-gold">
                Serving {city.name} & {city.county}
              </span>
              <h2
                className="mt-3 font-heading font-medium leading-[1.1] text-revival-dark"
                style={{ fontSize: "clamp(1.7rem, 2.6vw, 2.2rem)" }}
              >
                Convenient for {city.name} - and the neighborhoods around it
              </h2>
              <p className="mt-6 text-base font-light leading-relaxed text-revival-charcoal/85 sm:text-lg">
                Our {city.nearestClinic} clinic is {city.driveTimeFromClinic}
                {", "}
                which means most {city.name} patients can be in and out of a{" "}
                {service.name.toLowerCase()} appointment during a lunch break.
                {city.nearbyLandmarks.length > 0
                  ? ` We regularly see patients from ${city.nearbyLandmarks.slice(0, 3).join(", ")}, and the surrounding neighborhoods.`
                  : ""}
              </p>
              {clinic ? (
                <div className="mt-6 rounded-xl border border-revival-gold/20 bg-white p-5">
                  <p className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-revival-gold">
                    Book at your nearest clinic
                  </p>
                  <p className="mt-2 flex items-start gap-2 text-sm font-light text-revival-charcoal/85">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-revival-gold" />
                    {clinic.address}
                  </p>
                </div>
              ) : null}
            </div>

            {city.nearbyLandmarks.length > 0 && (
              <div>
                <span className="text-tagline text-xs text-revival-gold">
                  Nearby landmarks & neighborhoods
                </span>
                <ul className="mt-4 grid gap-2">
                  {city.nearbyLandmarks.map((l) => (
                    <li
                      key={l}
                      className="flex items-start gap-2 text-sm text-revival-charcoal/85"
                    >
                      <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-revival-gold" />
                      {l}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Section 5: FAQs ─────────────────────────────────────────────── */}
      {service.faqs.length > 0 && (
        <section className="relative bg-revival-warm-white py-16 lg:py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <span className="text-tagline text-xs text-revival-gold">
                Frequently asked questions
              </span>
              <h2
                className="mt-3 font-heading font-medium leading-[1.1] text-revival-dark"
                style={{ fontSize: "clamp(1.7rem, 2.8vw, 2.4rem)" }}
              >
                {service.name} in {city.name} - FAQs
              </h2>
            </div>
            <div className="mt-12 space-y-4">
              {service.faqs.map((f) => (
                <details
                  key={f.question}
                  className="group rounded-2xl border border-revival-gold/15 bg-white px-6 py-5 shadow-sm transition-all hover:border-revival-gold/40"
                >
                  <summary className="flex cursor-pointer items-start justify-between gap-4 font-heading text-base text-revival-dark sm:text-lg">
                    <span>{f.question}</span>
                    <span
                      aria-hidden
                      className="mt-1 text-revival-gold transition-transform group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-4 text-sm font-light leading-relaxed text-revival-charcoal/80 sm:text-base">
                    {f.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Section 6: Nearby cities for internal linking ───────────────── */}
      {nearbyCities.length > 0 && (
        <section className="relative bg-revival-cream py-16 lg:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 text-center">
              <span className="text-tagline text-xs text-revival-gold">
                {service.name} in nearby cities
              </span>
              <h2
                className="mt-3 font-heading font-medium leading-[1.1] text-revival-dark"
                style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)" }}
              >
                We serve these {city.county} communities too
              </h2>
            </div>
            <ul className="mx-auto grid max-w-4xl gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {nearbyCities.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={areaPath(c.slug, service.slug)}
                    className="group flex items-center justify-between rounded-xl border border-revival-gold/20 bg-white px-4 py-3 text-sm font-medium text-revival-dark shadow-sm transition-colors hover:border-revival-gold/50 hover:text-revival-gold"
                  >
                    <span>
                      {service.name} in {c.name}
                    </span>
                    <ArrowRight className="h-4 w-4 text-revival-gold transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-8 text-center">
              <Link
                href={areaPath(city.slug)}
                className="inline-flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-revival-gold transition-colors hover:text-revival-dark"
              >
                All services in {city.name}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── Final CTA ───────────────────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <CTABanner
          title={`Book ${service.name} in ${city.name}`}
          subtitle={`Same-week appointments available. Call our ${city.nearestClinic} clinic or book online - we'll confirm you're a good candidate and walk you through every step.`}
        />
      </div>
    </>
  );
}
