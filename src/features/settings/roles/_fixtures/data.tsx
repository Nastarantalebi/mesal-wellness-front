import z from "zod";
import type { TRequest } from "../_types/types";

export const url = "/basics/acl/roles/";
export const queryKey = "rolesQuerykey";
export const schema = z.object({
  name: z.string().min(1, " "),
  display_name: z.string().min(1, " ").optional(),
});

export const initailValues: TRequest = {
  name: "",
  display_name: undefined,
};
