import "./env";

import config from "../payload.config";

const specifier = new URL(
  "../node_modules/payload/dist/bin/generateImportMap/index.js",
  import.meta.url,
).href;
const { generateImportMap } = (await import(specifier)) as {
  generateImportMap: (
    config: Awaited<typeof import("../payload.config").default>,
    options?: { force?: boolean },
  ) => Promise<void>;
};

const sanitized = await config;
await generateImportMap(sanitized, { force: true });
console.log("Wrote the Payload import map.");
