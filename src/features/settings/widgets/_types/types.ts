import type { TOption } from "@/types";

export type TRequest = {
  title: string;
  type: string;
  icon: string | null;
  handler_class: string;
  permission_id: number;
};
export type TCreateData = {
  data: {
    permissions: TOption[];
    types: TOption[];
    handlers: TOption[];
  };
};
export type TDataById = {
  data: {
    id: number;
    title: string;
    type: string;
    icon: string | null;
    permission_id: number;
    handler_class: string;
    permission: string;
  };
};
