import z from "zod";
import type { TReqServices } from "../_types/types";
import { booleanNullableSchema } from "@/fixtures/zodValidations";

export const servicesUrl = "/wellness/services/";
export const servicesQuerykey = "servicesQuerykey";

export const schema = z.object({
  base_price: z.string().min(1, " "),
  category_id: z.coerce.number().min(1, " "),
  description: z.string().nullable(),
  duration_minutes: z.string().min(1, " "),
  gender_policy: z.string().min(1, " "),
  title: z.string().min(1, " "),
  is_active: booleanNullableSchema,
});
export const initialValues: TReqServices = {
  base_price: "0",
  category_id: 0,
  description: null,
  duration_minutes: "60",
  gender_policy: "",
  title: "",
  is_active: true,
};
