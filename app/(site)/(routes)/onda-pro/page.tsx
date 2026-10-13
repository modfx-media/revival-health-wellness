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
import {
  PillarsGrid,
  FAQSection,
  RelatedServices,
} from "@/components/templates/HormoneSections";
import { OctoProVideoShowcase } from "@/components/templates/OctoProVideoShowcase";

const TITLE = "ONDA Pro Body Contouring";
const PATH = "/onda-pro/";
const DESCRIPTION =
  "Non-invasive body contouring with the ONDA Pro system in Las Vegas. Revival Health and Wellness uses microwave-based Coolwaves technology to reduce fat, tighten skin, and smooth cellulite.";

export async function generateMetadata() {
  const fallback = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  images: ["/images/octopro-onda/octopro-machine.webp"],
});
  return cmsPageMetadata(fallback);
}

const KEY_BENEFITS = [
  "Non-invasive fat reduction on abdomen, love handles, thighs, arms",
  "Simultaneous skin tightening in the treated area",
  "Visible cellulite improvement",
  "No incisions, no needles, no anesthesia",
  "Zero downtime - return to normal activity immediately",
  "Comfortable, well-tolerated sessions",
];

const TREATMENT_AREAS = [
  {
    title: "Abdomen & Flanks",
    text: "The most-requested zone - target stubborn belly fat and love handles that resist diet and exercise. ONDA Pro’s Coolwaves reach subcutaneous adipose tissue while protecting the skin.",
    icon: "target" as const,
  },
  {
    title: "Thighs & Buttocks",
    text: "Smooth cellulite, reduce localized fat, and tighten the overlying skin - a combination few devices deliver in one session.",
    icon: "sparkles" as const,
  },
  {
    title: "Arms & Bra Line",
    text: "Refine the upper arms and bra-line area with the same technology, calibrated for smaller, more delicate treatment zones.",
    icon: "timer" as const,
  },
];

const FAQS = [
  {
    question: "What is ONDA Pro?",
    answer:
      "ONDA Pro is a non-invasive body-contouring device by DEKA that uses Coolwaves - a proprietary microwave technology - to selectively heat subcutaneous fat cells while protecting the surface of the skin. In the same treatment, the residual thermal action stimulates dermal remodeling for skin tightening and cellulite improvement.",
  },
  {
    question: "What can ONDA Pro treat?",
    answer:
      "ONDA Pro is cleared for localized fat reduction, skin laxity, and cellulite - across the abdomen, flanks, thighs, buttocks, arms, and bra-line area. It’s particularly well-suited to patients seeking a non-surgical alternative to liposuction who also want a mild skin-tightening benefit.",
  },
  {
    question: "How many sessions will I need?",
    answer:
      "Most patients see meaningful results after a series of 3–4 sessions spaced 2–4 weeks apart. Your provider will build a personalized protocol during your consultation based on your goals and the treatment area.",
  },
  {
    question: "What does a session feel like?",
    answer:
      "Sessions are comfortable - you’ll feel a warm, massage-like sensation as the handpiece is moved across the treatment area. There’s no numbing required and no post-treatment soreness. Sessions typically run 20–40 minutes depending on the area.",
  },
  {
    question: "Is there downtime?",
    answer:
      "None. You may see mild pinkness in the treated area for a few hours, but you can return to work, exercise, and normal activities immediately.",
  },
  {
    question: "When will I see results?",
    answer:
      "Initial changes are visible within a few weeks. Optimal results build gradually over 3–6 months as the body naturally metabolizes the treated fat cells and new collagen forms.",
  },
];

/**
 * Full-bleed uncropped image block - two-column layout that renders the source
 * image at its native aspect ratio via `object-contain`, so device shots and
 * treatment photos display in full without any cropping.
 */
function FullImageBlock({
  eyebrow,
  heading,
  paragraphs,
  bullets,
  image,
  imageAlt,
  imageWidth,
  imageHeight,
  reverse = false,
  tone = "light",
}: {
  eyebrow: string;
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  image: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  reverse?: boolean;
  tone?: "light" | "cream";
}) {
  const bg = tone === "cream" ? "bg-revival-cream" : "bg-revival-warm-white";
  return (
    <section className={`relative overflow-clip ${bg} py-14 sm:py-20 lg:py-28`}>
      <span
        aria-hidden
        className="pointer-events-none absolute -left-32 top-16 h-96 w-96 rounded-full bg-revival-gold/10 blur-[140px]"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -right-32 bottom-16 h-96 w-96 rounded-full bg-revival-gold/10 blur-[140px]"
      />
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-8">
        <div className={reverse ? "lg:order-2" : ""}>
          <div className="relative overflow-hidden rounded-[2rem] border border-revival-gold/15 bg-gradient-to-br from-revival-cream to-revival-warm-white p-4 shadow-[0_50px_120px_-32px_rgba(15,15,15,0.25)]">
            <div className="relative flex items-center justify-center">
              <Image
                src={image}
                alt={imageAlt}
                width={imageWidth}
                height={imageHeight}
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="h-auto w-full rounded-2xl object-contain"
              />
            </div>
          </div>
        </div>
        <div className={reverse ? "lg:order-1" : ""}>
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-8 bg-gradient-to-r from-transparent via-revival-gold to-revival-gold/60" />
            <span className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-revival-gold">
              {eyebrow}
            </span>
          </div>
          <h2 className="font-heading text-3xl leading-[1.1] tracking-[-0.015em] text-revival-dark sm:text-4xl lg:text-[2.75rem]">
            {heading}
          </h2>
          <div className="mt-8 space-y-6">
            {paragraphs.map((p, i) => (
              <p
                key={i}
                className={
                  i === 0
                    ? "relative border-l-2 border-revival-gold/40 pl-5 text-lg font-light leading-[1.7] text-revival-charcoal/90 sm:text-xl sm:leading-[1.65]"
                    : "text-base font-light leading-relaxed text-revival-charcoal/80 sm:text-lg"
                }
              >
                {p}
              </p>
            ))}
          </div>
          {bullets && bullets.length > 0 && (
            <ul className="mt-10 grid gap-3 sm:grid-cols-2">
              {bullets.map((b, i) => (
                <li
                  key={b}
                  className="flex items-start gap-3 text-sm text-revival-charcoal/80 sm:text-[0.95rem]"
                >
                  <span
                    aria-hidden
                    className="mt-1 font-heading text-xs italic text-revival-gold"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}

export default function OctoProOndaPage() {
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
              { name: "ONDA Pro", path: PATH },
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
          { label: "ONDA Pro" },
        ]}
        title={
          <>
            <span className="relative inline-block italic text-revival-gold">
              ONDA
              <span
                aria-hidden
                className="absolute -bottom-2 left-0 h-[3px] w-full bg-gradient-to-r from-revival-gold to-transparent"
              />
            </span>{" "}
            Pro
          </>
        }
        description="Non-invasive fat reduction, skin tightening, and cellulite improvement - in one treatment. Powered by DEKA’s proprietary Coolwaves microwave technology."
        gallery={[
          "/images/octopro-onda/octopro-machine.webp",
          "/images/octopro-onda/octopro-onda-1.webp",
          "/images/octopro-onda/octopro-2.jpg",
        ]}
        compact
      />

      <FullImageBlock
        eyebrow="Introducing the ONDA Pro Platform"
        heading="Fat reduction. Skin tightening. Cellulite smoothing. In one session."
        paragraphs={[
          "ONDA Pro is DEKA’s next-generation body-contouring platform, now available at Revival Health and Wellness. Using proprietary Coolwaves technology, it selectively heats subcutaneous adipose tissue while protecting the surface of the skin - a combination that’s difficult to achieve with laser or radiofrequency alone.",
          "The result: measurable reduction in localized fat, visible skin tightening, and improvement in the appearance of cellulite - without incisions, anesthesia, or downtime.",
        ]}
        image="/images/octopro-onda/octopro-machine.webp"
        imageAlt="ONDA Pro body contouring device"
        imageWidth={3840}
        imageHeight={5760}
      />

      <FullImageBlock
        tone="cream"
        reverse
        eyebrow="How ONDA Pro Works"
        heading="Coolwaves - microwave energy, precisely delivered"
        paragraphs={[
          "ONDA Pro delivers 2.45 GHz microwave energy through a proprietary handpiece designed to preferentially target adipose tissue. Fat cells absorb the energy and undergo apoptosis (natural cell death); the body then clears them through normal metabolic processes over the following weeks.",
          "Because the same thermal action gently heats the dermis, patients also see collagen remodeling in the treated area - which is why ONDA Pro tightens skin and improves cellulite in the same session it reduces fat.",
        ]}
        image="/images/octopro-onda/octopro-onda-1.webp"
        imageAlt="ONDA Pro treatment in progress"
        imageWidth={2706}
        imageHeight={3607}
      />

      <FullImageBlock
        eyebrow="Key Benefits"
        heading="Everything ONDA Pro delivers in one platform"
        paragraphs={[
          "One versatile handpiece system, calibrated to each treatment zone - abdomen, love handles, thighs, buttocks, arms, and bra-line. Every session is comfortable, quick, and downtime-free.",
        ]}
        bullets={KEY_BENEFITS}
        image="/images/octopro-onda/octopro-2.jpg"
        imageAlt="ONDA Pro treatment session"
        imageWidth={650}
        imageHeight={530}
      />

      <PillarsGrid
        tone="cream"
        eyebrow="Where ONDA Pro Treats"
        heading="One device. Multiple body zones."
        intro="The ONDA Pro handpiece adjusts to the treatment area, letting your provider address stubborn fat across a wide range of body zones."
        pillars={TREATMENT_AREAS}
      />

      <OctoProVideoShowcase />

      <FullImageBlock
        eyebrow="Who is a good candidate?"
        heading="For patients seeking a non-surgical alternative to liposuction"
        paragraphs={[
          "ONDA Pro is ideal for patients close to their goal weight who want to address localized pockets of stubborn fat, mild-to-moderate skin laxity, or cellulite - without the recovery of surgical liposuction.",
          "During your complimentary consultation, our medical team will assess your goals, review your health history, and design a customized ONDA Pro protocol - or recommend the best combination of body-contouring options across our platform.",
          "For patients seeking maximum transformation, our providers often layer ONDA Pro with Emsculpt NEO (to build muscle in the treated area) and Everesse RF (for deeper skin tightening). We’ll design the right combination for your goals.",
        ]}
        image="/images/octopro-onda/octopro-4.jpeg"
        imageAlt="ONDA Pro non-surgical body contouring candidate"
        imageWidth={452}
        imageHeight={678}
        reverse
      />

      <FAQSection faqs={FAQS} />

      <RelatedServices
        items={[
          {
            label: "Emsculpt NEO",
            href: "/emsculpt-neo/",
            blurb:
              "Build muscle and burn fat with HIFEM + RF - the perfect complement to ONDA Pro’s fat-reduction focus.",
          },
          {
            label: "Everesse RF Skin Tightening",
            href: "/everesse-rf-skin-tightening-and-rejuvenation/",
            blurb:
              "Deeper monopolar RF tightening for the same treatment areas - layer for compound results.",
          },
          {
            label: "Weight Loss Program",
            href: "/weight-loss/",
            blurb:
              "Medical weight-loss (GLP-1s, phentermine, coaching) that pairs beautifully with body contouring.",
          },
        ]}
      />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-14 lg:px-8">
        <CTABanner
          title="Reduce fat. Tighten skin. Smooth cellulite. Without surgery."
          subtitle="Book a complimentary ONDA Pro consultation. Our medical team will assess your goals and design a personalized protocol."
        />
      </div>
    </>
  );
}
