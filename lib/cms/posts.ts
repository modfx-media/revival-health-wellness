import { cache } from "react";

import { BLOG_POSTS, type BlogPost } from "@/lib/content/blog";

import { cmsDocToBlogPost, mergeBlogPosts, publicBlogPosts, type CmsBlogSource } from "./blog-posts";
import { getCms, queryRoutedContentByPath, type CmsDoc } from "./queries";
import { withCMS } from "./safe";

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

export async function relatedJournalPosts(post: BlogPost, limit = 3): Promise<BlogPost[]> {
  const cmsPosts = await withCMS(() => listPublishedBlogPosts(), []);
  const pool = publicBlogPosts(mergeBlogPosts(BLOG_POSTS, cmsPosts)).filter(
    (item) => item.slug !== post.slug,
  );
  const same = pool.filter((item) => item.category === post.category);
  const rest = pool.filter((item) => item.category !== post.category);
  return [...same, ...rest].slice(0, limit);
}

export const loadPublishedBlog = cache(async (slug: string) => {
  const routed = await queryRoutedContentByPath(`/blogs/${slug}`);
  if (!routed) return null;
  const post = cmsDocToBlogPost(routed.doc as CmsBlogSource);
  if (!post || post.slug !== slug) return null;
  return { collection: routed.collection, doc: routed.doc, post };
});
