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
import DysportEffectiveSection from "@/components/dysport/DysportEffectiveSection";
import {
  OverviewBlock,
  BenefitsList,
  FAQSection,
  RelatedServices,
} from "@/components/templates/HormoneSections";

const TITLE = "Dysport® Injections for Frown Lines";
const PATH = "/dysport/";
const DESCRIPTION =
  "Soften frown lines between the eyebrows with Dysport® in Las Vegas. Revival Health and Wellness provides fast-acting treatments for a more relaxed look.";

export async function generateMetadata() {
  const fallback = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  images: ["/images/dysport/What_is_Dysport-e1756242860848.webp"],
});
  return cmsPageMetadata(fallback);
}

const TREATS = [
  "Frown lines (the “11s” between your brows)",
  "Forehead creases",
  "Crow’s feet (fine lines around the eyes)",
  "Bunny lines on the nose",
];

const WHY = [
  "Licensed, experienced master injectors",
  "Honest consultations - no pressure, just options",
  "Holistic, individualized treatment plans to enhance your natural beauty",
  "A clean, modern, and luxury care environment",
  "Proven results, personalized care",
];

const FAQS = [
  {
    question: "What is Dysport?",
    answer:
      "Dysport is an FDA-approved injectable that temporarily relaxes targeted facial muscles to reduce the appearance of dynamic wrinkles - those lines formed by repeated facial expressions such as frowning, squinting, and smiling. It’s especially effective for frown lines (the “11s” between your brows), forehead creases, crow’s feet, and bunny lines on the nose.",
  },
  {
    question: "How quickly does Dysport work?",
    answer:
      "Dysport offers faster results than some other neurotoxins, with most patients seeing noticeable smoothing in as little as 2–3 days, and results lasting up to 4 months.",
  },
  {
    question: "How is Dysport different from Botox?",
    answer:
      "Both are FDA-approved neurotoxins that relax targeted facial muscles to soften dynamic wrinkles. Dysport tends to spread slightly more across a treated area, which can be ideal for larger zones like the forehead, and often takes effect a little faster than Botox.",
  },
  {
    question: "What other Galderma treatments do you offer?",
    answer:
      "At Revival Health and Wellness, we proudly offer the full suite of Galderma’s premium aesthetic treatments - crafted to refine, restore, and enhance your natural beauty. From the smooth, expressive results of Dysport® to the contouring precision of the Restylane® dermal filler family, each product in the Galderma portfolio is backed by science and designed with elegance in mind.",
  },
];

export default function DysportPage() {
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
              { name: "Dysport", path: PATH },
            ]),
            faqSchema(FAQS),
          ]),
        }}
      />

      <PageHero
        eyebrow={"Aesthetics · Dysport®"}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Aesthetics", href: "/aesthetics/" },
          { label: "Dysport®" },
        ]}
        title={
          <>
            FDA-approved{" "}
            <span className="relative inline-block italic text-revival-gold">
              Dysport
              <span
                aria-hidden
                className="absolute -bottom-2 left-0 h-[3px] w-full bg-gradient-to-r from-revival-gold to-transparent"
              />
            </span>
            : erase wrinkles at Revival
          </>
        }
        description={"Soften fine lines and wrinkles - especially those stubborn frown lines between the brows - without freezing your natural expressions."}
        gallery={[
          "/images/dysport/What_is_Dysport-e1756242860848.webp",
          "/images/dysport/dreamstime_m_272223673-e1682172557797.webp",
        ]}
        compact
      />

      <OverviewBlock
        section={{
          eyebrow: "About Dysport",
          heading:
            "Erase wrinkles - without freezing your natural expressions",
          paragraphs: [
            "At Revival Health and Wellness, we offer Dysport® treatments to help soften fine lines and wrinkles - especially those stubborn frown lines between the brows - without freezing your natural expressions.",
            "Dysport is a fast-acting, FDA-approved injectable that works by relaxing targeted muscles, creating a smoother, more refreshed appearance. With minimal downtime and results that can last up to 4 months, Dysport is a popular choice for clients looking to maintain a youthful, confident look. Let our experienced providers help you achieve natural-looking rejuvenation tailored to your unique features.",
          ],
          image: "/images/dysport/What_is_Dysport-e1756242860848.webp",
        }}
      />

      <DysportEffectiveSection
        image="/images/dysport/dreamstime_m_272223673-e1682172557797.webp"
        zones={TREATS}
      />

      <OverviewBlock
        tone="cream"
        section={{
          eyebrow: "The Galderma Aesthetic Collection",
          heading: "Elevate your beauty with the full portfolio",
          paragraphs: [
            "At Revival Health and Wellness, we proudly offer the full suite of Galderma’s premium aesthetic treatments - crafted to refine, restore, and enhance your natural beauty. From the smooth, expressive results of Dysport® to the contouring precision of the Restylane® dermal filler family, each product in the Galderma portfolio is backed by science and designed with elegance in mind.",
            "Whether you’re seeking subtle volume, sculpted definition, or skin that simply glows, our expert providers tailor each treatment to your individual aesthetic - ensuring results that are artfully balanced and beautifully you. Discover the gold standard in modern rejuvenation, because you deserve nothing less.",
          ],
        }}
      />

      <BenefitsList
        eyebrow="Why choose Revival Health & Wellness for Dysport?"
        heading="Medical precision. Aesthetic eye."
        items={WHY}
      />

      <FAQSection faqs={FAQS} />

      <RelatedServices
        items={[
          {
            label: "Botox",
            href: "/botox/",
            blurb:
              "The classic FDA-approved neurotoxin for smoothing fine lines and wrinkles.",
          },
          {
            label: "Derma Filler",
            href: "/derma-filler/",
            blurb:
              "Restore volume and contour with the Restylane® family and other premium fillers.",
          },
          {
            label: "Xeomin",
            href: "/xeomin/",
            blurb:
              "A uniquely purified neurotoxin option - another way to soften dynamic wrinkles.",
          },
        ]}
      />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-14 lg:px-8">
        <CTABanner
          title="Confident, radiant, and beautifully you."
          subtitle="Book a free consultation. Our expert injectors will design a Dysport plan tailored to your features."
        />
      </div>
    </>
  );
}
