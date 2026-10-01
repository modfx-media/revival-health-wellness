import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from "payload";

import { isPublicPath } from "./preview";

async function revalidateContent(path: unknown) {
  if (process.env.CMS_IMPORT_APPLY === "1") return;
  try {
    const { revalidatePath, revalidateTag } = await import("next/cache");
    revalidateTag("cms", "max");
    if (!isPublicPath(path)) return;
    revalidatePath(path);
    if (path !== "/") {
      revalidatePath(path.endsWith("/") ? path : `${path}/`);
    }
  } catch (error) {
    console.error("[cms] revalidate", error);
  }
}

export const revalidateAfterChange: CollectionAfterChangeHook = ({ doc }) => {
  void revalidateContent(doc?.path);
  return doc;
};

export const revalidateAfterDelete: CollectionAfterDeleteHook = ({ doc }) => {
  void revalidateContent(doc?.path);
  return doc;
};
