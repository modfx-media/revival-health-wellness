import type { Metadata } from "next";
import { cmsPageMetadata } from "@/lib/cms/generateMeta";
import { SITE } from "@/lib/metadata";
import { breadcrumbSchema, jsonLd } from "@/lib/schema";
import WeightLossPageContent from "@/components/weight-loss/WeightLossPageContent";

const TITLE = "Medical Weight Loss Clinic";
const PATH = "/weight-loss/";
const DESCRIPTION =
  "Reach your goals at our weight loss clinic in Summerlin and Henderson. Revival Health and Wellness provides the support you need to lose weight and keep it off.";
const CANONICAL = new URL(PATH, SITE.url).toString();
const FULL_TITLE = `${TITLE} | ${SITE.name}`;

export async function generateMetadata(): Promise<Metadata> {
  const fallback: Metadata = {
    title: { absolute: FULL_TITLE },
    description: DESCRIPTION,
    metadataBase: new URL(SITE.url),
    alternates: { canonical: CANONICAL },
    robots: { index: true, follow: true },
    openGraph: {
      title: FULL_TITLE,
      description: DESCRIPTION,
      url: CANONICAL,
      siteName: SITE.name,
      type: "website",
      locale: SITE.locale,
      images: [{ url: "/images/og-default.jpg", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: FULL_TITLE,
      description: DESCRIPTION,
      creator: SITE.twitter,
    },
  };
  return cmsPageMetadata(fallback, PATH);
}

/**
 * MedicalBusiness JSON-LD tailored to the weight-loss service. Complements the
 * global organization schema emitted from the root layout with page-specific
 * URL, description, medicalSpecialty, and map link.
 */
const weightLossSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  name: "Revival Health and Wellness",
  url: CANONICAL,
  description:
    "Medical weight loss clinic in Las Vegas offering GLP-1, Phentermine, and Vitamin Injections.",
  medicalSpecialty: "Weight Loss",
  address: {
    "@type": "PostalAddress",
    streetAddress: "7220 S. Cimarron Road, Suite #140",
    addressLocality: "Las Vegas",
    addressRegion: "NV",
    postalCode: "89113",
  },
  telephone: "(702) 963-1154",
  hasMap:
    "https://www.google.com/maps?q=7220+S.+Cimarron+Road+Suite+140+Las+Vegas+NV",
};

export default function WeightLossPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd([
            weightLossSchema,
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Weight Loss", path: PATH },
            ]),
          ]),
        }}
      />
      <WeightLossPageContent />
    </>
  );
}
