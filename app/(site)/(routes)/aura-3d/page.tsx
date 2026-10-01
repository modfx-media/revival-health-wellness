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

const TITLE = "Aura 3D Facial Imaging";
const PATH = "/aura-3d/";
const DESCRIPTION =
  "Swiss-made Aura 3D facial imaging at Revival Health and Wellness in Las Vegas. AI-powered 3D facial modeling for precision treatment planning and objective progress tracking.";

export async function generateMetadata() {
  const fallback = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  images: ["/images/aura-3d/aura-3d-banner.webp"],
});
  return cmsPageMetadata(fallback);
}

const CAPABILITIES = [
  {
    title: "100+ Photos. 10 Seconds.",
    text: "A single capture session takes just ten seconds and produces over one hundred synchronized images - more data than any hand-held camera can gather in a full appointment.",
    icon: "timer" as const,
  },
  {
    title: "True 3D Facial Model",
    text: "Those images are assembled by AI into a photo-real 3D model of your face - with millimeter-level accuracy your provider can rotate, measure, and analyze.",
    icon: "sparkles" as const,
  },
  {
    title: "Objective Progress Tracking",
    text: "Because every visit is captured against the same 3D baseline, you and your provider can see the exact millimeter changes your treatments deliver - no more guessing from selfies.",
    icon: "target" as const,
  },
];

const USE_CASES = [
  "Personalized filler and injectable treatment planning",
  "Before-and-after comparisons with true 3D accuracy",
  "Facial symmetry analysis and volume mapping",
  "Skin-quality assessment (pores, pigmentation, redness)",
  "Long-term tracking of aging, weight change, and treatment progress",
  "Objective, data-driven consultations you can trust",
];

const FAQS = [
  {
    question: "What is Aura 3D?",
    answer:
      "Aura 3D is a Swiss-made AI-powered facial imaging camera that captures more than one hundred photographs of your face in about ten seconds. Those photos are assembled by artificial intelligence into a high-resolution 3D model of your face - the foundation for precision aesthetic planning and objective progress tracking.",
  },
  {
    question: "Why does 3D imaging matter?",
    answer:
      "Traditional 2D before-and-after photos are affected by lighting, angle, and pose. A 3D model captures your true facial geometry in three dimensions - so you and your provider can see and measure the actual changes your treatments produce, from any angle, at any time.",
  },
  {
    question: "How does it change my consultation?",
    answer:
      "During your consultation, your provider can rotate and analyze the 3D model of your face on-screen with you - mapping volume, symmetry, and areas of concern together. Treatment plans built from a 3D model are more precise, more personalized, and easier to visualize before you commit.",
  },
  {
    question: "Is the capture uncomfortable?",
    answer:
      "Not at all. You sit still for approximately ten seconds while the camera captures the images. There’s no bright light, no discomfort, and no preparation required.",
  },
  {
    question: "Do you keep my facial data?",
    answer:
      "Your 3D imaging data is stored securely and used exclusively for your treatment planning and progress tracking. We never share it externally, and you can request removal at any time.",
  },
];

/**
 * Full-bleed uncropped image block - a two-column layout where the image
 * side renders the source at its native aspect ratio using `object-contain`.
 * Used on this page instead of `OverviewBlock` so the Aura 3D device shots
 * display in full without any cropping.
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
      <div
        className={`relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-8`}
      >
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

export default function Aura3DPage() {
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
              { name: "Aura 3D", path: PATH },
            ]),
            faqSchema(FAQS),
          ]),
        }}
      />

      <PageHero
        eyebrow={"Aesthetics · 3D Facial Imaging"}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Aesthetics", href: "/aesthetics/" },
          { label: "Aura 3D" },
        ]}
        title={
          <>
            <span className="relative inline-block italic text-revival-gold">
              Aura 3D
              <span
                aria-hidden
                className="absolute -bottom-2 left-0 h-[3px] w-full bg-gradient-to-r from-revival-gold to-transparent"
              />
            </span>{" "}
            facial imaging
          </>
        }
        description="Swiss-made. AI-powered. 100+ photos in 10 seconds - assembled into a millimeter-accurate 3D model of your face. The most objective way to plan aesthetic treatments and track your progress over time."
        gallery={[
          "/images/aura-3d/aura-3d-banner.webp",
          "/images/aura-3d/aura-3d-1.webp",
          "/images/aura-3d/aura-3d-2.jpg",
        ]}
        compact
      />

      <FullImageBlock
        eyebrow="Introducing Aura 3D"
        heading="Aesthetic planning - now backed by real 3D data"
        paragraphs={[
          "Aura 3D is a Swiss-engineered facial imaging system that combines a high-resolution multi-camera array with AI-powered reconstruction to build a true 3D model of your face in about ten seconds.",
          "For your provider, it means precision treatment planning grounded in actual facial geometry. For you, it means seeing objective, millimeter-accurate before-and-after comparisons at every visit - not just camera-angle-flattering selfies.",
        ]}
        image="/images/aura-3d/aura-3d-1.webp"
        imageAlt="Aura 3D facial imaging camera"
        imageWidth={826}
        imageHeight={718}
      />

      {/* YouTube video showcase */}
      <section className="relative overflow-clip bg-revival-cream py-14 sm:py-20 lg:py-28">
        <span
          aria-hidden
          className="pointer-events-none absolute -left-32 top-16 h-96 w-96 rounded-full bg-revival-gold/15 blur-[140px]"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute -right-32 bottom-16 h-96 w-96 rounded-full bg-revival-gold/10 blur-[140px]"
        />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <p className="text-tagline text-[0.7rem] text-revival-gold">
              SEE IT IN ACTION
            </p>
            <h2 className="mt-3 font-heading text-3xl italic text-revival-dark sm:text-4xl lg:text-[2.75rem]">
              Watch how Aura 3D captures your face
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base font-light text-revival-charcoal/75">
              A 10-second scan, over 100 synchronized photographs, and a
              millimeter-accurate 3D model - all rendered in real time.
            </p>
          </div>
          <div className="relative overflow-hidden rounded-[2rem] border border-revival-gold/25 bg-black shadow-[0_50px_120px_-32px_rgba(201,169,110,0.35)]">
            <div className="relative pt-[56.25%]">
              <video
                src="/videos/aura-3d.mp4"
                poster="/images/aura-3d/aura-3d-poster.png"
                controls
                playsInline
                preload="metadata"
                className="absolute inset-0 h-full w-full object-cover"
              >
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </section>

      {/* Dark stat billboard */}
      <section className="relative overflow-clip bg-revival-dark py-20 text-revival-warm-white lg:py-24">
        <span
          aria-hidden
          className="pointer-events-none absolute -left-32 top-16 h-96 w-96 rounded-full bg-revival-gold/20 blur-[140px]"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute -right-32 bottom-16 h-96 w-96 rounded-full bg-revival-gold/10 blur-[140px]"
        />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center">
            <p className="text-tagline text-[0.7rem] text-revival-gold">
              WHY IT MATTERS
            </p>
            <h2 className="mt-3 font-heading text-3xl italic text-revival-warm-white sm:text-4xl lg:text-[2.75rem]">
              The numbers behind Aura 3D
            </h2>
          </div>
          <dl className="grid gap-px overflow-hidden rounded-3xl bg-revival-gold/20 sm:grid-cols-3">
            <div className="bg-revival-dark px-8 py-14 text-center">
              <dt className="font-heading text-6xl text-revival-gold tracking-[-0.03em] sm:text-7xl lg:text-[5.5rem]">
                100+
              </dt>
              <dd className="mt-4 text-sm font-semibold uppercase tracking-[0.16em] text-revival-warm-white">
                Photos per capture
              </dd>
            </div>
            <div className="bg-revival-dark px-8 py-14 text-center">
              <dt className="font-heading text-6xl text-revival-gold tracking-[-0.03em] sm:text-7xl lg:text-[5.5rem]">
                10s
              </dt>
              <dd className="mt-4 text-sm font-semibold uppercase tracking-[0.16em] text-revival-warm-white">
                Total scan time
              </dd>
            </div>
            <div className="bg-revival-dark px-8 py-14 text-center">
              <dt className="font-heading text-6xl text-revival-gold tracking-[-0.03em] sm:text-7xl lg:text-[5.5rem]">
                3D
              </dt>
              <dd className="mt-4 text-sm font-semibold uppercase tracking-[0.16em] text-revival-warm-white">
                Millimeter-accurate model
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <PillarsGrid
        eyebrow="What Aura 3D Delivers"
        heading="Precision imaging - in three parts"
        intro="From capture to model to comparison, every step is engineered for objectivity, precision, and clarity."
        pillars={CAPABILITIES}
      />

      <FullImageBlock
        tone="cream"
        reverse
        eyebrow="How We Use It"
        heading="Better consultations. Personalized plans. Honest results."
        paragraphs={[
          "Every consultation at Revival Health and Wellness now begins with an Aura 3D scan - giving your provider an unprecedented level of insight into your facial anatomy before recommending any treatment.",
          "At every follow-up, we re-scan and compare against your baseline model so you can see the exact changes your treatments have produced - volume restored, symmetry improved, skin quality enhanced.",
        ]}
        bullets={USE_CASES}
        image="/images/aura-3d/aura-3d-3.jpg"
        imageAlt="Aura 3D device in use during a consultation"
        imageWidth={723}
        imageHeight={720}
      />

      <FullImageBlock
        eyebrow="Who Aura 3D is for"
        heading="Anyone considering aesthetic care - or committed to it"
        paragraphs={[
          "Aura 3D is included complimentary with every aesthetic consultation at Revival Health and Wellness. Whether you’re exploring your first Botox or filler treatment or you’re a longtime patient tracking your journey over years, the 3D model gives you the same objective view your provider works from.",
          "Ask about Aura 3D at your next visit - or book a consultation to see it in action.",
        ]}
        image="/images/aura-3d/aura-3d-4.png"
        imageAlt="Aura 3D 3D facial model visualization"
        imageWidth={2000}
        imageHeight={1600}
      />

      <FAQSection faqs={FAQS} />

      <RelatedServices
        items={[
          {
            label: "Derma Filler",
            href: "/derma-filler/",
            blurb:
              "Precision filler treatments - planned with 3D facial mapping for the most natural, personalized results.",
          },
          {
            label: "Botox",
            href: "/botox/",
            blurb:
              "Neurotoxin treatments guided by objective 3D data - for symmetry, precision, and predictable outcomes.",
          },
          {
            label: "Aesthetics Overview",
            href: "/aesthetics/",
            blurb:
              "Every aesthetic treatment at Revival Health and Wellness now starts with an Aura 3D scan.",
          },
        ]}
      />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-14 lg:px-8">
        <CTABanner
          title="See your face in three dimensions"
          subtitle="Book a complimentary consultation - every appointment now includes an Aura 3D scan for precision planning and objective progress tracking."
        />
      </div>
    </>
  );
}
