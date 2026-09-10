import { buildMetadata } from "@/lib/metadata";
import { breadcrumbSchema, jsonLd } from "@/lib/schema";
import PageHero from "@/components/ui/PageHero";
import CTABanner from "@/components/ui/CTABanner";
import BlogsIndex from "@/components/blog/BlogsIndex";
import { BLOG_POSTS } from "@/lib/content/blog";

const LIVE_ORIGIN = "https://revivalhealthandwellnessgroup.com";
const TITLE = "Blog";
const META_TITLE = "Blog | Treatment Tips, Advice, and Wellness Insights";
const PATH = "/blogs/";
const DESCRIPTION =
  "Visit our blog for the latest treatment tips and wellness insights. Revival Health and Wellness shares helpful guides to support your health and beauty journey.";

export const metadata = buildMetadata({
  title: META_TITLE,
  description: DESCRIPTION,
  path: PATH,
});

export default function BlogsPage() {
  const sorted = [...BLOG_POSTS].sort(
    (a, b) =>
      new Date(b.publishDate ?? b.date).getTime() -
      new Date(a.publishDate ?? a.date).getTime(),
  );

  const blogCollectionSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Revival Health & Wellness Blog",
    description:
      "Expert health tips, treatment guides, and wellness insights from Revival Health and Wellness in Las Vegas.",
    url: `${LIVE_ORIGIN}/blogs/`,
    publisher: {
      "@type": "Organization",
      name: "Revival Health and Wellness",
      url: LIVE_ORIGIN,
    },
    blogPost: sorted.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      url: p.canonical ?? `${LIVE_ORIGIN}/${p.slug}/`,
      datePublished: p.publishDate ?? p.date,
      image: p.ogImage ?? p.cover,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd([
            blogCollectionSchema,
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: TITLE, path: PATH },
            ]),
          ]),
        }}
      />

      <PageHero
        eyebrow="Insights & Guides"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Blog" }]}
        title={
          <>
            The Revival{" "}
            <span className="italic text-revival-gold">Journal</span>
          </>
        }
        description="Wellness insights, treatment guides, and expert advice from the Revival Health & Wellness medical team."
        secondary={{ label: "Book a Consultation", href: "/contact-us/" }}
        gallery={[
          "/images/blog/iv-hydration-therapy-does-beyond-hangovers.jpg",
          "/images/blog/hormone-therapy-in-your-40s-and-50s.jpg",
          "/images/blog/medical-weight-loss-options-las-vegas.jpg",
          "/images/blog/ed-treatment-roadmap-guide.jpg",
        ]}
      />

      <BlogsIndex posts={sorted} />

      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <CTABanner
          title="Have a specific question?"
          subtitle="Skip the search bar and talk to our medical team. Free consultations, real answers."
        />
      </div>
    </>
  );
}
