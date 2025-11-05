import { z } from "zod";

export const url = "/service-categories";
export const queryKey = "serviceCategoryQuerykey";

export const schema = z.object({
  title: z.string().min(1, " "),
  branch_id: z.number().nullable(),
  parent_id: z.number().nullable(),
  icon: z.string().nullable(),
  description: z.string(),
  is_active: z.boolean(),
  meta: z
    .object({
      color: z.string(),
      order: z.number(),
      show_in_menu: z.boolean(),
    })
    .optional(),
});
