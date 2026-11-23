import { cmsPageMetadata } from "@/lib/cms/generateMeta";
import Script from "next/script";
import { buildMetadata } from "@/lib/metadata";
import { breadcrumbSchema, jsonLd } from "@/lib/schema";
import PageHero from "@/components/ui/PageHero";
import CTABanner from "@/components/ui/CTABanner";
import { RelatedServices } from "@/components/templates/HormoneSections";

const TITLE = "Patient Financing with Cherry";
const PATH = "/cherry/";
const DESCRIPTION =
  "Pay for your favorite treatments over time with Cherry. Revival Health and Wellness offers easy payment plans so you can reach your health and beauty goals.";

const APPLY_HREF = "https://pay.withcherry.com/revivalhw";
const ACCOUNT_HREF = "https://pay.withcherry.com/account";

export async function generateMetadata() {
  const fallback = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  images: ["/images/aesthetics/close-beauty-portrait-serum.webp"],
});
  return cmsPageMetadata(fallback);
}

const CHERRY_INIT = `
_hw("init", {
  debug: false,
  variables: {
    slug: 'revivalhw',
    name: 'Revival Health and Wellness',
    images: [26],
    customLogo: '',
    defaultPurchaseAmount: 750,
    customImage: '',
    imageCategory: 'medspa',
    language: 'en'
  },
  styles: {
    primaryColor: '#c09a23',
    secondaryColor: '#c09a2310',
    fontFamily: 'Montserrat',
    headerFontFamily: 'Montserrat'
  }
}, ['hero','calculator','howitworks','faq']);
`;

export default function CherryPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd([
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Patient Financing with Cherry", path: PATH },
            ]),
          ]),
        }}
      />

      {/* Google Fonts required by Cherry widget */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@200..900&family=Slabo+27px:wght@200..900&family=Lato:wght@200..900&family=Raleway:wght@200..900&family=Montserrat:wght@200..900&family=Oswald:wght@200..900&family=Poppins:wght@200..900&family=Source+Sans+Pro:wght@200..900&family=PT+Sans:wght@200..900&family=Open+Sans:wght@200..900&display=swap"
      />

      {/* Cherry widget queue setup (must exist before widget.js loads) */}
      <Script id="cherry-queue" strategy="beforeInteractive">
        {`window._hw = window._hw || function(){(window._hw.q = window._hw.q || []).push(arguments);};`}
      </Script>

      {/* Cherry SDK */}
      <Script
        id="cherry-sdk"
        src="https://files.withcherry.com/widgets/widget.js"
        strategy="afterInteractive"
      />

      {/* Cherry init call */}
      <Script id="cherry-init" strategy="afterInteractive">
        {CHERRY_INIT}
      </Script>

      <PageHero
        eyebrow={"Patient Financing · Cherry"}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Cherry Financing" },
        ]}
        title={
          <>
            Treat now,{" "}
            <span className="relative inline-block italic text-revival-gold">
              pay later
              <span
                aria-hidden
                className="absolute -bottom-2 left-0 h-[3px] w-full bg-gradient-to-r from-revival-gold to-transparent"
              />
            </span>
          </>
        }
        description="Pay for your favorite Revival Health and Wellness treatments over time with Cherry - flexible plans, 0% APR options, no hard credit check, and 60-second approvals up to $50,000."
        primary={{ label: "See If You Qualify", href: APPLY_HREF, external: true }}
        secondary={{ label: "Manage Your Account", href: ACCOUNT_HREF, external: true }}
        gallery={[
          "/images/aesthetics/close-beauty-portrait-serum.webp",
          "/images/emsculpt-neo/emsculpt-neo-female-model.jpg",
        ]}
        compact
      />

      {/* ─── Cherry Widget mount points ────────────────────────────────
          The Cherry SDK reads these element IDs and injects its hero,
          calculator, how-it-works, testimony, and FAQ sections into
          them at runtime. Do not remove the IDs or their order.
      ─────────────────────────────────────────────────────────────── */}
      <section className="cherry-widget-root relative bg-revival-warm-white">
        <div id="all" />
        <div id="hero" />
        <div id="calculator" />
        <div id="howitworks" />
        <div id="testimony" />
        <div id="faq" />
      </section>

      {/* Fine print - required by Cherry compliance */}
      <section className="relative bg-revival-cream py-14">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-revival-gold/15 bg-white/70 p-6 text-xs font-light leading-relaxed text-revival-charcoal/75 sm:p-8">
            <p>
              These are examples only. 0% APR and other promotional rates
              subject to eligibility. Exact terms and APR depend on credit
              score and other factors. For example, a $400 payment plan with
              Cherry may cost $100/month over 3 months at 0% APR with down
              payment in the amount of monthly payment due at the time of
              purchase. Not every provider that uses Cherry will offer the
              payment plan terms listed above.
            </p>
            <p className="mt-4">
              Payment options through Cherry Technologies, Inc. are issued by
              the following lending partners:{" "}
              <a
                href="https://withcherry.com/lending-partners"
                target="_blank"
                rel="noopener noreferrer"
                className="text-revival-gold underline decoration-revival-gold/40 hover:text-revival-dark"
              >
                withcherry.com/lending-partners
              </a>
              . See{" "}
              <a
                href="https://withcherry.com/terms"
                target="_blank"
                rel="noopener noreferrer"
                className="text-revival-gold underline decoration-revival-gold/40 hover:text-revival-dark"
              >
                withcherry.com/terms
              </a>{" "}
              for details. Iowa only: Borrowers are subject to Iowa state
              specific underwriting criteria. APR for all Iowa borrowers is
              capped at 20.99%.
            </p>
            <p className="mt-4">
              Cherry is committed to making their product accessible. For
              their accessibility statement and feedback form, see{" "}
              <a
                href="https://withcherry.com/accessibility"
                target="_blank"
                rel="noopener noreferrer"
                className="text-revival-gold underline decoration-revival-gold/40 hover:text-revival-dark"
              >
                withcherry.com/accessibility
              </a>
              .
            </p>
            <p className="mt-4">
              Copyright © 2020–2026 Cherry Technologies Inc. NMLS #2061234, 2
              Embarcadero Center, 8th Floor, San Francisco, CA 94111.
            </p>
          </div>
        </div>
      </section>

      <RelatedServices
        items={[
          {
            label: "Aesthetics Overview",
            href: "/aesthetics/",
            blurb:
              "Browse every aesthetic treatment eligible for Cherry financing - Botox, filler, lasers, threads, and more.",
          },
          {
            label: "Weight Loss Program",
            href: "/weight-loss/",
            blurb:
              "GLP-1s, phentermine, and coaching - pair with Cherry to spread the cost of your transformation.",
          },
          {
            label: "Hormone Therapy",
            href: "/hormone-therapy/",
            blurb:
              "Restore energy, mood, and vitality with medically-supervised HRT - Cherry-eligible.",
          },
        ]}
      />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-14 lg:px-8">
        <CTABanner
          title="Ready to book - with a payment plan that fits?"
          subtitle="Apply for Cherry in 60 seconds, then book your Revival Health and Wellness consultation."
          primaryLabel="See If You Qualify"
          primaryHref={APPLY_HREF}
        />
      </div>
    </>
  );
}
