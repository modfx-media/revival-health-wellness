import { cmsPageMetadata } from "@/lib/cms/generateMeta";
import { buildMetadata } from "@/lib/metadata";
import { serviceSchema, breadcrumbSchema, jsonLd } from "@/lib/schema";
import ServicePage from "@/components/templates/ServicePage";

const TITLE = "IV Hydration";
const PATH = "/iv-hydration";
const DESCRIPTION =
  "Discover IV Hydration at Revival Health & Wellness, a personalized, physician-led approach designed to help you look and feel your best.";

export async function generateMetadata() {
  const fallback = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
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
            serviceSchema({ name: TITLE, description: DESCRIPTION, path: PATH }),
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: TITLE, path: PATH },
            ]),
          ]),
        }}
      />
      <ServicePage eyebrow="Wellness" title={TITLE} intro={DESCRIPTION} />
    </>
  );
}
