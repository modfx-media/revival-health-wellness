import { cmsPageMetadata } from "@/lib/cms/generateMeta";
import { buildMetadata, SITE } from "@/lib/metadata";
import { breadcrumbSchema, jsonLd } from "@/lib/schema";
import { Clock, MapPin, Phone } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import MapSection from "@/components/layout/MapSection";
import ContactFormSection from "@/components/home/ContactFormSection";
import { CLINICS, telHref } from "@/lib/content/clinics";

const TITLE = "Contact Us";
const META_TITLE = "Contact Our Wellness Clinic";
const PATH = "/contact-us/";
const DESCRIPTION =
  "Ready to start your journey? Contact us today to book an appointment. Revival Health and Wellness is here to answer your questions and help you get started.";

export async function generateMetadata() {
  const fallback = buildMetadata({
  title: META_TITLE,
  description: DESCRIPTION,
  path: PATH,
});
  return cmsPageMetadata(fallback);
}

const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: META_TITLE,
  url: new URL(PATH, SITE.url).toString(),
  description: DESCRIPTION,
  publisher: {
    "@type": "MedicalBusiness",
    "@id": `${SITE.url}/#business`,
    name: SITE.name,
  },
};

export default function ContactUsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd([
            contactPageSchema,
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: TITLE, path: PATH },
            ]),
          ]),
        }}
      />

      <PageHero
        eyebrow="Contact Us"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: TITLE }]}
        title={
          <>
            Get in touch with{" "}
            <span className="italic text-revival-gold">Revival</span>
          </>
        }
        description="Ready to start your journey? Reach out and we'll help you take the first step - by phone, text, or online. All new-patient consultations are complimentary."
        gallery={[
          "/images/contact/IMG_5949.jpeg",
          "/images/contact/IMG_7311.jpeg",
        ]}
      />

      <ContactFormSection />

      {/* Working hours - one card per clinic, mirrors the footer exactly */}
      <section className="relative overflow-hidden bg-revival-cream py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-tagline text-xs text-revival-gold">
              Working Hours
            </span>
            <h2
              className="mt-3 font-heading font-medium leading-[1.1] text-revival-dark"
              style={{ fontSize: "clamp(1.9rem, 3.2vw, 2.75rem)" }}
            >
              When we&apos;re open
            </h2>
            <p className="mt-5 text-base font-light text-revival-charcoal/80 sm:text-lg">
              Two Las Vegas locations, same weekly schedule.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-2">
            {CLINICS.map((c) => (
              <article
                key={c.name}
                className="relative overflow-hidden rounded-[1.75rem] border border-revival-gold/20 bg-white p-6 shadow-sm sm:p-8"
              >
                <header>
                  <p className="text-tagline text-[0.65rem] text-revival-gold">
                    {c.shortLabel}
                  </p>
                  <h3 className="mt-2 font-heading text-xl text-revival-dark sm:text-2xl">
                    {c.name}
                  </h3>
                  <a
                    href={c.mapHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-start gap-2 text-sm font-light leading-relaxed text-revival-charcoal/80 transition-colors hover:text-revival-gold"
                  >
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-revival-gold" />
                    {c.address}
                  </a>
                  <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1.5">
                    {c.phones.map((p) => (
                      <a
                        key={p}
                        href={telHref(p)}
                        className="inline-flex items-center gap-2 text-sm font-light text-revival-charcoal/80 transition-colors hover:text-revival-gold"
                      >
                        <Phone className="h-4 w-4 shrink-0 text-revival-gold" />
                        {p}
                      </a>
                    ))}
                  </div>
                </header>

                <div className="mt-6 border-t border-revival-gold/15 pt-5">
                  <p className="mb-3 inline-flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-revival-gold">
                    <Clock className="h-3.5 w-3.5" />
                    Weekly Hours
                  </p>
                  <ul>
                    {c.hours.map((h) => (
                      <li
                        key={h.day}
                        className="flex items-center justify-between border-b border-revival-dark/5 py-2 last:border-b-0"
                      >
                        <span className="font-heading text-sm text-revival-dark sm:text-base">
                          {h.day}
                        </span>
                        <span className="text-sm font-light text-revival-charcoal/80">
                          {h.hours}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <MapSection />
    </>
  );
}
