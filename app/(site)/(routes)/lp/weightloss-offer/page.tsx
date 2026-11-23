import { cmsPageMetadata } from "@/lib/cms/generateMeta";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import LPHeader from "@/components/lp/LPHeader";
import LPFooter from "@/components/lp/LPFooter";
import WeightlossOfferLanding from "@/components/lp/WeightlossOfferLanding";

// Ads-only landing page for Meta campaigns - intentionally excluded from
// app/sitemap.ts and marked noindex so it never competes with the organic
// /weight-loss/ service page in search.
export async function generateMetadata() {
  const fallback = buildMetadata({
  title: "$79 Weight Loss Experience (A $250 Value)",
  description:
    "Comprehensive wellness consultation, Styku 3D body scan, and a complimentary Lipolean injection for $79, a $250 value. Limited to the first 5 new patients.",
  path: "/lp/weightloss-offer/",
  noIndex: true,
});
  return cmsPageMetadata(fallback);
}

export default function WeightlossOfferLandingPage() {
  return (
    <>
      <LPHeader phone="+1 725-241-0010" />
      <WeightlossOfferLanding />
      <LPFooter phone="+1 725-241-0010" />
    </>
  );
}
