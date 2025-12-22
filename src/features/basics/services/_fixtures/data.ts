import z from "zod";
import type { TReqServices } from "../_types/types";
import { booleanNullableSchema } from "@/fixtures/zodValidations";

export const servicesUrl = "/wellness/services/";
export const servicesQuerykey = "servicesQuerykey";

export const schema = z.object({
  branch_id: z.number().nullable(),
  base_price: z.string().min(1, " "),
  category_id: z.coerce.number().min(1, " "),
  code: z.string().nullable(),
  currency: z.string().nullable(),
  description: z.string().nullable(),
  duration_minutes: z.string().min(1, " "),
  gender_policy: z.string().min(1, " "),
  title: z.string().min(1, " "),
  is_active: booleanNullableSchema,
  meta: z
    .object({
      discount_percent: z.number(),
      requires_shower: z.boolean(),
      room_type: z.string(),
    })
    .optional(),
});
export const initialValues: TReqServices = {
  base_price: "0",
  branch_id: null,
  category_id: 0,
  code: null,
  currency: null,
  description: null,
  duration_minutes: "60",
  gender_policy: "",
  title: "",
  is_active: true,
  meta: {
    discount_percent: 0,
    requires_shower: true,
    room_type: "",
  },
};
