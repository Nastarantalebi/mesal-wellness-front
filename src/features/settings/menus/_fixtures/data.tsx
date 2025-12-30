import z from "zod";
import type { TRequest } from "../_types/types";

export const url = "/basics/menus/";
export const queryKey = "menusQueryKeys";
export const schema = z.object({
  title: z.string().min(1, " "),
  slug: z.string().min(1, " "),
  url: z.string().min(1, " "),
  Permission_id: z.coerce.number().min(1, " "),
  description: z.string().nullable(),
  parent_id: z.coerce.number().nullable(),
  priority: z.coerce.number().nullable(),
});

export const initailValues: TRequest = {
  title: "",
  slug: "",
  url: "",
  description: "",
  Permission_id: 0,
  parent_id: null,
  priority: null,
};
