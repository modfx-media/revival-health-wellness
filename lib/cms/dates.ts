/** Las Vegas clinic calendar. Publish days are calendar dates, not UTC instants. */
const CLINIC_TIME_ZONE = "America/Los_Angeles";

/** `YYYY-MM-DD` from a date-only value or an ISO timestamp, without shifting the day. */
export function blogCalendarDay(value: string | null | undefined): string | null {
  if (!value) return null;
  const match = /^(\d{4}-\d{2}-\d{2})/.exec(value.trim());
  return match?.[1] ?? null;
}

/**
 * Format the stored calendar day. Date-only strings and UTC midnight must not
 * render as the previous day in US timezones.
 */
export function formatBlogDate(
  value: string | null | undefined,
  month: "short" | "long" = "short",
): string {
  const day = blogCalendarDay(value);
  if (!day) return "";
  const [year, monthNum, date] = day.split("-").map(Number);
  if (!year || !monthNum || !date) return "";
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "UTC",
    year: "numeric",
    month,
    day: "numeric",
  }).format(new Date(Date.UTC(year, monthNum - 1, date)));
}

export function clinicCalendarDay(now = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: CLINIC_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}

/** True when the post's calendar day is still after today in Las Vegas. */
export function isFutureBlogDate(
  value: string | null | undefined,
  now = new Date(),
): boolean {
  const day = blogCalendarDay(value);
  if (!day) return false;
  return day > clinicCalendarDay(now);
}
