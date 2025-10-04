import type { FieldSet } from "@/lib/types/form";

export const EMPTY_FIELD_SET: Omit<FieldSet, "id"> = {
  fields: [],
  legend: "New section",
};
