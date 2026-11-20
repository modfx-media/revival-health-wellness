import type { Metadata } from "next";

import { composeTitle } from "../metadata";
import { absoluteURL } from "./url";

/** Fields mergeCmsMeta reads. Structural so this module does not load Payload. */
export type MetaDoc = {
  title?: string | null;
  excerpt?: string | null;
  path?: string | null;
  meta?: {
    title?: string | null;
    description?: string | null;
    canonicalUrl?: string | null;
    noIndex?: boolean | null;
    noFollow?: boolean | null;
  } | null;
};

/** A stored SEO string. Empty stays empty so the page fallback is left alone. */
export function publishedSeoText(value: unknown): string | undefined {
  return typeof value === "string" && value ? value : undefined;
}

/**
 * Blog detail pages re-apply their composed headline after the CMS merge, so
 * an empty SEO title stays on that headline. A published meta.title replaces
 * it verbatim.
 */
export function blogDocumentTitle(
  composedFallback: string,
  publishedMetaTitle: unknown,
): string {
  return publishedSeoText(publishedMetaTitle) ?? composedFallback;
}

export function mergeCmsMeta(fallback: Metadata, doc: MetaDoc): Metadata {
  const meta = doc.meta ?? {};
  // Published SEO fields are the document title and description, verbatim.
  // composeTitle() would strip the brand, cut at the first "|" past 60
  // characters, and append the brand again. Empty SEO fields keep today's
  // gap-fill: a document title is still composed, an excerpt can still
  // supply the description, and canonical / robots are untouched.
  const cmsTitle = publishedSeoText(meta.title);
  const cmsDescription = publishedSeoText(meta.description);
  const title = cmsTitle || publishedSeoText(doc.title);
  const description = cmsDescription || publishedSeoText(doc.excerpt);
  const path = typeof doc.path === "string" ? doc.path : "/";
  const canonical =
    (typeof meta.canonicalUrl === "string" && meta.canonicalUrl) ||
    absoluteURL(path);

  const fullTitle = cmsTitle ?? (title ? composeTitle(title) : undefined);

  return {
    ...fallback,
    ...(fullTitle ? { title: { absolute: fullTitle } } : {}),
    ...(description ? { description } : {}),
    alternates: { canonical },
    robots: {
      index: !meta.noIndex,
      follow: !meta.noFollow,
    },
    openGraph: {
      ...(typeof fallback.openGraph === "object" ? fallback.openGraph : {}),
      ...(fullTitle ? { title: fullTitle } : {}),
      ...(description ? { description } : {}),
      url: canonical,
    },
    ...publishedSocial(fallback.twitter, cmsTitle, cmsDescription),
  };
}

/** Copy a published SEO title or description onto Twitter without touching other cards. */
function publishedSocial(
  twitter: Metadata["twitter"],
  cmsTitle: string | undefined,
  cmsDescription: string | undefined,
): { twitter: Metadata["twitter"] } | Record<string, never> {
  if (!cmsTitle && !cmsDescription) return {};
  if (twitter && typeof twitter === "object") {
    return {
      twitter: {
        ...twitter,
        ...(cmsTitle ? { title: cmsTitle } : {}),
        ...(cmsDescription ? { description: cmsDescription } : {}),
      },
    };
  }
  return {
    twitter: {
      ...(cmsTitle ? { title: cmsTitle } : {}),
      ...(cmsDescription ? { description: cmsDescription } : {}),
    },
  };
}
