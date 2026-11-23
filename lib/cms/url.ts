const FALLBACK_ORIGIN = "https://revivalhealthandwellnessgroup.com";

/** Public origin. Localhost is only valid off Vercel. */
export function getServerURL(): string {
  const site = (process.env.NEXT_PUBLIC_SITE_URL || FALLBACK_ORIGIN).replace(
    /\/$/,
    "",
  );
  const configured = process.env.NEXT_PUBLIC_SERVER_URL?.replace(/\/$/, "");
  const isLocal =
    !configured ||
    configured.includes("localhost") ||
    configured.includes("127.0.0.1");

  if (process.env.VERCEL) return site;
  if (isLocal) return configured || "http://localhost:3000";
  return configured;
}

export function publicOrigins(): string[] {
  const origins = new Set<string>([
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "https://revivalhealthandwellnessgroup.com",
    "https://www.revivalhealthandwellnessgroup.com",
  ]);
  const site = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (site) origins.add(site);
  const server = process.env.NEXT_PUBLIC_SERVER_URL?.replace(/\/$/, "");
  if (server && !server.includes("localhost") && !server.includes("127.0.0.1")) {
    origins.add(server);
  }
  if (process.env.VERCEL_URL) origins.add(`https://${process.env.VERCEL_URL}`);
  return [...origins];
}

/** Store and query paths with a leading slash and no trailing slash. */
export function normalizePath(path: string): string {
  const bare = path.split("?")[0]?.split("#")[0] ?? "/";
  let normalized = bare.startsWith("/") ? bare : `/${bare}`;
  if (normalized.length > 1 && normalized.endsWith("/")) {
    normalized = normalized.slice(0, -1);
  }
  return normalized || "/";
}

export function absoluteURL(path: string): string {
  const origin = (
    process.env.NEXT_PUBLIC_SITE_URL || FALLBACK_ORIGIN
  ).replace(/\/$/, "");
  const normalized = normalizePath(path);
  if (normalized === "/") return `${origin}/`;
  return `${origin}${normalized}/`;
}
