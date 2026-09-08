import type { BlogPost } from '@/lib/content/blog'
import type { BlogPostData } from './types'

const STOP = new Set([
  'the',
  'a',
  'an',
  'in',
  'of',
  'for',
  'to',
  'and',
  'or',
  'with',
  'your',
  'how',
  'when',
  'what',
  'why',
  'vs',
  'over',
  'beyond',
  'into',
  'from',
  'that',
  'this',
  'las',
  'vegas',
  'henderson',
  'nv',
  'nevada',
  'guide',
  'explained',
  'options',
])

const KEEP = new Set(['ed', 'iv', 'prp', 'hrt', 'glp'])

const SINGLETON_BRANDS = new Set(['onda', 'xerf'])

function sharesBrand(a: Set<string>, b: Set<string>): boolean {
  for (const brand of SINGLETON_BRANDS) {
    if (a.has(brand) && b.has(brand)) return true
  }
  return false
}

function stem(word: string): string {
  if (word.endsWith('ies') && word.length > 5) return `${word.slice(0, -3)}y`
  if (word.endsWith('sses')) return word.slice(0, -2)
  if (word.endsWith('s') && !word.endsWith('ss') && word.length > 3) return word.slice(0, -1)
  return word
}

function titleTokens(title: string): Set<string> {
  return new Set(
    title
      .toLowerCase()
      .replace(/['’]/g, '')
      .replace(/[^a-z0-9]+/g, ' ')
      .split(/\s+/)
      .filter((w) => (w.length > 2 || KEEP.has(w)) && !STOP.has(w))
      .map(stem),
  )
}

function slugTokens(slug: string): Set<string> {
  return titleTokens(slug.replace(/-/g, ' '))
}

function overlapScore(a: Set<string>, b: Set<string>): number {
  if (a.size === 0 || b.size === 0) return 0
  let shared = 0
  for (const word of a) if (b.has(word)) shared += 1
  return shared / Math.min(a.size, b.size)
}

/** Skip Ranked imports that are the same article as a compiled local post. */
export function isDuplicatePost(
  rankedTitle: string,
  localPosts: Array<{ title: string; slug: string }>,
): boolean {
  const ranked = titleTokens(rankedTitle)
  const rankedSlug = slugTokens(rankedTitle)
  if (ranked.size === 0) return false
  for (const local of localPosts) {
    const locTitle = titleTokens(local.title)
    const locSlug = slugTokens(local.slug)
    if (overlapScore(ranked, locTitle) >= 0.5) return true
    if (overlapScore(ranked, locSlug) >= 0.62) return true
    if (overlapScore(rankedSlug, locSlug) >= 0.7) return true
    if (sharesBrand(ranked, locSlug) || sharesBrand(ranked, locTitle)) return true
  }
  return false
}

export function inferCategory(title: string): BlogPost['category'] {
  const t = title.toLowerCase()
  if (/weight|semaglutide|tirzepatide|ozempic|glp|diet|plateau|hungry|metabolism/.test(t)) {
    return 'Weight Loss'
  }
  if (/hormone|hrt|testosterone|estrogen|menopause|imbalance/.test(t)) {
    return 'Hormone Therapy'
  }
  if (/\bed\b|erectile|viagra|trimix|p-?shot|sexual|gainswave|priapus/.test(t)) {
    return 'Sexual Wellness'
  }
  if (/iv |hydration|vitamin|hangover|booster/.test(t)) return 'IV Hydration'
  if (
    /botox|xerf|onda|filler|wrinkle|aesthet|skin|emsculpt|emsella|hair|prp|laser|dysport/.test(t)
  ) {
    return 'Aesthetics'
  }
  return 'Wellness'
}

export function rankedToBlogPost(data: BlogPostData): BlogPost {
  const words = [
    data.intro,
    ...data.sections.flatMap((section) => section.body),
  ]
    .join(' ')
    .split(/\s+/)
    .filter(Boolean).length

  return {
    slug: data.slug,
    title: data.title,
    excerpt: data.metaDescription || data.intro,
    category: inferCategory(data.title),
    date: data.publishDate,
    publishDate: data.publishDate,
    readMinutes: Math.max(4, Math.round(words / 200) || 5),
    cover: data.coverImage,
    author: {
      name: 'Revival Health & Wellness',
      role: 'Medical Team',
    },
    intro: data.intro,
    body: data.sections.map((section) => ({
      heading: section.heading,
      paragraphs: section.body,
    })),
    metaDescription: data.metaDescription,
    tags: [inferCategory(data.title), 'Las Vegas'],
  }
}

export function withUniqueListingFields(posts: BlogPost[]): Array<
  BlogPost & { publishDate: string; coverImage: string }
> {
  return posts.map((post) => ({
    ...post,
    publishDate: (post.publishDate ?? post.date).slice(0, 10),
    coverImage: post.cover,
  }))
}

export function fromUniqueListingFields(
  posts: Array<BlogPost & { publishDate: string; coverImage: string }>,
): BlogPost[] {
  return posts.map(({ coverImage, ...post }) => ({
    ...post,
    date: post.publishDate,
    publishDate: post.publishDate,
    cover: coverImage,
  }))
}

export function relatedFromPosts(posts: BlogPost[], slug: string, limit = 3): BlogPost[] {
  const source = posts.find((p) => p.slug === slug)
  const rest = posts.filter((p) => p.slug !== slug)
  if (!source) return rest.slice(0, limit)
  return rest
    .filter((p) => p.category === source.category)
    .concat(rest.filter((p) => p.category !== source.category))
    .slice(0, limit)
}
