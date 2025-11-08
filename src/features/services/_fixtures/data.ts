import z from "zod";
import type { TReqServices } from "../_types/types";

export const servicesUrl = "/wellness/services";
export const servicesQuerykey = "servicesQuerykey";

export const schema = z.object({
  branch_id: z.number().nullable(),
  base_price: z.string(),
  category_id: z.string(),
  code: z.string(),
  currency: z.string(),
  description: z.string(),
  duration_minutes: z.string(),
  gender_policy: z.string(),
  title: z.string(),
  is_active: z.boolean(),
  meta: z
    .object({
      discount_percent: z.number(),
      requires_shower: z.boolean(),
      room_type: z.string(),
    })
    .optional(),
});
export const initialValues: TReqServices = {
  base_price: "",
  branch_id: null,
  category_id: "",
  code: "",
  currency: "",
  description: "",
  duration_minutes: "",
  gender_policy: "",
  title: "",
  is_active: true,
  meta: {
    discount_percent: 0,
    requires_shower: true,
    room_type: "",
  },
};
