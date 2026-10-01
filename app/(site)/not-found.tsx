import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-6 py-28 text-center">
      <p className="text-tagline text-gold">404</p>
      <h1 className="mt-4 text-4xl text-revival-dark">We could not find that page</h1>
      <p className="mt-4 text-revival-charcoal">
        The address may have changed. Head back to the clinic homepage and choose a service from there.
      </p>
      <Link href="/" className="mt-8 text-gold underline">
        Back to home
      </Link>
    </div>
  );
}
