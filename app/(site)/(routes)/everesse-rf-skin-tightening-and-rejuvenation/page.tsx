import { cmsPageMetadata } from "@/lib/cms/generateMeta";
import Image from "next/image";
import { buildMetadata } from "@/lib/metadata";
import {
  serviceSchema,
  breadcrumbSchema,
  faqSchema,
  jsonLd,
} from "@/lib/schema";
import PageHero from "@/components/ui/PageHero";
import CTABanner from "@/components/ui/CTABanner";
import EveresseVideoShowcase from "@/components/everesse/EveresseVideoShowcase";
import {
  OverviewBlock,
  BenefitsList,
  PillarsGrid,
  FAQSection,
  RelatedServices,
} from "@/components/templates/HormoneSections";

const TITLE = "RF Skin Tightening & Rejuvenation";
const PATH = "/everesse-rf-skin-tightening-and-rejuvenation/";
const DESCRIPTION =
  "Tighten and lift your skin with Everesse by Volnewmer in Las Vegas. Revival Health and Wellness uses radiofrequency to help you achieve smoother, firmer, more radiant skin - no needles, no downtime.";

export async function generateMetadata() {
  const fallback = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  images: ["/images/everesse-rf/everesse-hero.jpg"],
});
  return cmsPageMetadata(fallback);
}

const COOLPEEL_TREATS = [
  "Fine lines and wrinkles around the eyes, mouth, and forehead",
  "Uneven skin tone and rough texture",
  "Sun damage, age spots, and hyperpigmentation",
  "Acne scars and other surface imperfections",
  "Dull, tired-looking skin on the face, neck, chest, and hands",
];

const EVERESSE_TREATS = [
  "Facial laxity and sagging along the jawline and neck",
  "Loose skin around the eyes and forehead",
  "Volume loss in the cheeks and mid-face",
  "Skin laxity on the abdomen, flanks, arms, and thighs",
  "Sagging around the knees and buttocks",
];

const RADIANT_LIFT_BENEFITS = [
  "Reduces fine lines and wrinkles",
  "Lifts and tightens sagging skin",
  "Enhances facial contours (jawline, cheeks, neck)",
  "Softens sun damage and discoloration",
  "Improves tone and texture",
  "Delivers both immediate and long-term results",
];

const OVERALL_BENEFITS = [
  "Erase fine lines and wrinkles for a smoother, younger appearance",
  "Lift and tighten sagging skin on the face, neck, and body",
  "Smooth texture and even skin tone for refined, radiant skin",
  "Fade sun damage, age spots, and hyperpigmentation",
  "Enhance facial contours along the jawline, cheeks, and neck",
  "Restore youthful volume and firmness from within",
  "No surgery, needles, or extended downtime required",
  "Safe for all skin types and ages with FDA-cleared technology",
  "Long-lasting results that improve over time and last 6-18+ months",
];

const TREATMENT_AREAS = [
  "Forehead and between the brows",
  "Around the eyes (crow’s feet and under-eye area)",
  "Cheeks and mid-face",
  "Mouth and lip area",
  "Jawline and jowls",
  "Neck and décolletage",
  "Abdomen and flanks",
  "Arms and upper body",
  "Inner and outer thighs",
  "Knees",
  "Buttocks",
];

const WHY_PILLARS = [
  {
    title: "The only Everesse RF provider in Las Vegas",
    text: "We’re the only clinic in Las Vegas with the new Everesse RF device. This exclusive technology means you have access to the most advanced non-invasive skin tightening treatment available without traveling out of state or settling for outdated alternatives.",
    icon: "award" as const,
  },
  {
    title: "Expertise you can trust",
    text: "Our medical team specializes in aesthetic medicine and has extensive training in both laser technology and radiofrequency treatments. We understand skin at every level and customize every plan to match your unique anatomy, skin type, concerns, and lifestyle.",
    icon: "shieldCheck" as const,
  },
  {
    title: "Comprehensive approach to rejuvenation",
    text: "We don’t believe in one-size-fits-all solutions. During your consultation, we’ll assess your skin and create a personalized plan that may include CoolPeel, Everesse, our Radiant Lift combination protocol, or complementary treatments like dermal fillers.",
    icon: "compass" as const,
  },
  {
    title: "FDA-cleared, safe technology",
    text: "Both Everesse and Tetra PRO CoolPeel are FDA-cleared devices with proven safety profiles. These treatments are suitable for all skin types and ages, with customizable settings that let us tailor intensity and depth to your specific needs.",
    icon: "sparkles" as const,
  },
  {
    title: "Minimal downtime, maximum results",
    text: "We understand you have a busy life. That’s why we’ve invested in technologies that deliver visible improvements without requiring you to hide away for weeks. Most patients return to normal activities immediately or within 1–3 days, depending on treatment intensity.",
    icon: "timer" as const,
  },
];

const BEFORE_AFTERS = [
  "/images/everesse-rf/Everees/Screenshot%202026-02-20%20at%206.44.37%E2%80%AFAM.png",
  "/images/everesse-rf/Everees/Screenshot%202026-02-20%20at%206.44.48%E2%80%AFAM.png",
  "/images/everesse-rf/Everees/Screenshot%202026-02-20%20at%206.45.12%E2%80%AFAM.png",
  "/images/everesse-rf/Everees/Screenshot%202026-02-20%20at%206.45.19%E2%80%AFAM.png",
  "/images/everesse-rf/Everees/Screenshot%202026-02-20%20at%206.45.26%E2%80%AFAM.png",
  "/images/everesse-rf/Everees/Screenshot%202026-02-20%20at%206.45.33%E2%80%AFAM.png",
  "/images/everesse-rf/Everees/Screenshot%202026-02-20%20at%206.45.45%E2%80%AFAM.png",
];

const FAQS = [
  {
    question: "Am I a candidate for Everesse RF or CoolPeel?",
    answer:
      "These treatments are ideal for adults of any age or skin type who want to address fine lines, wrinkles, skin laxity, uneven texture, or sun damage without surgery or significant downtime. During your consultation, we’ll determine if you’re a candidate and which treatment plan is right for you.",
  },
  {
    question: "Do the treatments hurt?",
    answer:
      "Most patients find both treatments comfortable. CoolPeel creates a warm, prickling sensation but doesn’t require numbing. Everesse uses continuous cooling technology that keeps skin comfortable while delivering energy to deeper layers. Any discomfort is minimal and well-tolerated.",
  },
  {
    question: "How many sessions do I need?",
    answer:
      "Many patients see excellent results after a single CoolPeel or Radiant Lift session. Everesse typically requires 1–3 treatments spaced 4–6 weeks apart for optimal lifting and tightening. Your personalized treatment plan will be outlined during your consultation based on your specific goals.",
  },
  {
    question: "When will I see results?",
    answer:
      "CoolPeel results are visible within days, with continued improvement over 2–3 months. Everesse results develop gradually, with noticeable changes appearing within 2–4 weeks and continued improvement for 3–6 months as collagen remodels.",
  },
  {
    question: "How long do the results last?",
    answer:
      "Results from both treatments can last 6–18 months or longer, depending on your age, skin condition, lifestyle factors, and maintenance routine. Many patients return for touch-up treatments once or twice yearly to maintain their results.",
  },
];

export default function EveresseRfPage() {
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
              { name: "Everesse RF Skin Tightening", path: PATH },
            ]),
            faqSchema(FAQS),
          ]),
        }}
      />

      <PageHero
        eyebrow={"Aesthetics · Everesse® RF"}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Aesthetics", href: "/aesthetics/" },
          { label: "Everesse® RF Skin Tightening" },
        ]}
        title={
          <>
            Monopolar RF: complete skin{" "}
            <span className="relative inline-block italic text-revival-gold">
              rejuvenation
              <span
                aria-hidden
                className="absolute -bottom-2 left-0 h-[3px] w-full bg-gradient-to-r from-revival-gold to-transparent"
              />
            </span>
          </>
        }
        description="Tighten, lift & resurface your skin without needles or downtime. Non-invasive skin rejuvenation has reached a new level with advanced laser resurfacing plus breakthrough radiofrequency technology."
        gallery={[
          "/images/everesse-rf/everesse-hero.jpg",
          "/images/everesse-rf/EVERESSE-4-896x896-1.webp",
        ]}
        compact
      />

      <OverviewBlock
        section={{
          eyebrow: "Smooth. Lift. Restore.",
          heading:
            "Smooth wrinkles, lift sagging skin & restore your natural radiance",
          paragraphs: [
            "Non-invasive skin rejuvenation has reached a new level with the combination of advanced laser resurfacing and breakthrough radiofrequency technology. These two powerful treatments work together to lift, tighten, and refresh your complexion without needles, surgery, or extended recovery time.",
            "Revival Health & Wellness is the only clinic in Las Vegas offering this exclusive Everesse RF technology, giving you access to results that simply aren’t available anywhere else in the city.",
            "Limited Time Offer: New Patients Receive a FREE $250 Gift Card. Ready to transform your skin? Call Revival Health & Wellness at (702) 963-1154 or schedule your consultation in Las Vegas today.",
          ],
          image: "/images/everesse-rf/EVERESSE-4-896x896-1.webp",
        }}
      />

      {/* Video showcase - custom component with click-to-play, motion badges, contained (uncropped) video */}
      <EveresseVideoShowcase />

      <OverviewBlock
        section={{
          eyebrow: "CoolPeel CO₂ Laser",
          heading: "Resurface & refine - with minimal downtime",
          paragraphs: [
            "CoolPeel represents the next evolution in laser skin resurfacing. Unlike traditional CO₂ treatments that require days of downtime, CoolPeel delivers precise, controlled energy to the skin’s surface to smooth fine lines, improve texture, fade sun damage, and reveal fresher, more radiant skin with minimal downtime and discomfort.",
          ],
          bullets: COOLPEEL_TREATS,
          image: "/images/everesse-rf/VNM.png",
          imageContain: true,
        }}
      />

      <OverviewBlock
        tone="cream"
        reverse
        section={{
          eyebrow: "Everesse RF",
          heading: "Lift, tighten & contour - from within",
          paragraphs: [
            "Everesse RF uses monopolar radiofrequency technology to deliver deep, controlled thermal energy that stimulates new collagen production, tightens the skin, and lifts sagging tissue. It works from within - rebuilding structure while continuous cooling keeps the surface comfortable throughout the session.",
          ],
          bullets: EVERESSE_TREATS,
          image: "/images/everesse-rf/everesse-rf-tightening.jpg",
        }}
      />

      <OverviewBlock
        section={{
          eyebrow: "Radiant Lift",
          heading: "The ultimate combination protocol",
          paragraphs: [
            "When you combine CoolPeel laser resurfacing with Everesse RF skin tightening in a single session, you get our exclusive Radiant Lift protocol - comprehensive facial contouring and rejuvenation that addresses both surface concerns and deeper structural laxity.",
            "Everesse rebuilds and tightens from within while CoolPeel refines and perfects the surface for complete, inside-out transformation.",
          ],
          bullets: RADIANT_LIFT_BENEFITS,
          image: "/images/everesse-rf/62fb2b5043866cc73de6514d_21.jpg",
          imageAspect: "landscape",
        }}
      />

      <BenefitsList
        eyebrow="The Benefits of CoolPeel & Everesse RF"
        heading={"Whichever you choose, you’ll experience transformative improvements"}
        items={OVERALL_BENEFITS}
        image="/images/everesse-rf/beauty-woman-clean-skin.webp"
        imageAspect="landscape"
        stickyImage
      />

      <BenefitsList
        eyebrow="Treatment Areas"
        heading="Versatile enough to address concerns across the face and body"
        items={TREATMENT_AREAS}
        image="/images/everesse-rf/treatment-areas.jpg"
        imageAspect="square"
      />

      <OverviewBlock
        tone="cream"
        reverse
        section={{
          eyebrow: "The Treatment Experience",
          heading: "Your personalized consultation",
          paragraphs: [
            "Every journey begins with a thorough consultation where we’ll discuss your concerns, evaluate your skin, review your medical history, and design a customized treatment plan. We’ll explain exactly what to expect, show you before-and-after photos of real patients, and answer all your questions so you feel confident and informed.",
          ],
          bullets: [
            "Treatment typically takes 20–30 minutes depending on the area (CoolPeel)",
            "Most patients describe a warm, prickling sensation - no numbing cream required",
            "Continuous cooling keeps skin comfortable throughout (Everesse)",
            "No needles, no injections, no numbing required (Everesse)",
            "Both treatments performed in a single 60–90 minute Radiant Lift session",
            "Downtime ranges from none to 2–3 days of light peeling",
            "Results appear gradually and continue improving for months",
          ],
          image: "/images/everesse-rf/medspa.webp",
          imageAspect: "landscape",
        }}
      />

      <OverviewBlock
        section={{
          eyebrow: "Results You Can See and Feel",
          heading: "Immediate glow. Long-lasting transformation.",
          paragraphs: [
            "Many patients notice an immediate glow after CoolPeel, with continued improvement over the following weeks as collagen production accelerates. Fine lines soften, tone evens out, texture smooths, and skin appears fresher and more youthful. Results continue to develop for up to three months post-treatment.",
            "While some patients see subtle lifting immediately, the true transformation with Everesse unfolds gradually as new collagen forms. Most patients notice visible tightening and improved contours within 2–4 weeks, with continued improvement for 3–6 months. Many see significant results after just one session, though optimal outcomes may require 2–3 treatments spaced 4–6 weeks apart.",
            "Both treatments stimulate your body’s natural collagen production, which means results improve over time and can last 6–18 months or longer with proper skincare and sun protection. Maintenance treatments can extend and enhance your results indefinitely.",
          ],
          image: "/images/everesse-rf/flower-headband.jpeg",
          imageAspect: "landscape",
        }}
        stickyImage
      />

      <PillarsGrid
        tone="cream"
        eyebrow="Why Choose Revival Health and Wellness?"
        heading="Exclusive technology. Personalized care."
        pillars={WHY_PILLARS}
      />

      {/* Before & After patient gallery */}
      <section className="relative bg-revival-warm-white py-14 sm:py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-gradient-to-r from-transparent via-revival-gold to-revival-gold/60 sm:w-12" />
              <span className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-revival-gold sm:text-xs">
                Before & After
              </span>
              <span className="h-px w-8 bg-gradient-to-l from-transparent via-revival-gold to-revival-gold/60 sm:w-12" />
            </div>
            <h2
              className="font-heading font-light leading-[1.05] text-revival-dark"
              style={{ fontSize: "clamp(2rem, 3.6vw, 3.15rem)", letterSpacing: "-0.01em" }}
            >
              Real patients. Real results.
            </h2>
          </div>
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {BEFORE_AFTERS.map((src, i) => (
              <figure
                key={src}
                className="group relative aspect-square overflow-hidden rounded-2xl border border-revival-gold/15 bg-revival-cream shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_60px_-20px_rgba(15,15,15,0.3)]"
              >
                <Image
                  src={src}
                  alt={`Everesse RF & CoolPeel patient before and after ${i + 1}`}
                  fill
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                  className="object-contain transition-transform duration-700 group-hover:scale-105"
                  quality={90}
                />
              </figure>
            ))}
          </div>
        </div>
      </section>

      <FAQSection faqs={FAQS} />

      <RelatedServices
        items={[
          {
            label: "CO₂ Laser Treatments",
            href: "/co2-laser-treatments/",
            blurb:
              "Deep-dive on the CoolPeel & Deka Tetra Pro laser resurfacing technology used in our Radiant Lift protocol.",
          },
          {
            label: "Microneedling",
            href: "/microneedling/",
            blurb:
              "Boost collagen and skin texture - a natural addition to any Everesse or CoolPeel plan.",
          },
          {
            label: "Sculptra®",
            href: "/sculptra/",
            blurb:
              "Complement collagen-stimulating RF with biostimulator injections for full-face volume restoration.",
          },
        ]}
      />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-14 lg:px-8">
        <CTABanner
          title="Transform your skin, transform your confidence"
          subtitle="New patients receive a FREE $250 gift card toward their first treatment. Call (702) 963-1154 to schedule your consultation."
        />
      </div>
    </>
  );
}
