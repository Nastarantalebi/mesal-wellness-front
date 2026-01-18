import type { TOption } from "@/types";

export type TRequest = {
  name: string;
  display_name?: string;
};
export type TCreateData = {
  data: {
    roles: TOption[];
    widgets: TOption[] | [];
  };
};
export type TDataById = {
  data: {
    display_name: string;
    id: number;
    name: string;
    permissions: any;
  };
};
export type TWidget = {
  id: number;
  widgets: number[];
};
export type TDataWidget = {
  data: {
    id: 1;
    title: string;
    type: string;
    icon: string | null;
    permission_id: number;
    handler_class: string;
    created_at: string;
    updated_at: string;
    pivot: {
      role_id: number;
      widget_id: number;
      enabled: number;
      order: number;
      config: null;
      created_at: string;
      updated_at: string;
    };
  }[];
};
