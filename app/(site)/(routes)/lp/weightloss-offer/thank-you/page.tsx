import { cmsPageMetadata } from "@/lib/cms/generateMeta";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import LPHeader from "@/components/lp/LPHeader";
import LPFooter from "@/components/lp/LPFooter";
import WeightlossThankYouContent from "@/components/lp/WeightlossThankYouContent";
import MapSection from "@/components/layout/MapSection";

export async function generateMetadata() {
  const fallback = buildMetadata({
  title: "Thank You",
  description: "Thank you for requesting your $79 Weight Loss Experience.",
  path: "/lp/weightloss-offer/thank-you/",
  noIndex: true,
});
  return cmsPageMetadata(fallback);
}

export default function WeightlossOfferThankYouPage() {
  return (
    <>
      <LPHeader phone="+1 725-241-0010" />
      <WeightlossThankYouContent />
      <MapSection hidePhone />
      <LPFooter phone="+1 725-241-0010" />
    </>
  );
}
