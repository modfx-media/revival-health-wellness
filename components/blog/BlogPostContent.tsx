"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  ChevronDown,
  Clock,
  Sparkles,
  CheckCircle2,
  Copy,
  List,
} from "lucide-react";
import { useEffect, useMemo, useState, Fragment } from "react";
import type { BlogPost } from "@/lib/content/blog";
import PortraitFrame from "@/components/ui/PortraitFrame";
import RichContent, { extractHeadings } from "./RichContent";

const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/** URL-safe slug for TOC anchors. */
function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

const CATEGORY_HREF: Record<BlogPost["category"], string> = {
  "Weight Loss": "weight-loss",
  "Hormone Therapy": "hormone-therapy",
  "Sexual Wellness": "sexual-wellness",
  Aesthetics: "aesthetics",
  "IV Hydration": "iv-hydration",
  Wellness: "about-us",
};

function categorySlug(category: BlogPost["category"]) {
  return CATEGORY_HREF[category];
}

export default function BlogPostContent({
  post,
  related: relatedProp,
}: {
  post: BlogPost;
  related?: BlogPost[];
}) {
  const related = relatedProp ?? [];

  // TOC: prefer explicit `headings`, then derive from raw `content`, else
  // fall back to `body[].heading`.
  const toc = useMemo<{ id: string; text: string; level: "h2" | "h3" }[]>(() => {
    if (post.headings && post.headings.length > 0) {
      return post.headings.map((h) => ({
        id: slugifyHeading(h.text),
        text: h.text,
        level: h.level,
      }));
    }
    if (post.content) {
      return extractHeadings(post.content);
    }
    return (post.body ?? [])
      .filter((s) => s.heading)
      .map((s) => ({
        id: slugifyHeading(s.heading as string),
        text: s.heading as string,
        level: "h2" as const,
      }));
  }, [post.headings, post.body, post.content]);

  const [activeId, setActiveId] = useState<string | null>(
    toc[0]?.id ?? null,
  );

  useEffect(() => {
    if (toc.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-96px 0px -60% 0px", threshold: 0 },
    );
    toc.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [toc]);

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-revival-dark pt-24 pb-12 text-white lg:pt-32 lg:pb-16">
        <AmbientOrbs />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            aria-label="Breadcrumb"
            className="mb-6 flex items-center gap-2 text-xs font-light text-revival-cream/60"
          >
            <Link href="/" className="hover:text-revival-gold">
              Home
            </Link>
            <span className="text-revival-gold/60">/</span>
            <Link href="/blogs/" className="hover:text-revival-gold">
              Blog
            </Link>
            <span className="text-revival-gold/60">/</span>
            <span className="text-revival-gold">{post.category}</span>
          </motion.nav>

          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="text-tagline inline-flex items-center gap-2 rounded-full border border-revival-gold/30 bg-white/[0.04] px-3.5 py-1.5 text-xs text-revival-gold backdrop-blur"
          >
            <Sparkles className="h-3.5 w-3.5" />
            {post.category}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
            className="mt-6 font-heading font-light leading-[1.05] text-white"
            style={{ fontSize: "clamp(2.2rem, 4.2vw, 4rem)" }}
          >
            {post.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
            className="mt-6 max-w-3xl text-lg font-light leading-relaxed text-revival-cream/85"
          >
            {post.excerpt}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
            className="mt-8 flex flex-wrap items-center gap-4 text-sm font-light text-revival-cream/70"
          >
            {post.author && (
              <div className="flex items-center gap-3">
                {post.author.image ? (
                  <span className="relative flex h-10 w-10 overflow-hidden rounded-full ring-1 ring-revival-gold/30">
                    <Image
                      src={post.author.image}
                      alt={post.author.name}
                      fill
                      sizes="40px"
                      className="object-cover object-top"
                    />
                  </span>
                ) : null}
                <span>
                  <span className="block font-medium text-white/90">
                    {post.author.name}
                  </span>
                  <span className="block text-xs text-revival-cream/60">
                    {post.author.role}
                  </span>
                </span>
              </div>
            )}
            <span aria-hidden className="hidden h-6 w-px bg-white/15 sm:block" />
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-4 w-4 text-revival-gold" />
              {formatDate(post.date)}
            </span>
            <span aria-hidden className="hidden h-6 w-px bg-white/15 sm:block" />
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-revival-gold" />
              {post.readMinutes} min read
            </span>
          </motion.div>
        </div>
      </section>

      {/* ── Cover image ──────────────────────────────────────────────── */}
      <section className="relative bg-revival-dark pb-12 lg:pb-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: EASE }}
            className="relative aspect-[16/9] overflow-hidden rounded-[2rem] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.7)] ring-1 ring-revival-gold/20"
          >
            <Image
              src={post.cover}
              alt={post.title}
              fill
              sizes="(max-width: 1024px) 100vw, 960px"
              className="object-cover"
              priority
            />
          </motion.div>
        </div>
      </section>

      {/* ── Article body ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-revival-warm-white py-16 lg:py-24">
        <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_18rem] lg:gap-16 lg:px-8">
          <article className="min-w-0">
            {/* Mobile TOC accordion (desktop uses the sticky sidebar). */}
            {toc.length > 0 && <MobileToc toc={toc} activeId={activeId} />}

            {/* Intro - falls back to the excerpt so every post shows real copy. */}
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="text-lg font-light leading-relaxed text-revival-charcoal/85 sm:text-xl"
            >
              {post.intro ?? post.excerpt}
            </motion.p>

            {/* Raw-text article body (takes precedence over structured body). */}
            {post.content ? (
              <div className="mt-10">
                <RichContent content={post.content} />
              </div>
            ) : null}

            {!post.content && post.body?.map((section, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                className="mt-12"
              >
                {section.heading && (
                  <h2
                    id={slugifyHeading(section.heading)}
                    className="scroll-mt-24 font-heading text-2xl font-medium text-revival-dark sm:text-3xl"
                  >
                    {section.heading}
                  </h2>
                )}
                <div className="mt-5 space-y-5">
                  {section.paragraphs.map((p, j) => (
                    <p
                      key={j}
                      className="text-base font-light leading-relaxed text-revival-charcoal/85 sm:text-lg"
                    >
                      <InlineMarkdown text={p} />
                    </p>
                  ))}
                </div>
                {section.bullets && (
                  <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                    {section.bullets.map((b) => (
                      <li
                        key={b}
                        className="flex items-start gap-3 rounded-2xl border border-revival-gold/15 bg-white px-4 py-3 text-sm text-revival-charcoal/85 shadow-sm"
                      >
                        <CheckCircle2 className="mt-0.5 h-4.5 w-4.5 shrink-0 text-revival-gold" />
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            ))}

            {/* Rich hub card for posts without a full-length local body. */}
            {!post.content && (!post.body || post.body.length === 0) && (
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                className="mt-12 space-y-6"
              >
                <div className="rounded-[1.75rem] border border-revival-gold/25 bg-white p-6 shadow-sm sm:p-8">
                  <span className="text-tagline text-xs text-revival-gold">
                    Related to this topic
                  </span>
                  <h2 className="mt-3 font-heading text-2xl font-medium text-revival-dark sm:text-3xl">
                    Talk to our team about {post.category.toLowerCase()}
                  </h2>
                  <p className="mt-4 text-base font-light leading-relaxed text-revival-charcoal/85 sm:text-lg">
                    Every plan at Revival starts the same way: labs, a real
                    conversation about your goals, and a personalized
                    protocol. If this article resonated, the fastest way to
                    get real answers for your body is a free consultation.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link
                      href="/contact-us/"
                      className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-revival-gold to-revival-gold-light px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-revival-dark shadow-[0_8px_20px_-8px_rgba(201,169,110,0.7)] transition-transform hover:scale-[1.02]"
                    >
                      Book a consultation
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                    <Link
                      href={`/${categorySlug(post.category)}/`}
                      className="inline-flex items-center gap-2 rounded-full border border-revival-dark/15 bg-white px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-revival-dark transition-colors hover:border-revival-gold hover:text-revival-gold"
                    >
                      Explore {post.category}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}

            {post.keyTakeaways && (
              <motion.aside
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                className="mt-14 rounded-[2rem] border border-revival-gold/25 bg-gradient-to-br from-revival-gold/10 via-white to-white p-6 shadow-sm sm:p-8"
              >
                <span className="text-tagline text-xs text-revival-gold">
                  Key Takeaways
                </span>
                <ul className="mt-4 space-y-3">
                  {post.keyTakeaways.map((t) => (
                    <li
                      key={t}
                      className="flex items-start gap-3 text-sm text-revival-charcoal/85 sm:text-base"
                    >
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-revival-gold to-revival-gold-light text-revival-dark">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                      </span>
                      {t}
                    </li>
                  ))}
                </ul>
              </motion.aside>
            )}

            {post.tags && post.tags.length > 0 && (
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="mt-12 flex flex-wrap items-center gap-2"
              >
                <span className="text-tagline text-xs text-revival-gold">
                  Tags
                </span>
                {post.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-revival-dark/10 bg-white px-3 py-1 text-xs font-light text-revival-charcoal/70"
                  >
                    #{t}
                  </span>
                ))}
              </motion.div>
            )}

            {/* Back to blog */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mt-14 border-t border-revival-dark/10 pt-8"
            >
              <Link
                href="/blogs/"
                className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-revival-gold hover:text-revival-dark"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                All articles
              </Link>
            </motion.div>
          </article>

          {/* Sticky sidebar */}
          <aside className="lg:sticky lg:top-24 lg:h-fit">
            <div className="rounded-[1.75rem] border border-revival-gold/20 bg-white p-6 shadow-sm">
              {post.author && (
                <div className="flex items-center gap-4">
                  {post.author.image ? (
                    <span className="relative flex h-14 w-14 overflow-hidden rounded-full ring-2 ring-revival-gold/30 ring-offset-2 ring-offset-white">
                      <Image
                        src={post.author.image}
                        alt={post.author.name}
                        fill
                        sizes="56px"
                        className="object-cover object-top"
                      />
                    </span>
                  ) : null}
                  <div>
                    <p className="text-tagline text-[0.65rem] text-revival-gold">
                      Written by
                    </p>
                    <p className="mt-0.5 font-heading text-base text-revival-dark">
                      {post.author.name}
                    </p>
                    <p className="text-xs font-light text-revival-charcoal/70">
                      {post.author.role}
                    </p>
                  </div>
                </div>
              )}

              <div className="mt-6 border-t border-revival-dark/10 pt-5">
                <p className="text-tagline text-[0.65rem] text-revival-gold">
                  Share
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <ShareLinks slug={post.slug} title={post.title} />
                </div>
              </div>

              {toc.length > 0 && (
                <div className="mt-6 border-t border-revival-dark/10 pt-5">
                  <p className="text-tagline text-[0.65rem] text-revival-gold">
                    On this page
                  </p>
                  <ul className="mt-3 space-y-2">
                    {toc.map((h) => (
                      <li key={h.id}>
                        <a
                          href={`#${h.id}`}
                          className={
                            "block border-l-2 py-1 pl-3 text-sm font-light leading-snug transition-colors " +
                            (activeId === h.id
                              ? "border-revival-gold text-revival-gold"
                              : "border-revival-dark/10 text-revival-charcoal/70 hover:border-revival-gold/50 hover:text-revival-dark") +
                            (h.level === "h3" ? " pl-6 text-[0.8rem]" : "")
                          }
                        >
                          {h.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-6 border-t border-revival-dark/10 pt-5">
                <p className="text-tagline text-[0.65rem] text-revival-gold">
                  Ready to talk?
                </p>
                <p className="mt-2 text-sm font-light leading-relaxed text-revival-charcoal/80">
                  Book a free consultation with our medical team.
                </p>
                <Link
                  href="/contact-us/"
                  className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-revival-dark px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-revival-gold-light transition-colors hover:bg-revival-charcoal"
                >
                  Get in touch
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            <PortraitFrame
              aspect="aspect-[4/5]"
              ring={false}
              className="mt-6 hidden lg:block"
            >
              <div className="flex h-full w-full flex-col items-center justify-center gap-4 p-6 text-center text-white">
                <Sparkles className="h-8 w-8 text-revival-gold" />
                <p className="text-tagline text-xs text-revival-gold">
                  Personalized care
                </p>
                <p className="font-heading text-2xl font-light">
                  Care that&apos;s built for your body
                </p>
                <p className="text-sm font-light text-revival-cream/75">
                  Every plan starts with labs and a conversation.
                </p>
              </div>
            </PortraitFrame>
          </aside>
        </div>
      </section>

      {/* ── Related posts ────────────────────────────────────────────── */}
      {related.length > 0 && (
        <section className="relative overflow-hidden bg-revival-cream py-16 lg:py-24">
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <span className="text-tagline text-xs text-revival-gold">
                  Keep reading
                </span>
                <h2
                  className="mt-3 font-heading font-medium leading-[1.1] text-revival-dark"
                  style={{ fontSize: "clamp(1.7rem, 3vw, 2.5rem)" }}
                >
                  More from the journal
                </h2>
              </div>
              <Link
                href="/blogs/"
                className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-revival-gold hover:text-revival-dark"
              >
                All articles
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/blogs/${r.slug}/`}
                  className="group overflow-hidden rounded-[1.75rem] border border-revival-gold/15 bg-white shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-revival-gold/40 hover:shadow-xl"
                >
                  <div className="relative aspect-[16/10]">
                    <Image
                      src={r.cover}
                      alt={r.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 33vw"
                      className="object-cover transition-transform duration-[900ms] group-hover:scale-105"
                    />
                    <span className="absolute left-4 top-4 rounded-full border border-white/25 bg-revival-dark/60 px-2.5 py-1 text-[0.6rem] uppercase tracking-[0.18em] text-revival-gold backdrop-blur">
                      {r.category}
                    </span>
                  </div>
                  <div className="p-5">
                    <p className="text-[0.65rem] uppercase tracking-[0.15em] text-revival-charcoal/50">
                      {formatDate(r.date)} · {r.readMinutes} min
                    </p>
                    <h3 className="mt-2 font-heading text-lg leading-tight text-revival-dark">
                      {r.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm font-light text-revival-charcoal/70">
                      {r.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

function InlineMarkdown({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
  return (
    <>
      {parts.map((part, i) => {
        const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (!match) return <Fragment key={i}>{part}</Fragment>;
        return (
          <a
            key={i}
            href={match[2]}
            className="font-medium text-revival-gold underline decoration-revival-gold/40 underline-offset-2 hover:text-revival-dark"
          >
            {match[1]}
          </a>
        );
      })}
    </>
  );
}

function ShareLinks({ slug, title }: { slug: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const shareUrl = `https://revivalhealthandwellnessgroup.com/blogs/${slug}/`;
  const encoded = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);

  async function copy() {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* ignore */
    }
  }

  const iconClass =
    "flex h-9 w-9 items-center justify-center rounded-full border border-revival-dark/10 text-revival-charcoal transition-colors hover:border-revival-gold hover:text-revival-gold";

  return (
    <>
      <a
        aria-label="Share on X (Twitter)"
        href={`https://twitter.com/intent/tweet?url=${encoded}&text=${encodedTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        className={iconClass}
      >
        <XIcon />
      </a>
      <a
        aria-label="Share on Facebook"
        href={`https://www.facebook.com/sharer/sharer.php?u=${encoded}`}
        target="_blank"
        rel="noopener noreferrer"
        className={iconClass}
      >
        <FacebookIcon />
      </a>
      <a
        aria-label="Share on LinkedIn"
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`}
        target="_blank"
        rel="noopener noreferrer"
        className={iconClass}
      >
        <LinkedinIcon />
      </a>
      <button
        type="button"
        aria-label="Copy link"
        onClick={copy}
        className={iconClass}
      >
        {copied ? (
          <CheckCircle2 className="h-4 w-4 text-revival-gold" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
      </button>
    </>
  );
}

function XIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-4 w-4"
      aria-hidden
    >
      <path d="M18.244 2H21l-6.53 7.46L22 22h-6.828l-4.79-6.263L4.8 22H2l7.02-8.02L2 2h6.914l4.33 5.72L18.244 2Zm-1.196 18h1.686L7.02 4H5.238l11.81 16Z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-4 w-4"
      aria-hidden
    >
      <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-4 w-4"
      aria-hidden
    >
      <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.2 8h4.6v14H.2V8zm7.53 0h4.41v1.92h.06c.61-1.16 2.11-2.38 4.35-2.38 4.65 0 5.5 3.06 5.5 7.03V22h-4.6v-6.16c0-1.47-.03-3.37-2.05-3.37-2.05 0-2.37 1.6-2.37 3.26V22H7.73V8z" />
    </svg>
  );
}

function MobileToc({
  toc,
  activeId,
}: {
  toc: { id: string; text: string; level: "h2" | "h3" }[];
  activeId: string | null;
}) {
  const [open, setOpen] = useState(false);
  return (
    <details
      open={open}
      onToggle={(e) => setOpen((e.target as HTMLDetailsElement).open)}
      className="mb-8 rounded-2xl border border-revival-gold/25 bg-white shadow-sm lg:hidden"
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-4">
        <span className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-revival-gold">
          <List className="h-4 w-4" />
          On this page
        </span>
        <ChevronDown
          className={
            "h-4 w-4 text-revival-charcoal/60 transition-transform " +
            (open ? "rotate-180" : "")
          }
        />
      </summary>
      <ul className="space-y-2 border-t border-revival-dark/5 px-5 py-4">
        {toc.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              onClick={() => setOpen(false)}
              className={
                "block border-l-2 py-1 pl-3 text-sm font-light leading-snug transition-colors " +
                (activeId === h.id
                  ? "border-revival-gold text-revival-gold"
                  : "border-revival-dark/10 text-revival-charcoal/70 hover:border-revival-gold/50 hover:text-revival-dark") +
                (h.level === "h3" ? " pl-6 text-[0.8rem]" : "")
              }
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </details>
  );
}

function AmbientOrbs() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        aria-hidden
        className="absolute -left-32 top-8 h-[28rem] w-[28rem] rounded-full blur-[140px]"
        style={{
          background:
            "radial-gradient(circle, rgba(201,169,110,0.22), transparent 70%)",
        }}
        animate={{ x: [0, 40, 0], y: [0, 30, 0], scale: [1, 1.12, 1] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute -right-24 bottom-0 h-[26rem] w-[26rem] rounded-full blur-[140px]"
        style={{
          background:
            "radial-gradient(circle, rgba(138,90,43,0.18), transparent 70%)",
        }}
        animate={{ x: [0, -30, 0], y: [0, -20, 0], scale: [1.1, 1, 1.1] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
