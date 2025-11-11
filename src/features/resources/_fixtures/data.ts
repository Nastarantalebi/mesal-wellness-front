import { z } from "zod";
import type { TReqResources } from "../_types/types";

export const url = "/wellness/resources/";
export const queryKey = "resourcesQuerykey";

export const schema = z.object({
  name: z.string().min(1, " "),
  capacity: z.string(),
  code: z.string(),
  description: z.string(),
  status: z.string(),
  type_id: z.coerce.number(),
  facility_id: z.coerce.number(),
  meta: z
    .object({
      notes: z.string(),
      temperature_control: z.string(),
      area_m2: z.number(),
      floor: z.number(),
      has_shower: z.boolean(),
    })
    .optional(),
});

export const initialValue: TReqResources = {
  name: "",
  capacity: "",
  code: "",
  description: "",
  status: "",
  type_id: 0,
  facility_id: 0,
  meta: {
    floor: 1,
    area_m2: 1,
    notes: "",
    temperature_control: "",
    has_shower: true,
  },
};
