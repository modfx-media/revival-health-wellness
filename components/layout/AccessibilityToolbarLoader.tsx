"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Lazy-loads the vanilla accessibility toolbar (public/accessibility/*)
 * after the page has finished its initial paint. The toolbar renders its
 * own DOM, so this component intentionally returns null.
 * Skipped on /onda-pro ad LP (no off-page or chrome links).
 */
export default function AccessibilityToolbarLoader() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (pathname?.startsWith("/onda-pro")) return;

    const CSS_ID = "revival-a11y-css";
    const JS_ID = "revival-a11y-js";

    const mount = () => {
      if (!document.getElementById(CSS_ID)) {
        const link = document.createElement("link");
        link.id = CSS_ID;
        link.rel = "stylesheet";
        link.href = "/accessibility/toolbar.css";
        document.head.appendChild(link);
      }
      if (!document.getElementById(JS_ID)) {
        const script = document.createElement("script");
        script.id = JS_ID;
        script.src = "/accessibility/toolbar.js";
        script.defer = true;
        document.body.appendChild(script);
      }
    };

    const idle =
      (window as unknown as { requestIdleCallback?: (cb: () => void) => number })
        .requestIdleCallback;
    if (typeof idle === "function") {
      idle(mount);
    } else {
      window.setTimeout(mount, 1200);
    }
  }, [pathname]);

  return null;
}
