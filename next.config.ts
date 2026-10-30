import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

import { wpLegacyRedirects } from "./lib/seo/wp-legacy-redirects";

const nextConfig: NextConfig = {
  // Mirror the live site: every URL ends with a trailing slash.
  trailingSlash: true,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 90, 100],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "revivalhealthandwellnessgroup.com",
        pathname: "/wp-content/uploads/**",
      },
      { protocol: "https", hostname: "**.revivalhealthandwellnessgroup.com" },
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
        pathname: "/**",
      },
    ],
  },
  outputFileTracingExcludes: {
    "/*": ["./public/images/**", "./public/**/*.mp4", "./public/**/*.webm"],
  },
  outputFileTracingIncludes: {
    "/*": [
      "./node_modules/sharp/**/*",
      "./node_modules/@img/sharp-linux-x64/**/*",
      "./node_modules/@img/sharp-libvips-linux-x64/**/*",
    ],
  },
  serverExternalPackages: [
    "pg",
    "@payloadcms/db-vercel-postgres",
    "@neondatabase/serverless",
    "@vercel/postgres",
  ],
  poweredByHeader: false,
  async redirects() {
    return [
      // Consolidated: the two standalone CoolPeel pages now live inside the
      // main /co2-laser-treatments/ page (CoolPeel® vs. DEKA Tetra Pro).
      {
        source: "/coolpeel",
        destination: "/co2-laser-treatments/",
        permanent: true,
      },
      {
        source: "/coolpeel-laser",
        destination: "/co2-laser-treatments/",
        permanent: true,
      },
      // Renamed to match the ONDA Pro brand name.
      {
        source: "/octopro-onda",
        destination: "/onda-pro/",
        permanent: true,
      },
      // WordPress sitemaps still submitted in Search Console.
      ...[
        "/sitemap_index.xml",
        "/page-sitemap.xml",
        "/wp-sitemap.xml",
        "/post-sitemap.xml",
      ].map((source) => ({
        source,
        destination: "/sitemap.xml",
        permanent: true,
      })),
      ...wpLegacyRedirects,
    ];
  },
};

export default withPayload(nextConfig, { devBundleServerPackages: false });
