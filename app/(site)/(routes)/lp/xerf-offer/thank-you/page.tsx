import { cmsPageMetadata } from "@/lib/cms/generateMeta";
import type { Metadata } from "next";
import Script from "next/script";
import { buildMetadata } from "@/lib/metadata";
import LPHeader from "@/components/lp/LPHeader";
import LPFooter from "@/components/lp/LPFooter";
import XerfThankYouContent from "@/components/lp/XerfThankYouContent";
import MapSection from "@/components/layout/MapSection";

export async function generateMetadata() {
  const fallback = buildMetadata({
  title: "Thank You",
  description: "Thank you for requesting your free XERF consultation.",
  path: "/lp/xerf-offer/thank-you/",
  noIndex: true,
});
  return cmsPageMetadata(fallback);
}

export default function XerfOfferThankYouPage() {
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
      <Script id="meta-pixel-lead" strategy="afterInteractive">
        {`fbq('track', 'Lead');`}
      </Script>
      <LPHeader phone="+1 725-257-5596" />
      <XerfThankYouContent />
      <MapSection only="summerlin-nw" hidePhone />
      <LPFooter phone="+1 725-257-5596" />
    </>
  );
}
