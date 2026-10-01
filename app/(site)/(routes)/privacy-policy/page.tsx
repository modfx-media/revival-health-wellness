import { cmsPageMetadata } from "@/lib/cms/generateMeta";
import { buildMetadata } from "@/lib/metadata";

export async function generateMetadata() {
  const fallback = buildMetadata({
  title: "Privacy Policy",
  description:
    "How Revival Health & Wellness collects, uses, and protects your personal information.",
  path: "/privacy-policy",
  noIndex: true,
});
  return cmsPageMetadata(fallback);
}

export default function PrivacyPolicyPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
      <h1 className="text-4xl text-revival-dark">Privacy Policy</h1>
      <p className="mt-4 text-sm text-revival-charcoal/60">
        Last updated: {new Date().getFullYear()}
      </p>
      <div className="prose mt-8 max-w-none text-revival-charcoal/85">
        <p>
          This privacy policy describes how Revival Health &amp; Wellness
          (&quot;we&quot;, &quot;us&quot;) collects, uses, and protects the
          information you provide when using our website and services.
        </p>
        <h2 className="mt-8 text-2xl text-revival-dark">
          Information We Collect
        </h2>
        <p>
          We may collect contact details you submit through forms, as well as
          standard analytics and device data. Replace this section with your
          finalized privacy disclosures.
        </p>
        <h2 className="mt-8 text-2xl text-revival-dark">How We Use It</h2>
        <p>
          We use your information to respond to inquiries, schedule
          appointments, and improve our services. We do not sell your personal
          information.
        </p>
        <h2 className="mt-8 text-2xl text-revival-dark">Contact</h2>
        <p>
          For privacy questions, contact{" "}
          <a
            href="mailto:Southwest@revivalhealthandwellnessgroup.com"
            className="text-revival-gold"
          >
            Southwest@revivalhealthandwellnessgroup.com
          </a>
          .
        </p>
      </div>
    </section>
  );
}
