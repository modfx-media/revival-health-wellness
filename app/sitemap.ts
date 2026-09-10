import type { MetadataRoute } from "next";
import { SITE } from "@/lib/metadata";
import { getAllGeoPages } from "@/lib/locations";
import { getLiveCities, getLiveAreaPages } from "@/lib/areas";
import { BLOG_POSTS } from "@/lib/content/blog";

/** Primary service pillars, priority 0.9. */
const PILLAR_SERVICES = [
  "weight-loss",
  "hormone-therapy",
  "sexual-wellness",
  "aesthetics",
  "iv-hydration",
  "telehealth",
];

/** Sub-service / treatment pages, priority 0.8. */
const SUB_SERVICES = [
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
];

/** Editorial / company pages, priority 0.7. */
const CONTENT_PAGES = ["about-us", "contact-us", "blogs", "sitemap-page"];

/** Utility pages, priority 0.6. */
const UTILITY_PAGES = ["quiz"];

/** Low-priority legal pages, priority 0.3. */
const LOW_PRIORITY_PAGES = ["privacy-policy"];

function url(path: string): string {
  // Always append a trailing slash so sitemap URLs match the live site and the
  // next.config `trailingSlash: true` setting.
  const p = path.endsWith("/") ? path : `${path}/`;
  return new URL(p, SITE.url).toString();
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const home: MetadataRoute.Sitemap = [
    {
      url: url("/"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
  ];

  const pillars: MetadataRoute.Sitemap = PILLAR_SERVICES.map((slug) => ({
    url: url(`/${slug}/`),
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  const subServices: MetadataRoute.Sitemap = SUB_SERVICES.map((slug) => ({
    url: url(`/${slug}/`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const content: MetadataRoute.Sitemap = CONTENT_PAGES.map((slug) => ({
    url: url(`/${slug}/`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // Include every blog post - all render locally.
  const blogPosts: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: url(`/blogs/${post.slug}/`),
    lastModified: new Date(post.publishDate ?? post.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const geo: MetadataRoute.Sitemap = getAllGeoPages().map((page) => ({
    url: url(`/${page.slug}/`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  // ── Nested /areas-we-serve/[city]/[service]/ programmatic SEO grid ──
  // Only cities + services flagged `live: true` in lib/areas.ts appear here,
  // so you can stage rollout in batches via Google Search Console.
  const areasHub: MetadataRoute.Sitemap = [
    {
      url: url("/areas-we-serve/"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];

  const cityHubs: MetadataRoute.Sitemap = getLiveCities().map((city) => ({
    url: url(`/areas-we-serve/${city.slug}/`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const cityServiceLeaves: MetadataRoute.Sitemap = getLiveAreaPages().map(
    ({ city, service }) => ({
      url: url(`/areas-we-serve/${city.slug}/${service.slug}/`),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.65,
    }),
  );

  const utility: MetadataRoute.Sitemap = UTILITY_PAGES.map((slug) => ({
    url: url(`/${slug}/`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const lowPriority: MetadataRoute.Sitemap = LOW_PRIORITY_PAGES.map((slug) => ({
    url: url(`/${slug}/`),
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.3,
  }));

  return [
    ...home,
    ...pillars,
    ...subServices,
    ...content,
    ...blogPosts,
    ...geo,
    ...areasHub,
    ...cityHubs,
    ...cityServiceLeaves,
    ...utility,
    ...lowPriority,
  ];
}
