import { z } from "zod";
import type { TReqResources } from "../_types/types";

export const url = "/wellness/resources/";
export const queryKey = "resourcesQuerykey";

export const schema = z.object({
  name: z.string().min(1, " "),
  capacity: z.string().min(1, " "),
  code: z.string().nullable(),
  description: z.string().nullable(),
  status: z.string().nullable(),
  type_id: z.coerce.number().min(1, " "),
  facility_id: z.coerce.number().min(1, " "),
});

export const initialValue: TReqResources = {
  name: "",
  capacity: "",
  code: null,
  description: null,
  status: null,
  type_id: 0,
  facility_id: 0,
};
