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
import VitaminBoostDetails from "@/components/weight-loss/VitaminBoostDetails";
import WeightLossTestimonials from "@/components/weight-loss/WeightLossTestimonials";
import {
  OverviewBlock,
  PillarsGrid,
  BenefitsList,
  FAQSection,
  RelatedServices,
  VideoShowcase,
} from "@/components/templates/HormoneSections";

const TITLE = "Vitamin Injection";
const PATH = "/vitamin-injections/";
const META_TITLE = "Vitamin Booster Injections";
const DESCRIPTION =
  "Increase your energy and wellness with vitamin booster injections in Las Vegas. Revival Health and Wellness helps you feel refreshed with vital nutrients.";

export async function generateMetadata() {
  const fallback = buildMetadata({
  title: META_TITLE,
  description: DESCRIPTION,
  path: PATH,
});
  return cmsPageMetadata(fallback);
}

const BOOSTER_OPTIONS = [
  {
    title: "B12",
    text: "Fights fatigue, supports red-blood-cell production, and sharpens focus and mood.",
    icon: "zap" as const,
  },
  {
    title: "Vitamin D",
    text: "Supports immune function, bone health, and mood regulation-especially useful indoors.",
    icon: "shieldCheck" as const,
  },
  {
    title: "Glutathione",
    text: "Master antioxidant that supports detoxification, skin brightness, and cellular repair.",
    icon: "sparkles" as const,
  },
  {
    title: "Biotin",
    text: "Supports healthy hair, skin, and nails, plus energy metabolism from carbs and fats.",
    icon: "leaf" as const,
  },
  {
    title: "Lipo-B (MIC)",
    text: "Methionine, Inositol, and Choline paired with B12 to support fat metabolism.",
    icon: "flame" as const,
  },
  {
    title: "Vitamin C",
    text: "Immune support, collagen synthesis, and antioxidant defense for daily wellness.",
    icon: "droplet" as const,
  },
];

const BENEFITS = [
  "Improved energy and reduced fatigue",
  "Stronger immune response",
  "Enhanced metabolic support",
  "Support for hair, skin, and nail health",
  "Antioxidant and detox support",
  "Faster recovery after workouts or travel",
  "Higher bioavailability than oral supplements",
  "Quick, low-downtime appointments",
];

const FAQS = [
  {
    question: "What is a vitamin booster injection?",
    answer:
      "A vitamin booster is a small intramuscular injection of concentrated vitamins, minerals, and antioxidants. Because it bypasses the digestive system, absorption is much higher than with oral supplements.",
  },
  {
    question: "How often can I get one?",
    answer:
      "Most patients benefit from weekly or biweekly injections during their program, then move to monthly maintenance. We'll match the cadence to your goals during your consultation.",
  },
  {
    question: "Which injection is right for me?",
    answer:
      "It depends on what you're solving for-energy, immunity, weight-loss support, recovery, or skin brightness. We recommend a specific booster (or combination) based on your labs and goals.",
  },
  {
    question: "Do they hurt?",
    answer:
      "Vitamin injections are quick and generally well tolerated. You may feel a small pinch, similar to a routine vaccination, and can return to normal activity immediately.",
  },
];

export default function VitaminInjectionsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd([
            serviceSchema({
              name: META_TITLE,
              description: DESCRIPTION,
              path: PATH,
            }),
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Weight Loss", path: "/weight-loss/" },
              { name: TITLE, path: PATH },
            ]),
            faqSchema(FAQS),
          ]),
        }}
      />

      <PageHero
        eyebrow="Wellness · Vitamin Injections"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Weight Loss", href: "/weight-loss/" },
          { label: "Vitamin Injection" },
        ]}
        title={
          <>
            <span className="relative inline-block">
              Vitamin
              <span
                aria-hidden
                className="absolute -bottom-2 left-0 h-[3px] w-full bg-gradient-to-r from-revival-gold to-transparent"
              />
            </span>{" "}
            <span className="italic text-revival-gold">Booster</span> Injections
          </>
        }
        description="Increase your energy and wellness with concentrated vitamin, mineral, and antioxidant injections delivered by our medical team in Las Vegas."
        gallery={[
          "/images/weight-loss/vitamin-injections-secondary.jpg",
        ]}
      />

      <OverviewBlock
        section={{
          eyebrow: "Vitamin Booster Injection",
          heading: "Vital nutrients, delivered where your body can use them",
          paragraphs: [
            "Oral supplements have to survive digestion before your body can use them. Vitamin injections skip that step entirely-delivering concentrated nutrients directly into your muscle for near-complete absorption.",
            "The result: faster energy, better immune support, and a more efficient way to correct real deficiencies alongside the rest of your health plan.",
          ],
          image: "/images/weight-loss/vitamin-booster-img.webp",
        }}
      />

      <BenefitsList
        eyebrow="The Value"
        heading="The value of vitamin injections"
        items={BENEFITS}
        image="/images/weight-loss/vitamin-injections-secondary.jpg"
      />

      <VitaminBoostDetails />

      <PillarsGrid
        tone="cream"
        eyebrow="Menu"
        heading="Vitamin booster options"
        intro="Choose the injection that fits your goal-or ask our team to recommend a combination based on your labs."
        pillars={BOOSTER_OPTIONS}
      />

      <VideoShowcase
        eyebrow="Track Real Results"
        heading="STYKU 3D body scanning technology"
        intro="Every visit includes a STYKU body scan, so you can see measurable changes in muscle, water, and fat-not just the number on the scale."
        src="/videos/styku.mp4"
        poster="/videos/styku-poster.jpg"
        aspect="portrait"
      />

      <FAQSection faqs={FAQS} />

      <WeightLossTestimonials />

      <RelatedServices
        items={[
          {
            label: "GLP-1",
            href: "/glp-1/",
            blurb:
              "Medically supervised GLP-1 for sustainable, appetite-focused weight loss.",
          },
          {
            label: "Phentermine",
            href: "/phentermine/",
            blurb:
              "A clinically proven appetite suppressant that kickstarts weight loss.",
          },
          {
            label: "IV Hydration",
            href: "/iv-hydration/",
            blurb:
              "Full IV drips for deeper hydration, recovery, and wellness support.",
          },
        ]}
      />

      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <CTABanner
          title="Feel a difference this week."
          subtitle="Book a free consultation and we'll match you to the right vitamin booster for your goals."
        />
      </div>
    </>
  );
}
