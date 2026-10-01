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

const TITLE = "Microneedling Treatments";
const PATH = "/microneedling/";
const DESCRIPTION =
  "Refresh your skin texture with microneedling treatments in Las Vegas. Revival Health and Wellness helps you reveal smoother, firmer, more radiant skin.";

export async function generateMetadata() {
  const fallback = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  images: ["/images/microneedling/what_is_microneedling_header.webp"],
});
  return cmsPageMetadata(fallback);
}

const APPOINTMENT_STEPS = [
  {
    title: "Before your treatment",
    text: "Your medical provider reviews your treatment plan, answers any questions, and confirms your skin is ready. Your face is then thoroughly cleansed to remove makeup, oil, and impurities.",
    icon: "compass" as const,
  },
  {
    title: "Numbing",
    text: "A medical-grade topical numbing cream is applied to the treatment area and left to take effect for approximately 20–30 minutes to maximize your comfort throughout the procedure.",
    icon: "droplet" as const,
  },
  {
    title: "Your microneedling treatment",
    text: "Once your skin is properly numbed, your provider uses a medical-grade microneedling device to create thousands of precise microscopic channels, stimulating your body’s natural healing response - increased blood flow, collagen and elastin production, and improvements to fine lines, acne scars, enlarged pores, and overall skin quality. Treatment typically takes 20–45 minutes.",
    icon: "syringe" as const,
  },
  {
    title: "After your treatment",
    text: "Your skin may appear pink to moderately red - similar to a mild sunburn - with slight warmth or tightness. These effects are normal and generally improve within 24–72 hours. Your provider applies soothing post-treatment products and reviews personalized aftercare instructions.",
    icon: "shieldCheck" as const,
  },
  {
    title: "Results",
    text: "Many patients notice a healthy glow within the first week, and collagen remodeling continues beneath the skin for several weeks. For optimal results, most patients benefit from a series of 3–6 treatments spaced approximately 4–6 weeks apart.",
    icon: "award" as const,
  },
];

const CONCERNS = [
  "Acne and acne scars",
  "Other scarring",
  "Sun damage",
  "Large pores",
  "Rosacea",
  "Fine lines",
  "Melasma",
  "Loose skin",
  "Uneven skin texture",
  "Stretch marks",
  "Hyperpigmentation",
];

const FAQS = [
  {
    question: "What is microneedling?",
    answer:
      "Microneedling is one of the most popular and effective skincare treatments available today. It gets its name from the tiny, fine needles used to create micro-injuries in the skin, which trigger the body’s natural healing process. This process not only rejuvenates the skin but also stimulates the production of new collagen - leading to smoother, firmer, healthier-looking skin.",
  },
  {
    question: "What happens during a microneedling appointment?",
    answer:
      "Your face is thoroughly cleansed and a topical anesthetic is applied to minimize discomfort (30–60 minutes to take full effect). Once numb, a derma-roller or microneedling machine gently passes over the skin, creating tiny punctures. The microneedling process itself takes about 15 minutes for the face. After treatment, a cooling mask is applied for about half an hour, followed by topical skincare products or serum to enhance results.",
  },
  {
    question: "How does microneedling work?",
    answer:
      "The tiny needles create micro-injuries in the skin, which activate the body’s natural wound repair process. This stimulates the production of both collagen and elastin, leading to significantly improved and more radiant skin. Microneedling addresses various skin concerns and boosts collagen production, making it effective for both anti-aging and skin repair.",
  },
  {
    question: "What is the downtime after microneedling?",
    answer:
      "Downtime is minimal, but you should expect noticeable redness after your appointment - similar to a mild sunburn. It’s advisable not to plan on returning to work or going anywhere for the rest of the day. Applying a moisturizer with ceramide can help keep your skin hydrated. Avoid sun exposure, exfoliating products, alcohol-based toners, and the gym/sauna/hot tub for at least 24 hours. By the next day your skin should return to normal color, and by day three you’ll notice more radiance and glow.",
  },
  {
    question: "Can microneedling be combined with other treatments?",
    answer:
      "Yes. Many patients opt to combine microneedling with serums or other topicals during treatment. Incorporating elements like vitamins, Botox®, or even platelet-rich plasma (PRP) can enhance the results of your microneedling session. Ask us about the options available to further boost your treatment outcomes.",
  },
  {
    question: "How many sessions will I need?",
    answer:
      "For the best outcomes, multiple treatments are usually recommended. Your provider will design a plan based on your specific skin concerns and goals during your consultation.",
  },
];

export default function MicroneedlingPage() {
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
              { name: "Microneedling", path: PATH },
            ]),
            faqSchema(FAQS),
          ]),
        }}
      />

      <PageHero
        eyebrow={"Aesthetics · Microneedling"}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Aesthetics", href: "/aesthetics/" },
          { label: "Microneedling" },
        ]}
        title={
          <>
            <span className="relative inline-block italic text-revival-gold">
              Microneedling
              <span
                aria-hidden
                className="absolute -bottom-2 left-0 h-[3px] w-full bg-gradient-to-r from-revival-gold to-transparent"
              />
            </span>
          </>
        }
        description={"If you’re looking to improve the appearance of your skin or want to boost collagen production, microneedling is an excellent option - a cutting-edge solution for healthier, more youthful skin."}
        gallery={[
          "/images/microneedling/what_is_microneedling_header.webp",
          "/images/microneedling/microneedling.avif",
        ]}
        compact
      />

      <OverviewBlock
        section={{
          eyebrow: "Microneedling Treatments",
          heading:
            "A cutting-edge solution for healthier, more youthful skin",
          paragraphs: [
            "If you’re looking to improve the appearance of your skin or want to boost collagen production, microneedling is an excellent option. Revival Health and Wellness offers microneedling treatments, providing you with a cutting-edge solution for achieving healthier, more youthful skin.",
          ],
          image: "/images/microneedling/microneedling.avif",
          imageAspect: "landscape",
        }}
      />

      <OverviewBlock
        tone="cream"
        reverse
        section={{
          eyebrow: "What to expect",
          heading: "Your microneedling appointment, start to finish",
          paragraphs: [
            "On the day of your appointment, your face is thoroughly cleansed and a topical anesthetic is applied. It typically takes 30 minutes to an hour for the anesthetic to take full effect. Once you’re properly numbed, a derma-roller or microneedling machine gently passes over the skin, creating tiny punctures. The microneedling process itself takes about 15 minutes for the face.",
            "After the treatment, a cooling mask is applied for approximately half an hour to soothe the skin, followed by topical skincare products or a serum to enhance results. The downtime is minimal, but expect to leave with noticeable redness - similar to a mild sunburn - for the rest of the day. By the next day, your skin should return to its normal color, and by day three you’ll notice more radiance and glow.",
            "For at least 24 hours after your treatment, avoid sun exposure, exfoliating products, alcohol-based toners, and activities like the gym, sauna, or hot tub. Applying a moisturizer with ceramide can help keep your skin hydrated.",
          ],
          image: "/images/microneedling/close-beauty-portrait-serum-hydration.webp",
          imageAspect: "landscape",
        }}
      />

      <PillarsGrid
        eyebrow="Your visit, step by step"
        heading="What to expect during your microneedling appointment"
        intro="From your arrival to the collagen remodeling that continues for weeks after, here’s exactly what a Revival microneedling visit looks like."
        pillars={APPOINTMENT_STEPS}
      />

      <OverviewBlock
        section={{
          eyebrow: "What is microneedling?",
          heading:
            "Tiny needles. Big collagen response.",
          paragraphs: [
            "Microneedling is one of the most popular and effective skincare treatments available today. It gets its name from the tiny, fine needles used to create micro-injuries in the skin, which trigger the body’s natural healing process.",
            "This process not only rejuvenates the skin but also stimulates the production of new collagen. The end result is smoother, firmer, and healthier-looking skin.",
          ],
        }}
      />

      <BenefitsList
        eyebrow="Commonly treated concerns"
        heading="What microneedling can improve"
        items={CONCERNS}
        image="/images/microneedling/IMG_1917-rotated-1.jpg"
      />

      <OverviewBlock
        tone="cream"
        section={{
          eyebrow: "Additions to microneedling",
          heading: "Boost your treatment with add-ons",
          paragraphs: [
            "Many patients opt to combine microneedling with serums or other topicals during treatment. Incorporating elements like vitamins, Botox®, platelet-rich plasma (PRP), or topical Sculptra can enhance the results of your microneedling session - amplifying collagen stimulation and delivering deeper, longer-lasting skin quality improvements.",
            "If you’re considering microneedling, ask us about the options available to further boost your treatment outcomes.",
          ],
        }}
      />

      <OverviewBlock
        reverse
        section={{
          eyebrow: "How microneedling works",
          heading: "Micro-injuries → collagen & elastin → radiant skin",
          paragraphs: [
            "The tiny needles used in microneedling can be part of a tool known as a derma-roller or a specialized microneedling machine. Regardless of the method, the needles are very small and precisely designed. They create micro-injuries in the skin, which activate the body’s natural wound repair process.",
            "This process stimulates the production of both collagen and elastin, leading to significantly improved and more radiant skin. Microneedling not only addresses various skin concerns but also boosts collagen production, making it an effective treatment for both anti-aging and skin repair.",
          ],
        }}
      />

      <FAQSection faqs={FAQS} />

      <RelatedServices
        items={[
          {
            label: "PRP Hair restoration",
            href: "/prp-hair-restoration/",
            blurb:
              "Similar PRP science applied to the scalp - revitalize thinning hair with your own growth factors.",
          },
          {
            label: "Under-eye treatment",
            href: "/under-eye-treatment/",
            blurb:
              "Target dark circles, puffiness, and fine lines to brighten and rejuvenate the under-eye area.",
          },
          {
            label: "Botox",
            href: "/botox/",
            blurb:
              "Combine with microneedling for a complete anti-aging protocol - texture plus fine-line smoothing.",
          },
        ]}
      />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-14 lg:px-8">
        <CTABanner
          title="Ready for smoother, glowing skin?"
          subtitle="Book a free consultation. Our team will design a microneedling protocol tailored to your goals."
        />
      </div>
    </>
  );
}
