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
import WeightLossTestimonials from "@/components/weight-loss/WeightLossTestimonials";
import {
  OverviewBlock,
  PillarsGrid,
  BenefitsList,
  FAQSection,
  RelatedServices,
  VideoShowcase,
} from "@/components/templates/HormoneSections";

const TITLE = "Phentermine";
const PATH = "/phentermine/";
const META_TITLE = "Phentermine for Weight Loss";
const DESCRIPTION =
  "Looking for phentermine for weight loss in Las Vegas? Revival Health and Wellness helps you manage your appetite and boost energy with medical supervision.";

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
    title: "Dopamine & norepinephrine",
    text: "Targets your brain and nervous system, releasing two neurotransmitters that stimulate metabolism and suppress hunger.",
    icon: "brain" as const,
  },
  {
    title: "Adrenaline & epinephrine",
    text: "Triggers the release of adrenaline and epinephrine outside the brain - hormones known for powerful fat-burning properties.",
    icon: "flame" as const,
  },
  {
    title: "Sustained appetite control",
    text: "Taken once daily in the morning, it suppresses appetite from breakfast to dessert, peaking in 3–5 hours and gradually declining.",
    icon: "utensils" as const,
  },
  {
    title: "Proven, measurable results",
    text: "37.5 mg daily for 12 weeks typically results in an average weight loss of about 16 pounds when paired with a well-planned diet.",
    icon: "target" as const,
  },
];

const CANDIDATES_BULLETS = [
  "BMI greater than 25 (unhealthy height-to-weight ratio)",
  "Struggled with diet-and-exercise-only approaches",
  "Cleared for a stimulant-class weight-loss medication",
  "Ready to combine medication with lifestyle changes",
  "Not currently pregnant, breastfeeding, or under 18",
];

const CONTRAINDICATIONS = [
  "Coronary heart disease",
  "Uncontrolled high blood pressure",
  "Hyperthyroidism",
  "History of drug abuse",
];

const SIDE_EFFECTS = [
  "Dry mouth",
  "Increased heart rate",
  "Increased blood pressure",
  "Temporary diarrhea",
  "Insomnia",
  "Constipation",
  "Nervousness",
];

const FAQS = [
  {
    question: "What is Phentermine?",
    answer:
      "Phentermine is an FDA-approved prescription weight-loss medication used for long-term weight management, often in combination with topiramate. It's a remarkably safe, non-addictive medication that has been trusted for over 50 years and is prescribed in three-month cycles.",
  },
  {
    question: "How does Phentermine work?",
    answer:
      "Phentermine targets your brain and nervous system, releasing dopamine and norepinephrine to stimulate metabolism and suppress hunger. It also triggers adrenaline and epinephrine outside the brain - hormones with powerful fat-burning properties. Taken once daily in the morning, it peaks in 3–5 hours and continues supporting weight loss throughout the day.",
  },
  {
    question: "Is Phentermine right for me?",
    answer:
      "Phentermine is typically prescribed for adults with a BMI greater than 25. Our specialists review your medical history and perform a physical exam during your consultation, then tailor your dose to your needs. Many patients also take Topiramate alongside Phentermine to enhance the effectiveness of the plan.",
  },
  {
    question: "Who should not take Phentermine?",
    answer:
      "Phentermine is not suitable for individuals with coronary heart disease, uncontrolled high blood pressure, hyperthyroidism, or a history of drug abuse. During your consultation we'll confirm it's safe for you before writing a prescription.",
  },
  {
    question: "Will Phentermine give me side effects?",
    answer:
      "Phentermine acts partially as a stimulant, so monitoring blood pressure is important. Common side effects include dry mouth, increased heart rate, increased blood pressure, temporary diarrhea, insomnia, constipation, and nervousness. Our team monitors you throughout the program and adjusts dose or timing to minimize side effects.",
  },
];

export default function PhenterminePage() {
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
        eyebrow="Weight Loss · Phentermine"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Weight Loss", href: "/weight-loss/" },
          { label: "Phentermine" },
        ]}
        title={
          <>
            <span className="relative inline-block">
              Phentermine
              <span
                aria-hidden
                className="absolute -bottom-2 left-0 h-[3px] w-full bg-gradient-to-r from-revival-gold to-transparent"
              />
            </span>{" "}
            to kickstart your journey
          </>
        }
        description="A potent, FDA-approved weight-loss medication trusted for over 50 years. Substantial results within the first few weeks - under medical supervision in Las Vegas."
        gallery={[
          "/images/weight-loss/phentermine-thumbs-up.png",
          "/images/weight-loss/phentermine-treatment.jpg",
          "/images/weight-loss/phentermine-pill.webp",
        ]}
        compact
      />

      <OverviewBlock
        section={{
          eyebrow: "Weight Loss with Phentermine",
          heading: "What is the Phentermine treatment?",
          paragraphs: [
            "Phentermine is more than just an appetite suppressant - it's a potent weight-loss medication that delivers substantial results for those looking to shed a significant amount of weight within the first few weeks.",
            "FDA-approved for long-term weight management and often combined with topiramate, Phentermine is a remarkably safe, non-addictive medication that has been trusted for over 50 years. Prescribed in three-month cycles, it has demonstrated a very high success rate when used correctly.",
          ],
          image: "/images/weight-loss/phentermine-treatment.jpg",
          imageAspect: "landscape",
        }}
      />

      <PillarsGrid
        eyebrow="How it works"
        heading="How does Phentermine work?"
        intro="Phentermine works through four coordinated mechanisms - the medication doesn't do the work for you, but it makes sticking to your plan dramatically easier."
        pillars={HOW_IT_WORKS}
      />

      <OverviewBlock
        tone="cream"
        reverse
        section={{
          eyebrow: "Is it right for you?",
          heading: "Is Phentermine right for you?",
          paragraphs: [
            "The best way to know is a consultation with our specialists. We'll review your medical history and perform a physical exam to confirm Phentermine is a suitable choice, then schedule a follow-up shortly after starting so we can verify the medication is working with your body.",
            "Our specialists tailor your Phentermine dosage to your specific needs. Many of our patients also take Topiramate alongside Phentermine - an anticonvulsant and nerve-pain medication that enhances the effectiveness of your weight-loss regimen.",
          ],
          image: "/images/weight-loss/phentermine-thumbs-up.png",
          bullets: [
            "Medical history and medication review",
            "Baseline labs, vitals, and physical exam",
            "Personalized dose (often paired with Topiramate)",
            "Follow-up appointments to fine-tune your plan",
          ],
        }}
      />

      <BenefitsList
        eyebrow="Who it's for"
        heading="Candidates for Phentermine"
        items={CANDIDATES_BULLETS}
        image="/images/weight-loss/phentermine-pill.webp"
      />

      {/* Compact "Not for everyone" + Side effects - combined into one dense band */}
      <section className="relative bg-revival-warm-white py-12 lg:py-16">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:px-8">
          <div>
            <span className="text-tagline text-xs text-revival-gold">
              Safety
            </span>
            <h3 className="mt-3 font-heading text-2xl leading-tight text-revival-dark sm:text-3xl">
              Not suitable for everyone
            </h3>
            <p className="mt-4 text-revival-charcoal/85">
              Phentermine is not appropriate for individuals with:
            </p>
            <ul className="mt-4 space-y-2 text-revival-charcoal/85">
              {CONTRAINDICATIONS.map((c) => (
                <li key={c} className="flex items-start gap-2">
                  <span
                    aria-hidden
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-revival-gold"
                  />
                  {c}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <span className="text-tagline text-xs text-revival-gold">
              Common side effects
            </span>
            <h3 className="mt-3 font-heading text-2xl leading-tight text-revival-dark sm:text-3xl">
              What to monitor
            </h3>
            <p className="mt-4 text-revival-charcoal/85">
              Phentermine acts partially as a stimulant, so monitoring your
              blood pressure is essential. Our team tracks your response and
              adjusts dose or timing to keep side effects manageable.
            </p>
            <ul className="mt-4 grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
              {SIDE_EFFECTS.map((s) => (
                <li
                  key={s}
                  className="rounded-xl bg-white px-3.5 py-2.5 text-revival-charcoal/85 shadow-sm ring-1 ring-revival-gold/15"
                >
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

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
              "Non-stimulant option: hormone-based appetite regulation with sustained results.",
          },
          {
            label: "Vitamin Injections",
            href: "/vitamin-injections/",
            blurb:
              "Boost energy, metabolism, and immunity while you're on your weight-loss plan.",
          },
          {
            label: "Medical Weight Loss",
            href: "/weight-loss/",
            blurb:
              "The full program-labs, physician-led plans, and ongoing support.",
          },
        ]}
      />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-14 lg:px-8">
        <CTABanner
          title="Ready to kickstart your plan?"
          subtitle="Book a free consultation. We'll review your labs and confirm Phentermine is right for you."
        />
      </div>
    </>
  );
}
