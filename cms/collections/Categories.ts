import type { CollectionConfig } from "payload";

import { anyone, authenticated } from "../access";
import { uniqueTextField } from "../fields";

export const Categories: CollectionConfig = {
  slug: "categories",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug"],
  },
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    { name: "title", type: "text", required: true },
    uniqueTextField("slug"),
    uniqueTextField("legacyId"),
  ],
};
