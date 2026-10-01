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
import { CheckCircle2 } from "lucide-react";
import {
  OverviewBlock,
  PillarsGrid,
  BenefitsList,
  FAQSection,
  RelatedServices,
} from "@/components/templates/HormoneSections";

const TITLE = "Emsculpt NEO Body Contouring";
const PATH = "/emsculpt-neo/";
const DESCRIPTION =
  "Build muscle and reduce fat with Emsculpt NEO in Las Vegas. Revival Health and Wellness helps you tone your body using this advanced, non-surgical technology.";

export async function generateMetadata() {
  const fallback = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  images: ["/images/emsculpt-neo/emsculpt-neo-female-model.jpg"],
});
  return cmsPageMetadata(fallback);
}

const KEY_BENEFITS = [
  "Average 30% reduction in subcutaneous fat",
  "Average 25% increase in muscle thickness",
  "Non-invasive - no incisions, no anesthesia",
  "30-minute treatment sessions",
  "Treats abdomen, buttocks, thighs, arms, calves",
  "Works for patients up to BMI 35",
];

const FDA_BENEFITS = [
  "Non-invasive muscle strengthening and toning",
  "Support for injury recovery and mobility",
  "Improved core strength and physical resilience",
  "Adjunct care for chronic pain patients",
  "Enhanced functional performance",
];

const TREATMENT_AREAS = [
  {
    title: "Upper Body",
    text: "Arms, biceps, triceps, and shoulders - build definition and tone with targeted HIFEM contractions plus RF heating.",
    icon: "target" as const,
  },
  {
    title: "Mid Section",
    text: "Abs, love handles, core, and glutes - the most popular treatment zones for building a stronger, more sculpted midsection.",
    icon: "sparkles" as const,
  },
  {
    title: "Lower Body",
    text: "Legs, thighs, and hamstrings - lift, firm, and strengthen with the same clinically-proven protocol.",
    icon: "timer" as const,
  },
];

const FAQS = [
  {
    question: "What is Emsculpt NEO?",
    answer:
      "Emsculpt NEO is the first non-invasive body-shaping procedure that helps eliminate fat and build muscle simultaneously in a single 30-minute session. It combines Radiofrequency (RF) heating with High-Intensity Focused Electromagnetic (HIFEM) energy to reduce fat cells while triggering intense muscle contractions. Clinical studies show an average 30% reduction in subcutaneous fat and 25% increase in muscle thickness.",
  },
  {
    question: "Who is a good candidate for Emsculpt NEO?",
    answer:
      "If you can benefit from less fat and more muscle, Emsculpt NEO may be a great fit for you. It has broad appeal because it can treat patients up to BMI 35 - a wider range than most body-contouring options. It’s especially popular for the abdomen, buttocks, thighs, arms, and calves.",
  },
  {
    question: "What does Emsculpt NEO feel like?",
    answer:
      "You’ll feel intense muscle contractions and a heating sensation in the treated area - comparable to a hot stone massage combined with an intense workout. Some patients experience mild soreness afterward, similar to post-workout muscle fatigue. This typically resolves within a few days.",
  },
  {
    question: "How long until I see results?",
    answer:
      "Many patients notice tangible results immediately after the first few sessions. Optimal results are typically observed 90 days after the final session and can continue improving for several weeks as your body responds to the treatment.",
  },
  {
    question: "How is Emsculpt NEO different from the original Emsculpt?",
    answer:
      "The original Emsculpt uses HIFEM alone to build muscle. Emsculpt NEO adds Radiofrequency heating simultaneously, which allows it to reduce fat AND build muscle in the same session. It’s also FDA-cleared for a wider range of treatment areas including thighs, calves, arms, glutes, and abdomen.",
  },
];

const YOUTUBE_ID = "mA7WVaUUAws";

export default function EmsculptNeoPage() {
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
              { name: "Emsculpt NEO", path: PATH },
            ]),
            faqSchema(FAQS),
          ]),
        }}
      />

      <PageHero
        eyebrow={"Aesthetics · Body Contouring"}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Aesthetics", href: "/aesthetics/" },
          { label: "Emsculpt NEO" },
        ]}
        title={
          <>
            <span className="relative inline-block italic text-revival-gold">
              Emsculpt
              <span
                aria-hidden
                className="absolute -bottom-2 left-0 h-[3px] w-full bg-gradient-to-r from-revival-gold to-transparent"
              />
            </span>{" "}
            NEO
          </>
        }
        description="Build muscle. Burn fat. Reshape your body in 30-minute sessions - no surgery, no downtime. The first non-invasive body-shaping technology that does both at once."
        gallery={[
          "/images/emsculpt-neo/emsculpt-neo-female-model.jpg",
          "/images/emsculpt-neo/neobum.webp",
        ]}
        compact
      />

      <OverviewBlock
        section={{
          eyebrow: "Transform Your Body with Emsculpt NEO",
          heading: "Build muscle and burn fat in a single 30-minute session",
          paragraphs: [
            "Emsculpt NEO is the first and only non-invasive body-shaping procedure that helps eliminate fat and build muscle simultaneously in 30 minutes - the ultimate muscle-building and fat-reduction system.",
            "It combines Radiofrequency (RF) heating with the HIFEM (High-Intensity Focused Electromagnetic) procedure to reduce fat and build muscle at the same time. Clinical studies show an average 30% reduction in subcutaneous fat and a 25% increase in muscle thickness.",
          ],
          image: "/images/emsculpt-neo/emsculpt-neo-female-model.jpg",
          imageAspect: "landscape",
        }}
      />

      <OverviewBlock
        tone="cream"
        reverse
        section={{
          eyebrow: "What is Emsculpt NEO?",
          heading:
            "Two clinically-proven technologies. One 30-minute session.",
          paragraphs: [
            "Abdomen and buttock treatments are among the most in-demand aesthetic procedures. Emsculpt NEO’s large applicators are designed to treat these bigger areas - the abdomen, buttocks, and thighs - enhancing contour, firmness, and strength.",
            "The end result is less fat and more muscle, in less time. Best of all, Emsculpt NEO has broad appeal because it can treat patients up to BMI 35.",
          ],
          image: "/images/emsculpt-neo/neobum.webp",
          imageAspect: "landscape",
        }}
      />

      {/* Before/After billboard */}
      <section className="relative overflow-clip bg-revival-warm-white py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <p className="text-tagline text-[0.7rem] text-revival-gold">
              REAL RESULTS · BEFORE &amp; AFTER
            </p>
            <h2 className="mt-3 font-heading text-3xl italic text-revival-dark sm:text-4xl lg:text-[2.75rem]">
              30% less fat. 25% more muscle. Clinically proven.
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            <figure className="group relative overflow-hidden rounded-3xl border border-revival-gold/20 bg-white shadow-xl">
              <img
                src="/images/emsculpt-neo/female-abdomen-before-after.png"
                alt="Female abdomen before and after Emsculpt NEO treatment"
                className="w-full transition-transform duration-700 group-hover:scale-[1.02]"
              />
              <figcaption className="border-t border-revival-gold/15 bg-revival-warm-white px-6 py-3 text-center text-xs font-semibold uppercase tracking-[0.16em] text-revival-charcoal">
                Female · Lateral Abdomen
              </figcaption>
            </figure>
            <figure className="group relative overflow-hidden rounded-3xl border border-revival-gold/20 bg-white shadow-xl">
              <img
                src="/images/emsculpt-neo/male-abdomen-before-after.png"
                alt="Male abdomen before and after Emsculpt NEO treatment"
                className="w-full transition-transform duration-700 group-hover:scale-[1.02]"
              />
              <figcaption className="border-t border-revival-gold/15 bg-revival-warm-white px-6 py-3 text-center text-xs font-semibold uppercase tracking-[0.16em] text-revival-charcoal">
                Male · Lateral Abdomen
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* Key Benefits + video showcase */}
      <section className="relative overflow-clip bg-revival-cream py-14 sm:py-20 lg:py-28">
        <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1fr_1fr] lg:gap-16 lg:px-8">
          <div>
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-8 bg-gradient-to-r from-transparent via-revival-gold to-revival-gold/60 sm:w-12" />
              <span className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-revival-gold sm:text-xs">
                Key Benefits of Emsculpt NEO
              </span>
            </div>
            <h2
              className="font-heading font-light leading-[1.05] text-revival-dark"
              style={{ fontSize: "clamp(2rem, 3.6vw, 3.15rem)", letterSpacing: "-0.01em" }}
            >
              Everything one machine can do for you
            </h2>

            <ul className="mt-10 grid gap-3 sm:grid-cols-2">
              {KEY_BENEFITS.map((it) => (
                <li
                  key={it}
                  className="flex items-start gap-3 rounded-2xl bg-white px-4 py-4 text-sm text-revival-charcoal/85 shadow-sm ring-1 ring-revival-gold/10"
                >
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-revival-gold to-revival-gold-light text-revival-dark">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                  </span>
                  <span className="pt-0.5">{it}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-center text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-revival-gold lg:text-left">
              See it in action
            </p>
            <h3 className="mt-2 text-center font-heading text-2xl italic text-revival-dark sm:text-3xl lg:text-left">
              Watch how Emsculpt NEO works
            </h3>
            <div className="relative mt-6 overflow-hidden rounded-[2rem] border border-revival-gold/25 bg-black shadow-[0_50px_120px_-32px_rgba(201,169,110,0.35)]">
              <div className="relative pt-[56.25%]">
                <iframe
                  src={`https://www.youtube.com/embed/${YOUTUBE_ID}?rel=0&modestbranding=1`}
                  title="Emsculpt NEO overview"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <PillarsGrid
        tone="cream"
        eyebrow="FDA-Cleared Treatment Areas"
        heading="Sculpt from head to legs"
        intro="The FDA has approved Emsculpt NEO for a wide range of treatment areas. Three body zones, one clinically-proven protocol."
        pillars={TREATMENT_AREAS}
      />

      <OverviewBlock
        section={{
          eyebrow: "Who Qualifies for Emsculpt NEO",
          heading: "A great fit if you want less fat and more muscle",
          paragraphs: [
            "If you can benefit from less fat and more muscle, Emsculpt NEO may be right for you. Because it can treat patients up to BMI 35, it appeals to a much wider audience than most body-contouring treatments.",
            "During your treatment you’ll feel intense muscle contractions and a heating sensation - comparable to a hot stone massage combined with an intense workout. Some soreness afterward is normal and resolves within a few days.",
          ],
        }}
      />

      <OverviewBlock
        tone="cream"
        reverse
        section={{
          eyebrow: "Functional Wellness",
          heading:
            "Beyond aesthetics - a tool for recovery, strength, and mobility",
          paragraphs: [
            "Emsculpt NEO’s integration into functional wellness offers a non-invasive option for enhancing muscle strength, improving mobility, and supporting overall physical health.",
            "It’s an increasingly valuable tool for patients recovering from injuries, managing chronic pain, or aiming to improve core strength and physical resilience - without the impact of high-intensity training.",
          ],
        }}
      />

      <BenefitsList
        eyebrow="FDA-Cleared Benefits"
        heading="Emsculpt NEO Functional Wellness is FDA-cleared to help with:"
        items={FDA_BENEFITS}
      />

      <OverviewBlock
        section={{
          eyebrow: "Recovery and Results",
          heading: "Immediate feedback. Peak results at 90 days.",
          paragraphs: [
            "There’s essentially no downtime with Emsculpt NEO. Many patients start to notice tangible results right after their initial treatments.",
            "Optimal results are typically observed 90 days after the final session and can continue improving for several weeks after treatment - as your body responds to the newly-built muscle and reduced fat.",
          ],
        }}
      />

      <FAQSection faqs={FAQS} />

      <RelatedServices
        items={[
          {
            label: "Emsella",
            href: "/emsella/",
            blurb:
              "The pelvic-floor sibling of Emsculpt NEO - same HIFEM technology, applied to strengthen the pelvic floor.",
          },
          {
            label: "Everesse RF Skin Tightening",
            href: "/everesse-rf-skin-tightening-and-rejuvenation/",
            blurb:
              "Combine Emsculpt NEO with monopolar RF for our Radiant Lift protocol - tighter skin over stronger muscle.",
          },
          {
            label: "Weight Loss Program",
            href: "/weight-loss/",
            blurb:
              "Pair body contouring with our medical weight-loss program for a complete transformation.",
          },
        ]}
      />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-14 lg:px-8">
        <CTABanner
          title="Ready to build muscle and burn fat - without lifting a weight?"
          subtitle="Book a free Emsculpt NEO consultation. Our medical team will assess your goals and design a session plan tailored to you."
        />
      </div>
    </>
  );
}
