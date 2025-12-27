import z from "zod";
import type { TPermissions, TRequest, TWidget } from "../_types/types";

export const url = "/basics/acl/roles/";
export const queryKey = "rolesQuerykey";
export const schema = z.object({
  name: z.string().min(1, " "),
});

export const initailValues: TRequest = {
  name: "",
};

export const WidgetSchema = z.object({
  id: z.number().min(1, " "),
  widgets: z.array(z.number()).min(1, " "),
});

export const widgetInitailValues: TWidget = {
  widgets: [],
  id: 1,
};

export const PermissionsSchema = z.object({
  id: z.number().min(1, " "),
  permissions: z.array(z.number()).min(1, " "),
});

export const PermissionsInitailValues: TPermissions = {
  permissions: [],
  id: 1,
};
