"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Calendar, Newspaper } from "lucide-react";
import { BLOGS } from "@/lib/content/home";

const EASE = [0.22, 1, 0.36, 1] as const;

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export default function BlogsSection() {
  const [featured, ...rest] = BLOGS;
  const side = rest.slice(0, 4);

  return (
    <section className="relative overflow-hidden bg-revival-dark py-14 lg:py-32">
      {/* Animated gold ambiance */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          aria-hidden
          className="absolute -left-32 top-0 h-[30rem] w-[30rem] rounded-full blur-[150px]"
          style={{
            background:
              "radial-gradient(circle, rgba(201,169,110,0.22), transparent 70%)",
          }}
          animate={{ x: [0, 50, 0], y: [0, 40, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden
          className="absolute -right-32 bottom-0 h-[28rem] w-[28rem] rounded-full blur-[150px]"
          style={{
            background:
              "radial-gradient(circle, rgba(138,90,43,0.28), transparent 70%)",
          }}
          animate={{ x: [0, -40, 0], y: [0, -30, 0], scale: [1.1, 1, 1.1] }}
          transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* dotted texture */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "radial-gradient(rgba(201,169,110,1) 1px, transparent 1px)",
            backgroundSize: "26px 26px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
          className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end"
        >
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-revival-gold/30 bg-white/10 px-4 py-1.5 text-tagline text-xs text-revival-gold backdrop-blur">
              <Newspaper className="h-3.5 w-3.5" />
              Blogs &amp; Insights
            </span>
            <h2
              className="mt-5 text-white"
              style={{ fontSize: "clamp(2.2rem, 4vw, 3.4rem)" }}
            >
              Expert{" "}
              <span className="bg-gradient-to-r from-revival-gold via-revival-gold-light to-revival-gold bg-clip-text text-transparent">
                wellness guidance
              </span>
            </h2>
          </div>
          <Link
            href="/blogs/"
            className="group inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-medium text-revival-cream backdrop-blur transition-colors hover:border-revival-gold hover:text-revival-gold"
          >
            View all articles
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

        {/* Featured + list layout */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-2"
        >
          {/* Featured post */}
          <motion.article variants={item}>
            <Link
              href={featured.href}
              className="group relative flex h-full min-h-[420px] flex-col justify-end overflow-hidden rounded-3xl border border-revival-gold/20 bg-revival-dark p-8 lg:p-10"
            >
              {/* Featured background image */}
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Dark gradient for legibility */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-revival-dark via-revival-dark/80 to-revival-dark/30" />

              {/* Animated gold mesh */}
              <div className="pointer-events-none absolute inset-0">
                <motion.div
                  aria-hidden
                  className="absolute -right-10 -top-10 h-64 w-64 rounded-full blur-[90px]"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(201,169,110,0.35), transparent 70%)",
                  }}
                  animate={{ scale: [1, 1.2, 1], opacity: [0.6, 0.9, 0.6] }}
                  transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>

              <span className="relative mb-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-gradient-to-r from-[#8a5a2b] to-revival-gold px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-white shadow-lg">
                Featured · {featured.category}
              </span>
              <h3 className="relative font-heading text-2xl font-medium leading-snug text-white transition-colors group-hover:text-revival-gold-light lg:text-3xl">
                {featured.title}
              </h3>
              <p className="relative mt-4 max-w-xl font-light leading-relaxed text-revival-cream/80">
                {featured.excerpt}
              </p>
              <div className="relative mt-6 flex items-center justify-between">
                <span className="inline-flex items-center gap-2 text-sm font-light text-revival-cream/60">
                  <Calendar className="h-4 w-4" />
                  {featured.date}
                </span>
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-revival-gold to-[#8a5a2b] text-revival-dark shadow-lg transition-transform duration-300 group-hover:scale-110">
                  <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />
                </span>
              </div>
            </Link>
          </motion.article>

          {/* Side list */}
          <div className="flex flex-col gap-4">
            {side.map((post) => (
              <motion.article key={post.title} variants={item}>
                <Link
                  href={post.href}
                  className="group flex items-center gap-5 rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-revival-gold/40 hover:bg-white/[0.07]"
                >
                  <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-xl">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="96px"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-3 text-xs">
                      <span className="rounded-full bg-revival-gold/15 px-2.5 py-0.5 font-medium uppercase tracking-wide text-revival-gold">
                        {post.category}
                      </span>
                      <span className="font-light text-revival-cream/50">
                        {post.date}
                      </span>
                    </div>
                    <h3 className="mt-2 line-clamp-2 font-heading text-lg font-medium leading-snug text-white transition-colors group-hover:text-revival-gold">
                      {post.title}
                    </h3>
                  </div>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 text-revival-cream transition-all duration-300 group-hover:border-revival-gold group-hover:bg-revival-gold group-hover:text-revival-dark">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </Link>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
