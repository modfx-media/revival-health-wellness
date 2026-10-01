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

const TITLE = "Kybella Treatment for Under Chin Fat";
const PATH = "/kybella/";
const DESCRIPTION =
  "Dissolve fat under the chin with Kybella treatment in Las Vegas. Revival Health and Wellness offers this injectable to help you achieve a more sculpted jawline.";

export async function generateMetadata() {
  const fallback = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  images: ["/images/kybella/kybella-figure-3.jpg"],
});
  return cmsPageMetadata(fallback);
}

const KEY_BENEFITS = [
  "Fast, convenient, and non-surgical treatments",
  "Minimal discomfort with little to no downtime",
  "A beautifully contoured chin and refined profile",
  "Enhanced self-esteem and confidence",
  "Long-lasting, permanent results",
];

const CANDIDATES = [
  "Is at least 18 years old",
  "Has a moderate double chin",
  "Possesses good skin quality with minimal laxity",
  "Is not obese",
  "Understands that Kybella is not intended for weight loss",
  "Has realistic expectations about the results",
];

const FAQS = [
  {
    question: "What is Kybella®?",
    answer:
      "FDA-approved since 2015, Kybella® is revolutionary in its ability to target and eliminate fat beneath the chin. Prior to Kybella, the only effective way to treat a double chin was through liposuction. The convenience of an injectable, non-surgical treatment for removing excess submental fat has made Kybella a highly sought-after option.",
  },
  {
    question: "How does Kybella work?",
    answer:
      "Kybella’s active ingredient is a synthetic form of deoxycholic acid, a molecule naturally found in the body that aids in the breakdown and absorption of dietary fat. When injected directly into the excess fat beneath the chin, Kybella destroys the fat cells in the targeted area, preventing them from storing fat again.",
  },
  {
    question: "What happens during a Kybella appointment?",
    answer:
      "When you arrive we’ll start with “before” photos, apply a numbing cream, then place a temporary tattoo dot grid to guide the injections. You can expect 10 to 50 injections that take only a few minutes. Some patients feel a slight burning sensation - we provide ice packs to alleviate this. After the session, we’ll wrap your chin with a compression bandage, and you may experience mild soreness.",
  },
  {
    question: "How many treatments will I need?",
    answer:
      "For optimal results, Kybella typically requires 2 to 4 treatments spaced 4–6 weeks apart. Most patients begin to notice changes after 2 to 3 sessions. The exact number depends on the amount of fat being treated. Once you’re satisfied, no further maintenance treatments are necessary - the destroyed fat cells are gone for good.",
  },
  {
    question: "What is recovery like?",
    answer:
      "After Kybella, most patients notice some swelling, which can make it seem like your double chin is getting bigger - rest assured, that’s just part of the process. Swelling usually peaks around 24 hours after your first treatment and can last a few days to a few weeks. You may also experience some bruising, a burning sensation, or numbness in the treated area.",
  },
  {
    question: "Am I a good candidate?",
    answer:
      "The ideal candidate is at least 18 years old, has a moderate double chin, has good skin quality with minimal laxity, is not obese, understands that Kybella is not intended for weight loss, and has realistic expectations about the results.",
  },
];

export default function KybellaPage() {
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
              { name: "Kybella", path: PATH },
            ]),
            faqSchema(FAQS),
          ]),
        }}
      />

      <PageHero
        eyebrow={"Aesthetics · Kybella®"}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Aesthetics", href: "/aesthetics/" },
          { label: "Kybella®" },
        ]}
        title={
          <>
            Transform your contour with{" "}
            <span className="relative inline-block italic text-revival-gold">
              Kybella
              <span
                aria-hidden
                className="absolute -bottom-2 left-0 h-[3px] w-full bg-gradient-to-r from-revival-gold to-transparent"
              />
            </span>
          </>
        }
        description={"If you’re dealing with a double chin that makes you appear heavier or older than you are, Kybella® eliminates excess fat under the chin to reveal a beautifully sculpted neck and jawline."}
        gallery={[
          "/images/kybella/kybella-figure-3.jpg",
          "/images/kybella/64fe407c6c52fe1a51db4ba8_kybella-3.webp",
        ]}
        compact
      />

      <OverviewBlock
        section={{
          eyebrow: "What is Kybella?",
          heading: "FDA-approved since 2015 - the non-surgical double chin fix",
          paragraphs: [
            "FDA-approved since 2015, Kybella is revolutionary in its ability to target and eliminate fat beneath the chin. Prior to Kybella, the only effective way to treat a double chin was through liposuction.",
            "The convenience of an injectable, non-surgical treatment for removing excess submental fat has made Kybella a highly sought-after option for those looking to refine their neck and jawline without surgery.",
          ],
          image: "/images/kybella/kybella-figure-3.jpg",
          imageAspect: "landscape",
        }}
      />

      <BenefitsList
        eyebrow="Key benefits of Kybella"
        heading="Reducing fat beneath the chin, made effective"
        items={KEY_BENEFITS}
        image="/images/kybella/64fe407c6c52fe1a51db4ba8_kybella-3.webp"
      />

      <OverviewBlock
        tone="cream"
        reverse
        section={{
          eyebrow: "How does Kybella work?",
          heading: "Deoxycholic acid - permanently destroys fat cells",
          paragraphs: [
            "Kybella’s active ingredient is a synthetic form of deoxycholic acid, a molecule naturally found in the body that aids in the breakdown and absorption of dietary fat.",
            "When injected directly into the excess fat beneath the chin, Kybella works by destroying the fat cells in the targeted area - preventing them from storing fat again for permanent results.",
          ],
          image: "/images/kybella/Kybella-Injections-double-chin.jpg",
        }}
      />

      <OverviewBlock
        section={{
          eyebrow: "Kybella treatment details",
          heading: "What to expect from your appointment",
          paragraphs: [
            "When you arrive for your Kybella appointment, we’ll start by taking some “before” photos. Once you’re comfortable, we’ll apply a numbing cream under your chin, followed by a temporary tattoo dot grid to guide your specialist during the treatment.",
            "During the procedure, you can expect to receive between 10 to 50 injections, which only take a few minutes. While you may feel the injections, the numbing cream ensures that any discomfort is minimal. Some patients experience a slight burning sensation from the chemical, but we provide ice packs to alleviate this. Most people find the treatment quite manageable. After the session, we’ll wrap your chin with a compression bandage, and you may experience some mild soreness. For optimal results, Kybella typically requires 2 to 4 treatments, each spaced six weeks apart.",
          ],
        }}
      />

      <OverviewBlock
        tone="cream"
        section={{
          eyebrow: "Recovery",
          heading: "Swelling is normal - it means it’s working",
          paragraphs: [
            "After your Kybella treatment, most patients notice some swelling, which can make it seem like your double chin is getting bigger - but rest assured, it’s just part of the process. This swelling is normal and indicates that the treatment is working. Once the swelling subsides, the targeted fat cells will be permanently gone.",
            "The swelling usually peaks around 24 hours after your first treatment and can last anywhere from a couple of days to a few weeks. During the recovery period, you might also experience some bruising, a burning sensation, or numbness in the treated area.",
          ],
        }}
      />

      <BenefitsList
        eyebrow="Who is a good candidate for Kybella?"
        heading={"Lift. Define. Refresh - your way."}
        items={CANDIDATES}
      />

      <FAQSection faqs={FAQS} />

      <RelatedServices
        items={[
          {
            label: "Derma Filler",
            href: "/derma-filler/",
            blurb:
              "Restore volume and contour with premium hyaluronic-acid fillers for cheeks, jawline, and more.",
          },
          {
            label: "Botox",
            href: "/botox/",
            blurb:
              "Smooth fine lines and wrinkles with expert-administered neurotoxin injections.",
          },
          {
            label: "PDO Thread lifts",
            href: "/pdo-thread-lifts/",
            blurb:
              "Minimally invasive thread lift for jawline definition, sagging, and instant lift without surgery.",
          },
        ]}
      />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-14 lg:px-8">
        <CTABanner
          title="Ready for a beautifully sculpted jawline?"
          subtitle="Book a free consultation and see if Kybella is right for you."
        />
      </div>
    </>
  );
}
