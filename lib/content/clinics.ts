/**
 * Single source of truth for the two physical Revival Health & Wellness
 * clinics — used by the Footer, Contact page, MapSection, and anywhere
 * office hours or phone numbers need to render consistently.
 */

export type ClinicHours = { day: string; hours: string };

export type Clinic = {
  /** Short label used for phone chips in the header, e.g. "Henderson / SW". */
  shortLabel: string;
  /** Full display name, e.g. "Henderson / Southwest". */
  name: string;
  address: string;
  /** Google Maps URL for the location card. */
  mapHref: string;
  /** Primary phone. `phones[0]` drives the header icon-only call button. */
  phones: string[];
  /** Optional fax. */
  fax?: string;
  /** Structured per-day hours for this location. */
  hours: ClinicHours[];
};

export const CLINICS: Clinic[] = [
  {
    shortLabel: "Henderson / SW",
    name: "Henderson / Southwest",
    address: "7220 S. Cimarron Road, Suite #140, Las Vegas, Nevada 89113",
    mapHref:
      "https://www.google.com/maps/place/Revival+Health+and+Wellness/@36.0569688,-115.2693326,15z/",
    phones: ["(702) 963-1154", "(702) 475-4621"],
    fax: "(702) 475-4621",
    hours: [
      { day: "Monday", hours: "9 AM to 2 PM" },
      { day: "Tuesday - Thursday", hours: "9 AM to 7 PM" },
      { day: "Friday & Saturday", hours: "By appointment only" },
      { day: "Sunday", hours: "Closed" },
    ],
  },
  {
    shortLabel: "Summerlin / NW",
    name: "Summerlin / Northwest",
    address: "2585 Box Canyon Drive, Suite #150, Las Vegas, Nevada 89128",
    mapHref:
      "https://www.google.com/maps/dir//2585+Box+Canyon+Dr+Suite+150+Las+Vegas,+NV+89128/",
    phones: ["(702) 725-1588"],
    fax: "(702) 475-4621",
    hours: [
      { day: "Monday - Thursday", hours: "By appointment only" },
      { day: "Friday & Saturday", hours: "9 AM to 3 PM" },
      { day: "Sunday", hours: "Closed" },
    ],
  },
];

/** Normalized `tel:` href for a phone string like "(702) 963-1154". */
export const telHref = (phone: string) =>
  `tel:${phone.replace(/[^\d]/g, "")}`;
