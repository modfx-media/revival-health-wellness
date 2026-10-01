import config from "@payload-config";
import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { getPayload } from "payload";

import { isPublicPath } from "@/cms/preview";

export const dynamic = "force-dynamic";

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const path = url.searchParams.get("path");
  const previewSecret = url.searchParams.get("previewSecret");

  if (!process.env.PREVIEW_SECRET || previewSecret !== process.env.PREVIEW_SECRET) {
    return new Response("Forbidden", { status: 403 });
  }

  if (!isPublicPath(path)) {
    return new Response("Invalid preview path", { status: 400 });
  }

  const payload = await getPayload({ config });
  const { user } = await payload.auth({ headers: request.headers });
  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const draft = await draftMode();
  draft.enable();
  redirect(path);
}
