import { cache } from "react";

import type { BlogPost } from "@/lib/content/blog";

import { cmsDocToBlogPost, type CmsBlogSource } from "./blog-posts";
import { getCms, queryRoutedContentByPath, type CmsDoc } from "./queries";

export const listPublishedBlogPosts = cache(async (): Promise<BlogPost[]> => {
  const cms = await getCms();
  const docs: CmsDoc[] = [];
  let page = 1;

  while (page < 20) {
    const result = await cms.find({
      collection: "posts",
      depth: 1,
      draft: false,
      overrideAccess: false,
      limit: 100,
      page,
      sort: "-publishDate",
      where: {
        _status: { equals: "published" },
      },
    });
    docs.push(...(result.docs as CmsDoc[]));
    if (!result.hasNextPage) break;
    page += 1;
  }

  return docs
    .map((doc) => cmsDocToBlogPost(doc as CmsBlogSource))
    .filter((post): post is BlogPost => Boolean(post));
});

export const loadPublishedBlog = cache(async (slug: string) => {
  const routed = await queryRoutedContentByPath(`/blogs/${slug}`);
  if (!routed) return null;
  const post = cmsDocToBlogPost(routed.doc as CmsBlogSource);
  if (!post || post.slug !== slug) return null;
  return { collection: routed.collection, doc: routed.doc, post };
});
