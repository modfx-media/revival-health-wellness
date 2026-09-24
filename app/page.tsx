import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import MarqueeStrip from "@/components/home/MarqueeStrip";
import ServicesGrid from "@/components/home/ServicesGrid";
import ApproachSection from "@/components/home/ApproachSection";
import PhilosophySection from "@/components/home/PhilosophySection";
import SignatureSection from "@/components/home/SignatureSection";
import BodyTransformSection from "@/components/home/BodyTransformSection";
import PricingSection from "@/components/home/PricingSection";
import FinancingSection from "@/components/home/FinancingSection";
import WhyChooseSection from "@/components/home/WhyChooseSection";
import GalleryCarousel from "@/components/home/GalleryCarousel";
import BlogsSection from "@/components/home/BlogsSection";
import GoogleReviewsSection from "@/components/lp/GoogleReviewsSection";
import CTASection from "@/components/home/CTASection";
import PlanOfferSection from "@/components/home/PlanOfferSection";
import ProviderSnippetSection from "@/components/home/ProviderSnippetSection";
import ContactFormSection from "@/components/home/ContactFormSection";
import MapSection from "@/components/layout/MapSection";
import { buildMetadata } from "@/lib/metadata";
import { getDisplayedGoogleReviews } from "@/lib/google-reviews";

export const metadata: Metadata = buildMetadata({
  title: "Las Vegas Medical Spa & Wellness",
  description:
    "Revival Health and Wellness offers weight loss, hormone therapy, sexual wellness, and aesthetics in Las Vegas. Revitalize, rebalance, and reveal your best self.",
  path: "/",
});

export default async function Home() {
  const { reviews, meta } = await getDisplayedGoogleReviews();

  return (
    <>
      <HeroSection
        reviewRating={meta.rating}
        reviewCount={meta.reviewCount}
        reviewsUrl={meta.reviewsUrl}
      />
      <MarqueeStrip />
      <ServicesGrid />
      <PhilosophySection />
      <ApproachSection />
      <SignatureSection />
      <BodyTransformSection />
      <ProviderSnippetSection />
      <FinancingSection />
      <WhyChooseSection />
      <GalleryCarousel />
      <PricingSection />
      <BlogsSection />
      <GoogleReviewsSection reviews={reviews} meta={meta} />
      <CTASection />
      <PlanOfferSection />
      <ContactFormSection />
      <MapSection />
    </>
  );
}
