import type { Metadata } from "next";
import Link from "next/link";
import {
  Home,
  Sparkles,
  HeartPulse,
  Flame,
  Syringe,
  Scissors,
  MapPin,
  BookOpen,
  Phone,
  FileText,
  ArrowRight,
  ExternalLink,
  Grid,
} from "lucide-react";
import { buildMetadata } from "@/lib/metadata";
import { breadcrumbSchema, jsonLd } from "@/lib/schema";
import PageHero from "@/components/ui/PageHero";
import CTABanner from "@/components/ui/CTABanner";
import { CLINICS } from "@/lib/content/clinics";
import { getLiveCities, getLiveServices, areaPath } from "@/lib/areas";

const TITLE = "Sitemap";
const PATH = "/sitemap-page/";
const DESCRIPTION =
  "The complete Revival Health and Wellness sitemap. Every service page, hormone therapy, medical weight loss, sexual wellness, aesthetics, and every local city page we serve across the Las Vegas valley, in one place.";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
});

/* ── Data ─────────────────────────────────────────────────────────────── */

type SitemapLink = { label: string; href: string; external?: boolean };

type SitemapGroup = {
  id: string;
  title: string;
  Icon: React.ComponentType<{ className?: string }>;
  description?: string;
  links: SitemapLink[];
};

const MAIN_PAGES: SitemapGroup = {
  id: "main",
  title: "Main Pages",
  Icon: Home,
  description:
    "The core of the Revival experience — start here to explore who we are and how we work.",
  links: [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about-us/" },
    { label: "Contact Us", href: "/contact-us/" },
    { label: "Telehealth", href: "/telehealth/" },
    { label: "Wellness Quiz", href: "/quiz/" },
    { label: "Blog", href: "/blogs/" },
    { label: "Patient Financing (Cherry)", href: "/cherry/" },
    {
      label: "Book a Consultation",
      href: "https://revivalhealth.zenoti.com/webstoreNew",
      external: true,
    },
  ],
};

const WEIGHT_LOSS: SitemapGroup = {
  id: "weight-loss",
  title: "Weight Loss & Metabolic",
  Icon: Flame,
  description:
    "Physician-supervised medical weight loss and metabolic optimization.",
  links: [
    { label: "Weight Loss Overview", href: "/weight-loss/" },
    { label: "GLP-1 Program", href: "/glp-1/" },
    { label: "Phentermine", href: "/phentermine/" },
    { label: "Vitamin Injections", href: "/vitamin-injections/" },
    { label: "IV Hydration", href: "/iv-hydration/" },
  ],
};

const HORMONE_THERAPY: SitemapGroup = {
  id: "hormone",
  title: "Hormone Therapy",
  Icon: HeartPulse,
  description:
    "Bio-identical hormone replacement therapy tailored to men and women.",
  links: [
    { label: "Hormone Therapy Overview", href: "/hormone-therapy/" },
    { label: "Women's Hormone Therapy", href: "/womens-hormone-therapy/" },
    { label: "Men's Hormone Therapy", href: "/mens-hormone-therapy/" },
    {
      label: "Growth Hormone Optimization",
      href: "/growth-hormone-optimization/",
    },
  ],
};

const SEXUAL_WELLNESS: SitemapGroup = {
  id: "sexual-wellness",
  title: "Sexual Wellness",
  Icon: Sparkles,
  description:
    "Discreet, medically-supervised solutions for intimate health and confidence.",
  links: [
    { label: "Sexual Wellness Overview", href: "/sexual-wellness/" },
    { label: "For Men", href: "/men/" },
    { label: "P-Shot", href: "/p-shot-tm/" },
    { label: "Gainswave", href: "/gainswave-tm/" },
    { label: "P-Long", href: "/p-long/" },
    { label: "Viagra", href: "/viagra/" },
    { label: "Trimix", href: "/trimix/" },
    { label: "Priapus Toxin", href: "/priapus-toxin/" },
    { label: "Emsella (Men)", href: "/emsella/" },
    { label: "For Women", href: "/women/" },
    { label: "O-Shot", href: "/o-shot-tm/" },
    { label: "Gainswave for Her", href: "/gainswavetm-for-her/" },
    { label: "Emsella (Women)", href: "/emsella-2/" },
  ],
};

const AESTHETICS: SitemapGroup = {
  id: "aesthetics",
  title: "Aesthetics",
  Icon: Syringe,
  description:
    "Injectables, fillers, and non-surgical rejuvenation delivered by expert providers.",
  links: [
    { label: "Aesthetics Overview", href: "/aesthetics/" },
    { label: "Aura 3D Imaging", href: "/aura-3d/" },
    { label: "Botox", href: "/botox/" },
    { label: "Dysport", href: "/dysport/" },
    { label: "Xeomin", href: "/xeomin/" },
    { label: "Derma Filler", href: "/derma-filler/" },
    { label: "Kybella", href: "/kybella/" },
    { label: "Sculptra", href: "/sculptra/" },
    { label: "PDO Thread Lifts", href: "/pdo-thread-lifts/" },
    { label: "Under Eye Treatment", href: "/under-eye-treatment/" },
  ],
};

const BODY_SKIN: SitemapGroup = {
  id: "body-skin",
  title: "Body Contouring & Skin",
  Icon: Grid,
  description:
    "Fat reduction, muscle building, skin tightening, and advanced laser resurfacing.",
  links: [
    { label: "Skin Overview", href: "/skin/" },
    { label: "Emsculpt NEO", href: "/emsculpt-neo/" },
    { label: "ONDA Pro", href: "/onda-pro/" },
    {
      label: "Everesse RF Skin Tightening",
      href: "/everesse-rf-skin-tightening-and-rejuvenation/",
    },
    { label: "Xerf Skin Tightening", href: "/xerf/" },
    { label: "Microneedling", href: "/microneedling/" },
    { label: "CO2 Laser Treatments", href: "/co2-laser-treatments/" },
    { label: "Deka Tetra Pro CO2 Laser", href: "/tetra-pro-co2-laser/" },
    { label: "Scar Camouflage", href: "/scar-camouflage/" },
  ],
};

const HAIR: SitemapGroup = {
  id: "hair",
  title: "Hair Restoration",
  Icon: Scissors,
  description: "Medical-grade approaches to hair regrowth and density.",
  links: [
    { label: "Hair Overview", href: "/hair/" },
    { label: "PRP Hair Restoration", href: "/prp-hair-restoration/" },
    { label: "Finasteride", href: "/finasteride/" },
  ],
};

const LEGAL: SitemapGroup = {
  id: "legal",
  title: "Legal & Utility",
  Icon: FileText,
  links: [
    { label: "Privacy Policy", href: "/privacy-policy/" },
    { label: "XML Sitemap", href: "/sitemap.xml" },
    { label: "Robots.txt", href: "/robots.txt" },
    {
      label: "Zenoti Privacy Notice",
      href: "https://www.zenoti.com/trust/privacy-notice",
      external: true,
    },
  ],
};

const SERVICE_GROUPS: SitemapGroup[] = [
  WEIGHT_LOSS,
  HORMONE_THERAPY,
  SEXUAL_WELLNESS,
  AESTHETICS,
  BODY_SKIN,
  HAIR,
];

/* ── UI helpers ───────────────────────────────────────────────────────── */

function LinkList({ links }: { links: SitemapLink[] }) {
  return (
    <ul className="mt-5 space-y-2">
      {links.map((l) => (
        <li key={l.href}>
          {l.external ? (
            <a
              href={l.href}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-start gap-2 text-sm text-revival-charcoal transition-colors hover:text-revival-gold"
            >
              <ArrowRight className="mt-1 h-3.5 w-3.5 shrink-0 text-revival-gold/60 transition-transform group-hover:translate-x-0.5 group-hover:text-revival-gold" />
              <span>{l.label}</span>
              <ExternalLink className="mt-1 h-3 w-3 text-revival-charcoal/40" />
            </a>
          ) : (
            <Link
              href={l.href}
              className="group inline-flex items-start gap-2 text-sm text-revival-charcoal transition-colors hover:text-revival-gold"
            >
              <ArrowRight className="mt-1 h-3.5 w-3.5 shrink-0 text-revival-gold/60 transition-transform group-hover:translate-x-0.5 group-hover:text-revival-gold" />
              <span>{l.label}</span>
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
}

function SectionCard({ group }: { group: SitemapGroup }) {
  const { Icon } = group;
  return (
    <div
      id={group.id}
      className="scroll-mt-28 rounded-3xl border border-revival-gold/20 bg-white p-6 shadow-sm transition-all duration-300 hover:border-revival-gold/40 hover:shadow-[0_20px_50px_-25px_rgba(15,15,15,0.25)] sm:p-8"
    >
      <div className="flex items-start gap-4">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-revival-gold/10 text-revival-gold">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <h3 className="font-heading text-xl text-revival-dark sm:text-2xl">
            {group.title}
          </h3>
          {group.description ? (
            <p className="mt-1 text-sm font-light leading-relaxed text-revival-charcoal/75">
              {group.description}
            </p>
          ) : null}
        </div>
      </div>
      <LinkList links={group.links} />
    </div>
  );
}

/* ── Page ─────────────────────────────────────────────────────────────── */

export default function SitemapPage() {
  const cities = getLiveCities();
  const services = getLiveServices();
  const totalLocalPages = cities.length * services.length;
  const totalServicePages =
    MAIN_PAGES.links.length +
    SERVICE_GROUPS.reduce((sum, g) => sum + g.links.length, 0);

  const jumpNav: { label: string; anchor: string }[] = [
    { label: "Main", anchor: "#main" },
    { label: "Weight Loss", anchor: "#weight-loss" },
    { label: "Hormones", anchor: "#hormone" },
    { label: "Sexual Wellness", anchor: "#sexual-wellness" },
    { label: "Aesthetics", anchor: "#aesthetics" },
    { label: "Body & Skin", anchor: "#body-skin" },
    { label: "Hair", anchor: "#hair" },
    { label: "Areas We Serve", anchor: "#areas" },
    { label: "Local Pages", anchor: "#local-pages" },
    { label: "Locations", anchor: "#locations" },
    { label: "Legal", anchor: "#legal" },
  ];

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
        eyebrow="Everything on Revival, in one place"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: TITLE },
        ]}
        title={
          <>
            The complete{" "}
            <span className="italic text-revival-gold">sitemap</span>
          </>
        }
        description="Every service, every neighborhood, every resource. Use this directory to jump straight to the Revival page you need."
        compact
      />

      {/* Stats strip */}
      <section className="border-b border-revival-gold/15 bg-white">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
          {[
            { value: totalServicePages, label: "Core service pages" },
            { value: cities.length, label: "Communities served" },
            { value: services.length, label: "Services offered" },
            { value: totalLocalPages, label: "Local service pages" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p
                className="font-heading font-medium text-revival-dark"
                style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}
              >
                {s.value.toLocaleString()}
              </p>
              <p className="mt-1 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-revival-gold">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Quick-jump */}
      <section className="sticky top-16 z-10 border-b border-revival-gold/15 bg-revival-warm-white/95 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-revival-charcoal/60">
              Jump to
            </span>
            {jumpNav.map((j) => (
              <a
                key={j.anchor}
                href={j.anchor}
                className="rounded-full border border-revival-gold/25 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.1em] text-revival-charcoal transition-colors hover:border-revival-gold hover:bg-revival-gold hover:text-white"
              >
                {j.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Core section cards */}
      <section className="bg-revival-warm-white py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-tagline text-xs text-revival-gold">
              Site directory
            </span>
            <h2
              className="mt-3 font-heading font-medium leading-[1.1] text-revival-dark"
              style={{ fontSize: "clamp(1.9rem, 3.2vw, 2.75rem)" }}
            >
              Explore Revival by category
            </h2>
            <p className="mt-5 text-base font-light text-revival-charcoal/80 sm:text-lg">
              Every treatment we offer is grouped below. Tap any service to
              read the full clinical breakdown, pricing guidance, and provider
              details.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <SectionCard group={MAIN_PAGES} />
            {SERVICE_GROUPS.map((g) => (
              <SectionCard key={g.id} group={g} />
            ))}
          </div>
        </div>
      </section>

      {/* Areas we serve — city hubs */}
      <section id="areas" className="scroll-mt-28 bg-revival-cream py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-tagline text-xs text-revival-gold">
              Areas we serve
            </span>
            <h2
              className="mt-3 font-heading font-medium leading-[1.1] text-revival-dark"
              style={{ fontSize: "clamp(1.9rem, 3.2vw, 2.75rem)" }}
            >
              {cities.length} Las Vegas-valley communities
            </h2>
            <p className="mt-5 text-base font-light text-revival-charcoal/80 sm:text-lg">
              Concierge medical wellness delivered locally, from Summerlin to
              Boulder City and beyond.
            </p>
          </div>

          <ul className="mx-auto mt-10 grid max-w-5xl gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <li>
              <Link
                href="/areas-we-serve/"
                className="group flex h-full items-center gap-3 rounded-2xl border border-revival-gold/30 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-revival-gold hover:shadow-[0_20px_50px_-20px_rgba(15,15,15,0.25)]"
              >
                <MapPin className="h-5 w-5 shrink-0 text-revival-gold" />
                <span className="font-heading text-base text-revival-dark group-hover:text-revival-gold">
                  Areas We Serve · Index
                </span>
              </Link>
            </li>
            {cities.map((c) => (
              <li key={c.slug}>
                <Link
                  href={areaPath(c.slug)}
                  className="group flex h-full items-center gap-3 rounded-2xl border border-revival-gold/20 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-revival-gold hover:shadow-[0_20px_50px_-20px_rgba(15,15,15,0.25)]"
                >
                  <MapPin className="h-5 w-5 shrink-0 text-revival-gold" />
                  <div>
                    <p className="font-heading text-base text-revival-dark group-hover:text-revival-gold">
                      {c.name}
                    </p>
                    <p className="mt-0.5 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-revival-charcoal/50">
                      {c.county} · {c.state}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Full local directory — every city × service */}
      <section
        id="local-pages"
        className="scroll-mt-28 bg-revival-warm-white py-16 lg:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-tagline text-xs text-revival-gold">
              Local service directory
            </span>
            <h2
              className="mt-3 font-heading font-medium leading-[1.1] text-revival-dark"
              style={{ fontSize: "clamp(1.9rem, 3.2vw, 2.75rem)" }}
            >
              All {totalLocalPages.toLocaleString()} local pages
            </h2>
            <p className="mt-5 text-base font-light text-revival-charcoal/80 sm:text-lg">
              Every service, mapped to every community we serve. Tap a city to
              jump straight to its local index.
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
                href={`#local-${c.slug}`}
                className="rounded-full border border-revival-gold/30 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-revival-charcoal transition-colors hover:border-revival-gold hover:bg-revival-gold hover:text-white"
              >
                {c.name}
              </a>
            ))}
          </nav>

          <div className="mt-14 space-y-10">
            {cities.map((c) => (
              <div
                key={c.slug}
                id={`local-${c.slug}`}
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

      {/* Locations */}
      <section id="locations" className="scroll-mt-28 bg-revival-cream py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-tagline text-xs text-revival-gold">
              Our clinics
            </span>
            <h2
              className="mt-3 font-heading font-medium leading-[1.1] text-revival-dark"
              style={{ fontSize: "clamp(1.9rem, 3.2vw, 2.75rem)" }}
            >
              Two Las Vegas locations
            </h2>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {CLINICS.map((clinic) => (
              <div
                key={clinic.name}
                className="rounded-3xl border border-revival-gold/20 bg-white p-6 shadow-sm sm:p-8"
              >
                <div className="flex items-start gap-3">
                  <MapPin className="mt-1 h-5 w-5 text-revival-gold" />
                  <div>
                    <h3 className="font-heading text-xl text-revival-dark">
                      {clinic.name}
                    </h3>
                    <p className="mt-1 text-sm font-light leading-relaxed text-revival-charcoal/80">
                      {clinic.address}
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2 text-xs">
                  {clinic.phones.map((phone) => (
                    <a
                      key={phone}
                      href={`tel:${phone.replace(/[^0-9+]/g, "")}`}
                      className="inline-flex items-center gap-1 rounded-full border border-revival-gold/30 bg-revival-warm-white px-3 py-1 font-semibold text-revival-charcoal hover:border-revival-gold hover:text-revival-gold"
                    >
                      <Phone className="h-3 w-3" /> {phone}
                    </a>
                  ))}
                </div>
                <a
                  href={clinic.mapHref}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.14em] text-revival-gold hover:text-revival-dark"
                >
                  Open in Maps
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Legal & utility */}
      <section className="bg-revival-warm-white py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-2">
            <SectionCard group={LEGAL} />
            <div
              id="blog"
              className="scroll-mt-28 rounded-3xl border border-revival-gold/20 bg-white p-6 shadow-sm sm:p-8"
            >
              <div className="flex items-start gap-4">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-revival-gold/10 text-revival-gold">
                  <BookOpen className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-heading text-xl text-revival-dark sm:text-2xl">
                    Blog & Insights
                  </h3>
                  <p className="mt-1 text-sm font-light leading-relaxed text-revival-charcoal/75">
                    Long-form guidance on hormones, weight loss, longevity,
                    and aesthetics from the Revival medical team.
                  </p>
                </div>
              </div>
              <ul className="mt-5 space-y-2">
                <li>
                  <Link
                    href="/blogs/"
                    className="group inline-flex items-start gap-2 text-sm text-revival-charcoal transition-colors hover:text-revival-gold"
                  >
                    <ArrowRight className="mt-1 h-3.5 w-3.5 shrink-0 text-revival-gold/60 transition-transform group-hover:translate-x-0.5 group-hover:text-revival-gold" />
                    <span>All Blog Posts</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <CTABanner
          title="Ready to start your Revival journey?"
          subtitle="Two Las Vegas clinics, one concierge standard of care. Book a consultation and we'll build a plan tailored to your goals."
        />
      </div>
    </>
  );
}
