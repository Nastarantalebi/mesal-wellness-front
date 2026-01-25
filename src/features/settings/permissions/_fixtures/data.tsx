import z from "zod";
import type { TRequestPermissionsCreate } from "../_types/type";
import { booleanSchema } from "@/fixtures/zodValidations";

export const url = "/basics/acl/permissions/";
export const queryKey = "permissionsQueryKey";

export const schema = z.object({
  title: z.string(),
  is_global: z.number(),
});
export const schemaCreate = z.object({
  action_class: z.string(),
  group: z.number().min(1, " "),
  is_global: booleanSchema,
  module_name: z.string(),
  name: z.string().min(1, " "),
  title: z.string(),
  type: z.string(),
});
export const initialValuesCreate: TRequestPermissionsCreate = {
  action_class: "",
  group: 0,
  is_global: true,
  module_name: "",
  name: "",
  title: "",
  type: "",
};
