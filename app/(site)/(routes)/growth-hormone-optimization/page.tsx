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
const TITLE = "Growth Hormone Optimization";
const PATH = "/growth-hormone-optimization/";
const META_TITLE = "Growth Hormone Optimization";
const DESCRIPTION =
  "Support your recovery and vitality with growth hormone optimization in Las Vegas. Revival Health and Wellness offers safe ways to boost your physical performance.";

export async function generateMetadata() {
  const fallback = buildMetadata({
  title: META_TITLE,
  description: DESCRIPTION,
  path: PATH,
});
  return cmsPageMetadata(fallback);
}

const BENEFITS = [
  "Reduction in body fat, especially abdominal",
  "Improved endurance during exercise",
  "Relief from anxiety and low mood",
  "Increased bone mineral density",
  "Greater muscle mass and lean growth",
  "Counteracts glucocorticoid catabolic effects",
  "Enhanced cellular repair and regeneration",
];

const SYMPTOMS = [
  "Increased fat accumulation, especially around the abdomen",
  "Reduced muscle strength and endurance",
  "Lower energy levels",
  "Compromised bone density",
  "Elevated cholesterol",
  "Higher risk of cardiovascular disease and diabetes",
  "Desire to avoid social situations",
];

const CAUSES = [
  "Under-active hypothalamic drive",
  "Damage to the pituitary gland and hypothalamus",
  "Tumor in the pituitary gland or hypothalamus",
  "Surgery or radiation to remove a tumor",
];

const FAQS = [
  {
    question: "What is growth hormone deficiency?",
    answer:
      "Growth hormone is produced by the pituitary gland at the base of the brain and helps regulate body composition, fluids, muscle and bone growth, and mental function. A deficiency means your pituitary isn't producing enough to meet your body's needs.",
  },
  {
    question: "What causes growth hormone deficiency in adults?",
    answer:
      "Common causes include under-active hypothalamic drive, damage to the pituitary or hypothalamus, tumors in either area, or surgery or radiation to remove a tumor. A short workup helps identify the underlying cause.",
  },
  {
    question: "How is growth hormone optimization administered?",
    answer:
      "At Revival we carefully determine the appropriate dosage tailored to your needs. The treatment is administered via injections directly into the fat tissue beneath the skin.",
  },
  {
    question: "When will I feel the difference?",
    answer:
      "Most patients notice improvements in energy, sleep quality, and body composition within 6–12 weeks. Bone density and muscle changes typically emerge over 3–6 months of consistent therapy.",
  },
];

export default function GrowthHormoneOptimizationPage() {
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
        eyebrow="Growth Hormone Optimization"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Hormone Therapy", href: "/hormone-therapy/" },
          { label: "Growth Hormone Optimization" },
        ]}
        title={
          <>
            Rebuild recovery,{" "}
            <span className="italic text-revival-gold">strength</span>, and
            vitality
          </>
        }
        description="When adults develop growth hormone deficiency, the risks compound quickly. HGH optimization helps you regain control of your body composition and overall health."
        gallery={[
          "/images/hormone/growth-hormone-optimization.png",
          "/images/hormone/hormone-optimization.webp",
          "/images/hormone/hormone-couple-fit.jpg",
        ]}
        compact
      />

      <OverviewBlock
        section={{
          eyebrow: "The Basics",
          heading: "What is growth hormone deficiency?",
          paragraphs: [
            "Growth hormone, produced by the pituitary gland at the base of the brain, plays a crucial role in regulating body composition, fluids, muscle and bone growth, and mental function.",
            "When someone has a growth hormone deficiency, the pituitary isn't producing enough to meet the body's needs. That can lead to a range of medical issues-but growth hormone replacement can significantly improve many of the associated symptoms.",
          ],
          image: "/images/hormone/hormone-optimization.webp",
        }}
      />

      <BenefitsList
        eyebrow="Symptoms"
        heading="Symptoms of adult growth hormone deficiency"
        items={SYMPTOMS}
        motionGraphic
      />

      <OverviewBlock
        tone="dark"
        section={{
          eyebrow: "Why treat it",
          heading: "Medical dangers of growth hormone deficiency",
          paragraphs: [
            "Adults with a growth hormone deficiency are at higher risk of abnormal body composition-particularly abdominal fat accumulation-as well as cardiovascular disease and diabetes.",
            "The deficiency often leads to decreased muscle strength and endurance, making it harder to maintain an active lifestyle. Bone density may be compromised, increasing the risk of osteoporosis later in life, and cholesterol tends to run high.",
          ],
        }}
      />

      <PillarsGrid
        tone="cream"
        eyebrow="Common causes"
        heading="Causes of growth hormone deficiency in adults"
        pillars={[
          {
            title: "Under-active hypothalamic drive",
            text: "The hypothalamus isn't signaling the pituitary gland to release enough growth hormone.",
            icon: "brain",
          },
          {
            title: "Damage to pituitary/hypothalamus",
            text: "Injury or disease affecting the pituitary gland or hypothalamus that reduces hormone output.",
            icon: "activity",
          },
          {
            title: "Tumor or treatment",
            text: "A tumor in the pituitary or hypothalamus, or surgery/radiation to remove one, can affect production.",
            icon: "scale",
          },
        ]}
      />

      <OverviewBlock
        section={{
          eyebrow: "How we treat it",
          heading: "What medications are used?",
          paragraphs: [
            "At Revival Health and Wellness, we carefully determine the appropriate dosage of growth hormone optimization tailored to your specific needs. Treatment is administered via injections directly into the fat tissue beneath the skin.",
            "Every plan is built around your baseline labs and reviewed regularly to make sure the dose is right for your body.",
          ],
          image: "/images/hormone/growth-hormone-optimization.png",
          bullets: CAUSES.map((c) => c),
        }}
      />

      <PillarsGrid
        tone="dark"
        eyebrow="Where you'll feel the difference"
        heading="Key benefits of growth hormone optimization"
        pillars={[
          {
            title: "Body composition",
            text: "Reduce fat-particularly abdominal fat-and support lean muscle growth.",
            icon: "scale",
          },
          {
            title: "Muscle & recovery",
            text: "Increased muscle mass, faster recovery, and better endurance during exercise.",
            icon: "dumbbell",
          },
          {
            title: "Bone density",
            text: "Improved bone mineral density and reduced long-term osteoporosis risk.",
            icon: "bone",
          },
          {
            title: "Cardiovascular support",
            text: "Healthier cholesterol profile and reduced cardiovascular risk factors.",
            icon: "heartPulse",
          },
          {
            title: "Mood & mental clarity",
            text: "Relief from anxiety and low mood alongside sharper focus.",
            icon: "brain",
          },
          {
            title: "Cellular repair",
            text: "Counteract glucocorticoid catabolic effects and support cellular regeneration.",
            icon: "activity",
          },
        ]}
      />

      <BenefitsList
        eyebrow="Full benefit list"
        heading="What growth hormone optimization can help you achieve"
        items={BENEFITS}
      />

      <FAQSection faqs={FAQS} />

      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <CTABanner
          title="Ready to feel strong again?"
          subtitle="Book a free consultation and we'll run the labs to see if growth hormone optimization is right for you."
        />
      </div>
    </>
  );
}
