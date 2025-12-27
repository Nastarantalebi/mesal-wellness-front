import type { TOption } from "@/types";

export type TRequest = {
  name: string;
  display_name?: string;
};
export type TCreateData = {
  roles: TOption[];
};
export type TDataById = {
  data: {
    display_name: string;
    id: number;
    name: string;
    permissions: any;
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
