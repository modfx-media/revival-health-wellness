import { BlobNotFoundError, head, put } from '@vercel/blob'
import { COMMITTED_COVER_SLUGS, coverPrompt } from './config'

type PhotoPool = { match: RegExp; photos: readonly string[] }

/**
 * Title-matched Unsplash pools. Ranked items have no featured image;
 * these photos are the web fallback when AI generation is unavailable.
 */
const COVER_POOLS: readonly PhotoPool[] = [
  {
    match:
      /semaglutide|tirzepatide|ozempic|glp-?1|weight loss|weight-loss|diet|plateau|belly fat|hungry|metabolism|inflammation/i,
    photos: [
      'photo-1490645935967-10de6ba17061',
      'photo-1517836357463-d25dfeac3438',
      'photo-1571019614242-c5c5dee9f50b',
      'photo-1498837167922-ddd27525d352',
      'photo-1483721310020-03333e2acfb2',
      'photo-1512621776951-a57141f2eefd',
    ],
  },
  {
    match: /hormone|hrt|testosterone|estrogen|menopause|imbalance|40s|50s/i,
    photos: [
      'photo-1576091160399-112ba8d25d1d',
      'photo-1579684385127-1ef15d508118',
      'photo-1576091160550-2173dba999ef',
      'photo-1559757148-5c350d0d3c56',
      'photo-1582719478250-c89cae4dc85b',
    ],
  },
  {
    match: /\bed\b|erectile|viagra|trimix|p-?shot|sexual|gainswave|priapus|performance anxiety/i,
    photos: [
      'photo-1576091160399-112ba8d25d1d',
      'photo-1551836022-d5d88e9218df',
      'photo-1573497019940-1c28c88b4f3e',
      'photo-1600880292203-757bb62b4baf',
      'photo-1554224155-6726b3ff858f',
    ],
  },
  {
    match: /botox|wrinkle|migraine|tmj|jaw|gummy|dysport|xeomin|filler|aesthet/i,
    photos: [
      'photo-1570172619644-dfd03ed5d881',
      'photo-1487412947147-5cebf100ffc2',
      'photo-1616391182219-e080b4d1043a',
      'photo-1515377905703-c4788e51af15',
      'photo-1560750588-73207b1ef5bf',
    ],
  },
  {
    match: /hair|prp|transplant|bald/i,
    photos: [
      'photo-1560066984-138dadb4c035',
      'photo-1522337360788-8b13dee7a37e',
      'photo-1595475038665-8de2a4b72bb2',
      'photo-1521590832167-7bcbfaa6381f',
    ],
  },
  {
    match: /iv |hydration|vitamin|injection|hangover|booster/i,
    photos: [
      'photo-1559757175-0eb30cd8c063',
      'photo-1579684385127-1ef15d508118',
      'photo-1584982751601-97dcc096659c',
      'photo-1576091160399-112ba8d25d1d',
      'photo-1582719478250-c89cae4dc85b',
    ],
  },
  {
    match: /xerf|skin tight|coolpeel|laser|co2|tetra/i,
    photos: [
      'photo-1544161515-4ab6ce6db874',
      'photo-1515377905703-c4788e51af15',
      'photo-1540555700478-4be289fbecef',
      'photo-1570172619644-dfd03ed5d881',
      'photo-1616391182219-e080b4d1043a',
    ],
  },
  {
    match: /onda|emsculpt|emsella|body contour/i,
    photos: [
      'photo-1571019613454-1cb2f99b2d8b',
      'photo-1519823551278-64ac92734f1a',
      'photo-1544161515-4ab6ce6db874',
      'photo-1517836357463-d25dfeac3438',
    ],
  },
]

const FALLBACK_UNSPLASH = [
  'photo-1576091160399-112ba8d25d1d',
  'photo-1559757148-5c350d0d3c56',
  'photo-1579684385127-1ef15d508118',
  'photo-1551836022-d5d88e9218df',
  'photo-1582750433449-648ed127bb54',
  'photo-1570172619644-dfd03ed5d881',
  'photo-1487412947147-5cebf100ffc2',
  'photo-1490645935967-10de6ba17061',
  'photo-1517836357463-d25dfeac3438',
  'photo-1560066984-138dadb4c035',
  'photo-1544161515-4ab6ce6db874',
  'photo-1559757175-0eb30cd8c063',
  'photo-1616391182219-e080b4d1043a',
  'photo-1582719478250-c89cae4dc85b',
  'photo-1515377905703-c4788e51af15',
] as const

function coverPngPath(contentId: string): string {
  return `blog-covers/${contentId}.png`
}

function coverJpgPath(contentId: string): string {
  return `blog-covers/${contentId}.jpg`
}

function committedCoverUrl(slug?: string): string | null {
  if (!slug) return null
  return COMMITTED_COVER_SLUGS.includes(slug) ? `/images/blog/covers/${slug}.png` : null
}

function hashSlug(slug: string): number {
  let hash = 0
  for (let i = 0; i < slug.length; i++) hash = (hash * 31 + slug.charCodeAt(i)) >>> 0
  return hash
}

function unsplashUrl(photoId: string): string {
  return `https://images.unsplash.com/${photoId}?w=1200&q=80&fit=crop`
}

function picsumUrl(slug: string): string {
  return `https://picsum.photos/seed/${encodeURIComponent(`revival-${slug}`)}/1200/630`
}

function poolForTitle(title?: string): readonly string[] {
  if (title) {
    for (const pool of COVER_POOLS) {
      if (pool.match.test(title)) return pool.photos
    }
  }
  return FALLBACK_UNSPLASH
}

export function uniqueWebCoverUrl(
  slug: string,
  reserved: Set<string> = new Set(),
  title?: string,
): string {
  const pool = poolForTitle(title || slug)
  const start = hashSlug(slug) % pool.length
  for (let i = 0; i < pool.length; i++) {
    const url = unsplashUrl(pool[(start + i) % pool.length])
    if (!reserved.has(url)) return url
  }
  for (let i = 0; i < FALLBACK_UNSPLASH.length; i++) {
    const url = unsplashUrl(FALLBACK_UNSPLASH[(start + i) % FALLBACK_UNSPLASH.length])
    if (!reserved.has(url)) return url
  }
  let seed = slug
  let n = 0
  let url = picsumUrl(seed)
  while (reserved.has(url) && n < 50) {
    n += 1
    seed = `${slug}-${n}`
    url = picsumUrl(seed)
  }
  return url
}

function imageModels(): string[] {
  const preferred = process.env.OPENAI_IMAGE_MODEL?.trim()
  const models = [preferred, 'gpt-image-2', 'gpt-image-1'].filter((m): m is string => Boolean(m))
  return [...new Set(models)]
}

async function existingBlobUrl(contentId: string): Promise<string | null> {
  if (!process.env.BLOB_READ_WRITE_TOKEN && !process.env.VERCEL) return null
  for (const pathname of [coverPngPath(contentId), coverJpgPath(contentId)]) {
    try {
      const meta = await head(pathname)
      if (meta.url) return meta.url
    } catch (err) {
      if (!(err instanceof BlobNotFoundError)) return null
    }
  }
  return null
}

async function persistBuffer(
  pathname: string,
  bytes: Buffer,
  contentType: string,
): Promise<string | null> {
  if (!process.env.BLOB_READ_WRITE_TOKEN && !process.env.VERCEL) return null
  const blob = await put(pathname, bytes, {
    access: 'public',
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType,
  })
  return blob.url
}

async function generatePng(title: string): Promise<Buffer | null> {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) return null
  const prompt = coverPrompt(title)
  let lastError = ''
  for (const model of imageModels()) {
    const res = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ model, prompt, size: '1536x1024', quality: 'medium', n: 1 }),
    })
    const text = await res.text()
    if (!res.ok) {
      lastError = `${model} ${res.status}: ${text.slice(0, 240)}`
      continue
    }
    const json = JSON.parse(text) as { data?: Array<{ url?: string; b64_json?: string }> }
    const row = json.data?.[0]
    if (row?.b64_json) return Buffer.from(row.b64_json, 'base64')
    if (row?.url) {
      const img = await fetch(row.url)
      if (img.ok) return Buffer.from(await img.arrayBuffer())
    }
  }
  console.error(`[ranked] OpenAI cover generation exhausted: ${lastError}`)
  return null
}

export async function getRankedCoverImage(input: {
  contentId: string
  title: string
  generate: boolean
  slug?: string
  reservedUrls?: Set<string>
}): Promise<string> {
  const slug = input.slug ?? input.contentId
  const reserved = input.reservedUrls ?? new Set<string>()

  const committed = committedCoverUrl(input.slug)
  if (committed) {
    reserved.add(committed)
    return committed
  }

  const cached = await existingBlobUrl(input.contentId)
  if (cached) {
    reserved.add(cached)
    return cached
  }

  const webUrl = uniqueWebCoverUrl(slug, reserved, input.title)
  if (!input.generate) {
    reserved.add(webUrl)
    return webUrl
  }

  try {
    const png = await generatePng(input.title)
    if (png) {
      const url = await persistBuffer(coverPngPath(input.contentId), png, 'image/png')
      if (url) {
        reserved.add(url)
        return url
      }
    }

    const sourceUrl = uniqueWebCoverUrl(slug, reserved, input.title)
    const img = await fetch(sourceUrl)
    if (img.ok) {
      const bytes = Buffer.from(await img.arrayBuffer())
      const persisted = await persistBuffer(coverJpgPath(input.contentId), bytes, 'image/jpeg')
      const url = persisted || sourceUrl
      reserved.add(url)
      return url
    }
  } catch (err) {
    console.error(`[ranked] cover failed for ${input.contentId}`, err)
  }

  reserved.add(webUrl)
  return webUrl
}

export function ensureUniqueCoverImages<
  T extends { slug: string; coverImage: string; title?: string },
>(posts: T[]): T[] {
  const used = new Set<string>()
  return posts.map((post) => {
    let cover = post.coverImage
    if (!cover || used.has(cover)) cover = uniqueWebCoverUrl(post.slug, used, post.title)
    used.add(cover)
    return cover === post.coverImage ? post : { ...post, coverImage: cover }
  })
}
