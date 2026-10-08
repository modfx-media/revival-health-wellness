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

/** Local disk uploads 404 on Vercel. Public blob and Payload file URLs are fine. */
const LOCAL_MEDIA_PATH = /^\/media(\/|$)/;

function asUrl(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const url = value.trim();
  if (!url || LOCAL_MEDIA_PATH.test(url)) return null;
  return url;
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
