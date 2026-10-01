import { cmsPageMetadata } from "@/lib/cms/generateMeta";
import { buildMetadata } from "@/lib/metadata";
import {
  serviceSchema,
  breadcrumbSchema,
  faqSchema,
  jsonLd,
} from "@/lib/schema";
import { Snowflake, Flame, Check, Sparkles, Clock, CalendarDays } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import CTABanner from "@/components/ui/CTABanner";
import {
  OverviewBlock,
  FAQSection,
  RelatedServices,
} from "@/components/templates/HormoneSections";

const TITLE = "Deka Tetra Pro CO2 Laser Treatments";
const PATH = "/tetra-pro-co2-laser/";
const DESCRIPTION =
  "Smooth your skin with the Deka Tetra Pro CO2 laser. Revival Health and Wellness uses this precise technology to treat aging skin and large pores with total customization.";

export async function generateMetadata() {
  const fallback = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  images: ["/images/tetra-pro-co2-laser/coolpeel-patient-treatment.jpg"],
});
  return cmsPageMetadata(fallback);
}

const CANDIDATES = [
  "A powerful anti-aging solution",
  "Improvement in skin laxity and deep wrinkles",
  "Correction of scars or uneven texture",
  "Long-lasting rejuvenation with one comprehensive treatment",
];

const COMPARISON = [
  { coolpeel: "Minimal downtime", tetra: "Moderate downtime" },
  { coolpeel: "Refreshes skin", tetra: "Deeper skin resurfacing" },
  { coolpeel: "Fine lines & pores", tetra: "Wrinkles, acne scars & pigmentation" },
  { coolpeel: "Mild collagen stimulation", tetra: "Significant collagen remodeling" },
  { coolpeel: "Great for maintenance", tetra: "Ideal for correction and rejuvenation" },
];

const COOLPEEL_FEATURES = COMPARISON.map((row) => row.coolpeel);
const TETRA_FEATURES = COMPARISON.map((row) => row.tetra);

const FAQS = [
  {
    question: "What is the Deka Tetra Pro CO2 laser?",
    answer:
      "The Deka Tetra Pro is the most powerful and customizable CO2 resurfacing treatment available at Revival Health and Wellness. It targets deeper layers of the skin, repairing years of damage and stimulating collagen for lasting improvements in texture, tone, and firmness.",
  },
  {
    question: "How long does a Deka Tetra Pro treatment take?",
    answer:
      "Treatment time is 30–60 minutes depending on the area being treated and the intensity level selected by your provider.",
  },
  {
    question: "Will I need numbing or anesthesia?",
    answer:
      "A numbing cream or anesthesia may be used depending on the depth of treatment. Your provider will discuss the right approach for your comfort during your consultation.",
  },
  {
    question: "What is downtime like?",
    answer:
      "Downtime typically ranges from 3–10 days depending on the intensity of your treatment. Lighter settings mean shorter recovery; deeper settings mean more dramatic transformation with more redness and peeling.",
  },
  {
    question: "When will I see results?",
    answer:
      "Most patients notice an immediate glow, with progressive improvements as collagen rebuilds over the following 3–6 months.",
  },
];

export default function TetraProCo2LaserPage() {
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
              { name: "Deka Tetra Pro CO2 Laser", path: PATH },
            ]),
            faqSchema(FAQS),
          ]),
        }}
      />

      <PageHero
        eyebrow={"Aesthetics · Deka Tetra Pro CO₂ Laser"}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Aesthetics", href: "/aesthetics/" },
          { label: "Deka Tetra Pro" },
        ]}
        title={
          <>
            <span className="relative inline-block italic text-revival-gold">
              Deka Tetra Pro
              <span
                aria-hidden
                className="absolute -bottom-2 left-0 h-[3px] w-full bg-gradient-to-r from-revival-gold to-transparent"
              />
            </span>{" "}
            CO2 Laser
          </>
        }
        description="Advanced resurfacing. Transformative results. The most powerful and customizable CO2 resurfacing treatment available at Revival Health and Wellness."
        gallery={[
          "/images/tetra-pro-co2-laser/coolpeel-patient-treatment.jpg",
          "/images/tetra-pro-co2-laser/Image_20250905_080311_234.jpeg",
        ]}
        compact
      />

      <OverviewBlock
        section={{
          eyebrow: "Moderate DEKA Tetra Pro Resurfacing",
          heading: "Designed for patients seeking more dramatic skin rejuvenation.",
          paragraphs: [
            "A moderate DEKA treatment penetrates deeper into the skin than CoolPeel, stimulating greater collagen remodeling and addressing more advanced skin concerns.",
            "Because more energy is delivered, the skin undergoes a stronger regenerative response, resulting in more significant improvement.",
            "Recovery: Approximately 5–10 days, depending on the treatment settings and individual healing.",
            "Best For: Patients looking for more dramatic improvement in skin texture, tone, and collagen production who can accommodate additional downtime.",
            "It is excellent for treating:",
          ],
          image: "/images/tetra-pro-co2-laser/IMG_9766.jpg",
          bullets: [
            "Moderate wrinkles",
            "Acne scars",
            "Deeper sun damage",
            "Pigmentation irregularities",
            "Skin laxity",
            "More advanced texture concerns",
          ],
        }}
      />

      <OverviewBlock
        tone="cream"
        reverse
        section={{
          eyebrow: "In-treatment",
          heading: "The Cartessa Deka Tetra Pro platform",
          paragraphs: [
            "The same DEKA-powered CO2 platform used for CoolPeel®, dialed up for deeper, more transformative resurfacing. Fully customizable from a light refresh to intensive renewal.",
          ],
          image: "/images/tetra-pro-co2-laser/Image_20250905_080311_234.jpeg",
          imageAspect: "landscape",
        }}
      />

      {/* What to Expect + Who it's for — combined */}
      <section className="relative overflow-hidden bg-revival-cream py-14 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
            {/* What to Expect */}
            <div className="flex flex-col rounded-3xl border border-revival-gold/15 bg-white p-8 shadow-sm sm:p-10">
              <span className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-revival-gold sm:text-xs">
                What to Expect
              </span>
              <h2 className="mt-4 font-heading text-3xl font-light leading-[1.1] text-revival-dark sm:text-[2.15rem]">
                Your Deka Tetra Pro session, start to finish
              </h2>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-revival-cream/70 p-5 ring-1 ring-revival-gold/10">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-revival-gold ring-1 ring-revival-gold/20">
                    <Clock className="h-5 w-5" strokeWidth={1.5} />
                  </span>
                  <p className="mt-3 font-heading text-xl font-light text-revival-dark">
                    30–60 min
                  </p>
                  <p className="mt-1 text-sm font-light leading-relaxed text-revival-charcoal/75">
                    Treatment time. Numbing cream or anesthesia may be used depending on treatment depth.
                  </p>
                </div>
                <div className="rounded-2xl bg-revival-cream/70 p-5 ring-1 ring-revival-gold/10">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-revival-gold ring-1 ring-revival-gold/20">
                    <CalendarDays className="h-5 w-5" strokeWidth={1.5} />
                  </span>
                  <p className="mt-3 font-heading text-xl font-light text-revival-dark">
                    3–10 days
                  </p>
                  <p className="mt-1 text-sm font-light leading-relaxed text-revival-charcoal/75">
                    Downtime, depending on intensity. A lighter refresh means shorter recovery.
                  </p>
                </div>
              </div>

              <p className="mt-6 text-base font-light leading-relaxed text-revival-charcoal/80">
                Results appear as an immediate glow, with progressive improvements as collagen rebuilds over the following 3–6 months.
              </p>
            </div>

            {/* Is it right for me? */}
            <div className="relative flex flex-col overflow-hidden rounded-3xl border border-revival-gold/40 bg-revival-dark p-8 text-white shadow-lg sm:p-10">
              <span
                aria-hidden
                className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-revival-gold/15 blur-2xl"
              />
              <span className="relative text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-revival-gold sm:text-xs">
                Is Deka Tetra Pro Right for Me?
              </span>
              <h2 className="relative mt-4 font-heading text-3xl font-light leading-[1.1] text-white sm:text-[2.15rem]">
                Ideal for those who want:
              </h2>
              <ul className="relative mt-8 space-y-4">
                {CANDIDATES.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-revival-gold/20 text-revival-gold">
                      <Check className="h-4 w-4" strokeWidth={2.5} />
                    </span>
                    <span className="text-base font-light leading-relaxed text-white/90">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison — two-column cards */}
      <section className="relative overflow-hidden bg-revival-cream py-14 sm:py-20 lg:py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-white/60 to-transparent"
        />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-gradient-to-r from-transparent via-revival-gold to-revival-gold/60 sm:w-12" />
              <span className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-revival-gold sm:text-xs">
                CoolPeel® vs. Deka Tetra Pro
              </span>
              <span className="h-px w-8 bg-gradient-to-l from-transparent via-revival-gold to-revival-gold/60 sm:w-12" />
            </div>
            <h2
              className="font-heading font-light leading-[1.05] text-revival-dark"
              style={{ fontSize: "clamp(2rem, 3.6vw, 3.15rem)", letterSpacing: "-0.01em" }}
            >
              Which Treatment Is Right for You?
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-base font-light leading-relaxed text-revival-charcoal/80 sm:text-lg">
              Every patient's skin ages differently. During your consultation, our providers evaluate your skin health, lifestyle, and goals to recommend the treatment that will deliver the safest and most effective results.
            </p>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-2 lg:gap-8">
            {/* CoolPeel card */}
            <div className="group relative flex flex-col rounded-3xl border border-revival-gold/15 bg-white p-8 shadow-sm transition-shadow hover:shadow-md sm:p-10">
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-revival-cream text-revival-gold ring-1 ring-revival-gold/20">
                  <Snowflake className="h-6 w-6" strokeWidth={1.5} />
                </span>
                <div>
                  <h3 className="font-heading text-2xl font-light text-revival-dark">
                    CoolPeel®
                  </h3>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-revival-gold/80">
                    Gentle refresh
                  </p>
                </div>
              </div>
              <ul className="mt-8 space-y-4">
                {COOLPEEL_FEATURES.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-revival-gold/10 text-revival-gold">
                      <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                    </span>
                    <span className="text-base font-light leading-relaxed text-revival-charcoal/85">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* DEKA Tetra Pro card — highlighted */}
            <div className="group relative flex flex-col overflow-hidden rounded-3xl border border-revival-gold/40 bg-revival-dark p-8 text-white shadow-lg sm:p-10">
              <span
                aria-hidden
                className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-revival-gold/15 blur-2xl"
              />
              <div className="relative flex items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-revival-gold/15 text-revival-gold ring-1 ring-revival-gold/30">
                  <Flame className="h-6 w-6" strokeWidth={1.5} />
                </span>
                <div>
                  <h3 className="font-heading text-2xl font-light text-white">
                    Moderate DEKA Tetra Pro
                  </h3>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-revival-gold">
                    Deeper resurfacing
                  </p>
                </div>
              </div>
              <ul className="relative mt-8 space-y-4">
                {TETRA_FEATURES.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-revival-gold/20 text-revival-gold">
                      <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                    </span>
                    <span className="text-base font-light leading-relaxed text-white/90">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* The Revival Difference */}
      <section className="relative overflow-hidden bg-revival-dark py-16 text-white sm:py-20 lg:py-24">
        <span
          aria-hidden
          className="pointer-events-none absolute -left-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-revival-gold/10 blur-3xl"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-revival-gold/10 blur-3xl"
        />
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-revival-gold/15 text-revival-gold ring-1 ring-revival-gold/30">
            <Sparkles className="h-7 w-7" strokeWidth={1.5} />
          </span>
          <div className="mt-6 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-gradient-to-r from-transparent via-revival-gold to-revival-gold/60 sm:w-12" />
            <span className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-revival-gold sm:text-xs">
              The Revival Difference
            </span>
            <span className="h-px w-8 bg-gradient-to-l from-transparent via-revival-gold to-revival-gold/60 sm:w-12" />
          </div>
          <p className="mt-6 text-lg font-light leading-relaxed text-white/85 sm:text-xl">
            Our philosophy is simple: the right treatment is the one that's customized for you. Whether you choose a gentle CoolPeel® or a more intensive DEKA resurfacing treatment, every procedure is performed using advanced CO₂ technology and tailored to your skin's unique needs — helping you achieve healthy, radiant, and natural-looking results.
          </p>
        </div>
      </section>

      <FAQSection faqs={FAQS} />

      <RelatedServices
        items={[
          {
            label: "CoolPeel®",
            href: "/co2-laser-treatments/",
            blurb:
              "The lighter cousin of Deka Tetra Pro - same Cartessa CO2 platform with minimal downtime for a quick skin refresh.",
          },
          {
            label: "CO2 Laser Treatments",
            href: "/co2-laser-treatments/",
            blurb:
              "The complete overview of our CO2 laser offering - CoolPeel® vs. Deka Tetra Pro side-by-side.",
          },
          {
            label: "Everesse RF Skin Tightening",
            href: "/everesse-rf-skin-tightening-and-rejuvenation/",
            blurb:
              "Pair Deka Tetra Pro with monopolar RF for our exclusive Radiant Lift protocol - surface renewal plus deep tightening.",
          },
        ]}
      />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-14 lg:px-8">
        <CTABanner
          title="Book your Deka Tetra Pro consultation"
          subtitle="Experience the ultimate in skin renewal. Schedule your consultation at Revival Health and Wellness today."
        />
      </div>

      <div className="mx-auto max-w-4xl px-4 pb-12 sm:px-6 lg:px-8">
        <p className="text-center text-[0.7rem] leading-relaxed text-white/60">
          Note: Neither treatment is better than the other — CoolPeel® has little to no downtime, while a moderate DEKA Tetra Pro requires more recovery. The right option simply depends on your skin goals and lifestyle. Book an appointment for a skin assessment and our providers will recommend the treatment that fits you best.
        </p>
      </div>
    </>
  );
}
