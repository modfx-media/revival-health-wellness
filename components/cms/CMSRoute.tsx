import { draftMode } from "next/headers";
import React from "react";

import { queryRoutedContentByPath } from "@/lib/cms/queries";
import { withCMS } from "@/lib/cms/safe";

import { LivePreviewListener } from "./LivePreviewListener";
import { RenderRoutedContent } from "./RenderRoutedContent";

/**
 * Published CMS document wins. Otherwise the designed page (`children`) renders.
 * Drafts do not replace the public site.
 * /onda-pro is a paid-ad landing with locked chrome/CTA rules — designed UI only.
 */
export async function CMSRoute({
  path,
  children,
}: {
  path: string;
  children: React.ReactNode;
}) {
  if (path === "/onda-pro" || path === "/onda-pro/") return children;

  const routed = await withCMS(() => queryRoutedContentByPath(path), null);
  if (!routed) return children;

  const draft = await withCMS(async () => (await draftMode()).isEnabled, false);

  return (
    <>
      {draft ? <LivePreviewListener /> : null}
      <RenderRoutedContent collection={routed.collection} doc={routed.doc} />
    </>
  );
}
