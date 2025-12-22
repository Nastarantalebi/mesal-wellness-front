import { z } from "zod";
import type { TReqResourceType } from "../_types/types";
import { booleanNullableSchema } from "@/fixtures/zodValidations";

export const url = "/wellness/resource-types/";
export const queryKey = "resourceTypesQuerykey";

export const schema = z.object({
  name: z.string().min(1, " "),
  code: z.string().nullable(),
  description: z.string(),
  is_active: booleanNullableSchema,
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
  code: null,
  description: "",
  is_active: true,
  icon: null,
  meta: {
    floor: 1,
    area_m2: 1,
    capacity: 1,
    has_projector: true,
  },
};
