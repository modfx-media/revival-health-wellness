import { cmsPageMetadata } from "@/lib/cms/generateMeta";
import { buildMetadata } from "@/lib/metadata";
import {
  serviceSchema,
  breadcrumbSchema,
  faqSchema,
  jsonLd,
} from "@/lib/schema";
import PageHero from "@/components/ui/PageHero";
import CTABanner from "@/components/ui/CTABanner";
import {
  OverviewBlock,
  BenefitsList,
  FAQSection,
  RelatedServices,
} from "@/components/templates/HormoneSections";

const TITLE = "Sculptra® Aesthetic for Volume";
const PATH = "/sculptra/";
const DESCRIPTION =
  "Boost your natural collagen with Sculptra® Aesthetic in Las Vegas. Revival Health and Wellness helps you restore youthful volume gradually and naturally.";

export async function generateMetadata() {
  const fallback = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  images: ["/images/sculptra/sculptra-before-after-2.png"],
});
  return cmsPageMetadata(fallback);
}

const BENEFITS = [
  "Gradually restores lost volume in cheeks, temples, jawline, and more",
  "Smooths deep lines, folds, and hollow areas",
  "Stimulates natural collagen growth over time",
  "Improves skin texture and firmness",
  "Results last up to 24 months with proper treatment",
  "Ideal for those seeking a natural-looking lift without surgery",
];

const FAQS = [
  {
    question: "What is Sculptra®?",
    answer:
      "Sculptra® is made from poly-L-lactic acid (PLLA), a biocompatible compound that triggers collagen regeneration in the skin. It’s ideal for patients looking for subtle, long-lasting results without appearing overfilled or overdone.",
  },
  {
    question: "How is Sculptra different from traditional dermal fillers?",
    answer:
      "Unlike traditional dermal fillers that provide immediate volume, Sculptra works gradually by stimulating your body’s own collagen production. The results build over time and look natural - lasting up to two years or more.",
  },
  {
    question: "Who is Sculptra for?",
    answer:
      "Sculptra is perfect for individuals experiencing age-related volume loss, facial hollowness, or those who want a more youthful contour without the immediacy or plumpness of HA fillers. It’s also great as part of a preventative anti-aging regimen.",
  },
  {
    question: "How long do results last?",
    answer:
      "Results last up to 24 months with a proper treatment plan. Because Sculptra stimulates your own collagen, the improvement continues to build after each session and settles into a naturally refreshed appearance.",
  },
  {
    question: "Will I look “done”?",
    answer:
      "No. Sculptra isn’t about changing how you look - it’s about restoring what time has taken and enhancing your natural features with grace and longevity. Your provider will personalize your treatment plan to ensure results unfold gradually, keeping you looking refreshed - not “done.”",
  },
];

export default function SculptraPage() {
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
              { name: "Sculptra", path: PATH },
            ]),
            faqSchema(FAQS),
          ]),
        }}
      />

      <PageHero
        eyebrow={"Aesthetics · Sculptra® Aesthetic"}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Aesthetics", href: "/aesthetics/" },
          { label: "Sculptra®" },
        ]}
        title={
          <>
            <span className="relative inline-block italic text-revival-gold">
              Sculptra
              <span
                aria-hidden
                className="absolute -bottom-2 left-0 h-[3px] w-full bg-gradient-to-r from-revival-gold to-transparent"
              />
            </span>
          </>
        }
        description={"Stimulate your skin’s natural collagen and restore youthful volume - gradually and beautifully. Results that look natural and last up to two years or more."}
        gallery={[
          "/images/sculptra/sculptra-before-after-2.png",
          "/images/sculptra/before-after-sculptra-treatment-1-1024x1024-1.webp",
        ]}
        compact
      />

      <OverviewBlock
        section={{
          eyebrow: "Sculptra® Aesthetic at Revival Health and Wellness",
          heading:
            "Stimulate your skin’s natural collagen and restore youthful volume",
          paragraphs: [
            "At Revival Health and Wellness, we’re proud to offer Sculptra® Aesthetic, an advanced biostimulatory injectable designed to restore facial volume, enhance skin structure, and rejuvenate your appearance from the inside out.",
            "Unlike traditional dermal fillers that provide immediate volume, Sculptra works gradually by stimulating your body’s own collagen production - helping you achieve results that look natural and last up to two years or more.",
          ],
          image: "/images/sculptra/sculptra-hero.png",
          imageAspect: "landscape",
        }}
      />

      <OverviewBlock
        tone="cream"
        reverse
        section={{
          eyebrow: "What is Sculptra®?",
          heading: "Poly-L-lactic acid - the collagen catalyst",
          paragraphs: [
            "Sculptra® is made from poly-L-lactic acid (PLLA), a biocompatible compound that triggers collagen regeneration in the skin. It’s ideal for patients looking for subtle, long-lasting results without appearing overfilled or overdone.",
          ],
          image: "/images/sculptra/vecteezy-dermal-filler-woman.jpeg",
          imageAspect: "landscape",
        }}
      />

      <BenefitsList
        eyebrow={"Benefits of Sculptra®"}
        heading="A subtle transformation that builds over time"
        items={BENEFITS}
        image="/images/sculptra/sculptra-ae-3.png"
        imageAspect="square"
        imageContain
      />

      <OverviewBlock
        section={{
          eyebrow: "Who is Sculptra® for?",
          heading: "For volume loss, facial hollowness, and preventative anti-aging",
          paragraphs: [
            "Sculptra is perfect for individuals experiencing age-related volume loss, facial hollowness, or those who want a more youthful contour without the immediacy or plumpness of HA fillers. It’s also great as part of a preventative anti-aging regimen.",
            "Sculptra isn’t about changing how you look - it’s about restoring what time has taken and enhancing your natural features with grace and longevity. At Revival, your provider will personalize your treatment plan to ensure your results unfold gradually, keeping you looking refreshed - not “done.”",
          ],
        }}
      />

      <FAQSection faqs={FAQS} />

      <RelatedServices
        items={[
          {
            label: "Derma Filler",
            href: "/derma-filler/",
            blurb:
              "Hyaluronic-acid fillers for immediate volume and contour - a complement to Sculptra’s gradual approach.",
          },
          {
            label: "Botox",
            href: "/botox/",
            blurb:
              "Smooth dynamic wrinkles while Sculptra rebuilds volume from within - a powerful duo.",
          },
          {
            label: "PDO Thread lifts",
            href: "/pdo-thread-lifts/",
            blurb:
              "Instant lift and contour that pairs beautifully with collagen-stimulating Sculptra treatments.",
          },
        ]}
      />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-14 lg:px-8">
        <CTABanner
          title={"Book your Sculptra® consultation today"}
          subtitle={"Let’s create a customized plan that fits your beauty goals. Your skin’s best days are still ahead."}
        />
      </div>
    </>
  );
}
