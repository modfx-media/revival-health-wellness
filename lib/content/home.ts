/**
 * Typed homepage content for Revival Health & Wellness.
 *
 * All copy and image paths are sourced from the live site crawl
 * (see lib/content/*.json). Images live in /public/images/.
 */

export const ZENOTI = "https://revivalhealth.zenoti.com/webstorenew";

export const HERO = {
  eyebrow: "Las Vegas Leading Medical Health & Wellness Clinic",
  title: "Take the first step towards a vibrant and fulfilling future",
  description:
    "We specialize in weight loss, hormone replacement therapy, body contouring, and aesthetics. Unlock your path to a healthier, more confident you.",
  image: "/images/home/Image_20250829_162859_344.jpeg",
  words: ["Revitalize", "Rebalance", "Revel Your Best"],
  gallery: [
    "/images/hero/hero-3.png",
    "/images/hero/hero-4.png",
    "/images/hero/hero-1.png",
    "/images/hero/hero-2.png",
  ],
};

export const MARQUEE: { label: string; href: string }[] = [
  { label: "Medical Weight Loss", href: "/weight-loss/" },
  { label: "Hormone Therapy", href: "/hormone-therapy/" },
  { label: "Sexual Wellness", href: "/sexual-wellness/" },
  { label: "Aesthetics & Injectables", href: "/aesthetics/" },
  { label: "IV Hydration", href: "/iv-hydration/" },
  { label: "Body Contouring", href: "/body-contouring/" },
  { label: "Telehealth", href: "/telehealth/" },
];

export type Service = {
  name: string;
  href: string;
  image: string;
  blurb: string;
};

export const SERVICES: Service[] = [
  {
    name: "Medical Weight Loss",
    href: "/weight-loss/",
    image: "/images/services/medical-weight-loss-hero.jpg",
    blurb:
      "A scientific, personalized plan built around your body, GLP-1, phentermine, and vitamin injections with ongoing medical support.",
  },
  {
    name: "Hormone Therapy",
    href: "/hormone-therapy/",
    image: "/images/services/hormone-therapy.jpg",
    blurb:
      "Restore balance and vitality with customized HRT for men and women, plus growth hormone optimization.",
  },
  {
    name: "Sexual Wellness",
    href: "/sexual-wellness/",
    image: "/images/services/sexual-wellness.jpg",
    blurb:
      "Safe, proven treatments for men and women, P-Shot, O-Shot, GainsWave, Emsella, and more.",
  },
  {
    name: "Aesthetics",
    href: "/aesthetics/",
    image: "/images/services/sexual-wellness.png",
    blurb:
      "Botox, dermal fillers, microneedling, PDO threads, and PRP, natural, beautiful, confidence-restoring results.",
  },
  {
    name: "IV Hydration",
    href: "/iv-hydration/",
    image: "/images/services/image-of-iv-infusion-in-wellness-clinic.jpg",
    blurb:
      "Rehydrate, replenish, and revitalize with custom IV drips delivered straight to your bloodstream.",
  },
  {
    name: "Body Contouring",
    href: "/body-contouring/",
    image: "/images/services/emsculpt-neo.webp",
    blurb:
      "Non-invasive sculpting and skin tightening, ONDA Pro, Emsculpt NEO, and Everesse RF for a stronger, more defined silhouette.",
  },
];

export const APPROACH = {
  eyebrow: "A Modern Luxury Experience",
  title: "A synergistic, multi-pronged approach",
  body: "At Revival Health and Wellness, everything we do is centered around you and your journey to becoming the best version of yourself. We believe in a comprehensive approach to wellness, revitalizing your mind, body, and spirit through personalized, results-driven care.",
  points: [
    {
      title: "Results-driven care",
      text: "A plan that goes beyond standard medication, with comprehensive support and personalized guidance.",
    },
    {
      title: "Expert medical team",
      text: "We listen to each patient and recommend the treatments that best meet your individual needs.",
    },
    {
      title: "Whole-person wellness",
      text: "We treat the whole person, physical, mental, and emotional, for lasting, meaningful results.",
    },
  ],
  images: ["/images/home/approach-team.png"],
};

export const STATS = [
  { value: 5, suffix: "★", label: "Average patient rating" },
  { value: 500, suffix: "+", label: "Five-star reviews" },
  { value: 2, suffix: "", label: "Las Vegas locations" },
  { value: 30, suffix: "+", label: "Treatments & therapies" },
];

export const WHY_CHOOSE = {
  eyebrow: "Why Choose Revival Health and Wellness?",
  title: "Care built entirely around you",
  reasons: [
    {
      title: "A results-driven approach",
      text: "We go beyond standard weight loss medication. We're committed to your success, offering comprehensive support and personalized care to help you reach your wellness goals.",
    },
    {
      title: "An expert medical team",
      text: "Working with our expert medical team ensures personalized care, we listen to each patient and recommend the treatments that best meet your individual needs.",
    },
    {
      title: "A real personal connection",
      text: "Unlike ordering medication online, our office offers face-to-face consultations and ongoing support. We listen, guide, and adjust your plan so you feel supported and confident throughout your journey.",
    },
  ],
};

export const VALUES = {
  eyebrow: "About Revival Health and Wellness",
  title: "Our mission and the values behind it",
  items: [
    {
      title: "Client",
      text: "We place our clients at the heart of everything we do, tailoring our services to meet their unique needs and exceed their expectations.",
    },
    {
      title: "Experience",
      text: "We are dedicated to creating exceptional experiences, combining expertise with personalized care to enhance every patient's journey.",
    },
    {
      title: "Commitment",
      text: "We demonstrate unwavering commitment to our clients and our mission, continuously striving for excellence in all that we do.",
    },
  ],
};

export const ABOUT = {
  eyebrow: "About Us",
  title: "Everything we do is centered around you",
  body: [
    "At Revival Health and Wellness, everything we do is centered around you and your journey to becoming the best version of yourself. Our mission is to provide top-tier care that empowers you to achieve your goals and feel your best, through personalized health solutions tailored to your unique needs.",
    "We believe in a comprehensive approach to wellness, focusing on revitalizing your mind, body, and spirit. Our dedicated team genuinely cares about your health and future, and we are committed to helping you lead a longer, happier, and healthier life.",
    "Join us and take the first step towards a vibrant and fulfilling future. Let us help you unlock your potential and embrace a healthier, more vibrant you.",
  ],
  href: "/about-us/",
  image: "/images/home/Image_20250829_162859_144.jpeg",
};

export const PLAN_OFFER = {
  eyebrow: "Your Personalized Wellness Plan Starts Here",
  title: "Not sure which treatment is right for you?",
  body: "Our experts at Revival Health & Wellness will guide you. Request your consultation today and receive:",
  perks: [
    "Complimentary consultation",
    "Personalized treatment plan",
    "20% off certificate toward your treatment",
  ],
  cta: "Get My Personalized Plan",
};

export const GALLERY = [
  "/images/home/Image_20250829_162858_447.jpeg",
  "/images/home/Image_20250829_162858_558.jpeg",
  "/images/home/Image_20250829_162858_691.jpeg",
  "/images/home/front-desk.png",
  "/images/home/Image_20250829_162859_013.jpeg",
  "/images/home/Image_20250829_162859_144.jpeg",
  "/images/home/Image_20250829_162859_344.jpeg",
  "/images/home/Image_20250829_162859_455.jpeg",
];

export type Testimonial = {
  name: string;
  quote: string;
  treatment?: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Coltyn Simmons",
    treatment: "Weight Loss",
    quote:
      "This was such an easy and powerful way for me to get my health and body on the right path! I started seeing results immediately. I was out of shape and unhealthy, and now I'm in the best shape of my life. I can honestly say they saved my life, thank you from the bottom of my heart!",
  },
  {
    name: "Nura Sadeghian",
    treatment: "Weight Loss & Aesthetics",
    quote:
      "As a new mom I came in wanting guidance. The provider and staff are absolutely amazing, caring, kind, and genuinely want to help. I started a weight loss program and then got some Botox and filler and I LOVE it all! They're honest and don't sell something that won't benefit you.",
  },
  {
    name: "jobu",
    treatment: "Sexual Wellness",
    quote:
      "The staff is very professional and friendly. I came here looking for a natural solution for ED and PE. They listened to my symptoms and concerns and developed a treatment plan that suited my needs. I have seen improvements and would highly recommend this team.",
  },
  {
    name: "Jessica Dominguez",
    treatment: "Weight Loss",
    quote:
      "Wanting to lose weight, Revival Health and Wellness helped me achieve my goal in 3 months! The staff is super nice and friendly and they make you feel so comfortable. Ready for a change? You MUST contact them, they'll have the right plan for you.",
  },
  {
    name: "Jennifer Laluangphet",
    treatment: "Personalized Care",
    quote:
      "There is no doubt about it, Radford and the whole team are top notch! They genuinely care that you're getting the results you want. When I express what I'm hoping to achieve, I always feel heard, understood and truly cared for. I'll be booking again very soon!",
  },
  {
    name: "Marcus T.",
    treatment: "Hormone Therapy",
    quote:
      "Hormone therapy here gave me my energy and confidence back. The staff is professional, discreet, and incredibly knowledgeable. Highly recommend.",
  },
  {
    name: "Michael R.",
    treatment: "Emsella",
    quote:
      "Emsella was much easier than I expected. The sessions were comfortable, completely non-invasive, and I was able to get right back to my day afterward. After completing my treatment plan, I noticed better bladder control and more confidence in everyday life. The team at Revival made the whole experience comfortable and discreet.",
  },
  {
    name: "Jennifer M.",
    treatment: "Emsella",
    quote:
      "I had been dealing with bladder leaks when laughing, sneezing, and exercising, and it was starting to affect my confidence. Emsella was incredibly simple, I stayed fully clothed during the sessions and there was no downtime. Over the course of my treatments, I noticed a meaningful improvement. I'm so glad I decided to try it.",
  },
  {
    name: "David T.",
    treatment: "Emsella",
    quote:
      "I was a little hesitant to talk about pelvic floor issues at first, but everyone at Revival made me feel comfortable from the beginning. The Emsella treatments were quick and easy, and I started noticing improvements as I progressed through my sessions. I feel much more confident and in control now.",
  },
  {
    name: "Amanda S.",
    treatment: "Emsella",
    quote:
      "After having children, I thought occasional bladder leakage was something I just had to live with. Emsella changed my perspective. The treatment was comfortable, required no recovery time, and fit easily into my schedule. I've noticed a big difference in my confidence and pelvic floor control.",
  },
  {
    name: "Chris P.",
    treatment: "Emsella",
    quote:
      "My experience with Emsella at Revival Health & Wellness was excellent. The staff explained everything clearly and made a potentially awkward topic feel completely normal. The sessions were convenient and non-invasive, and I've been very happy with the improvement I've noticed. I would definitely recommend speaking with their team if you're considering Emsella.",
  },
  {
    name: "Sarah M.",
    treatment: "XERF",
    quote:
      "I'm so happy with my XERF treatments! I wanted my skin to look firmer and more refreshed without doing anything invasive. The treatment was comfortable, and I was able to go right back to my normal routine afterward. My skin looks smoother, tighter, and naturally refreshed.",
  },
  {
    name: "Jessica R.",
    treatment: "XERF",
    quote:
      "I started noticing some loose skin around my jawline and neck and decided to try XERF. The entire experience at Revival was amazing. There was no downtime, and over the following weeks I started noticing my skin looking firmer and more defined. I love how natural the results look!",
  },
  {
    name: "Amanda L.",
    treatment: "XERF",
    quote:
      "XERF has been one of my favorite aesthetic treatments. I wanted something that could improve the firmness of my skin without injections or surgery. The sessions were easy and comfortable, and my skin gradually started looking smoother and more youthful. I'm definitely coming back for more.",
  },
  {
    name: "Michelle T.",
    treatment: "XERF",
    quote:
      "I had XERF done to help with skin laxity, and I'm really impressed with the experience. The treatment was quick, comfortable, and required no recovery time. I've noticed my skin feels tighter and looks more refreshed without looking like I had anything 'done.' Exactly what I wanted.",
  },
  {
    name: "Rachel K.",
    treatment: "XERF",
    quote:
      "The team at Revival made my XERF experience so comfortable from beginning to end. They explained the treatment clearly and created a plan based on the areas I wanted to improve. I love that the results developed naturally instead of changing my appearance overnight. My skin looks firmer, smoother, and healthier.",
  },
];

export const REVIEWS = {
  rating: 5,
  count: 500,
  badge: "EXCELLENT",
  url: "https://www.google.com/search?sca_esv=fd7ebb06f35fc00e&sxsrf=APpeQnuL-I_-lBw1ge665VuPAnqGXvzTdQ:1784906840638&si=APenkKm7iecQ4G6P-TsbSMFKIQtv3EFIqRAFw-i8uEbk55Z-_-AnkztBfFgLHMd7rveTZWuMtGChJuI9gkIqQFSc8ELwW2NYYzhkA_c9FMEfHSGUuw_KAl-Q0YG-S8A5OK6Fq67AmeBwzVyNG2mY9TjsUicrNGef5w%3D%3D&q=Revival+Aesthetics+Reviews&sa=X&ved=2ahUKEwi7yMWR0OuVAxVCKvsDHaOMGXUQ0bkNegQIMxAH",
};

export type BlogPost = {
  title: string;
  category: string;
  date: string;
  href: string;
  excerpt: string;
  image: string;
};

export const BLOGS: BlogPost[] = [
  {
    title: "Migraine and TMJ Relief Options With Botox",
    category: "Aesthetics",
    date: "September 14, 2026",
    href: "/blogs/migraine-and-tmj-relief-options-with-botox/",
    excerpt:
      "Discover how botox in Las Vegas may ease migraine and TMJ pain, what to expect from treatment, and who may benefit from this approach",
    image: "/images/blog/migraine-and-tmj-relief-options-with-botox.png",
  },
  {
    title: "Break a Las Vegas Weight Loss Plateau: Lab Tests and What Results Mean",
    category: "Weight Loss",
    date: "June 21, 2026",
    href: "https://revivalhealthandwellnessgroup.com/break-weight-loss-plateau/",
    excerpt:
      "Stop the plateau spiral and restart fat loss. You are eating cleaner and moving more, here's what your labs reveal and how to break through.",
    image: "/images/blog/weight-loss-plateau.jpg",
  },
  {
    title: "Las Vegas ED Treatment Roadmap: Step-by-Step Guide to Personalized Options",
    category: "Sexual Wellness",
    date: "June 14, 2026",
    href: "https://revivalhealthandwellnessgroup.com/ed-treatment-roadmap-guide/",
    excerpt:
      "Take control of ED and reclaim confidence. Erectile dysfunction is common and it is medical, here is a clear, personalized path forward.",
    image: "/images/blog/ed-treatment-roadmap.jpg",
  },
  {
    title: "Unlocking Hormone Therapy in Las Vegas for Stubborn Weight",
    category: "Hormone Therapy",
    date: "June 7, 2026",
    href: "https://revivalhealthandwellnessgroup.com/unlocking-hormone-therapy-for-stubborn-weight/",
    excerpt:
      "Resetting stubborn weight is not just about eating less and moving more. For many, hormones are the missing piece that keeps results out of reach.",
    image: "/images/blog/hormone-stubborn-weight.jpg",
  },
  {
    title: "Summer-Ready GainsWave for Women in Las Vegas Explained",
    category: "Sexual Wellness",
    date: "May 31, 2026",
    href: "https://revivalhealthandwellnessgroup.com/summer-ready-gainswave-for-women/",
    excerpt:
      "Feel confident in your body this summer. GainsWave for women is a non-invasive way to boost sensitivity, circulation, and intimacy.",
    image: "/images/blog/gainswave-women.jpg",
  },
  {
    title: "Inside Medical Weight Loss in Las Vegas: What Actually Happens",
    category: "Weight Loss",
    date: "May 24, 2026",
    href: "https://revivalhealthandwellnessgroup.com/inside-medical-weight-loss-what-actually-happens/",
    excerpt:
      "Medical weight loss is about more than a smaller number on the scale. Step inside the process and see what a real, supported plan looks like.",
    image: "/images/blog/medical-weight-loss.jpg",
  },
  {
    title: "Why Hormone Therapy in Las Vegas Feels Different in Your 40s and 50s",
    category: "Hormone Therapy",
    date: "April 26, 2026",
    href: "https://revivalhealthandwellnessgroup.com/hormone-therapy-in-your-40s-and-50s/",
    excerpt:
      "Hormone therapy can feel very different in your 40s and 50s than it did before. Here's why, and how to tailor it to this stage of life.",
    image: "/images/blog/hormone-40s-50s.jpg",
  },
];

/* Our Philosophy, before/after comparison + headline stats */
export const PHILOSOPHY = {
  eyebrow: "Our Philosophy",
  titleLines: [
    { text: "Science-led", accent: true },
    { text: "wellness.", accent: false },
    { text: "Visible", accent: true },
    { text: "results.", accent: false },
  ],
  body: "Every body is different. Our medically supervised treatments respect your physiology, goals, and timeline, combining advanced therapies with personalized care to deliver real, lasting transformation.",
  cta: { label: "View Patient Results", href: "/about-us/" },
  before: "/images/home/84-before.webp",
  after: "/images/home/84-after.webp",
  stats: [
    { value: "5★", label: "Average rating" },
    { value: "500+", label: "Five-star reviews" },
    { value: "30+", label: "Treatments offered" },
    { value: "2", label: "Las Vegas locations" },
  ],
};

/* Investment / Pricing guide */
export type PriceItem = { name: string; price: string };
export type PriceCard = {
  title: string;
  image: string;
  href: string;
  items: PriceItem[];
};

export const PRICING = {
  eyebrow: "Treatment Guide",
  title: "Invest in",
  titleAccent: "your best self",
  subtitle: "Transparent guidance. Personalized plans. Exceptional results.",
  cards: [
    {
      title: "Aesthetics & Skin",
      image: "/images/services/aesthetics-skin-facial.webp",
      href: "/aesthetics/",
      items: [
        { name: "Botox / Wrinkle Relaxers", price: "from $12/unit" },
        { name: "Dermal Fillers", price: "from $650" },
        { name: "Microneedling", price: "from $300" },
        { name: "PRP Facial", price: "from $450" },
        { name: "PDO Thread Lift", price: "from $900" },
        { name: "Laser Skin Rejuvenation", price: "from $320" },
      ],
    },
    {
      title: "Wellness & Body",
      image: "/images/services/body-aesthetics.png",
      href: "/weight-loss/",
      items: [
        { name: "Medical Weight Loss (GLP-1)", price: "from $299/mo" },
        { name: "Hormone Therapy (HRT)", price: "from $199/mo" },
        { name: "Emsculpt NEO", price: "from $750/session" },
        { name: "IV Hydration Drips", price: "from $150" },
        { name: "Sexual Wellness (P/O-Shot)", price: "from $900" },
        { name: "Vitamin Injections", price: "from $35" },
      ],
    },
  ] as PriceCard[],
};

/* Signature, interactive body contouring map */
export type Hotspot = { label: string; top: string; left: string };

export const SIGNATURE = {
  eyebrow: "Signature Treatment",
  title: "Body contouring &",
  titleAccent: "Emsculpt NEO",
  body: "Build muscle and burn fat at the same time. Our non-invasive body sculpting targets stubborn areas with FDA-cleared technology, up to 25% more muscle and 30% less fat in just four 30-minute sessions.",
  cta: { label: "Book a Consultation", href: ZENOTI },
  image: "/images/services/defined-body.webp",
  hotspots: [
    { label: "Waistline", top: "20%", left: "34%" },
    { label: "Abdomen", top: "32%", left: "52%" },
    { label: "Hip Contouring", top: "62%", left: "10%" },
    { label: "Inner Thighs", top: "96%", left: "40%" },
    { label: "Outer Thighs", top: "82%", left: "84%" },
  ] as Hotspot[],
  features: [
    "FDA-Cleared Technology",
    "Expert Medical Providers",
    "Zero Downtime",
    "Personalized Treatment",
  ],
};
