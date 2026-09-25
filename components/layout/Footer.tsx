"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { MapPin, Phone, Printer, Clock, ArrowRight } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import { motion } from "framer-motion";

/* ── Footer link data ──────────────────────────────────────────────────── */

const QUICK_LINKS = [
  { label: "Home", href: "/home/" },
  { label: "Weight Loss", href: "/weight-loss/" },
  { label: "Hormone Therapy", href: "/hormone-therapy/" },
  { label: "Sexual Wellness for Men", href: "/men/" },
  { label: "Sexual Wellness for Women", href: "/women/" },
  { label: "IV Hydration", href: "/iv-hydration/" },
];

const AESTHETIC_LINKS = [
  { label: "Aesthetics", href: "/aesthetics/" },
  { label: "Skin", href: "/skin/" },
  { label: "Hair", href: "/hair/" },
  { label: "Telehealth", href: "/telehealth/" },
];

const COMPANY_LINKS = [
  { label: "About Us", href: "/about-us/" },
  { label: "Areas We Serve", href: "/areas-we-serve/" },
  { label: "Contact Us", href: "/contact-us/" },
  {
    label: "Book Now",
    href: "https://revivalhealth.zenoti.com/webstoreNew",
    external: true,
  },
  { label: "Blogs", href: "/blogs/" },
  { label: "Patient Financing (Cherry)", href: "/cherry/" },
  { label: "Sitemap", href: "/sitemap-page/" },
  { label: "Privacy Policy", href: "/privacy-policy/" },
  {
    label: "Zenoti's Privacy",
    href: "https://www.zenoti.com/trust/privacy-notice",
    external: true,
  },
];

import { CLINICS, telHref } from "@/lib/content/clinics";

const LOCATIONS = CLINICS.map((c) => ({
  name: c.name,
  address: c.address,
  mapHref: c.mapHref,
  phones: c.phones.map((p) => ({ label: p, href: telHref(p) })),
  fax: c.fax,
  hours: c.hours,
}));

/** Compact day labels for the narrow footer column. */
function shortDay(day: string): string {
  return day
    .replace(/Monday/g, "Mon")
    .replace(/Tuesday/g, "Tue")
    .replace(/Wednesday/g, "Wed")
    .replace(/Thursday/g, "Thu")
    .replace(/Friday/g, "Fri")
    .replace(/Saturday/g, "Sat")
    .replace(/Sunday/g, "Sun")
    .replace(/\s-\s/g, "\u2013");
}

/** Compact hour labels for the narrow footer column. */
function shortHours(hours: string): string {
  return hours
    .replace(/\s?AM/g, "AM")
    .replace(/\s?PM/g, "PM")
    .replace(/\sto\s/g, "\u2013")
    .replace(/By appointment only/i, "By appt only");
}

const SOCIAL_LINKS = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/RevivalHealthAndWellness",
    Icon: FacebookIcon,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/revival.healthandwellness/",
    Icon: InstagramIcon,
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@revival.lv",
    Icon: TikTokIcon,
  },
];

const LEGITSCRIPT_HREF =
  "https://www.legitscript.com/websites/?checker_keywords=revivalhealthandwellnessgroup.com";

/* ── Component ──────────────────────────────────────────────────────────── */

export default function Footer() {
  const pathname = usePathname();
  const isHomepage = pathname === "/";

  // Ads landing pages (/lp/*) render their own minimal footer (see
  // components/lp/LPFooter.tsx) instead of the full site footer.
  if (pathname?.startsWith("/lp")) return null;

  return (
    <footer id="site-footer" className="bg-revival-dark text-revival-warm-white">
      {/* Pre-footer CTA strip — homepage only */}
      {isHomepage && (
        <AnimatedSection
          as="div"
          variants={fadeInUp}
          className="bg-revival-charcoal"
        >
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 py-12 text-center sm:px-6 md:flex-row md:text-left lg:px-8">
            <div>
              <h2 className="text-3xl text-revival-warm-white md:text-4xl">
                Ready to Transform?
              </h2>
              <p className="mt-2 text-revival-warm-white/70">
                Book your free consultation and start your revival today.
              </p>
            </div>
            <a
              href="https://revivalhealth.zenoti.com/webstorenew"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-revival-gold px-7 py-3.5 text-sm font-medium text-revival-dark transition-transform duration-200 hover:scale-105 hover:bg-revival-gold-light"
            >
              Book Free Consultation
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </AnimatedSection>
      )}

      {/* Gold gradient top divider */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-revival-gold/60 to-transparent" />

      {/* Main footer grid */}
      <AnimatedSection
        as="div"
        variants={staggerContainer}
        className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-12 lg:px-8"
      >
        {/* Col 1, Brand */}
        <motion.div variants={fadeInUp} className="lg:col-span-3">
          <Link
            href="/"
            className="flex items-center gap-3"
            aria-label="Revival Health & Wellness home"
          >
            <Image
              src="/images/brand/logo.png"
              alt="Revival Health & Wellness"
              width={221}
              height={300}
              className="h-12 w-auto object-contain"
            />
            <span className="flex flex-col leading-none">
              <span className="font-heading text-xl font-medium uppercase tracking-[0.18em] text-revival-warm-white sm:text-2xl">
                Revival
              </span>
              <span className="mt-1 text-[0.6rem] font-light uppercase tracking-[0.35em] text-revival-gold">
                Health &amp; Wellness
              </span>
            </span>
          </Link>
          <p className="mt-5 max-w-xs font-heading text-lg leading-snug text-revival-warm-white/85">
            Revival Health and Wellness – A Modern Approach to Healing &amp;
            Vitality
          </p>

          {/* Newsletter (Webflow form endpoint, preserve hidden fields) */}
          <form
            name="email-form"
            method="post"
            action="https://revivalhealthandwellnessgroup.com/"
            className="mt-6 flex w-full max-w-sm overflow-hidden rounded-full border border-revival-gold/30 bg-revival-charcoal"
          >
            <input type="hidden" name="form-name" value="email-form" />
            <input type="hidden" name="ms" value="" />
            <label htmlFor="footer-email" className="sr-only">
              Email address
            </label>
            <input
              id="footer-email"
              type="email"
              name="email"
              required
              placeholder="Enter your email"
              className="min-w-0 flex-1 bg-transparent px-5 py-3 text-sm text-revival-warm-white placeholder:text-revival-warm-white/40 focus:outline-none"
            />
            <button
              type="submit"
              className="shrink-0 whitespace-nowrap bg-revival-gold px-5 text-sm font-medium text-revival-dark transition-colors hover:bg-revival-gold-light"
            >
              Subscribe
            </button>
          </form>

          {/* LegitScript badge */}
          <a
            href={LEGITSCRIPT_HREF}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LegitScript Certified"
            className="mt-6 inline-flex items-center rounded-lg bg-white/95 p-2 shadow-sm transition-transform duration-200 hover:scale-[1.03]"
          >
            <Image
              src="/images/logos/legit-script.png"
              alt="LegitScript Certified"
              width={292}
              height={316}
              className="h-16 w-auto"
            />
          </a>

          {/* Social links */}
          <div className="mt-6 flex items-center gap-3">
            {SOCIAL_LINKS.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="group flex h-10 w-10 items-center justify-center rounded-full border border-revival-gold/40 text-revival-gold transition-colors duration-200 hover:bg-revival-gold hover:text-revival-dark"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </motion.div>

        {/* Col 2, Quick Links */}
        <motion.div variants={fadeInUp} className="lg:col-span-2">
          <FooterHeading>Quick Links</FooterHeading>
          <FooterLinks links={QUICK_LINKS} />
        </motion.div>

        {/* Col 3, Aesthetic Services */}
        <motion.div variants={fadeInUp} className="lg:col-span-2">
          <FooterHeading>Aesthetic Services</FooterHeading>
          <FooterLinks links={AESTHETIC_LINKS} />
        </motion.div>

        {/* Col 4, Company */}
        <motion.div variants={fadeInUp} className="lg:col-span-2">
          <FooterHeading>Company</FooterHeading>
          <FooterLinks links={COMPANY_LINKS} />
        </motion.div>

        {/* Col 5, Locations */}
        <motion.div variants={fadeInUp} className="lg:col-span-3">
          <FooterHeading>Locations</FooterHeading>
          <div className="space-y-6">
            {LOCATIONS.map((loc) => (
              <div key={loc.name} className="text-sm font-light">
                <p className="font-heading text-base text-revival-gold">
                  {loc.name}
                </p>
                <a
                  href={loc.mapHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 flex items-start gap-2 text-revival-warm-white/75 transition-colors hover:text-revival-gold"
                >
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-revival-gold" />
                  {loc.address}
                </a>
                {loc.phones.map((phone) => (
                  <a
                    key={phone.href}
                    href={phone.href}
                    className="mt-1.5 flex items-center gap-2 text-revival-warm-white/75 transition-colors hover:text-revival-gold"
                  >
                    <Phone className="h-4 w-4 shrink-0 text-revival-gold" />
                    {phone.label}
                  </a>
                ))}
                {loc.fax ? (
                  <span className="mt-1.5 flex items-center gap-2 text-revival-warm-white/75">
                    <Printer className="h-4 w-4 shrink-0 text-revival-gold" />
                    Fax: {loc.fax}
                  </span>
                ) : null}
                <div className="mt-3">
                  <p className="flex items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-revival-gold">
                    <Clock className="h-3.5 w-3.5" />
                    Hours
                  </p>
                  <ul className="mt-1.5 space-y-0.5 text-[0.72rem] leading-snug">
                    {loc.hours.map((h) => (
                      <li
                        key={h.day}
                        className="flex items-baseline justify-between gap-3 whitespace-nowrap"
                      >
                        <span className="font-semibold text-revival-warm-white/80">
                          {shortDay(h.day)}
                        </span>
                        <span className="text-revival-warm-white/60">
                          {shortHours(h.hours)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </AnimatedSection>

      {/* Bottom bar */}
      <div className="border-t border-revival-warm-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-6 text-center text-xs font-light text-revival-warm-white/55 sm:flex-row sm:px-6 lg:px-8">
          <p>
            © Revival Health &amp; Wellness. All Rights Reserved{" "}
            {new Date().getFullYear()}
          </p>
          <p>
            Powered By{" "}
            <a
              href="https://www.modfxmedia.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-revival-gold transition-colors hover:text-revival-gold-light"
            >
              ModfxFXMedia
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ── Sub-components ─────────────────────────────────────────────────────── */

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-revival-gold">
      {children}
    </h3>
  );
}

function FooterLinks({
  links,
}: {
  links: { label: string; href: string; external?: boolean }[];
}) {
  return (
    <ul className="space-y-2.5">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            target={link.external ? "_blank" : undefined}
            rel={link.external ? "noopener noreferrer" : undefined}
            className="text-sm font-light text-revival-warm-white/75 transition-colors hover:text-revival-gold"
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

/* ── Brand icons (lucide-react dropped these) ──────────────────────────── */

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z" />
    </svg>
  );
}

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x={2} y={2} width={20} height={20} rx={5} ry={5} />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1={17.5} y1={6.5} x2={17.51} y2={6.5} />
    </svg>
  );
}

function TikTokIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M16.5 5.5a4.5 4.5 0 0 0 4 2.3v3a7.5 7.5 0 0 1-4-1.2v5.9a5.5 5.5 0 1 1-5.5-5.5c.28 0 .55.02.82.06v3.1a2.5 2.5 0 1 0 1.68 2.36V2.5h3a4.5 4.5 0 0 0 0 .02z" />
    </svg>
  );
}
