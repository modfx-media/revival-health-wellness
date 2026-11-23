/** A preview target must be a real public pathname. Never `/blog/null`. */
export function isPublicPath(path: unknown): path is string {
  if (typeof path !== "string" || path.length === 0) return false;
  if (!path.startsWith("/")) return false;
  if (
    path.includes("//") ||
    path.includes("?") ||
    path.includes("#") ||
    path.includes("\\")
  ) {
    return false;
  }
  if (path === "/") return true;

  const segments = path.split("/").filter((segment) => segment.length > 0);
  if (segments.length === 0) return false;
  return segments.every(
    (segment) =>
      segment !== "null" &&
      segment !== "undefined" &&
      segment !== "." &&
      segment !== "..",
  );
}

export function generatePreviewPath({
  path,
}: {
  path: unknown;
}): string | null {
  const secret = process.env.PREVIEW_SECRET;
  if (!secret || !isPublicPath(path)) return null;
  const params = new URLSearchParams({
    path,
    previewSecret: secret,
  });
  return `/next/preview?${params.toString()}`;
}

export function previewFromPath(path: unknown): string | null {
  return generatePreviewPath({ path });
}
