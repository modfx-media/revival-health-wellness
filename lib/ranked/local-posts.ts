import { BLOG_POSTS, type BlogPost } from '@/lib/content/blog'
import { DEFAULT_CTA } from './config'
import type { BlogPostData } from './types'

function localToRankedShape(post: BlogPost): BlogPostData {
  return {
    slug: post.slug,
    title: post.title,
    metaDescription: post.metaDescription ?? post.excerpt,
    h1: post.title,
    publishDate: (post.publishDate ?? post.date).slice(0, 10),
    intro: post.intro ?? post.excerpt,
    coverImage: post.cover,
    coverAlt: post.title,
    sections: (post.body ?? []).map((section) => ({
      heading: section.heading || post.title,
      body: section.paragraphs,
    })),
    cta: DEFAULT_CTA,
  }
}

/** Existing compiled posts win on slug / title collision. */
export function getLocalBlogPosts(): BlogPostData[] {
  return BLOG_POSTS.map(localToRankedShape)
}

export function getLocalBlogPostRecords(): BlogPost[] {
  return BLOG_POSTS
}
