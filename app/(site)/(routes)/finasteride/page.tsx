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
  FAQSection,
  RelatedServices,
} from "@/components/templates/HormoneSections";

const TITLE = "Finasteride Hair Loss Treatments";
const PATH = "/finasteride/";
const DESCRIPTION =
  "Stop thinning hair with finasteride hair loss treatments in Las Vegas. Revival Health and Wellness gives you the medical support needed to maintain your hair.";

export async function generateMetadata() {
  const fallback = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  images: ["/images/finasteride/adult-male-having-balding-problems_27122961-7e8b-4c04-92d7-e0da2c9d76bf.webp"],
});
  return cmsPageMetadata(fallback);
}

const FAQS = [
  {
    question: "What is finasteride?",
    answer:
      "Finasteride is an FDA-approved oral medication for hair loss. It’s shown to slow down hair loss in about 88% of men and help regrow hair in around 66%. With these success rates, it’s clear that this treatment has been highly effective for many people.",
  },
  {
    question: "How does finasteride work?",
    answer:
      "Finasteride works by blocking DHT, a hormone that contributes to hair loss. Instead of focusing on hair grafts or enlarging follicles, finasteride tackles the root cause by binding to an enzyme called 5α-Reductase and reducing the amount of DHT in your body.",
  },
  {
    question: "When will I see results?",
    answer:
      "Everyone responds differently to finasteride. For some people, it might take about four months of daily use before you start to see results, while for others, it could take six months or longer. During your consultation, we’ll talk about when you might begin to notice changes and explain the stages of hair growth so you know what to expect throughout the process.",
  },
  {
    question: "Are there any side effects?",
    answer:
      "A first check-up is important to find any possible unwanted reactions, seeing that finasteride can seriously impact some men negatively. We need to confirm that finasteride is safe and secure for you. During this consultation, we’ll review your past health records, discuss any potential side effects, and ensure you are fully aware of all the needed facts to make a smart decision about this therapy.",
  },
];

export default function FinasteridePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd([
            serviceSchema({ name: TITLE, description: DESCRIPTION, path: PATH }),
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Hair", path: "/hair/" },
              { name: "Finasteride", path: PATH },
            ]),
            faqSchema(FAQS),
          ]),
        }}
      />

      <PageHero
        eyebrow={"Hair · Finasteride"}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Hair", href: "/hair/" },
          { label: "Finasteride" },
        ]}
        title={
          <>
            <span className="relative inline-block italic text-revival-gold">
              Finasteride
              <span
                aria-hidden
                className="absolute -bottom-2 left-0 h-[3px] w-full bg-gradient-to-r from-revival-gold to-transparent"
              />
            </span>
          </>
        }
        description="FDA-approved oral medication that blocks DHT - the hormone that contributes to hair loss. A clinically proven way to slow thinning, strengthen existing hair, and regrow fuller, healthier hair."
        gallery={[
          "/images/finasteride/adult-male-having-balding-problems_27122961-7e8b-4c04-92d7-e0da2c9d76bf.webp",
          "/images/finasteride/finasteride-hair-growth-concept-e1756409813870.webp",
        ]}
        compact
      />

      <OverviewBlock
        section={{
          eyebrow: "Finasteride Hair Loss Treatments",
          heading:
            "Maintain a healthy scalp - and a fuller head of hair",
          paragraphs: [
            "Hair loss can show up in different ways, like a receding hairline, expanding bald spots, or thinning hair all over your head. For many men, hair is closely tied to their sense of attractiveness and youth.",
            "That’s why Revival Health and Wellness offers finasteride, to help you maintain a healthy scalp and achieve a fuller head of hair.",
          ],
          image: "/images/finasteride/adult-male-having-balding-problems_27122961-7e8b-4c04-92d7-e0da2c9d76bf.webp",
          imageAspect: "landscape",
        }}
      />

      <OverviewBlock
        tone="cream"
        reverse
        section={{
          eyebrow: "What is finasteride?",
          heading:
            "FDA-approved. 88% see less loss. 66% see regrowth.",
          paragraphs: [
            "Finasteride is an FDA-approved oral medication for hair loss. It’s shown to slow down hair loss in about 88% of men and help regrow hair in around 66%.",
            "With these success rates, it’s clear that this treatment has been highly effective for many people looking to reverse the progression of male-pattern hair loss.",
          ],
        }}
      />

      <OverviewBlock
        section={{
          eyebrow: "How finasteride works",
          heading:
            "Blocks DHT - the hormone driving hair loss",
          paragraphs: [
            "Finasteride works by blocking DHT, a hormone that contributes to hair loss. Instead of focusing on hair grafts or enlarging follicles, finasteride tackles the root cause by binding to an enzyme called 5α-Reductase and reducing the amount of DHT in your body.",
          ],
          image: "/images/finasteride/finasteride-hair-growth-concept-e1756409813870.webp",
        }}
      />

      <OverviewBlock
        tone="cream"
        reverse
        section={{
          eyebrow: "How It Works and Success Rates",
          heading: "Consistent daily use, personalized timeline",
          paragraphs: [
            "Everyone responds differently to finasteride. For some people, it might take about four months of daily use before you start to see results, while for others, it could take six months or longer.",
            "During your consultation, we’ll talk about when you might begin to notice changes and explain the stages of hair growth so you know what to expect throughout the process.",
          ],
        }}
      />

      <OverviewBlock
        section={{
          eyebrow: "Are there any side effects with finasteride?",
          heading:
            "A thorough first check-up ensures it’s safe for you",
          paragraphs: [
            "A first check-up is important to find any possible unwanted reactions, seeing that finasteride can seriously impact some men negatively. We need to confirm that finasteride is okay and secure for you.",
            "During this consultation, we’ll review your past health records, discuss any potential side effects, and ensure you are fully aware of all the needed facts to make a smart decision about this therapy.",
          ],
        }}
      />

      <FAQSection faqs={FAQS} />

      <RelatedServices
        items={[
          {
            label: "PRP Hair Restoration",
            href: "/prp-hair-restoration/",
            blurb:
              "Natural growth-factor therapy that pairs beautifully with finasteride - tackle hair loss from both angles.",
          },
          {
            label: "Hair Services Overview",
            href: "/hair/",
            blurb:
              "Explore the full medical hair care & restoration program at Revival Health and Wellness.",
          },
          {
            label: "Men’s Hormone Therapy",
            href: "/mens-hormone-therapy/",
            blurb:
              "Optimize testosterone, energy, and overall wellness - an important adjacent piece for men’s health.",
          },
        ]}
      />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-14 lg:px-8">
        <CTABanner
          title="Ready to slow the loss and rebuild your hair?"
          subtitle="Book a free consultation. Our medical team will confirm finasteride is right for you and start your treatment plan."
        />
      </div>
    </>
  );
}
