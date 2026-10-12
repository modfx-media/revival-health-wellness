/** Paid-ad landing routes that use minimal chrome (no site nav/footer). */
export function isAdLanding(pathname: string | null | undefined): boolean {
  if (!pathname) return false;
  return pathname.startsWith("/lp") || pathname.startsWith("/onda-pro");
}
