import type { Metadata } from "next";
import { cmsPageMetadata } from "@/lib/cms/generateMeta";
import { loadPublishedBlog } from "@/lib/cms/posts";
import { withCMS } from "@/lib/cms/safe";
import { notFound } from "next/navigation";
import { SITE } from "@/lib/metadata";
import { breadcrumbSchema, jsonLd } from "@/lib/schema";
import {
  BLOG_POSTS,
  getPostBySlug,
  getRelatedPosts,
  type BlogPost,
} from "@/lib/content/blog";
import BlogPostContent from "@/components/blog/BlogPostContent";
import { DesignedCmsArticle } from "@/components/cms/DesignedCmsArticle";

const LIVE_ORIGIN = "https://revivalhealthandwellnessgroup.com";
const LOGO_URL = `${LIVE_ORIGIN}/wp-content/uploads/2025/08/66ce476cca1ded6cc6d21cdc_revival-dark-ver-2@3x-p-1080-3.png`;

type Params = { slug: string };

/** Pre-build a local detail page for every designed post. */
export function generateStaticParams(): Params[] {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

/** Published CMS slugs that are not in the designed list still render. */
export const dynamicParams = true;
export const revalidate = 60;

/** Prefer live-site fields when available, fall back to sensible defaults. */
function resolvePost(post: BlogPost) {
  const canonical = post.canonical ?? `${LIVE_ORIGIN}/${post.slug}/`;
  const ogImage =
    post.ogImage ||
    (post.cover
      ? post.cover.startsWith("http")
        ? post.cover
        : new URL(post.cover, SITE.url).toString()
      : `${SITE.url}/images/home/approach-2.jpg`);
  const metaTitle = post.metaTitle ?? post.title;
  const metaDescription = post.metaDescription ?? post.excerpt;
  const publishDate = post.publishDate ?? post.date;
  return { canonical, ogImage, metaTitle, metaDescription, publishDate };
}

async function publishedOrDesigned(slug: string): Promise<BlogPost | undefined> {
  const published = await withCMS(() => loadPublishedBlog(slug), null);
  return published?.post ?? getPostBySlug(slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await publishedOrDesigned(slug);
  if (!post) {
    return { title: "Article not found", robots: { index: false, follow: true } };
  }

  const { canonical, ogImage, metaTitle, metaDescription, publishDate } =
    resolvePost(post);
  const fullTitle = `${metaTitle} | ${SITE.name}`;

  return cmsPageMetadata({
    title: { absolute: fullTitle },
    description: metaDescription,
    metadataBase: new URL(SITE.url),
    alternates: { canonical },
    openGraph: {
      title: fullTitle,
      description: metaDescription,
      url: canonical,
      siteName: SITE.name,
      type: "article",
      locale: SITE.locale,
      publishedTime: publishDate,
      authors: post.author?.name ? [post.author.name] : undefined,
      tags: post.tags,
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: metaDescription,
      images: [ogImage],
      creator: SITE.twitter,
    },
  }, `/blogs/${slug}`);
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const published = await withCMS(() => loadPublishedBlog(slug), null);
  if (published) {
    return <DesignedCmsArticle doc={published.doc} />;
  }

  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedPosts(slug);
  const { canonical, ogImage, metaDescription, publishDate } =
    resolvePost(post);

  const blogPostingSchema = post.schema ?? {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: metaDescription,
    image: ogImage,
    datePublished: publishDate,
    dateModified: publishDate,
    author: {
      "@type": "Person",
      name: post.author?.name ?? "Radford Raquedan",
      jobTitle: post.author?.role ?? "Nurse Practitioner",
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
      <BlogPostContent post={post} related={related} />
    </>
  );
}
