type MediaSize = { url?: unknown } | null | undefined;

type MediaRecord = {
  alt?: unknown;
  filename?: unknown;
  height?: unknown;
  mimeType?: unknown;
  sizes?: Record<string, MediaSize> | null;
  url?: unknown;
  width?: unknown;
};

/**
 * Disk uploads are not on Vercel. `/media/...` and `/api/media/file/...`
 * 404 there. Public blob URLs and site files under `/images` are fine.
 */
const LOCAL_MEDIA_PATH = /^\/media(\/|$)/;
const LOCAL_API_MEDIA_PATH = /^\/api\/media\/file(\/|$)/;
const SITE_HOSTS = new Set([
  "revivalhealthandwellnessgroup.com",
  "www.revivalhealthandwellnessgroup.com",
]);

export function isLocalMediaURL(value: string): boolean {
  const trimmed = value.trim();
  if (!trimmed || trimmed.startsWith("media/")) return trimmed.startsWith("media/");
  let path = trimmed;
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    try {
      path = new URL(trimmed).pathname;
    } catch {
      return false;
    }
  }
  return LOCAL_MEDIA_PATH.test(path) || LOCAL_API_MEDIA_PATH.test(path);
}

/** Root-relative `/images` paths so next/image serves the file on Vercel. */
export function publicImageSrc(value: string): string {
  const trimmed = value.trim();
  if (!trimmed || isLocalMediaURL(trimmed)) return "";
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    try {
      const parsed = new URL(trimmed);
      if (SITE_HOSTS.has(parsed.hostname) && parsed.pathname.startsWith("/images/")) {
        return `${parsed.pathname}${parsed.search}`;
      }
    } catch {
      return "";
    }
  }
  return trimmed;
}

function asUrl(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const url = publicImageSrc(value);
  return url || null;
}

export function asMediaRecord(value: unknown): MediaRecord | null {
  if (!value || typeof value !== "object") return null;
  return value as MediaRecord;
}

/**
 * Public URL for an uploaded media document.
 * Prefers the blob `url` the storage adapter writes, then sized variants.
 */
export function mediaPublicURL(media: unknown): string | null {
  if (typeof media === "string") return asUrl(media);
  const record = asMediaRecord(media);
  if (!record) return null;
  const sized = record.sizes;
  return (
    asUrl(record.url) ||
    asUrl(sized?.hero?.url) ||
    asUrl(sized?.card?.url) ||
    asUrl(sized?.thumbnail?.url)
  );
}

export function mediaAlt(media: unknown, fallback = ""): string {
  const record = asMediaRecord(media);
  if (record && typeof record.alt === "string" && record.alt.trim()) {
    return record.alt;
  }
  return fallback;
}

export function mediaDimensions(media: unknown): { width: number; height: number } {
  const record = asMediaRecord(media);
  const width = record && typeof record.width === "number" ? record.width : 1600;
  const height = record && typeof record.height === "number" ? record.height : 900;
  return {
    width: width > 0 ? width : 1600,
    height: height > 0 ? height : 900,
  };
}

export function mediaMimeType(media: unknown): string {
  const record = asMediaRecord(media);
  return record && typeof record.mimeType === "string" ? record.mimeType : "";
}

export function mediaFilename(media: unknown): string {
  const record = asMediaRecord(media);
  return record && typeof record.filename === "string" && record.filename
    ? record.filename
    : "Download";
}
