import z from "zod";
import type { TRequest } from "../_types/types";

export const url = "/basics/menus/";
export const queryKey = "menusQueryKeys";
export const schema = z.object({
  title: z.string().min(1, " "),
  slug: z.string().min(1, " "),
  url: z.string().min(1, " "),
  description: z.string().nullable(),
  parent_id: z.number().nullable(),
  priority: z.number().nullable(),
});

export const initailValues: TRequest = {
  title: "",
  slug: "",
  url: "",
  description: "",
  parent_id: null,
  priority: null,
};
