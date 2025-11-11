import z from "zod";
import type { TReqServices } from "../_types/types";

export const servicesUrl = "/wellness/services/";
export const servicesQuerykey = "servicesQuerykey";

export const schema = z.object({
  branch_id: z.number().nullable(),
  base_price: z.string().min(1, "فیلد الزامی است."),
  category_id: z.string().min(1, "فیلد الزامی است."),
  code: z.string().nullable(),
  currency: z.string().nullable(),
  description: z.string(),
  duration_minutes: z.string().min(1, "فیلد الزامی است."),
  gender_policy: z.string().min(1, "فیلد الزامی است."),
  title: z.string().min(1, "فیلد الزامی است."),
  is_active: z.coerce.boolean(),
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
  code: null,
  currency: null,
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
