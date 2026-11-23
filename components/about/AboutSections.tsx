"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CLINICS, telHref } from "@/lib/content/clinics";
import {
  Shield,
  Scale,
  Users,
  Sparkles,
  HandHeart,
  Target,
  Award,
  Heart,
  Stethoscope,
  Compass,
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  type LucideIcon,
} from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

// ─────────────────────────────────────────────────────────────────────────────
// Content (ported from revivalhealthandwellnessgroup.com/about-us/)
// ─────────────────────────────────────────────────────────────────────────────

export const ABOUT_INTRO = {
  eyebrow: "About Revival Health and Wellness",
  title: "Everything we do is centered around you",
  paragraphs: [
    "At Revival Health and Wellness, everything we do is centered around you and your journey to becoming the best version of yourself. Our mission is to provide top-tier care that empowers you to achieve your goals and feel your best, through personalized health solutions tailored to your unique needs.",
    "We believe in a comprehensive approach to wellness, focusing on revitalizing your mind, body, and spirit. Our dedicated team genuinely cares about your health and future, and we are committed to helping you lead a longer, happier, and healthier life.",
    "By offering comprehensive and effective treatments, we strive to deliver optimal results that truly transform your life. We specialize in weight loss, hormone replacement therapy, body contouring, and aesthetics.",
  ],
  image: "/images/about/team-storefront-2.png",
};

export type CoreValue = {
  title: string;
  text: string;
  icon: LucideIcon;
};

export const CORE_VALUES: CoreValue[] = [
  {
    title: "Honesty",
    text: "We prioritize honesty in all our interactions, ensuring transparent communication and trust with our clients.",
    icon: Shield,
  },
  {
    title: "Integrity",
    text: "Our integrity drives us to uphold the highest ethical standards, consistently delivering on our promises.",
    icon: Scale,
  },
  {
    title: "Client",
    text: "We place our clients at the heart of everything we do, tailoring our services to meet their unique needs and exceed their expectations.",
    icon: Users,
  },
  {
    title: "Experience",
    text: "We are dedicated to creating exceptional experiences for our clients, combining expertise with personalized care to enhance their journey.",
    icon: Sparkles,
  },
  {
    title: "Teamwork",
    text: "Our success is built on effective teamwork, where every member collaborates seamlessly to achieve common goals.",
    icon: HandHeart,
  },
  {
    title: "Commitment",
    text: "We demonstrate unwavering commitment to our clients and our mission, continuously striving for excellence in all that we do.",
    icon: Heart,
  },
  {
    title: "Result-Oriented",
    text: "We focus on being result-oriented, driven by our goal to achieve tangible and impactful outcomes for our clients.",
    icon: Target,
  },
];

export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  image: string;
  initials: string;
};

export const TEAM: TeamMember[] = [
  {
    name: "Radford Raquedan",
    role: "Nurse Practitioner",
    initials: "RR",
    image: "/images/about/team/radford-raquedan.png",
    bio: "Radford Raquedan, serves as the clinics Nurse practitioner at Revival Health and Wellness, he was born and raised in Hawaii, has dedicated over a decade to the medical field, specializing in emergency medicine and acute care. His journey into nursing was inspired by a close friend’s courageous battle with cancer, sparking a lifelong passion for helping others. As a lifelong athlete who transformed his own health-losing over 50 pounds-Radford became a nurse practitioner to guide others toward their best selves. He focuses on hormone optimization, weight loss, sexual wellness, and aesthetics, blending medical expertise with personal experience. Radford is committed to empowering individuals to embrace healthy lifestyles, gain confidence, and achieve lasting change, one life at a time.",
  },
  {
    name: "Sanaz Salmani",
    role: "Clinic Director",
    initials: "SS",
    image: "/images/about/team/sanaz-salmani.png",
    bio: "Sanaz Salmani serves as the clinic director at Revival Health and Wellness, bringing over two decades of luxury customer service experience to her leadership role. Passionate about building relationships, she ensures every patient is treated like family and receives personalized care and support to achieve their wellness goals. As a mom of two, Sanaz deeply loves her children and inspires others by proving that moms can do it all-take care of themselves while caring for others. With a strong passion for training and fitness, she is a certified personal trainer and professional bodybuilder, proudly earning her pro card in the natural bodybuilding community. Sanaz’s dedication to health, empowerment, and personal growth inspires both her patients and her team, driving the transformative experience at Revival Health and Wellness.",
  },
  {
    name: "Daesja Johnson",
    role: "Medical Assistant",
    initials: "DJ",
    image: "/images/about/team/daesja-johnson.png",
    bio: "Daesja Johnson serves as a Medical Assistant at Revival Health and Wellness. Daesja is a passionate fitness enthusiast with a diverse background in health and wellness. With a solid foundation in personal training and nutrition, she is dedicated to helping individuals achieve their fitness and dietary goals. Currently pursuing further education in culinary arts, Daesja is blending her love for cooking with her commitment to promoting healthier lifestyles. Her holistic approach combines fitness expertise, nutritional guidance, and practical meal-planning strategies to empower clients to make better decisions and adopt sustainable habits. By offering tailored solutions and delicious, health-conscious meal options, Daesja helps individuals enhance their overall well-being and achieve long-term wellness goals. Daesja’s dedication to inspiring healthier, more balanced lives makes her an invaluable resource for anyone striving to feel and live their best.",
  },
  {
    name: "Carola Villasenor",
    role: "Lead Medical Assistant",
    initials: "CV",
    image: "/images/about/team/carola-villasenor.png",
    bio: "Carola Villasenor serves as a Lead Medical Assistant at Revival Health and Wellness. Carola has been an integral part of Revival Health and Wellness for five years, bringing her passion for optimizing patient health and wellness to every interaction. As a bilingual team member, she takes pride in helping patients achieve their goals through personalized care and support. Currently pursuing her education to become a registered nurse, Carola is dedicated to expanding her expertise to further enhance the patient experience. Her compassion, commitment to growth, and drive to make a meaningful impact make her a vital member of the Revival Health and Wellness team.",
  },
];

export const TESTIMONIALS_INTRO = {
  eyebrow: "Real Stories, Real Results",
  title: "Testimonials",
  body: "Every patient who walks through our doors begins a unique journey, and their success stories are the heartbeat of Revival Health & Wellness. From overcoming long-standing health challenges to embracing a new chapter filled with energy, confidence, and vitality, our patients’ voices tell the real story of what compassionate, personalized care can achieve. These testimonials serve as a reminder of our mission - to help people live healthier, happier, and more fulfilling lives. We are proud to share their words with you, as they reflect the life-changing results and genuine connections built through our work.",
};

export const VISION = {
  eyebrow: "Vision Statement",
  title: "Our vision for the future of care",
  body: "Our vision at Revival Health and Wellness is to become the premier destination for a dynamic, interdisciplinary method of health and wellness, known for treating every individual with the same genuine care and respect we extend to our own family. We aspire to set the standard in personalized healthcare, continuously innovating and improving our services to ensure that our patients lead longer, happier, and healthier lives.",
};

export const MISSION = {
  eyebrow: "Mission Statement",
  title: "A modern approach to healing & vitality",
  intro:
    "At Revival Health and Wellness, our purpose is to deliver an exceptional experience and achieve optimal results for our patients through our comprehensive and personalized services. We treat each person like family, offering genuine care and support. We are committed to providing the highest standard of care, ensuring that every individual receives the best possible support on their journey to improved health and wellness.",
  pillars: [
    {
      title: "Results-driven approach",
      text: "Results driven approach that goes beyond standard weight loss medication. We are committed to your success, offering comprehensive support and personalized care to help you achieve your health and wellness goals.",
      icon: Target,
    },
    {
      title: "Licensed dietitian & nutritionist",
      text: "Working with our licensed dietitian and nutritionist, ensures that your weight loss journey continues successfully even after the medication has ended. With expert guidance and support to maintain your results and promote long term health!",
      icon: Award,
    },
    {
      title: "Expert medical team",
      text: "Working with our expert medical team ensures personalized care, as we listen to each patient and recommend treatments that best meet your individual needs!",
      icon: Stethoscope,
    },
    {
      title: "Holistic, whole-person care",
      text: "Our holistic approach to care. We focus on treating the whole person, addressing not only physical health but also mental and emotional well-being. This comprehensive approach helps ensure lasting results and higher overall quality of life.",
      icon: Heart,
    },
    {
      title: "State-of-the-art body analysis",
      text: "During your free consultation, you’ll have the opportunity to use our state-of-the-art body analysis and composition scale. This advanced technology provides in-depth information about your overall body composition and well-being, giving us a comprehensive understanding of your health and helping us tailor your treatment plan more effectively.",
      icon: Compass,
    },
    {
      title: "A real personal connection",
      text: "Another key benefit of visiting our office is the personal connection you build with our medical team. Unlike ordering medication online, coming to our office allows for face-to-face consultations and ongoing support. This in-person interaction ensures that your treatment plan is tailored to your unique needs, providing a higher level of care and attention. Our team is here to listen, guide, and adjust your plan as needed, making sure you feel supported and confident throughout your wellness journey.",
      icon: HandHeart,
    },
  ],
  closing:
    "We eliminate your worry and stress: At Revival Health and Wellness, we provide exceptional, personalized care and treat you like a member of our own family. We eliminate the guesswork by thoroughly answering all of your questions during your consultation, ensuring you feel confident and informed every step of the way.",
};

// ─────────────────────────────────────────────────────────────────────────────
// Section components
// ─────────────────────────────────────────────────────────────────────────────

export function AboutIntroSection() {
  return (
    <section className="relative overflow-hidden bg-revival-warm-white py-16 lg:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          aria-hidden
          className="absolute -right-32 top-10 h-[30rem] w-[30rem] rounded-full blur-[140px]"
          style={{
            background:
              "radial-gradient(circle, rgba(201,169,110,0.22), transparent 70%)",
          }}
          animate={{ x: [0, -50, 0], y: [0, 40, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-[360px_1fr] lg:gap-16 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: EASE }}
          className="relative mx-auto aspect-[992/1685] w-full max-w-[360px] overflow-hidden rounded-[2.5rem] bg-revival-cream p-2.5 shadow-2xl ring-1 ring-black/5 lg:mx-0"
        >
          <div className="relative h-full w-full overflow-hidden rounded-[2rem]">
            <Image
              src={ABOUT_INTRO.image}
              alt="Revival Health & Wellness clinical team"
              fill
              sizes="(min-width: 1024px) 400px, (min-width: 640px) 420px, 92vw"
              quality={100}
              priority
              className="object-contain"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-revival-dark/40 via-transparent to-transparent" />
          </div>
          <div className="absolute bottom-6 left-6 inline-flex items-center gap-2 rounded-full border border-white/25 bg-revival-dark/40 px-3 py-1.5 text-[0.65rem] uppercase tracking-[0.2em] text-white backdrop-blur-md">
            <Sparkles className="h-3 w-3 text-revival-gold" />
            Las Vegas · Est. 2020
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <span className="text-tagline text-xs text-revival-gold">
            {ABOUT_INTRO.eyebrow}
          </span>
          <h2
            className="mt-5 font-heading font-medium leading-[1.1] text-revival-dark"
            style={{ fontSize: "clamp(2rem, 3.6vw, 3.1rem)" }}
          >
            {ABOUT_INTRO.title}
          </h2>
          <div className="mt-6 space-y-5 text-revival-charcoal/85">
            {ABOUT_INTRO.paragraphs.map((p) => (
              <p key={p.slice(0, 24)} className="text-lg font-light leading-relaxed">
                {p}
              </p>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function CoreValuesSection() {
  return (
    <section className="relative overflow-hidden bg-revival-cream py-16 lg:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          aria-hidden
          className="absolute -left-32 bottom-0 h-[28rem] w-[28rem] rounded-full blur-[150px]"
          style={{
            background:
              "radial-gradient(circle, rgba(138,90,43,0.18), transparent 70%)",
          }}
          animate={{ x: [0, 40, 0], y: [0, -30, 0], scale: [1.05, 1, 1.05] }}
          transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-tagline text-xs text-revival-gold">
            The Values Behind Every Visit
          </span>
          <h2
            className="mt-4 font-heading font-medium leading-[1.1] text-revival-dark"
            style={{ fontSize: "clamp(2rem, 3.6vw, 3.1rem)" }}
          >
            Our Core Values
          </h2>
          <p className="mt-5 text-lg font-light leading-relaxed text-revival-charcoal/80">
            Seven principles that guide every consultation, treatment, and
            interaction-because how we care matters as much as the care itself.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {CORE_VALUES.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.06, ease: EASE }}
              className="group relative overflow-hidden rounded-[1.75rem] border border-revival-gold/20 bg-white p-7 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-revival-gold/50 hover:shadow-xl"
            >
              <div
                aria-hidden
                className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-to-br from-revival-gold/25 to-transparent opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
              />
              <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-revival-gold to-revival-gold-light text-revival-dark shadow-[0_8px_24px_-8px_rgba(201,169,110,0.6)]">
                <v.icon className="h-5 w-5" />
              </div>
              <h3 className="relative mt-5 font-heading text-2xl text-revival-dark">
                {v.title}
              </h3>
              <p className="relative mt-3 text-sm font-light leading-relaxed text-revival-charcoal/80">
                {v.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function MeetTeamSection() {
  return (
    <section className="relative overflow-hidden bg-revival-dark py-16 text-white lg:py-32">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          aria-hidden
          className="absolute -left-40 top-10 h-[32rem] w-[32rem] rounded-full blur-[150px]"
          style={{
            background:
              "radial-gradient(circle, rgba(201,169,110,0.22), transparent 70%)",
          }}
          animate={{ x: [0, 50, 0], y: [0, 40, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden
          className="absolute -right-24 bottom-0 h-[30rem] w-[30rem] rounded-full blur-[150px]"
          style={{
            background:
              "radial-gradient(circle, rgba(138,90,43,0.25), transparent 70%)",
          }}
          animate={{ x: [0, -40, 0], y: [0, -30, 0], scale: [1.1, 1, 1.1] }}
          transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-tagline text-xs text-revival-gold">
            The People Behind the Care
          </span>
          <h2
            className="mt-4 font-heading font-medium leading-[1.1] text-white"
            style={{ fontSize: "clamp(2rem, 3.6vw, 3.1rem)" }}
          >
            Meet Our Team
          </h2>
          <p className="mt-5 text-lg font-light leading-relaxed text-revival-cream/80">
            A physician-led team dedicated to your transformation-medically
            trained, personally invested, and here to walk with you every step
            of the way.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
          {TEAM.map((m, i) => (
            <motion.article
              key={m.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: i * 0.08, ease: EASE }}
              className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-7 backdrop-blur-sm transition-all duration-500 hover:border-revival-gold/40 hover:bg-white/[0.05]"
            >
              <div
                aria-hidden
                className="absolute -right-24 -top-24 h-56 w-56 rounded-full bg-revival-gold/15 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />
              <div className="relative flex flex-col gap-6 sm:flex-row sm:items-start">
                <div className="relative h-40 w-32 shrink-0 self-center overflow-hidden rounded-2xl bg-revival-dark/60 shadow-[0_18px_40px_-16px_rgba(0,0,0,0.7)] ring-1 ring-revival-gold/25 sm:h-48 sm:w-40 sm:self-start">
                  <Image
                    src={m.image}
                    alt={`${m.name}, ${m.role}`}
                    fill
                    sizes="(max-width: 640px) 160px, 200px"
                    className="object-cover object-top"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-revival-dark/60 via-transparent to-transparent" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-heading text-2xl text-white">{m.name}</h3>
                  <p className="mt-1 text-tagline text-xs text-revival-gold">
                    {m.role}
                  </p>
                  <p className="mt-4 text-sm font-light leading-relaxed text-revival-cream/80">
                    {m.bio}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function MissionSection() {
  return (
    <section className="relative overflow-hidden bg-revival-warm-white py-16 lg:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          aria-hidden
          className="absolute -left-32 top-10 h-[30rem] w-[30rem] rounded-full blur-[140px]"
          style={{
            background:
              "radial-gradient(circle, rgba(201,169,110,0.2), transparent 70%)",
          }}
          animate={{ x: [0, 50, 0], y: [0, 40, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-tagline text-xs text-revival-gold">
            {MISSION.eyebrow}
          </span>
          <h2
            className="mt-4 font-heading font-medium leading-[1.1] text-revival-dark"
            style={{ fontSize: "clamp(2rem, 3.6vw, 3.1rem)" }}
          >
            {MISSION.title}
          </h2>
          <p className="mt-6 text-lg font-light leading-relaxed text-revival-charcoal/85">
            {MISSION.intro}
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {MISSION.pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.07, ease: EASE }}
              className="group relative flex flex-col overflow-hidden rounded-[1.75rem] bg-white p-7 shadow-sm ring-1 ring-revival-gold/15 transition-all duration-500 hover:-translate-y-1 hover:ring-revival-gold/40 hover:shadow-xl"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-revival-dark text-revival-gold">
                <p.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 font-heading text-xl text-revival-dark">
                {p.title}
              </h3>
              <p className="mt-3 text-sm font-light leading-relaxed text-revival-charcoal/80">
                {p.text}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mx-auto mt-14 max-w-4xl rounded-[2rem] border border-revival-gold/25 bg-gradient-to-br from-revival-gold/[0.08] via-white to-white p-8 shadow-sm sm:p-10"
        >
          <div className="flex items-start gap-4">
            <CheckCircle2 className="mt-1 h-6 w-6 shrink-0 text-revival-gold" />
            <p className="text-lg font-light leading-relaxed text-revival-charcoal/85">
              {MISSION.closing}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function VisionSection() {
  return (
    <section className="relative overflow-hidden bg-revival-cream py-16 lg:py-24">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          aria-hidden
          className="absolute -right-32 top-0 h-[26rem] w-[26rem] rounded-full blur-[140px]"
          style={{
            background:
              "radial-gradient(circle, rgba(201,169,110,0.22), transparent 70%)",
          }}
          animate={{ x: [0, -40, 0], y: [0, 30, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: EASE }}
          className="relative overflow-hidden rounded-[2.5rem] bg-revival-dark p-10 text-white shadow-[0_30px_80px_-30px_rgba(0,0,0,0.5)] sm:p-14"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-revival-gold/25 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-[#8a5a2b]/30 blur-3xl"
          />
          <div className="relative grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="flex flex-col gap-8 sm:flex-row sm:items-start">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-revival-gold to-revival-gold-light text-revival-dark shadow-[0_10px_30px_-8px_rgba(201,169,110,0.7)]">
                <Compass className="h-6 w-6" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-tagline text-xs text-revival-gold">
                  {VISION.eyebrow}
                </span>
                <h2
                  className="mt-3 font-heading font-medium leading-[1.1] text-white"
                  style={{ fontSize: "clamp(1.75rem, 3vw, 2.6rem)" }}
                >
                  {VISION.title}
                </h2>
                <p className="mt-5 text-lg font-light leading-relaxed text-revival-cream/85">
                  {VISION.body}
                </p>
              </div>
            </div>

            <div className="relative mx-auto aspect-[1086/1448] w-full max-w-[280px] overflow-hidden rounded-[1.75rem] ring-1 ring-white/10 lg:mx-0 lg:ml-auto">
              <Image
                src="/images/home/front-desk.png"
                alt="Revival Health & Wellness front desk"
                fill
                sizes="280px"
                className="object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-revival-dark/30 via-transparent to-transparent" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function TestimonialsIntroSection() {
  return (
    <section className="relative overflow-hidden bg-revival-warm-white py-16 lg:py-24">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          aria-hidden
          className="absolute -left-24 bottom-0 h-[24rem] w-[24rem] rounded-full blur-[140px]"
          style={{
            background:
              "radial-gradient(circle, rgba(138,90,43,0.15), transparent 70%)",
          }}
          animate={{ x: [0, 30, 0], y: [0, -20, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <span className="text-tagline text-xs text-revival-gold">
            {TESTIMONIALS_INTRO.eyebrow}
          </span>
          <h2
            className="mt-4 font-heading font-medium leading-[1.1] text-revival-dark"
            style={{ fontSize: "clamp(2rem, 3.6vw, 3.1rem)" }}
          >
            {TESTIMONIALS_INTRO.title}
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-lg font-light leading-relaxed text-revival-charcoal/85">
            {TESTIMONIALS_INTRO.body}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Patient testimonial gallery (image cards, ported from live site)
// ─────────────────────────────────────────────────────────────────────────────

export const TESTIMONIAL_CARDS: { name: string; image: string }[] = [
  { name: "Paul Rosenthal", image: "/images/about/testimonials/paul-rosenthal.png" },
  { name: "Deanna Solomon", image: "/images/about/testimonials/deanna-solomon.png" },
  { name: "Cristina Herschberger", image: "/images/about/testimonials/cristina-herschberger.png" },
  { name: "Valarie Sahai", image: "/images/about/testimonials/valarie-sahai.png" },
  { name: "Kim Lefebvre", image: "/images/about/testimonials/kim-lefebvre.png" },
  { name: "Shabnam Salmani", image: "/images/about/testimonials/shabnam-salmani.png" },
];

export function TestimonialsGallerySection() {
  return (
    <section className="relative bg-revival-warm-white pb-20 lg:pb-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {TESTIMONIAL_CARDS.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: EASE, delay: (i % 3) * 0.08 }}
              className="relative overflow-hidden rounded-2xl border border-revival-gold/15 bg-white shadow-[0_20px_60px_-32px_rgba(15,15,15,0.25)]"
            >
              <Image
                src={t.image}
                alt={`${t.name} - Revival Health & Wellness patient testimonial`}
                width={1545}
                height={1994}
                sizes="(min-width: 1024px) 32vw, (min-width: 640px) 48vw, 100vw"
                className="h-auto w-full object-cover"
                quality={92}
              />
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Client results (before/after screenshots, ported from live site)
// ─────────────────────────────────────────────────────────────────────────────

export const CLIENT_RESULTS: string[] = [
  "/images/about/client-results/result-1.jpg",
  "/images/about/client-results/result-2.jpg",
  "/images/about/client-results/result-3.jpg",
  "/images/about/client-results/result-4.jpg",
  "/images/image2.png",
  "/images/image3.png",
];

export function ClientResultsSection() {
  return (
    <section className="relative bg-revival-cream py-14 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="text-tagline text-xs text-revival-gold">
            Real Transformations
          </span>
          <h2
            className="mt-4 font-heading font-medium leading-[1.1] text-revival-dark"
            style={{ fontSize: "clamp(2rem, 3.6vw, 3.1rem)" }}
          >
            Client Results
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg font-light leading-relaxed text-revival-charcoal/85">
            The results speak for themselves. Real patients, real transformations,
            real long-term wellness.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-8">
          {CLIENT_RESULTS.map((src, i) => (
            <motion.figure
              key={src}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: EASE, delay: (i % 2) * 0.08 }}
              className="overflow-hidden rounded-2xl border border-revival-gold/15 bg-white shadow-[0_20px_60px_-32px_rgba(15,15,15,0.25)]"
            >
              <Image
                src={src}
                alt={`Revival patient before-and-after result ${i + 1}`}
                width={1172}
                height={876}
                sizes="(min-width: 1024px) 48vw, 100vw"
                className="h-auto w-full object-cover"
                quality={92}
              />
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export function OfficeHoursSection() {
  return (
    <section className="relative overflow-hidden bg-revival-warm-white py-16 lg:py-24">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          aria-hidden
          className="absolute -left-24 top-10 h-[24rem] w-[24rem] rounded-full blur-[140px]"
          style={{
            background:
              "radial-gradient(circle, rgba(201,169,110,0.18), transparent 70%)",
          }}
          animate={{ x: [0, 40, 0], y: [0, -30, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="text-tagline text-xs text-revival-gold">
            Visit Revival Health &amp; Wellness
          </span>
          <h2
            className="mt-4 font-heading font-medium leading-[1.1] text-revival-dark"
            style={{ fontSize: "clamp(2rem, 3.6vw, 3.1rem)" }}
          >
            Our Las Vegas Offices &amp; Hours
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg font-light leading-relaxed text-revival-charcoal/85">
            Two concierge locations serving the Las Vegas valley. Reach out anytime
            to book your consultation - we&apos;ll match you with the office that
            fits your schedule.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
          {CLINICS.map((clinic, i) => (
            <motion.article
              key={clinic.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.75, ease: EASE, delay: i * 0.08 }}
              className="relative overflow-hidden rounded-[2rem] border border-revival-gold/20 bg-white p-8 shadow-[0_25px_70px_-30px_rgba(15,15,15,0.25)] sm:p-10"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full bg-revival-gold/10 blur-3xl"
              />
              <header className="relative">
                <span className="text-tagline text-[0.7rem] text-revival-gold">
                  Location {i + 1}
                </span>
                <h3
                  className="mt-2 font-heading font-medium leading-tight text-revival-dark"
                  style={{ fontSize: "clamp(1.4rem, 2.2vw, 1.9rem)" }}
                >
                  {clinic.name}
                </h3>
                <a
                  href={clinic.mapHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-start gap-2 text-sm font-light leading-relaxed text-revival-charcoal/80 transition-colors hover:text-revival-gold"
                >
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-revival-gold" />
                  {clinic.address}
                </a>
                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1.5">
                  {clinic.phones.map((p) => (
                    <a
                      key={p}
                      href={telHref(p)}
                      className="inline-flex items-center gap-2 text-sm font-light text-revival-charcoal/80 transition-colors hover:text-revival-gold"
                    >
                      <Phone className="h-4 w-4 shrink-0 text-revival-gold" />
                      {p}
                    </a>
                  ))}
                </div>
              </header>

              <div className="relative mt-6 border-t border-revival-gold/15 pt-5">
                <p className="mb-3 inline-flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-revival-gold">
                  <Clock className="h-3.5 w-3.5" />
                  Weekly Hours
                </p>
                <ul>
                  {clinic.hours.map((h) => (
                    <li
                      key={h.day}
                      className="flex items-center justify-between gap-4 border-b border-revival-dark/5 py-2 last:border-b-0"
                    >
                      <span className="font-heading text-sm text-revival-dark sm:text-base">
                        {h.day}
                      </span>
                      <span className="text-right text-sm font-light text-revival-charcoal/80">
                        {h.hours}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
