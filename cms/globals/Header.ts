import type { GlobalConfig } from "payload";

import { anyone, authenticated } from "../access";

/**
 * Editorial nav data only. The designed header stays on the public site.
 * Logo and nav items are optional so the first draft can be saved empty.
 */
export const Header: GlobalConfig = {
  slug: "header",
  access: {
    read: anyone,
    update: authenticated,
  },
  versions: {
    drafts: true,
  },
  fields: [
    { name: "announcement", type: "text" },
    { name: "phone", type: "text" },
    {
      name: "navItems",
      type: "array",
      fields: [
        { name: "label", type: "text" },
        { name: "href", type: "text" },
        {
          name: "children",
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
