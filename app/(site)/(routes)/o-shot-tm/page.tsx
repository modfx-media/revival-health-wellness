import { cmsPageMetadata } from "@/lib/cms/generateMeta";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { serviceSchema, breadcrumbSchema, jsonLd } from "@/lib/schema";
import OShotPageContent from "@/components/sexual-wellness/OShotPageContent";

const SLUG = "o-shot-tm";
const TITLE = "O-Shot® (Orgasm Shot®) PRP Therapy";
const DESCRIPTION =
  "Improve your sensitivity & health w/ O-Shot treatment in Las Vegas. Revival Health and Wellness offers the O-Shot™ to enhance pleasure, function, and confidence.";

export async function generateMetadata() {
  const fallback = buildMetadata({
  title: "O-Shot Treatment for Women",
  description: DESCRIPTION,
  path: `/${SLUG}/`,
});
  return cmsPageMetadata(fallback);
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd([
            serviceSchema({
              name: TITLE,
              description: DESCRIPTION,
              path: `/${SLUG}/`,
            }),
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "For Women", path: "/women/" },
              { name: "O-Shot®", path: `/${SLUG}/` },
            ]),
          ]),
        }}
      />
      <OShotPageContent />
    </>
  );
}
