import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { organizationSchema, websiteSchema, jsonLd } from "@/lib/schema";
import { getDisplayedGoogleReviews } from "@/lib/google-reviews";
import { isFiveStarReview } from "@/lib/reviews";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StickyBookBar from "@/components/layout/StickyBookBar";
import AccessibilityToolbarLoader from "@/components/layout/AccessibilityToolbarLoader";
import ChatWidgetLoader from "@/components/layout/ChatWidgetLoader";
import MainWrapper from "@/components/layout/MainWrapper";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://revivalhealthandwellnessgroup.com"),
  title: {
    default: "Revival Health & Wellness | Weight Loss & Aesthetic Solutions",
    template: "%s | Revival Health & Wellness",
  },
  description:
    "Revival Health and Wellness is a premier center specializing in weight loss, hormone replacement therapy, body contouring, and aesthetics in Las Vegas, NV.",
  keywords: [
    "weight loss Las Vegas",
    "hormone therapy Las Vegas",
    "medical spa Las Vegas",
    "GLP-1 Las Vegas",
    "botox Las Vegas",
    "Revival Health and Wellness",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://revivalhealthandwellnessgroup.com",
    siteName: "Revival Health & Wellness",
    images: [{ url: "/images/home/approach-2.jpg", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://revivalhealthandwellnessgroup.com" },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { reviews, meta } = await getDisplayedGoogleReviews();

  const organization = organizationSchema();
  organization.aggregateRating = {
    "@type": "AggregateRating",
    ratingValue: meta.rating.toString(),
    reviewCount: meta.reviewCount.toString(),
    bestRating: "5",
  };

  const fiveStarReviews = reviews.filter(isFiveStarReview);
  if (fiveStarReviews.length > 0) {
    organization.review = fiveStarReviews.map((r) => ({
      "@type": "Review",
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
        bestRating: "5",
      },
      author: { "@type": "Person", name: r.name },
      reviewBody: r.quote,
    }));
  }

  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-revival-cream text-revival-dark">
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-6REXCNJ8Z3"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-6REXCNJ8Z3');
          `}
        </Script>
        <Script id="ms-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "yj6ncqme21");
          `}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: jsonLd([organization, websiteSchema()]),
          }}
        />
        <Header />
        <MainWrapper>{children}</MainWrapper>
        <Footer />
        <StickyBookBar />
        <AccessibilityToolbarLoader />
        <ChatWidgetLoader />
      </body>
    </html>
  );
}
