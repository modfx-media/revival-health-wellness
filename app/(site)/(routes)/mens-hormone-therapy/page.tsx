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
  VideoShowcase,
} from "@/components/templates/HormoneSections";
const TITLE = "Men's Hormone Therapy";
const PATH = "/mens-hormone-therapy/";
const META_TITLE = "Men's Hormone Replacement Therapy";
const DESCRIPTION =
  "Improve your drive and muscle tone with men's hormone therapy in Las Vegas. Revival Health and Wellness provides expert care to help men optimize their health.";

export async function generateMetadata() {
  const fallback = buildMetadata({
  title: META_TITLE,
  description: DESCRIPTION,
  path: PATH,
});
  return cmsPageMetadata(fallback);
}

const BENEFITS = [
  "Renewed energy and daily stamina",
  "Support in building and maintaining lean muscle",
  "Faster recovery between workouts",
  "Reduced signs of aging, including hair loss",
  "Restored sex drive and stamina",
  "Sharper mood and reduced irritability",
  "Better sleep quality",
  "Support for healthy cholesterol levels",
  "Reduced arterial plaque buildup",
  "Significantly lower risk of heart attack and stroke",
];

const FAQS = [
  {
    question: "What is testosterone therapy?",
    answer:
      "Testosterone therapy replaces the testosterone your body no longer produces in adequate amounts, using bio-identical hormones designed to be exact molecular copies of what your body naturally makes. The result is 100% natural, tailored, and highly effective care.",
  },
  {
    question: "How do bio-identical hormones work?",
    answer:
      "Bio-identical hormones are structurally identical to the ones your body produces, which makes them recognized and used just like the real thing. Our specialists design your plan, test regularly, and monitor results so we can adjust as your body responds.",
  },
  {
    question: "How is testosterone therapy administered?",
    answer:
      "We offer both injections and pellet implantation. Pellets are placed under the skin in the hip or buttock area and gradually release small amounts of testosterone directly into the bloodstream for consistent, effective hormone delivery.",
  },
  {
    question: "When will I feel the difference?",
    answer:
      "Most men notice improved energy, focus, and drive within a few weeks. Muscle tone, recovery, and cardiovascular markers usually take 2–4 months to fully improve as your body stabilizes.",
  },
];

export default function MensHormoneTherapyPage() {
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
        eyebrow="Men's Hormone Therapy"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Hormone Therapy", href: "/hormone-therapy/" },
          { label: "Men's Hormone Therapy" },
        ]}
        title={
          <>
            Testosterone therapy that restores{" "}
            <span className="italic text-revival-gold">youthful vigor</span>
          </>
        }
        description="With age, men often experience a decline in strength, energy, and libido. Advanced bio-identical testosterone therapy helps you rebalance and live at full capacity again."
        gallery={[
          "/images/page-banners/mens-hormone-therapy-banner-1.webp",
          "/images/page-banners/mens-hormone-therapy-banner-2.jpeg",
          "/images/page-banners/mens-hormone-therapy-banner-3.jpeg",
        ]}
        compact
      />

      <OverviewBlock
        section={{
          eyebrow: "Testosterone Therapy for Men",
          heading: "What is testosterone therapy?",
          paragraphs: [
            "Weight gain, loss of muscle mass, trouble sleeping, erectile dysfunction, and persistent fatigue are commonly linked to age-related hormonal shifts. By restoring testosterone to a healthy range with targeted therapy, many of these symptoms can be significantly reduced-or eliminated.",
            "Our advanced bio-identical testosterone therapy gives your body the tools it needs to combat aging and feel your best, without the guesswork of over-the-counter fixes.",
          ],
          image: "/images/hormone/testosterone-therapy.jpeg",
        }}
      />

      <OverviewBlock
        tone="cream"
        section={{
          eyebrow: "The Science",
          heading: "How do bio-identical hormones work?",
          paragraphs: [
            "Bio-identical hormones are crafted to be exact replicas of the hormones your body already produces. That means treatment is natural, tailored, and highly effective.",
            "Our specialists go beyond just prescribing a plan-we conduct thorough baseline testing, review your labs, and continuously monitor your response so we can adjust and keep you on track.",
          ],
        }}
      />

      <PillarsGrid
        tone="dark"
        eyebrow="Four key benefits"
        heading="Where testosterone therapy makes a difference"
        pillars={[
          {
            title: "Energy",
            text: "Restoring testosterone brings back the youthful energy you once had, so you can live the lifestyle you want, build and maintain lean muscle, and recover faster between workouts.",
            icon: "zap",
          },
          {
            title: "Libido",
            text: "Testosterone naturally declines with age. Bringing levels back up can restore sex drive and stamina for more satisfying intimacy.",
            icon: "flame",
          },
          {
            title: "Mood",
            text: "Low testosterone can trigger irritability and low mood. Therapy helps stabilize how you feel day-to-day so you can function at your best.",
            icon: "smile",
          },
          {
            title: "Cardiovascular health",
            text: "Balanced testosterone supports healthy cholesterol and can reduce arterial plaque, lowering the risk of heart attack and stroke.",
            icon: "heartPulse",
          },
        ]}
      />

      <VideoShowcase
        eyebrow="See it in action"
        heading="Watch how testosterone therapy works at Revival"
        intro="Hear directly from our team about what to expect from bio-identical testosterone therapy."
        src="/videos/mens-hormone-therapy.mp4"
        poster="/videos/mens-hormone-therapy-poster.jpg"
      />

      <BenefitsList
        eyebrow="What you can expect"
        heading="Real, measurable results"
        items={BENEFITS}
        image="/images/hormone/mens-real-results.webp"
      />

      <OverviewBlock
        section={{
          eyebrow: "How it's delivered",
          heading: "Injections or pellet implantation",
          paragraphs: [
            "At Revival we offer testosterone treatments via injections or pellet implantation. Pellets are placed under the skin in the hip or buttock area, releasing small amounts of testosterone directly into the bloodstream for consistent and effective hormone delivery.",
            "You are never too young or too old to feel your best. We'll match the method to your body, your schedule, and your goals.",
          ],
          bullets: [
            "Bio-identical, physician-designed protocols",
            "Baseline labs and ongoing monitoring",
            "Same-week appointments in Las Vegas",
            "Discreet, concierge-level care",
          ],
        }}
      />

      <PillarsGrid
        tone="cream"
        eyebrow="Common symptoms we address"
        heading="If this sounds familiar, therapy can help"
        pillars={[
          {
            title: "Low energy & fatigue",
            text: "Tired even after a full night's sleep or struggling to get through the day.",
            icon: "activity",
          },
          {
            title: "Loss of muscle & strength",
            text: "Harder to hold onto lean muscle or make progress in the gym.",
            icon: "dumbbell",
          },
          {
            title: "Reduced drive",
            text: "Noticeable drop in libido, motivation, and confidence.",
            icon: "flame",
          },
        ]}
      />

      <FAQSection faqs={FAQS} />

      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <CTABanner
          title="Get your energy back."
          subtitle="Book a free consultation. We'll pull your labs, review your symptoms, and design a plan for you."
        />
      </div>
    </>
  );
}
