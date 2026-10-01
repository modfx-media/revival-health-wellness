import { draftMode } from "next/headers";
import { getPayload } from "payload";
import { cache } from "react";

import config from "@payload-config";
import { normalizePath } from "./url";

export type CmsMeta = {
  title?: string | null;
  description?: string | null;
  canonicalUrl?: string | null;
  noIndex?: boolean | null;
  noFollow?: boolean | null;
  excludeFromSitemap?: boolean | null;
};

export type CmsDoc = {
  id: string | number;
  title?: string | null;
  excerpt?: string | null;
  path?: string | null;
  pageKind?: string | null;
  content?: unknown;
  legacyBody?: string | null;
  coverPath?: string | null;
  boosted?: boolean | null;
  featured?: boolean | null;
  searchPriority?: number | null;
  updatedAt?: string;
  meta?: CmsMeta | null;
  category?: { title?: string | null } | string | number | null;
};

async function draftEnabled(): Promise<boolean> {
  try {
    return (await draftMode()).isEnabled;
  } catch {
    return false;
  }
}

async function payload() {
  return getPayload({ config });
}

export const queryRoutedContentByPath = cache(async (path: string) => {
  const normalized = normalizePath(path);
  const draft = await draftEnabled();
  const cms = await payload();

  const shared = {
    depth: 1,
    draft,
    overrideAccess: draft,
    limit: 1,
  } as const;

  const pages = await cms.find({
    collection: "pages",
    ...shared,
    where: { path: { equals: normalized } },
  });
  const page = pages.docs[0];
  if (page) return { collection: "pages" as const, doc: page as CmsDoc };

  const posts = await cms.find({
    collection: "posts",
    ...shared,
    where: { path: { equals: normalized } },
  });
  const post = posts.docs[0];
  if (post) return { collection: "posts" as const, doc: post as CmsDoc };

  return null;
});

export const queryPublishedMeta = cache(async (path: string) => {
  const normalized = normalizePath(path);
  const cms = await payload();
  const shared = {
    depth: 0,
    draft: false,
    overrideAccess: false,
    limit: 1,
    select: {
      title: true,
      excerpt: true,
      path: true,
      meta: true,
      boosted: true,
    },
  } as const;

  const pages = await cms.find({
    collection: "pages",
    ...shared,
    where: { path: { equals: normalized } },
  });
  if (pages.docs[0]) return pages.docs[0] as CmsDoc;

  const posts = await cms.find({
    collection: "posts",
    ...shared,
    where: { path: { equals: normalized } },
  });
  return (posts.docs[0] as CmsDoc | undefined) ?? null;
});

export async function listPublishedForSitemap(): Promise<CmsDoc[]> {
  const cms = await payload();
  const docs: CmsDoc[] = [];

  for (const collection of ["pages", "posts"] as const) {
    let page = 1;
    while (page < 50) {
      const result = await cms.find({
        collection,
        depth: 0,
        draft: false,
        overrideAccess: false,
        limit: 100,
        page,
        select: {
          path: true,
          meta: true,
          updatedAt: true,
          boosted: true,
        },
      });
      docs.push(...(result.docs as CmsDoc[]));
      if (!result.hasNextPage) break;
      page += 1;
    }
  }

  return docs;
}
