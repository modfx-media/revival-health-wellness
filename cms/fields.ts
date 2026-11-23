import type { Field, FieldHook, TextField } from "payload";

/** Unique text fields must store null, not '', or the first save hits a unique violation. */
export const emptyToNull: FieldHook = ({ value }) => {
  if (typeof value !== "string") return value;
  const trimmed = value.trim();
  return trimmed === "" ? null : trimmed;
};

export const uniqueTextField = (
  name: string,
  extras?: { admin?: TextField["admin"] },
): TextField => ({
  name,
  type: "text",
  unique: true,
  index: true,
  hooks: {
    beforeValidate: [emptyToNull],
  },
  admin: {
    position: "sidebar",
    ...extras?.admin,
  },
});

/** Drafts without autosave. Autosave plus live preview blanks the create form. */
export const draftsWithoutAutosave = {
  drafts: {
    schedulePublish: true,
  },
  maxPerDoc: 50,
} as const;
