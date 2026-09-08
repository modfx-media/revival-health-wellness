import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SITE } from "@/lib/metadata";
import { breadcrumbSchema, jsonLd } from "@/lib/schema";
import type { BlogPost } from "@/lib/content/blog";
import {
  getPublishedBlogPost,
  getPublishedBlogSlugs,
  getRelatedPublishedPosts,
} from "@/lib/ranked/posts";
import BlogPostContent from "@/components/blog/BlogPostContent";

export const revalidate = 3600;
export const dynamicParams = true;

const LIVE_ORIGIN = "https://revivalhealthandwellnessgroup.com";
const LOGO_URL = `${LIVE_ORIGIN}/wp-content/uploads/2025/08/66ce476cca1ded6cc6d21cdc_revival-dark-ver-2@3x-p-1080-3.png`;

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  const slugs = await getPublishedBlogSlugs().catch(() => []);
  return slugs.map((slug) => ({ slug }));
}

/** Prefer live-site fields when available, fall back to sensible defaults. */
function resolvePost(post: BlogPost) {
  const canonical = post.canonical ?? `${LIVE_ORIGIN}/${post.slug}/`;
  const ogImage =
    post.ogImage ??
    (post.cover.startsWith("http")
      ? post.cover
      : new URL(post.cover, SITE.url).toString());
  const metaTitle = post.metaTitle ?? post.title;
  const metaDescription = post.metaDescription ?? post.excerpt;
  const publishDate = post.publishDate ?? post.date;
  return { canonical, ogImage, metaTitle, metaDescription, publishDate };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedBlogPost(slug);
  if (!post) return { title: "Article not found" };

  const { canonical, ogImage, metaTitle, metaDescription, publishDate } =
    resolvePost(post);
  const fullTitle = `${metaTitle} | ${SITE.name}`;

  return {
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
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = await getPublishedBlogPost(slug);
  if (!post) notFound();

  const related = await getRelatedPublishedPosts(slug);
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
