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
import BeforeAfterSlider from "@/components/derma-filler/BeforeAfterSlider";
import {
  OverviewBlock,
  PillarsGrid,
  BenefitsList,
  FAQSection,
  RelatedServices,
} from "@/components/templates/HormoneSections";

const TITLE = "Dermal Filler Treatments";
const PATH = "/derma-filler/";
const DESCRIPTION =
  "Restore volume and enhance your features with dermal filler treatments in Las Vegas. Revival Health and Wellness offers Juvéderm® and the Galderma Restylane® collection.";

export async function generateMetadata() {
  const fallback = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  images: ["/images/derma-filler/dermal-fillers.jpeg"],
});
  return cmsPageMetadata(fallback);
}

const COMMON_AREAS = [
  "Softening fine lines and facial creases",
  "Brightening under-eye hollows",
  "Restoring fullness to lips",
  "Smoothing nasolabial folds (smile lines)",
  "Refining vertical “lipstick lines”",
  "Softening marionette lines (mouth-to-chin lines)",
  "Defining the jawline and chin",
  "Restoring volume to cheeks",
  "Enhancing and contouring cheekbones",
];

const WHY = [
  "Master Injector Expertise - Treatments performed by highly skilled and experienced injectors with an artistic eye for natural results.",
  "Personalized Enhancements - Every treatment plan is customized to your unique features, ensuring balance, beauty, and confidence.",
  "Subtle, Natural Results - We focus on refreshing your look, not changing it - leaving you looking youthful, radiant, and authentically you.",
  "Luxury Experience - Enjoy a modern, comfortable, spa-like atmosphere with top-tier care from start to finish.",
  "Advanced Techniques & Premium Products - We use only trusted brands and the latest methods to achieve safe, beautiful, long-lasting results.",
  "Trusted by Our Community - Patients choose us for our reputation, compassion, and consistent results.",
];

const CANDIDATES = [
  "Want to reduce lines, creases, and wrinkles on the face and neck",
  "Are over the age of 18",
  "Do not have an allergy to dermal filler",
  "Are not pregnant or breastfeeding",
  "Are free of any skin infections",
  "Do not have a neurological condition",
];

const JUVEDERM = [
  {
    title: "Juvéderm Ultra",
    text: "Used for lip plumping, mild wrinkles, and moderate volume. Juvéderm Ultra is the gold standard for lip plumping that looks natural. Results usually last 6 to 9 months.",
    icon: "droplet" as const,
  },
  {
    title: "Juvéderm Voluma",
    text: "Used for cheeks and chin. The first and only FDA-approved dermal filler designed specifically to improve sunken facial skin and add volume to the mid-face, enhance a weak chin, and sculpt the cheeks. Made of the thickest and most effective gel from the Juvéderm line - subtle yet natural enhancement that can last up to two years.",
    icon: "target" as const,
  },
  {
    title: "Juvéderm Ultra Plus XC",
    text: "Used for moderate facial lines and jaw contouring. Made of a thicker gel than Juvéderm Ultra, Ultra Plus is more effective for deeper wrinkles. It also provides volume for the cheeks or jaw. Results usually last 9 to 12 months.",
    icon: "sparkles" as const,
  },
  {
    title: "Juvéderm Vollure",
    text: "Used for under the eyes, marionette lines, and nasolabial folds. Vollure’s gel thickness is right in between Voluma and Volbella - the “medium thick gel” of the family. Used mostly to treat marionette lines and nasolabial folds at the mouth. Results typically last up to 18 months.",
    icon: "smile" as const,
  },
  {
    title: "Juvéderm Volbella",
    text: "Used for fine lines, under the eyes, and lip contouring. While Voluma is the thickest gel, Volbella is made with the thinnest gel - perfect for improving smaller, more superficial lines. Volbella can also contour the lips in a very soft, subtle, natural way. Results typically last up to 18 months.",
    icon: "leaf" as const,
  },
];

const GALDERMA_TREATMENTS = [
  "Lip augmentation with Restylane® Kysse - soft, flexible, kissable lips",
  "Smile Line Treatment (Nasolabial Folds) - with Restylane® Refyne or Defyne",
  "Cheek & Midface Lift - with Restylane® Contour or Lyft",
  "Chin & Jawline Sculpting - for improved profile and definition",
  "Fine Lines & Tear Troughs - subtle smoothing for a refreshed look",
];

const BEFORE_AFTERS = [
  "/images/derma-filler/Lip-Filler-Before-and-After-6-.jpg",
  "/images/derma-filler/Lip-Filler-Before-and-After-7.jpg",
  "/images/derma-filler/Lip-Filler-Before-and-After-4.jpg",
  "/images/derma-filler/Sanaz-Lips.jpg",
  "/images/derma-filler/Daesja-Lips.jpg",
  "/images/derma-filler/Untitled-design-4.jpg",
  "/images/derma-filler/60678B3C-0C78-44BA-A6B0-1E327763833A.jpeg",
  "/images/derma-filler/Untitled-design-2.jpg",
  "/images/derma-filler/Untitled-design-1.jpg",
];

const FAQS = [
  {
    question: "What are dermal fillers?",
    answer:
      "Dermal fillers are an impressive way to rejuvenate a youthful appearance with immediate results. They can help smoothen out wrinkles, add volume, and enhance the shape of your cheeks. Our professional team only uses the safe and most effective fillers to achieve natural, beautiful results without looking overdone.",
  },
  {
    question: "Which areas can be treated?",
    answer:
      "Common areas include softening fine lines and facial creases, brightening under-eye hollows, restoring fullness to lips, smoothing nasolabial folds, refining vertical “lipstick lines,” softening marionette lines, defining the jawline and chin, restoring volume to cheeks, and enhancing/contouring cheekbones.",
  },
  {
    question: "What is the difference between Juvéderm and Restylane®?",
    answer:
      "Both are hyaluronic-acid based dermal filler families used for facial contouring and volume. Juvéderm (from Allergan) offers a range of gel thicknesses from Voluma (thickest) to Volbella (thinnest) with results lasting 6–24 months. The Restylane® collection from Galderma uses unique cross-linking technology for flexibility and support that moves seamlessly with your facial expressions.",
  },
  {
    question: "Who is a good candidate for dermal filler?",
    answer:
      "The best candidates want to reduce lines, creases, and wrinkles on the face and neck; are over 18; do not have an allergy to dermal filler; are not pregnant or breastfeeding; are free of skin infections; and do not have a neurological condition.",
  },
  {
    question: "What is Restylane® Kysse?",
    answer:
      "For those seeking fuller, natural-looking lips, Restylane® Kysse is the ultimate solution. It enhances lip volume and smooths out fine lines around the mouth while maintaining a soft, kissable feel. Results last up to a year with the perfect balance between volume, definition, and a naturally youthful appearance.",
  },
];

export default function DermaFillerPage() {
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
              { name: "Derma Filler", path: PATH },
            ]),
            faqSchema(FAQS),
          ]),
        }}
      />

      <PageHero
        eyebrow={"Aesthetics · Dermal Fillers"}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Aesthetics", href: "/aesthetics/" },
          { label: "Dermal Fillers" },
        ]}
        title={
          <>
            Revive your beauty with{" "}
            <span className="relative inline-block italic text-revival-gold">
              Derma Fillers
              <span
                aria-hidden
                className="absolute -bottom-2 left-0 h-[3px] w-full bg-gradient-to-r from-revival-gold to-transparent"
              />
            </span>
          </>
        }
        description={"Sculpt. Plump. Restore - with precision. Natural-looking facial rejuvenation using Juvéderm® and the Galderma Restylane® collection."}
        gallery={[
          "/images/derma-filler/derma-filler-1.jpg",
          "/images/derma-filler/derma-filler-1.webp",
          "/images/derma-filler/derma-filler-2.jpeg",
        ]}
        compact
      />

      <section className="relative overflow-clip bg-revival-warm-white py-14 sm:py-20 lg:py-28">
        <span
          aria-hidden
          className="pointer-events-none absolute -left-32 top-16 h-96 w-96 rounded-full bg-revival-gold/10 blur-[140px]"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute -right-32 bottom-16 h-96 w-96 rounded-full bg-revival-gold/10 blur-[140px]"
        />
        <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,560px)_minmax(0,1fr)] lg:gap-16 lg:px-8">
          {/* Left: interactive before/after slider inside a decorative frame */}
          <div className="relative mx-auto w-full max-w-[540px] lg:mx-0">
            {/* Rotating dashed accent */}
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-5 rounded-[2rem] border border-dashed border-revival-gold/25"
            />
            {/* Gold gradient frame */}
            <div className="relative overflow-hidden rounded-[1.85rem] bg-gradient-to-br from-revival-gold via-revival-gold/40 to-transparent p-[1.5px] shadow-[0_30px_70px_-25px_rgba(0,0,0,0.25)]">
              <div className="rounded-[1.7rem] bg-revival-warm-white p-2">
                <BeforeAfterSlider />
              </div>
            </div>
            <p className="mt-5 text-center text-[0.65rem] uppercase tracking-[0.15em] text-revival-gold/80">
              Drag the handle to reveal · real Revival patient
            </p>
          </div>

          {/* Right: copy */}
          <div className="max-w-xl lg:max-w-none">
            <div className="mb-6 inline-flex items-center gap-3 text-tagline text-xs text-revival-gold">
              <span className="h-px w-8 bg-revival-gold/50" />
              Juvéderm® Dermal Fillers at Revival
              <span className="h-px w-8 bg-revival-gold/50" />
            </div>
            <h2
              className="font-heading font-medium leading-[1.1] text-revival-dark"
              style={{ fontSize: "clamp(2rem, 3.6vw, 3rem)" }}
            >
              Sculpt. Plump. Restore —{" "}
              <span className="italic text-revival-gold">with precision.</span>
            </h2>
            <div className="mt-8 space-y-6">
              <p className="relative border-l-2 border-revival-gold/40 pl-5 text-lg font-light leading-[1.7] text-revival-charcoal/90 sm:text-xl sm:leading-[1.65]">
                At Revival Health and Wellness, we specialize in natural-looking
                facial rejuvenation using Juvéderm®, one of the most trusted
                names in hyaluronic acid (HA) dermal fillers.
              </p>
              <p className="text-base font-light leading-relaxed text-revival-charcoal/80 sm:text-lg">
                Whether you&rsquo;re looking to restore lost volume, define your
                features, or smooth away fine lines, Juvéderm offers a
                customizable solution tailored to your unique beauty. Our expert
                providers assess your skin, facial anatomy, and aesthetic goals
                to design a fully personalized plan.
              </p>
            </div>
          </div>
        </div>
      </section>

      <BenefitsList
        eyebrow={"Where Juvéderm® shines"}
        heading="Common areas we treat"
        items={COMMON_AREAS}
        image="/images/derma-filler/derma-filler-1.webp"
        imageAspect="square"
        imageContain
      />

      <PillarsGrid
        tone="cream"
        eyebrow={"Juvéderm Solutions We Offer"}
        heading="Five formulations. One personalized plan."
        intro={"Each Juvéderm gel is engineered for a specific area - from delicate lip contours to sculpted cheekbones."}
        pillars={JUVEDERM}
      />

      <BenefitsList
        eyebrow="Why choose Revival for Dermal Fillers?"
        heading="Master injectors. Natural results. Luxury experience."
        items={WHY}
        image="/images/derma-filler/man-in-need-of-dermal-fillers.jpeg"
        imageAspect="landscape"
      />

      <BenefitsList
        eyebrow="Good candidates for Dermal Filler"
        heading="The best candidates for derma filler..."
        items={CANDIDATES}
      />

      <OverviewBlock
        section={{
          eyebrow: "Restylane®: Sculpt, Define, Perfect",
          heading: "Timeless beauty with the Restylane® collection",
          paragraphs: [
            "Achieve timeless beauty with the Restylane® collection of dermal fillers. From adding subtle volume to lips and cheeks to restoring contours lost to aging, Restylane’s hyaluronic acid-based formulas are designed to enhance your features while maintaining natural expression.",
            "Whether it’s defining your jawline, filling in smile lines, or adding soft volume to hollowed areas, Restylane delivers results that are both refined and lasting - elevating your beauty with each injection.",
          ],
          image: "/images/derma-filler/derma-filler-2.jpeg",
          imageAspect: "portrait",
          imageContain: true,
        }}
      />

      <BenefitsList
        eyebrow="Popular Galderma Treatments"
        heading={"Lift. Define. Refresh - your way."}
        items={GALDERMA_TREATMENTS}
      />

      <OverviewBlock
        tone="cream"
        reverse
        section={{
          eyebrow: "Elevate your confidence with Galderma Fillers",
          heading:
            "Restylane® Kysse: the perfectly kissable lips",
          paragraphs: [
            "For those seeking fuller, natural-looking lips, Restylane® Kysse is the ultimate solution. This advanced filler is designed to enhance lip volume and smooth out fine lines around the mouth, all while maintaining a soft, kissable feel. With results that last up to a year, Restylane Kysse provides the perfect balance between volume, definition, and a naturally youthful appearance.",
            "At Revival Health and Wellness, we believe in the transformative power of personalized aesthetic treatments. The Galderma line offers a range of carefully crafted solutions to meet your unique needs, whether you’re enhancing your features or restoring your youthful glow. Our expert providers are committed to delivering exceptional results that reflect your true beauty - effortlessly and elegantly.",
          ],
        }}
      />

      {/* Before & After gallery - 9 patient outcomes */}
      <section className="relative bg-revival-warm-white py-14 sm:py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-gradient-to-r from-transparent via-revival-gold to-revival-gold/60 sm:w-12" />
              <span className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-revival-gold sm:text-xs">
                Before & After Patient Outcomes
              </span>
              <span className="h-px w-8 bg-gradient-to-l from-transparent via-revival-gold to-revival-gold/60 sm:w-12" />
            </div>
            <h2
              className="font-heading font-light leading-[1.05] text-revival-dark"
              style={{
                fontSize: "clamp(2rem, 3.6vw, 3.15rem)",
                letterSpacing: "-0.01em",
              }}
            >
              Real results, refined and unmistakably you
            </h2>
          </div>

          <div className="mt-14 grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:gap-6">
            {BEFORE_AFTERS.map((src, i) => (
              <figure
                key={src}
                className="group relative aspect-square overflow-hidden rounded-2xl border border-revival-gold/15 bg-white shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_60px_-20px_rgba(15,15,15,0.3)]"
              >
                <Image
                  src={src}
                  alt={`Derma filler patient before-and-after result ${i + 1}`}
                  fill
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 33vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
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
            label: "Botox",
            href: "/botox/",
            blurb:
              "Smooth dynamic wrinkles - pairs beautifully with volume-restoring dermal fillers.",
          },
          {
            label: "Sculptra®",
            href: "/sculptra/",
            blurb:
              "Collagen-stimulating biostimulator for gradual, natural volume restoration.",
          },
          {
            label: "Kybella®",
            href: "/kybella/",
            blurb:
              "Non-surgical fix for a double chin - sculpt your jawline for a refined profile.",
          },
        ]}
      />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-14 lg:px-8">
        <CTABanner
          title="Ready to embrace a vibrant, youthful glow?"
          subtitle="Book your consultation today and experience elevated aesthetics in a luxury, medically supervised setting."
        />
      </div>
    </>
  );
}
