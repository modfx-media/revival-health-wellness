import AnimatedSection from "@/components/ui/AnimatedSection";
import CTABanner from "@/components/ui/CTABanner";
import PageHero from "@/components/ui/PageHero";
import { CheckCircle2 } from "lucide-react";

export type ServicePageProps = {
  /** Eyebrow label above the title (e.g. category). */
  eyebrow: string;
  title: string;
  intro: string;
  /** Bullet points describing benefits / what's included. */
  highlights?: string[];
  /**
   * Optional hero background gallery. When omitted, the service-specific
   * fallback below is used based on the page title. Never falls back to the
   * homepage hero images.
   */
  gallery?: string[];
};

/**
 * Default hero gallery when a service has no title-specific match. Mixes
 * treatment imagery so no page shows homepage hero slides.
 */
const DEFAULT_SERVICE_GALLERY = [
  "/images/services/aesthetics-and-injectables.jpeg",
  "/images/services/hormone-therapy.jpg",
  "/images/services/emsculpt-neo.webp",
  "/images/services/sexual-wellness.jpg",
];

/**
 * Ordered keyword→gallery lookup. First substring match on the lowercased
 * page title wins, so services get imagery that actually lives on their page.
 */
const SERVICE_GALLERY_MATCHERS: Array<[RegExp, string[]]> = [
  [/emsculpt/i, [
    "/images/services/emsculpt-neo.webp",
    "/images/services/defined-body.webp",
    "/images/services/defined-body-full.webp",
    "/images/services/body-contouring.webp",
  ]],
  [/emsella/i, [
    "/images/services/sexual-wellness.png",
    "/images/services/sexual-wellness.jpg",
    "/images/services/body-contouring.webp",
  ]],
  [/iv[\s-]?hydration|iv[\s-]?therapy/i, [
    "/images/services/image-of-iv-infusion-in-wellness-clinic.jpg",
    "/images/services/vitamin-booster-injection.jpg",
  ]],
  [/botox|xeomin|dysport/i, [
    "/images/services/botox.webp",
    "/images/services/aesthetics-and-injectables.jpeg",
  ]],
  [/derma[\s-]?filler|filler|kybella|sculptra/i, [
    "/images/services/aesthetics-and-injectables.jpeg",
    "/images/services/aesthetics.jpg",
    "/images/services/aesthetics-2.jpg",
  ]],
  [/micro[\s-]?needling|prp[\s-]?facial|under[\s-]?eye/i, [
    "/images/services/prp-facial.jpg",
    "/images/services/prp-rejuvenation.jpeg",
    "/images/services/aesthetics-skin-facial.webp",
  ]],
  [/prp[\s-]?hair|hair[\s-]?restoration|finasteride|hair/i, [
    "/images/services/prp-rejuvenation.jpeg",
    "/images/services/prp-facial.jpg",
  ]],
  [/co2|coolpeel|tetra|everesse|thread|scar|skin/i, [
    "/images/services/aesthetics-skin-facial.webp",
    "/images/services/skincare-neck-chin.jpg",
    "/images/services/prp-facial.jpg",
  ]],
  [/o[\s-]?shot|p[\s-]?shot|p[\s-]?long|priapus/i, [
    "/images/services/sexual-wellness.jpg",
    "/images/services/sexual-wellness.png",
  ]],
  [/trimix|viagra|gainswave/i, [
    "/images/services/sexual-wellness.jpg",
    "/images/services/sexual-wellness.png",
  ]],
  [/sexual[\s-]?wellness|men'?s?[\s-]?(sexual|health)/i, [
    "/images/services/sexual-wellness.jpg",
    "/images/services/sexual-wellness.png",
  ]],
  [/men\b|male/i, [
    "/images/services/defined-body.webp",
    "/images/services/defined-body-full.webp",
    "/images/services/xray-body.jpg",
  ]],
  [/women\b|female/i, [
    "/images/services/hormone-therapy.jpg",
    "/images/services/aesthetics-skin-facial.webp",
    "/images/services/sexual-wellness.jpg",
  ]],
  [/hormone|testosterone|hrt/i, [
    "/images/services/hormone-therapy.jpg",
    "/images/services/hormone-therapy.webp",
  ]],
  [/glp[\s-]?1|weight[\s-]?loss|phentermine|semaglutide|tirzepatide/i, [
    "/images/services/semaglutide-glp1.jpg",
    "/images/services/glp-1-measuring-tape.avif",
    "/images/services/medical-weight-loss.jpeg",
    "/images/services/weight-loss-couple.jpg",
  ]],
  [/telehealth|virtual/i, [
    "/images/services/telehealth.jpg",
    "/images/telehealth/telehealth-consult.jpg",
  ]],
  [/aesthetic|beauty|injectable/i, [
    "/images/services/aesthetics.jpg",
    "/images/services/aesthetics-and-injectables.jpeg",
    "/images/services/aesthetics-2.jpg",
    "/images/services/aesthetics-skin-facial.webp",
  ]],
  [/body[\s-]?contouring|body\b/i, [
    "/images/services/body-contouring.webp",
    "/images/services/emsculpt-neo.webp",
    "/images/services/defined-body.webp",
  ]],
];

function resolveGallery(title: string, override?: string[]): string[] {
  if (override && override.length > 0) return override;
  for (const [pattern, imgs] of SERVICE_GALLERY_MATCHERS) {
    if (pattern.test(title)) return imgs;
  }
  return DEFAULT_SERVICE_GALLERY;
}

/**
 * Shared layout for service / treatment landing pages. Provides a hero,
 * highlights, an overview block, and a closing CTA. Replace placeholder copy
 * with real content per service.
 */
export default function ServicePage({
  eyebrow,
  title,
  intro,
  highlights = [
    "Personalized treatment plans built around your goals",
    "Physician-led, evidence-based protocols",
    "Comfortable, discreet, concierge-level care",
    "In-clinic and telehealth options available",
  ],
  gallery,
}: ServicePageProps) {
  const heroGallery = resolveGallery(title, gallery);
  return (
    <>
      <PageHero
        eyebrow={eyebrow}
        title={title}
        description={intro}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: eyebrow }]}
        gallery={heroGallery}
        compact
      />

      <AnimatedSection className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-gradient-to-br from-revival-gold-light/50 to-revival-gold/20">
            <div className="absolute inset-0 flex items-center justify-center text-revival-charcoal/40">
              <span className="font-serif text-xl">Treatment imagery</span>
            </div>
          </div>
          <div>
            <h2 className="text-3xl text-revival-dark">What to expect</h2>
            <p className="mt-4 text-revival-charcoal/80">
              Our team will guide you through every step, from your initial
              consultation and personalized plan to treatment and ongoing
              support. Here&apos;s what sets this experience apart:
            </p>
            <ul className="mt-6 space-y-3">
              {highlights.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-revival-gold" />
                  <span className="text-revival-charcoal/90">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </AnimatedSection>

      <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <CTABanner />
      </div>
    </>
  );
}
