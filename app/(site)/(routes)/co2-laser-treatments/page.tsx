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
import Button from "@/components/ui/Button";
import { ZENOTI } from "@/lib/content/home";
import {
  OverviewBlock,
  FAQSection,
  RelatedServices,
} from "@/components/templates/HormoneSections";

const TITLE = "CO₂ Laser Skin Resurfacing – CoolPeel® & DEKA Tetra Pro";
const PATH = "/co2-laser-treatments/";
const DESCRIPTION =
  "Advanced CO₂ laser resurfacing in Las Vegas on the Cartessa SmartXide Tetra Pro platform. CoolPeel® for a gentle refresh, DEKA Tetra Pro for deeper resurfacing – tailored to your skin, downtime, and goals.";

export async function generateMetadata() {
  const fallback = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  images: ["/images/co2-laser-treatments/beauty-woman-clean-skin.webp"],
});
  return cmsPageMetadata(fallback);
}

const COOLPEEL_CONCERNS = [
  "Fine lines",
  "Enlarged pores",
  "Mild sun damage",
  "Uneven skin texture",
  "Early signs of aging",
];

const DEKA_CONCERNS = [
  "Moderate wrinkles",
  "Acne scars",
  "Deeper sun damage",
  "Pigmentation irregularities",
  "Skin laxity",
  "More advanced texture concerns",
];

const COMPARISON = [
  { coolpeel: "Minimal downtime", tetra: "Moderate downtime" },
  { coolpeel: "Refreshes skin", tetra: "Deeper skin resurfacing" },
  { coolpeel: "Fine lines & pores", tetra: "Wrinkles, acne scars & pigmentation" },
  { coolpeel: "Mild collagen stimulation", tetra: "Significant collagen remodeling" },
  { coolpeel: "Great for maintenance", tetra: "Ideal for correction and rejuvenation" },
];

const COOLPEEL_GALLERY = [
  {
    src: "/images/coolpeel-laser/228AB068-1B5F-4504-87BA-4C840C148E9D.jpeg",
    alt: "Revival medical provider performing a CoolPeel® CO₂ treatment",
  },
  {
    src: "/images/coolpeel/1R1A7618-1024x683-1.jpg",
    alt: "CoolPeel® handpiece treating skin around the nose",
  },
  {
    src: "/images/coolpeel/Uptown-Medical-Aesthetics-Coolpeel.webp",
    alt: "Patient wearing protective eyewear during CoolPeel® CO₂ laser session",
  },
];

const BEFORE_AFTERS = [
  "/images/coolpeel-laser/before-after-1.jpg",
  "/images/coolpeel-laser/before-after-3.jpg",
  "/images/coolpeel-laser/before-after-2.jpg",
];

const FAQS = [
  {
    question: "What is CoolPeel®?",
    answer:
      "CoolPeel® is a gentle fractional CO₂ resurfacing treatment on the Cartessa SmartXide Tetra Pro platform. It delivers the benefits of CO₂ laser technology while minimizing heat to the surrounding tissue - ideal for fine lines, enlarged pores, mild sun damage, uneven skin texture, and early signs of aging. Recovery is typically 2–5 days of redness and a sandpaper-like texture.",
  },
  {
    question: "What is a Moderate DEKA Tetra Pro resurfacing treatment?",
    answer:
      "A moderate DEKA treatment penetrates deeper into the skin than CoolPeel, delivering more energy for a stronger regenerative response. It is excellent for moderate wrinkles, acne scars, deeper sun damage, pigmentation irregularities, skin laxity, and more advanced texture concerns. Recovery is approximately 5–10 days depending on treatment settings and individual healing.",
  },
  {
    question: "Which treatment is right for me?",
    answer:
      "Neither treatment is better - they simply serve different goals and lifestyles. CoolPeel® is great when you want a refreshed complexion with minimal downtime, and a moderate DEKA Tetra Pro treatment is ideal when you're ready to accommodate a bit more downtime for more dramatic correction. During your consultation, our providers evaluate your skin health, lifestyle, and goals to recommend the safest and most effective option for you.",
  },
  {
    question: "Do these treatments use the same laser?",
    answer:
      "Yes. Both CoolPeel® and moderate DEKA resurfacing are performed on the Cartessa SmartXide Tetra Pro CO₂ platform - one of the most advanced CO₂ systems available. Different settings and techniques allow us to customize each treatment for your unique skin.",
  },
  {
    question: "Can I combine CO₂ laser with other treatments?",
    answer:
      "Absolutely. CO₂ laser resurfacing pairs beautifully with Everesse® RF skin tightening, microneedling, and Sculptra® depending on your goals. Your provider will build a plan that layers the right treatments over time for the most natural, long-lasting results.",
  },
];

export default function Co2LaserTreatmentsPage() {
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
              { name: "CO₂ Laser Treatments", path: PATH },
            ]),
            faqSchema(FAQS),
          ]),
        }}
      />

      <PageHero
        eyebrow={"Aesthetics · CO₂ Laser"}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Aesthetics", href: "/aesthetics/" },
          { label: "CO₂ Laser Treatments" },
        ]}
        title={
          <>
            <span className="relative inline-block italic text-revival-gold">
              {"CO₂ Laser"}
              <span
                aria-hidden
                className="absolute -bottom-2 left-0 h-[3px] w-full bg-gradient-to-r from-revival-gold to-transparent"
              />
            </span>{" "}
            Resurfacing
          </>
        }
        description={"Advanced CO₂ laser resurfacing on the Cartessa SmartXide Tetra Pro platform. CoolPeel® for a gentle refresh, DEKA Tetra Pro for deeper resurfacing – customized to your skin, downtime, and goals."}
        gallery={[
          "/images/co2-laser-treatments/beauty-woman-clean-skin.webp",
          "/images/co2-laser-treatments/Touch-MedSpa-CoolPeel-7727.jpg",
        ]}
        compact
      />

      <OverviewBlock
        section={{
          eyebrow: "Advanced CO₂ Laser Resurfacing",
          heading:
            "Where science meets beautiful skin",
          paragraphs: [
            "Healthy, radiant skin is never one-size-fits-all. At Revival Health & Wellness, we combine medical expertise with cutting-edge laser technology to create personalized treatment plans that restore confidence from within.",
            "Powered by the Cartessa SmartXide Tetra Pro CO₂ laser, our resurfacing treatments address the visible signs of aging, sun damage, uneven texture, acne scarring, and pigmentation while stimulating your body's natural collagen renewal process.",
            "Whether you choose the gentle rejuvenation of CoolPeel® or a deeper customized resurfacing treatment, every procedure is tailored to deliver beautiful, natural-looking results with the comfort, precision, and luxury experience you deserve.",
            "Because at Revival, we don't simply treat skin - we restore confidence.",
          ],
          image: "/images/co2-laser-treatments/Touch-MedSpa-CoolPeel-7727.jpg",
          imageAspect: "landscape",
        }}
      />

      <OverviewBlock
        tone="cream"
        section={{
          eyebrow: "CoolPeel® vs. DEKA Tetra Pro Resurfacing",
          heading: "One platform. Multiple levels of skin renewal.",
          paragraphs: [
            "At Revival Health & Wellness, we customize every CO₂ laser treatment using the Cartessa SmartXide Tetra Pro platform. This allows us to tailor your treatment based on your skin concerns, desired results, and available downtime.",
            "Both options are excellent - they simply meet you where you are. Below is a side-by-side look at what each treatment is designed to do.",
          ],
        }}
      />

      {/* Side-by-side treatment cards */}
      <section className="relative overflow-hidden bg-revival-warm-white py-14 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
            {/* CoolPeel card */}
            <article className="relative flex flex-col overflow-hidden rounded-[2rem] border border-revival-gold/20 bg-white p-8 shadow-[0_25px_70px_-30px_rgba(15,15,15,0.2)] sm:p-10">
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-revival-cream">
                <Image
                  src="/images/co2-laser-treatments/coolpeel-treatment-in-progress.jpg"
                  alt="CoolPeel® CO₂ resurfacing treatment"
                  fill
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-contain"
                />
              </div>
              <div className="mt-8">
                <span className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-revival-gold">
                  Gentle rejuvenation
                </span>
                <h3
                  className="mt-3 font-heading font-medium leading-tight text-revival-dark"
                  style={{ fontSize: "clamp(1.6rem, 2.4vw, 2.15rem)" }}
                >
                  {"CoolPeel®"}
                </h3>
                <p className="mt-4 text-base font-light leading-relaxed text-revival-charcoal/85 sm:text-lg">
                  Perfect for patients looking for refreshed, glowing skin with minimal downtime. CoolPeel delivers the benefits of CO₂ laser technology while minimizing unnecessary heat to the surrounding tissue.
                </p>
                <p className="mt-6 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-revival-gold">
                  Ideal for improving
                </p>
                <ul className="mt-3 space-y-2">
                  {COOLPEEL_CONCERNS.map((c) => (
                    <li
                      key={c}
                      className="flex items-start gap-2 text-sm font-light leading-relaxed text-revival-charcoal/80 sm:text-base"
                    >
                      <span
                        aria-hidden
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-revival-gold"
                      />
                      {c}
                    </li>
                  ))}
                </ul>
                <div className="mt-7 grid gap-4 border-t border-revival-gold/15 pt-6 sm:grid-cols-2">
                  <div>
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-revival-gold">
                      Recovery
                    </p>
                    <p className="mt-1.5 text-sm font-light leading-relaxed text-revival-charcoal/80">
                      Typically 2–5 days of redness and a sandpaper-like texture.
                    </p>
                  </div>
                  <div>
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-revival-gold">
                      Best For
                    </p>
                    <p className="mt-1.5 text-sm font-light leading-relaxed text-revival-charcoal/80">
                      Patients wanting noticeable skin rejuvenation without significant downtime.
                    </p>
                  </div>
                </div>
              </div>
            </article>

            {/* DEKA Tetra Pro card */}
            <article className="relative flex flex-col overflow-hidden rounded-[2rem] border border-revival-gold/20 bg-white p-8 shadow-[0_25px_70px_-30px_rgba(15,15,15,0.2)] sm:p-10">
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-revival-cream">
                <Image
                  src="/images/co2-laser-treatments/cartessa-smartxide-tetra.jpg"
                  alt="Cartessa SmartXide DEKA Tetra Pro CO₂ laser platform"
                  fill
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-contain"
                />
              </div>
              <div className="mt-8">
                <span className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-revival-gold">
                  Deeper resurfacing
                </span>
                <h3
                  className="mt-3 font-heading font-medium leading-tight text-revival-dark"
                  style={{ fontSize: "clamp(1.6rem, 2.4vw, 2.15rem)" }}
                >
                  Moderate DEKA Tetra Pro
                </h3>
                <p className="mt-4 text-base font-light leading-relaxed text-revival-charcoal/85 sm:text-lg">
                  Designed for patients seeking more dramatic skin rejuvenation. A moderate DEKA treatment penetrates deeper into the skin than CoolPeel, stimulating greater collagen remodeling and addressing more advanced skin concerns. Because more energy is delivered, the skin undergoes a stronger regenerative response.
                </p>
                <p className="mt-6 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-revival-gold">
                  Excellent for treating
                </p>
                <ul className="mt-3 space-y-2">
                  {DEKA_CONCERNS.map((c) => (
                    <li
                      key={c}
                      className="flex items-start gap-2 text-sm font-light leading-relaxed text-revival-charcoal/80 sm:text-base"
                    >
                      <span
                        aria-hidden
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-revival-gold"
                      />
                      {c}
                    </li>
                  ))}
                </ul>
                <div className="mt-7 grid gap-4 border-t border-revival-gold/15 pt-6 sm:grid-cols-2">
                  <div>
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-revival-gold">
                      Recovery
                    </p>
                    <p className="mt-1.5 text-sm font-light leading-relaxed text-revival-charcoal/80">
                      Approximately 5–10 days, depending on the treatment settings and individual healing.
                    </p>
                  </div>
                  <div>
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-revival-gold">
                      Best For
                    </p>
                    <p className="mt-1.5 text-sm font-light leading-relaxed text-revival-charcoal/80">
                      Patients looking for more dramatic improvement in skin texture, tone, and collagen production who can accommodate additional downtime.
                    </p>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Comparison table */}
      <section className="relative overflow-hidden bg-revival-cream py-14 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-gradient-to-r from-transparent via-revival-gold to-revival-gold/60 sm:w-12" />
              <span className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-revival-gold sm:text-xs">
                Which treatment is right for you?
              </span>
              <span className="h-px w-8 bg-gradient-to-l from-transparent via-revival-gold to-revival-gold/60 sm:w-12" />
            </div>
            <h2
              className="font-heading font-light leading-[1.05] text-revival-dark"
              style={{ fontSize: "clamp(2rem, 3.6vw, 3.15rem)", letterSpacing: "-0.01em" }}
            >
              Two paths, one platform
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-base font-light leading-relaxed text-revival-charcoal/80 sm:text-lg">
              Every patient's skin ages differently. During your consultation, our providers evaluate your skin health, lifestyle, and goals to recommend the treatment that will deliver the safest and most effective results.
            </p>
          </div>

          <div className="mt-14 overflow-hidden rounded-2xl border border-revival-gold/20 bg-white shadow-sm">
            <table className="w-full text-left text-sm sm:text-base">
              <thead className="bg-revival-dark text-white">
                <tr>
                  <th className="px-4 py-4 font-heading font-medium sm:px-6">{"CoolPeel®"}</th>
                  <th className="px-4 py-4 font-heading font-medium sm:px-6">Moderate DEKA Tetra Pro</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row, i) => (
                  <tr
                    key={row.coolpeel}
                    className={
                      i % 2 === 0
                        ? "border-t border-revival-gold/10 bg-white"
                        : "border-t border-revival-gold/10 bg-revival-cream/40"
                    }
                  >
                    <td className="px-4 py-4 text-revival-charcoal/85 sm:px-6">
                      {row.coolpeel}
                    </td>
                    <td className="px-4 py-4 text-revival-charcoal/85 sm:px-6">
                      {row.tetra}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CoolPeel launch announcement */}
      <section className="relative overflow-hidden bg-revival-warm-white py-14 sm:py-20 lg:py-24">
        <span
          aria-hidden
          className="pointer-events-none absolute -left-32 top-10 h-96 w-96 rounded-full bg-revival-gold/10 blur-[140px]"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute -right-32 bottom-10 h-96 w-96 rounded-full bg-revival-gold/10 blur-[140px]"
        />
        <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:px-8">
          <figure className="relative mx-auto w-full max-w-md overflow-hidden rounded-[2rem] border border-revival-gold/20 bg-white shadow-xl lg:mx-0">
            <Image
              src="/images/co2-laser-treatments/coolpeel-launch-announcement.png"
              alt="New at Revival Health & Wellness - CoolPeel CO₂ laser is now in the office"
              width={874}
              height={1164}
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="h-auto w-full object-contain"
              quality={92}
            />
          </figure>
          <div>
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-8 bg-gradient-to-r from-transparent via-revival-gold to-revival-gold/60 sm:w-12" />
              <span className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-revival-gold">
                New at Revival
              </span>
            </div>
            <h2
              className="font-heading font-light leading-[1.05] text-revival-dark"
              style={{ fontSize: "clamp(2rem, 3.6vw, 3.1rem)", letterSpacing: "-0.01em" }}
            >
              CoolPeel® is officially in our Las Vegas office
            </h2>
            <p className="mt-6 border-l-2 border-revival-gold/40 pl-5 text-lg font-light leading-[1.65] text-revival-charcoal/90 sm:text-xl">
              Cool news - we've added the next-generation CoolPeel® CO₂ laser to our treatment room. Refreshed, glowing skin with minimal downtime is now available at Revival Health &amp; Wellness.
            </p>
            <p className="mt-5 text-base font-light leading-relaxed text-revival-charcoal/80 sm:text-lg">
              Ask our medical team about our launch pricing during your consultation - we&apos;ll build the right CO₂ plan for your skin, lifestyle, and downtime.
            </p>
            <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <Button href={ZENOTI} external variant="primary" size="lg">
                Book Your CoolPeel®
              </Button>
              <Button href="tel:+17029631154" variant="outline" size="lg">
                Call (702) 963-1154
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CoolPeel treatment gallery */}
      <section className="relative overflow-hidden bg-revival-cream py-14 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-gradient-to-r from-transparent via-revival-gold to-revival-gold/60 sm:w-12" />
              <span className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-revival-gold sm:text-xs">
                CoolPeel® in the treatment room
              </span>
              <span className="h-px w-8 bg-gradient-to-l from-transparent via-revival-gold to-revival-gold/60 sm:w-12" />
            </div>
            <h2
              className="font-heading font-light leading-[1.05] text-revival-dark"
              style={{ fontSize: "clamp(2rem, 3.6vw, 3.15rem)", letterSpacing: "-0.01em" }}
            >
              Inside a CoolPeel® session
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-base font-light leading-relaxed text-revival-charcoal/80 sm:text-lg">
              A quiet, in-clinic look at what a CoolPeel® CO₂ resurfacing session at Revival Health & Wellness actually looks like.
            </p>
          </div>
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {COOLPEEL_GALLERY.map((img) => (
              <figure
                key={img.src}
                className="group relative aspect-[4/5] overflow-hidden rounded-2xl border border-revival-gold/15 bg-revival-cream shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_60px_-20px_rgba(15,15,15,0.3)]"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  quality={90}
                />
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Before & After patient gallery */}
      <section className="relative bg-revival-warm-white py-14 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-gradient-to-r from-transparent via-revival-gold to-revival-gold/60 sm:w-12" />
              <span className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-revival-gold sm:text-xs">
                Before &amp; After
              </span>
              <span className="h-px w-8 bg-gradient-to-l from-transparent via-revival-gold to-revival-gold/60 sm:w-12" />
            </div>
            <h2
              className="font-heading font-light leading-[1.05] text-revival-dark"
              style={{ fontSize: "clamp(2rem, 3.6vw, 3.15rem)", letterSpacing: "-0.01em" }}
            >
              Real patients. Real results.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-base font-light leading-relaxed text-revival-charcoal/80 sm:text-lg">
              Real Revival patients after a personalized CO₂ laser resurfacing plan on the Cartessa SmartXide Tetra Pro platform.
            </p>
          </div>
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-3 lg:gap-8">
            {BEFORE_AFTERS.map((src, i) => (
              <figure
                key={src}
                className="group relative aspect-square overflow-hidden rounded-2xl border border-revival-gold/20 bg-white shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_60px_-20px_rgba(15,15,15,0.3)]"
              >
                <Image
                  src={src}
                  alt={`CoolPeel® CO₂ patient before and after ${i + 1}`}
                  fill
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  quality={90}
                />
              </figure>
            ))}
          </div>
        </div>
      </section>

      <OverviewBlock
        tone="cream"
        section={{
          eyebrow: "The Revival Difference",
          heading:
            "The right treatment is the one that's customized for you",
          paragraphs: [
            "Our philosophy is simple: the right treatment is the one that's customized for you. Whether you choose a gentle CoolPeel® or a more intensive DEKA resurfacing treatment, every procedure is performed using advanced CO₂ technology and tailored to your skin's unique needs - helping you achieve healthy, radiant, and natural-looking results.",
          ],
          image: "/images/co2-laser-treatments/beauty-woman-clean-skin.webp",
          imageAspect: "landscape",
        }}
      />

      <FAQSection faqs={FAQS} />

      <RelatedServices
        items={[
          {
            label: "Everesse RF Skin Tightening",
            href: "/everesse-rf-skin-tightening-and-rejuvenation/",
            blurb:
              "Monopolar RF skin tightening - pairs beautifully with CoolPeel® in our exclusive Radiant Lift protocol.",
          },
          {
            label: "Microneedling",
            href: "/microneedling/",
            blurb:
              "Boost collagen and refine skin texture - a natural complement to CO₂ laser resurfacing.",
          },
          {
            label: "Sculptra®",
            href: "/sculptra/",
            blurb:
              "Restore volume gradually with collagen-stimulating Sculptra® as your CO₂ results build.",
          },
        ]}
      />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-14 lg:px-8">
        <CTABanner
          title="Ready to design your CO₂ resurfacing plan?"
          subtitle="Book a skin assessment with our medical team - together we'll choose the treatment that fits your skin, schedule, and goals."
          primaryLabel="Book a Skin Assessment"
          primaryHref="/contact-us/"
          secondaryLabel="Call Us"
          secondaryHref="tel:+17029631154"
        />
      </div>
    </>
  );
}

