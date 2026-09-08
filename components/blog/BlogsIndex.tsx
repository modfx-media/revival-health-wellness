"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Clock, Search, Sparkles } from "lucide-react";
import { CATEGORIES, type BlogPost } from "@/lib/content/blog";

const EASE = [0.22, 1, 0.36, 1] as const;

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const ALL_TAB = "All";

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function BlogsIndex({ posts }: { posts: BlogPost[] }) {
  const [category, setCategory] = useState<string>(ALL_TAB);
  const [query, setQuery] = useState("");

  const featured = useMemo(
    () => posts.find((p) => p.featured) ?? posts[0],
    [posts],
  );

  const filtered = useMemo(() => {
    if (!featured) return [];
    const q = query.trim().toLowerCase();
    return posts.filter((p) => p.slug !== featured.slug).filter((p) => {
      if (category !== ALL_TAB && p.category !== category) return false;
      if (!q) return true;
      return (
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.tags?.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [category, query, featured, posts]);

  return (
    <div className="relative overflow-hidden bg-revival-warm-white py-16 lg:py-24">
      {/* soft ambiance */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-20 h-[26rem] w-[26rem] rounded-full blur-[140px]"
        style={{
          background:
            "radial-gradient(circle, rgba(201,169,110,0.2), transparent 70%)",
        }}
        animate={{ x: [0, 40, 0], y: [0, 30, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Featured post */}
        {featured ? <FeaturedCard post={featured} /> : null}

        {/* Filter bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mt-14 flex flex-col gap-4 rounded-[1.75rem] border border-revival-gold/20 bg-white/70 p-4 shadow-sm backdrop-blur sm:p-5 md:flex-row md:items-center md:justify-between"
        >
          <div className="flex flex-wrap gap-2">
            {[ALL_TAB, ...CATEGORIES].map((c) => {
              const active = category === c;
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCategory(c)}
                  className={
                    "rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] transition-all " +
                    (active
                      ? "bg-revival-dark text-revival-gold-light shadow-sm"
                      : "border border-revival-dark/10 bg-white text-revival-charcoal/70 hover:border-revival-gold/40 hover:text-revival-dark")
                  }
                >
                  {c}
                </button>
              );
            })}
          </div>

          <label className="relative flex items-center gap-2 rounded-full border border-revival-dark/10 bg-white px-4 py-2.5 text-sm text-revival-charcoal shadow-sm md:min-w-[16rem]">
            <Search className="h-4 w-4 text-revival-gold" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search articles…"
              className="w-full border-0 bg-transparent p-0 text-sm placeholder:text-revival-charcoal/40 focus:outline-none focus:ring-0"
            />
          </label>
        </motion.div>

        {/* Post grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="mt-10 rounded-[1.75rem] border border-revival-gold/20 bg-white/70 p-10 text-center">
            <Sparkles className="mx-auto h-6 w-6 text-revival-gold" />
            <p className="mt-3 text-lg font-light text-revival-charcoal/80">
              No articles match your filters yet.
            </p>
            <button
              type="button"
              onClick={() => {
                setCategory(ALL_TAB);
                setQuery("");
              }}
              className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-revival-dark px-5 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-revival-gold-light"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function FeaturedCard({ post }: { post: BlogPost }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, ease: EASE }}
    >
      <Link
        href={`/blogs/${post.slug}/`}
        className="group relative grid gap-8 overflow-hidden rounded-[2.5rem] border border-revival-gold/20 bg-revival-dark p-6 shadow-2xl transition-transform duration-500 hover:-translate-y-1 sm:p-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12 lg:p-10"
      >
        <div className="relative aspect-[16/10] overflow-hidden rounded-[1.75rem] bg-revival-charcoal">
            <Image
            src={post.cover}
            alt={post.title}
            fill
            sizes="(max-width: 1024px) 100vw, 55vw"
            className="object-cover transition-transform duration-[900ms] group-hover:scale-105"
            priority
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-revival-dark/50 via-transparent to-transparent" />
          <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-revival-dark/60 px-3 py-1.5 text-[0.6rem] uppercase tracking-[0.2em] text-revival-gold backdrop-blur">
            <Sparkles className="h-3 w-3" />
            Featured
          </span>
        </div>

        <div className="flex flex-col justify-center">
          <span className="text-tagline text-xs text-revival-gold">
            {post.category}
          </span>
          <h2
            className="mt-3 font-heading font-light leading-[1.08] text-white"
            style={{ fontSize: "clamp(1.7rem, 3vw, 2.6rem)" }}
          >
            {post.title}
          </h2>
          <p className="mt-4 text-base font-light leading-relaxed text-revival-cream/80">
            {post.excerpt}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-revival-cream/70">
            <span>{formatDate(post.date)}</span>
            <span aria-hidden className="h-1 w-1 rounded-full bg-revival-gold/60" />
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-revival-gold" />
              {post.readMinutes} min read
            </span>
          </div>

          <span className="mt-8 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-revival-gold">
            Read the article
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

function PostCard({ post }: { post: BlogPost }) {
  return (
    <motion.article
      layout
      variants={item}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.6, ease: EASE }}
      className="group relative overflow-hidden rounded-[1.75rem] border border-revival-gold/15 bg-white shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-revival-gold/40 hover:shadow-xl"
    >
      <Link href={`/blogs/${post.slug}/`} className="block">
        <div className="relative aspect-[16/10] overflow-hidden bg-revival-cream">
          <Image
            src={post.cover}
            alt={post.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-[900ms] group-hover:scale-105"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-revival-dark/25 via-transparent to-revival-dark/0" />
          <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-revival-dark/65 px-3 py-1.5 text-[0.6rem] uppercase tracking-[0.18em] text-revival-gold backdrop-blur">
            {post.category}
          </span>
        </div>

        <div className="p-6">
          <div className="flex items-center gap-3 text-[0.65rem] uppercase tracking-[0.15em] text-revival-charcoal/50">
            <span>{formatDate(post.date)}</span>
            <span aria-hidden className="h-1 w-1 rounded-full bg-revival-gold/60" />
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3 w-3 text-revival-gold" />
              {post.readMinutes} min
            </span>
          </div>
          <h3 className="mt-3 font-heading text-lg leading-tight text-revival-dark sm:text-xl">
            {post.title}
          </h3>
          <p className="mt-3 line-clamp-3 text-sm font-light leading-relaxed text-revival-charcoal/75">
            {post.excerpt}
          </p>
          <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-revival-gold">
            Read more
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </Link>
    </motion.article>
  );
}
