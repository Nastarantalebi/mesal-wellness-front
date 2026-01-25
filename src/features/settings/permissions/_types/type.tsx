import type { TOption } from "@/types";

export type TPermissionItem = {
  id: number;
  name: string;
  label: string;
  module_name: string;
  is_global: number;
  children: TPermissionItem[];
};

export type TPermissions = {
  data: {
    permissions: {
      [key: string]: TPermissionItem[];
    };
  };
};
export type TRequest = {
  title: string;
  is_global: number;
};
export type TRequestPermissionsCreate = {
  name: string;
  title: string;
  type: string;
  is_global: boolean | "true" | "false";
  group: number;
  module_name: string;
  action_class: string;
};
export type TCreateDataPermissions = {
  is_success: boolean;
  message: string;
  code: number;
  data: {
    groups: TOption[];
  };
};
