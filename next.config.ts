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
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "**.public.blob.vercel-storage.com" },
      { protocol: "https", hostname: "**.blob.vercel-storage.com" },
    ],
  },
  outputFileTracingExcludes: {
    "/*": ["./public/images/**", "./public/**/*.mp4", "./public/**/*.webm"],
  },
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

export default nextConfig;
