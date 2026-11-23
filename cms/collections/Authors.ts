import type { CollectionConfig } from "payload";

import { anyone, authenticated } from "../access";
import { uniqueTextField } from "../fields";

export const Authors: CollectionConfig = {
  slug: "authors",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "role"],
  },
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "role", type: "text" },
    uniqueTextField("slug"),
    uniqueTextField("legacyId"),
  ],
};
