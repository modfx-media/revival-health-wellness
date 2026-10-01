/** Primary service pillars. */
export const PILLAR_SERVICES = [
  "weight-loss",
  "hormone-therapy",
  "sexual-wellness",
  "aesthetics",
  "iv-hydration",
  "telehealth",
] as const;

/**
 * Sub-service / treatment pages (SUPs). Every one of these is a CMS page draft.
 */
export const SUB_SERVICES = [
  "aura-3d",
  "botox",
  "cherry",
  "co2-laser-treatments",
  "derma-filler",
  "dysport",
  "emsculpt-neo",
  "emsella",
  "emsella-2",
  "everesse-rf-skin-tightening-and-rejuvenation",
  "finasteride",
  "gainswave-tm",
  "gainswavetm-for-her",
  "glp-1",
  "growth-hormone-optimization",
  "hair",
  "kybella",
  "men",
  "mens-hormone-therapy",
  "microneedling",
  "o-shot-tm",
  "onda-pro",
  "p-long",
  "p-shot-tm",
  "pdo-thread-lifts",
  "phentermine",
  "priapus-toxin",
  "prp-hair-restoration",
  "scar-camouflage",
  "sculptra",
  "skin",
  "tetra-pro-co2-laser",
  "trimix",
  "under-eye-treatment",
  "viagra",
  "vitamin-injections",
  "women",
  "womens-hormone-therapy",
  "xeomin",
  "xerf",
] as const;

export const CONTENT_PAGES = [
  "about-us",
  "contact-us",
  "blogs",
  "sitemap-page",
] as const;

export const UTILITY_PAGES = ["quiz"] as const;

export const LOW_PRIORITY_PAGES = ["privacy-policy"] as const;

export type PageKind =
  | "home"
  | "pillar"
  | "sub-service"
  | "content"
  | "utility"
  | "legal"
  | "geo"
  | "area"
  | "blog-index";

const PILLARS = new Set<string>(PILLAR_SERVICES);
const SUBS = new Set<string>(SUB_SERVICES);
const CONTENT = new Set<string>(CONTENT_PAGES);
const UTILITY = new Set<string>(UTILITY_PAGES);
const LEGAL = new Set<string>(LOW_PRIORITY_PAGES);

export function pageKindForSlug(slug: string): PageKind {
  if (slug === "blogs") return "blog-index";
  if (PILLARS.has(slug)) return "pillar";
  if (SUBS.has(slug)) return "sub-service";
  if (CONTENT.has(slug)) return "content";
  if (UTILITY.has(slug)) return "utility";
  if (LEGAL.has(slug)) return "legal";
  return "content";
}
