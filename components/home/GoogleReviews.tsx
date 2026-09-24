import type { ReactNode } from "react";
import { getDisplayedGoogleReviews, type GoogleReviewsPayload } from "@/lib/google-reviews";

/** Async server wrapper: fetches live Google reviews once, passes to a client render-prop child. */
export async function GoogleReviews({
  children,
}: {
  children: (payload: GoogleReviewsPayload) => ReactNode;
}) {
  const payload = await getDisplayedGoogleReviews();
  return children(payload);
}
