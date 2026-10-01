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

const TITLE = "PDO Thread Lift Treatments";
const PATH = "/pdo-thread-lifts/";
const DESCRIPTION =
  "Lift, tighten, and redefine your facial contours with PDO thread lifts in Las Vegas. Revival Health and Wellness offers minimally invasive lifts that stimulate collagen without surgery.";

export async function generateMetadata() {
  const fallback = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  images: ["/images/pdo-thread-lifts/threadlift.jpg"],
});
  return cmsPageMetadata(fallback);
}

const TREATABLE_AREAS = [
  "Mid-face and cheeks",
  "Jawline definition",
  "Jowls",
  "Neck laxity",
  "Eyebrows",
  "Nasolabial folds",
  "Marionette lines",
];

const CANDIDATE_GOALS = [
  "Lift sagging cheeks or jowls",
  "Improve jawline definition",
  "Tighten loose neck skin",
  "Elevate the brows",
  "Stimulate natural collagen production",
  "Achieve natural-looking rejuvenation with minimal downtime",
];

const VISIT_STEPS = [
  {
    title: "Your appointment",
    text: "Your visit begins with a comprehensive consultation to evaluate your facial anatomy and confirm PDO threads are the best option for your goals. The treatment area is cleansed, a local anesthetic is administered for your comfort, and your provider strategically places the PDO threads beneath the skin using specialized techniques. The procedure typically takes 45–90 minutes depending on the number of areas treated.",
    icon: "compass" as const,
  },
  {
    title: "Recovery",
    text: "Most patients return to normal daily activities within a few days. You may experience mild swelling, bruising, tenderness, or a feeling of tightness for several days. Your provider will review detailed aftercare instructions to help optimize healing and your final results.",
    icon: "shieldCheck" as const,
  },
  {
    title: "Results",
    text: "Many patients notice an immediate lifting effect after treatment. As collagen production increases over the next 2–3 months, the skin becomes firmer, smoother, and more youthful. Results typically last 12–18 months, though longevity varies based on age, skin quality, lifestyle, and the treatment area.",
    icon: "award" as const,
  },
];

const FAQS = [
  {
    question: "What is a PDO thread lift?",
    answer:
      "A PDO thread lift is a minimally invasive, non-surgical procedure that lifts and tightens sagging skin using dissolvable polydioxanone (PDO) threads. The threads are placed beneath the skin to provide an immediate lifting effect while stimulating new collagen and elastin production over the following months.",
  },
  {
    question: "What areas can be treated?",
    answer:
      "PDO thread lifts can effectively improve the mid-face and cheeks, jawline definition, jowls, neck laxity, eyebrows, nasolabial folds, and marionette lines. Your provider will customize the placement based on your anatomy and goals.",
  },
  {
    question: "How long does the procedure take?",
    answer:
      "Most PDO thread lift appointments take 45–90 minutes depending on the number of areas being treated. This includes consultation, cleansing, local anesthesia, and precise thread placement.",
  },
  {
    question: "What is recovery like?",
    answer:
      "Most patients return to normal daily activities within a few days. You may experience mild swelling, bruising, tenderness, or a feeling of tightness for several days. Your provider will review detailed aftercare instructions to help optimize healing and your final results.",
  },
  {
    question: "How long do the results last?",
    answer:
      "Many patients notice an immediate lifting effect right after treatment. As collagen production increases over the next 2–3 months, the skin continues to become firmer, smoother, and more youthful. Results typically last 12–18 months, though longevity varies based on age, skin quality, lifestyle, and the treatment area.",
  },
  {
    question: "Am I a good candidate?",
    answer:
      "PDO thread lifts are ideal for individuals with mild to moderate skin laxity who want noticeable lifting without surgery. Great candidates are looking to lift sagging cheeks or jowls, improve jawline definition, tighten loose neck skin, elevate the brows, stimulate natural collagen production, and achieve natural-looking rejuvenation with minimal downtime.",
  },
];

export default function PdoThreadLiftsPage() {
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
              { name: "PDO Thread Lifts", path: PATH },
            ]),
            faqSchema(FAQS),
          ]),
        }}
      />

      <PageHero
        eyebrow={"Aesthetics · PDO Thread Lifts"}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Aesthetics", href: "/aesthetics/" },
          { label: "PDO Thread Lifts" },
        ]}
        title={
          <>
            <span className="relative inline-block italic text-revival-gold">
              PDO Thread
              <span
                aria-hidden
                className="absolute -bottom-2 left-0 h-[3px] w-full bg-gradient-to-r from-revival-gold to-transparent"
              />
            </span>{" "}
            lifts
          </>
        }
        description={"Lift, tighten, and rejuvenate without surgery. A PDO thread lift provides an immediate lifting effect while stimulating your body's own collagen production - for a naturally refreshed, more youthful appearance."}
        gallery={[
          "/images/pdo-thread-lifts/pdo-thread-lifts-1.webp",
          "/images/pdo-thread-lifts/pdo-thread-lifts-2.webp",
          "/images/pdo-thread-lifts/pdo-thread-lifts-3.png",
        ]}
        compact
      />

      <OverviewBlock
        section={{
          eyebrow: "PDO Thread Lift",
          heading:
            "Lift, tighten & rejuvenate without surgery",
          paragraphs: [
            "As we age, collagen production declines and the supportive structures of the face begin to weaken. This can lead to sagging skin, jowls, loss of jawline definition, and drooping cheeks and brows.",
            "A PDO Thread Lift is a minimally invasive procedure designed to lift and reposition sagging tissue while stimulating your body's natural collagen production. The result is a refreshed, more youthful appearance without the downtime of surgery.",
          ],
          image: "/images/pdo-thread-lifts/pdo-thread-lifts-1.webp",
          imageAspect: "square",
        }}
      />

      <OverviewBlock
        tone="cream"
        reverse
        section={{
          eyebrow: "How does a PDO thread lift work?",
          heading:
            "Immediate lift plus a long collagen build",
          paragraphs: [
            "PDO (Polydioxanone) threads are medical-grade, absorbable sutures that are carefully placed beneath the skin to provide an immediate lifting effect.",
            "Over the following months, the threads stimulate your body's natural healing response, encouraging the production of new collagen and elastin. Although the threads dissolve naturally, the collagen they create helps maintain a firmer, more youthful appearance long after they are gone.",
          ],
          image: "/images/pdo-thread-lifts/threadlift.jpg",
          imageAspect: "landscape",
        }}
      />

      <BenefitsList
        eyebrow="What areas can be treated?"
        heading="PDO thread lifts can effectively improve"
        items={TREATABLE_AREAS}
        image="/images/pdo-thread-lifts/pdo-thread-lifts-2.webp"
        imageAspect="square"
        imageContain
      />

      <PillarsGrid
        eyebrow="Your PDO thread lift, step by step"
        heading="What to expect during your appointment, recovery, and results"
        intro="From consultation through the collagen build that continues for months, here's how a Revival PDO thread lift unfolds."
        pillars={VISIT_STEPS}
      />

      <BenefitsList
        eyebrow="Is a PDO thread lift right for you?"
        heading="You may be a great candidate if you'd like to"
        items={CANDIDATE_GOALS}
        image="/images/pdo-thread-lifts/pdo-thread-lifts-3.png"
        imageContain
      />

      <OverviewBlock
        tone="cream"
        reverse
        section={{
          eyebrow: "Why choose Revival Health & Wellness?",
          heading:
            "Personalized plans that restore the underlying structures of the face",
          paragraphs: [
            "At Revival Health & Wellness, every treatment begins with a personalized consultation because no two faces age the same. We evaluate your skin quality, facial structure, collagen loss, and aesthetic goals to determine whether PDO threads - or another advanced treatment such as Everesse®, XERF®, EZ Gel, Sculptra®, or a combination approach - will provide the most natural, long-lasting results.",
            "Our philosophy is simple: we don't believe in treating wrinkles alone. We restore the underlying support structures of the face to help you age confidently, naturally, and beautifully.",
          ],
          image: "/images/pdo-thread-lifts/Luxury-Living-in-Dubai-South-8-e1756238774520.png",
          imageAspect: "landscape",
        }}
      />

      <FAQSection faqs={FAQS} />

      <RelatedServices
        items={[
          {
            label: "EZ Gel",
            href: "/under-eye-treatment/",
            blurb:
              "Natural regenerative treatment using your body's own growth factors - pairs beautifully with thread lifts for full-face rejuvenation.",
          },
          {
            label: "Sculptra®",
            href: "/sculptra/",
            blurb:
              "Collagen-stimulating biostimulator that layers well with the collagen build from PDO threads.",
          },
          {
            label: "Everesse RF Skin Tightening",
            href: "/everesse-rf-skin-tightening-and-rejuvenation/",
            blurb:
              "Monopolar RF for deep collagen stimulation - a great non-invasive complement to PDO lifting.",
          },
        ]}
      />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-14 lg:px-8">
        <CTABanner
          title="Instant lift. Long-term glow."
          subtitle="Book a free consultation and see if a PDO thread lift is right for you."
        />
      </div>
    </>
  );
}
