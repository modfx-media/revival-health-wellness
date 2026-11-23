"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import {
  ArrowRight,
  ChevronRight,
  Droplet,
  Flame,
  FlaskConical,
  HeartPulse,
  Shield,
  ShieldCheck,
  Smile,
  Sparkles,
  Syringe,
  Target,
  Timer,
  Zap,
} from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import CTABanner from "@/components/ui/CTABanner";
import { FAQSection } from "@/components/templates/HormoneSections";
import { ZENOTI } from "@/lib/content/home";

const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
};
const fadeStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const BENEFITS = [
  { Icon: Flame, label: "Boosts sexual arousal & drive" },
  { Icon: Zap, label: "More sensation during intimacy" },
  { Icon: Sparkles, label: "Smoother, more youthful vaginal skin" },
  { Icon: ShieldCheck, label: "Alleviates urinary incontinence" },
  { Icon: Droplet, label: "Improves vaginal lubrication" },
  { Icon: HeartPulse, label: "Enhances orgasms" },
  { Icon: Target, label: "Tightens the vaginal opening" },
  { Icon: Smile, label: "Reduces pain during intercourse" },
];

const PROCESS_STEPS = [
  {
    n: "01",
    Icon: Shield,
    title: "Numb the area",
    text: "A topical numbing cream is applied to the treatment area for full comfort.",
  },
  {
    n: "02",
    Icon: Droplet,
    title: "Draw your blood",
    text: "A small volume of your own blood is drawn - no donors, no synthetics.",
  },
  {
    n: "03",
    Icon: FlaskConical,
    title: "Spin the PRP",
    text: "A centrifuge separates the platelet-rich plasma from the red blood cells.",
  },
  {
    n: "04",
    Icon: Syringe,
    title: "Precise injection",
    text: "PRP is carefully injected around the labia minora and clitoris - quick and tolerable.",
  },
];

const FAQS = [
  {
    question: "What is the O-Shot® treatment?",
    answer:
      "The O-Shot® is a natural, minimally invasive treatment for women experiencing symptoms of menopause, loss of libido, and a decline in sexual health. Using platelet-rich plasma (PRP) drawn from your own blood, it stimulates blood flow and promotes new tissue development in the vaginal area - effectively reversing effects of aging and hormonal changes.",
  },
  {
    question: "What is sexual wellness?",
    answer:
      "Sexual wellness encompasses how satisfied you feel about your sexual relationships, performance, and experiences. Maintaining harmony in sexual wellness significantly impacts your relational, emotional, and physical well-being. Issues like loss of vaginal lubrication, decreased libido, vaginal laxity, and urinary incontinence can affect confidence and self-esteem.",
  },
  {
    question: "How does the O-Shot work?",
    answer:
      "The platelets in your blood contain powerful growth factors that stimulate new tissues and collagen when injected. These growth factors activate stem cells, leading to healthy tissue development that rejuvenates and heals your clitoral and vaginal tissues while reducing vaginal dryness.",
  },
  {
    question: "Is there downtime or side effects?",
    answer:
      "There is no downtime - you can return to daily routine immediately after the procedure. Since the platelets are drawn from your own body, there is no allergy risk. Some patients may experience minimal, temporary swelling, numbness, redness, or sensitivity in the treated area. Side effects are generally mild and short-lived.",
  },
  {
    question: "How long does the appointment take?",
    answer:
      "The entire treatment is quick - most patients are in and out in about 30 minutes and find the procedure surprisingly comfortable thanks to the topical numbing.",
  },
];

// ─── Section: Split intro ──────────────────────────────────────────────────

function IntroSection() {
  return (
    <section className="relative overflow-hidden bg-revival-warm-white py-16 lg:py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-8">
        <motion.div
          variants={fadeStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.span
            variants={fadeUp}
            className="text-tagline inline-flex items-center gap-2 rounded-full border border-revival-gold/25 bg-white/70 px-3.5 py-1.5 text-xs text-revival-gold"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Sexual Wellness for Women
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="mt-5 font-heading font-light leading-[1.05] text-revival-dark"
            style={{ fontSize: "clamp(2.1rem, 4vw, 3.4rem)" }}
          >
            A natural way to{" "}
            <span className="italic text-revival-gold">reclaim intimacy</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-6 text-lg leading-relaxed text-revival-charcoal/85"
          >
            If you&apos;re not satisfied with your sexual life and are seeking
            treatments to enhance it, Revival Health and Wellness has you
            covered. The O-Shot® is a natural, safe way to boost your sexual
            wellness - a minimally invasive treatment that helps you experience
            improved sexual pleasure and overall health.
          </motion.p>

          <motion.ul
            variants={fadeStagger}
            className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2"
          >
            {[
              "Loss of libido",
              "Vaginal laxity",
              "Vaginal dryness",
              "Urinary incontinence",
              "Reduced sensation",
              "Pain during intimacy",
            ].map((c) => (
              <motion.li
                key={c}
                variants={fadeUp}
                className="flex items-center gap-2.5 rounded-2xl bg-white/80 px-4 py-3 text-sm text-revival-charcoal/80 shadow-sm ring-1 ring-revival-gold/15"
              >
                <span
                  aria-hidden
                  className="h-1.5 w-1.5 shrink-0 rounded-full bg-revival-gold"
                />
                {c}
              </motion.li>
            ))}
          </motion.ul>

          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-3">
            <Link
              href={ZENOTI}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-revival-dark px-6 py-3 text-sm font-semibold text-white transition hover:bg-revival-charcoal"
            >
              Book a private consultation
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/quiz/"
              className="inline-flex items-center gap-2 rounded-full border border-revival-dark/15 bg-white px-6 py-3 text-sm font-semibold text-revival-dark transition hover:border-revival-gold hover:text-revival-gold"
            >
              Take the Quiz
              <ChevronRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: EASE }}
          className="relative"
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-[0_40px_120px_-32px_rgba(15,15,15,0.35)]">
            <Image
              src="/images/sexual-wellness/o-shot/o-shot-intimate-wellness.jpeg"
              alt="A woman feeling confident and radiant after O-Shot treatment"
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
              priority
              quality={92}
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-revival-dark/25 via-transparent to-transparent" />
          </div>

          <div className="absolute -left-4 top-8 flex items-center gap-2.5 rounded-2xl border border-white/60 bg-white/95 px-4 py-3 shadow-2xl backdrop-blur">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-revival-gold/15 text-revival-gold">
              <Sparkles className="h-4 w-4" />
            </span>
            <div>
              <p className="text-[0.65rem] uppercase tracking-[0.14em] text-revival-charcoal/60">
                Minimally invasive
              </p>
              <p className="text-sm font-semibold text-revival-dark">
                ~30 minute visit
              </p>
            </div>
          </div>

          <div className="absolute -bottom-5 right-4 flex items-center gap-3 rounded-2xl border border-white/50 bg-revival-dark px-4 py-3 text-revival-warm-white shadow-2xl">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-revival-gold text-revival-dark">
              <ShieldCheck className="h-4 w-4" />
            </span>
            <div>
              <p className="text-[0.65rem] uppercase tracking-[0.14em] text-revival-gold">
                Uses your own PRP
              </p>
              <p className="text-sm font-semibold">Zero downtime</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Section: What is sexual wellness ──────────────────────────────────────

function WellnessMattersSection() {
  return (
    <section className="relative overflow-hidden bg-revival-cream py-14 lg:py-20">
      <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="text-tagline text-xs text-revival-gold"
        >
          What is sexual wellness?
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.05 }}
          className="mt-4 font-heading font-medium leading-[1.1] text-revival-dark"
          style={{ fontSize: "clamp(1.9rem, 3.4vw, 2.8rem)" }}
        >
          Why intimate health matters
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
          className="mx-auto mt-6 max-w-3xl text-lg font-light leading-relaxed text-revival-charcoal/85"
        >
          Sexual wellness encompasses how satisfied you feel about your sexual
          relationships, performance, and experiences. Maintaining harmony in
          sexual wellness is crucial - it can significantly impact your
          relational, emotional, and physical well-being. Prioritizing it
          restores hormonal balance and fosters a healthier, more fulfilling
          life.
        </motion.p>
      </div>
    </section>
  );
}

// ─── Section: The O-Shot treatment (with image) ────────────────────────────

function TreatmentOverviewSection() {
  return (
    <section className="relative overflow-hidden bg-revival-warm-white py-16 lg:py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: EASE }}
          className="relative order-2 overflow-hidden rounded-[2rem] shadow-[0_40px_120px_-32px_rgba(15,15,15,0.3)] lg:order-1"
        >
          <div className="relative aspect-[5/6]">
            <Image
              src="/images/sexual-wellness/o-shot/o-shot-detail-v2.avif"
              alt="Close-up of PRP being prepared for the O-Shot procedure"
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
              quality={92}
            />
          </div>
        </motion.div>

        <motion.div
          variants={fadeStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="order-1 lg:order-2"
        >
          <motion.span
            variants={fadeUp}
            className="text-tagline text-xs text-revival-gold"
          >
            O-Shot® · Sexual Wellness Treatment
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="mt-4 font-heading font-medium leading-[1.1] text-revival-dark"
            style={{ fontSize: "clamp(1.9rem, 3.4vw, 2.8rem)" }}
          >
            Designed for menopause, low libido, and a decline in sexual health
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-6 text-lg leading-relaxed text-revival-charcoal/85"
          >
            The O-Shot® is designed for women experiencing symptoms of
            menopause, loss of libido, and a decline in sexual health. By using
            your own blood platelets, the O-Shot stimulates blood flow and
            promotes new tissue development in the vaginal area - effectively
            reversing the effects of aging and hormonal changes.
          </motion.p>
          <motion.p
            variants={fadeUp}
            className="mt-4 text-lg leading-relaxed text-revival-charcoal/85"
          >
            This treatment addresses a wide range of sexual concerns and
            enhances overall sexual function, helping you regain confidence and
            improve your sexual wellness.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-8 flex flex-wrap gap-3 text-sm font-medium text-revival-charcoal/80"
          >
            {[
              { Icon: Droplet, label: "Uses your own PRP" },
              { Icon: Shield, label: "No allergy risk" },
              { Icon: Timer, label: "Zero downtime" },
            ].map(({ Icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-2 rounded-full border border-revival-gold/25 bg-white px-3.5 py-2"
              >
                <Icon className="h-4 w-4 text-revival-gold" />
                {label}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Section: 8 benefits ───────────────────────────────────────────────────

function BenefitsSection() {
  return (
    <section className="relative bg-revival-dark py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-tagline text-xs text-revival-gold">
            What the O-Shot® does
          </span>
          <h2
            className="mt-4 font-heading font-medium leading-[1.1] text-white"
            style={{ fontSize: "clamp(1.9rem, 3.4vw, 2.8rem)" }}
          >
            Real benefits patients report
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg font-light leading-relaxed text-white/70">
            The O-Shot® targets the underlying causes of sexual concerns -
            here&apos;s what patients most often notice.
          </p>
        </div>

        <motion.div
          variants={fadeStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-12 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {BENEFITS.map(({ Icon, label }) => (
            <motion.div
              key={label}
              variants={fadeUp}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition hover:border-revival-gold/40 hover:bg-white/[0.06]"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-revival-gold/15 text-revival-gold">
                <Icon className="h-5 w-5" />
              </span>
              <p className="mt-4 text-[0.95rem] font-medium leading-snug text-white/90">
                {label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Section: How it works (PRP mechanism) ─────────────────────────────────

function MechanismSection() {
  return (
    <section className="relative overflow-hidden bg-revival-warm-white py-16 lg:py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:px-8">
        <motion.div
          variants={fadeStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.span
            variants={fadeUp}
            className="text-tagline text-xs text-revival-gold"
          >
            How it works
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="mt-4 font-heading font-medium leading-[1.1] text-revival-dark"
            style={{ fontSize: "clamp(1.9rem, 3.4vw, 2.8rem)" }}
          >
            The science of PRP, put to work for you
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-6 text-lg leading-relaxed text-revival-charcoal/85"
          >
            The platelets in your blood - known as platelet-rich plasma (PRP) -
            contain powerful growth factors. When injected, they stimulate the
            growth of new tissues and collagen, activating stem cells and
            leading to the development of healthy tissue.
          </motion.p>
          <motion.p
            variants={fadeUp}
            className="mt-4 text-lg leading-relaxed text-revival-charcoal/85"
          >
            This process rejuvenates and heals clitoral and vaginal tissues,
            enhancing your sexual well-being while reducing vaginal dryness -
            for a more comfortable and satisfying experience.
          </motion.p>

          <motion.div
            variants={fadeStagger}
            className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3"
          >
            {[
              { Icon: Droplet, label: "Growth factors" },
              { Icon: Sparkles, label: "New collagen" },
              { Icon: HeartPulse, label: "Healthy tissue" },
            ].map(({ Icon, label }) => (
              <motion.div
                key={label}
                variants={fadeUp}
                className="rounded-2xl border border-revival-gold/20 bg-white p-4 text-center shadow-sm"
              >
                <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-revival-gold/15 text-revival-gold">
                  <Icon className="h-5 w-5" />
                </span>
                <p className="mt-3 text-sm font-medium text-revival-dark">
                  {label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: EASE }}
          className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-[0_40px_120px_-32px_rgba(15,15,15,0.3)]"
        >
          <Image
            src="/images/sexual-wellness/o-shot/o-shot-relaxed-recovery.jpg"
            alt="A relaxed patient during the O-Shot consultation"
            fill
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-cover"
            quality={92}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-revival-dark/40 via-transparent to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}

// ─── Section: 4-step treatment process ─────────────────────────────────────

function ProcessSection() {
  return (
    <section className="relative bg-revival-cream py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-tagline text-xs text-revival-gold">
            The process
          </span>
          <h2
            className="mt-4 font-heading font-medium leading-[1.1] text-revival-dark"
            style={{ fontSize: "clamp(1.9rem, 3.4vw, 2.8rem)" }}
          >
            How your O-Shot® appointment flows
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg font-light leading-relaxed text-revival-charcoal/85">
            Most patients find the entire treatment surprisingly comfortable
            and quick - about 30 minutes total.
          </p>
        </div>

        <motion.ol
          variants={fadeStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="relative mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4"
        >
          {/* Rail on desktop */}
          <span
            aria-hidden
            className="pointer-events-none absolute left-6 right-6 top-8 hidden h-px bg-gradient-to-r from-transparent via-revival-gold/40 to-transparent lg:block"
          />
          {PROCESS_STEPS.map((s) => (
            <motion.li
              key={s.n}
              variants={fadeUp}
              className="relative rounded-2xl border border-revival-gold/20 bg-white p-6 shadow-[0_20px_60px_-40px_rgba(15,15,15,0.35)]"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-revival-gold/15 text-revival-gold">
                  <s.Icon className="h-6 w-6" />
                </span>
                <span className="font-heading text-3xl italic text-revival-gold/70">
                  {s.n}
                </span>
              </div>
              <h3 className="mt-4 font-heading text-lg leading-tight text-revival-dark">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-revival-charcoal/75">
                {s.text}
              </p>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}

// ─── Section: Downtime & side effects ──────────────────────────────────────

function DowntimeSection() {
  const rows = [
    {
      Icon: Timer,
      title: "No downtime",
      text: "Return to your daily routine immediately after the procedure - no recovery break needed.",
    },
    {
      Icon: ShieldCheck,
      title: "Zero allergy risk",
      text: "Because the PRP is drawn from your own body, there is no chance of an allergic reaction.",
    },
    {
      Icon: HeartPulse,
      title: "Mild, temporary effects",
      text: "Some patients notice minimal swelling, numbness, redness, or sensitivity at the injection area - generally mild and short-lived.",
    },
  ];

  return (
    <section className="relative bg-revival-warm-white py-14 lg:py-20">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: EASE }}
          className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-[0_40px_120px_-32px_rgba(15,15,15,0.3)]"
        >
          <Image
            src="/images/sexual-wellness/o-shot/o-shot-banner.webp"
            alt="A woman relaxed and confident after her O-Shot treatment"
            fill
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-cover"
            quality={92}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-revival-dark/25 via-transparent to-transparent" />
        </motion.div>

        <div>
          <div className="max-w-xl">
            <span className="text-tagline text-xs text-revival-gold">
              Downtime & side effects
            </span>
            <h2
              className="mt-4 font-heading font-medium leading-[1.1] text-revival-dark"
              style={{ fontSize: "clamp(1.8rem, 3.2vw, 2.6rem)" }}
            >
              Comfortable in. Straight back to life.
            </h2>
          </div>

          <motion.div
            variants={fadeStagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-3"
          >
            {rows.map((r) => (
              <motion.div
                key={r.title}
                variants={fadeUp}
                className="rounded-2xl border border-revival-gold/20 bg-white p-6 shadow-sm"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-revival-gold/15 text-revival-gold">
                  <r.Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-heading text-lg text-revival-dark">
                  {r.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-revival-charcoal/75">
                  {r.text}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Section: Related services ─────────────────────────────────────────────

function RelatedSection() {
  const items = [
    {
      href: "/gainswavetm-for-her/",
      label: "GAINSWave™ For Her",
      blurb: "Non-invasive acoustic-wave therapy for arousal and comfort.",
    },
    {
      href: "/emsella-2/",
      label: "Emsella®",
      blurb: "Chair-based pelvic-floor strengthening - fully clothed.",
    },
    {
      href: "/women/",
      label: "Sexual Wellness for Women",
      blurb: "Explore the full women's sexual wellness program.",
    },
  ];

  return (
    <section className="relative bg-revival-cream py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-tagline text-xs text-revival-gold">
            Explore more
          </span>
          <h2
            className="mt-4 font-heading font-medium leading-[1.1] text-revival-dark"
            style={{ fontSize: "clamp(1.7rem, 3vw, 2.4rem)" }}
          >
            Complementary sexual wellness treatments
          </h2>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
          {items.map((i) => (
            <Link
              key={i.href}
              href={i.href}
              className="group rounded-2xl border border-revival-gold/20 bg-white p-6 transition hover:border-revival-gold hover:shadow-lg"
            >
              <h3 className="font-heading text-xl text-revival-dark">
                {i.label}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-revival-charcoal/75">
                {i.blurb}
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-revival-gold transition group-hover:gap-2.5">
                Learn more <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────

export default function OShotPageContent() {
  return (
    <>
      <PageHero
        eyebrow="Sexual Wellness for Women"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "For Women", href: "/women/" },
          { label: "O-Shot®" },
        ]}
        title={
          <>
            The{" "}
            <span className="relative inline-block italic text-revival-gold">
              Orgasm Shot®
              <span
                aria-hidden
                className="absolute -bottom-2 left-0 h-[3px] w-full bg-gradient-to-r from-revival-gold to-transparent"
              />
            </span>{" "}
            for women&apos;s sexual wellness
          </>
        }
        description="A natural, safe, minimally invasive PRP treatment that boosts sexual pleasure and overall intimate health - using your own platelets."
        gallery={[
          "/images/sexual-wellness/o-shot/o-shot-banner.webp",
          "/images/sexual-wellness/o-shot/o-shot-intimate-wellness.jpeg",
          "/images/sexual-wellness/o-shot/o-shot-detail.jpeg",
          "/images/sexual-wellness/o-shot/o-shot-relaxed-recovery.jpg",
        ]}
        compact
      />

      <IntroSection />
      <WellnessMattersSection />
      <TreatmentOverviewSection />
      <BenefitsSection />
      <MechanismSection />
      <ProcessSection />
      <DowntimeSection />
      <FAQSection faqs={FAQS} />
      <RelatedSection />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-14 lg:px-8">
        <CTABanner
          title="Curious if the O-Shot® is right for you?"
          subtitle="Book a private, physician-led consultation. Every conversation stays between you and our medical team."
        />
      </div>
    </>
  );
}
