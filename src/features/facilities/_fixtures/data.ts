import { z } from "zod";
import type { TReqFacilities } from "../_types/types";
import { phoneRequireValidationSchema } from "@/fixtures/zodValidations";

export const url = "/wellness/facilities/";
export const queryKey = "facilitiesQuerykey";

export const schema = z.object({
  name: z.string().min(1, "فیلد الزامی است."),
  city: z.string().min(1, "فیلد الزامی است."),
  address: z.string().min(1, "فیلد الزامی است."),
  description: z.string(),
  code: z.string().min(1, "فیلد الزامی است."),
  manager_name: z.string().min(1, "فیلد الزامی است."),
  phone: phoneRequireValidationSchema,
  is_active: z.string(),
  meta: z
    .object({
      google_map_link: z.string(),
      opening_hours: z.string(),
      has_parking: z.boolean(),
    })
    .optional(),
});

export const initialValue: TReqFacilities = {
  name: "",
  address: "",
  city: "",
  is_active: "true",
  description: "",
  phone: "",
  code: "",
  manager_name: "",
  meta: {
    google_map_link: "",
    opening_hours: "",
    has_parking: true,
  },
};
