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

const TITLE = "Xerf Skin Tightening & Rejuvenation";
const PATH = "/xerf/";
const DESCRIPTION =
  "Non-invasive skin tightening and rejuvenation for face and body with Xerf in Las Vegas. Revival Health and Wellness delivers lift, firmness, and glow - without downtime.";

export async function generateMetadata() {
  const fallback = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  images: ["/images/xerf/Xerf-Device-Front-No-arm-plus-logo-on-screen-1.png"],
});
  return cmsPageMetadata(fallback);
}

const KEY_BENEFITS = [
  "Visible lifting and tightening on face, neck, and body",
  "Improved skin tone, texture, and firmness",
  "Reduced fine lines and early wrinkles",
  "Long-term collagen and elastin stimulation",
  "Comfortable sessions - no numbing required",
  "Zero downtime - return to daily life immediately",
];

const TREATMENT_AREAS = [
  {
    title: "Face & Neck",
    text: "Lift and firm the jawline, tighten the neck, and refine facial contours - a non-surgical alternative to a facelift for the right candidate.",
    icon: "sparkles" as const,
  },
  {
    title: "Décolletage & Arms",
    text: "Address sun damage, crepiness, and laxity on the chest and upper arms - zones where skin aging is often the most visible.",
    icon: "target" as const,
  },
  {
    title: "Abdomen & Legs",
    text: "Firm loose skin post-weight-loss or post-pregnancy - pair with body-contouring treatments for compound results.",
    icon: "timer" as const,
  },
];

const FAQS = [
  {
    question: "What is Xerf?",
    answer:
      "Xerf is a non-invasive skin tightening, lifting, and rejuvenation platform used on both the face and body. It stimulates the skin’s own collagen and elastin production to firm, lift, and smooth over time - without incisions, injections, or downtime.",
  },
  {
    question: "What can Xerf treat?",
    answer:
      "Xerf is used for skin laxity and early signs of aging - including a soft jawline, neck crepiness, loose skin on the abdomen or arms, and general loss of firmness. It’s also used to maintain results between more intensive treatments.",
  },
  {
    question: "How many sessions will I need?",
    answer:
      "Most patients see meaningful improvement after a series of 3–6 sessions. Your provider will design a personalized protocol during your consultation based on the treatment area and your goals.",
  },
  {
    question: "Does Xerf hurt?",
    answer:
      "No. Sessions are comfortable - patients typically describe a warm, relaxing sensation. No numbing cream is required and there’s no post-treatment soreness.",
  },
  {
    question: "Is there any downtime?",
    answer:
      "None. Xerf is a lunch-break treatment - you can return to work, exercise, and normal skincare immediately afterward.",
  },
  {
    question: "When will I see results?",
    answer:
      "Some patients notice initial tightening right after their first session, but the real transformation builds gradually over 8–12 weeks as collagen and elastin remodel in the treated area.",
  },
];

/**
 * Full-bleed uncropped image block - two-column layout that renders the source
 * image at its native aspect ratio via `object-contain`, so device shots and
 * before/after photos display in full without any cropping.
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

export default function XerfPage() {
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
              { name: "Skin", path: "/skin/" },
              { name: "Xerf", path: PATH },
            ]),
            faqSchema(FAQS),
          ]),
        }}
      />

      <PageHero
        eyebrow={"Skin · Tightening & Rejuvenation"}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Aesthetics", href: "/aesthetics/" },
          { label: "Skin", href: "/skin/" },
          { label: "Xerf" },
        ]}
        title={
          <>
            <span className="relative inline-block italic text-revival-gold">
              Xerf
              <span
                aria-hidden
                className="absolute -bottom-2 left-0 h-[3px] w-full bg-gradient-to-r from-revival-gold to-transparent"
              />
            </span>{" "}
            skin tightening
          </>
        }
        description="Non-invasive lifting and rejuvenation for face and body - stimulating natural collagen and elastin for firmer, smoother, more radiant skin. No injections. No downtime."
        gallery={[
          "/images/xerf/Xerf-Device-Front-No-arm-plus-logo-on-screen-1.png",
          "/images/xerf/skyns-xerf-half-face-treated-5.webp",
          "/images/xerf/xerf-card.jpg",
        ]}
        compact
      />

      <FullImageBlock
        eyebrow="Introducing Xerf"
        heading="A gentle way to lift, firm, and rejuvenate - face and body"
        paragraphs={[
          "Xerf is a next-generation skin tightening and rejuvenation platform now available at Revival Health and Wellness. It works on both the face and body - addressing skin laxity, early signs of aging, and loss of firmness with a comfortable, non-invasive approach.",
          "Xerf gently heats the deeper layers of the skin to trigger the body’s own repair response. Over the following weeks, new collagen and elastin form in the treated area, resulting in visible lift, tightening, and improved texture.",
        ]}
        image="/images/xerf/Xerf-Device-Front-No-arm-plus-logo-on-screen-1.png"
        imageAlt="Xerf skin tightening device - front view"
        imageWidth={1183}
        imageHeight={1920}
      />

      <FullImageBlock
        tone="cream"
        reverse
        eyebrow="Key Benefits of Xerf"
        heading="Lift, firm, and rejuvenate - without needles or downtime"
        paragraphs={[
          "One versatile platform, calibrated to each treatment zone - face, neck, décolletage, arms, abdomen, and thighs. Every session is comfortable, quick, and downtime-free.",
        ]}
        bullets={KEY_BENEFITS}
        image="/images/xerf/skyns-xerf-half-face-treated-5.webp"
        imageAlt="Xerf skin tightening - half-face treatment result"
        imageWidth={1080}
        imageHeight={1350}
      />

      <PillarsGrid
        eyebrow="Where Xerf Treats"
        heading="From face to body - one versatile platform"
        intro="Xerf handpieces adjust to each treatment zone, letting your provider address skin laxity across a wide range of face and body areas in the same visit."
        pillars={TREATMENT_AREAS}
      />

      {/* Before / After billboard */}
      <section className="relative overflow-clip bg-revival-warm-white py-14 sm:py-20 lg:py-24">
        <span
          aria-hidden
          className="pointer-events-none absolute -left-32 top-16 h-96 w-96 rounded-full bg-revival-gold/10 blur-[140px]"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute -right-32 bottom-16 h-96 w-96 rounded-full bg-revival-gold/10 blur-[140px]"
        />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="text-tagline text-[0.7rem] text-revival-gold">
              REAL RESULTS · BEFORE &amp; AFTER
            </p>
            <h2 className="mt-3 font-heading text-3xl italic text-revival-dark sm:text-4xl lg:text-[2.75rem]">
              Visible lift. Firmer skin. Same body - better.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-base font-light leading-relaxed text-revival-charcoal/80 sm:text-lg">
              Real Revival patients through a series of Xerf sessions - photographed in-clinic, unedited.
            </p>
          </div>
          <div className="mx-auto grid max-w-md grid-cols-1 gap-6 lg:gap-8">
            <figure className="relative overflow-hidden rounded-[1.75rem] border border-revival-gold/20 bg-white shadow-xl">
              <Image
                src="/images/xerf/xerf-before-after.jpg"
                alt="Xerf treatment before and after comparison"
                width={962}
                height={802}
                sizes="(min-width: 768px) 33vw, 100vw"
                className="h-auto w-full object-contain"
              />
              <figcaption className="border-t border-revival-gold/15 bg-revival-warm-white px-4 py-3 text-center text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-revival-charcoal">
                Xerf · Before &amp; After
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <FullImageBlock
        tone="cream"
        eyebrow="How Xerf Works"
        heading="Controlled thermal energy. Natural collagen regeneration."
        paragraphs={[
          "Xerf uses precisely-controlled thermal energy to reach the deeper dermal layers where collagen and elastin live - while keeping the surface of the skin cool and comfortable.",
          "This activates the body’s natural repair response, gradually rebuilding the underlying scaffold that keeps skin looking firm, smooth, and youthful. The result is a lift and glow that looks like your skin, only better.",
        ]}
        image="/images/xerf/B-XERF.jpeg"
        imageAlt="Xerf device console"
        imageWidth={762}
        imageHeight={800}
      />

      <FullImageBlock
        reverse
        eyebrow="Who Xerf is for"
        heading="For patients who want real results - without surgery"
        paragraphs={[
          "Xerf is ideal for patients noticing early or moderate skin laxity - a softening jawline, crepey neck, loose abdominal skin after weight loss or pregnancy, or general loss of firmness on the arms and thighs.",
          "During your complimentary consultation, our medical team will assess your skin, review your goals, and design a customized Xerf protocol - often layered with other treatments for compound results.",
        ]}
        image="/images/xerf/xerf-card.jpg"
        imageAlt="Xerf treatment overview"
        imageWidth={539}
        imageHeight={747}
      />

      <FAQSection
        faqs={FAQS}
        image="/images/xerf/xerf-rf-technology-diagram.jpeg"
        imageAlt="XERF monopolar RF technology diagram showing shallow, middle, and deep tissue penetration"
      />

      <RelatedServices
        items={[
          {
            label: "Everesse RF Skin Tightening",
            href: "/everesse-rf-skin-tightening-and-rejuvenation/",
            blurb:
              "Deeper monopolar RF tightening for the face and body - an excellent pairing with Xerf.",
          },
          {
            label: "Microneedling",
            href: "/microneedling/",
            blurb:
              "Collagen induction through controlled micro-channels - layers beautifully with Xerf for texture and firmness.",
          },
          {
            label: "PDO Thread Lifts",
            href: "/pdo-thread-lifts/",
            blurb:
              "Instant lift plus long-term collagen - combine with Xerf for a comprehensive non-surgical lifting protocol.",
          },
        ]}
      />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-14 lg:px-8">
        <CTABanner
          title="Ready to lift, firm, and rejuvenate?"
          subtitle="Book a complimentary Xerf consultation. Our medical team will assess your goals and design a personalized protocol tailored to you."
        />
      </div>
    </>
  );
}
