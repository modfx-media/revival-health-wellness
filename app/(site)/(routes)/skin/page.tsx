import { cmsPageMetadata } from "@/lib/cms/generateMeta";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buildMetadata } from "@/lib/metadata";
import { serviceSchema, breadcrumbSchema, jsonLd } from "@/lib/schema";
import PageHero from "@/components/ui/PageHero";
import CTABanner from "@/components/ui/CTABanner";

const TITLE = "Medical Skin Care Services";
const PATH = "/skin/";
const DESCRIPTION =
  "Improve your complexion with a medical skin care service in Las Vegas. Revival Health and Wellness offers clinical treatments to help your skin look its best.";

export async function generateMetadata() {
  const fallback = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  images: ["/images/skin/close-beauty-portrait-topless-woman-with-perfect-skin.webp"],
});
  return cmsPageMetadata(fallback);
}

const SKIN_SERVICES = [
  {
    label: "Botox",
    href: "/botox/",
    image:
      "/images/skin/vecteezy_ai-generated-dermal-filler-for-woman-patient-bokeh-style_40864874-scaled-e1756150311334.jpeg",
    blurb:
      "Smooth away fine lines and wrinkles with our expert Botox treatments at Revival Health & Wellness. This non-surgical, quick, and personalized treatment relaxes facial muscles, reduces the appearance of wrinkles, and restores a naturally refreshed, youthful, and confident look. Perfect for those seeking subtle yet effective anti-aging results.",
  },
  {
    label: "Derma Filler",
    href: "/derma-filler/",
    image: "/images/skin/what-is-aesthetic-medicine-tiny.webp",
    blurb:
      "Revive your beauty with Derma Fillers at Revival Health & Wellness. Our expert team ensures safe, effective, and rejuvenating treatments tailored just for you. Book your appointment today and embrace a vibrant, youthful glow!",
  },
  {
    label: "Kybella",
    href: "/kybella/",
    image: "/images/skin/kybella1-e1756330196741.jpg",
    blurb:
      "Eliminate stubborn chin fat and achieve a beautifully contoured jawline with Kybella at Revival Health and Wellness. Our expert team provides personalized treatments with minimal downtime, helping you feel confident and refreshed.",
  },
  {
    label: "Microneedling",
    href: "/microneedling/",
    image: "/images/skin/Gold_4_1600x.webp",
    blurb:
      "Microneedling is an advanced skin rejuvenation treatment that uses tiny needles to gently stimulate the skin. It boosts collagen production, reduces fine lines, wrinkles, and scars, and improves overall skin texture. Experience smoother, firmer, and naturally glowing skin with this minimally invasive procedure.",
  },
  {
    label: "Under eye treatment",
    href: "/under-eye-treatment/",
    image: "/images/skin/close-beauty-portrait-serum.webp",
    blurb:
      "Revive tired, dull eyes with our specialized Under-Eye Treatment at Revival Health & Wellness. This advanced treatment targets dark circles, puffiness, and fine lines, helping to rejuvenate and brighten the under-eye area. Experience a refreshed, youthful, and well-rested look that enhances your overall appearance.",
  },
  {
    label: "PDO Thread lifts",
    href: "/pdo-thread-lifts/",
    image: "/images/skin/under-eye-bags-treatment.webp",
    blurb:
      "Lift and tighten your skin with our PDO Thread Lift treatment at Revival Health & Wellness. This minimally invasive procedure helps reduce sagging, redefine facial contours, and stimulate collagen production, giving you a naturally youthful, lifted, and refreshed appearance. Perfect for those seeking instant results without surgery.",
  },
];

export default function SkinPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd([
            serviceSchema({ name: TITLE, description: DESCRIPTION, path: PATH }),
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Skin", path: PATH },
            ]),
          ]),
        }}
      />

      <PageHero
        eyebrow="Skin"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Skin" }]}
        title={
          <>
            <span className="relative inline-block italic text-revival-gold">
              Skin
              <span
                aria-hidden
                className="absolute -bottom-2 left-0 h-[3px] w-full bg-gradient-to-r from-revival-gold to-transparent"
              />
            </span>
          </>
        }
        description="Revival Health and Wellness is here to help you with your medical skin care needs."
        gallery={[
          "/images/skin/close-beauty-portrait-topless-woman-with-perfect-skin.webp",
        ]}
        compact
      />

      {/* Divider heading from live */}
      <section className="relative bg-revival-warm-white py-14 lg:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mb-6 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-gradient-to-r from-transparent via-revival-gold to-revival-gold/60 sm:w-12" />
            <span className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-revival-gold sm:text-xs">
              Our Top Injectable Skin Services
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
            Comprehensive skin services for radiant health and wellness
          </h2>
        </div>
      </section>

      {/* Service strip - 6 cards with the exact live imagery */}
      <section className="relative overflow-hidden bg-revival-warm-white pb-20 lg:pb-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SKIN_SERVICES.map((s, i) => (
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
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-revival-dark/95 via-revival-dark/60 to-transparent"
                />
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
          title="Ready to reveal your best skin?"
          subtitle="Book a free consultation. Our medical team will design a plan for you."
        />
      </div>
    </>
  );
}
