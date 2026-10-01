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

const TITLE = "Botox Injections for Wrinkles";
const PATH = "/botox/";
const DESCRIPTION =
  "Smooth away fine lines and wrinkles with Botox in Las Vegas. Revival Health and Wellness offers professional injections for a refreshed and youthful appearance.";

export async function generateMetadata() {
  const fallback = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  images: ["/images/botox/botox_injections_750-e1756236969540.webp"],
});
  return cmsPageMetadata(fallback);
}

const KEY_BENEFITS = [
  "Quick treatment time: Typically takes less than 15 minutes.",
  "Easy integration: Can be seamlessly incorporated into your regular skincare routine.",
  "Preventative benefits: Regular treatments can help prevent new wrinkles from forming.",
  "Low risk: Very few associated risks.",
  "Targeted improvement: Effectively improves the appearance of crow’s feet, lines between the brows, frown lines, forehead creases, and other wrinkles.",
  "Non-surgical: A minimally invasive, non-surgical option.",
  "Immediate results: Noticeable improvement after just one treatment.",
];

const CANDIDATES = [
  "Want to reduce lines, creases, and wrinkles on the face and neck",
  "Are over the age of 18",
  "Do not have an allergy to Botox",
  "Are not pregnant or breastfeeding",
  "Are free of any skin infections",
  "Do not have a neurological condition",
];

const FAQS = [
  {
    question: "What is Botox and how does it work?",
    answer:
      "Botox works by temporarily blocking the nerve signals that cause facial muscles to contract when we make expressions. This relaxation of the muscles leads to a significant reduction in the visibility of wrinkles. While the muscles are temporarily “frozen,” you’ll still be able to make natural facial expressions, provided you choose a skilled and experienced provider to administer the injections.",
  },
  {
    question: "How long does a Botox treatment take?",
    answer:
      "A typical Botox treatment takes about 15 minutes and requires no downtime, making it a convenient option for many. To ensure the best results, we will ask you to stop taking any blood thinners a week before your appointment. On the day of your treatment, we will cleanse your face and, if necessary, apply a topical numbing cream for your comfort. One of our licensed medical professionals will then administer the Botox using a very small needle. These injections will be carefully placed in the precise areas needed to address your specific concerns and achieve optimal results.",
  },
  {
    question: "When will I see results and how long do they last?",
    answer:
      "You can expect to start seeing the effects of Botox about three days after your appointment. The duration of Botox results can vary depending on factors like muscle strength and the depth of your lines and wrinkles. On average, Botox results last between 3 to 5 months. For optimal results, we recommend scheduling Botox treatments every 3 to 4 months.",
  },
  {
    question: "What should I avoid after my Botox treatment?",
    answer:
      "After your Botox treatment, some patients may experience minimal bruising, tenderness, or swelling at the injection site, but these effects typically subside quickly. In the week following your treatment, it’s important to avoid rubbing your face, sleeping on your face, high-intensity exercise, tanning, bending over, saunas, and hot water. You should also be cautious when applying makeup.",
  },
  {
    question: "Am I a good candidate for Botox?",
    answer:
      "Botox is one of our most requested treatments, and during your consultation, we can discuss how it can effectively improve the areas that concern you. The best candidates want to reduce lines, creases, and wrinkles on the face and neck; are over 18; do not have an allergy to Botox; are not pregnant or breastfeeding; are free of skin infections; and do not have a neurological condition.",
  },
];

export default function BotoxPage() {
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
              { name: "Botox", path: PATH },
            ]),
            faqSchema(FAQS),
          ]),
        }}
      />

      <PageHero
        eyebrow={"Aesthetics · Botox"}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Aesthetics", href: "/aesthetics/" },
          { label: "Botox" },
        ]}
        title={
          <>
            Transform your appearance with{" "}
            <span className="relative inline-block italic text-revival-gold">
              Botox
              <span
                aria-hidden
                className="absolute -bottom-2 left-0 h-[3px] w-full bg-gradient-to-r from-revival-gold to-transparent"
              />
            </span>
            : reveal a youthful you
          </>
        }
        description="Botox is one of the most popular and effective non-surgical anti-aging treatments worldwide, offering both convenience and renewed confidence. If you’re considering Botox treatments, Revival Health and Wellness is here to help you achieve your desired results."
        gallery={[
          "/images/botox/botox_injections_750-e1756236969540.webp",
          "/images/botox/Luxury-Living-in-Dubai-South-8-e1756238774520.png",
        ]}
        compact
      />

      <OverviewBlock
        section={{
          eyebrow: "What is Botox?",
          heading:
            "When lines and wrinkles appear, Botox works beneath the skin",
          paragraphs: [
            "When lines and wrinkles start to appear on your face, it’s a clear sign that age is beginning to take its toll. Botox has become incredibly popular because it effectively reduces the appearance of lines, wrinkles, and creases, while also preventing new ones from forming.",
            "By working beneath the skin, Botox targets the source of your wrinkles, minimizing muscle activity to smooth and rejuvenate your skin. Even the most subtle changes can have a dramatic impact on how you look and feel.",
          ],
          image: "/images/botox/botox_injections_750-e1756236969540.webp",
          imageAspect: "square",
          imageContain: true,
        }}
      />

      <OverviewBlock
        tone="cream"
        reverse
        section={{
          eyebrow: "Understanding Botox",
          heading: "A comprehensive overview of its use and benefits",
          paragraphs: [
            "Botox works by temporarily blocking the nerve signals that cause facial muscles to contract when we make expressions. This relaxation of the muscles leads to a significant reduction in the visibility of wrinkles. While the muscles are temporarily “frozen,” you’ll still be able to make natural facial expressions, provided you choose a skilled and experienced provider to administer the injections.",
            "It’s essential to select a medical professional who thoroughly understands the anatomy of the human face, the underlying facial muscles, the appropriate dosage for each area, and the precise technique for administering Botox. This ensures both effective results and the preservation of your natural expressions.",
          ],
          image: "/images/botox/botox-overview-2.avif",
          imageAspect: "landscape",
          imageContain: true,
        }}
      />

      <BenefitsList
        eyebrow="Key benefits of Botox"
        heading="Why patients choose Botox"
        items={KEY_BENEFITS}
      />

      <OverviewBlock
        section={{
          eyebrow: "Botox treatment details",
          heading: "About 15 minutes. No downtime.",
          paragraphs: [
            "A typical Botox treatment takes about 15 minutes and requires no downtime, making it a convenient option for many. To ensure the best results, we will ask you to stop taking any blood thinners a week before your appointment.",
            "On the day of your treatment, we will cleanse your face and, if necessary, apply a topical numbing cream for your comfort. One of our licensed medical professionals will then administer the Botox using a very small needle. These injections will be carefully placed in the precise areas needed to address your specific concerns and achieve optimal results. After the Botox has been injected, we may ask you to make various facial expressions to help the Botox settle into the targeted areas effectively.",
          ],
          image: "/images/botox/botox-injection-treatment.png",
          imageAspect: "landscape",
        }}
      />

      <OverviewBlock
        tone="cream"
        section={{
          eyebrow: "Recovery & results",
          heading: "Effects appear in about three days",
          paragraphs: [
            "After your Botox treatment, some patients may experience minimal bruising, tenderness, or swelling at the injection site, but these effects typically subside quickly. In the week following your treatment, it’s important to avoid certain activities to ensure the best results. These include rubbing your face, sleeping on your face, high-intensity exercise, tanning, bending over, saunas, and hot water. You should also be cautious when applying makeup.",
            "You can expect to start seeing the effects of Botox about three days after your appointment. The duration of Botox results can vary depending on factors like muscle strength and the depth of your lines and wrinkles. On average, Botox results last between 3 to 5 months. For optimal results, we recommend scheduling Botox treatments every 3 to 4 months.",
          ],
        }}
      />

      <BenefitsList
        eyebrow="Good candidates for Botox"
        heading={"The best candidates for Botox…"}
        items={CANDIDATES}
      />

      <FAQSection faqs={FAQS} />

      <RelatedServices
        items={[
          {
            label: "Dysport",
            href: "/dysport/",
            blurb:
              "FDA-approved alternative that softens frown lines with fast-acting, natural-looking results.",
          },
          {
            label: "Derma Filler",
            href: "/derma-filler/",
            blurb:
              "Restore volume and smooth deeper lines with our safe, expert-administered dermal fillers.",
          },
          {
            label: "Xeomin",
            href: "/xeomin/",
            blurb:
              "Uniquely purified neurotoxin - another option for smoothing dynamic wrinkles.",
          },
        ]}
      />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-14 lg:px-8">
        <CTABanner
          title="Ready for a naturally refreshed look?"
          subtitle="Book a free consultation. Our expert injectors will design a Botox plan around your face and goals."
        />
      </div>
    </>
  );
}
