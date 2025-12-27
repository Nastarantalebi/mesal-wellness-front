import type { TOption } from "@/types";

export type TRequest = {
  name: string;
};
export type TCreateData = {
  roles: TOption[];
};
export type TDataById = {
  data: {
    id: number;
    display_name: string;
    organization_id: number;
    parent_id: number | null;
    has_parent: boolean;
    permissions: {
      id: number;
      name: string;
      label: string;
      module_name: string;
      is_global: number;
      children: string[];
    }[];
    children_count: number;
    children: string[];
  };
};
export type TPermissions = {
  id: number;
  permissions: number[];
};
export type TWidget = {
  id: number;
  widgets: number[];
};
