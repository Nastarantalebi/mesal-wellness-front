import z from "zod";
import type { TRequest } from "../_types/types";

export const url = "/basics/widgets/";
export const queryKey = "widgetsQuerykey";
export const schema = z.object({
  title: z.string().min(1, " "),
  handler_class: z.string().min(1, " "),
  type: z.string().min(1, " "),
  permission_id: z.number().min(1, " "),
  icon: z.string().nullable(),
});

export const initailValues: TRequest = {
  title: "",
  icon: null,
  handler_class: "",
  permission_id: 0,
  type: "",
};
