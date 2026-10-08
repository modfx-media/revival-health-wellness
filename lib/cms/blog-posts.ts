import type { BlogPost } from "@/lib/content/blog";
import { CATEGORIES } from "@/lib/content/blog";

import { mediaPublicURL } from "./media-url";
import { absoluteURL, normalizePath } from "./url";

export type CmsBlogSource = {
  title?: string | null;
  excerpt?: string | null;
  path?: string | null;
  slug?: string | null;
  content?: unknown;
  legacyBody?: string | null;
  coverPath?: string | null;
  cover?: unknown;
  featured?: boolean | null;
  publishDate?: string | null;
  readMinutes?: number | null;
  createdAt?: string;
  updatedAt?: string;
  meta?: {
    title?: string | null;
    description?: string | null;
  } | null;
  category?: { title?: string | null } | string | number | null;
  author?: unknown;
  tags?: { tag?: string | null }[] | null;
};

type LexicalNode = {
  type?: string;
  tag?: string;
  text?: string;
  children?: LexicalNode[];
};

const CATEGORY_SET = new Set<string>(CATEGORIES);

function lexicalRoot(content: unknown): LexicalNode | null {
  if (!content || typeof content !== "object") return null;
  const root = (content as { root?: LexicalNode }).root;
  if (!root || !Array.isArray(root.children)) return null;
  return root;
}

export function hasLexicalContent(content: unknown): boolean {
  const root = lexicalRoot(content);
  return Boolean(root && root.children && root.children.length > 0);
}

function walk(node: LexicalNode | undefined, visit: (node: LexicalNode) => void) {
  if (!node) return;
  visit(node);
  node.children?.forEach((child) => walk(child, visit));
}

export function lexicalPlainText(content: unknown): string {
  const root = lexicalRoot(content);
  if (!root) return "";
  const parts: string[] = [];
  walk(root, (node) => {
    if (typeof node.text === "string" && node.text) parts.push(node.text);
  });
  return parts.join(" ").replace(/\s+/g, " ").trim();
}

export function lexicalHeadings(
  content: unknown,
): { level: "h2" | "h3"; text: string }[] {
  const root = lexicalRoot(content);
  if (!root) return [];
  const headings: { level: "h2" | "h3"; text: string }[] = [];
  walk(root, (node) => {
    if (node.type !== "heading" || (node.tag !== "h2" && node.tag !== "h3")) return;
    const text = lexicalPlainText({ root: { children: node.children ?? [] } });
    if (text) headings.push({ level: node.tag, text });
  });
  return headings;
}

/** Same anchor ids the designed article TOC uses. */
export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function categoryLabel(category: CmsBlogSource["category"]): BlogPost["category"] {
  if (category && typeof category === "object" && typeof category.title === "string") {
    if (CATEGORY_SET.has(category.title)) return category.title as BlogPost["category"];
  }
  return "Wellness";
}

function authorFrom(author: unknown): BlogPost["author"] {
  if (!author || typeof author !== "object") {
    return { name: "Revival Health & Wellness", role: "Medical Team" };
  }
  const record = author as { name?: unknown; role?: unknown };
  const name = typeof record.name === "string" && record.name ? record.name : "Revival Health & Wellness";
  const role = typeof record.role === "string" && record.role ? record.role : "Medical Team";
  return { name, role };
}

function blogSlug(doc: CmsBlogSource): string | null {
  const path = typeof doc.path === "string" ? normalizePath(doc.path) : "";
  if (path.startsWith("/blogs/")) {
    const slug = path.slice("/blogs/".length);
    if (slug && !slug.includes("/")) return slug;
  }
  if (typeof doc.slug === "string" && doc.slug && !doc.slug.includes("/")) {
    if (!path || path === `/blogs/${doc.slug}`) return doc.slug;
  }
  return null;
}

function safeCoverPath(coverPath: string | null | undefined): string {
  if (!coverPath) return "";
  if (coverPath.startsWith("/media/") || coverPath.startsWith("media/")) return "";
  return coverPath;
}

function readMinutesFor(doc: CmsBlogSource, plain: string): number {
  if (typeof doc.readMinutes === "number" && doc.readMinutes > 0) return doc.readMinutes;
  const words = plain.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export function cmsDocToBlogPost(doc: CmsBlogSource): BlogPost | null {
  const slug = blogSlug(doc);
  if (!slug) return null;

  const plain = lexicalPlainText(doc.content) || doc.legacyBody || doc.excerpt || "";
  const date = doc.publishDate || doc.updatedAt || doc.createdAt || new Date().toISOString();
  const excerpt = doc.excerpt || doc.meta?.description || "";
  const title = doc.title || "Journal";
  const headings = lexicalHeadings(doc.content);
  const tags = (doc.tags ?? [])
    .map((entry) => entry?.tag)
    .filter((tag): tag is string => Boolean(tag));

  return {
    slug,
    title,
    excerpt,
    category: categoryLabel(doc.category),
    date,
    publishDate: date,
    readMinutes: readMinutesFor(doc, plain),
    cover: mediaPublicURL(doc.cover) || safeCoverPath(doc.coverPath),
    author: authorFrom(doc.author),
    featured: Boolean(doc.featured),
    tags: tags.length ? tags : undefined,
    content: !hasLexicalContent(doc.content) && doc.legacyBody ? doc.legacyBody : undefined,
    headings: headings.length ? headings : undefined,
    canonical: absoluteURL(`/blogs/${slug}`),
    metaTitle: doc.meta?.title || undefined,
    metaDescription: doc.meta?.description || undefined,
    ogImage: mediaPublicURL(doc.cover) || undefined,
  };
}

function time(post: BlogPost): number {
  const value = new Date(post.publishDate ?? post.date).getTime();
  return Number.isNaN(value) ? 0 : value;
}

/**
 * Published CMS posts join the designed list. Same slug keeps one card:
 * the published CMS fields win, and a missing CMS cover keeps the designed image.
 */
export function mergeBlogPosts(designed: BlogPost[], cmsPosts: BlogPost[]): BlogPost[] {
  const bySlug = new Map<string, BlogPost>();
  for (const post of designed) bySlug.set(post.slug, post);
  for (const post of cmsPosts) {
    const existing = bySlug.get(post.slug);
    if (!existing) {
      bySlug.set(post.slug, post);
      continue;
    }
    bySlug.set(post.slug, {
      ...existing,
      ...post,
      cover: post.cover || existing.cover,
      author: post.author?.name ? post.author : existing.author,
      featured: Boolean(post.featured || existing.featured),
      content: post.content || existing.content,
      body: post.body ?? existing.body,
      headings: post.headings ?? existing.headings,
      intro: post.intro ?? existing.intro,
      keyTakeaways: post.keyTakeaways ?? existing.keyTakeaways,
    });
  }
  return [...bySlug.values()].sort((a, b) => time(b) - time(a));
}
