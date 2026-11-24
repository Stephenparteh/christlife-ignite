import { z } from "zod";
import { optionalUrlOrPath } from "./shared";

const detailSchema = z.object({
  label: z.string().trim().min(1, "Label is required.").max(60),
  value: z.string().trim().min(1, "Value is required.").max(300),
});

// No defaults here on purpose: this shape is reused (partial) for PATCH,
// and a default would silently overwrite untouched fields on update.
const fields = {
  name: z.string().trim().min(1, "Name is required.").max(100),
  type: z.string().trim().max(50),
  description: z.string().trim().max(500),
  instructions: z.string().trim().max(2000),
  details: z.array(detailSchema).max(12, "At most 12 detail rows."),
  imageUrl: optionalUrlOrPath().removeDefault().unwrap(),
  isActive: z.boolean(),
  sortOrder: z.number().int().min(0).max(100000),
};

export const givingMethodCreateSchema = z.object(fields).partial().required({ name: true });
export const givingMethodUpdateSchema = z.object(fields).partial();

export const givingMethodReorderSchema = z.object({
  ids: z.array(z.string()).min(1).max(200),
});
