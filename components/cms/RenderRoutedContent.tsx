import { RichText } from "@payloadcms/richtext-lexical/react";
import type { SerializedEditorState } from "lexical";
import React from "react";

import { DesignedCmsArticle } from "@/components/cms/DesignedCmsArticle";
import RichContent from "@/components/blog/RichContent";
import PageHero from "@/components/ui/PageHero";
import type { CmsDoc } from "@/lib/cms/queries";
import { normalizePath } from "@/lib/cms/url";

function hasLexicalContent(content: unknown): content is SerializedEditorState {
  if (!content || typeof content !== "object") return false;
  const root = (content as { root?: { children?: unknown[] } }).root;
  return Array.isArray(root?.children) && root.children.length > 0;
}

function categoryLabel(category: CmsDoc["category"]): string {
  if (category && typeof category === "object" && "title" in category) {
    return category.title || "Journal";
  }
  return "Revival Health & Wellness";
}

function isBlogDocument(doc: CmsDoc): boolean {
  const path = typeof doc.path === "string" ? normalizePath(doc.path) : "";
  if (!path.startsWith("/blogs/")) return false;
  const slug = path.slice("/blogs/".length);
  return slug.length > 0 && !slug.includes("/");
}

export function RenderRoutedContent({
  collection,
  doc,
}: {
  collection: "pages" | "posts";
  doc: CmsDoc;
}) {
  if (isBlogDocument(doc)) {
    return <DesignedCmsArticle doc={doc} />;
  }

  const title = doc.title || "Revival Health & Wellness";
  const description = doc.excerpt || undefined;
  const eyebrow =
    collection === "posts" ? categoryLabel(doc.category) : doc.pageKind || "Care";

  return (
    <article>
      <PageHero eyebrow={eyebrow} title={title} description={description} />
      <div className="bg-revival-warm-white text-revival-charcoal">
        <div className="mx-auto max-w-3xl px-6 py-16 text-base leading-relaxed text-revival-charcoal/85 [&_a]:text-revival-gold [&_blockquote]:border-l-2 [&_blockquote]:border-revival-gold/60 [&_blockquote]:pl-5 [&_h2]:mt-10 [&_h2]:font-heading [&_h2]:text-3xl [&_h2]:text-revival-dark [&_h3]:mt-8 [&_h3]:font-heading [&_h3]:text-2xl [&_h3]:text-revival-dark [&_li]:ml-5 [&_li]:list-disc [&_p]:mt-4 [&_p]:text-revival-charcoal/85">
          {hasLexicalContent(doc.content) ? (
            <RichText data={doc.content} />
          ) : doc.legacyBody ? (
            <RichContent content={doc.legacyBody} />
          ) : description ? (
            <p>{description}</p>
          ) : null}
        </div>
      </div>
    </article>
  );
}
