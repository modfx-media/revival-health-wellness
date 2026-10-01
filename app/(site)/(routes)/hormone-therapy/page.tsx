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
import HormoneStagesShowcase from "@/components/hormone/HormoneStagesShowcase";
import {
  OverviewBlock,
  PillarsGrid,
  FAQSection,
  RelatedServices,
} from "@/components/templates/HormoneSections";

const TITLE = "Hormone Therapy";
const PATH = "/hormone-therapy/";
const META_TITLE = "Hormone Replacement Therapy";
const DESCRIPTION =
  "Balance your body with hormone replacement therapy in Las Vegas. Revival Health and Wellness helps you regain energy and improve your overall quality of life.";

export async function generateMetadata() {
  const fallback = buildMetadata({
  title: META_TITLE,
  description: DESCRIPTION,
  path: PATH,
});
  return cmsPageMetadata(fallback);
}

const FAQS = [
  {
    question: "What is hormone replacement therapy (HRT)?",
    answer:
      "HRT reintroduces hormones your body no longer produces in adequate amounts, using one hormone or a combination tailored to your chemistry. The goal is to relieve age-related symptoms and restore energy, mood, and vitality.",
  },
  {
    question: "How is hormone therapy administered?",
    answer:
      "Depending on your plan we may use bio-identical hormone pellets inserted in the hip or buttock, testosterone injections, topical creams, or oral options. Pellets release small, steady doses directly into the bloodstream over several months.",
  },
  {
    question: "Is hormone therapy right for me?",
    answer:
      "If you're experiencing low energy, weight changes, mood swings, poor sleep, decreased libido, or menopause-related symptoms, HRT may help. We start with lab work and a consultation to confirm you're a good candidate.",
  },
  {
    question: "How long before I see results?",
    answer:
      "Most patients begin noticing improvements in energy, sleep, and mood within 2–4 weeks. Full results typically emerge over 3–6 months as your body stabilizes on the protocol.",
  },
];

export default function HormoneTherapyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd([
            serviceSchema({ name: TITLE, description: DESCRIPTION, path: PATH }),
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: TITLE, path: PATH },
            ]),
            faqSchema(FAQS),
          ]),
        }}
      />

      <PageHero
        eyebrow="Hormone Therapy"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: TITLE }]}
        title={
          <>
            Comprehensive{" "}
            <span className="italic text-revival-gold">hormone therapy</span>{" "}
            for optimal health
          </>
        }
        description="Hormones fluctuate as we age, and even small shifts can leave you feeling off. Our personalized HRT restores balance to your unique body chemistry so you can feel like yourself again."
        gallery={[
          "/images/hormone/hormone-couple-park.avif",
          "/images/hormone/hormone-couple-fit.jpg",
          "/images/hormone/hormone-couple-sunset.jpg",
          "/images/hormone/hormone-couple-bedroom.webp",
        ]}
        compact
      />

      <OverviewBlock
        section={{
          eyebrow: "The Basics",
          heading: "What is hormone therapy?",
          paragraphs: [
            "Hormone replacement therapy relieves many of the natural side effects of aging-low mood and libido in men, and menopause symptoms in women. By replacing what your body no longer produces in adequate amounts, HRT restores balance and helps you feel your best.",
            "There is no one-size-fits-all HRT. We build a plan around your labs, symptoms, goals, and lifestyle so the specific hormones, doses, and delivery method are matched to you.",
          ],
          image: "/images/hormone/hormone-couple-piggyback.jpg",
          imageAspect: "portrait",
        }}
      />

      <HormoneStagesShowcase />

      <OverviewBlock
        tone="dark"
        section={{
          eyebrow: "How we approach it",
          heading: "A hormone plan built around you",
          paragraphs: [
            "HRT is patient-dependent. We select the right hormones, method, and dose to address your symptoms while accounting for your lifestyle, goals, and habits.",
            "Common delivery methods include bio-identical hormone pellets (implanted in the hip or buttock area), testosterone injections, topical creams, and oral therapies. Pellets slowly release hormones over months, keeping levels steady and predictable.",
          ],
          image: "/images/hormone/hormone-couple-fit.jpg",
          bullets: [
            "Comprehensive lab panel to establish your baseline",
            "Physician-led plan tailored to your body",
            "Ongoing monitoring and dose adjustment",
            "Discreet, concierge-level care",
          ],
        }}
      />

      <PillarsGrid
        tone="cream"
        eyebrow="Why patients choose Revival"
        heading="Care that feels different"
        pillars={[
          {
            title: "Physician-led",
            text: "Every protocol is designed and monitored by our medical team-not a chatbot or a portal.",
            icon: "shieldCheck",
          },
          {
            title: "Family-first culture",
            text: "You'll be treated like a person, not a patient number. We listen, we follow up, we adjust.",
            icon: "users",
          },
          {
            title: "Results-oriented",
            text: "Regular check-ins and lab retests so we can prove your plan is actually working.",
            icon: "sparkles",
          },
        ]}
      />

      <FAQSection faqs={FAQS} />

      <RelatedServices
        items={[
          {
            label: "Women's Hormone Therapy",
            href: "/womens-hormone-therapy/",
            blurb:
              "Balance perimenopause and menopause symptoms with a personalized bio-identical program.",
          },
          {
            label: "Men's Hormone Therapy",
            href: "/mens-hormone-therapy/",
            blurb:
              "Testosterone therapy to restore energy, drive, muscle, and cardiovascular health.",
          },
          {
            label: "Growth Hormone Optimization",
            href: "/growth-hormone-optimization/",
            blurb:
              "Rebuild lean muscle, sharpen recovery, and improve body composition.",
          },
        ]}
      />

      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <CTABanner
          title="Ready to feel like yourself again?"
          subtitle="Book a free consultation and lab review with our medical team-we'll build a plan for your body, not a template."
        />
      </div>
    </>
  );
}
