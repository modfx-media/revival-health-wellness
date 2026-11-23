import fs from "fs";
import path from "path";

import { PRIMARY_NAV } from "../components/layout/nav";
import { getLiveAreaPages, getLiveCities } from "../lib/areas";
import { BLOG_POSTS, getRelatedPosts } from "../lib/content/blog";
import {
  CONTENT_PAGES,
  LOW_PRIORITY_PAGES,
  pageKindForSlug,
  PILLAR_SERVICES,
  SUB_SERVICES,
  UTILITY_PAGES,
  type PageKind,
} from "../lib/cms/site-paths";
import { absoluteURL, normalizePath } from "../lib/cms/url";
import { getAllGeoPages } from "../lib/locations";

const ORIGIN = "https://revivalhealthandwellnessgroup.com";

export type ContentRecord = {
  collection: "pages" | "posts" | "categories" | "authors";
  legacyId: string;
  sourceUrl: string;
  path: string;
  slug: string;
  title: string;
  excerpt?: string;
  pageKind?: PageKind;
  boosted?: boolean;
  featured?: boolean;
  searchPriority?: number;
  category?: string;
  authorName?: string;
  authorRole?: string;
  tags?: string[];
  publishDate?: string;
  readMinutes?: number;
  coverPath?: string;
  legacyBody?: string;
  metaTitle?: string;
  metaDescription?: string;
  canonicalUrl?: string;
  relatedSlugs?: string[];
};

export type ContentExport = {
  version: 1;
  records: ContentRecord[];
  globals: {
    header: Record<string, unknown>;
    footer: Record<string, unknown>;
    "site-settings": Record<string, unknown>;
  };
};

function titleFromSlug(slug: string): string {
  return slug
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function read(file: string): string {
  return fs.readFileSync(file, "utf8");
}

function extractString(source: string, name: string): string | null {
  const match = source.match(
    new RegExp(`const ${name} =\\s*["'\`]([^"'\`]+)["'\`]`),
  );
  return match?.[1] ?? null;
}

function pageCopy(filePath: string): { title: string | null; description: string | null } {
  if (!fs.existsSync(filePath)) return { title: null, description: null };
  const source = read(filePath);
  const title =
    extractString(source, "TITLE") ??
    source.match(/title:\s*["'`]([^"'`]+)["'`]/)?.[1] ??
    null;
  const description =
    extractString(source, "DESCRIPTION") ??
    source.match(/description:\s*["'`]([^"'`]+)["'`]/)?.[1] ??
    null;
  return { title, description };
}

function staticPageFile(slug: string): string {
  if (slug === "sitemap-page") {
    return path.join("app", "(site)", "sitemap-page", "page.tsx");
  }
  return path.join("app", "(site)", "(routes)", slug, "page.tsx");
}

function pageRecord(
  slug: string,
  pageKind: PageKind,
  filePath?: string,
): ContentRecord {
  const routePath = slug ? `/${slug}` : "/";
  const copy = filePath ? pageCopy(filePath) : { title: null, description: null };
  const title = copy.title || (slug ? titleFromSlug(slug) : "Revival Health & Wellness");
  return {
    collection: "pages",
    legacyId: `page:${routePath}`,
    sourceUrl: absoluteURL(routePath),
    path: normalizePath(routePath),
    slug: slug || "home",
    title,
    excerpt: copy.description || undefined,
    pageKind,
    searchPriority: pageKind === "sub-service" || pageKind === "pillar" ? 15 : 10,
    metaTitle: title,
    metaDescription: copy.description || undefined,
    canonicalUrl: absoluteURL(routePath),
  };
}

function blogBody(post: (typeof BLOG_POSTS)[number]): string {
  if (post.content) return post.content;
  if (post.intro && post.body?.length) {
    const sections = post.body
      .map((section) => {
        const parts = [
          section.heading ? `## ${section.heading}` : "",
          ...section.paragraphs,
          ...(section.bullets ?? []).map((bullet) => `- ${bullet}`),
        ].filter(Boolean);
        return parts.join("\n\n");
      })
      .join("\n\n");
    return [post.intro, sections].filter(Boolean).join("\n\n");
  }
  return post.intro || "";
}

export function buildExport(): ContentExport {
  const records: ContentRecord[] = [];

  records.push(
    pageRecord(
      "",
      "home",
      path.join("app", "(site)", "page.tsx"),
    ),
  );

  for (const slug of PILLAR_SERVICES) {
    records.push(pageRecord(slug, "pillar", staticPageFile(slug)));
  }
  for (const slug of SUB_SERVICES) {
    records.push(pageRecord(slug, "sub-service", staticPageFile(slug)));
  }
  for (const slug of CONTENT_PAGES) {
    records.push(pageRecord(slug, pageKindForSlug(slug), staticPageFile(slug)));
  }
  for (const slug of UTILITY_PAGES) {
    records.push(pageRecord(slug, "utility", staticPageFile(slug)));
  }
  for (const slug of LOW_PRIORITY_PAGES) {
    records.push(pageRecord(slug, "legal", staticPageFile(slug)));
  }

  records.push(
    pageRecord(
      "areas-we-serve",
      "area",
      path.join("app", "(site)", "areas-we-serve", "page.tsx"),
    ),
  );

  const authors = new Map<string, ContentRecord>();
  const categories = new Map<string, ContentRecord>();

  for (const post of BLOG_POSTS) {
    const authorName = post.author?.name || "Revival Health & Wellness";
    const authorSlug = authorName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    if (!authors.has(authorSlug)) {
      authors.set(authorSlug, {
        collection: "authors",
        legacyId: `author:${authorSlug}`,
        sourceUrl: `${ORIGIN}/blogs/`,
        path: "",
        slug: authorSlug,
        title: authorName,
        authorName,
        authorRole: post.author?.role || "Medical Team",
      });
    }

    const categorySlug = post.category.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    if (!categories.has(categorySlug)) {
      categories.set(categorySlug, {
        collection: "categories",
        legacyId: `category:${categorySlug}`,
        sourceUrl: `${ORIGIN}/blogs/`,
        path: "",
        slug: categorySlug,
        title: post.category,
      });
    }

    const routePath = `/blogs/${post.slug}`;
    records.push({
      collection: "posts",
      legacyId: `post:${post.slug}`,
      sourceUrl: post.canonical || absoluteURL(routePath),
      path: normalizePath(routePath),
      slug: post.slug,
      title: post.title,
      excerpt: post.metaDescription || post.excerpt,
      boosted: true,
      featured: Boolean(post.featured),
      searchPriority: post.featured ? 50 : 40,
      category: categorySlug,
      authorName: authorSlug,
      tags: post.tags,
      publishDate: post.publishDate || post.date,
      readMinutes: post.readMinutes,
      coverPath: post.cover,
      legacyBody: blogBody(post),
      metaTitle: post.metaTitle || post.title,
      metaDescription: post.metaDescription || post.excerpt,
      canonicalUrl: post.canonical || absoluteURL(routePath),
      relatedSlugs: getRelatedPosts(post.slug).map((related) => related.slug),
    });
  }

  for (const geo of getAllGeoPages()) {
    records.push({
      collection: "pages",
      legacyId: `page:/${geo.slug}`,
      sourceUrl: absoluteURL(`/${geo.slug}`),
      path: normalizePath(`/${geo.slug}`),
      slug: geo.slug,
      title: geo.title,
      excerpt: geo.description,
      pageKind: "geo",
      searchPriority: 10,
      metaTitle: geo.title,
      metaDescription: geo.description,
      canonicalUrl: absoluteURL(geo.canonical),
    });
  }

  for (const city of getLiveCities()) {
    const routePath = `/areas-we-serve/${city.slug}`;
    records.push({
      collection: "pages",
      legacyId: `page:${routePath}`,
      sourceUrl: absoluteURL(routePath),
      path: normalizePath(routePath),
      slug: city.slug,
      title: `${city.name}, NV Medical Wellness Clinic`,
      excerpt: city.intro,
      pageKind: "area",
      searchPriority: 10,
      metaTitle: `${city.name}, NV Medical Wellness Clinic Serving Local Residents`,
      metaDescription: city.intro,
      canonicalUrl: absoluteURL(routePath),
    });
  }

  for (const { city, service } of getLiveAreaPages()) {
    const routePath = `/areas-we-serve/${city.slug}/${service.slug}`;
    records.push({
      collection: "pages",
      legacyId: `page:${routePath}`,
      sourceUrl: absoluteURL(routePath),
      path: normalizePath(routePath),
      slug: `${city.slug}-${service.slug}`,
      title: `${service.name} in ${city.name}, NV`,
      excerpt: service.shortDescription,
      pageKind: "area",
      searchPriority: 10,
      metaTitle: `${service.name} in ${city.name}, NV`,
      metaDescription: `${service.shortDescription} Serving ${city.name}.`,
      canonicalUrl: absoluteURL(routePath),
    });
  }

  records.push(...authors.values(), ...categories.values());

  return {
    version: 1,
    records,
    globals: {
      header: {
        phone: "(702) 963-1154",
        navItems: PRIMARY_NAV.map((item) => ({
          label: item.label,
          href: item.href,
          children: (item.children ?? []).map((child) => ({
            label: child.label,
            href: child.href,
          })),
        })),
      },
      footer: {
        phone: "(702) 963-1154",
        email: "Southwest@revivalhealthandwellnessgroup.com",
        locations: [
          { label: "Henderson / SW", phone: "(702) 963-1154" },
          { label: "Summerlin / NW", phone: "(702) 725-1588" },
        ],
      },
      "site-settings": {
        siteName: "Revival Health & Wellness",
        tagline:
          "Weight loss, hormone therapy, body contouring, and aesthetics in Las Vegas, NV.",
        phone: "(702) 963-1154",
        email: "Southwest@revivalhealthandwellnessgroup.com",
        publicUrl: ORIGIN,
      },
    },
  };
}

/** Every sitemap path, without a trailing slash. */
export function expectedPublicPaths(exported: ContentExport): string[] {
  return exported.records
    .filter((record) => record.collection === "pages" || record.collection === "posts")
    .map((record) => record.path);
}
