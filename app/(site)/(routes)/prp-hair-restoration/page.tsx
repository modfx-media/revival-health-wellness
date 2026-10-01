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
  FAQSection,
  RelatedServices,
} from "@/components/templates/HormoneSections";

const TITLE = "PRP Hair Restoration Treatments";
const PATH = "/prp-hair-restoration/";
const DESCRIPTION =
  "Use your own growth factors with PRP hair restoration in Las Vegas. Revival Health and Wellness provides this natural therapy to help thicken and regrow hair.";

export async function generateMetadata() {
  const fallback = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  images: ["/images/prp-hair-restoration/prp-for-hair-restoration-gallery-1-1.webp"],
});
  return cmsPageMetadata(fallback);
}

const CANDIDATES = [
  "Are in good health",
  "Are experiencing hair loss, especially from androgenetic alopecia",
  "Understand that seeing results from PRP injections is a gradual process",
];

const FAQS = [
  {
    question: "What is PRP hair restoration?",
    answer:
      "PRP (platelet-rich plasma) hair restoration is a treatment that leverages your body’s own plasma to stimulate new hair growth. Plasma, found within your blood, contains platelets, which in turn house growth factors responsible for cell growth and tissue repair. Through a series of PRP hair injections, these growth factors can assist men and women with specific hair conditions - particularly androgenetic alopecia - in restoring hair growth.",
  },
  {
    question: "How does PRP hair restoration work?",
    answer:
      "Platelets act like our body’s natural first responders. When we get a cut or wound, platelets rush to the site to stop the bleeding and promote quick healing. This same “rescue team” can be used to awaken dormant hair follicles and stimulate new hair growth by encouraging inactive follicles to enter an active growth phase. A small amount of blood is drawn, spun in a centrifuge to separate red blood cells from plasma, and the plasma - rich with platelets and growth factors - is injected into the scalp.",
  },
  {
    question: "What happens during a PRP appointment?",
    answer:
      "Your first PRP session starts with cleaning the scalp and applying topical anesthetics to decrease discomfort. Blood is drawn from a vein, spun in a centrifuge to separate the plasma, then the plasma is drawn into a syringe and injected into specific areas of your scalp. Most people find the injections quite tolerable thanks to the anesthetic. The entire process typically takes about one and a half hours.",
  },
  {
    question: "What is recovery like?",
    answer:
      "PRP hair injections allow you to resume your regular daily activities immediately after your appointment. However, some patients may experience minor side effects such as soreness, swelling, itching, or pinpoint bleeding at the injection sites. These effects are typically mild and subside quickly.",
  },
  {
    question: "When will I see results?",
    answer:
      "PRP hair injections are not a quick fix. Hair regrowth takes time, and many people need several sessions to achieve and maintain their desired results. Since hair loss can be caused by various factors like stress, genetics, age, medications, or illness, results can vary based on the underlying cause.",
  },
  {
    question: "Who is a good candidate?",
    answer:
      "You might be a great candidate for PRP hair restoration if you’re in good health, are experiencing hair loss (especially from androgenetic alopecia), and understand that seeing results is a gradual process.",
  },
];

export default function PrpHairRestorationPage() {
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
              { name: "PRP Hair Restoration", path: PATH },
            ]),
            faqSchema(FAQS),
          ]),
        }}
      />

      <PageHero
        eyebrow={"Hair · PRP Hair Restoration"}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Hair", href: "/hair/" },
          { label: "PRP Hair Restoration" },
        ]}
        title={
          <>
            <span className="relative inline-block italic text-revival-gold">
              PRP
              <span
                aria-hidden
                className="absolute -bottom-2 left-0 h-[3px] w-full bg-gradient-to-r from-revival-gold to-transparent"
              />
            </span>{" "}
            hair restoration
          </>
        }
        description="Unlocking the benefits of PRP for hair loss recovery. Hair loss often leads to decreased self-esteem and confidence - PRP could be the solution you’ve been looking for."
        gallery={[
          "/images/prp-hair-restoration/prp-for-hair-restoration-gallery-1-1.webp",
          "/images/prp-hair-restoration/prp-for-hair-restoration-gallery-1.webp",
        ]}
        compact
      />

      <OverviewBlock
        section={{
          eyebrow: "Unlocking the Benefits of PRP",
          heading:
            "A natural, growth-factor-driven approach to hair regrowth",
          paragraphs: [
            "Hair loss often leads to decreased self-esteem and confidence for both men and women. If you’re struggling with hair loss, PRP hair restoration could be the solution you’ve been looking for.",
            "PRP (platelet-rich plasma) hair restoration is a treatment that leverages your body’s own plasma to stimulate new hair growth. Plasma, found within your blood, contains platelets, which house growth factors responsible for cell growth and tissue repair. Through a series of PRP hair injections, these growth factors can help restore hair growth - particularly for androgenetic alopecia.",
          ],
          image: "/images/prp-hair-restoration/prp-for-hair-restoration-gallery-1.webp",
          imageAspect: "landscape",
        }}
      />

      <OverviewBlock
        tone="cream"
        reverse
        section={{
          eyebrow: "How does PRP hair restoration work?",
          heading:
            "Your body’s own “rescue team” - redirected to your scalp",
          paragraphs: [
            "Platelets act like our body’s natural first responders. When we get a cut or wound, platelets rush to the site to stop the bleeding and promote quick healing. This same “rescue team” can be used to awaken dormant hair follicles and stimulate new hair growth by encouraging inactive follicles to enter an active growth phase.",
            "During a standard PRP hair restoration session, a small amount of blood is drawn from a vein and placed in a device that separates the red blood cells from the plasma. The plasma - now rich with platelets and growth factors - is then injected into the scalp, where it begins the process of re-growing hair.",
          ],
          image: "/images/prp-hair-restoration/prp-rescue-team-scalp.png",
          imageAspectClass: "aspect-[1238/822]",
        }}
      />

      <OverviewBlock
        section={{
          eyebrow: "PRP hair restoration treatment details",
          heading:
            "What happens during your appointment",
          paragraphs: [
            "Your first PRP hair restoration treatment will involve cleaning the scalp and applying topical anesthetics to decrease any discomfort. Then we’ll take a small sample of blood from one of the veins, spin it in a machine to separate the red blood cells from the plasma, and draw the platelet-rich plasma into a syringe for injection into specific areas of your scalp.",
            "With the anesthetic infusion, most people find the PRP injections really tolerable. The entire process typically takes around an hour and a half, although the exact duration may vary from one person to another.",
          ],
        }}
      />

      <OverviewBlock
        tone="cream"
        section={{
          eyebrow: "Recovery",
          heading: "Back to daily life - immediately",
          paragraphs: [
            "PRP hair injections allow you to resume your regular daily activities immediately after your appointment. However, some patients may experience minor side effects such as soreness, swelling, itching, or pinpoint bleeding at the injection sites. These effects are typically mild and subside quickly.",
          ],
          image: "/images/prp-hair-restoration/prp-recovery-daily-life.png",
          imageAspectClass: "aspect-[1230/816]",
        }}
      />

      <OverviewBlock
        section={{
          eyebrow: "Understanding the Recovery Process",
          heading:
            "A few key things to keep in mind",
          paragraphs: [
            "Patience Required: PRP hair injections are not a quick fix. Hair regrowth takes time, and many people need several sessions to achieve and maintain their desired results. It’s important to understand the process and get a clear idea of how long it might take to see noticeable changes.",
            "Varied Results: Not all types of hair loss respond to PRP treatment. Since hair loss can be caused by various factors like stress, genetics, age, medications, or illness, results can vary based on the underlying cause.",
          ],
        }}
      />

      <BenefitsList
        eyebrow="Good candidates for PRP hair restoration"
        heading="You might be a great candidate if you..."
        items={CANDIDATES}
      />

      <FAQSection faqs={FAQS} />

      <RelatedServices
        items={[
          {
            label: "Finasteride",
            href: "/finasteride/",
            blurb:
              "FDA-approved oral hair-loss medication that blocks DHT - pairs beautifully with PRP for compound results.",
          },
          {
            label: "Hair Services Overview",
            href: "/hair/",
            blurb:
              "Explore the full medical hair care & restoration program at Revival Health and Wellness.",
          },
          {
            label: "Microneedling",
            href: "/microneedling/",
            blurb:
              "The same PRP science applied to the skin - combine with microneedling to enhance skin texture and glow.",
          },
        ]}
      />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-14 lg:px-8">
        <CTABanner
          title="Ready to bring your hair back to life?"
          subtitle="Book a free consultation. Our medical team will design a PRP protocol tailored to your goals."
        />
      </div>
    </>
  );
}
