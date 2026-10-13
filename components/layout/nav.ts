/** Shared navigation data for the header, mobile menu, and footer. */

export type NavLeaf = {
  label: string;
  href: string;
  external?: boolean;
};

export type NavChild = NavLeaf & {
  /** Optional third-level links (renders as a grouped mega-menu column). */
  children?: NavLeaf[];
};

export type NavItem = {
  label: string;
  href: string;
  external?: boolean;
  children?: NavChild[];
};

/**
 * Primary navigation, mirrors the live site menu exactly:
 * https://revivalhealthandwellnessgroup.com/
 */
export const PRIMARY_NAV: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Weight Loss",
    href: "/weight-loss/",
    children: [
      { label: "GLP-1", href: "/glp-1/" },
      { label: "Phentermine", href: "/phentermine/" },
      { label: "Vitamin Injections", href: "/vitamin-injections/" },
    ],
  },
  {
    label: "Hormone Therapy",
    href: "/hormone-therapy/",
    children: [
      { label: "Women’s Hormone Therapy", href: "/womens-hormone-therapy/" },
      { label: "Men’s Hormone Therapy", href: "/mens-hormone-therapy/" },
      {
        label: "Growth Hormone Optimization",
        href: "/growth-hormone-optimization/",
      },
    ],
  },
  {
    label: "Sexual Wellness",
    href: "/sexual-wellness/",
    children: [
      {
        label: "Men",
        href: "/men/",
        children: [
          { label: "P shot TM", href: "/p-shot-tm/" },
          { label: "Gainswave TM", href: "/gainswave-tm/" },
          { label: "P-Long", href: "/p-long/" },
          { label: "Viagra", href: "/viagra/" },
          { label: "Trimix", href: "/trimix/" },
          { label: "Priapus Toxin", href: "/priapus-toxin/" },
          { label: "Emsella", href: "/emsella/" },
        ],
      },
      {
        label: "Women",
        href: "/women/",
        children: [
          { label: "O shot TM", href: "/o-shot-tm/" },
          { label: "GainswaveTM for her", href: "/gainswavetm-for-her/" },
          { label: "Emsella", href: "/emsella-2/" },
        ],
      },
    ],
  },
  {
    label: "Aesthetics",
    href: "/aesthetics/",
    children: [
      { label: "Aesthetics Overview", href: "/aesthetics/" },
      { label: "Aura 3D Imaging", href: "/aura-3d/" },
      { label: "Botox", href: "/botox/" },
      { label: "Dysport", href: "/dysport/" },
      { label: "Xeomin", href: "/xeomin/" },
      { label: "Derma Filler", href: "/derma-filler/" },
      { label: "Kybella", href: "/kybella/" },
      { label: "Sculptra", href: "/sculptra/" },
      {
        label: "Body Contouring, Sculpting and Skin",
        href: "/skin/",
        children: [
          { label: "Skin Overview", href: "/skin/" },
          { label: "ONDA Pro Cellulite Removal", href: "/onda-pro/" },
          {
            label: "Everesse RF Skin Tightening",
            href: "/everesse-rf-skin-tightening-and-rejuvenation/",
          },
          { label: "XERF Skin, Sculpting & Lifting", href: "/xerf/" },
          { label: "Emsculpt Neo", href: "/emsculpt-neo/" },
          { label: "Microneedling", href: "/microneedling/" },
          { label: "Under Eye Treatment", href: "/under-eye-treatment/" },
          { label: "PDO Thread Lifts", href: "/pdo-thread-lifts/" },
          { label: "Scar Camouflage", href: "/scar-camouflage/" },
          { label: "CO2 Laser Treatments", href: "/co2-laser-treatments/" },
          { label: "Deka Tetra Pro CO2 Laser", href: "/tetra-pro-co2-laser/" },
        ],
      },
      {
        label: "Hair",
        href: "/hair/",
        children: [
          { label: "Hair Overview", href: "/hair/" },
          { label: "PRP Hair Restoration", href: "/prp-hair-restoration/" },
          { label: "Finasteride", href: "/finasteride/" },
        ],
      },
    ],
  },
  {
    label: "Telehealth",
    href: "/telehealth/",
  },
  {
    label: "More",
    href: "/about-us/",
    children: [
      { label: "About Us", href: "/about-us/" },
      { label: "Blogs", href: "/blogs/" },
      { label: "Patient Financing (Cherry)", href: "/cherry/" },
      { label: "Contact Us", href: "/contact-us/" },
      { label: "Areas We Serve", href: "/areas-we-serve/" },
    ],
  },
];

/**
 * Kept for backwards compatibility. Items now live inside the primary
 * "More" dropdown so the header renders on a single row.
 */
export const SECONDARY_NAV: NavLeaf[] = [];

/** Primary call-to-action (Zenoti booking). */
export const CTA = {
  label: "Book Free Consultation",
  href: "https://revivalhealth.zenoti.com/webstorenew",
  external: true,
} as const;
