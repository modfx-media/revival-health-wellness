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
  PillarsGrid,
  FAQSection,
  RelatedServices,
} from "@/components/templates/HormoneSections";

const TITLE = "Under Eye & Tear Trough Care";
const PATH = "/under-eye-treatment/";
const DESCRIPTION =
  "Brighten and rejuvenate the under-eye area with tear trough treatments in Las Vegas. Revival Health and Wellness targets dark circles, puffiness, and fine lines for a refreshed, well-rested look.";

export async function generateMetadata() {
  const fallback = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  images: ["/images/under-eye-treatment/23128-dark-circles-under-eyes.jpg"],
});
  return cmsPageMetadata(fallback);
}

const BENEFITS = [
  "Brightens dark circles and hollowed under-eye areas",
  "Smooths the appearance of fine lines and crepey skin",
  "Reduces puffiness for a well-rested look",
  "Restores volume gently in the tear trough",
  "Rejuvenates the under-eye area without surgery",
  "Delivers a naturally refreshed, youthful appearance",
];

const EZ_GEL_BENEFITS = [
  "Stimulate your body’s natural collagen production",
  "Improve skin thickness and elasticity",
  "Soften fine lines and crepey skin",
  "Reduce the appearance of dark circles caused by thin skin",
  "Restore subtle, natural-looking volume",
  "Improve overall skin quality over time",
];

const EZ_GEL_CANDIDATES = [
  "Refresh tired-looking eyes naturally",
  "Improve under-eye hollowness",
  "Reduce fine lines and crepey skin",
  "Enhance skin quality without synthetic fillers",
  "Support long-term collagen production",
];

const EZ_GEL_STEPS = [
  {
    title: "What to expect",
    text: "Your appointment begins with a consultation to confirm EZ Gel is right for you. A small blood sample is collected and processed into your personalized EZ Gel, which your provider then carefully injects into the under-eye area using techniques designed for comfort and precision. The full visit typically takes 60–90 minutes.",
    icon: "compass" as const,
  },
  {
    title: "Recovery",
    text: "Most patients experience mild swelling, redness, or bruising that resolves within several days. Because EZ Gel is made from your own blood, the risk of allergic reaction is extremely low.",
    icon: "shieldCheck" as const,
  },
  {
    title: "Results",
    text: "Some improvement is visible as initial swelling resolves, but the true benefits build gradually over weeks and months as collagen remodels. For optimal rejuvenation we often recommend a series of 2–3 treatments, spaced 8–12 weeks apart.",
    icon: "award" as const,
  },
];

const FAQS = [
  {
    question: "What is under-eye / tear trough treatment?",
    answer:
      "The tear trough is the delicate hollow between the lower eyelid and the cheekbone. Age, genetics, and volume loss can create shadows, hollows, and “tired” looking eyes. Under-eye treatment brightens dark circles, smooths crepey texture, and restores gentle volume for a well-rested, youthful appearance.",
  },
  {
    question: "How does tear trough lightening work?",
    answer:
      "Small amounts of hyaluronic acid filler are precisely placed in the tear trough to gently restore volume, reflect light differently, and smooth the transition between the lower lid and the cheek. Our injectors also often pair this with skin brightening or PRP protocols depending on your concerns.",
  },
  {
    question: "How long do results last?",
    answer:
      "Most patients enjoy results lasting 9 to 18 months, depending on the product used and your metabolism. We’ll create a maintenance plan that keeps you looking refreshed year-round.",
  },
  {
    question: "Is there any downtime?",
    answer:
      "Downtime is minimal. Some patients experience mild swelling, redness, or bruising at the injection sites, but most return to daily activities right away. Avoid strenuous exercise and heat exposure for 24 hours after treatment.",
  },
  {
    question: "Am I a good candidate?",
    answer:
      "The best candidates have hollows or dark circles in the tear trough area, are in generally good health, are over 18, are not pregnant or breastfeeding, and have realistic expectations. A consultation confirms whether tear-trough treatment is the right approach for you.",
  },
];

export default function UnderEyeTreatmentPage() {
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
              { name: "Under Eye Treatment", path: PATH },
            ]),
            faqSchema(FAQS),
          ]),
        }}
      />

      <PageHero
        eyebrow={"Aesthetics · Under Eye Treatment"}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Aesthetics", href: "/aesthetics/" },
          { label: "Under Eye Treatment" },
        ]}
        title={
          <>
            <span className="relative inline-block italic text-revival-gold">
              Under Eye Treatment
              <span
                aria-hidden
                className="absolute -bottom-2 left-0 h-[3px] w-full bg-gradient-to-r from-revival-gold to-transparent"
              />
            </span>
          </>
        }
        description="Revive tired, dull eyes. This advanced tear-trough treatment targets dark circles, puffiness, and fine lines to rejuvenate and brighten the under-eye area for a refreshed, well-rested look."
        gallery={[
          "/images/under-eye-treatment/23128-dark-circles-under-eyes.jpg",
          "/images/under-eye-treatment/Ez-Gel-undereyes.jpg",
        ]}
        compact
      />

      <OverviewBlock
        section={{
          eyebrow: "EZ Gel for Under-Eye Rejuvenation",
          heading:
            "Naturally refresh tired eyes with your body’s own regenerative proteins",
          paragraphs: [
            "The delicate under-eye area is often one of the first places to show signs of aging. As collagen decreases over time, the skin becomes thinner, fine lines develop, and volume loss can create hollowness and shadows that make you look tired - even when you’re well rested.",
            "EZ Gel is a natural regenerative treatment that uses your body’s own growth factors and proteins to rejuvenate the under-eye area without synthetic fillers.",
          ],
          image: "/images/under-eye-treatment/Ez-Gel-undereyes.jpg",
          imageAspect: "square",
          imageContain: true,
        }}
      />

      <OverviewBlock
        section={{
          eyebrow: "Comprehensive Guide to Under Eye Treatment",
          heading:
            "A youthful appearance starts with a well-rested eye area",
          paragraphs: [
            "Revive tired, dull eyes with our specialized Under-Eye Treatment at Revival Health & Wellness. This advanced treatment targets dark circles, puffiness, and fine lines, helping to rejuvenate and brighten the under-eye area.",
            "Experience a refreshed, youthful, and well-rested look that enhances your overall appearance - no surgery, no downtime, and results that look like the best-rested version of you.",
          ],
          image: "/images/under-eye-treatment/Eyes-3.jpg",
        }}
      />

      <OverviewBlock
        tone="cream"
        reverse
        section={{
          eyebrow: "How does tear trough lightening work?",
          heading:
            "Precisely placed hyaluronic acid - reflect light, restore volume",
          paragraphs: [
            "The tear trough is the delicate hollow between the lower eyelid and the cheekbone. Age, genetics, and volume loss can create shadows and “tired” looking eyes. Tear trough lightening uses small amounts of hyaluronic acid filler, precisely placed to gently restore volume, reflect light differently, and smooth the transition between the lower lid and the cheek.",
            "Our injectors often pair this with skin-brightening or PRP protocols depending on your specific concerns - the goal is a naturally refreshed look that never appears “done.”",
          ],
          image: "/images/under-eye-treatment/under-eye-bags-treatment.webp",
          imageAspect: "landscape",
        }}
      />

      <BenefitsList
        eyebrow="Benefits of tear trough lightening"
        heading="What patients notice"
        items={BENEFITS}
        image="/images/under-eye-treatment/under-eye-benefits.webp"
        imageSize="small"
      />

      <OverviewBlock
        tone="cream"
        reverse
        section={{
          eyebrow: "How does EZ Gel work?",
          heading:
            "PRF-based regenerative gel drawn from your own blood",
          paragraphs: [
            "EZ Gel is created from a small sample of your own blood. Through a specialized process, platelet-rich fibrin (PRF) is transformed into a smooth, gel-like consistency that is rich in growth factors, fibrin, and regenerative proteins.",
            "Unlike traditional dermal fillers, EZ Gel focuses on regenerating tissue rather than simply filling space - creating gradual, natural improvements.",
            "When carefully placed beneath the eyes, EZ Gel works to:",
          ],
          bullets: EZ_GEL_BENEFITS,
          image: "/images/under-eye-treatment/23128-dark-circles-under-eyes.jpg",
          imageAspect: "landscape",
        }}
      />

      <PillarsGrid
        eyebrow="Your EZ Gel visit"
        heading="What to expect, recovery, and results"
        intro="From consultation to full collagen remodeling - here’s how an EZ Gel under-eye rejuvenation unfolds."
        pillars={EZ_GEL_STEPS}
      />

      <BenefitsList
        eyebrow="Is EZ Gel right for you?"
        heading="An ideal option if you want to:"
        items={EZ_GEL_CANDIDATES}
        image="/images/under-eye-treatment/ez-gel-under-eye.jpg"
        imageAspect="square"
        imageContain
        footer="At Revival Health & Wellness, we customize every treatment plan to your unique anatomy and aesthetic goals. Our focus is on achieving refreshed, natural-looking results that help you look like the best version of yourself - not someone else."
      />

      <FAQSection faqs={FAQS} />

      <RelatedServices
        items={[
          {
            label: "Derma Filler",
            href: "/derma-filler/",
            blurb:
              "The full hyaluronic-acid dermal filler portfolio - for lips, cheeks, jawline, and more.",
          },
          {
            label: "PRP Hair restoration",
            href: "/prp-hair-restoration/",
            blurb:
              "Similar PRP science, applied to the scalp - stimulate natural hair growth with your own growth factors.",
          },
          {
            label: "Microneedling",
            href: "/microneedling/",
            blurb:
              "Boost collagen and improve skin texture around the eye area - pairs beautifully with tear-trough treatment.",
          },
        ]}
      />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-14 lg:px-8">
        <CTABanner
          title="Ready for brighter, well-rested eyes?"
          subtitle="Book a free consultation. Our team will design a personalized under-eye plan for you."
        />
      </div>
    </>
  );
}
