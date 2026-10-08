import BlogPostContent from "@/components/blog/BlogPostContent";
import { ArticleRichText } from "@/components/blog/ArticleRichText";
import { breadcrumbSchema, jsonLd } from "@/lib/schema";
import { BLOG_POSTS, type BlogPost } from "@/lib/content/blog";
import { cmsDocToBlogPost, hasLexicalContent, mergeBlogPosts, type CmsBlogSource } from "@/lib/cms/blog-posts";
import { listPublishedBlogPosts } from "@/lib/cms/posts";
import type { CmsDoc } from "@/lib/cms/queries";
import { withCMS } from "@/lib/cms/safe";
import { SITE } from "@/lib/metadata";

const LIVE_ORIGIN = "https://revivalhealthandwellnessgroup.com";
const LOGO_URL = `${LIVE_ORIGIN}/wp-content/uploads/2025/08/66ce476cca1ded6cc6d21cdc_revival-dark-ver-2@3x-p-1080-3.png`;

async function relatedPosts(post: BlogPost): Promise<BlogPost[]> {
  const cmsPosts = await withCMS(() => listPublishedBlogPosts(), []);
  const pool = mergeBlogPosts(BLOG_POSTS, cmsPosts).filter((item) => item.slug !== post.slug);
  const same = pool.filter((item) => item.category === post.category);
  const rest = pool.filter((item) => item.category !== post.category);
  return [...same, ...rest].slice(0, 3);
}

export async function DesignedCmsArticle({ doc }: { doc: CmsDoc }) {
  const post = cmsDocToBlogPost(doc as CmsBlogSource);
  if (!post) return null;

  const related = await relatedPosts(post);
  const canonical = post.canonical ?? `${LIVE_ORIGIN}/blogs/${post.slug}/`;
  const description = post.metaDescription ?? post.excerpt;
  const published = post.publishDate ?? post.date;
  const image =
    post.ogImage ||
    (post.cover
      ? post.cover.startsWith("http")
        ? post.cover
        : new URL(post.cover, SITE.url).toString()
      : undefined);

  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description,
    ...(image ? { image } : {}),
    datePublished: published,
    dateModified: published,
    author: {
      "@type": "Person",
      name: post.author?.name ?? "Revival Health & Wellness",
      jobTitle: post.author?.role ?? "Medical Team",
      worksFor: {
        "@type": "MedicalBusiness",
        name: "Revival Health and Wellness",
      },
    },
    publisher: {
      "@type": "Organization",
      name: "Revival Health and Wellness",
      logo: { "@type": "ImageObject", url: LOGO_URL },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
    url: canonical,
    inLanguage: "en-US",
    keywords: post.tags?.join(", "),
    articleSection: post.category,
    isPartOf: {
      "@type": "Blog",
      name: "Revival Health & Wellness Blog",
      url: `${LIVE_ORIGIN}/blogs/`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd([
            blogPostingSchema,
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Blog", path: "/blogs/" },
              { name: post.title, path: `/blogs/${post.slug}/` },
            ]),
          ]),
        }}
      />
      <BlogPostContent post={post} related={related}>
        {hasLexicalContent(doc.content) ? <ArticleRichText data={doc.content} /> : null}
      </BlogPostContent>
    </>
  );
}
