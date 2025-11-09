import { z } from "zod";
import type { TReqFacilities } from "../_types/types";

export const url = "/wellness/facilities/";
export const queryKey = "facilitiesQuerykey";

export const schema = z.object({
  name: z.string().min(1, " "),
  city: z.string().min(1, " "),
  address: z.string().min(1, " "),
  description: z.string().min(1, " "),
  code: z.string().min(1, " "),
  manager_name: z.string().min(1, " "),
  phone: z.string().min(1, " "),
  is_active: z.boolean(),
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
  is_active: true,
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
