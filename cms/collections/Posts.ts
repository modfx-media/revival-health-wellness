import type { CollectionConfig } from "payload";

import { authenticated, authenticatedOrPublished } from "../access";
import { draftsWithoutAutosave, uniqueTextField } from "../fields";
import { revalidateAfterChange, revalidateAfterDelete } from "../hooks";
import { previewFromPath } from "../preview";

export const Posts: CollectionConfig = {
  slug: "posts",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "path", "boosted", "featured", "_status", "updatedAt"],
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
  defaultSort: "-publishDate",
  fields: [
    { name: "title", type: "text", required: true },
    { name: "excerpt", type: "textarea" },
    { name: "content", type: "richText" },
    {
      name: "legacyBody",
      type: "textarea",
      admin: {
        description: "Imported markdown body. Used until the rich text field is edited.",
      },
    },
    {
      name: "category",
      type: "relationship",
      relationTo: "categories",
    },
    {
      name: "author",
      type: "relationship",
      relationTo: "authors",
    },
    {
      name: "relatedPosts",
      type: "relationship",
      relationTo: "posts",
      hasMany: true,
    },
    {
      name: "tags",
      type: "array",
      fields: [{ name: "tag", type: "text", required: true }],
    },
    {
      name: "publishDate",
      type: "date",
      admin: { position: "sidebar", date: { pickerAppearance: "dayOnly" } },
    },
    {
      name: "readMinutes",
      type: "number",
      admin: { position: "sidebar" },
    },
    {
      name: "coverPath",
      type: "text",
      admin: {
        position: "sidebar",
        description: "Existing site image path, for example /images/blog/cover.avif",
      },
    },
    {
      name: "cover",
      type: "upload",
      relationTo: "media",
      admin: { position: "sidebar" },
    },
    {
      name: "featured",
      type: "checkbox",
      defaultValue: false,
      admin: { position: "sidebar" },
    },
    {
      name: "boosted",
      type: "checkbox",
      defaultValue: true,
      admin: {
        position: "sidebar",
        description: "Boost this article above service pages in search and the sitemap.",
      },
    },
    {
      name: "searchPriority",
      type: "number",
      defaultValue: 40,
      min: 0,
      max: 100,
      admin: {
        position: "sidebar",
        description: "Blogs default to 40. Featured articles use 50. Service pages use 10.",
      },
    },
    uniqueTextField("slug"),
    uniqueTextField("path", {
      admin: {
        position: "sidebar",
        description: "Public path such as /blogs/article-slug. No trailing slash.",
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
          data.path = `/blogs/${data.slug}`;
        }
        return data;
      },
    ],
    afterChange: [revalidateAfterChange],
    afterDelete: [revalidateAfterDelete],
  },
};
