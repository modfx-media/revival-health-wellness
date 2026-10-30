import { SITE } from "./metadata";

type Json = Record<string, unknown>;

/**
 * JSON-LD MedicalBusiness / LocalBusiness for Revival Health and Wellness.
 * Use on the homepage and contact page.
 */
export function organizationSchema(): Json {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "@id": `${SITE.url}/#business`,
    name: "Revival Health and Wellness",
    url: SITE.url,
    logo: `${SITE.url}/images/brand/revival-dark-logo.png`,
    description:
      "Premier weight loss, hormone therapy, and aesthetic services in Las Vegas, NV",
    telephone: SITE.phone,
    priceRange: "$$",
    address: [
      {
        "@type": "PostalAddress",
        streetAddress: "7220 S. Cimarron Road, Suite #140",
        addressLocality: "Las Vegas",
        addressRegion: "NV",
        postalCode: "89113",
        addressCountry: "US",
      },
      {
        "@type": "PostalAddress",
        streetAddress: "2585 Box Canyon Drive Suite #150",
        addressLocality: "Las Vegas",
        addressRegion: "NV",
        postalCode: "89128",
        addressCountry: "US",
      },
    ],
    geo: {
      "@type": "GeoCoordinates",
      latitude: 36.0569688,
      longitude: -115.2693326,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Monday",
        opens: "09:00",
        closes: "14:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Tuesday", "Wednesday", "Thursday"],
        opens: "09:00",
        closes: "19:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Friday", "Saturday"],
        opens: "09:00",
        closes: "15:00",
      },
    ],
    sameAs: [
      "https://www.facebook.com/RevivalHealthAndWellness",
      "https://www.instagram.com/revival.healthandwellness/",
      "https://www.tiktok.com/@revival.lv",
    ],
  };
}

/** JSON-LD WebSite node with a SearchAction (use in root layout). */
export function websiteSchema(): Json {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: SITE.url,
    name: SITE.name,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE.url}/?s={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

/**
 * JSON-LD MedicalBusiness for a geo/location landing page. Uses the real
 * Revival clinic address (the practice operates from Las Vegas) and declares
 * `areaServed` for the targeted city so the schema stays accurate while still
 * signalling local relevance.
 */
export function geoBusinessSchema(input: {
  city: string;
  state?: string;
  /** Page URL path, e.g. "/botox-henderson-nv". */
  path: string;
}): Json {
  const { city, state = "NV", path } = input;
  return {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "@id": `${SITE.url}/#business`,
    name: "Revival Health and Wellness",
    url: new URL(path, SITE.url).toString(),
    logo: `${SITE.url}/images/brand/revival-dark-logo.png`,
    telephone: SITE.phone,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "7220 S. Cimarron Road, Suite #140",
      addressLocality: "Las Vegas",
      addressRegion: "NV",
      postalCode: "89113",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 36.0569688,
      longitude: -115.2693326,
    },
    areaServed: {
      "@type": "City",
      name: `${city}, ${state}`,
    },
  };
}

/** Normalize a path so schema URLs match the live site's trailing-slash format. */
function pathWithSlash(path: string): string {
  if (!path.startsWith("/") && !/^https?:\/\//i.test(path)) path = `/${path}`;
  if (/^https?:\/\//i.test(path)) return path;
  if (path === "/") return "/";
  // Preserve hash and query while ensuring the pathname ends with "/".
  const [base, ...rest] = path.split(/([#?])/);
  const normalized = base.endsWith("/") ? base : `${base}/`;
  return normalized + rest.join("");
}

/** JSON-LD MedicalWebPage for an individual service page. */
export function medicalWebPageSchema(input: {
  name: string;
  description: string;
  path: string;
}): Json {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: input.name,
    description: input.description,
    url: new URL(pathWithSlash(input.path), SITE.url).toString(),
    about: {
      "@type": "MedicalBusiness",
      "@id": `${SITE.url}/#business`,
      name: "Revival Health and Wellness",
    },
    publisher: {
      "@type": "MedicalBusiness",
      "@id": `${SITE.url}/#business`,
      name: "Revival Health and Wellness",
    },
    mainEntity: {
      "@type": "MedicalProcedure",
      name: input.name,
      description: input.description,
    },
  };
}

/**
 * JSON-LD for an individual service page. Emits a MedicalWebPage (with the
 * underlying MedicalProcedure embedded as `mainEntity`), so every service page
 * carries page-level medical schema. Kept under this name for the existing
 * service route call sites.
 */
export function serviceSchema(input: {
  name: string;
  description: string;
  path: string;
}): Json {
  return medicalWebPageSchema(input);
}

/** JSON-LD BreadcrumbList. */
export function breadcrumbSchema(items: { name: string; path: string }[]): Json {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: new URL(pathWithSlash(item.path), SITE.url).toString(),
    })),
  };
}

/** JSON-LD FAQPage. */
export function faqSchema(faqs: { question: string; answer: string }[]): Json {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

/**
 * Serializes a schema object for use in a <script type="application/ld+json">.
 * Escapes "<" to prevent breaking out of the script tag (XSS safety).
 */
export function jsonLd(schema: Json | Json[]): string {
  return JSON.stringify(schema).replace(/</g, "\<");
}
