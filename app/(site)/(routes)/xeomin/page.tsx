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
  PillarsGrid,
  BenefitsList,
  FAQSection,
  RelatedServices,
} from "@/components/templates/HormoneSections";

const TITLE = "Xeomin Treatments for Smooth Skin";
const PATH = "/xeomin/";
const DESCRIPTION =
  "Reveal smoother skin with Xeomin injections in Las Vegas. Revival Health and Wellness offers precise treatments for a naturally youthful, refreshed appearance.";

export async function generateMetadata() {
  const fallback = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  images: ["/images/xeomin/xeomin-lifestyle.jpg"],
});
  return cmsPageMetadata(fallback);
}

const WHY = [
  "Smart Toxin Technology - purified formula without unnecessary proteins",
  "Natural-Looking Results - keeps your expressions intact",
  "Fast & Effective - visible results in just a few days",
  "No Downtime - return to daily activities right away",
  "Long-Lasting - results can last up to 3–4 months",
];

const LIFESTYLE_PILLARS = [
  {
    title: "A treatment that fits your lifestyle",
    text: "Each Xeomin® session takes just 10–20 minutes, with no downtime. You can book it on your lunch break and return to your daily routine right away. Results typically appear within 3–5 days and last up to 3–4 months.",
    icon: "timer" as const,
  },
  {
    title: "Prevent and refresh",
    text: "Xeomin® isn’t just for those who already see lines - it’s also popular for prevention. Younger patients use it to relax facial muscles before deep wrinkles form, helping maintain a smoother, youthful look longer.",
    icon: "sparkles" as const,
  },
  {
    title: "Confidence, simplified",
    text: "With Xeomin®, confidence comes easily. Whether you’re softening frown lines, brightening tired eyes, or simply refreshing your appearance, Xeomin® offers a straightforward, proven solution that keeps you looking like the best version of yourself.",
    icon: "smile" as const,
  },
];

const FAQS = [
  {
    question: "What is Xeomin®?",
    answer:
      "Xeomin® is an FDA-approved neurotoxin injectable used to temporarily reduce moderate-to-severe facial wrinkles. Its uniquely purified formula contains only the active ingredient - no unnecessary proteins - which is why it's called “smart toxin” technology.",
  },
  {
    question: "How is Xeomin different from Botox?",
    answer:
      "Both are FDA-approved neurotoxins that temporarily relax the targeted facial muscles. Xeomin’s uniquely purified formulation contains only the active ingredient, without additional proteins - which some patients feel provides a cleaner, more natural-looking result.",
  },
  {
    question: "How long does a Xeomin session take?",
    answer:
      "Each Xeomin® session takes just 10–20 minutes with no downtime. You can book it on your lunch break and return to your daily routine right away.",
  },
  {
    question: "When will I see results and how long do they last?",
    answer:
      "Results typically appear within 3–5 days and last up to 3–4 months, making it an easy, effective part of your beauty routine.",
  },
  {
    question: "Am I a good candidate for Xeomin?",
    answer:
      "Xeomin is popular with patients who already see moderate frown lines and forehead creases, and also with younger patients who want a preventative approach that relaxes facial muscles before deep wrinkles form.",
  },
];

export default function XeominPage() {
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
              { name: "Xeomin", path: PATH },
            ]),
            faqSchema(FAQS),
          ]),
        }}
      />

      <PageHero
        eyebrow={"Aesthetics · Xeomin®"}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Aesthetics", href: "/aesthetics/" },
          { label: "Xeomin®" },
        ]}
        title={
          <>
            <span className="relative inline-block italic text-revival-gold">
              Xeomin
              <span
                aria-hidden
                className="absolute -bottom-2 left-0 h-[3px] w-full bg-gradient-to-r from-revival-gold to-transparent"
              />
            </span>
          </>
        }
        description="Reveal smoother skin with Xeomin injections. Precise, purified, and delivered by expert injectors for a naturally youthful, refreshed appearance."
        gallery={[
          "/images/xeomin/xeomin-precision.jpg",
          "/images/xeomin/xeomin-procedure.jpg",
          "/images/xeomin/xeomin-lifestyle.jpg",
        ]}
        compact
      />

      <OverviewBlock
        section={{
          eyebrow: "Xeomin® Injectables at Revival",
          heading:
            "The purified neurotoxin for a smoother, more refreshed look",
          paragraphs: [
            "Xeomin® is an FDA-approved neurotoxin injectable used to temporarily reduce moderate-to-severe facial wrinkles. Its uniquely purified formula contains only the active ingredient - without unnecessary proteins - which is why it’s often called “smart toxin” technology.",
            "At Revival Health and Wellness, our expert injectors use Xeomin® to help you smooth frown lines, forehead creases, and dynamic wrinkles - while keeping your natural expressions perfectly intact.",
          ],
          image: "/images/xeomin/xeomin-procedure.jpg",
          imageAspect: "square",
          imageContain: true,
        }}
      />

      <PillarsGrid
        tone="cream"
        eyebrow="Smooth. Refresh. Renew."
        heading={"Xeomin®, tailored to your day"}
        intro={"Three reasons Xeomin® fits effortlessly into modern skincare routines."}
        pillars={LIFESTYLE_PILLARS}
      />

      <OverviewBlock
        reverse
        section={{
          eyebrow: "Why choose Revival for Xeomin®",
          heading: "Precision, artistry, and results that look like you",
          paragraphs: [
            "Our expert injectors combine medical precision with an aesthetic eye to make sure your Xeomin® results are natural - never frozen. Every treatment is tailored to your facial anatomy and cosmetic goals, so you leave feeling confident, radiant, and unmistakably yourself.",
          ],
          image: "/images/xeomin/xeomin-radiance.avif",
          imageContain: true,
        }}
      />

      <BenefitsList
        eyebrow={"Why choose Xeomin®?"}
        heading={"Wrinkle-smoothing power that looks authentic - never frozen"}
        items={WHY}
        image="/images/xeomin/xeomin-lifestyle.jpg"
        imageAspect="portrait"
      />

      <FAQSection faqs={FAQS} />

      <RelatedServices
        items={[
          {
            label: "Botox",
            href: "/botox/",
            blurb:
              "The classic FDA-approved neurotoxin for smoothing fine lines and dynamic wrinkles.",
          },
          {
            label: "Dysport®",
            href: "/dysport/",
            blurb:
              "Fast-acting alternative that softens frown lines with results in as little as 2–3 days.",
          },
          {
            label: "Derma Filler",
            href: "/derma-filler/",
            blurb:
              "Restore volume and contour with premium hyaluronic-acid dermal fillers.",
          },
        ]}
      />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-14 lg:px-8">
        <CTABanner
          title="Ready to refresh?"
          subtitle={"Book your Xeomin® consultation today - small changes, big impact."}
        />
      </div>
    </>
  );
}
