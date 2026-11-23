import type { Metadata } from "next";

export const SITE = {
  name: "Revival Health & Wellness",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://revivalhealthandwellnessgroup.com",
  description:
    "Revival Health and Wellness offers weight loss, hormone therapy, sexual wellness, and aesthetics in Las Vegas, with clinics serving Henderson.",
  locale: "en_US",
  twitter: "@revivalhealth",
  phone: "(702) 963-1154",
} as const;

/** Homepage <title>. 57 characters, includes Las Vegas, full brand once. */
export const HOME_TITLE =
  "Revival Health & Wellness | Las Vegas Weight & Aesthetics";

const BRAND = SITE.name;
const BRAND_SHORT = "Revival";
const TITLE_MAX = 60;
const DESC_MIN = 120;
const DESC_MAX = 158;

/** Drop a trailing brand so the template cannot append it a second time. */
export function stripBrand(title: string): string {
  let text = title.replace(/\s+/g, " ").trim();
  const trailing = [
    /\s*\|\s*Revival Health & Wellness\s*$/i,
    /\s*\|\s*Revival Health and Wellness\s*$/i,
    /\s*\|\s*Revival\s*$/i,
  ];
  let changed = true;
  while (changed) {
    changed = false;
    for (const pattern of trailing) {
      if (pattern.test(text)) {
        text = text.replace(pattern, "").trim();
        changed = true;
      }
    }
  }
  return text;
}

/**
 * One brand suffix, never repeated. Uses the short brand when the full name
 * would pass 60 characters. Does not cut a word.
 */
export function composeTitle(raw: string): string {
  const base = stripBrand(raw);
  const withBrand = (specific: string): string | null => {
    const full = `${specific} | ${BRAND}`;
    if (full.length <= TITLE_MAX) return full;
    const short = `${specific} | ${BRAND_SHORT}`;
    if (short.length <= TITLE_MAX) return short;
    if (specific.length <= TITLE_MAX) return specific;
    return null;
  };
  if (!base.includes(" | ")) {
    return withBrand(base) ?? base;
  }
  // A designed "Phrase | clause" title. Keep it when it already fits.
  if (base.length <= TITLE_MAX) return base;
  const specific = base.split(" | ")[0]!.trim();
  return withBrand(specific) ?? (specific.length <= base.length ? specific : base);
}

/** First candidate that fits in 60 characters, brand included when it fits. */
export function bestTitle(candidates: string[]): string {
  let fallback = composeTitle(candidates[0] ?? BRAND);
  for (const candidate of candidates) {
    const titled = composeTitle(candidate);
    if (titled.length <= TITLE_MAX) return titled;
    if (titled.length < fallback.length) fallback = titled;
  }
  return fallback;
}

function asSentence(value: string): string {
  const text = value.replace(/\s+/g, " ").trim();
  if (!text) return "";
  return /[.!?]$/.test(text) ? text : `${text}.`;
}

/**
 * Pick a complete-sentence description inside 120–158 characters.
 * Recipes are tried in order. Nothing is cut mid-word.
 */
export function pickDescription(recipes: string[][]): string {
  const texts = recipes
    .map((parts) =>
      parts
        .map(asSentence)
        .filter(Boolean)
        .join(" ")
        .replace(/\s+/g, " ")
        .trim(),
    )
    .filter(Boolean);
  for (const text of texts) {
    if (text.length >= DESC_MIN && text.length <= DESC_MAX) return text;
  }
  const underMax = texts
    .filter((text) => text.length <= DESC_MAX)
    .sort((a, b) => b.length - a.length);
  if (underMax[0]) return underMax[0];
  return texts.slice().sort((a, b) => a.length - b.length)[0] ?? "";
}

/** Keep an existing description when it already fits. Otherwise reflow sentences. */
export function boundDescription(description: string): string {
  const text = description.replace(/\s+/g, " ").trim();
  if (text.length >= DESC_MIN && text.length <= DESC_MAX) return text;
  const parts = text.split(/(?<=[.!?])\s+/).filter(Boolean);
  if (text.length > DESC_MAX && parts.length > 1) {
    const prefixes = parts.map((_, index) => parts.slice(0, index + 1));
    const picked = pickDescription(prefixes);
    if (picked.length >= DESC_MIN && picked.length <= DESC_MAX) return picked;
  }
  if (text.length < DESC_MIN) {
    const extended = pickDescription([
      [text, "Serving patients in Las Vegas and Henderson"],
      [text, "Book a consultation at Revival Health and Wellness"],
    ]);
    if (extended.length >= DESC_MIN && extended.length <= DESC_MAX) return extended;
  }
  if (text.length > DESC_MAX) {
    const space = text.lastIndexOf(" ", DESC_MAX);
    const cut = (space > DESC_MIN ? text.slice(0, space) : text.slice(0, DESC_MAX))
      .replace(/[\s,;:–—-]+$/u, "")
      .trim();
    if (!cut) return text;
    return /[.!?]$/.test(cut) || cut.length >= DESC_MAX ? cut : `${cut}.`;
  }
  return text;
}

export function areaLeafTitle(serviceName: string, cityName: string): string {
  return bestTitle([
    `${serviceName} in ${cityName}, NV`,
    `${serviceName} in ${cityName}`,
  ]);
}

export function areaLeafDescription(input: {
  serviceName: string;
  shortDescription: string;
  cityName: string;
  county: string;
  driveTime: string;
}): string {
  const { serviceName, shortDescription, cityName, county, driveTime } = input;
  const rich = pickDescription([
    [`${serviceName} in ${cityName}, Nevada`, shortDescription],
    [shortDescription, `Serving ${cityName} and ${county}`],
    [`${serviceName} in ${cityName}, Nevada`, `Serving ${cityName} and ${county}`, driveTime],
    [
      `${serviceName} in ${cityName}, Nevada`,
      "Book a consultation at Revival Health and Wellness",
      driveTime,
    ],
    [
      `${serviceName} is available to ${cityName} patients at Revival Health and Wellness`,
      driveTime,
    ],
    [`${serviceName} in ${cityName}, Nevada`, "Book a consultation at Revival Health and Wellness"],
  ]);
  if (rich.includes(cityName) && rich.length >= 120 && rich.length <= 158) return rich;

  // Short service blurbs used to be reused verbatim. Always name the city.
  const parts = [
    `${serviceName} in ${cityName}, Nevada`,
    "Book a consultation at Revival Health and Wellness",
    "Care is available at both Las Vegas clinics",
    driveTime,
  ];
  let text = "";
  for (const part of parts) {
    const sentence = /[.!?]$/.test(part.trim()) ? part.trim() : `${part.trim()}.`;
    const next = text ? `${text} ${sentence}` : sentence;
    if (next.length <= 158) text = next;
    if (text.length >= 120) break;
  }
  return text;
}

export function cityHubTitle(cityName: string): string {
  return bestTitle([
    `${cityName} Wellness Clinic`,
    `Wellness Clinic in ${cityName}`,
  ]);
}

export function cityHubDescription(input: {
  cityName: string;
  county: string;
  driveTime: string;
}): string {
  const { cityName, county, driveTime } = input;
  return pickDescription([
    [
      `Concierge medical care in ${cityName}, NV`,
      "Hormone therapy, weight loss, sexual wellness, and aesthetics from Revival Health and Wellness",
      driveTime,
    ],
    [
      `Revival Health and Wellness serves ${cityName} and ${county}`,
      "Hormone therapy, medical weight loss, sexual wellness, and aesthetics",
      driveTime,
    ],
    [
      `Medical wellness in ${cityName}, Nevada`,
      "Visit Revival Health and Wellness for hormone therapy, weight loss, and aesthetics",
      "Book a visit",
    ],
    [
      `Medical wellness in ${cityName}, Nevada`,
      "Visit Revival Health and Wellness for hormone therapy, weight loss, and aesthetics",
    ],
  ]);
}

export function geoLeafTitle(serviceName: string, cityName: string): string {
  return bestTitle([
    `${serviceName} near ${cityName}, NV`,
    `${serviceName} near ${cityName}`,
  ]);
}

export function geoLeafDescription(serviceName: string, cityName: string): string {
  return pickDescription([
    [
      `${serviceName} near ${cityName}, NV`,
      "Physician-guided care at Revival Health and Wellness for Las Vegas valley patients",
      "Book a consultation",
    ],
    [
      `${serviceName} near ${cityName}, NV`,
      "Physician-guided care at Revival Health and Wellness for Las Vegas valley patients",
    ],
    [
      `${serviceName} for ${cityName} patients`,
      "Book a consultation at Revival Health and Wellness in Las Vegas",
    ],
  ]);
}

type BuildMetadataInput = {
  title: string;
  description?: string;
  /** Path beginning with a leading slash, e.g. "/weight-loss". */
  path?: string;
  images?: string[];
  noIndex?: boolean;
  keywords?: string[];
};

/** Ensure a path has a single trailing slash (matches next.config trailingSlash). */
function withTrailingSlash(path: string): string {
  if (!path.startsWith("/")) path = `/${path}`;
  if (path === "/") return "/";
  return path.endsWith("/") ? path : `${path}/`;
}

/**
 * Shared metadata builder. Produces canonical, OpenGraph, and Twitter tags
 * with sensible Revival Health & Wellness defaults.
 */
export function buildMetadata({
  title,
  description = SITE.description,
  path = "/",
  images = ["/images/home/approach-2.jpg"],
  noIndex = false,
  keywords,
}: BuildMetadataInput): Metadata {
  const normalizedPath = withTrailingSlash(path);
  const url = new URL(normalizedPath, SITE.url).toString();
  const isHome = normalizedPath === "/";
  const fullTitle = isHome ? HOME_TITLE : composeTitle(title);
  const descriptionText = isHome
    ? description.length >= 140 && description.length <= 158
      ? description
      : SITE.description
    : boundDescription(description);

  return {
    // `absolute` prevents the root layout's title.template from re-appending
    // the brand name to pages that already build a full title.
    title: { absolute: fullTitle },
    description: descriptionText,
    keywords,
    metadataBase: new URL(SITE.url),
    alternates: { canonical: url },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      title: fullTitle,
      description: descriptionText,
      url,
      siteName: SITE.name,
      locale: SITE.locale,
      type: "website",
      images: images.map((src) => ({ url: src, width: 1200, height: 630 })),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: descriptionText,
      images,
      creator: SITE.twitter,
    },
  };
}
