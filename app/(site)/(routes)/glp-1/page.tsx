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
import MotionShowcase from "@/components/motion/MotionShowcase";
import WeightLossTestimonials from "@/components/weight-loss/WeightLossTestimonials";
import {
  OverviewBlock,
  PillarsGrid,
  BenefitsList,
  FAQSection,
  RelatedServices,
  VideoShowcase,
} from "@/components/templates/HormoneSections";

const TITLE = "GLP-1";
const PATH = "/glp-1/";
const META_TITLE = "GLP-1 Medications for Weight Loss";
const DESCRIPTION =
  "Manage your weight and improve your health with GLP-1 medications. Revival Health and Wellness offers medical guidance to help you see real, lasting results.";

export async function generateMetadata() {
  const fallback = buildMetadata({
  title: META_TITLE,
  description: DESCRIPTION,
  path: PATH,
});
  return cmsPageMetadata(fallback);
}

const HOW_IT_WORKS = [
  {
    title: "Regulates appetite",
    text: "GLP-1 signals fullness sooner and helps you stop eating at a more natural stopping point.",
    icon: "utensils" as const,
  },
  {
    title: "Slows gastric emptying",
    text: "Food moves through your stomach more gradually, keeping you satisfied longer between meals.",
    icon: "timer" as const,
  },
  {
    title: "Improves blood sugar",
    text: "Supports better insulin response and steadier glucose levels throughout the day.",
    icon: "activity" as const,
  },
  {
    title: "Backs long-term weight loss",
    text: "When paired with medical support and nutrition guidance, GLP-1 drives sustainable results.",
    icon: "target" as const,
  },
];

const CANDIDATES_BULLETS = [
  "BMI of 30 or higher, or BMI of 27+ with weight-related conditions",
  "History of struggling with diet-and-exercise-only approaches",
  "Insulin resistance, PCOS, or blood-sugar concerns",
  "Ready for a medically supervised, results-oriented plan",
  "Interested in an appetite-focused (rather than stimulant) option",
];

const FAQS = [
  {
    question: "What is GLP-1?",
    answer:
      "GLP-1 (glucagon-like peptide-1) is a hormone your body naturally produces after eating. GLP-1 medications mimic that signal to help regulate appetite, slow digestion, and support healthier blood sugar-so weight loss becomes more sustainable.",
  },
  {
    question: "How does GLP-1 help with weight loss?",
    answer:
      "By reducing hunger, extending satiety after meals, and improving how your body responds to food, GLP-1 makes it easier to eat in a moderate calorie deficit without willpower alone doing all the work.",
  },
  {
    question: "Does compounded GLP-1 medication actually help you lose weight?",
    answer:
      "Yes-when it's part of a medically supervised plan. At Revival we combine compounded GLP-1 with lab work, dose titration, nutrition guidance, and weekly progress tracking so results are real and lasting.",
  },
  {
    question: "Who can benefit from GLP-1 medication?",
    answer:
      "Adults with a BMI of 30+ (or 27+ with weight-related conditions), those who have struggled with diet-and-exercise-only approaches, and anyone looking for an appetite-focused, non-stimulant option under medical supervision.",
  },
];

export default function GLP1Page() {
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
        eyebrow="Weight Loss · GLP-1"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Weight Loss", href: "/weight-loss/" },
          { label: "GLP-1" },
        ]}
        title={
          <>
            <span className="relative inline-block">
              GLP-1
              <span
                aria-hidden
                className="absolute -bottom-2 left-0 h-[3px] w-full bg-gradient-to-r from-revival-gold to-transparent"
              />
            </span>{" "}
            for lasting weight loss
          </>
        }
        description="Manage your weight and improve your health with medically supervised GLP-1 medications, compounded for you and paired with expert guidance."
        gallery={[
          "/images/page-banners/glp-banner-1.webp",
          "/images/page-banners/glp-banner-2.jpg",
        ]}
      />

      <OverviewBlock
        section={{
          eyebrow: "Weight Loss with GLP-1",
          heading: "Understanding GLP-1 & its role in weight loss",
          paragraphs: [
            "GLP-1 (glucagon-like peptide-1) is a hormone your body naturally releases after eating. It tells the brain you're full, slows how quickly the stomach empties, and helps regulate insulin.",
            "GLP-1 medications amplify that natural signal-so appetite calms down, cravings ease up, and eating in a healthy calorie balance stops feeling like a fight against your own biology.",
          ],
        image: "/images/weight-loss/glp1-weightloss.jpg",
          imageAspect: "landscape",
        }}
      />

      <PillarsGrid
        eyebrow="How it works"
        heading="What GLP-1 does inside your body"
        intro="Four physiological effects that make GLP-1 different from stimulant-based weight-loss approaches."
        pillars={HOW_IT_WORKS}
      />

      <MotionShowcase
        eyebrow="The Mechanism"
        heading="One hormone. Multiple metabolic wins."
        body="GLP-1 acts across appetite, digestion, and blood-sugar regulation at the same time-a coordinated response, not a single lever."
        centerIcon="pill"
        centerLabel="GLP-1 Therapy"
        orbitLabels={["Appetite", "Blood Sugar", "Metabolism", "Satiety"]}
        cornerBadges={[
          { icon: "leaf", label: "Nutrition" },
          { icon: "flame", label: "Fat Loss" },
          { icon: "heartPulse", label: "Vitality" },
        ]}
        tone="dark"
      />

      <VideoShowcase
        eyebrow="See it in action"
        heading="Watch how GLP-1 works at Revival"
        intro="A quick look at what to expect from a medically supervised GLP-1 program."
        src="/videos/glp-1.mp4"
        poster="/videos/glp-1-poster.jpg"
      />

      <OverviewBlock
        tone="cream"
        reverse
        section={{
          eyebrow: "Compounded GLP-1",
          heading: "Does compounded GLP-1 actually help you lose weight?",
          paragraphs: [
            "In a medically supervised plan, yes. At Revival, compounded GLP-1 is prescribed after a full consultation and lab review, then paired with dose titration, nutrition guidance, and weekly progress tracking.",
            "That combination-medication plus monitoring plus habit support-is what turns a prescription into durable, real-world results.",
          ],
          image: "/images/weight-loss/glp-1-before-after.jpg",
          bullets: [
            "Baseline labs and medical consultation",
            "Personalized dose titration",
            "Nutrition and lifestyle guidance",
            "Weekly body composition tracking",
          ],
        }}
      />

      <BenefitsList
        eyebrow="Who it's for"
        heading="Who can benefit from GLP-1 medication?"
        items={CANDIDATES_BULLETS}
      />

      <VideoShowcase
        eyebrow="Track Real Results"
        heading="STYKU 3D body scanning technology"
        intro="Every visit includes a STYKU body scan, so you can see measurable changes in muscle, water, and fat-not just the number on the scale."
        src="/videos/styku.mp4"
        poster="/videos/styku-poster.jpg"
        aspect="portrait"
        tone="cream"
      />

      <FAQSection faqs={FAQS} />

      <WeightLossTestimonials />

      <RelatedServices
        items={[
          {
            label: "Phentermine",
            href: "/phentermine/",
            blurb:
              "Non-GLP-1 option: a clinically proven appetite suppressant that also boosts energy.",
          },
          {
            label: "Vitamin Injections",
            href: "/vitamin-injections/",
            blurb:
              "Micronutrient injections to support energy, metabolism, and immunity during your program.",
          },
          {
            label: "Medical Weight Loss",
            href: "/weight-loss/",
            blurb:
              "The broader program-physician-led plans, lab work, and ongoing support.",
          },
        ]}
      />

      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <CTABanner
          title="Ready to lose weight for good?"
          subtitle="Book a free consultation. We'll review your labs and design a GLP-1 protocol tailored to your body."
        />
      </div>
    </>
  );
}
