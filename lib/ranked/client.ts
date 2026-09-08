import {
  RANKED_CACHE_TAG,
  type RankedContentDetail,
  type RankedContentListItem,
  type RankedDetailResponse,
  type RankedListResponse,
  type RankedProject,
  type RankedProjectsResponse,
} from './types'

const RANKED_BASE = 'https://app.ranked.ai/api/v1'
const THIS_SITE_HOST = 'revivalhealthandwellnessgroup.com'

function rankedConfig() {
  return {
    apiKey: process.env.RANKED_API_KEY,
    projectId: process.env.RANKED_PROJECT_ID,
  }
}

export function isRankedConfigured(): boolean {
  const { apiKey, projectId } = rankedConfig()
  return Boolean(apiKey && projectId)
}

export function hasRankedApiKey(): boolean {
  return Boolean(rankedConfig().apiKey)
}

/** Never fetch another client's calendar onto this domain. */
function thisProjectId(projectId?: string): string | undefined {
  const configured = rankedConfig().projectId
  if (!configured) return undefined
  if (projectId && projectId !== configured) {
    console.error('[ranked] refused other-project fetch', projectId)
    return undefined
  }
  return configured
}

async function rankedGet<T>(path: string): Promise<T> {
  const { apiKey } = rankedConfig()
  if (!apiKey) throw new Error('RANKED_API_KEY is not set')

  const res = await fetch(`${RANKED_BASE}${path}`, {
    headers: { Authorization: `Bearer ${apiKey}` },
    next: { revalidate: 300, tags: [RANKED_CACHE_TAG] },
  })

  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`Ranked API ${res.status} ${path}: ${text.slice(0, 200)}`)
  }

  return res.json() as Promise<T>
}

function projectWebsite(project: RankedProject): string | null {
  return project.websiteUrl || project.website_url || null
}

export function isThisSiteProject(project: RankedProject): boolean {
  const raw = projectWebsite(project)
  if (!raw) return false
  try {
    return new URL(raw).hostname.replace(/^www\./, '') === THIS_SITE_HOST
  } catch {
    return raw.includes(THIS_SITE_HOST)
  }
}

export async function listRankedProjects(): Promise<RankedProject[]> {
  if (!hasRankedApiKey()) return []

  const items: RankedProject[] = []
  for (let offset = 0; offset < 500; offset += 50) {
    const json = await rankedGet<RankedProjectsResponse>(`/projects?limit=50&offset=${offset}`)
    const page = Array.isArray(json.data) ? json.data : []
    items.push(...page)
    if (page.length < 50) break
  }
  return items
}

export async function listRankedContent(projectId?: string, limit = 50): Promise<RankedContentListItem[]> {
  const id = thisProjectId(projectId)
  if (!id) return []

  const items: RankedContentListItem[] = []
  const pageSize = Math.min(limit, 50)
  for (let offset = 0; offset < 1000; offset += pageSize) {
    const json = await rankedGet<RankedListResponse>(
      `/projects/${id}/content?limit=${pageSize}&offset=${offset}`,
    )
    const page = Array.isArray(json.data) ? json.data : []
    items.push(...page)
    if (page.length < pageSize) break
  }
  return items
}

export async function getRankedContentDetail(
  contentId: string,
  projectId?: string,
): Promise<RankedContentDetail | null> {
  const id = thisProjectId(projectId)
  if (!id) return null

  const json = await rankedGet<RankedDetailResponse>(`/projects/${id}/content/${contentId}`)
  return json.data ?? null
}
