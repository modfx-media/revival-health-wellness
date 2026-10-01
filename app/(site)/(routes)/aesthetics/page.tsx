import { cmsPageMetadata } from "@/lib/cms/generateMeta";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buildMetadata } from "@/lib/metadata";
import { serviceSchema, breadcrumbSchema, jsonLd } from "@/lib/schema";
import PageHero from "@/components/ui/PageHero";
import CTABanner from "@/components/ui/CTABanner";
import {
  OverviewBlock,
  PillarsGrid,
} from "@/components/templates/HormoneSections";

const TITLE = "Aesthetic Services and Treatments";
const PATH = "/aesthetics/";
const DESCRIPTION =
  "Enhance your natural beauty with aesthetic services in Las Vegas. Revival Health and Wellness provides custom skin & body care to help you look and feel great.";

export async function generateMetadata() {
  const fallback = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  images: [
    "/images/aesthetics/istockphoto-1366228042-612x612-1-e1756148525229.jpg",
  ],
});
  return cmsPageMetadata(fallback);
}

export default function AestheticsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd([
            serviceSchema({ name: TITLE, description: DESCRIPTION, path: PATH }),
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Aesthetics", path: PATH },
            ]),
          ]),
        }}
      />

      <PageHero
        eyebrow="Aesthetics"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Aesthetics" }]}
        title={
          <>
            <span className="relative inline-block italic text-revival-gold">
              Aesthetics
              <span
                aria-hidden
                className="absolute -bottom-2 left-0 h-[3px] w-full bg-gradient-to-r from-revival-gold to-transparent"
              />
            </span>
          </>
        }
        description="At Revival Health and Wellness, we believe in providing services that can make you feel your best at every age."
        gallery={[
          "/images/aesthetics/istockphoto-1366228042-612x612-1-e1756148525229.jpg",
        ]}
        compact
      />

      <OverviewBlock
        section={{
          eyebrow: "Beauty & Confidence",
          heading:
            "Comprehensive aesthetic services for enhanced beauty and confidence",
          paragraphs: [
            "At Revival Health and Wellness, we believe in providing services that can make you feel your best at every age.",
            "We can’t deny that fine lines and wrinkles appear as life proceeds and gravity takes control! However, our team of clinical advanced aesthetic professionals believe that looking your best can significantly impact how you feel, boost confidence and self esteem.",
          ],
          image:
            "/images/aesthetics/istockphoto-1366228042-612x612-1-e1756148525229.jpg",
        }}
      />

      <OverviewBlock
        tone="cream"
        reverse
        section={{
          eyebrow: "Solutions",
          heading: "Health and aesthetic solutions at Revival Health and Wellness",
          paragraphs: [
            "We use only the top anti-aging products available, never cutting corners or compromising on quality. With our expertise in a range of therapies and treatments, you can ensure that your face and body are in expert hands.",
            "Our anti-aging solutions are crafted to perfection, providing long-lasting results, and giving you more time to enjoy life. Even if you want to smooth fine or more prominent lines, wrinkles, eliminate unwanted fat, or rejuvenate your youthful profile, our team of top specialists at Revival are here to support you through the entire transformation journey.",
          ],
          image: "/images/aesthetics/Sexual-wellness-new-pic-e1756160932104.webp",
        }}
      />

      <PillarsGrid
        eyebrow="Our top injectable aesthetic services"
        heading="Signature injectables"
        intro={"Three of our most-requested treatments - crafted to refine, restore, and enhance your natural beauty."}
        pillars={[
          {
            title: "Dermal Fillers",
            text: "Dermal Fillers are an impressive way to rejuvenate a youthful appearance with immediate results. They can help smoothen out wrinkles, add volume, and enhance the shape of your cheeks. Our professional team only uses the safe and most effective fillers to achieve natural, beautiful results without looking overdone.",
            icon: "droplet",
          },
          {
            title: "Botox & Dysport",
            text: "The most prominent treatments for eliminating wrinkles and rejuvenating your skin. Botox and Dysport are injectables that work by relaxing the muscles that cause fine lines and wrinkles - blocking the nerve signals that make these muscles contract, giving your skin a smoother, more youthful appearance.",
            icon: "syringe",
          },
          {
            title: "Kybella",
            text: "Kybella is an advanced injectable treatment that helps reduce stubborn fat and redefine your profile without surgery. By safely breaking down fat cells, it delivers a slimmer, more sculpted look with minimal downtime - a great choice for those seeking lasting results without the discomfort of traditional procedures.",
            icon: "target",
          },
        ]}
      />

      {/* Full-width treatment photo - sized to the image's own aspect ratio so
          nothing is cropped or letterboxed, sitting flush under the cards above. */}
      <section className="relative bg-revival-warm-white pb-14 sm:pb-20 lg:pb-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[2rem] shadow-[0_30px_80px_-30px_rgba(15,15,15,0.35)] ring-1 ring-revival-gold/15">
            <Image
              src="/images/aesthetics/microneedling-treatment-signature-injectables.webp"
              alt="Provider performing a microneedling treatment on a patient at Revival Health & Wellness"
              width={1536}
              height={1024}
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="h-auto w-full"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent"
            />
            <p className="absolute bottom-5 left-5 right-5 text-sm font-light text-white/90 sm:bottom-7 sm:left-7 sm:right-7 sm:text-base">
              Microneedling in session at Revival Health &amp; Wellness
            </p>
          </div>
        </div>
      </section>

      {/* Service strip - mirrors the live aesthetics layout with each service's exact background image */}
      <section className="relative overflow-hidden bg-revival-warm-white py-14 sm:py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-gradient-to-r from-transparent via-revival-gold to-revival-gold/60 sm:w-12" />
              <span className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-revival-gold sm:text-xs">
                Our Top Injectable Aesthetic Services
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
              Every service. Curated for you.
            </h2>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                label: "Botox",
                href: "/botox/",
                image:
                  "/images/aesthetics/vecteezy_ai-generated-dermal-filler-for-woman-patient-bokeh-style_40864874-scaled-e1756150311334.jpeg",
                blurb:
                  "Smooth away fine lines and wrinkles with our expert Botox treatments at Revival Health & Wellness. This non-surgical, quick, and personalized treatment relaxes facial muscles, reduces the appearance of wrinkles, and restores a naturally refreshed, youthful, and confident look. Perfect for those seeking subtle yet effective anti-aging results.",
              },
              {
                label: "Derma Filler",
                href: "/derma-filler/",
                image: "/images/aesthetics/what-is-aesthetic-medicine-tiny.webp",
                blurb:
                  "Revive your beauty with Derma Fillers at Revival Health & Wellness. Our expert team ensures safe, effective, and rejuvenating treatments tailored just for you. Book your appointment today and embrace a vibrant, youthful glow!",
              },
              {
                label: "Kybella",
                href: "/kybella/",
                image: "/images/aesthetics/kybella1-e1756330196741.jpg",
                blurb:
                  "Eliminate stubborn chin fat and achieve a beautifully contoured jawline with Kybella at Revival Health and Wellness. Our expert team provides personalized treatments with minimal downtime, helping you feel confident and refreshed.",
              },
              {
                label: "Microneedling",
                href: "/microneedling/",
                image: "/images/aesthetics/Gold_4_1600x.webp",
                blurb:
                  "Microneedling is an advanced skin rejuvenation treatment that uses tiny needles to gently stimulate the skin. It boosts collagen production, reduces fine lines, wrinkles, and scars, and improves overall skin texture. Experience smoother, firmer, and naturally glowing skin with this minimally invasive procedure.",
              },
              {
                label: "Under eye treatment",
                href: "/under-eye-treatment/",
                image:
                  "/images/aesthetics/close-beauty-portrait-serum.webp",
                blurb:
                  "Revive tired, dull eyes with our specialized Under-Eye Treatment at Revival Health & Wellness. This advanced treatment targets dark circles, puffiness, and fine lines, helping to rejuvenate and brighten the under-eye area. Experience a refreshed, youthful, and well-rested look that enhances your overall appearance.",
              },
              {
                label: "PDO Thread lifts",
                href: "/pdo-thread-lifts/",
                image: "/images/aesthetics/under-eye-bags-treatment.webp",
                blurb:
                  "Lift and tighten your skin with our PDO Thread Lift treatment at Revival Health & Wellness. This minimally invasive procedure helps reduce sagging, redefine facial contours, and stimulate collagen production, giving you a naturally youthful, lifted, and refreshed appearance. Perfect for those seeking instant results without surgery.",
              },
              {
                label: "PRP Hair restoration",
                href: "/prp-hair-restoration/",
                image:
                  "/images/aesthetics/dr-janice-brown-new-landing-page-drafts-pics.png",
                blurb:
                  "Stimulate natural hair growth with our PRP Hair Restoration treatment at Revival Health & Wellness. This advanced therapy strengthens thinning hair, revitalizes follicles, and helps restore a fuller, thicker, and healthier-looking head of hair over time. Perfect for those looking to regain confidence and improve hair density naturally.",
              },
              {
                label: "Finasteride",
                href: "/finasteride/",
                image: "/images/aesthetics/PRP-HAIR.jpg",
                blurb:
                  "Finasteride is a clinically proven treatment for hair loss that blocks the hormone causing thinning. It slows hair loss, strengthens existing hair, and promotes fuller, healthier growth-perfect for maintaining hair and boosting confidence naturally.",
              },
              {
                label: "Emsculpt NEO",
                href: "/emsculpt-neo/",
                image: "/images/aesthetics/September-Featured-image.jpg",
                blurb:
                  "Emsculpt NEO is an advanced body contouring treatment that simultaneously builds muscle and reduces fat using high-intensity electromagnetic technology. It helps tone and strengthen your muscles, sculpt your body, and achieve a firmer, more defined physique-all without surgery or downtime.",
              },
              {
                label: "Xeomin®",
                href: "/xeomin/",
                image: "/images/xeomin/XEOMIN-0A.jpg",
                blurb:
                  "The “smart toxin” neurotoxin - a purified formula without unnecessary proteins. Xeomin® relaxes facial muscles for a naturally refreshed look, with visible results in just a few days and no downtime.",
              },
              {
                label: "Sculptra®",
                href: "/sculptra/",
                image: "/images/sculptra/sculptra-before-after-2.png",
                blurb:
                  "Stimulate your skin’s natural collagen and restore youthful volume - gradually and beautifully. Results last up to 24 months for a natural-looking lift without surgery.",
              },
            ].map((s, i) => (
              <Link
                key={s.href}
                href={s.href}
                className="group relative flex aspect-[4/5] overflow-hidden rounded-[1.75rem] shadow-lg transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_30px_80px_-20px_rgba(15,15,15,0.4)]"
              >
                <Image
                  src={s.image}
                  alt={`${s.label} at Revival Health & Wellness`}
                  fill
                  sizes="(min-width: 1024px) 32vw, (min-width: 640px) 48vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  quality={90}
                />
                {/* Dark gradient overlay */}
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-revival-dark/95 via-revival-dark/60 to-transparent"
                />
                {/* Gold hairline reveal on hover */}
                <span
                  aria-hidden
                  className="absolute inset-x-6 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-revival-gold via-revival-gold/70 to-transparent transition-transform duration-500 group-hover:scale-x-100"
                />
                <div className="relative z-10 mt-auto flex flex-col p-6 text-white sm:p-7">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="font-heading text-2xl leading-tight sm:text-3xl">
                      {s.label}
                    </h3>
                    <span
                      aria-hidden
                      className="font-heading text-2xl italic leading-none text-revival-gold/70 sm:text-3xl"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <p className="mt-3 line-clamp-4 text-sm font-light leading-relaxed text-white/85 sm:text-[0.95rem]">
                    {s.blurb}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-revival-gold transition-transform group-hover:translate-x-1">
                    Learn more
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-14 lg:px-8">
        <CTABanner
          title="Ready to feel your best at every age?"
          subtitle="Book a free consultation. Our specialists will build a personalized aesthetic plan just for you."
        />
      </div>
    </>
  );
}
