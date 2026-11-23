/**
 * Central content data for the entire Sexual Wellness section.
 * Copy is sourced from the live site at revivalhealthandwellnessgroup.com,
 * organized into typed sections that the SexualWellnessPage renderer can
 * assemble into a modern motion-rich layout.
 */

export type SWSection =
  | {
      kind: "overview";
      eyebrow?: string;
      heading: string;
      paragraphs: string[];
      image?: string;
      imageAlt?: string;
      /** When true, renders the image with `object-contain` on a neutral tile so the full photo is visible - no cropping. */
      imageContain?: boolean;
      /** Actual pixel dimensions of `image`, used to size the contain box so it matches the photo's real aspect ratio (avoids letterbox bars). Defaults to 1200x982. */
      imageWidth?: number;
      imageHeight?: number;
      side?: "left" | "right";
      bullets?: string[];
    }
  | {
      kind: "stats";
      eyebrow?: string;
      heading?: string;
      items: { value: string; label: string; sub?: string }[];
    }
  | {
      kind: "process";
      eyebrow?: string;
      heading: string;
      intro?: string;
      steps: { title: string; text: string; icon: SWIcon }[];
    }
  | {
      kind: "features";
      eyebrow?: string;
      heading: string;
      intro?: string;
      items: { title: string; text: string; icon: SWIcon }[];
      tone?: "dark" | "cream" | "light";
    }
  | {
      kind: "bullets";
      eyebrow?: string;
      heading: string;
      intro?: string;
      items: string[];
      columns?: 1 | 2;
    }
  | {
      kind: "quote";
      eyebrow?: string;
      heading?: string;
      quote: string;
      attribution: string;
      image?: string;
    }
  | {
      kind: "warning";
      eyebrow?: string;
      heading: string;
      intro?: string;
      items: { title: string; text: string }[];
    }
  | {
      kind: "options";
      eyebrow?: string;
      heading: string;
      intro?: string;
      items: {
        title: string;
        href: string;
        blurb: string;
        image?: string;
      }[];
    }
  | {
      kind: "faq";
      eyebrow?: string;
      heading: string;
      intro?: string;
      items: { question: string; answer: string }[];
    }
  | {
      kind: "video";
      eyebrow?: string;
      heading?: string;
      intro?: string;
      /** YouTube video ID (the part after `v=`). Omit when using a self-hosted `src` instead. */
      videoId?: string;
      /** Optional start time in seconds (YouTube only). */
      start?: number;
      /** Caption / attribution line under the video. */
      caption?: string;
      /** Poster override; defaults to YouTube's maxresdefault thumbnail when `videoId` is set. */
      poster?: string;
      /** Path to a self-hosted mp4 under /public (e.g. "/videos/emsella-2.mp4"). Takes precedence over `videoId`. */
      src?: string;
    };

export type SWIcon =
  | "heart"
  | "wave"
  | "pill"
  | "syringe"
  | "chair"
  | "shield"
  | "sparkles"
  | "target"
  | "timer"
  | "activity"
  | "flame"
  | "handshake"
  | "flask"
  | "star"
  | "user"
  | "check";

export type SWPage = {
  slug: string;
  category: "hub" | "men" | "women";
  eyebrow: string;
  title: string; // plain-text version for metadata/schema
  titleNode?: { pre?: string; accent: string; post?: string }; // for animated hero
  description: string;
  gallery: string[]; // hero rotating images
  galleryAlts?: string[];
  breadcrumbs: { label: string; href?: string }[];
  sections: SWSection[];
  ctaTitle?: string;
  ctaSubtitle?: string;
  /** When true, renders the final CTA before the Related Treatments block. */
  ctaBeforeRelated?: boolean;
  relatedSlugs?: string[];
  meta: {
    title: string;
    description: string;
    canonical: string;
    ogImage?: string;
  };
  schema: {
    medicalTherapyName: string;
  };
};

const HUB_IMAGE = "/images/sexual-wellness/live/hub-parent.png";

export const SW_CONTENT: Record<string, SWPage> = {
  // ────────────────────────────────────────────────────────────────────────
  // HUB: /sexual-wellness/  (faithful clone of live parent hub)
  // ────────────────────────────────────────────────────────────────────────
  "sexual-wellness": {
    slug: "sexual-wellness",
    category: "hub",
    eyebrow: "Sexual Wellness",
    title: "Sexual Wellness for Men & Women",
    titleNode: {
      pre: "Sexual Wellness for",
      accent: "Men & Women",
      post: "",
    },
    description:
      "At Revival Health and Wellness, we provide sexual wellness solutions for men and women. Discreet, physician-led care in two Las Vegas locations.",
    gallery: [
      "/images/page-banners/sexual-wellness-banner-1.webp",
      "/images/page-banners/sexual-wellness-banner-2.avif",
    ],
    breadcrumbs: [{ label: "Home", href: "/" }, { label: "Sexual Wellness" }],
    sections: [
      {
        kind: "overview",
        eyebrow: "Comprehensive Sexual Wellness Solutions for Enhanced Wellbeing",
        heading: "Enhanced wellbeing, tailored to you",
        paragraphs: [
          "At Revival Health and Wellness, we provide sexual wellness solutions for men and women. Whether you are navigating erectile issues, low libido, discomfort, or simply want to feel more like yourself again, our team builds a private, discreet plan around your goals.",
          "Every treatment we offer is medically supervised, evidence-based, and delivered by clinicians who specialize in men's and women's sexual wellness - no gimmicks, no one-size-fits-all templates.",
        ],
        image: "/images/sexual-wellness/hub-parent.webp",
        imageAlt: "Revival sexual wellness - men and women",
        imageContain: true,
        imageWidth: 1100,
        imageHeight: 1440,
      },
      {
        kind: "options",
        eyebrow: "Where would you like to start?",
        heading: "Choose your path",
        intro:
          "Visit the buttons below to learn more. Our sexual wellness programs are organized around the anatomy of concerns most men and women bring to us.",
        items: [
          {
            title: "Women's sexual wellness",
            href: "/women/",
            blurb:
              "PRP-based rejuvenation, acoustic wave therapy, and pelvic floor strengthening for arousal, sensation, and comfort - O-Shot, GAINSWave™ For Her, and EMSELLA.",
            image: "/images/sexual-wellness/live/hub-women.png",
          },
          {
            title: "Men's sexual wellness",
            href: "/men/",
            blurb:
              "Non-surgical treatments for ED, performance, and confidence - P-Shot, GAINSWave, TriMix, Priapus Toxin, Viagra, and Emsella.",
            image: "/images/sexual-wellness/live/hub-men.png",
          },
        ],
      },
      {
        kind: "features",
        eyebrow: "How we work",
        heading: "The Revival difference",
        items: [
          {
            title: "Private & Discreet",
            text: "Concierge-level intake, private consult rooms, HIPAA-secure records.",
            icon: "shield",
          },
          {
            title: "Physician-Led",
            text: "Every plan reviewed by a licensed medical provider who specializes in sexual wellness.",
            icon: "user",
          },
          {
            title: "Non-Surgical First",
            text: "We prioritize evidence-based, non-surgical options before considering anything invasive.",
            icon: "sparkles",
          },
          {
            title: "Combination Therapy",
            text: "Treatments frequently work best paired - we design multi-modal plans when it makes clinical sense.",
            icon: "activity",
          },
        ],
        tone: "cream",
      },
    ],
    ctaTitle: "Ready to feel like yourself again?",
    ctaSubtitle:
      "Book a free, private consultation. We will walk through your goals, answer every question, and design a plan that fits your body and lifestyle.",
    relatedSlugs: ["men", "women"],
    meta: {
      title: "Sexual Wellness for Men & Women",
      description:
        "Sexual wellness for men and women in Las Vegas. Revival Health and Wellness offers private, physician-supervised care at its Henderson and Summerlin clinics.",
      canonical:
        "https://revivalhealthandwellnessgroup.com/sexual-wellness/",
      ogImage:
        "https://revivalhealthandwellnessgroup.com/wp-content/uploads/2025/08/close-beauty-portrait-topless-woman-with-perfect-skin-natural-makeup-holds-serum-youth-skin-hydration-dropper-with-cosmetic-oilx9.webp",
    },
    schema: { medicalTherapyName: "Sexual Wellness Therapy" },
  },

  // ────────────────────────────────────────────────────────────────────────
  // HUB: /men/  (faithful clone of live men's hub)
  // ────────────────────────────────────────────────────────────────────────
  men: {
    slug: "men",
    category: "men",
    eyebrow: "For Men",
    title: "Sexual Wellness for Men",
    titleNode: {
      pre: "Sexual Wellness for",
      accent: "Men",
      post: "",
    },
    description:
      "If you're looking for a solution to erectile dysfunction, penis enlargement, or enhanced sexual performance, Revival Health and Wellness offers safe and proven sexual wellness treatments for men, all administered by our experienced specialists.",
    gallery: [
      "/images/sexual-wellness/live/hub-men.png",
      "/images/sexual-wellness/sw-man-confident.jpg",
      "/images/sexual-wellness/sw-man-fitness.jpg",
    ],
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Sexual Wellness", href: "/sexual-wellness/" },
      { label: "For Men" },
    ],
    sections: [
      {
        kind: "overview",
        eyebrow: "The importance of sexual wellness",
        heading: "The importance of sexual wellness",
        paragraphs: [
          "For many men, sexual wellness is a significant factor in overall emotional well-being. Dissatisfaction with sexual performance or experience can have a profound impact on your life.",
          "When your body is functioning properly and you can enjoy sexual activity, your quality of life can significantly improve.",
        ],
        image: "/images/sexual-wellness/live/hub-men.png",
        imageAlt: "Sexual wellness for men - Revival Health & Wellness",
      },
      {
        kind: "video",
        eyebrow: "Watch",
        heading: "A closer look at men's sexual wellness",
        intro:
          "How Revival Health & Wellness approaches performance, ED, and long-term men's health - from lifestyle guidance to advanced non-surgical treatment.",
        videoId: "Nq4yqKCBydI",
        start: 1,
        caption: "Revival Health & Wellness · Men's sexual wellness overview",
      },
      {
        kind: "options",
        eyebrow: "Options for sexual wellness products for men",
        heading: "Your treatment paths",
        intro:
          "From regenerative injections to acoustic wave therapy to pelvic floor strengthening - most men build a plan combining two or three of these.",
        items: [
          {
            title: "P-Shot",
            href: "/p-shot-tm/",
            blurb:
              "The P-Shot (Priapus Shot®) is a non-surgical treatment that uses platelet-rich plasma (PRP) from your own blood to improve blood flow, sensitivity, and sexual function. It helps enhance performance, boost confidence, and increase satisfaction naturally.",
            image: "/images/sexual-wellness/sw-lab-plasma.jpg",
          },
          {
            title: "GAINSWave",
            href: "/gainswave-tm/",
            blurb:
              "GAINSWave is a cutting-edge, non-invasive treatment for men's sexual health that uses acoustic sound wave therapy to improve blood flow and enhance performance. This safe and effective therapy helps reduce erectile dysfunction, boost sensitivity, and restore confidence - without surgery or medication.",
            image: "/images/sexual-wellness/sw-acoustic-wave.jpg",
          },
          {
            title: "Viagra",
            href: "/viagra/",
            blurb:
              "Viagra is a trusted prescription treatment for erectile dysfunction that works by improving blood flow, helping men achieve and maintain stronger, longer-lasting erections. It's a safe and effective option for enhancing performance and restoring confidence when used under medical guidance.",
            image: "/images/sexual-wellness/sw-medical-vial.jpg",
          },
          {
            title: "TriMix",
            href: "/trimix/",
            blurb:
              "TriMix is an effective, customized injection therapy for erectile dysfunction. It increases blood flow to help men achieve and maintain firm erections, improving performance and satisfaction. Safe, fast-acting, and reliable, TriMix is a great option when oral medications aren't effective - restoring confidence and intimacy naturally.",
            image: "/images/sexual-wellness/sw-medical-vial.jpg",
          },
          {
            title: "Priapus Toxin",
            href: "/priapus-toxin/",
            blurb:
              "The Priapus Toxin is an advanced, non-surgical treatment designed to enhance male performance and improve sexual health. This innovative therapy combines the benefits of Botox with specialized techniques to relax smooth muscles, improve blood flow, and support stronger, longer-lasting erections. Many men report enhanced sensitivity, confidence, and overall satisfaction.",
            image: "/images/sexual-wellness/sw-clinic-modern.jpg",
          },
          {
            title: "Emsella",
            href: "/emsella/",
            blurb:
              "EMSELLA is a breakthrough, non-invasive solution for urinary incontinence and pelvic floor strengthening. Using advanced HIFEM technology, it delivers thousands of powerful muscle contractions in a single session - far beyond what regular exercise can achieve. This comfortable treatment helps both men and women improve bladder control, regain confidence, and enhance overall quality of life while remaining fully clothed.",
            image: "/images/sexual-wellness/sw-man-fitness.jpg",
          },
        ],
      },
      {
        kind: "overview",
        eyebrow: "Las Vegas and Henderson",
        heading: "Men's sexual wellness at both Revival clinics",
        paragraphs: [
          "Men come to Revival Health and Wellness for erectile function, performance, and pelvic floor strength. Visits are private and handled by the clinic's licensed providers.",
          "The Henderson / Southwest clinic is at 7220 S. Cimarron Road, Suite 140, Las Vegas, NV 89113. The Summerlin / Northwest clinic is at 2585 Box Canyon Drive, Suite 150, Las Vegas, NV 89128. Hours differ by location and are listed on the contact page.",
        ],
        image: "/images/sexual-wellness/live/hub-men.png",
        imageAlt: "Men's sexual wellness care at Revival Health and Wellness",
      },
      {
        kind: "features",
        eyebrow: "Who it's for",
        heading: "Men comparing a plan, not a single product",
        intro:
          "This hub is for adults looking at the men's treatments Revival already offers. A provider helps you decide which option, or which combination, fits your history and goals.",
        items: [
          {
            title: "Erectile function",
            text: "P-Shot, GAINSWave, TriMix, Priapus Toxin, and Viagra are the men's options when a pill is not the whole plan.",
            icon: "heart",
          },
          {
            title: "Pelvic floor strength",
            text: "Emsella is the non-invasive, fully clothed HIFEM option for pelvic floor strengthening and bladder control.",
            icon: "activity",
          },
          {
            title: "A structured protocol",
            text: "P-Long sits alongside the visit-by-visit treatments for men who want a longer program.",
            icon: "target",
          },
          {
            title: "Either Las Vegas clinic",
            text: "Henderson / Southwest and Summerlin / Northwest both see men's sexual wellness patients.",
            icon: "user",
          },
        ],
        tone: "cream",
      },
      {
        kind: "process",
        eyebrow: "What to expect",
        heading: "How a men's consultation works",
        intro:
          "The first step is the same free consultation used across Revival. The provider explains the specific treatment after that visit.",
        steps: [
          {
            title: "Book the free consultation",
            text: "Use the booking link or call the clinic you want. Henderson / Southwest is (702) 963-1154. Summerlin / Northwest is (702) 725-1588.",
            icon: "handshake",
          },
          {
            title: "Review history and goals",
            text: "A licensed Revival provider meets with you and talks through what you want to change.",
            icon: "user",
          },
          {
            title: "Match a treatment path",
            text: "Most men build a plan combining two or three of the treatments on this page, when that fits the visit.",
            icon: "check",
          },
          {
            title: "Follow that treatment's protocol",
            text: "Scheduling, what the session feels like, and follow-up are covered on the page for the option you choose.",
            icon: "timer",
          },
        ],
      },
      {
        kind: "faq",
        eyebrow: "Questions",
        heading: "Men's sexual wellness questions",
        items: [
          {
            question: "Which men's treatments does Revival offer?",
            answer:
              "The men's pages cover the P-Shot, GAINSWave, Viagra, TriMix, Priapus Toxin, Emsella, and P-Long. Each treatment has its own page describing how it works.",
          },
          {
            question: "Where are the Las Vegas clinics?",
            answer:
              "Henderson / Southwest is 7220 S. Cimarron Road, Suite 140, Las Vegas, NV 89113. Summerlin / Northwest is 2585 Box Canyon Drive, Suite 150, Las Vegas, NV 89128. Both serve patients from Las Vegas and Henderson.",
          },
          {
            question: "Is the first visit a free consultation?",
            answer:
              "Yes. You can book a free consultation so a provider can build a private plan around your goals.",
          },
          {
            question: "Can treatments be combined?",
            answer:
              "The clinic notes that most men build a plan combining two or three of these options, when that makes sense after the consultation.",
          },
        ],
      },
    ],
    ctaTitle: "Take back control of your performance.",
    ctaSubtitle:
      "Book a free consultation with a Revival provider. We will build a discreet, personalized plan around your goals.",
    galleryAlts: [
      "Men's sexual wellness consultation at Revival Health and Wellness",
      "Man outdoors, representing confidence and men's health",
      "Man training, representing men's fitness and sexual wellness",
    ],
    relatedSlugs: [
      "p-shot-tm",
      "gainswave-tm",
      "viagra",
      "trimix",
      "priapus-toxin",
      "emsella",
      "p-long",
    ],
    meta: {
      title: "Men's Sexual Wellness, Las Vegas",
      description:
        "Men's sexual wellness in Las Vegas for ED, performance, and pelvic floor care. Private visits at Revival's Henderson and Summerlin clinics.",
      canonical: "https://revivalhealthandwellnessgroup.com/men/",
    },
    schema: { medicalTherapyName: "Men's Sexual Wellness Therapy" },
  },

  // ────────────────────────────────────────────────────────────────────────
  // HUB: /women/  (faithful clone - live page embeds full O-Shot detail)
  // ────────────────────────────────────────────────────────────────────────
  women: {
    slug: "women",
    category: "women",
    eyebrow: "For Women",
    title: "Sexual Wellness for Women",
    titleNode: {
      pre: "Sexual Wellness for",
      accent: "Women",
      post: "",
    },
    description:
      "For many women, sexual wellness is an essential component of emotional well-being. If you're experiencing low libido, vaginal dryness, or difficulty reaching orgasm, the O-Shot may be the ideal solution for you.",
    gallery: [
      "/images/sexual-wellness/live/hub-women.png",
      "/images/sexual-wellness/sw-woman-confident.jpg",
      "/images/sexual-wellness/women-intimacy-embrace.avif",
    ],
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Sexual Wellness", href: "/sexual-wellness/" },
      { label: "For Women" },
    ],
    sections: [
      {
        kind: "overview",
        eyebrow: "Discover the Benefits of O-Shot Treatments for Women's Wellness",
        heading: "Solutions built for women's intimate health",
        paragraphs: [
          "For many women, sexual wellness is an essential component of emotional well-being. If you're experiencing sexual issues such as low libido, vaginal dryness, or difficulty reaching orgasm, the O-Shot may be the ideal solution for you.",
        ],
        image: "/images/sexual-wellness/live/hub-women.png",
        imageAlt: "Sexual wellness for women - Revival Health & Wellness",
      },
      {
        kind: "options",
        eyebrow: "Options for sexual wellness for women",
        heading: "Three paths, one goal",
        intro:
          "Each of our treatments targets a different aspect of women's sexual wellness. Many patients combine two.",
        items: [
          {
            title: "GAINSWave™ For Her",
            href: "/gainswavetm-for-her/",
            blurb:
              "GAINSWave™ For Her is a breakthrough, non-invasive treatment designed to enhance women's sexual wellness. Using gentle acoustic sound wave therapy, it stimulates blood flow, promotes new tissue growth, and increases sensitivity. Many women report improved arousal, greater intimacy, and relief from dryness or discomfort - all without surgery or downtime.",
            image: "/images/sexual-wellness/gainswavetm-for-her/gainswavetm-for-her-1.jpg",
          },
          {
            title: "O-Shot",
            href: "/o-shot-tm/",
            blurb:
              "The O-Shot (Orgasm Shot®) is a revolutionary, non-surgical treatment designed to enhance women's sexual health and wellness. Using platelet-rich plasma (PRP) from your own blood, it helps regenerate tissue, improve blood flow, and increase sensitivity. Many women experience better intimacy, improved arousal, reduced dryness, and even relief from urinary incontinence.",
            image: "/images/sexual-wellness/o-shot/o-shot-banner.webp",
          },
          {
            title: "Emsella",
            href: "/emsella-2/",
            blurb:
              "EMSELLA is a breakthrough, non-invasive treatment that strengthens the pelvic floor and helps improve urinary incontinence. Using advanced HIFEM technology, EMSELLA delivers thousands of muscle contractions in just one session - far more than regular exercise can achieve. This quick and comfortable therapy helps both men and women regain bladder control, enhance confidence, and improve quality of life, all while remaining fully clothed.",
            image: "/images/sexual-wellness/emsella-2/emsella-4.webp",
          },
        ],
      },
      {
        kind: "overview",
        eyebrow: "What is the O-Shot?",
        heading: "The O-Shot for women's sexual wellness",
        paragraphs: [
          "The O-Shot is an injectable treatment designed to address a range of sexual issues for women. Whether you're dealing with painful intercourse, vaginal dryness, or a low sex drive, these problems can significantly impact your sexual wellness.",
          "The O-Shot uses platelet-rich plasma (PRP) derived from your own blood to help alleviate these conditions. Most women who have tried the O-Shot report being very satisfied with the results.",
        ],
        image: "/images/sexual-wellness/women-wellness-model.webp",
        imageAlt: "Platelet-rich plasma preparation",
        bullets: [
          "Fast, convenient, and non-surgical treatments",
          "Minimal discomfort with little to no downtime",
          "Enhanced self-esteem and confidence",
          "Long-lasting, permanent results",
        ],
      },
      {
        kind: "bullets",
        eyebrow: "What does the O-Shot do?",
        heading: "Real benefits women report",
        items: [
          "Increases arousal",
          "Increases sex drive",
          "Provides smoother, more youthful vaginal skin",
          "Tightens the vaginal opening",
          "Increases vaginal lubrication",
          "Delivers enhanced orgasms",
          "Offers more sensation during sexual activity",
          "Helps with vaginal orgasms",
          "Improves urinary incontinence",
          "Decreases pain during intercourse",
        ],
        columns: 2,
      },
      {
        kind: "overview",
        eyebrow: "How the O-Shot works",
        heading: "The science, simply",
        paragraphs: [
          "Platelet-rich plasma (PRP) is rich in healing proteins known as growth factors, which are naturally present in our blood. Medically, these growth factors have been effective in treating joint pain and aiding in hair restoration. When applied to sexual health, PRP has also shown significant effectiveness.",
          "When platelet-rich plasma is injected into the clitoris, labia, and G-spot, it enhances blood flow and promotes the growth of new, healthy tissue. This process stimulates the development of blood vessels and nerves in these areas - resulting in increased sensation due to the growth of additional nerve fibers.",
        ],
        image: "/images/sexual-wellness/o-shot-prp-injection.jpg",
        imageAlt: "PRP injection being administered",
        side: "right",
      },
      {
        kind: "process",
        eyebrow: "O-Shot treatment details",
        heading: "What to expect at your O-Shot appointment",
        intro:
          "The entire O-Shot appointment typically lasts about half an hour. There's no downtime required after the treatment.",
        steps: [
          {
            title: "Numb the area",
            text: "When you arrive, a gentle numbing anesthetic is applied to the vaginal area to minimize any discomfort.",
            icon: "shield",
          },
          {
            title: "Draw & process blood",
            text: "A small amount of blood is drawn from your vein and processed in a centrifuge that separates the red blood cells and impurities from the PRP.",
            icon: "flask",
          },
          {
            title: "Prepare the PRP",
            text: "Once the PRP is prepared, it's placed into a syringe ready for precise injection.",
            icon: "syringe",
          },
          {
            title: "Careful injection",
            text: "The PRP is injected into the numbed area. Most women describe it as a pinch. The whole session usually takes about 30 minutes.",
            icon: "target",
          },
        ],
      },
    ],
    ctaTitle: "Rediscover intimacy on your terms.",
    ctaSubtitle:
      "Book a free consultation with a Revival provider. Everything discussed stays between you and our medical team.",
    relatedSlugs: ["o-shot-tm", "gainswavetm-for-her", "emsella-2"],
    meta: {
      title: "Women's Wellness in Las Vegas",
      description:
        "Enhance your intimacy & comfort w/ sexual wellness for women in Las Vegas. Revival Health and Wellness provides personalized care for women's intimate health.",
      canonical: "https://revivalhealthandwellnessgroup.com/women/",
    },
    schema: { medicalTherapyName: "Women's Sexual Wellness Therapy" },
  },

  // ────────────────────────────────────────────────────────────────────────
  // MEN: /p-shot-tm/
  // ────────────────────────────────────────────────────────────────────────
  "p-shot-tm": {
    slug: "p-shot-tm",
    category: "men",
    eyebrow: "P-Shot® · For Men",
    title: "P-Shot® Treatment for Men",
    titleNode: {
      pre: "The",
      accent: "P-Shot®",
      post: "for sexual wellness",
    },
    description:
      "A non-surgical PRP treatment that uses your own platelet-rich plasma to improve blood flow, sensitivity, and sexual function.",
    gallery: [
      "/images/sexual-wellness/p-shot-tm/p-shot-tm-1.jpg",
      "/images/sexual-wellness/p-shot-tm/p-shot-tm-3.jpg",
      "/images/sexual-wellness/p-shot-tm/p-shot-tm-2.webp",
    ],
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "For Men", href: "/men/" },
      { label: "P-Shot®" },
    ],
    sections: [
      {
        kind: "overview",
        eyebrow: "P-Shot for Sexual Wellness",
        heading: "Understanding the P-Shot",
        paragraphs: [
          "The P-Shot® is a sexual wellness treatment that involves injecting platelet-rich plasma (PRP) derived from the patient's own blood. It stimulates the growth of new blood vessels - particularly beneficial for those with poor circulation or difficulty maintaining an erection.",
          "For some men, one P-Shot treatment may be sufficient. Others might require up to three sessions to reach optimal results. Every plan is personalized to your goals and physiology.",
        ],
        image: "/images/sexual-wellness/p-shot-tm/p-shot-tm-4.jpeg",
        imageAlt: "P-Shot® PRP treatment overview",
      },
      {
        kind: "bullets",
        eyebrow: "What the P-Shot does",
        heading: "Real benefits patients report",
        items: [
          "Improves erectile dysfunction",
          "Enhances erection quality and sensation",
          "Helps with venous leak",
          "Decreases premature ejaculation",
          "Enhances male orgasm",
          "Helps with Peyronie's disease",
          "Helps with lichen sclerosus",
          "May lengthen or thicken the penis",
          "Improves overall sexual function and performance",
        ],
        columns: 2,
      },
      {
        kind: "process",
        eyebrow: "Treatment details",
        heading: "What to expect at your P-Shot appointment",
        intro:
          "A single session takes about 30 minutes with minimal discomfort.",
        steps: [
          {
            title: "Numb the area",
            text: "A topical anesthetic is applied to the treatment area, followed by a numbing injection for comfort.",
            icon: "shield",
          },
          {
            title: "Draw & process blood",
            text: "A small blood sample is drawn from your vein and placed in a centrifuge to separate PRP from red blood cells.",
            icon: "flask",
          },
          {
            title: "Prepare the PRP",
            text: "Once separated, the plasma is drawn into a syringe ready for precise micro-needle injection.",
            icon: "syringe",
          },
          {
            title: "Inject with precision",
            text: "4–6 micro-needle injections are administered. The whole session usually takes about 30 minutes.",
            icon: "target",
          },
        ],
      },
    ],
    ctaTitle: "Interested in the P-Shot?",
    ctaSubtitle:
      "Book a free consultation to see if you're a candidate. All conversations are private and physician-led.",
    ctaBeforeRelated: true,
    relatedSlugs: ["gainswave-tm", "priapus-toxin", "trimix", "men"],
    meta: {
      title: "P-Shot Treatment for Men | Revival Health & Wellness",
      description:
        "P-Shot treatment in Las Vegas uses platelet-rich plasma. Revival Health and Wellness offers it to support performance and sensitivity.",
      canonical: "https://revivalhealthandwellnessgroup.com/p-shot-tm/",
    },
    schema: { medicalTherapyName: "P-Shot® (Priapus Shot®) PRP Therapy" },
  },

  // ────────────────────────────────────────────────────────────────────────
  // MEN: /gainswave-tm/
  // ────────────────────────────────────────────────────────────────────────
  "gainswave-tm": {
    slug: "gainswave-tm",
    category: "men",
    eyebrow: "GAINSWave™ · For Men",
    title: "GAINSWave™ Therapy",
    titleNode: {
      pre: "Non-invasive",
      accent: "acoustic wave",
      post: "therapy for ED",
    },
    description:
      "High-frequency pulsewave therapy that naturally enhances male sexual function, performance, and health.",
    gallery: [
      "/images/sexual-wellness/gainswave-tm/gainswave-tm-men.jpg",
      "/images/sexual-wellness/gainswave-tm/gainswave-tm-men-2.jpg",
      "/images/sexual-wellness/gainswave-tm/gainswave-tm-men-3.webp",
    ],
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "For Men", href: "/men/" },
      { label: "GAINSWave™" },
    ],
    sections: [
      {
        kind: "overview",
        eyebrow: "Erectile Dysfunction Treatment",
        heading: "The leading acoustic therapy for ED",
        paragraphs: [
          "Over time, GAINSWave™ has emerged as a leading therapy for erectile dysfunction (ED) and male performance. This high-frequency pulsewave therapy naturally and scientifically enhances male sexual function, performance, and health.",
          "It is the only non-invasive therapy that increases blood flow, releases growth factors to promote the development of new blood vessels, and effectively removes penile microplaque.",
        ],
        image: "/images/sexual-wellness/gainswave-tm/gainswave-tm-men.jpg",
        imageAlt: "GAINSWave™ acoustic wave therapy for men",
      },
      {
        kind: "stats",
        eyebrow: "Clinically proven",
        items: [
          {
            value: "75%+",
            label: "Success rate",
            sub: "for men with ED",
          },
          {
            value: "Zero",
            label: "Downtime",
            sub: "return to normal activity same-day",
          },
          {
            value: "30+",
            label: "Recommended age",
            sub: "for candidates",
          },
        ],
      },
      {
        kind: "overview",
        eyebrow: "How it works",
        heading: "The science behind GAINSWave™",
        paragraphs: [
          "During treatment, high-frequency acoustic waves are applied to the penis. This energy helps remove micro-plaque buildup that has been obstructing blood flow while also stimulating the creation of new blood vessels.",
          "Poor blood flow is a major contributor to erectile dysfunction, and GAINSWave™ effectively addresses this issue at the root. The enhanced blood flow leads to stronger, firmer, and longer-lasting erections.",
        ],
        image: "/images/sexual-wellness/gainswave-tm/gainswave-science.png",
        imageAlt: "GAINSWave™ mechanism of action",
        imageContain: true,
        imageWidth: 1230,
        imageHeight: 814,
        side: "right",
      },
      {
        kind: "features",
        eyebrow: "Who it's for",
        heading: "Candidates for GAINSWave™",
        intro:
          "This non-invasive, medication- and surgery-free treatment is beneficial for any man over 30 - whether or not you have diagnosed ED.",
        items: [
          {
            title: "Men experiencing ED",
            text: "Restore firmness and reliability without pills or injections.",
            icon: "heart",
          },
          {
            title: "Performance-focused men",
            text: "Improve stamina and sensitivity even if you don't have ED.",
            icon: "activity",
          },
          {
            title: "Men avoiding medication",
            text: "Get real improvements without daily Rx or contraindication concerns.",
            icon: "shield",
          },
          {
            title: "Combination-therapy patients",
            text: "Pairs powerfully with P-Shot, TriMix, and hormone optimization.",
            icon: "sparkles",
          },
        ],
        tone: "cream",
      },
      {
        kind: "overview",
        eyebrow: "Las Vegas and Henderson",
        heading: "GAINSWave at both Revival clinics",
        paragraphs: [
          "GAINSWave is the acoustic wave option for men who want a non-invasive approach to erectile function and performance. Revival offers it to patients in Las Vegas and Henderson.",
          "You can be seen at the Henderson / Southwest clinic, 7220 S. Cimarron Road, Suite 140, Las Vegas, NV 89113, or the Summerlin / Northwest clinic, 2585 Box Canyon Drive, Suite 150, Las Vegas, NV 89128.",
        ],
        image: "/images/sexual-wellness/gainswave-tm/gainswave-tm-men-2.jpg",
        imageAlt: "GAINSWave acoustic wave therapy for men in Las Vegas",
      },
      {
        kind: "process",
        eyebrow: "Consultation",
        heading: "What a GAINSWave visit includes",
        intro:
          "The visit starts with a free consultation. The provider uses your history and goals to decide whether acoustic wave therapy belongs in the plan.",
        steps: [
          {
            title: "Free consultation",
            text: "A Revival provider reviews your history and goals before recommending GAINSWave.",
            icon: "handshake",
          },
          {
            title: "Acoustic wave session",
            text: "High-frequency acoustic waves are applied to the penis to address blood flow, as described on this page.",
            icon: "wave",
          },
          {
            title: "Same-day activity",
            text: "The treatment is described as having no downtime, with a return to normal activity the same day.",
            icon: "timer",
          },
          {
            title: "Either Las Vegas clinic",
            text: "Book Henderson / Southwest at (702) 963-1154 or Summerlin / Northwest at (702) 725-1588.",
            icon: "user",
          },
        ],
      },
      {
        kind: "faq",
        eyebrow: "Questions",
        heading: "GAINSWave questions",
        items: [
          {
            question: "Who is GAINSWave for?",
            answer:
              "The page describes it for men over 30, including men with erectile dysfunction, men focused on performance, men who want to avoid a daily medication, and men combining it with other Revival treatments.",
          },
          {
            question: "What happens during a session?",
            answer:
              "High-frequency acoustic waves are applied to the penis. Revival describes this as a way to address micro-plaque and blood flow. No downtime is listed for the session.",
          },
          {
            question: "Where is GAINSWave offered?",
            answer:
              "At both Revival clinics: Henderson / Southwest on S. Cimarron Road and Summerlin / Northwest on Box Canyon Drive, both in Las Vegas and serving Henderson as well.",
          },
          {
            question: "How do I start?",
            answer:
              "Book a free consultation. The provider reviews your history and goals and tells you whether GAINSWave belongs in the plan.",
          },
        ],
      },
    ],
    ctaTitle: "Is GAINSWave™ right for you?",
    ctaSubtitle:
      "A free consultation is the fastest way to find out. We will review your history and goals with you.",
    galleryAlts: [
      "Man seated during GAINSWave acoustic wave therapy",
      "GAINSWave treatment room for men's sexual wellness",
      "Close view of GAINSWave therapy for men",
    ],
    relatedSlugs: ["p-shot-tm", "priapus-toxin", "trimix", "men"],
    meta: {
      title: "GAINSWave Therapy in Las Vegas",
      description:
        "GAINSWave acoustic wave therapy in Las Vegas for erectile function. Revival Health and Wellness offers this non-invasive option at both clinics.",
      canonical: "https://revivalhealthandwellnessgroup.com/gainswave-tm/",
    },
    schema: { medicalTherapyName: "GAINSWave™ Acoustic Wave Therapy" },
  },

  // ────────────────────────────────────────────────────────────────────────
  // MEN: /p-long/
  // ────────────────────────────────────────────────────────────────────────
  "p-long": {
    slug: "p-long",
    category: "men",
    eyebrow: "P-Long® Protocol",
    title: "The P-Long® Protocol",
    titleNode: {
      pre: "Increase the length & girth of your manhood by a",
      accent: "full inch",
      post: ".",
    },
    description:
      "The first and only clinically proven protocol to naturally increase the size of your manhood - no surgery, no cosmetic fillers, no negative side effects.",
    gallery: [
      "/images/sexual-wellness/p-long/condition-header-penis-enlargement.jpg",
      "/images/sexual-wellness/p-long/p-long-hero.jpg",
      "/images/sexual-wellness/p-long/p-long-younger-men-feat.jpg",
    ],
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "For Men", href: "/men/" },
      { label: "P-Long®" },
    ],
    sections: [
      {
        kind: "overview",
        eyebrow: "Introducing P-Long®",
        heading:
          "Naturally increase length, girth & function - clinically proven.",
        paragraphs: [
          "Over 50% of men wish their manhood was bigger. Until the release of P-Long, there was no scientifically proven natural way to increase the length, girth, and function of a healthy, normal penis.",
          "P-Long® is the first and only clinically proven protocol to naturally increase the size of your manhood without surgery, cosmetic fillers, or negative side effects.",
        ],
        image: "/images/sexual-wellness/p-long/sex-therapy-wellness.jpg",
        imageAlt: "P-Long protocol overview at Revival Health & Wellness",
        bullets: [
          "Discreet & Confidential",
          "FDA-Approved Collagen Fillers",
          "Performed by Experts",
        ],
      },
      {
        kind: "stats",
        eyebrow: "Backed by clinical research",
        heading: "The numbers behind the protocol",
        items: [
          {
            value: "100%",
            label: "increased length",
            sub: "average ~1 inch; girth up ~½ inch",
          },
          {
            value: "0%",
            label: "negative side effects",
            sub: "in participants during study",
          },
          {
            value: "576",
            label: "P-Long® patients",
            sub: "reported significant erectile function improvements",
          },
        ],
      },
      {
        kind: "features",
        eyebrow: "What you get",
        heading:
          "No longer will men have to attempt risky or artificial therapies - with the unfortunate results they too often produce.",
        items: [
          {
            title: "Increase Length",
            text: "Patients can expect to increase length by almost one full inch.",
            icon: "target",
          },
          {
            title: "Increase Girth",
            text: "P-Long patients can expect to increase girth by up to half an inch.",
            icon: "activity",
          },
          {
            title: "Safe & Surgery-Free",
            text: "Enjoy long-term results without painful, risky, or expensive surgeries.",
            icon: "shield",
          },
        ],
        tone: "cream",
      },
      {
        kind: "video",
        eyebrow: "See the science",
        heading: "How the P-Long® Protocol works",
        intro:
          "Watch the video below to learn more about the clinical protocol that's changing men's health.",
        videoId: "ZiuqW8CYkuA",
        caption: "BrandeisMD · The Only Clinically Proven Protocol",
      },
      {
        kind: "quote",
        eyebrow: "Real patient",
        quote:
          "I had struggled with confidence about my size for years but didn't want to risk surgery or medication. When I discovered the P-Long Protocol at Revival Health, I was impressed by the science and clinical results behind it. After completing the program, I noticed real improvements - not just in length and girth, but in my overall sexual performance and confidence.",
        attribution: "- Michael R.",
        image: "/images/sexual-wellness/p-long/p-long-younger-men-feat.jpg",
      },
      {
        kind: "overview",
        eyebrow: "About Revival Health & Wellness",
        heading: "Increase girth. Boost confidence. No scalpels, no stitches.",
        paragraphs: [
          "Revival Health & Wellness helps men optimize their health for peak performance - physically, mentally, and emotionally. Our expert team delivers personalized care designed to boost energy, enhance confidence, and support long-term wellness.",
          "Our medical team is dedicated to helping men restore performance, vitality, and overall wellness through advanced, science-based treatments and personalized care. With experience in hormone optimization, sexual wellness, and regenerative therapies, our providers focus on identifying the root causes of men's health concerns and developing tailored treatment plans designed for real, lasting results.",
        ],
        side: "right",
        image: "/images/sexual-wellness/p-long/condition-header-penis-enlargement.jpg",
        imageAlt: "Revival Health & Wellness - expert men's health care",
      },
      {
        kind: "warning",
        eyebrow: "Why not the alternatives?",
        heading: "The drawbacks of male enhancement surgery & fillers",
        intro:
          "Are you willing to invest thousands of dollars in procedures that may actually shorten your manhood? Many enlargement procedures result in infection, scar tissue, and outcomes that leave men worse than before.",
        items: [
          {
            title: "Penuma Surgical® Implant",
            text: "Dozens of men have had their permanent implants removed due to infection, pain, or dissatisfaction - which shortens length.",
          },
          {
            title: "Suspensory Ligament Division",
            text: "This surgery changes the angle of the manhood, which results in scar tissue formation that shrinks it.",
          },
          {
            title: "Cosmetic Dermal Fillers",
            text: "Temporary, expensive, don't increase length, and results only last 1–2 years - often with a lumpy, uneven finish.",
          },
        ],
      },
      {
        kind: "process",
        eyebrow: "Your journey",
        heading: "Find your path to better performance at Revival",
        intro:
          "Our trained medical professionals follow advanced protocols to help men restore confidence, performance, and overall wellness in a safe, supportive clinical setting.",
        steps: [
          {
            title: "Schedule",
            text: "Book a consultation with our experienced medical team to discuss concerns, goals, and treatment options.",
            icon: "timer",
          },
          {
            title: "Consult",
            text: "Meet with a Revival provider who performs a detailed evaluation and creates a personalized treatment plan.",
            icon: "handshake",
          },
          {
            title: "Revive",
            text: "Begin your customized treatment program under the care of our medical professionals.",
            icon: "flame",
          },
        ],
      },
      {
        kind: "bullets",
        eyebrow: "Our Commitment to Men's Health & Vitality",
        heading:
          "Every man deserves to feel confident, energized, and in control of his health.",
        intro:
          "Through innovative therapies and a patient-first philosophy, our mission is simple: to help men regain confidence, improve performance, and live healthier, more fulfilling lives.",
        items: [
          "Individualized attention in a comfortable, supportive environment",
          "Clinical expertise paired with a compassionate approach",
          "Root-cause identification, not just symptom management",
          "Ongoing support through your entire treatment journey",
        ],
        columns: 2,
      },
    ],
    ctaTitle: "Add an inch in length - without surgery.",
    ctaSubtitle:
      "The P-Long Protocol is the first and only clinically proven, non-surgical approach. Book your free consultation.",
    relatedSlugs: ["p-shot-tm", "gainswave-tm", "priapus-toxin", "men"],
    meta: {
      title: "P-Long Protocol for Men | Revival Health & Wellness",
      description:
        "The P-Long protocol in Las Vegas is a structured men's program at Revival Health and Wellness. A consultation covers whether it fits your goals.",
      canonical: "https://revivalhealthandwellnessgroup.com/p-long/",
    },
    schema: { medicalTherapyName: "P-Long® Protocol" },
  },

  // ────────────────────────────────────────────────────────────────────────
  // MEN: /viagra/
  // ────────────────────────────────────────────────────────────────────────
  viagra: {
    slug: "viagra",
    category: "men",
    eyebrow: "Viagra® · For Men",
    title: "Viagra® for Erectile Dysfunction",
    titleNode: {
      pre: "Trusted",
      accent: "oral treatment",
      post: "for ED",
    },
    description:
      "Viagra® is a safe and effective oral treatment for erectile dysfunction - available since 1998 and suitable for men of all ages.",
    gallery: [
      "/images/sexual-wellness/viagra/viagra-1.jpg",
      "/images/sexual-wellness/viagra/viagra.avif",
      "/images/sexual-wellness/viagra/viagra-3.webp",
    ],
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "For Men", href: "/men/" },
      { label: "Viagra®" },
    ],
    sections: [
      {
        kind: "overview",
        eyebrow: "Discover the Benefits",
        heading: "The oldest, most-trusted ED medication",
        paragraphs: [
          "Viagra® is a safe and effective oral treatment for erectile dysfunction, suitable for men of all ages. Available since 1998, it is the oldest FDA-approved treatment for erectile dysfunction on the market.",
          "Most men begin to feel its effects within 30 to 60 minutes after taking it. When prescribed and monitored by a physician, it remains one of the simplest and most reliable ED solutions.",
        ],
        image: "/images/sexual-wellness/viagra/viagra-1.jpg",
        imageAlt: "Viagra® oral treatment for ED",
      },
      {
        kind: "overview",
        eyebrow: "The Science",
        heading: "How Viagra works",
        paragraphs: [
          "Viagra works by enhancing blood flow to the soft tissue of the penis. It causes the walls of your blood vessels to relax, allowing blood to flow more easily. This relaxation helps men achieve and maintain a strong erection.",
        ],
        side: "right",
        image: "/images/sexual-wellness/viagra/viagra.avif",
        imageAlt: "How Viagra® works - improved blood flow",
      },
      {
        kind: "features",
        eyebrow: "Good candidates",
        heading: "Is Viagra right for you?",
        intro:
          "If you're experiencing ED that's affecting your sex life, you may be an excellent candidate. Please schedule an appointment at one of our clinics for a proper evaluation.",
        items: [
          {
            title: "Occasional ED",
            text: "Reliable as-needed support without a permanent regimen.",
            icon: "pill",
          },
          {
            title: "Age 40+",
            text: "The most-studied ED medication for men across age ranges.",
            icon: "user",
          },
          {
            title: "Willing to plan ahead",
            text: "Takes 30–60 minutes to activate - plan accordingly.",
            icon: "timer",
          },
          {
            title: "Physician-supervised",
            text: "Every Rx we issue is reviewed by a Revival provider first.",
            icon: "shield",
          },
        ],
        tone: "cream",
      },
    ],
    ctaTitle: "Get a physician-supervised Viagra Rx.",
    ctaSubtitle:
      "Book a free consultation to see if Viagra is the right fit - or explore non-medication alternatives with our team.",
    relatedSlugs: ["trimix", "gainswave-tm", "p-shot-tm", "men"],
    meta: {
      title: "Viagra and Sexual Wellness | Revival Health & Wellness",
      description:
        "Support your sexual wellness with Viagra in Las Vegas. Revival Health and Wellness provides medically supervised ED treatment options including Viagra.",
      canonical: "https://revivalhealthandwellnessgroup.com/viagra/",
    },
    schema: { medicalTherapyName: "Viagra® (Sildenafil) Therapy" },
  },

  // ────────────────────────────────────────────────────────────────────────
  // MEN: /trimix/
  // ────────────────────────────────────────────────────────────────────────
  trimix: {
    slug: "trimix",
    category: "men",
    eyebrow: "TriMix · For Men",
    title: "TriMix Injections for Men",
    titleNode: {
      pre: "An effective",
      accent: "injectable therapy",
      post: "for erectile dysfunction",
    },
    description:
      "An at-home injectable treatment for erectile dysfunction with a 90% success rate - reliable when oral medications aren't enough.",
    gallery: [
      "/images/sexual-wellness/trimix/trimix.jpg",
      "/images/sexual-wellness/trimix/trimix-1.webp",
      "/images/sexual-wellness/trimix/trimix-3.webp",
    ],
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "For Men", href: "/men/" },
      { label: "TriMix" },
    ],
    sections: [
      {
        kind: "overview",
        eyebrow: "Explore TriMix",
        heading: "An effective injectable treatment for ED",
        paragraphs: [
          "TriMix is an at-home injectable treatment for erectile dysfunction, composed of a mixture of papaverine, phentolamine, and prostaglandin E1 - with a 90% success rate among patients.",
          "This powerful combination works by causing the corpus cavernosum - the erectile tissue in the penis - to relax, expand, and become engorged with blood, resulting in a strong and sustained erection.",
        ],
        image: "/images/sexual-wellness/trimix/trimix.jpg",
        imageAlt: "TriMix injectable therapy overview",
      },
      {
        kind: "stats",
        eyebrow: "Why patients choose it",
        items: [
          { value: "90%", label: "success rate", sub: "across TriMix patients" },
          { value: "3x", label: "per week max", sub: "24 hours apart" },
          { value: "Fast", label: "onset", sub: "within minutes" },
        ],
      },
      {
        kind: "process",
        eyebrow: "Treatment details",
        heading: "How your TriMix program starts",
        intro:
          "If our specialists determine TriMix is right for you, we guide you through the entire self-injection process at our clinic during your first visit.",
        steps: [
          {
            title: "Evaluate candidacy",
            text: "Full history + baseline exam to confirm TriMix is safe and appropriate.",
            icon: "check",
          },
          {
            title: "First in-clinic dose",
            text: "We establish the correct dose with your first supervised injection.",
            icon: "syringe",
          },
          {
            title: "Learn self-injection",
            text: "You leave confident on technique, dosing, and how to store your medication.",
            icon: "handshake",
          },
          {
            title: "Home routine",
            text: "Up to three TriMix injections per week, with each spaced at least 24 hours apart.",
            icon: "timer",
          },
        ],
      },
    ],
    ctaTitle: "When oral ED meds aren't enough - TriMix is.",
    ctaSubtitle:
      "Book a free consultation and let our team decide if TriMix is the right next step for you.",
    relatedSlugs: ["viagra", "gainswave-tm", "priapus-toxin", "men"],
    meta: {
      title: "Trimix Injections for Men | Revival Health & Wellness",
      description:
        "Find a reliable solution w/ Trimix injections in Las Vegas. Revival Health and Wellness offers customized Trimix therapy for men who need stronger ED support.",
      canonical: "https://revivalhealthandwellnessgroup.com/trimix/",
    },
    schema: { medicalTherapyName: "TriMix Injection Therapy" },
  },

  // ────────────────────────────────────────────────────────────────────────
  // MEN: /priapus-toxin/
  // ────────────────────────────────────────────────────────────────────────
  "priapus-toxin": {
    slug: "priapus-toxin",
    category: "men",
    eyebrow: "Priapus Toxin™ · For Men",
    title: "Priapus Toxin™ Treatment",
    titleNode: {
      pre: "Advanced non-surgical",
      accent: "toxin therapy",
      post: "for erectile performance",
    },
    description:
      "A cutting-edge sexual wellness treatment using targeted botulinum toxin to enhance blood flow, relax penile muscles, and improve erection quality.",
    gallery: [
      "/images/sexual-wellness/priapus-toxin/priapus-toxin-1.jpg",
      "/images/sexual-wellness/priapus-toxin/priapus-toxin-2.png",
      "/images/sexual-wellness/trimix/trimix-1.webp",
    ],
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "For Men", href: "/men/" },
      { label: "Priapus Toxin™" },
    ],
    sections: [
      {
        kind: "overview",
        eyebrow: "Sexual Wellness for Men",
        heading: "Achieve stronger erections and better orgasms",
        paragraphs: [
          "Priapus Toxin™ is a cutting-edge treatment offered by Revival Health and Wellness to help you overcome erectile issues and achieve more powerful, consistent erections.",
          "This innovative approach uses botulinum toxin to relax targeted penile muscles, enhance blood circulation, and improve the overall quality of erections and orgasms.",
        ],
        image: "/images/sexual-wellness/priapus-toxin/priapus-toxin.jpg",
        imageAlt: "Priapus Toxin™ treatment overview",
        imageContain: true,
        imageWidth: 1080,
        imageHeight: 1080,
      },
      {
        kind: "overview",
        eyebrow: "How it works",
        heading: "The science behind Priapus Toxin™",
        paragraphs: [
          "Priapus Toxin™ involves injecting 100 units of botulinum toxin into the corpus cavernosum - the erectile tissue of the penis. 50 units are injected on either side of the muscle.",
          "Botulinum toxin is a neuromodulator that blocks communication between nerve endings and muscles, causing the targeted muscles to relax. This relaxation allows blood to flow more freely into the penis - facilitating stronger and more sustained erections.",
        ],
        image: "/images/sexual-wellness/priapus-toxin/priapus-toxin-1.jpg",
        imageAlt: "How Priapus Toxin™ works",
        side: "right",
      },
      {
        kind: "bullets",
        eyebrow: "What it can help with",
        heading: "Priapus Toxin™ addresses",
        items: [
          "Erectile dysfunction",
          "Weak erections",
          "Inability to maintain erections",
          "Premature ejaculation",
          "Weak orgasm quality",
          "Overall sexual performance concerns",
        ],
        columns: 2,
      },
      {
        kind: "overview",
        eyebrow: "Combination therapy",
        heading: "Even better paired with PRP",
        paragraphs: [
          "If you want to enhance the results of Priapus Toxin™ even further, you can combine it with PRP (platelet-rich plasma) therapy. PRP, derived from your own blood, has been used for male sexual wellness for years with remarkable results.",
          "Growth factors and platelets in PRP drive cellular regeneration and the formation of new blood vessels. When combined with Priapus Toxin™, the two treatments work synergistically for powerful erections and improved orgasms.",
        ],
        image: "/images/sexual-wellness/priapus-toxin/priapus-toxin-2.png",
        imageAlt: "Priapus Toxin™ combined with PRP therapy",
      },
      {
        kind: "stats",
        eyebrow: "Results timeline",
        items: [
          { value: "2–6 wk", label: "results develop", sub: "gradually build over weeks" },
          { value: "~6 mo", label: "duration", sub: "before optional touch-up" },
          { value: "In-clinic", label: "single session", sub: "no downtime after" },
        ],
      },
    ],
    ctaTitle: "Curious if Priapus Toxin™ is right for you?",
    ctaSubtitle:
      "Book a free, discreet consultation. We'll walk through candidacy, expected results, and combination options.",
    relatedSlugs: ["p-shot-tm", "gainswave-tm", "trimix", "men"],
    meta: {
      title: "Priapus Toxin™ Treatments | Revival Health & Wellness",
      description:
        "Priapus Toxin in Las Vegas is a non-surgical men's treatment at Revival Health and Wellness, aimed at blood flow and erectile function.",
      canonical: "https://revivalhealthandwellnessgroup.com/priapus-toxin/",
    },
    schema: { medicalTherapyName: "Priapus Toxin™ Therapy" },
  },

  // ────────────────────────────────────────────────────────────────────────
  // MEN: /emsella/
  // ────────────────────────────────────────────────────────────────────────
  emsella: {
    slug: "emsella",
    category: "men",
    eyebrow: "EMSELLA™ · For Men",
    title: "EMSELLA™ for Erectile Dysfunction",
    titleNode: {
      pre: "A",
      accent: "non-invasive",
      post: "pelvic floor solution for ED",
    },
    description:
      "An FDA-approved, non-invasive treatment designed to strengthen the pelvic floor muscles that support erectile function.",
    gallery: [
      "/images/sexual-wellness/emsella/emsella-chair-equipment.jpg",
      "/images/sexual-wellness/emsella/emsella-men-photo.jpg",
    ],
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "For Men", href: "/men/" },
      { label: "EMSELLA™" },
    ],
    sections: [
      {
        kind: "overview",
        eyebrow: "EMSELLA™ for Erectile Dysfunction",
        heading: "A non-invasive solution for ED",
        paragraphs: [
          "At Revival Health and Wellness, we understand that sexual health is an essential part of overall well-being. Successfully addressing complex issues like ED often requires more than a generic treatment; it needs a comprehensive, personalized approach that considers various factors unique to each individual.",
          "Erectile dysfunction (ED) is a common issue - affecting over 30 million men and nearly 70% of those aged 70 and above. Left untreated, ED can significantly impact a man's social, emotional, and physical well-being, potentially leading to conditions like low self-esteem, anxiety, and depression.",
          "Revival Health and Wellness proudly offers EMSELLA™ as part of our ED treatment options. EMSELLA™ is FDA-approved and non-invasive, designed to improve muscle strength and endurance to aid in better sexual performance. Unlike medications, surgery, or other invasive procedures, EMSELLA™ works by stimulating the pelvic floor muscles needed to achieve and maintain an erection naturally - without hormones or drugs.",
        ],
        image: "/images/sexual-wellness/emsella/emsella-ed-before-after.png",
        imageAlt: "EMSELLA chair before-and-after result for a male patient",
      },
      {
        kind: "overview",
        eyebrow: "What is EMSELLA™?",
        heading: "HIFEM technology - thousands of contractions in 30 minutes",
        paragraphs: [
          "EMSELLA™ is a convenient, non-surgical treatment that targets weak pelvic floor muscles using High-Intensity Focused Electromagnetic (HIFEM) technology. During each 30-minute session, the EMSELLA™ chair delivers thousands of contractions - strengthening the muscles responsible for erectile function.",
          "This treatment improves blood flow to the pelvic region, leading to better control over erections, improved sexual performance, and enhanced sensation.",
        ],
        side: "right",
        image: "/images/sexual-wellness/emsella/emsella-chair-equipment.jpg",
        imageAlt: "EMSELLA chair equipment in a clinical setting",
      },
      {
        kind: "video",
        eyebrow: "Watch",
        heading: "A closer look at EMSELLA™ for ED",
        intro:
          "How EMSELLA™ works and why it pairs beautifully with our other ED therapies - a full overview from our medical team.",
        videoId: "Nq4yqKCBydI",
        caption: "Revival H&W · Erectile Dysfunction overview",
      },
      {
        kind: "bullets",
        eyebrow: "Why Choose EMSELLA™ for ED?",
        heading: "Nine benefits patients report",
        items: [
          "Reduction in premature ejaculation",
          "Enhanced ability to achieve and maintain erections",
          "Greater sexual satisfaction and orgasm intensity",
          "Heightened sexual sensation due to improved blood circulation",
          "No downtime or recovery period",
          "Increased rigidity and firmness of erections",
          "Prolonged time to ejaculation",
          "A natural, painless solution without medication",
          "Long-lasting results",
        ],
        columns: 2,
      },
      {
        kind: "stats",
        eyebrow: "What to expect",
        heading: "The EMSELLA™ protocol at Revival",
        items: [
          { value: "30 min", label: "per session", sub: "fully clothed" },
          { value: "6", label: "sessions", sub: "twice weekly, standard course" },
          {
            value: "9–12 mo",
            label: "results last",
            sub: "touch-up in 3–6 months for peak",
          },
        ],
      },
      {
        kind: "overview",
        eyebrow: "What to Expect from Your EMSELLA™ Experience",
        heading: "Fully clothed. Fully seated. 30 minutes.",
        paragraphs: [
          "During an EMSELLA™ session at Revival Health and Wellness, you'll remain fully clothed and seated on the specialized chair as the treatment works to stimulate your pelvic muscles. Each session takes around 30 minutes, and a typical course involves six sessions, spaced twice a week. Most men notice improvements in their ED symptoms after the first treatment, with more significant results following subsequent sessions.",
          "The effects of EMSELLA™ typically last between 9 to 12 months. For optimal outcomes, we may recommend a follow-up session within 3–6 months after completing the initial treatment series.",
          "If you're already undergoing other ED therapies at Revival Health and Wellness - such as testosterone replacement, TriMix, GAINSWave®, or the Priapus Shot® - combining these with EMSELLA™ can further enhance your results. Our board-certified physicians are experts in creating comprehensive treatment plans that integrate multiple therapies for lasting, meaningful results.",
        ],
        side: "right",
        image: "/images/sexual-wellness/emsella/emsella-men-2.webp",
        imageAlt: "EMSELLA session experience",
      },
    ],
    ctaTitle: "Ready to strengthen the foundation of your erections?",
    ctaSubtitle:
      "Book a free consultation. EMSELLA™ pairs beautifully with our other ED therapies.",
    relatedSlugs: ["gainswave-tm", "trimix", "p-shot-tm", "men"],
    meta: {
      title:
        "Emsella™ Pelvic Floor Treatment | Revival Health & Wellness",
      description:
        "Emsella in Las Vegas is a fully clothed pelvic floor treatment at Revival Health and Wellness for bladder control and intimacy.",
      canonical: "https://revivalhealthandwellnessgroup.com/emsella/",
    },
    schema: { medicalTherapyName: "EMSELLA™ HIFEM Pelvic Floor Therapy (Men)" },
  },

  // ────────────────────────────────────────────────────────────────────────
  // WOMEN: /o-shot-tm/
  // ────────────────────────────────────────────────────────────────────────
  "o-shot-tm": {
    slug: "o-shot-tm",
    category: "women",
    eyebrow: "O-Shot® · For Women",
    title: "The O-Shot® for Women",
    titleNode: {
      pre: "The",
      accent: "Orgasm Shot®",
      post: "for women's sexual wellness",
    },
    description:
      "A natural, safe, minimally invasive PRP treatment that boosts sexual pleasure and overall intimate health.",
    gallery: [
      "/images/sexual-wellness/o-shot/o-shot-model-card.webp",
      "/images/sexual-wellness/sw-woman-wellness.jpg",
      "/images/sexual-wellness/sw-clinic-modern.jpg",
    ],
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "For Women", href: "/women/" },
      { label: "O-Shot®" },
    ],
    sections: [
      {
        kind: "overview",
        eyebrow: "Sexual Wellness for Women",
        heading: "The O-Shot® treatment",
        paragraphs: [
          "If you're not satisfied with your sexual life and are seeking treatments to enhance it, Revival Health and Wellness has you covered. The O-Shot® is a natural and safe way to boost your sexual wellness.",
          "This minimally invasive treatment can help you experience improved sexual pleasure, comfort, and overall health.",
        ],
        image: "/images/sexual-wellness/sw-lab-plasma.jpg",
        imageAlt: "PRP being prepared for the O-Shot procedure",
      },
      {
        kind: "overview",
        eyebrow: "What is sexual wellness?",
        heading: "Why intimate health matters",
        paragraphs: [
          "Sexual wellness encompasses how satisfied you feel about your sexual relationships, performance, and experiences. Issues like loss of vaginal lubrication, decreased libido, vaginal laxity, and urinary incontinence can chip away at confidence and self-esteem.",
          "Prioritizing sexual wellness helps restore hormonal balance and fosters a healthier, more fulfilling life.",
        ],
        side: "right",
        image: "/images/sexual-wellness/sw-woman-wellness.jpg",
        imageAlt: "Woman at a wellness retreat",
      },
      {
        kind: "bullets",
        eyebrow: "What the O-Shot does",
        heading: "Real benefits patients report",
        items: [
          "Boosts sexual arousal and drive",
          "More sensation during sexual activity",
          "Smoother, more youthful vaginal skin",
          "Alleviates urinary incontinence",
          "Improves vaginal lubrication",
          "Enhances orgasms",
          "Tightens the vaginal opening",
          "Reduces pain during intercourse",
        ],
        columns: 2,
      },
      {
        kind: "process",
        eyebrow: "The process",
        heading: "How your O-Shot appointment flows",
        intro:
          "Most patients find the entire treatment surprisingly comfortable and quick - about 30 minutes total.",
        steps: [
          {
            title: "Numb the area",
            text: "A topical numbing cream is applied to the genital area for full comfort.",
            icon: "shield",
          },
          {
            title: "Draw & process blood",
            text: "A small volume of blood is drawn and spun in a centrifuge to separate the PRP.",
            icon: "flask",
          },
          {
            title: "Prepare PRP",
            text: "The plasma is drawn into a syringe, ready for precise injection.",
            icon: "syringe",
          },
          {
            title: "Careful injection",
            text: "Injections are administered around the labia minora and clitoris.",
            icon: "target",
          },
        ],
      },
    ],
    ctaTitle: "Curious if the O-Shot® is right for you?",
    ctaSubtitle:
      "Book a private, physician-led consultation. Every conversation stays between you and our medical team.",
    relatedSlugs: ["gainswavetm-for-her", "emsella-2", "women"],
    meta: {
      title: "O-Shot Treatment for Women | Revival Health & Wellness",
      description:
        "O-Shot treatment in Las Vegas uses platelet-rich plasma. Revival Health and Wellness offers it for women's sensitivity, function, and confidence.",
      canonical: "https://revivalhealthandwellnessgroup.com/o-shot-tm/",
    },
    schema: { medicalTherapyName: "O-Shot® (Orgasm Shot®) PRP Therapy" },
  },

  // ────────────────────────────────────────────────────────────────────────
  // WOMEN: /gainswavetm-for-her/
  // ────────────────────────────────────────────────────────────────────────
  "gainswavetm-for-her": {
    slug: "gainswavetm-for-her",
    category: "women",
    eyebrow: "GAINSWave™ For Her",
    title: "GAINSWave™ For Her",
    titleNode: {
      pre: "Non-invasive",
      accent: "acoustic wave",
      post: "therapy for women",
    },
    description:
      "Revolutionary sound-wave therapy that increases blood flow and promotes healing to enhance arousal, sensation, and comfort.",
    gallery: [
      "/images/sexual-wellness/gainswavetm-for-her/gainswavetm-for-her-1.jpg",
      "/images/sexual-wellness/gainswavetm-for-her/gainswavetm-for-her-2.avif",
      "/images/sexual-wellness/gainswavetm-for-her/gainswavetm-for-her-3.webp",
    ],
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "For Women", href: "/women/" },
      { label: "GAINSWave™ For Her" },
    ],
    sections: [
      {
        kind: "overview",
        eyebrow: "Non-invasive treatment",
        heading: "Improve sexual function - without surgery",
        paragraphs: [
          "GAINSWave™ For Her is a revolutionary treatment for female sexual dysfunction that uses advanced sound wave technology to increase blood flow and promote healing - without the need for invasive procedures.",
          "By utilizing high-frequency acoustic waves, this treatment addresses the underlying causes of sexual dysfunction, stimulating new blood vessels and nerve cells to increase lubrication and heighten sensitivity.",
        ],
        image: "/images/sexual-wellness/gainswavetm-for-her/gainswavetm-for-her-1.jpg",
        imageAlt: "GAINSWave™ For Her acoustic wave therapy",
      },
      {
        kind: "video",
        eyebrow: "See it in action",
        heading: "Watch how GAINSWave™ For Her works",
        intro:
          "A quick look at what to expect from acoustic wave therapy at Revival.",
        src: "/videos/gainswave-for-her.mp4",
        poster: "/videos/gainswave-for-her-poster.jpg",
      },
      {
        kind: "bullets",
        eyebrow: "What it can do",
        heading: "GAINSWave™ For Her can",
        items: [
          "Increase sensitivity and sensation",
          "Improve arousal and sexual response",
          "Enhance orgasmic experiences",
          "Increase natural lubrication",
          "Increase muscle control in the vagina",
          "Improve vaginal tightness",
          "Address the underlying causes of sexual dysfunction",
          "Restore overall sexual health",
        ],
        columns: 2,
      },
      {
        kind: "features",
        eyebrow: "The benefits",
        heading: "What patients love about the treatment",
        items: [
          {
            title: "Non-invasive and safe",
            text: "No surgery, no medication, no scalpels.",
            icon: "shield",
          },
          {
            title: "Comfortable outpatient care",
            text: "Performed in a private, comfortable outpatient setting.",
            icon: "sparkles",
          },
          {
            title: "Little to no recovery",
            text: "Return to normal activities soon after your session.",
            icon: "timer",
          },
          {
            title: "Root-cause approach",
            text: "Addresses causes of sexual dysfunction - not just symptoms.",
            icon: "target",
          },
          {
            title: "For every stage",
            text: "Suitable for both pre- and post-menopausal women.",
            icon: "heart",
          },
          {
            title: "No reported side effects",
            text: "Clean safety profile in every published series.",
            icon: "check",
          },
        ],
        tone: "cream",
      },
      {
        kind: "overview",
        eyebrow: "Session planning",
        heading: "How many sessions will I need?",
        paragraphs: [
          "The recommended course of treatment usually involves 6–12 GAINSWave™ sessions for optimal results. However, the exact number of sessions varies with your specific concerns and medical history.",
          "During your consultation, we'll assess your needs and create a personalized plan tailored to you.",
        ],
        image: "/images/sexual-wellness/gainswavetm-for-her/gainswavetm-for-her-2.avif",
        imageAlt: "GAINSWave™ For Her session planning",
        side: "right",
      },
    ],
    ctaTitle: "Ready to feel more, and more often?",
    ctaSubtitle:
      "Book a private consultation with a Revival provider. We'll walk through what the treatment involves and design a plan for you.",
    relatedSlugs: ["o-shot-tm", "emsella-2", "women"],
    meta: {
      title:
        "GAINSWave™ For Her Treatments | Revival Health & Wellness",
      description:
        "Experience better blood flow & sensation with GAINSWave™ For Her. Revival Health and Wellness uses acoustic wave therapy designed specifically for women.",
      canonical:
        "https://revivalhealthandwellnessgroup.com/gainswavetm-for-her/",
    },
    schema: {
      medicalTherapyName: "GAINSWave™ For Her Acoustic Wave Therapy",
    },
  },

  // ────────────────────────────────────────────────────────────────────────
  // WOMEN: /emsella-2/
  // ────────────────────────────────────────────────────────────────────────
  "emsella-2": {
    slug: "emsella-2",
    category: "women",
    eyebrow: "EMSELLA™ · For Women",
    title: "EMSELLA™ Pelvic Floor Therapy for Women",
    titleNode: {
      pre: "Strengthen your",
      accent: "pelvic floor",
      post: "- fully clothed.",
    },
    description:
      "Non-invasive HIFEM® technology that induces thousands of Kegel-like contractions per session to treat urinary incontinence and rebuild pelvic strength.",
    gallery: [
      "/images/sexual-wellness/emsella-2/emsella-4.webp",
      "/images/sexual-wellness/emsella-2/emsella-1.jpg",
      "/images/sexual-wellness/emsella-2/emsella-3.png",
    ],
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "For Women", href: "/women/" },
      { label: "EMSELLA™" },
    ],
    sections: [
      {
        kind: "overview",
        eyebrow: "Transform your intimate health",
        heading: "EMSELLA™ for women's health",
        paragraphs: [
          "EMSELLA™ is a non-invasive treatment that uses High-Intensity Focused Electromagnetic (HIFEM®) technology to strengthen pelvic floor muscles and treat urinary incontinence. It's FDA-approved for both men and women.",
          "This revolutionary technology transforms intimate health and wellness for women - a completely non-invasive solution for stress and urge incontinence.",
        ],
        image: "/images/sexual-wellness/emsella-2/emsella-1.jpg",
        imageAlt: "EMSELLA HIFEM pelvic floor therapy for women",
      },
      {
        kind: "video",
        eyebrow: "See it in action",
        heading: "Watch how EMSELLA™ works",
        intro:
          "A quick look at what to expect from an EMSELLA™ session at Revival.",
        src: "/videos/emsella-2.mp4",
        poster: "/videos/emsella-2-poster.jpg",
      },
      {
        kind: "overview",
        eyebrow: "How it works",
        heading: "The science behind EMSELLA™",
        paragraphs: [
          "EMSELLA™, using HIFEM® technology, induces thousands of Kegel-like pelvic floor muscle contractions in a single session. These contractions re-educate and strengthen weak pelvic floor muscles - restoring neuromuscular control and improving urinary incontinence.",
          "Strong pelvic floor muscles support the pelvic organs and give control over the bladder and bowel. When those muscles weaken, incontinence and dysfunction follow. EMSELLA™ fixes the foundation.",
        ],
        side: "right",
        image: "/images/sexual-wellness/emsella-2/emsella-4.webp",
        imageAlt: "HIFEM technology and pelvic floor strengthening",
      },
      {
        kind: "stats",
        eyebrow: "The science",
        heading: "Clinical data, real results",
        items: [
          {
            value: "64%",
            label: "urinary incontinence",
            sub: "improvement on average",
          },
          {
            value: "57%",
            label: "hygiene pad reduction",
            sub: "on average",
          },
          {
            value: "7×",
            label: "more effective",
            sub: "than Kegel exercise",
          },
        ],
      },
      {
        kind: "bullets",
        eyebrow: "Why choose EMSELLA™",
        heading: "The benefits of this therapy",
        items: [
          "Non-invasive procedure with 95% patient satisfaction",
          "Up to 75% reduction in pad consumption",
          "Up to 95% reduction in stress urinary incontinence",
          "Reduces irritation, stress, shame, and social anxiety",
          "Restores control of your bladder - and your confidence",
        ],
        columns: 2,
      },
      {
        kind: "overview",
        eyebrow: "When will I see results?",
        heading: "What to expect from EMSELLA™",
        paragraphs: [
          "Most patients see improvement after six sessions, twice weekly. Depending on how severe your condition is, some notice relief after just a few sessions. Grade 0–1 urinary incontinence responds very well.",
          "A brief worsening before an improvement is normal. Some patients may need follow-up treatments in the future - we'll set expectations based on your specific case.",
        ],
        image: "/images/sexual-wellness/emsella-2/emsella-3.png",
        imageAlt: "EMSELLA treatment results - restored confidence and control",
      },
    ],
    ctaTitle: "Ready to stop the leaks?",
    ctaSubtitle:
      "Book a private consultation. EMSELLA™ pairs powerfully with the O-Shot® and GAINSWave™ For Her.",
    relatedSlugs: ["o-shot-tm", "gainswavetm-for-her", "women"],
    meta: {
      title:
        "EMSELLA Pelvic Floor Therapy | Revival Health & Wellness",
      description:
        "EMSELLA in Las Vegas is an FDA-cleared pelvic floor treatment at Revival Health and Wellness for bladder leaks and strength.",
      canonical: "https://revivalhealthandwellnessgroup.com/emsella-2/",
    },
    schema: {
      medicalTherapyName: "EMSELLA™ HIFEM Pelvic Floor Therapy (Women)",
    },
  },
};

export function getSWPage(slug: string): SWPage | undefined {
  return SW_CONTENT[slug];
}

/** Fallback image used everywhere a page hasn't set its own OG. */
export const SW_DEFAULT_OG = HUB_IMAGE;
