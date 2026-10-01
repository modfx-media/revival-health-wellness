import { cmsPageMetadata } from "@/lib/cms/generateMeta";
import type { Metadata } from "next";
import Script from "next/script";
import { buildMetadata } from "@/lib/metadata";
import LPHeader from "@/components/lp/LPHeader";
import LPFooter from "@/components/lp/LPFooter";
import XerfOfferLanding from "@/components/lp/XerfOfferLanding";

// Ads-only landing page for Meta campaigns - intentionally excluded from
// app/sitemap.ts and marked noindex so it never competes with the organic
// /xerf/ service page in search.
export async function generateMetadata() {
  const fallback = buildMetadata({
  title: "XERF Skin Tightening: Free Consultation",
  description:
    "Lift, firm, and tighten your skin with XERF, no needles, no numbing, no downtime. Pricing for the first 10 patients. Book your free consultation.",
  path: "/lp/xerf-offer/",
  noIndex: true,
});
  return cmsPageMetadata(fallback);
}

export default function XerfOfferLandingPage() {
  return (
    <>
      {/* Meta Pixel Code */}
      <Script id="meta-pixel" strategy="afterInteractive">
        {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '1311659487282934');
fbq('track', 'PageView');`}
      </Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src="https://www.facebook.com/tr?id=1311659487282934&ev=PageView&noscript=1"
          alt=""
        />
      </noscript>
      {/* End Meta Pixel Code */}
      <LPHeader phone="+1 725-257-5596" />
      <XerfOfferLanding />
      <LPFooter phone="+1 725-257-5596" />
    </>
  );
}
