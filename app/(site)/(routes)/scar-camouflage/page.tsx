import { cmsPageMetadata } from "@/lib/cms/generateMeta";
import Image from "next/image";
import { buildMetadata } from "@/lib/metadata";
import {
  serviceSchema,
  breadcrumbSchema,
  jsonLd,
} from "@/lib/schema";
import PageHero from "@/components/ui/PageHero";
import CTABanner from "@/components/ui/CTABanner";
import {
  OverviewBlock,
  BenefitsList,
  RelatedServices,
} from "@/components/templates/HormoneSections";

const TITLE = "Professional Scar Camouflage";
const PATH = "/scar-camouflage/";
const DESCRIPTION =
  "Blend scars and skin imperfections with scar camouflage in Las Vegas. Revival Health and Wellness uses medical tattooing and advanced treatments to help you feel confident in your skin again.";

export async function generateMetadata() {
  const fallback = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  images: ["/images/scar-camouflage/hand-before-after.jpg"],
});
  return cmsPageMetadata(fallback);
}

const APPROACH = [
  "Customized treatment plans tailored to your skin and scar type",
  "Gentle yet effective options with minimal downtime",
  "State-of-the-art technology and top-grade medical aesthetics",
  "Realistic results that enhance your natural skin without harsh measures",
];

export default function ScarCamouflagePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd([
            serviceSchema({ name: TITLE, description: DESCRIPTION, path: PATH }),
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Aesthetics", path: "/aesthetics/" },
              { name: "Scar Camouflage", path: PATH },
            ]),
          ]),
        }}
      />

      <PageHero
        eyebrow={"Aesthetics · Scar Camouflage"}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Aesthetics", href: "/aesthetics/" },
          { label: "Scar Camouflage" },
        ]}
        title={
          <>
            <span className="relative inline-block italic text-revival-gold">
              Scar Camouflage
              <span
                aria-hidden
                className="absolute -bottom-2 left-0 h-[3px] w-full bg-gradient-to-r from-revival-gold to-transparent"
              />
            </span>
          </>
        }
        description={"Scar concealment & confidence restoration - because your skin should reflect how strong, radiant, and beautiful you truly are."}
        gallery={[
          "/images/scar-camouflage/ear-before-after.jpg",
          "/images/scar-camouflage/hand-before-after.jpg",
        ]}
        compact
      />

      {/* Featured animation from the live site - shown at native resolution
          (source gif is low-res) so it never looks stretched or blurry. */}
      <section className="relative overflow-hidden bg-revival-warm-white py-14 sm:py-20 lg:py-28">
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div
            aria-hidden
            className="absolute -left-24 top-4 h-[26rem] w-[26rem] rounded-full blur-[140px]"
            style={{
              background:
                "radial-gradient(circle, rgba(201,169,110,0.16), transparent 70%)",
            }}
          />
        </div>
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1fr_1fr] lg:gap-20 lg:px-8">
          <div>
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-8 bg-gradient-to-r from-transparent via-revival-gold to-revival-gold/60 sm:w-12" />
              <span className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-revival-gold sm:text-xs">
                See it in action
              </span>
              <span className="h-px w-8 bg-gradient-to-l from-transparent via-revival-gold to-revival-gold/60 sm:w-12" />
            </div>
            <h2
              className="font-heading font-light leading-[1.05] text-revival-dark"
              style={{
                fontSize: "clamp(2rem, 3.6vw, 3.15rem)",
                letterSpacing: "-0.01em",
              }}
            >
              You deserve to feel good in your skin
            </h2>
            <p className="mt-6 border-l-2 border-revival-gold/40 pl-5 text-lg font-light leading-[1.65] text-revival-charcoal/90 sm:text-xl">
              Whether it’s a subtle change or a significant transformation,
              every scar we help fade is a step toward you feeling whole again.
              Your healing is more than skin-deep - and we’re here for
              every part of the journey.
            </p>
          </div>
          <div className="relative mx-auto w-full max-w-[340px] lg:mx-0">
            <div className="relative overflow-hidden rounded-[2rem] bg-revival-cream p-3 shadow-[0_40px_120px_-32px_rgba(15,15,15,0.3)] ring-1 ring-revival-gold/15">
              <Image
                src="/images/scar-camouflage/ear-before-after.jpg"
                alt="Scar camouflage before and after - ear and neck"
                width={454}
                height={640}
                sizes="340px"
                className="h-auto w-full rounded-[1.5rem] object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      <OverviewBlock
        tone="cream"
        reverse
        section={{
          eyebrow: "Why Scar Concealment?",
          heading:
            "Look in the mirror and feel empowered",
          paragraphs: [
            "Scars can create emotional reminders of difficult moments or distract from the skin you want to show off. Whether they’re old or new, raised or discolored, our goal is simple: to help you look in the mirror and feel empowered.",
          ],
        }}
      />

      {/* Scar Concealment & Confidence Restoration - image shown at native
          resolution (source photo is low-res) so it never looks stretched
          or blurry from being force-fit into a large frame. */}
      <section className="relative overflow-clip bg-revival-warm-white py-14 sm:py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20 lg:px-8">
          <div className="relative mx-auto w-full max-w-[420px] lg:mx-0">
            <div className="relative overflow-hidden rounded-[2rem] bg-revival-cream p-3 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.2)] ring-1 ring-revival-gold/15">
              <Image
                src="/images/scar-camouflage/hand-before-after.jpg"
                alt="Scar camouflage before and after - hand"
                width={1000}
                height={1000}
                sizes="(min-width: 1024px) 420px, 100vw"
                className="h-auto w-full rounded-[1.5rem] object-contain"
              />
            </div>
          </div>

          <div>
            <div className="mb-6">
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-gradient-to-r from-transparent via-revival-gold to-revival-gold/60 sm:w-12" />
                <span className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-revival-gold sm:text-xs">
                  Scar Concealment &amp; Confidence Restoration
                </span>
              </div>
            </div>
            <h2
              className="font-heading font-light leading-[1.05] text-revival-dark"
              style={{
                fontSize: "clamp(2rem, 3.6vw, 3.15rem)",
                letterSpacing: "-0.01em",
              }}
            >
              Because your skin should reflect how strong, radiant, and
              beautiful you truly are.
            </h2>
            <div className="mt-8 space-y-6">
              <p className="relative border-l-2 border-revival-gold/40 pl-5 text-lg font-light leading-[1.7] text-revival-charcoal/90 sm:text-xl sm:leading-[1.65]">
                At Revival Health and Wellness, we understand that scars -
                whether from surgery, acne, or injury - can affect how you
                feel about yourself. While they’re part of your story, they
                don’t have to define you.
              </p>
              <p className="text-base font-light leading-relaxed text-revival-charcoal/80 sm:text-lg">
                Our expert providers offer advanced, non-surgical treatments
                designed to minimize the appearance of scars, helping you
                restore your natural beauty and reclaim your confidence.
                Using cutting-edge technology and personalized care, we work
                with you to soften visible imperfections and improve your
                skin’s texture and tone.
              </p>
            </div>
          </div>
        </div>
      </section>

      <BenefitsList
        eyebrow="Our approach"
        heading="Customized treatment. Realistic results."
        items={APPROACH}
      />

      <RelatedServices
        items={[
          {
            label: "Microneedling",
            href: "/microneedling/",
            blurb:
              "Stimulate collagen and improve the appearance of acne scars and skin texture.",
          },
          {
            label: "CO₂ Laser Treatments",
            href: "/co2-laser-treatments/",
            blurb:
              "Advanced fractional CO₂ resurfacing to address deeper scars and skin laxity.",
          },
          {
            label: "PRP Hair restoration",
            href: "/prp-hair-restoration/",
            blurb:
              "PRP treatments for scarring around the scalp and hairline.",
          },
        ]}
      />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-14 lg:px-8">
        <CTABanner
          title="Ready to feel good in your skin again?"
          subtitle={"Book a private consultation. We’ll create a personalized scar camouflage plan just for you."}
        />
      </div>
    </>
  );
}
