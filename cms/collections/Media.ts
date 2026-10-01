import type { CollectionConfig } from "payload";

import { anyone, authenticated } from "../access";
import { uniqueTextField } from "../fields";

export const Media: CollectionConfig = {
  slug: "media",
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  upload: {
    staticDir: "media",
    mimeTypes: ["image/*", "video/*", "application/pdf"],
    imageSizes: [
      { name: "thumbnail", width: 400, height: 300, position: "centre" },
      { name: "card", width: 768, height: 512, position: "centre" },
      { name: "hero", width: 1600, height: 900, position: "centre" },
    ],
  },
  admin: {
    useAsTitle: "alt",
    defaultColumns: ["filename", "alt", "updatedAt"],
  },
  fields: [
    {
      name: "alt",
      type: "text",
    },
    uniqueTextField("legacyId", {
      admin: { description: "Stable id from the content import. Leave blank for new uploads." },
    }),
  ],
};
