import Image from "next/image";
import {
  LinkJSXConverter,
  RichText,
  type JSXConvertersFunction,
} from "@payloadcms/richtext-lexical/react";
import type { SerializedEditorState } from "lexical";

import { hasLexicalContent, lexicalPlainText, slugifyHeading } from "@/lib/cms/blog-posts";
import {
  mediaAlt,
  mediaDimensions,
  mediaFilename,
  mediaMimeType,
  mediaPublicURL,
} from "@/lib/cms/media-url";

const converters: JSXConvertersFunction = ({ defaultConverters }) => ({
  ...defaultConverters,
  ...LinkJSXConverter({
    internalDocToHref: ({ linkNode }) => {
      const value = linkNode.fields.doc?.value;
      if (
        value &&
        typeof value === "object" &&
        "path" in value &&
        typeof value.path === "string" &&
        value.path.startsWith("/")
      ) {
        return value.path.endsWith("/") ? value.path : `${value.path}/`;
      }
      return "/";
    },
  }),
  heading: ({ node, nodesToJSX }) => {
    const label = lexicalPlainText({ root: { children: node.children } });
    const Tag = node.tag;
    return (
      <Tag id={slugifyHeading(label)} className="scroll-mt-24">
        {nodesToJSX({ nodes: node.children })}
      </Tag>
    );
  },
  upload: ({ node }) => {
    const url = mediaPublicURL(node.value);
    if (!url) return null;
    const mime = mediaMimeType(node.value);
    const alt = node.fields?.alt || mediaAlt(node.value);
    if (mime && !mime.startsWith("image")) {
      return (
        <a href={url} rel="noopener noreferrer">
          {mediaFilename(node.value)}
        </a>
      );
    }
    const { width, height } = mediaDimensions(node.value);
    return (
      <figure className="my-8 overflow-hidden rounded-[1.75rem] ring-1 ring-revival-gold/20">
        <Image
          src={url}
          alt={alt}
          width={width}
          height={height}
          sizes="(max-width: 768px) 100vw, 768px"
          className="h-auto w-full object-cover"
        />
      </figure>
    );
  },
});

/**
 * Designed-article colors: charcoal and gold on the warm-white article
 * canvas (the same treatment as hand-built posts). The site shell behind
 * that canvas is dark, so these classes keep copy from rendering black
 * on black.
 */
const ARTICLE_CLASS =
  "space-y-6 text-base font-light leading-relaxed text-revival-charcoal/85 sm:text-lg " +
  "[&_a]:font-medium [&_a]:text-revival-gold [&_a]:underline [&_a]:decoration-revival-gold/40 [&_a]:underline-offset-2 hover:[&_a]:text-revival-dark " +
  "[&_blockquote]:border-l-2 [&_blockquote]:border-revival-gold/60 [&_blockquote]:pl-5 [&_blockquote]:text-revival-charcoal [&_blockquote]:italic " +
  "[&_h2]:pt-6 [&_h2]:font-heading [&_h2]:text-2xl [&_h2]:font-medium [&_h2]:text-revival-dark sm:[&_h2]:text-3xl " +
  "[&_h3]:pt-2 [&_h3]:font-heading [&_h3]:text-xl [&_h3]:font-medium [&_h3]:text-revival-dark sm:[&_h3]:text-2xl " +
  "[&_h4]:font-heading [&_h4]:text-lg [&_h4]:font-medium [&_h4]:text-revival-dark " +
  "[&_li]:text-revival-charcoal/85 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-6 " +
  "[&_p]:text-revival-charcoal/85 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6";

export function ArticleRichText({ data }: { data: unknown }) {
  if (!hasLexicalContent(data)) return null;
  return (
    <RichText
      className={ARTICLE_CLASS}
      converters={converters}
      data={data as SerializedEditorState}
    />
  );
}
