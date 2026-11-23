import "./env";

import fs from "fs";
import path from "path";

import { buildExport } from "./content-source";

const destination = path.resolve("data/content-export.json");
const exported = buildExport();
fs.mkdirSync(path.dirname(destination), { recursive: true });
fs.writeFileSync(destination, JSON.stringify(exported));

const pages = exported.records.filter((record) => record.collection === "pages");
const posts = exported.records.filter((record) => record.collection === "posts");
const subs = pages.filter((record) => record.pageKind === "sub-service");
const boosted = posts.filter((record) => record.boosted);

console.log(
  `Wrote ${destination} — ${pages.length} pages (${subs.length} sub-services), ${posts.length} posts (${boosted.length} boosted).`,
);
