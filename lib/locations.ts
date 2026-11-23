/**
 * Geo + service data used to generate programmatic local-SEO landing pages
 * served by the `app/(routes)/[...slug]/page.tsx` catch-all route.
 *
 * URL shape: /{service-slug}-{city-slug}-nv
 *   e.g. /botox-las-vegas-nv, /glp-1-henderson-nv, /o-shot-tm-summerlin-south-nv
 *
 * Every geo page canonicalizes to its parent service page (e.g. /botox) so the
 * pillar page consolidates ranking signal while still serving local intent.
 */

export type City = {
  /** URL slug fragment, e.g. "north-las-vegas". */
  slug: string;
  /** Display name, e.g. "North Las Vegas". */
  name: string;
};

export type GeoService = {
  /** Parent service slug, also the canonical target, e.g. "botox". */
  slug: string;
  /** Display name, e.g. "Botox". */
  name: string;
  /** Eyebrow / category label shown above the page title. */
  eyebrow: string;
  /**
   * Service description. The literal token `{city}` is replaced with the
   * city display name when rendering each geo page.
   */
  blurb: string;
  /** Benefit bullets shown on the page. */
  highlights: string[];
};

export const CITIES: City[] = [
  { slug: "las-vegas", name: "Las Vegas" },
  { slug: "henderson", name: "Henderson" },
  { slug: "north-las-vegas", name: "North Las Vegas" },
  { slug: "boulder-city", name: "Boulder City" },
  { slug: "paradise", name: "Paradise" },
  { slug: "summerlin-south", name: "Summerlin South" },
  { slug: "enterprise", name: "Enterprise" },
  { slug: "spring-valley", name: "Spring Valley" },
  { slug: "whitney", name: "Whitney" },
  { slug: "blue-diamond", name: "Blue Diamond" },
  { slug: "primm", name: "Primm" },
  { slug: "pahrump", name: "Pahrump" },
  { slug: "sandy-valley", name: "Sandy Valley" },
  { slug: "mount-charleston", name: "Mount Charleston" },
];

export const GEO_SERVICES: GeoService[] = [
  {
    slug: "botox",
    name: "Botox",
    eyebrow: "Injectables",
    blurb:
      "Smooth fine lines and refresh your appearance with expert Botox treatments for {city} residents. Our physician-led injectors deliver natural, balanced results tailored to your facial anatomy.",
    highlights: [
      "Natural-looking wrinkle reduction by licensed injectors",
      "Personalized dosing mapped to your facial movement",
      "Quick, comfortable visits with no downtime",
      "Convenient access for {city} and the greater Las Vegas valley",
    ],
  },
  {
    slug: "glp-1",
    name: "GLP-1 Weight Loss",
    eyebrow: "Medical Weight Loss",
    blurb:
      "Reach and maintain your goal weight with physician-supervised GLP-1 therapy for {city}. We pair the latest medications with personalized coaching, labs, and ongoing support.",
    highlights: [
      "Doctor-supervised GLP-1 protocols (semaglutide & tirzepatide)",
      "Personalized dosing guided by labs and progress",
      "Nutrition and lifestyle coaching included",
      "In-clinic and telehealth options for {city} patients",
    ],
  },
  {
    slug: "gainswave-tm",
    name: "GAINSWave™",
    eyebrow: "Sexual Wellness",
    blurb:
      "Restore performance and confidence with GAINSWave™ acoustic wave therapy in {city}. This non-invasive, drug-free treatment improves blood flow for lasting results.",
    highlights: [
      "Non-invasive, drug-free acoustic wave therapy",
      "Improves blood flow and sensitivity",
      "No downtime, return to your day immediately",
      "Discreet, concierge-level care for {city} men",
    ],
  },
  {
    slug: "o-shot-tm",
    name: "O-Shot™",
    eyebrow: "Sexual Wellness",
    blurb:
      "Enhance intimacy and wellness with the O-Shot™ for {city} women. Using your body's own platelet-rich plasma, this natural treatment supports sensitivity, comfort, and confidence.",
    highlights: [
      "Natural treatment using your own platelet-rich plasma",
      "Supports sensitivity, comfort, and confidence",
      "Minimal downtime with a quick in-office visit",
      "Compassionate, private care for {city} women",
    ],
  },
  {
    slug: "emsella",
    name: "Emsella",
    eyebrow: "Pelvic Health",
    blurb:
      "Strengthen your pelvic floor and regain bladder control with Emsella in {city}. Sit fully clothed while this breakthrough technology delivers thousands of supramaximal contractions.",
    highlights: [
      "Non-invasive treatment for incontinence and pelvic strength",
      "Stay fully clothed, no surgery, no downtime",
      "Thousands of pelvic-floor contractions per session",
      "Trusted by {city} patients seeking lasting relief",
    ],
  },
  {
    slug: "p-long",
    name: "P-Long",
    eyebrow: "Sexual Wellness",
    blurb:
      "Support male enhancement and tissue health with the P-Long protocol in {city}. This structured program combines proven therapies for gradual, natural improvement.",
    highlights: [
      "Structured, physician-guided enhancement protocol",
      "Combines PRP with proven supportive therapies",
      "Natural, gradual improvement over time",
      "Discreet care for {city} and surrounding areas",
    ],
  },
  {
    slug: "mens-hormone-therapy",
    name: "Men's Hormone Therapy",
    eyebrow: "Hormone Therapy",
    blurb:
      "Reclaim energy, strength, and drive with men's hormone therapy in {city}. Our team optimizes testosterone and related hormones with precise, lab-guided protocols.",
    highlights: [
      "Lab-guided testosterone and hormone optimization",
      "Improves energy, mood, libido, and body composition",
      "Ongoing monitoring for safe, effective results",
      "In-clinic and telehealth visits for {city} men",
    ],
  },
  {
    slug: "womens-hormone-therapy",
    name: "Women's Hormone Therapy",
    eyebrow: "Hormone Therapy",
    blurb:
      "Restore balance through perimenopause, menopause, and beyond with women's hormone therapy in {city}. We personalize bioidentical protocols to your symptoms and goals.",
    highlights: [
      "Personalized bioidentical hormone optimization",
      "Relief from hot flashes, fatigue, mood, and sleep issues",
      "Lab-guided dosing with attentive follow-up",
      "Caring support for {city} women at every stage",
    ],
  },
];

export type GeoPage = {
  /** Full slug, e.g. "botox-las-vegas-nv". */
  slug: string;
  city: City;
  service: GeoService;
  /** Page title sans brand, e.g. "Botox in Las Vegas, NV". */
  title: string;
  /** Canonical path to the parent service page, e.g. "/botox". */
  canonical: string;
  /** Service blurb with the city name substituted in. */
  description: string;
};

function withCity(text: string, city: string): string {
  return text.replace(/\{city\}/g, city);
}

/** Builds every service × city combination as a flat list of geo pages. */
export function getAllGeoPages(): GeoPage[] {
  const pages: GeoPage[] = [];
  for (const service of GEO_SERVICES) {
    for (const city of CITIES) {
      pages.push({
        slug: `${service.slug}-${city.slug}-nv`,
        city,
        service,
        title: `${service.name} in ${city.name}, NV`,
        canonical: `/${service.slug}`,
        description: withCity(service.blurb, city.name),
      });
    }
  }
  return pages;
}

/** Resolves a slug to its geo page data, or null if unknown. */
export function getGeoPage(slug: string): GeoPage | null {
  return getAllGeoPages().find((page) => page.slug === slug) ?? null;
}

/** Returns the city-substituted highlight bullets for a geo page. */
export function geoHighlights(page: GeoPage): string[] {
  return page.service.highlights.map((h) => withCity(h, page.city.name));
}
