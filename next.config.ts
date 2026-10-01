import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

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
    ];
  },
};

export default withPayload(nextConfig, { devBundleServerPackages: false });
