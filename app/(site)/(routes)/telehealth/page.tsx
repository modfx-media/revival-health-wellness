import { cmsPageMetadata } from "@/lib/cms/generateMeta";
import { buildMetadata } from "@/lib/metadata";
import {
  serviceSchema,
  breadcrumbSchema,
  faqSchema,
  jsonLd,
} from "@/lib/schema";
import TelehealthPageContent from "@/components/telehealth/TelehealthPageContent";

const TITLE = "Telehealth";
const PATH = "/telehealth/";
const META_TITLE = "Telehealth Consultations";
const DESCRIPTION =
  "Speak with a licensed Revival provider from home. Secure video visits for weight loss, hormone therapy, sexual wellness, and follow-ups anywhere in Nevada.";

export async function generateMetadata() {
  const fallback = buildMetadata({
  title: META_TITLE,
  description: DESCRIPTION,
  path: PATH,
});
  return cmsPageMetadata(fallback);
}

const FAQS = [
  {
    question: "What is telehealth?",
    answer:
      "Telehealth is a secure video visit with a licensed Revival provider. You get the same personalized care you'd receive in-clinic, just from the comfort of home.",
  },
  {
    question: "Which services can I do virtually?",
    answer:
      "Weight-loss consultations, hormone therapy reviews, sexual wellness consultations, medication adjustments, and follow-up visits are all available online.",
  },
  {
    question: "Can I be prescribed medication over telehealth?",
    answer:
      "Yes-when clinically appropriate and after a proper evaluation. Some prescriptions require baseline labs, which we order from a lab near you.",
  },
  {
    question: "Do you accept insurance for telehealth?",
    answer:
      "Revival is a cash-pay concierge clinic. We provide superbills you can submit to your insurance for potential reimbursement.",
  },
  {
    question: "Is my visit private?",
    answer:
      "Absolutely. All video visits use HIPAA-compliant secure video, and your records are protected under the same privacy standards as an in-clinic visit.",
  },
  {
    question: "What if I need an in-person exam?",
    answer:
      "We'll always tell you when a treatment requires an in-clinic visit. Booking a virtual visit is often the fastest path to figuring out the right next step.",
  },
];

export default function TelehealthPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd([
            serviceSchema({
              name: META_TITLE,
              description: DESCRIPTION,
              path: PATH,
            }),
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: TITLE, path: PATH },
            ]),
            faqSchema(FAQS),
          ]),
        }}
      />
      <TelehealthPageContent />
    </>
  );
}
