import type { GlobalConfig } from "payload";

import { anyone, authenticated } from "../access";

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  label: "Site Settings",
  access: {
    read: anyone,
    update: authenticated,
  },
  versions: {
    drafts: true,
  },
  fields: [
    { name: "siteName", type: "text" },
    { name: "tagline", type: "textarea" },
    { name: "phone", type: "text" },
    { name: "email", type: "text" },
    { name: "publicUrl", type: "text" },
    {
      name: "defaultOgImage",
      type: "upload",
      relationTo: "media",
    },
  ],
};
