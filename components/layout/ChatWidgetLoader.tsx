"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";

/**
 * Loads the third-party knock-knock chat widget site-wide.
 * Skipped on /onda-pro ad LP (no off-page navigation). /lp/* keeps the widget.
 */
export default function ChatWidgetLoader() {
  const pathname = usePathname();
  if (pathname?.startsWith("/onda-pro")) return null;

  return (
    <Script id="knock-knock-widget" strategy="afterInteractive">
      {`window.company_id = '6a44d224fb43c2761cd335f0';
var newScript = document.createElement('script');
newScript.src = 'https://api.knock-knockapp.com/widget/widget.js';
document.getElementsByTagName('HEAD')[0].appendChild(newScript);`}
    </Script>
  );
}
