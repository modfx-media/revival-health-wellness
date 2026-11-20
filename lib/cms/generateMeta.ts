import type { Metadata } from "next";

import { mergeCmsMeta } from "./merge-meta";
import { withCMS } from "./safe";
import { queryPublishedMeta } from "./queries";
import { normalizePath } from "./url";

export { blogDocumentTitle, mergeCmsMeta, publishedSeoText } from "./merge-meta";

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
