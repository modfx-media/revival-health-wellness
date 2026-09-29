import { telHref } from "@/lib/content/clinics";

type GtagReportConversion = (url?: string) => boolean;

/**
 * Fires the Google Ads "click to call" conversion (defined inline on the
 * /lp/p-long-gads/* pages as window.gtag_report_conversion) before
 * navigating to the tel: link. Falls back to a plain navigation if the
 * conversion script hasn't loaded yet.
 */
export function reportPhoneClickConversion(phone: string) {
  const url = telHref(phone);
  const fn = (window as unknown as { gtag_report_conversion?: GtagReportConversion })
    .gtag_report_conversion;
  if (typeof fn === "function") {
    fn(url);
  } else {
    window.location.href = url;
  }
}
