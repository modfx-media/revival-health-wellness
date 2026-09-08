export const SITE_ORIGIN = (
  process.env.SITE_ORIGIN || 'https://revivalhealthandwellnessgroup.com'
).replace(/\/$/, '')

export const DEFAULT_COVER = '/images/blog/default-cover.jpg'
export const DEFAULT_COVER_ALT = 'Revival Health & Wellness journal'

export const DEFAULT_CTA = {
  label: 'Book a consultation',
  href: '/contact-us/',
}

/** Cover prompt for Revival Health. No patient faces / medical gore. */
export function coverPrompt(title: string): string {
  return [
    'Editorial photograph, 16:9 landscape, premium medical-spa brand photography.',
    'Warm cream, gold, and charcoal palette. Calm Las Vegas wellness clinic, luxury not clinical sterile.',
    `The image must clearly match this article title: ${title.slice(0, 160)}.`,
    'Show the real subject of the title (treatment setting, wellness ritual, skincare, fitness, or hormone-health atmosphere).',
    'No patient faces, no medical gore, no needles entering skin, no blood, no nudity.',
    'No text, no letters, no logos, no captions, no readable signage.',
    'Cinematic lighting, sharp, no grain, no watermark.',
  ].join(' ')
}

/**
 * Slugs that already have a committed file at /images/blog/covers/{slug}.png
 * List only. Do not fs.stat public/ — that packs images into the cron bundle.
 */
export const COMMITTED_COVER_SLUGS: readonly string[] = []
