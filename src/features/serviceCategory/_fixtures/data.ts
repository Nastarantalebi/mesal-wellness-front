import { z } from "zod";
import type { TReqServiceCategory } from "../_types/types";

export const url = "/wellness/service-categories/";
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

export const initialValue: TReqServiceCategory = {
  title: "",
  branch_id: null,
  parent_id: null,
  is_active: true,
  description: "",
  icon: null,
  meta: {
    color: "",
    order: 1,
    show_in_menu: true,
  },
};
