import { z } from "zod";
import type { TReqServiceCategory } from "../_types/types";
import { booleanNullableSchema } from "@/fixtures/zodValidations";

export const url = "/wellness/service-categories/";
export const queryKey = "serviceCategoryQuerykey";

export const schema = z.object({
  title: z.string().min(1, " "),
  description: z.string().nullable(),
  is_active: booleanNullableSchema,
});

export const initialValue: TReqServiceCategory = {
  title: "",
  is_active: true,
  description: null,
};
