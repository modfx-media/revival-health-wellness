"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Fragment, useMemo } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

type Block =
  | { type: "h2"; text: string; id: string }
  | { type: "h3"; text: string; id: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] };

/** URL-safe slug for anchor IDs (matches the TOC helper in BlogPostContent). */
function InlineText({ text }: { text: string }) {
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

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

/**
 * Parse a raw article body into structured blocks.
 *
 * Recognises a minimal markdown-lite:
 *   `## Heading`   → H2 section header
 *   `### Heading`  → H3 subheader
 *   `- bullet`     → bulleted list item (consecutive lines are grouped)
 *   blank line     → paragraph break
 *   anything else  → paragraph text
 */
export function parseRichContent(raw: string): Block[] {
  const lines = raw.replace(/\r\n/g, "\n").split("\n");
  const blocks: Block[] = [];
  let paragraph: string[] = [];
  let list: string[] = [];

  const flushParagraph = () => {
    if (paragraph.length) {
      blocks.push({ type: "paragraph", text: paragraph.join(" ").trim() });
      paragraph = [];
    }
  };
  const flushList = () => {
    if (list.length) {
      blocks.push({ type: "list", items: list.slice() });
      list = [];
    }
  };
  const flushAll = () => {
    flushParagraph();
    flushList();
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();

    // Blank line → paragraph/list boundary
    if (!line) {
      flushAll();
      continue;
    }

    // Heading levels
    const h2Match = line.match(/^##\s+(.*)$/);
    const h3Match = line.match(/^###\s+(.*)$/);
    if (h3Match) {
      flushAll();
      const text = h3Match[1].trim();
      blocks.push({ type: "h3", text, id: slugify(text) });
      continue;
    }
    if (h2Match) {
      flushAll();
      const text = h2Match[1].trim();
      blocks.push({ type: "h2", text, id: slugify(text) });
      continue;
    }

    // Bullet list
    const bulletMatch = line.match(/^-\s+(.+)$/);
    if (bulletMatch) {
      flushParagraph();
      list.push(bulletMatch[1].trim());
      continue;
    }

    // Regular paragraph text - merge with any preceding lines that don't have
    // a blank line separator.
    flushList();
    paragraph.push(line);
  }

  flushAll();
  return blocks;
}

/** Extract H2/H3 headings from raw article text - used to power the TOC. */
export function extractHeadings(
  raw: string,
): { level: "h2" | "h3"; text: string; id: string }[] {
  return parseRichContent(raw)
    .filter((b): b is Extract<Block, { type: "h2" | "h3" }> =>
      b.type === "h2" || b.type === "h3",
    )
    .map((b) => ({ level: b.type as "h2" | "h3", text: b.text, id: b.id }));
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

/**
 * Render a raw article body string into fully-styled article JSX. Section
 * headings get slugified IDs so the sticky TOC anchors work automatically.
 */
export default function RichContent({ content }: { content: string }) {
  const blocks = useMemo(() => parseRichContent(content), [content]);

  return (
    <div className="space-y-6">
      {blocks.map((block, i) => (
        <Fragment key={i}>
          {block.type === "h2" && (
            <motion.h2
              id={block.id}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="scroll-mt-24 pt-6 font-heading text-2xl font-medium text-revival-dark sm:text-3xl"
            >
              {block.text}
            </motion.h2>
          )}

          {block.type === "h3" && (
            <motion.h3
              id={block.id}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="scroll-mt-24 pt-2 font-heading text-xl font-medium text-revival-dark sm:text-2xl"
            >
              {block.text}
            </motion.h3>
          )}

          {block.type === "paragraph" && (
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="text-base font-light leading-relaxed text-revival-charcoal/85 sm:text-lg"
            >
              <InlineText text={block.text} />
            </motion.p>
          )}

          {block.type === "list" && (
            <motion.ul
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="grid gap-3 sm:grid-cols-2"
            >
              {block.items.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-2xl border border-revival-gold/15 bg-white px-4 py-3 text-sm text-revival-charcoal/85 shadow-sm sm:text-base"
                >
                  <CheckCircle2 className="mt-0.5 h-4.5 w-4.5 shrink-0 text-revival-gold" />
                  <span>
                    <InlineText text={item} />
                  </span>
                </li>
              ))}
            </motion.ul>
          )}
        </Fragment>
      ))}
    </div>
  );
}
