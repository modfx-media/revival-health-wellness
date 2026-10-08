import { vercelPostgresAdapter } from "@payloadcms/db-vercel-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { redirectsPlugin } from "@payloadcms/plugin-redirects";
import { searchPlugin } from "@payloadcms/plugin-search";
import { seoPlugin } from "@payloadcms/plugin-seo";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import sharp from "sharp";

import { Authors } from "./cms/collections/Authors";
import { Categories } from "./cms/collections/Categories";
import { Media } from "./cms/collections/Media";
import { Pages } from "./cms/collections/Pages";
import { Posts } from "./cms/collections/Posts";
import { Users } from "./cms/collections/Users";
import { Footer } from "./cms/globals/Footer";
import { Header } from "./cms/globals/Header";
import { SiteSettings } from "./cms/globals/SiteSettings";
import { getServerURL, publicOrigins } from "./lib/cms/url";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: " — Revival CMS",
    },
    livePreview: {
      breakpoints: [
        { label: "Mobile", name: "mobile", width: 375, height: 667 },
        { label: "Desktop", name: "desktop", width: 1440, height: 900 },
      ],
    },
  },
  collections: [Users, Media, Categories, Authors, Pages, Posts],
  globals: [Header, Footer, SiteSettings],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: vercelPostgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || "",
      max: process.env.CMS_IMPORT_APPLY === "1" ? 1 : 10,
    },
    // Neon blocks 5432 on many networks. WebSockets on 443 stay open.
    forceUseVercelPostgres: true,
    push: !process.env.VERCEL && process.env.PAYLOAD_DISABLE_PUSH !== "1",
  }),
  sharp,
  serverURL: getServerURL(),
  cors: publicOrigins(),
  csrf: publicOrigins(),
  plugins: [
    seoPlugin({
      collections: ["pages", "posts"],
      uploadsCollection: "media",
      generateTitle: ({ doc }) => {
        const title = typeof doc?.title === "string" ? doc.title : "";
        return title
          ? `${title} | Revival Health & Wellness`
          : "Revival Health & Wellness";
      },
      generateDescription: ({ doc }) =>
        typeof doc?.excerpt === "string" ? doc.excerpt : "",
      generateURL: ({ doc }) => {
        const site = (
          process.env.NEXT_PUBLIC_SITE_URL ||
          "https://revivalhealthandwellnessgroup.com"
        ).replace(/\/$/, "");
        const docPath = typeof doc?.path === "string" ? doc.path : "/";
        return docPath === "/" ? `${site}/` : `${site}${docPath}/`;
      },
      fields: ({ defaultFields }) => [
        ...defaultFields,
        { name: "canonicalUrl", type: "text" },
        {
          name: "noIndex",
          type: "checkbox",
          defaultValue: false,
        },
        {
          name: "noFollow",
          type: "checkbox",
          defaultValue: false,
        },
        {
          name: "excludeFromSitemap",
          type: "checkbox",
          defaultValue: false,
        },
        { name: "schemaType", type: "text" },
        { name: "breadcrumbLabel", type: "text" },
      ],
    }),
    redirectsPlugin({
      collections: ["pages", "posts"],
    }),
    searchPlugin({
      collections: ["pages", "posts"],
      syncDrafts: true,
      skipSync: () => process.env.CMS_IMPORT_APPLY === "1",
      defaultPriorities: {
        pages: 10,
        posts: 40,
      },
      searchOverrides: {
        fields: ({ defaultFields }) => [
          ...defaultFields,
          { name: "excerpt", type: "textarea" },
          { name: "path", type: "text" },
        ],
      },
      beforeSync: ({ collectionSlug, originalDoc, searchDoc }) => {
        const fallback = collectionSlug === "posts" ? 40 : 10;
        const priority =
          typeof originalDoc.searchPriority === "number"
            ? originalDoc.searchPriority
            : fallback;
        return {
          ...searchDoc,
          priority,
          excerpt:
            typeof originalDoc.excerpt === "string" ? originalDoc.excerpt : "",
          path: typeof originalDoc.path === "string" ? originalDoc.path : "",
        };
      },
    }),
    vercelBlobStorage({
      enabled: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
      collections: {
        // Public blob URLs (not /media). Payload only supports public stores.
        media: { disablePayloadAccessControl: true },
      },
      token: process.env.BLOB_READ_WRITE_TOKEN,
      // Browser uploads skip the 4.5MB serverless body limit.
      clientUploads: true,
    }),
  ],
});
