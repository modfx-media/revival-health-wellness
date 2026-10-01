import type { Metadata } from "next";

import { withCMS } from "./safe";
import { queryPublishedMeta, type CmsDoc } from "./queries";
import { absoluteURL, normalizePath } from "./url";

function pathFromMetadata(meta: Metadata): string | null {
  const canonical = meta.alternates?.canonical;
  const value = typeof canonical === "string" ? canonical : null;
  if (!value) return null;
  try {
    if (value.startsWith("http://") || value.startsWith("https://")) {
      return normalizePath(new URL(value).pathname);
    }
    return normalizePath(value);
  } catch {
    return null;
  }
}

export function mergeCmsMeta(fallback: Metadata, doc: CmsDoc): Metadata {
  const meta = doc.meta ?? {};
  const title =
    (typeof meta.title === "string" && meta.title) ||
    (typeof doc.title === "string" && doc.title) ||
    undefined;
  const description =
    (typeof meta.description === "string" && meta.description) ||
    (typeof doc.excerpt === "string" && doc.excerpt) ||
    undefined;
  const path = typeof doc.path === "string" ? doc.path : "/";
  const canonical =
    (typeof meta.canonicalUrl === "string" && meta.canonicalUrl) ||
    absoluteURL(path);

  const fullTitle = title
    ? title.includes("|")
      ? title
      : `${title} | Revival Health & Wellness`
    : undefined;

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
  };
}

/**
 * Published CMS metadata wins. Otherwise the hardcoded page metadata is used.
 * `pathOverride` is for pages whose canonical points at a different URL
 * (geo pages canonicalize to the parent service).
 */
export async function cmsPageMetadata(
  fallback: Metadata,
  pathOverride?: string,
): Promise<Metadata> {
  const path = pathOverride ? normalizePath(pathOverride) : pathFromMetadata(fallback);
  if (!path) return fallback;
  return withCMS(async () => {
    const doc = await queryPublishedMeta(path);
    if (!doc) return fallback;
    return mergeCmsMeta(fallback, doc);
  }, fallback);
}
