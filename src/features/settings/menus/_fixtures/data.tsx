import z from "zod";
import type { TRequest } from "../_types/types";

export const url = "/basics/menus/";
export const queryKey = "menusQueryKeys";
export const schema = z.object({
  title: z.string().min(1, " "),
  url: z.string().nullable(),
  permission_id: z.coerce.number().nullable(),
  description: z.string().nullable(),
  icon: z.string().nullable(),
  parent_id: z.coerce.number().nullable(),
  priority: z.coerce.number().nullable(),
});

export const initailValues: TRequest = {
  title: "",
  icon: null,
  url: null,
  description: "",
  permission_id: null,
  parent_id: null,
  priority: null,
};
