import type { MetadataRoute } from "next";
import { SITE } from "@/lib/metadata";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // /sample-page/ and /title/ used to be disallowed. They now 308 to /,
      // so crawlers must be allowed to request them and see the redirect.
    },
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
