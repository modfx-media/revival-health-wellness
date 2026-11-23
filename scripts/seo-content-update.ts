/**
 * Idempotent SEO field update for Payload.
 *
 * Dry run (default): prints the planned changes and does not connect to a database.
 * Apply: APPLY=1 node --env-file=.env.local --import tsx scripts/seo-content-update.ts
 *
 * What it changes, and only if a document already exists:
 * - pages meta.title and meta.description for the paths below
 * - posts meta.canonicalUrl when it is empty or still the old root URL /<slug>/
 *
 * It does not change _status, does not publish drafts, and does not replace
 * page body copy. Designed pages stay on the site until someone publishes a
 * CMS document. Publishing would swap the designed layout for the CMS body,
 * so leave these service pages as drafts.
 *
 * Alt text for the audited images lives in the React components, not in the
 * media collection. This script does not write media alt fields.
 *
 * This change set was NOT applied to production.
 */
import "./env";

import { getPayload } from "payload";

import config from "../payload.config";
import { absoluteURL, normalizePath } from "../lib/cms/url";

const PAGE_META: { path: string; title: string; description: string }[] = [
  {
    path: "/",
    title: "Revival Health & Wellness | Las Vegas Weight & Aesthetics",
    description:
      "Revival Health and Wellness offers weight loss, hormone therapy, sexual wellness, and aesthetics in Las Vegas, with clinics serving Henderson.",
  },
  {
    path: "/men",
    title: "Men's Sexual Wellness, Las Vegas | Revival Health & Wellness",
    description:
      "Men's sexual wellness in Las Vegas for ED, performance, and pelvic floor care. Private visits at Revival's Henderson and Summerlin clinics.",
  },
  {
    path: "/gainswave-tm",
    title: "GAINSWave Therapy in Las Vegas | Revival Health & Wellness",
    description:
      "GAINSWave acoustic wave therapy in Las Vegas for erectile function. Revival Health and Wellness offers this non-invasive option at both clinics.",
  },
  {
    path: "/glp-1",
    title: "GLP-1 Weight Loss in Las Vegas | Revival Health & Wellness",
    description:
      "GLP-1 weight loss in Las Vegas and Henderson, with medical guidance from Revival Health and Wellness at the Summerlin and Cimarron clinics.",
  },
  {
    path: "/emsculpt-neo",
    title: "Emsculpt NEO in Las Vegas | Revival Health & Wellness",
    description:
      "Emsculpt NEO in Las Vegas and Henderson builds muscle and reduces fat without surgery. Revival offers this body contouring at both clinics.",
  },
  {
    path: "/sexual-wellness",
    title: "Sexual Wellness for Men & Women | Revival Health & Wellness",
    description:
      "Sexual wellness for men and women in Las Vegas. Revival Health and Wellness offers private, physician-supervised care at its Henderson and Summerlin clinics.",
  },
];

function oldRootCanonical(slug: string): string[] {
  const origin = absoluteURL("/").replace(/\/$/, "");
  return [`${origin}/${slug}`, `${origin}/${slug}/`];
}

async function main() {
  const apply = process.env.APPLY === "1";
  console.log(apply ? "APPLY=1 — writing SEO fields" : "Dry run — no database writes");
  console.log("Status is not changed. Drafts stay drafts. Published docs stay published.");
  console.log("");
  for (const row of PAGE_META) {
    console.log(`page ${row.path}`);
    console.log(`  title (${row.title.length}): ${row.title}`);
    console.log(`  description (${row.description.length}): ${row.description}`);
  }
  console.log("");
  console.log(
    "posts: meta.canonicalUrl becomes /blogs/<slug>/ when it is empty or equals /<slug>/.",
  );

  if (!apply) {
    console.log("");
    console.log("Set APPLY=1 with DATABASE_URL to write. Production was not updated.");
    return;
  }
  if (!process.env.DATABASE_URL) {
    throw new Error("APPLY=1 requires DATABASE_URL. Refusing to guess a database.");
  }

  const payload = await getPayload({ config });
  for (const row of PAGE_META) {
    const path = normalizePath(row.path);
    const found = await payload.find({
      collection: "pages",
      depth: 0,
      limit: 1,
      overrideAccess: true,
      where: { path: { equals: path } },
    });
    const doc = found.docs[0];
    if (!doc) {
      console.log(`skip page ${path} — no document`);
      continue;
    }
    const meta = (doc.meta ?? {}) as { title?: string | null; description?: string | null };
    if (meta.title === row.title && meta.description === row.description) {
      console.log(`page ${path} already matches`);
      continue;
    }
    await payload.update({
      collection: "pages",
      id: doc.id,
      overrideAccess: true,
      data: {
        meta: {
          ...meta,
          title: row.title,
          description: row.description,
        },
      },
    });
    console.log(`updated page ${path} (${doc._status ?? "unknown"})`);
  }

  let page = 1;
  for (;;) {
    const found = await payload.find({
      collection: "posts",
      depth: 0,
      limit: 100,
      page,
      overrideAccess: true,
    });
    for (const doc of found.docs) {
      const slug = typeof doc.slug === "string" ? doc.slug : "";
      if (!slug) continue;
      const next = absoluteURL(`/blogs/${slug}`);
      const meta = (doc.meta ?? {}) as { canonicalUrl?: string | null };
      const current = meta.canonicalUrl?.trim() ?? "";
      const stale = !current || oldRootCanonical(slug).includes(current);
      if (!stale) continue;
      await payload.update({
        collection: "posts",
        id: doc.id,
        overrideAccess: true,
        data: { meta: { ...meta, canonicalUrl: next } },
      });
      console.log(`updated post /blogs/${slug}/ canonical`);
    }
    if (!found.hasNextPage) break;
    page += 1;
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
