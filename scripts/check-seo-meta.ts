/**
 * Code-sourced SEO check. Ignores Payload, so a CMS-only title cannot fail CI.
 * Fails on duplicate titles or descriptions, titles over 60 characters,
 * or descriptions over 158 characters.
 */
import { readdirSync, readFileSync, statSync } from "fs";
import path from "path";

import { getLiveAreaPages, getLiveCities } from "../lib/areas";
import { BLOG_POSTS } from "../lib/content/blog";
import { SW_CONTENT } from "../lib/content/sexual-wellness";
import { getAllGeoPages } from "../lib/locations";
import {
  areaLeafDescription,
  areaLeafTitle,
  boundDescription,
  cityHubDescription,
  cityHubTitle,
  composeTitle,
  geoLeafDescription,
  geoLeafTitle,
  HOME_TITLE,
  SITE,
} from "../lib/metadata";

type Entry = { path: string; title: string; description: string };

const entries: Entry[] = [
  {
    path: "/",
    title: HOME_TITLE,
    description: SITE.description,
  },
];

for (const post of BLOG_POSTS) {
  const rawTitle = post.metaTitle ?? post.title;
  const rawDescription = post.metaDescription ?? post.excerpt;
  entries.push({
    path: `/blogs/${post.slug}/`,
    title: composeTitle(rawTitle),
    description: rawDescription.replace(/\s+/g, " ").trim(),
  });
}

for (const page of Object.values(SW_CONTENT)) {
  entries.push({
    path: `/${page.slug}/`,
    title: composeTitle(page.meta.title),
    description: boundDescription(page.meta.description),
  });
}

for (const { city, service } of getLiveAreaPages()) {
  entries.push({
    path: `/areas-we-serve/${city.slug}/${service.slug}/`,
    title: areaLeafTitle(service.name, city.name),
    description: areaLeafDescription({
      serviceName: service.name,
      shortDescription: service.shortDescription,
      cityName: city.name,
      county: city.county,
      driveTime: city.driveTimeFromClinic,
    }),
  });
}

for (const city of getLiveCities()) {
  entries.push({
    path: `/areas-we-serve/${city.slug}/`,
    title: cityHubTitle(city.name),
    description: cityHubDescription({
      cityName: city.name,
      county: city.county,
      driveTime: city.driveTimeFromClinic,
    }),
  });
}

for (const geo of getAllGeoPages()) {
  entries.push({
    path: `/${geo.slug}/`,
    title: geoLeafTitle(geo.service.name, geo.city.name),
    description: geoLeafDescription(geo.service.name, geo.city.name),
  });
}

function walk(dir: string): string[] {
  const files: string[] = [];
  for (const name of readdirSync(dir)) {
    const full = path.join(dir, name);
    if (statSync(full).isDirectory()) files.push(...walk(full));
    else if (name === "page.tsx") files.push(full);
  }
  return files;
}

const appRoot = path.join(process.cwd(), "app/(site)");
for (const file of walk(appRoot)) {
  const source = readFileSync(file, "utf8");
  const descriptionMatch = source.match(/const DESCRIPTION =\s*\n?\s*"([^"]*)"/);
  const metaTitleMatch = source.match(/const META_TITLE = "([^"]*)"/);
  const titleMatch = source.match(/const TITLE = "([^"]*)"/);
  if (!descriptionMatch && !metaTitleMatch && !titleMatch) continue;
  const rel = path.relative(appRoot, path.dirname(file));
  const route = rel === "" || rel === "." ? "/" : `/${rel.split(path.sep).join("/")}/`;
  if (route.includes("[")) continue;
  const titleSource = metaTitleMatch?.[1] ?? titleMatch?.[1];
  const descriptionSource = descriptionMatch?.[1];
  const existing = entries.find((entry) => entry.path === route);
  const title = titleSource ? composeTitle(titleSource) : existing?.title;
  const description = descriptionSource
    ? boundDescription(descriptionSource)
    : existing?.description;
  if (!title || !description) continue;
  if (existing) {
    existing.title = title;
    existing.description = description;
  } else {
    entries.push({ path: route, title, description });
  }
}

const problems: string[] = [];
const titles = new Map<string, string>();
const descriptions = new Map<string, string>();

for (const entry of entries) {
  if (entry.title.length > 60) {
    problems.push(`title ${entry.title.length} ${entry.path} ${entry.title}`);
  }
  if (entry.description.length > 158) {
    problems.push(`description ${entry.description.length} ${entry.path} ${entry.description}`);
  }
  if (entry.description.length < 120 && !entry.path.startsWith("/blogs/")) {
    problems.push(`short description ${entry.description.length} ${entry.path}`);
  }
  const previousTitle = titles.get(entry.title);
  if (previousTitle) problems.push(`duplicate title "${entry.title}" on ${previousTitle} and ${entry.path}`);
  else titles.set(entry.title, entry.path);
  const previousDescription = descriptions.get(entry.description);
  if (previousDescription) {
    problems.push(`duplicate description on ${previousDescription} and ${entry.path}`);
  } else descriptions.set(entry.description, entry.path);
}

if (problems.length) {
  console.error(`SEO meta check failed (${problems.length})`);
  for (const problem of problems.slice(0, 40)) console.error(problem);
  process.exit(1);
}

console.log(`SEO meta check passed (${entries.length} code-sourced URLs, 0 duplicate titles or descriptions).`);
