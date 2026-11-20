/**
 * Published CMS SEO titles and descriptions are copied verbatim.
 * Empty SEO fields leave the generated title and description alone.
 *
 * No database. Run with: tsx scripts/check-cms-titles.ts
 */
import assert from "node:assert/strict";
import type { Metadata } from "next";

import { absoluteURL } from "../lib/cms/url";
import { blogDocumentTitle, mergeCmsMeta, type MetaDoc } from "../lib/cms/merge-meta";
import { getCity, areaPath, getLiveAreaPages } from "../lib/areas";
import { BLOG_POSTS } from "../lib/content/blog";
import { getAllGeoPages } from "../lib/locations";
import {
  areaLeafDescription,
  areaLeafTitle,
  boundDescription,
  buildMetadata,
  cityHubDescription,
  cityHubTitle,
  composeTitle,
  geoLeafDescription,
  geoLeafTitle,
  HOME_TITLE,
  SITE,
} from "../lib/metadata";

const LONG_TITLE =
  "Our Story | Drug-Free Pain Relief in Saint Louis Park | Revival Health & Wellness";
const LONG_DESCRIPTION =
  "This published description is intentionally longer than the 158 character clamp the generated copy uses, and it must be rendered verbatim on the page, in Open Graph, and on Twitter without a sentence being dropped.";

function absoluteTitle(meta: Metadata): string {
  const title = meta.title;
  assert.ok(title && typeof title === "object" && "absolute" in title);
  return String(title.absolute);
}

function ogTitle(meta: Metadata): string {
  assert.ok(meta.openGraph && typeof meta.openGraph === "object" && "title" in meta.openGraph);
  return String(meta.openGraph.title);
}

function ogDescription(meta: Metadata): string {
  assert.ok(
    meta.openGraph && typeof meta.openGraph === "object" && "description" in meta.openGraph,
  );
  return String(meta.openGraph.description);
}

function twitterTitle(meta: Metadata): string {
  assert.ok(meta.twitter && typeof meta.twitter === "object" && "title" in meta.twitter);
  return String(meta.twitter.title);
}

function twitterDescription(meta: Metadata): string {
  assert.ok(meta.twitter && typeof meta.twitter === "object" && "description" in meta.twitter);
  return String(meta.twitter.description);
}

function canonical(meta: Metadata): string {
  assert.equal(typeof meta.alternates?.canonical, "string");
  return String(meta.alternates?.canonical);
}

function doc(partial: Partial<MetaDoc> & { path: string }): MetaDoc {
  return {
    title: null,
    excerpt: null,
    meta: { title: null, description: null },
    ...partial,
  };
}

function sameHead(actual: Metadata, expected: Metadata, label: string) {
  assert.equal(absoluteTitle(actual), absoluteTitle(expected), `${label} title`);
  assert.equal(actual.description, expected.description, `${label} description`);
  assert.equal(ogTitle(actual), ogTitle(expected), `${label} og:title`);
  assert.equal(ogDescription(actual), ogDescription(expected), `${label} og:description`);
  assert.equal(twitterTitle(actual), twitterTitle(expected), `${label} twitter:title`);
  assert.equal(
    twitterDescription(actual),
    twitterDescription(expected),
    `${label} twitter:description`,
  );
  assert.equal(canonical(actual), canonical(expected), `${label} canonical`);
  assert.deepEqual(actual.robots, expected.robots, `${label} robots`);
}

function assertVerbatim(fallback: Metadata, path: string) {
  const merged = mergeCmsMeta(
    fallback,
    doc({
      path,
      title: "Document title that must not replace the SEO title",
      excerpt: "Excerpt that must not replace the SEO description.",
      meta: {
        title: LONG_TITLE,
        description: LONG_DESCRIPTION,
        noIndex: true,
        noFollow: false,
      },
    }),
  );
  assert.notEqual(composeTitle(LONG_TITLE), LONG_TITLE);
  assert.notEqual(boundDescription(LONG_DESCRIPTION), LONG_DESCRIPTION);
  assert.equal(absoluteTitle(merged), LONG_TITLE);
  assert.equal(ogTitle(merged), LONG_TITLE);
  assert.equal(twitterTitle(merged), LONG_TITLE);
  assert.equal(merged.description, LONG_DESCRIPTION);
  assert.equal(ogDescription(merged), LONG_DESCRIPTION);
  assert.equal(twitterDescription(merged), LONG_DESCRIPTION);
  assert.deepEqual(merged.robots, { index: false, follow: true });
  assert.equal(canonical(merged), absoluteURL(path));
}

const home = buildMetadata({
  title: "Las Vegas Weight & Aesthetics",
  description: SITE.description,
  path: "/",
});

const about = buildMetadata({
  title: "About Us",
  description:
    "Learn about Revival Health & Wellness, our mission, our physician-led team, and our concierge approach to modern health and aesthetics in Las Vegas.",
  path: "/about-us",
});

const henderson = getCity("henderson");
assert.ok(henderson?.live);
const cityHub = buildMetadata({
  title: cityHubTitle(henderson.name),
  description: cityHubDescription({
    cityName: henderson.name,
    county: henderson.county,
    driveTime: henderson.driveTimeFromClinic,
  }),
  path: areaPath(henderson.slug),
});

const area = getLiveAreaPages()[0];
assert.ok(area);
const areaLeaf = buildMetadata({
  title: areaLeafTitle(area.service.name, area.city.name),
  description: areaLeafDescription({
    serviceName: area.service.name,
    shortDescription: area.service.shortDescription,
    cityName: area.city.name,
    county: area.city.county,
    driveTime: area.city.driveTimeFromClinic,
  }),
  path: areaPath(area.city.slug, area.service.slug),
});

const geo = getAllGeoPages()[0];
assert.ok(geo);
const geoLeaf = buildMetadata({
  title: geoLeafTitle(geo.service.name, geo.city.name),
  description: geoLeafDescription(geo.service.name, geo.city.name),
  path: geo.canonical,
});

const post = BLOG_POSTS.find((entry) => entry.metaTitle) ?? BLOG_POSTS[0];
assert.ok(post);
const blogHeadline = composeTitle(composeTitle(post.metaTitle ?? post.title));
const blogFallback: Metadata = {
  title: { absolute: composeTitle(post.metaTitle ?? post.title) },
  description: post.metaDescription ?? post.excerpt,
  alternates: { canonical: absoluteURL(`/blogs/${post.slug}`) },
  openGraph: {
    title: composeTitle(post.metaTitle ?? post.title),
    description: post.metaDescription ?? post.excerpt,
    url: absoluteURL(`/blogs/${post.slug}`),
  },
  twitter: {
    card: "summary_large_image",
    title: composeTitle(post.metaTitle ?? post.title),
    description: post.metaDescription ?? post.excerpt,
  },
  robots: { index: true, follow: true },
};

function blogHead(published: MetaDoc | null): Metadata {
  const merged = published ? mergeCmsMeta(blogFallback, published) : blogFallback;
  const documentTitle = blogDocumentTitle(blogHeadline, published?.meta?.title);
  return {
    ...merged,
    title: { absolute: documentTitle },
    openGraph: {
      ...(typeof merged.openGraph === "object" ? merged.openGraph : {}),
      title: documentTitle,
      url: absoluteURL(`/blogs/${post.slug}`),
    },
  };
}

const pages: { label: string; fallback: Metadata; path: string }[] = [
  { label: "home", fallback: home, path: "/" },
  { label: "about", fallback: about, path: "/about-us" },
  { label: "city hub", fallback: cityHub, path: areaPath(henderson.slug) },
  {
    label: "area leaf",
    fallback: areaLeaf,
    path: areaPath(area.city.slug, area.service.slug),
  },
];

for (const page of pages) {
  const empty = mergeCmsMeta(
    page.fallback,
    doc({ path: page.path, meta: { title: "", description: null } }),
  );
  sameHead(empty, page.fallback, `${page.label} empty SEO title`);
  assert.equal(absoluteTitle(page.fallback).length > 0, true, page.label);
  assertVerbatim(page.fallback, page.path);

  const composed = mergeCmsMeta(
    page.fallback,
    doc({
      path: page.path,
      title: "Clinic document title",
      meta: { title: "", description: "" },
    }),
  );
  assert.equal(
    absoluteTitle(composed),
    composeTitle("Clinic document title"),
    `${page.label} still composes a document title when SEO title is empty`,
  );
  assert.equal(twitterTitle(composed), twitterTitle(page.fallback));
  assert.equal(composed.description, page.fallback.description);
}

const geoEmpty = mergeCmsMeta(
  geoLeaf,
  doc({ path: `/${geo.slug}`, meta: { title: "", description: "" } }),
);
assert.equal(absoluteTitle(geoEmpty), absoluteTitle(geoLeaf), "geo empty title");
assert.equal(geoEmpty.description, geoLeaf.description, "geo empty description");
assert.equal(twitterTitle(geoEmpty), twitterTitle(geoLeaf), "geo empty twitter");
assert.equal(canonical(geoEmpty), absoluteURL(`/${geo.slug}`), "geo canonical still follows the doc path");
assertVerbatim(geoLeaf, `/${geo.slug}`);

const blogEmpty = blogHead(
  doc({
    path: `/blogs/${post.slug}`,
    title: "CMS headline that the blog page must ignore",
    meta: { title: "", description: "" },
  }),
);
sameHead(blogEmpty, blogHead(null), "blog empty SEO title");
assert.equal(absoluteTitle(blogEmpty), blogHeadline);

const blogVerbatim = blogHead(
  doc({
    path: `/blogs/${post.slug}`,
    title: "CMS headline",
    excerpt: "Excerpt that must not win.",
    meta: { title: LONG_TITLE, description: LONG_DESCRIPTION },
  }),
);
assert.equal(absoluteTitle(blogVerbatim), LONG_TITLE, "blog verbatim title");
assert.equal(ogTitle(blogVerbatim), LONG_TITLE, "blog verbatim og:title");
assert.equal(twitterTitle(blogVerbatim), LONG_TITLE, "blog verbatim twitter:title");
assert.equal(blogVerbatim.description, LONG_DESCRIPTION, "blog verbatim description");
assert.equal(twitterDescription(blogVerbatim), LONG_DESCRIPTION);
assert.equal(blogDocumentTitle(blogHeadline, ""), blogHeadline);
assert.equal(blogDocumentTitle(blogHeadline, null), blogHeadline);
assert.equal(HOME_TITLE, absoluteTitle(home));

const excerptOnly = mergeCmsMeta(
  about,
  doc({
    path: "/about-us",
    excerpt: "Published excerpt used only when the SEO description is empty.",
    meta: { title: null, description: "" },
  }),
);
assert.equal(
  excerptOnly.description,
  "Published excerpt used only when the SEO description is empty.",
);
assert.equal(ogDescription(excerptOnly), excerptOnly.description);
assert.equal(twitterDescription(excerptOnly), twitterDescription(about));
assert.equal(absoluteTitle(excerptOnly), absoluteTitle(about));

console.log(
  `CMS title check passed (verbatim SEO title, unchanged fallback for home, about, ${henderson.name}, ${area.city.name}/${area.service.name}, ${geo.slug}, and ${post.slug}).`,
);
