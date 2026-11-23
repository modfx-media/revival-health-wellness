import type { GlobalConfig } from "payload";

import { anyone, authenticated } from "../access";

/** Editorial footer data. The designed footer component is not replaced. */
export const Footer: GlobalConfig = {
  slug: "footer",
  access: {
    read: anyone,
    update: authenticated,
  },
  versions: {
    drafts: true,
  },
  fields: [
    { name: "phone", type: "text" },
    { name: "email", type: "text" },
    {
      name: "locations",
      type: "array",
      fields: [
        { name: "label", type: "text" },
        { name: "phone", type: "text" },
      ],
    },
    {
      name: "linkGroups",
      type: "array",
      fields: [
        { name: "heading", type: "text" },
        {
          name: "links",
          type: "array",
          fields: [
            { name: "label", type: "text" },
            { name: "href", type: "text" },
          ],
        },
      ],
    },
  ],
};
