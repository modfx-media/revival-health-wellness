import { cmsPageMetadata } from "@/lib/cms/generateMeta";
import { buildMetadata } from "@/lib/metadata";
import { serviceSchema, breadcrumbSchema, faqSchema, jsonLd } from "@/lib/schema";
import SexualWellnessPage from "@/components/sexual-wellness/SexualWellnessPage";
import { SW_CONTENT } from "@/lib/content/sexual-wellness";

const SLUG = "gainswave-tm";
const data = SW_CONTENT[SLUG];

export async function generateMetadata() {
  const fallback = buildMetadata({
  title: data.meta.title,
  description: data.meta.description,
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
              name: data.schema.medicalTherapyName,
              description: data.meta.description,
              path: `/${SLUG}/`,
            }),
            faqSchema(
              data.sections.flatMap((section) =>
                section.kind === "faq" ? section.items : [],
              ),
            ),
            breadcrumbSchema(
              data.breadcrumbs.map((b) => ({
                name: b.label,
                path: b.href ?? `/${SLUG}/`,
              })),
            ),
          ]),
        }}
      />
      <SexualWellnessPage data={data} contentMap={SW_CONTENT} />
    </>
  );
}
