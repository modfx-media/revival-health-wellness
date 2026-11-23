import type { CollectionConfig } from "payload";

import { authenticated, authenticatedOrPublished } from "../access";
import { draftsWithoutAutosave, uniqueTextField } from "../fields";
import { revalidateAfterChange, revalidateAfterDelete } from "../hooks";
import { previewFromPath } from "../preview";

export const Pages: CollectionConfig = {
  slug: "pages",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "path", "pageKind", "_status", "updatedAt"],
    preview: (doc) => previewFromPath(doc?.path),
    livePreview: {
      url: ({ data }) => previewFromPath(data?.path),
    },
  },
  access: {
    read: authenticatedOrPublished,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  versions: draftsWithoutAutosave,
  fields: [
    { name: "title", type: "text", required: true },
    {
      name: "excerpt",
      type: "textarea",
    },
    {
      name: "content",
      type: "richText",
    },
    {
      name: "legacyBody",
      type: "textarea",
      admin: {
        description: "Imported article or page copy. The designed page stays live until this document is published.",
      },
    },
    {
      name: "pageKind",
      type: "select",
      defaultValue: "content",
      options: [
        { label: "Home", value: "home" },
        { label: "Pillar", value: "pillar" },
        { label: "Sub-service", value: "sub-service" },
        { label: "Content", value: "content" },
        { label: "Blog index", value: "blog-index" },
        { label: "Utility", value: "utility" },
        { label: "Legal", value: "legal" },
        { label: "Geo", value: "geo" },
        { label: "Area", value: "area" },
      ],
      admin: { position: "sidebar" },
    },
    {
      name: "searchPriority",
      type: "number",
      defaultValue: 10,
      min: 0,
      max: 100,
      admin: {
        position: "sidebar",
        description: "On-site search weight. Blog posts are boosted above pages.",
      },
    },
    uniqueTextField("slug"),
    uniqueTextField("path", {
      admin: {
        position: "sidebar",
        description: "Public path, leading slash, no trailing slash. Generated from the slug when left blank.",
      },
    }),
    uniqueTextField("legacyId"),
    {
      name: "sourceUrl",
      type: "text",
      admin: { position: "sidebar" },
    },
  ],
  hooks: {
    beforeChange: [
      ({ data }) => {
        if (!data) return data;
        if ((data.path === null || data.path === undefined || data.path === "") && data.slug) {
          data.path = data.slug === "home" ? "/" : `/${data.slug}`;
        }
        return data;
      },
    ],
    afterChange: [revalidateAfterChange],
    afterDelete: [revalidateAfterDelete],
  },
};
