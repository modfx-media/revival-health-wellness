import "./env";

import fs from "fs";
import path from "path";

import { neon } from "@neondatabase/serverless";
import { convertMarkdownToLexical, editorConfigFactory } from "@payloadcms/richtext-lexical";
import { getPayload, type Payload } from "payload";

import config from "../payload.config";
import { buildExport, type ContentExport, type ContentRecord } from "./content-source";

const TRANSIENT = /ETIMEDOUT|cannot connect|Connection terminated|ECONNRESET|fetch failed|socket hang up/i;

type Report = {
  created: number;
  updated: number;
  skipped: number;
  missingRelationships: string[];
  errors: string[];
};

function argsOf(argv: string[]) {
  const args = argv.filter((arg) => arg !== "--");
  return {
    apply: args.includes("--apply") || process.env.CMS_IMPORT_APPLY === "1",
    publish: args.includes("--publish") || process.env.CMS_IMPORT_PUBLISH === "1",
    file: args.find((arg) => arg.endsWith(".json")),
  };
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function withRetry<T>(fn: () => Promise<T>): Promise<T> {
  let last: unknown;
  for (let attempt = 0; attempt < 4; attempt += 1) {
    try {
      return await fn();
    } catch (error) {
      last = error;
      const message = error instanceof Error ? error.message : String(error);
      if (!TRANSIENT.test(message) || attempt === 3) throw error;
      await sleep(400 * (attempt + 1));
    }
  }
  throw last;
}

function loadExport(file?: string): ContentExport {
  if (!file) return buildExport();
  return JSON.parse(fs.readFileSync(path.resolve(file), "utf8")) as ContentExport;
}

async function findByLegacy(payload: Payload, collection: "pages" | "posts" | "categories" | "authors", legacyId: string) {
  const found = await payload.find({
    collection,
    depth: 0,
    draft: true,
    limit: 1,
    overrideAccess: true,
    where: { legacyId: { equals: legacyId } },
  });
  return found.docs[0];
}

function baseData(record: ContentRecord, publish: boolean) {
  return {
    title: record.title,
    slug: record.slug || null,
    legacyId: record.legacyId,
    _status: publish ? "published" : "draft",
  };
}

async function upsert(
  payload: Payload,
  record: ContentRecord,
  data: Record<string, unknown>,
  publish: boolean,
  report: Report,
) {
  if (record.collection !== "pages" && record.collection !== "posts" && record.collection !== "categories" && record.collection !== "authors") {
    return;
  }
  const collection = record.collection;
  const versioned = collection === "pages" || collection === "posts";
  const existing = await withRetry(() => findByLegacy(payload, collection, record.legacyId));
  const payloadData = versioned
    ? { ...data, _status: publish ? "published" : "draft" }
    : data;
  if (existing) {
    await withRetry(() =>
      payload.update({
        collection,
        id: existing.id,
        draft: versioned ? !publish : false,
        overrideAccess: true,
        data: payloadData,
      }),
    );
    report.updated += 1;
  } else {
    await withRetry(() =>
      payload.create({
        collection,
        draft: versioned ? !publish : false,
        overrideAccess: true,
        data: payloadData,
      }),
    );
    report.created += 1;
  }
  await sleep(20);
}

async function main() {
  process.on("unhandledRejection", (error) => {
    const message = error instanceof Error ? error.message : String(error);
    if (TRANSIENT.test(message)) {
      console.error("[cms] transient", message);
      return;
    }
    console.error("[cms] unhandled", error);
  });

  const { apply, publish, file } = argsOf(process.argv.slice(2));
  const exported = loadExport(file);
  const pages = exported.records.filter((record) => record.collection === "pages");
  const posts = exported.records.filter((record) => record.collection === "posts");
  const subs = pages.filter((record) => record.pageKind === "sub-service");

  console.log(
    `${apply ? "Applying" : "Dry run"}: ${pages.length} pages (${subs.length} sub-services), ${posts.length} posts, publish=${publish ? "yes" : "no (drafts)"}.`,
  );

  if (!apply) {
    console.log("Pass --apply or CMS_IMPORT_APPLY=1 to write drafts.");
    return;
  }
  if (publish) {
    console.log("Publishing was requested. Designed pages will be replaced where a document is published.");
  }

  if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is missing.");
  const sql = neon(process.env.DATABASE_URL);
  await sql`select 1`;

  const payload = await getPayload({ config });
  const editorConfig = await editorConfigFactory.default({ config: payload.config });

  const report: Report = {
    created: 0,
    updated: 0,
    skipped: 0,
    missingRelationships: [],
    errors: [],
  };

  const categoryIds = new Map<string, string | number>();
  const authorIds = new Map<string, string | number>();
  const postIds = new Map<string, string | number>();

  for (const record of exported.records.filter((item) => item.collection === "categories")) {
    try {
      await upsert(
        payload,
        record,
        { title: record.title, slug: record.slug, legacyId: record.legacyId },
        true,
        report,
      );
      const saved = await findByLegacy(payload, "categories", record.legacyId);
      if (saved) categoryIds.set(record.slug, saved.id);
    } catch (error) {
      report.errors.push(`category ${record.slug}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  for (const record of exported.records.filter((item) => item.collection === "authors")) {
    try {
      await upsert(
        payload,
        record,
        {
          name: record.authorName || record.title,
          role: record.authorRole,
          slug: record.slug,
          legacyId: record.legacyId,
        },
        true,
        report,
      );
      const saved = await findByLegacy(payload, "authors", record.legacyId);
      if (saved) authorIds.set(record.slug, saved.id);
    } catch (error) {
      report.errors.push(`author ${record.slug}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  const priorityPages = pages.filter(
    (record) => record.pageKind !== "geo" && record.pageKind !== "area",
  );
  const locationPages = pages.filter(
    (record) => record.pageKind === "geo" || record.pageKind === "area",
  );

  const importPages = async (batch: ContentRecord[], label: string) => {
  let pageIndex = 0;
  for (const record of batch) {
    pageIndex += 1;
    if (pageIndex === 1 || pageIndex % 50 === 0 || pageIndex === batch.length) {
      process.stderr.write(`${label} ${pageIndex}/${batch.length}\n`);
    }
    try {
      let content: unknown;
      if (record.legacyBody) {
        try {
          content = convertMarkdownToLexical({ editorConfig, markdown: record.legacyBody });
        } catch {
          content = undefined;
        }
      }
      await upsert(
        payload,
        record,
        {
          ...baseData(record, publish),
          excerpt: record.excerpt,
          pageKind: record.pageKind,
          searchPriority: record.searchPriority ?? 10,
          path: record.path,
          sourceUrl: record.sourceUrl,
          legacyBody: record.legacyBody,
          ...(content ? { content } : {}),
          meta: {
            title: record.metaTitle || record.title,
            description: record.metaDescription || record.excerpt,
            canonicalUrl: record.canonicalUrl,
          },
        },
        publish,
        report,
      );
    } catch (error) {
      report.errors.push(`page ${record.path}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
  };

  await importPages(priorityPages, "core pages");

  for (const record of posts) {
    try {
      const category = record.category ? categoryIds.get(record.category) : undefined;
      const author = record.authorName ? authorIds.get(record.authorName) : undefined;
      if (record.category && !category) {
        report.missingRelationships.push(`${record.path} category ${record.category}`);
      }
      if (record.authorName && !author) {
        report.missingRelationships.push(`${record.path} author ${record.authorName}`);
      }

      let content: unknown;
      if (record.legacyBody) {
        try {
          content = convertMarkdownToLexical({
            editorConfig,
            markdown: record.legacyBody,
          });
        } catch {
          content = undefined;
        }
      }

      await upsert(
        payload,
        record,
        {
          ...baseData(record, publish),
          excerpt: record.excerpt,
          path: record.path,
          sourceUrl: record.sourceUrl,
          legacyBody: record.legacyBody,
          ...(content ? { content } : {}),
          ...(category ? { category } : {}),
          ...(author ? { author } : {}),
          tags: (record.tags ?? []).map((tag) => ({ tag })),
          publishDate: record.publishDate,
          readMinutes: record.readMinutes,
          coverPath: record.coverPath,
          featured: Boolean(record.featured),
          boosted: record.boosted !== false,
          searchPriority: record.searchPriority ?? (record.featured ? 50 : 40),
          meta: {
            title: record.metaTitle || record.title,
            description: record.metaDescription || record.excerpt,
            canonicalUrl: record.canonicalUrl,
          },
        },
        publish,
        report,
      );
      const saved = await findByLegacy(payload, "posts", record.legacyId);
      if (saved) postIds.set(record.slug, saved.id);
    } catch (error) {
      report.errors.push(`post ${record.path}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  for (const record of posts) {
    const ids = (record.relatedSlugs ?? [])
      .map((slug) => postIds.get(slug))
      .filter((id): id is string | number => id !== undefined);
    const missing = (record.relatedSlugs ?? []).filter((slug) => !postIds.has(slug));
    for (const slug of missing) {
      report.missingRelationships.push(`${record.path} related ${slug}`);
    }
    if (!ids.length) continue;
    const saved = postIds.get(record.slug);
    if (!saved) continue;
    try {
      await withRetry(() =>
        payload.update({
          collection: "posts",
          id: saved,
          draft: !publish,
          overrideAccess: true,
          data: { relatedPosts: ids },
        }),
      );
    } catch (error) {
      report.errors.push(`related ${record.path}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  await importPages(locationPages, "location pages");

  for (const slug of ["header", "footer", "site-settings"] as const) {
    try {
      await payload.updateGlobal({
        slug,
        draft: true,
        overrideAccess: true,
        data: exported.globals[slug],
      });
    } catch (error) {
      report.errors.push(`global ${slug}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  const reportPath = path.resolve("migration-data/import-report.json");
  fs.mkdirSync(path.dirname(reportPath), { recursive: true });
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log(
    `Import finished. created=${report.created} updated=${report.updated} errors=${report.errors.length} missingRefs=${report.missingRelationships.length}`,
  );
  if (report.errors.length) {
    console.error(report.errors.slice(0, 20).join("\n"));
    process.exit(1);
  }
  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
