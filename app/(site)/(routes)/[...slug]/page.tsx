import { cmsPageMetadata } from "@/lib/cms/generateMeta";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/metadata";
import { geoBusinessSchema, breadcrumbSchema, jsonLd } from "@/lib/schema";
import { getAllGeoPages, getGeoPage, geoHighlights } from "@/lib/locations";
import ServicePage from "@/components/templates/ServicePage";

/** Pre-render every geo landing page at build time. */
export function generateStaticParams() {
  return getAllGeoPages().map((page) => ({ slug: [page.slug] }));
}

// Geo pages are a known, finite set, reject anything else.
export const dynamicParams = false;

type GeoRouteProps = { params: Promise<{ slug: string[] }> };

export async function generateMetadata({ params }: GeoRouteProps) {
  const { slug } = await params;
  const geo = getGeoPage(slug.join("/"));
  if (!geo) return buildMetadata({ title: "Not Found", noIndex: true });

  // Title carries the city; canonical points at the parent service page so
  // ranking signal consolidates onto the pillar URL.
  return cmsPageMetadata(
    buildMetadata({
      title: geo.title,
      description: geo.description,
      path: geo.canonical,
    }),
    `/${geo.slug}`,
  );
}

export default async function GeoPage({ params }: GeoRouteProps) {
  const { slug } = await params;
  const geo = getGeoPage(slug.join("/"));

  if (!geo) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd([
            geoBusinessSchema({
              city: geo.city.name,
              path: `/${geo.slug}`,
            }),
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: geo.service.name, path: geo.canonical },
              {
                name: `${geo.service.name} in ${geo.city.name}`,
                path: `/${geo.slug}`,
              },
            ]),
          ]),
        }}
      />
      <ServicePage
        eyebrow={`${geo.service.eyebrow} · ${geo.city.name}, NV`}
        title={geo.title}
        intro={geo.description}
        highlights={geoHighlights(geo)}
      />
    </>
  );
}
