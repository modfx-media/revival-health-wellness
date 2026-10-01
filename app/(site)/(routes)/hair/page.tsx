import { cmsPageMetadata } from "@/lib/cms/generateMeta";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Droplet, ShieldCheck, HeartPulse, Syringe, Zap, CheckCircle2 } from "lucide-react";
import { buildMetadata } from "@/lib/metadata";
import { serviceSchema, breadcrumbSchema, jsonLd } from "@/lib/schema";
import PageHero from "@/components/ui/PageHero";
import CTABanner from "@/components/ui/CTABanner";
import HairIntroSection from "@/components/hair/HairIntroSection";

const TITLE = "Medical Hair Care & Restoration";
const PATH = "/hair/";
const DESCRIPTION =
  "Restore your confidence with medical hair care & restoration services in Las Vegas. Revival Health and Wellness offers proven ways to help your hair grow back.";

export async function generateMetadata() {
  const fallback = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  images: ["/images/hair/PRP-Treatment-for-Hair-Loss-Orlando.webp"],
});
  return cmsPageMetadata(fallback);
}

const HAIR_SERVICES = [
  {
    label: "PRP Hair restoration",
    href: "/prp-hair-restoration/",
    image: "/images/hair/PRP-HAIR.jpg",
    blurb:
      "Stimulate natural hair growth with our PRP Hair Restoration treatment at Revival Health & Wellness. This advanced therapy strengthens thinning hair, revitalizes follicles, and helps restore a fuller, thicker, and healthier-looking head of hair over time. Perfect for those looking to regain confidence and improve hair density naturally.",
  },
  {
    label: "Finasteride",
    href: "/finasteride/",
    image: "/images/hair/PRP-Treatment-for-Hair-Loss-Orlando.webp",
    blurb:
      "Finasteride is a clinically proven treatment for hair loss that blocks the hormone causing thinning. It slows hair loss, strengthens existing hair, and promotes fuller, healthier growth-perfect for maintaining hair and boosting confidence naturally.",
  },
];

const HAIR_SCIENCE_STEPS = [
  {
    icon: Syringe,
    title: "PRP separation",
    text: "A small blood sample is spun in a centrifuge to isolate platelet-rich plasma from red blood cells.",
  },
  {
    icon: Droplet,
    title: "Growth factors",
    text: "The concentrated plasma - rich with growth factors - is drawn up and prepared for injection.",
  },
  {
    icon: Zap,
    title: "Follicle activation",
    text: "Injected into the scalp, growth factors awaken dormant follicles and trigger new activity at the root.",
  },
  {
    icon: CheckCircle2,
    title: "Denser regrowth",
    text: "Over a course of sessions, follicles cycle back into an active growth phase for fuller, thicker hair.",
  },
];

const HAIR_SCIENCE_BADGES = [
  { icon: Droplet, label: "Autologous PRP" },
  { icon: ShieldCheck, label: "Clinically proven" },
  { icon: HeartPulse, label: "Natural regrowth" },
];

export default function HairPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd([
            serviceSchema({ name: TITLE, description: DESCRIPTION, path: PATH }),
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Hair", path: PATH },
            ]),
          ]),
        }}
      />

      <PageHero
        eyebrow="Hair"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Hair" }]}
        title={
          <>
            <span className="relative inline-block italic text-revival-gold">
              Hair
              <span
                aria-hidden
                className="absolute -bottom-2 left-0 h-[3px] w-full bg-gradient-to-r from-revival-gold to-transparent"
              />
            </span>
          </>
        }
        description="Revival Health and Wellness is here to help you with your medical hair care needs. Check out our hair services below."
        gallery={[
          "/images/hair/PRP-Treatment-for-Hair-Loss-Orlando.webp",
        ]}
        compact
      />

      <HairIntroSection />

      {/* The science of hair restoration - step list + real photo */}
      <section className="relative overflow-hidden bg-revival-dark py-16 text-white lg:py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-20 top-10 h-[24rem] w-[24rem] rounded-full bg-revival-gold/10 blur-[140px]"
        />
        <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
          <div>
            <span className="text-tagline text-xs text-revival-gold">
              How it works
            </span>
            <h2
              className="mt-3 font-heading font-medium leading-[1.1] text-white"
              style={{ fontSize: "clamp(1.9rem, 3.2vw, 2.75rem)" }}
            >
              The science of hair restoration
            </h2>
            <p className="mt-6 max-w-xl text-base font-light leading-relaxed text-revival-cream/80 sm:text-lg">
              Our medical hair program pairs two clinically proven approaches - PRP that reactivates dormant follicles from within, and Finasteride that blocks the hormone driving thinning. Together they build density from the root.
            </p>

            <ol className="relative mt-10 space-y-8">
              <span
                aria-hidden
                className="absolute left-[19px] top-2 bottom-2 w-px bg-gradient-to-b from-revival-gold/60 via-revival-gold/25 to-transparent"
              />
              {HAIR_SCIENCE_STEPS.map((step, i) => (
                <li key={step.title} className="relative flex gap-5 pl-0">
                  <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-revival-gold/40 bg-revival-dark text-revival-gold">
                    <step.icon className="h-5 w-5" />
                  </span>
                  <div className="pt-1">
                    <div className="flex items-baseline gap-2">
                      <span className="font-heading text-lg text-white">
                        {step.title}
                      </span>
                      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-revival-gold/70">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <p className="mt-1.5 text-sm font-light leading-relaxed text-revival-cream/70 sm:text-base">
                      {step.text}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-10 flex flex-wrap gap-3">
              {HAIR_SCIENCE_BADGES.map((badge) => (
                <span
                  key={badge.label}
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-xs font-medium text-revival-cream/85"
                >
                  <badge.icon className="h-3.5 w-3.5 text-revival-gold" />
                  {badge.label}
                </span>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md lg:mx-0 lg:max-w-none">
            <div className="pointer-events-none absolute -inset-4 rounded-[2.5rem] border border-dashed border-revival-gold/25" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-gradient-to-br from-revival-gold via-revival-gold/40 to-transparent p-[1.5px] shadow-[0_30px_70px_-20px_rgba(0,0,0,0.5)]">
              <div className="relative h-full w-full overflow-hidden rounded-[1.9rem]">
                <Image
                  src="/images/hair/Hair-Loss-3-p-800.webp"
                  alt="Healthy, restored hair after PRP treatment at Revival Health & Wellness"
                  fill
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover"
                  quality={90}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-revival-dark/70 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service strip - 2 cards */}
      <section className="relative overflow-hidden bg-revival-warm-white py-14 sm:py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-gradient-to-r from-transparent via-revival-gold to-revival-gold/60 sm:w-12" />
              <span className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-revival-gold sm:text-xs">
                Explore Our Hair Services
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
              Two proven paths. One personalized plan.
            </h2>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-8">
            {HAIR_SERVICES.map((s, i) => (
              <Link
                key={s.href}
                href={s.href}
                className="group relative flex aspect-[4/5] overflow-hidden rounded-[1.75rem] shadow-lg transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_30px_80px_-20px_rgba(15,15,15,0.4)]"
              >
                <Image
                  src={s.image}
                  alt={`${s.label} at Revival Health & Wellness`}
                  fill
                  sizes="(min-width: 640px) 48vw, 100vw"
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
                <div className="relative z-10 mt-auto flex flex-col p-6 text-white sm:p-8">
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
                  <p className="mt-3 text-sm font-light leading-relaxed text-white/85 sm:text-[0.95rem]">
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

      <section className="relative bg-revival-warm-white py-10 lg:py-14">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs leading-relaxed text-revival-charcoal/55">
            * All patients have the option to obtain a prescription for the Brand
            Name medications listed on this page to be called in at the pharmacy
            of their choice. Please note a prescription for the Brand Name
            medications does not guarantee your insurance will cover this
            medication. All patients will be charged a monthly weight management
            fee for this service.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-14 lg:px-8">
        <CTABanner
          title="Ready to restore your hair?"
          subtitle="Book a free consultation. Our medical team will design a plan for you."
        />
      </div>
    </>
  );
}
