import "./env";

import { neon } from "@neondatabase/serverless";
import { getPayload } from "payload";

import config from "../payload.config";

async function main() {
  const email = process.env.CMS_ADMIN_EMAIL;
  const password = process.env.CMS_ADMIN_PASSWORD;
  if (!email || !password) {
    throw new Error("Set CMS_ADMIN_EMAIL and CMS_ADMIN_PASSWORD.");
  }
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is missing.");
  }

  const sql = neon(process.env.DATABASE_URL);
  await sql`select 1`;

  const payload = await getPayload({ config });

  const existing = await payload.find({
    collection: "users",
    limit: 1,
    overrideAccess: true,
    where: { email: { equals: email } },
  });

  if (existing.docs[0]) {
    console.log(`Admin already exists for ${email}.`);
    return;
  }

  await payload.create({
    collection: "users",
    overrideAccess: true,
    data: {
      email,
      password,
      name: "Revival Admin",
      roles: ["admin"],
    },
  });

  console.log(`Created admin ${email}.`);
  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
