import "./env";

import fs from "fs";

import { SUB_SERVICES } from "../lib/cms/site-paths";
import { BLOG_POSTS } from "../lib/content/blog";
import { buildExport, type ContentExport } from "./content-source";

const file = process.argv.slice(2).find((arg) => arg.endsWith(".json"));
const exported: ContentExport = file
  ? (JSON.parse(fs.readFileSync(file, "utf8")) as ContentExport)
  : buildExport();

const paths = new Set(
  exported.records
    .filter((record) => record.path)
    .map((record) => record.path),
);

const missingSubs = SUB_SERVICES.filter((slug) => !paths.has(`/${slug}`));
const missingPosts = BLOG_POSTS.filter(
  (post) => !paths.has(`/blogs/${post.slug}`),
);
const unboosted = exported.records.filter(
  (record) => record.collection === "posts" && record.boosted !== true,
);
const pathCounts = new Map<string, number>();
for (const record of exported.records) {
  if (!record.path) continue;
  const key = `${record.collection}:${record.path}`;
  pathCounts.set(key, (pathCounts.get(key) ?? 0) + 1);
}
const duplicatePaths = [...pathCounts.entries()].filter(([, count]) => count > 1);

const problems = [
  ...missingSubs.map((slug) => `missing sub-service /${slug}`),
  ...missingPosts.map((post) => `missing blog /blogs/${post.slug}`),
  ...unboosted.map((record) => `blog not boosted ${record.path}`),
  ...duplicatePaths.map(([key, count]) => `duplicate ${key} x${count}`),
];

if (exported.version !== 1) problems.push("export version is not 1");

if (problems.length) {
  console.error(problems.join("\n"));
  process.exit(1);
}

console.log(
  `Export covers ${SUB_SERVICES.length} sub-services and ${BLOG_POSTS.length} boosted blog posts.`,
);
