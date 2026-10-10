import type { MetadataRoute } from "next";
import { SITE } from "@/lib/metadata";
import { getAllGeoPages } from "@/lib/locations";
import { getLiveCities, getLiveAreaPages } from "@/lib/areas";
import { BLOG_POSTS } from "@/lib/content/blog";
import {
  CONTENT_PAGES,
  LOW_PRIORITY_PAGES,
  PILLAR_SERVICES,
  SUB_SERVICES,
  UTILITY_PAGES,
} from "@/lib/cms/site-paths";
import { listPublishedForSitemap } from "@/lib/cms/queries";
import { withCMS } from "@/lib/cms/safe";
import { blogCalendarDay, isFutureBlogDate } from "@/lib/cms/dates";
import { normalizePath } from "@/lib/cms/url";

/** Blog posts are boosted above general content pages. */
const BLOG_PRIORITY = 0.85;

function url(path: string): string {
  // Always append a trailing slash so sitemap URLs match the live site and the
  // next.config `trailingSlash: true` setting.
  const p = path.endsWith("/") ? path : `${path}/`;
  return new URL(p, SITE.url).toString();
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const published = await withCMS(() => listPublishedForSitemap(), []);
  const hidden = new Set(
    published
      .filter((doc) => doc.meta?.noIndex || doc.meta?.excludeFromSitemap)
      .map((doc) => (typeof doc.path === "string" ? normalizePath(doc.path) : ""))
      .filter(Boolean),
  );
  const updatedAt = new Map(
    published
      .filter((doc) => typeof doc.path === "string" && doc.updatedAt)
      .map((doc) => [normalizePath(doc.path as string), new Date(doc.updatedAt as string)]),
  );

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

  const designedByPath = new Map(
    BLOG_POSTS.map((post) => [normalizePath(`/blogs/${post.slug}`), post]),
  );
  const cmsPublishDate = new Map<string, string>();
  for (const doc of published) {
    const path = typeof doc.path === "string" ? normalizePath(doc.path) : "";
    const scheduled = blogCalendarDay(doc.publishDate);
    if (path.startsWith("/blogs/") && scheduled && doc.publishDate) {
      cmsPublishDate.set(path, doc.publishDate);
    }
  }

  const blogIsListed = (path: string, designedDate?: string) => {
    const scheduled = cmsPublishDate.get(path) ?? designedDate;
    return !isFutureBlogDate(scheduled);
  };

  // One URL per article. A real CMS publish date hides the post until that day.
  const blogPosts: MetadataRoute.Sitemap = BLOG_POSTS.filter((post) =>
    blogIsListed(normalizePath(`/blogs/${post.slug}`), post.publishDate ?? post.date),
  ).map((post) => ({
    url: url(`/blogs/${post.slug}/`),
    lastModified:
      updatedAt.get(normalizePath(`/blogs/${post.slug}`)) ??
      new Date(post.publishDate ?? post.date),
    changeFrequency: "weekly" as const,
    priority: post.featured ? 0.9 : BLOG_PRIORITY,
  }));

  const cmsOnlyPosts: MetadataRoute.Sitemap = [...new Set(
    published
      .filter((doc) => typeof doc.path === "string")
      .map((doc) => normalizePath(doc.path as string))
      .filter((path) => path.startsWith("/blogs/") && !designedByPath.has(path) && blogIsListed(path)),
  )].map((path) => ({
      url: url(path),
      lastModified: updatedAt.get(path) ?? now,
      changeFrequency: "weekly" as const,
      priority: BLOG_PRIORITY,
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
    ...cmsOnlyPosts,
    ...geo,
    ...areasHub,
    ...cityHubs,
    ...cityServiceLeaves,
    ...utility,
    ...lowPriority,
  ].flatMap((entry) => {
    let pathname = "";
    try {
      pathname = normalizePath(new URL(entry.url).pathname);
    } catch {
      return [entry];
    }
    if (hidden.has(pathname)) return [];
    const cmsUpdated = updatedAt.get(pathname);
    return [cmsUpdated ? { ...entry, lastModified: cmsUpdated } : entry];
  });
}
