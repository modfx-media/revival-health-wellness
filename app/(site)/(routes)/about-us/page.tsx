import { cmsPageMetadata } from "@/lib/cms/generateMeta";
import { buildMetadata } from "@/lib/metadata";
import { breadcrumbSchema, jsonLd } from "@/lib/schema";
import PageHero from "@/components/ui/PageHero";
import CTABanner from "@/components/ui/CTABanner";
import {
  AboutIntroSection,
  CoreValuesSection,
  MeetTeamSection,
  MissionSection,
  VisionSection,
  TestimonialsIntroSection,
  TestimonialsGallerySection,
  ClientResultsSection,
  OfficeHoursSection,
} from "@/components/about/AboutSections";

export async function generateMetadata() {
  const fallback = buildMetadata({
  title: "About Us",
  description:
    "Learn about Revival Health & Wellness, our mission, our physician-led team, and our concierge approach to modern health and aesthetics in Las Vegas.",
  path: "/about-us",
});
  return cmsPageMetadata(fallback);
}

export default function AboutUsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "About Us", path: "/about-us" },
            ]),
          ),
        }}
      />

      <PageHero
        eyebrow="About Revival Health & Wellness"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "About Us" }]}
        title={
          <>
            A modern approach to{" "}
            <span className="relative inline-block italic text-revival-gold">
              healing
              <span
                aria-hidden
                className="absolute -bottom-2 left-0 h-[3px] w-full bg-gradient-to-r from-revival-gold to-transparent"
              />
            </span>{" "}
            &amp; vitality
          </>
        }
        description="Revival Health & Wellness is a Las Vegas center where modern medicine meets luxury care. Weight loss, hormone therapy, sexual wellness, and aesthetics-delivered by a team that treats you like family."
        secondary={{ label: "Meet Our Team", href: "#team" }}
        gallery={[
          "/images/home/front-desk.png",
          "/images/home/front-desk.png",
        ]}
      />

      <AboutIntroSection />
      <CoreValuesSection />
      <section id="team" className="scroll-mt-24">
        <MeetTeamSection />
      </section>
      <TestimonialsIntroSection />
      <TestimonialsGallerySection />
      <ClientResultsSection />
      <MissionSection />
      <VisionSection />
      <OfficeHoursSection />

      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <CTABanner
          title="Ready to start your revival?"
          subtitle="Book a free consultation and let our medical team design a plan built entirely around you."
        />
      </div>
    </>
  );
}
