/**
 * A down database must never 500 the public site. Designed pages stay up.
 * `/admin` and `/api` do not use this wrapper — those should fail loudly.
 */
export async function withCMS<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  if (!process.env.DATABASE_URL || !process.env.PAYLOAD_SECRET) return fallback;
  try {
    return await fn();
  } catch (error) {
    console.error("[cms]", error);
    return fallback;
  }
}
