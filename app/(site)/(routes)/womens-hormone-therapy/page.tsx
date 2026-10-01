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
} from "@/components/templates/HormoneSections";
const TITLE = "Women's Hormone Therapy";
const PATH = "/womens-hormone-therapy/";
const META_TITLE = "Women's Hormone Replacement Therapy";
const DESCRIPTION =
  "Relieve symptoms of menopause & imbalance with women's hormone therapy in Las Vegas. Revival Health and Wellness creates custom plans to help you feel like you.";

export async function generateMetadata() {
  const fallback = buildMetadata({
  title: META_TITLE,
  description: DESCRIPTION,
  path: PATH,
});
  return cmsPageMetadata(fallback);
}

const BENEFITS = [
  "Increased sex drive and pleasure",
  "Relief from vaginal dryness and discomfort",
  "Reduced hot flashes and night sweats",
  "More stable mood and fewer swings",
  "Boosted energy and physical strength",
  "Relief from anxiety, low mood, and insomnia",
  "Sharper mental clarity, less brain fog",
  "Stronger immune response and healing",
  "Better weight and body composition",
  "Improved cardiovascular health",
  "Reduced adrenal, thyroid, PMS and peri-menopause imbalance",
];

const FAQS = [
  {
    question: "What is women's hormone therapy?",
    answer:
      "It's a personalized plan that replaces the hormones-primarily estrogen, progesterone, and testosterone-your body no longer produces in adequate amounts. The goal is to restore your natural balance and relieve menopause and perimenopause symptoms.",
  },
  {
    question: "How is women's hormone therapy administered?",
    answer:
      "Most of our patients use bio-identical hormone pellets inserted under the skin in the hip or buttock area. The pellets release small, steady amounts of hormone directly into the bloodstream over several months, closely mimicking natural production.",
  },
  {
    question: "Am I a candidate for HRT?",
    answer:
      "If you're experiencing insomnia, mood swings, fatigue, weight changes, low libido, or menopause symptoms, a custom bio-identical program may be ideal. A short lab panel and consultation confirms whether HRT is right for you.",
  },
  {
    question: "How do bio-identical hormone pellets work?",
    answer:
      "Bio-identical pellets are exact molecular copies of the hormones your body makes. They fully dissolve and absorb, releasing hormone steadily over 3–4 months without daily creams, pills, or injections.",
  },
];

export default function WomensHormoneTherapyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd([
            serviceSchema({ name: TITLE, description: DESCRIPTION, path: PATH }),
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Hormone Therapy", path: "/hormone-therapy/" },
              { name: TITLE, path: PATH },
            ]),
            faqSchema(FAQS),
          ]),
        }}
      />

      <PageHero
        eyebrow="Women's Hormone Therapy"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Hormone Therapy", href: "/hormone-therapy/" },
          { label: "Women's Hormone Therapy" },
        ]}
        title={
          <>
            Feel vibrant,{" "}
            <span className="italic text-revival-gold">energized</span>, and
            more like yourself
          </>
        }
        description="Aging doesn't have to mean losing your glow. Our women's hormone therapy gently restores your body's natural balance so you feel like yourself again."
        gallery={[
          "/images/hormone/hormone-couple-sunset.jpg",
          "/images/hormone/hormone-couple-bedroom.webp",
          "/images/hormone/hormone-couple-park.avif",
        ]}
        compact
      />

      <OverviewBlock
        section={{
          eyebrow: "The Basics",
          heading: "What is hormone therapy?",
          paragraphs: [
            "Hormone therapy safely replaces the hormones your body can no longer produce on its own during perimenopause, menopause, and beyond. Every treatment is personalized to your labs, symptoms, and goals.",
            "By restoring hormones to a more youthful range, HRT eases the physical and emotional shifts that make daily life feel harder than it should-without the guesswork of trying to power through them.",
          ],
          image: "/images/hormone/hormone-couple-sunset.jpg",
        }}
      />

      <OverviewBlock
        tone="cream"
        section={{
          eyebrow: "Delivery Method",
          heading: "How bio-identical hormone pellets work",
          paragraphs: [
            "Our preferred method for many patients is bio-identical hormone pellets, placed just under the skin in the hip or buttock area. Once implanted, the pellets release small, steady amounts of hormone directly into your bloodstream-mimicking the natural rhythm your ovaries once provided.",
            "Because bio-identical pellets contain only the hormone itself, there's no synthetic filler; they fully dissolve and are absorbed by your body over three to four months.",
          ],
        }}
      />

      <PillarsGrid
        eyebrow="Who it's for"
        heading="Candidates for hormone replacement therapy"
        intro="A custom bio-identical program may be an excellent fit if you've been experiencing any of these symptoms."
        pillars={[
          {
            title: "Low energy & fatigue",
            text: "Persistent tiredness even after a full night of sleep, or difficulty pushing through a normal day.",
            icon: "battery",
          },
          {
            title: "Hot flashes & night sweats",
            text: "Sudden waves of heat, flushing, and interrupted sleep that disrupt your day-to-day comfort.",
            icon: "flame",
          },
          {
            title: "Mood swings & anxiety",
            text: "Irritability, low mood, or anxiety that feels tied to your cycle or menopausal changes.",
            icon: "smile",
          },
          {
            title: "Sleep disturbance",
            text: "Trouble falling asleep, waking through the night, or waking up unrested.",
            icon: "moon",
          },
          {
            title: "Weight & body composition",
            text: "Unexplained weight gain, especially around the midsection, or trouble maintaining muscle.",
            icon: "heartPulse",
          },
          {
            title: "Reduced libido",
            text: "A drop in sexual desire, dryness, or discomfort that's affecting intimacy.",
            icon: "sparkles",
          },
        ]}
      />

      <BenefitsList
        eyebrow="Key benefits"
        heading="What hormone therapy can help you feel"
        items={BENEFITS}
        image="/images/hormone/hormone-couple-bedroom.webp"
      />

      <PillarsGrid
        tone="dark"
        eyebrow="Four key areas we improve"
        heading="A personalized plan, four focused outcomes"
        pillars={[
          {
            title: "Energy & lean muscle",
            text: "Restoring balance boosts overall energy so building and maintaining lean muscle is easier.",
            icon: "battery",
          },
          {
            title: "Sex drive",
            text: "The right hormones can meaningfully improve libido and sexual comfort.",
            icon: "flame",
          },
          {
            title: "Mood stability",
            text: "Reduce depression, irritability, and anxiety for better day-to-day wellbeing.",
            icon: "smile",
          },
          {
            title: "Cardiovascular support",
            text: "Improved circulation and vessel function so oxygen and nutrients reach where they need to.",
            icon: "heartPulse",
          },
        ]}
      />

      <FAQSection faqs={FAQS} />

      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <CTABanner
          title="Ready to feel like you again?"
          subtitle="Book a free consultation-our team will review your labs and design a plan around your body."
        />
      </div>
    </>
  );
}
