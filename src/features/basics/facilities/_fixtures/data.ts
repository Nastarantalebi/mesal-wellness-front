import { z } from "zod";
import type { TReqFacilities } from "../_types/types";
import {
  booleanNullableSchema,
  phoneRequireValidationSchema,
} from "@/fixtures/zodValidations";

export const url = "/wellness/facilities/";
export const queryKey = "facilitiesQuerykey";

export const schema = z.object({
  name: z.string().min(1, " "),
  city: z.string().min(1, " "),
  address: z.string(),
  description: z.string().nullable(),
  code: z.string(),
  manager_name: z.string().min(1, " "),
  phone: phoneRequireValidationSchema,
  is_active: booleanNullableSchema,
});

export const initialValue: TReqFacilities = {
  name: "",
  address: "",
  city: "",
  is_active: true,
  description: null,
  phone: "",
  code: "",
  manager_name: "",
};
