import z from "zod";
import type { TRequest } from "../_types/types";

export const url = "/basics/menus/";
export const queryKey = "menusQueryKeys";
export const schema = z.object({
  title: z.string().min(1, " "),
  slug: z.string().nullable(),
  url: z.string().nullable(),
  Permission_id: z.coerce.number().nullable(),
  description: z.string().nullable(),
  parent_id: z.coerce.number().nullable(),
  priority: z.coerce.number().nullable(),
});

export const initailValues: TRequest = {
  title: "",
  slug: null,
  url: null,
  description: "",
  Permission_id: null,
  parent_id: null,
  priority: null,
};
