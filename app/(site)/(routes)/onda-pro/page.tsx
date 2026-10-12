import Image from "next/image";
import { cmsPageMetadata } from "@/lib/cms/generateMeta";
import { buildMetadata } from "@/lib/metadata";
import { serviceSchema, breadcrumbSchema, jsonLd } from "@/lib/schema";
import PageHero from "@/components/ui/PageHero";
import CTABanner from "@/components/ui/CTABanner";
import { OctoProVideoShowcase } from "@/components/templates/OctoProVideoShowcase";
import OndaProLeadForm from "@/components/onda-pro/OndaProLeadForm";
import FacebookReels from "@/components/onda-pro/FacebookReels";
import OndaProLocations from "@/components/onda-pro/OndaProLocations";

const TITLE = "ONDA Pro Body Contouring in Las Vegas";
const PATH = "/onda-pro/";
const DESCRIPTION =
  "Meet ONDA Pro at Revival Health & Wellness in Las Vegas. Explore a non-invasive approach to body contouring for the appearance of stubborn fat, loose skin, and cellulite. Book your free consultation.";

export async function generateMetadata() {
  const fallback = buildMetadata({
    title: TITLE,
    description: DESCRIPTION,
    path: PATH,
    images: ["/images/octopro-onda/octopro-machine.webp"],
    keywords: [
      "ONDA Pro Las Vegas",
      "body contouring Las Vegas",
      "non-invasive body contouring",
      "skin tightening Las Vegas",
      "cellulite treatment Las Vegas",
      "Revival Health and Wellness",
    ],
  });
  return cmsPageMetadata(fallback);
}

function OfferBand() {
  return (
    <aside className="relative z-10 border-y border-revival-gold/25 bg-revival-dark">
      <a
        href="#book"
        className="group mx-auto flex max-w-7xl items-center justify-center gap-3 px-4 py-4 text-center sm:px-6 sm:py-5 lg:px-8"
      >
        <span className="text-tagline text-[0.65rem] leading-relaxed text-revival-gold sm:text-xs">
          Limited Time New Patient Offer
        </span>
        <span
          aria-hidden
          className="hidden h-4 w-px bg-revival-gold/35 sm:block"
        />
        <span className="font-heading text-base text-revival-cream transition-colors group-hover:text-revival-gold sm:text-lg">
          Book Your FREE Consultation
        </span>
      </a>
    </aside>
  );
}

function IntroBand() {
  return (
    <section className="relative overflow-hidden bg-revival-cream py-12 sm:py-16 lg:py-20">
      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <p className="text-lg font-light leading-relaxed text-revival-charcoal/90 sm:text-xl sm:leading-[1.65]">
          Stubborn fat. Loose skin. The appearance of cellulite. Different
          concerns—and a treatment designed to address them together.
        </p>
        <p className="mt-6 text-base font-light leading-relaxed text-revival-charcoal/80 sm:text-lg">
          ONDA Pro offers a non-invasive approach to body contouring, so
          exploring smoother-looking skin doesn&apos;t have to start with
          surgery.
        </p>
        <p className="mt-6 text-base font-light leading-relaxed text-revival-charcoal/80 sm:text-lg">
          Come meet our team, talk about your goals, and find out whether ONDA
          Pro is right for you.
        </p>
        <a
          href="#book"
          className="mt-10 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-revival-gold to-revival-gold-light px-8 py-4 text-base font-medium text-revival-dark shadow-[0_8px_30px_-8px_rgba(201,169,110,0.6)] transition-transform duration-300 hover:scale-[1.03]"
        >
          Book Now
        </a>
      </div>
    </section>
  );
}

function ContentBlock({
  eyebrow,
  heading,
  paragraphs,
  image,
  imageAlt,
  imageWidth,
  imageHeight,
  reverse = false,
  tone = "light",
}: {
  eyebrow: string;
  heading: string;
  paragraphs: string[];
  image: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  reverse?: boolean;
  tone?: "light" | "cream";
}) {
  const bg = tone === "cream" ? "bg-revival-cream" : "bg-revival-warm-white";
  return (
    <section className={`relative overflow-clip ${bg} py-14 sm:py-20 lg:py-28`}>
      <span
        aria-hidden
        className="pointer-events-none absolute -left-32 top-16 h-96 w-96 rounded-full bg-revival-gold/10 blur-[140px]"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -right-32 bottom-16 h-96 w-96 rounded-full bg-revival-gold/10 blur-[140px]"
      />
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-8">
        <div className={reverse ? "lg:order-2" : ""}>
          <div className="relative overflow-hidden rounded-[2rem] border border-revival-gold/15 bg-gradient-to-br from-revival-cream to-revival-warm-white p-4 shadow-[0_50px_120px_-32px_rgba(15,15,15,0.25)]">
            <div className="relative flex items-center justify-center">
              <Image
                src={image}
                alt={imageAlt}
                width={imageWidth}
                height={imageHeight}
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="h-auto w-full rounded-2xl object-contain"
              />
            </div>
          </div>
        </div>
        <div className={reverse ? "lg:order-1" : ""}>
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-8 bg-gradient-to-r from-transparent via-revival-gold to-revival-gold/60" />
            <span className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-revival-gold">
              {eyebrow}
            </span>
          </div>
          <h2 className="font-heading text-3xl leading-[1.1] tracking-[-0.015em] text-revival-dark sm:text-4xl lg:text-[2.75rem]">
            {heading}
          </h2>
          <div className="mt-8 space-y-6">
            {paragraphs.map((p, i) => (
              <p
                key={i}
                className={
                  i === 0
                    ? "relative border-l-2 border-revival-gold/40 pl-5 text-lg font-light leading-[1.7] text-revival-charcoal/90 sm:text-xl sm:leading-[1.65]"
                    : "text-base font-light leading-relaxed text-revival-charcoal/80 sm:text-lg"
                }
              >
                {p}
              </p>
            ))}
          </div>
          <a
            href="#book"
            className="mt-10 inline-flex items-center justify-center rounded-full border border-revival-gold bg-transparent px-7 py-3.5 text-sm font-medium text-revival-dark transition-colors hover:bg-revival-gold/10"
          >
            Book Now
          </a>
        </div>
      </div>
    </section>
  );
}

/**
 * Designed ONDA Pro landing UI. Payload CMSRoute in the site layout will
 * replace this with published CMS content when a matching `/onda-pro` page
 * exists; otherwise this page is the public fallback.
 */
export default function OndaProLandingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd([
            serviceSchema({
              name: "ONDA Pro Body Contouring",
              description: DESCRIPTION,
              path: PATH,
            }),
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Aesthetics", path: "/aesthetics/" },
              { name: "ONDA Pro", path: PATH },
            ]),
          ]),
        }}
      />

      <PageHero
        eyebrow="Aesthetics · Body Contouring"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Aesthetics", href: "/aesthetics/" },
          { label: "ONDA Pro" },
        ]}
        title={
          <>
            Las Vegas Ladies—The Next Big Thing in{" "}
            <span className="relative inline-block italic text-revival-gold">
              Body Contouring
              <span
                aria-hidden
                className="absolute -bottom-2 left-0 h-[3px] w-full bg-gradient-to-r from-revival-gold to-transparent"
              />
            </span>{" "}
            Has Arrived.
          </>
        }
        description="Meet ONDA Pro at Revival Health & Wellness."
        gallery={[
          "/images/octopro-onda/octopro-machine.webp",
          "/images/octopro-onda/octopro-onda-1.webp",
          "/images/octopro-onda/octopro-2.jpg",
        ]}
        primary={{ label: "Book Now", href: "#book" }}
        compact
      />

      <OfferBand />
      <IntroBand />

      <ContentBlock
        eyebrow="Under the Chin"
        heading="A more defined profile doesn’t have to begin with surgery"
        paragraphs={[
          "For women interested in the appearance of the area beneath the chin, the next step starts with a conversation—not a commitment. Our team will assess your goals and explain whether ONDA Pro is a suitable option. You deserve clear answers before choosing a treatment.",
        ]}
        image="/images/octopro-onda/octopro-onda-1.webp"
        imageAlt="ONDA Pro treatment for the area beneath the chin"
        imageWidth={2706}
        imageHeight={3607}
      />

      <ContentBlock
        tone="cream"
        reverse
        eyebrow="Targeted Contouring"
        heading="Body contouring should have a target. And a plan."
        paragraphs={[
          "For women near their goal weight who want to explore targeted contouring, the right treatment starts with understanding the specific area—not promising a number on a measuring tape. Our team will assess your goals and explain whether ONDA Pro is a suitable choice for your upper arms or other treatment areas. Make your next step an informed one.",
        ]}
        image="/images/octopro-onda/octopro-2.jpg"
        imageAlt="ONDA Pro targeted body contouring"
        imageWidth={650}
        imageHeight={530}
      />

      <ContentBlock
        eyebrow="Skin Tightening"
        heading="Put non-surgical skin tightening on your radar"
        paragraphs={[
          "For women exploring treatment for the appearance of loose upper-arm skin, ONDA Pro offers a non-invasive option worth discussing. Come tell us what you’d like to address. Our team will assess the area, explain what treatment involves, and help set realistic expectations. Your goals deserve more than a one-size-fits-all recommendation.",
        ]}
        image="/images/octopro-onda/octopro-4.jpeg"
        imageAlt="ONDA Pro non-surgical skin tightening"
        imageWidth={452}
        imageHeight={678}
      />

      <OctoProVideoShowcase />
      <FacebookReels />
      <OndaProLocations />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-14 lg:px-8">
        <CTABanner
          title="Click Book Now and take the first step."
          subtitle="Come meet our team, talk about your goals, and find out whether ONDA Pro is right for you."
          primaryLabel="Book Now"
          primaryHref="#book"
        />
      </div>

      <OndaProLeadForm />
    </>
  );
}
