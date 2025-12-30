import z from "zod";
import type { TRequest, TWidget } from "../_types/types";

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

export const WidgetSchema = z.object({
  id: z.number().min(1, " "),
  widgets: z.array(z.number()).min(1, "حداقل یک ویجت الزامی است"),
});

export const widgetInitailValues: TWidget = {
  widgets: [],
  id: 1,
};
