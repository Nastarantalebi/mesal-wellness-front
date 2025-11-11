import { z } from "zod";
import type { TReqResourceType } from "../_types/types";

export const url = "/wellness/resource-types/";
export const queryKey = "resourceTypesQuerykey";

export const schema = z.object({
  name: z.string().min(1, "فیلد الزامی است."),
  code: z.string().min(1, "فیلد الزامی است."),
  description: z.string(),
  is_active: z.string(),
  icon: z.string().nullable(),
  meta: z
    .object({
      floor: z.number(),
      area_m2: z.number(),
      capacity: z.number(),
      has_projector: z.boolean(),
    })
    .optional(),
});

export const initialValue: TReqResourceType = {
  name: "",
  code: "",
  description: "",
  is_active: "true",
  icon: null,
  meta: {
    floor: 1,
    area_m2: 1,
    capacity: 1,
    has_projector: true,
  },
};
