import type { TOption } from "@/types";

export type TRequest = {
  title: string;
  url: string | null;
  icon: string | null;
  permission_id: number | null;
  priority: number | null;
  description: string | null;
  parent_id: number | null;
};
export type TCreateData = {
  data: {
    categories: TOption[] | [];
    permissions: TOption[];
    icons: TOption[];
  };
};
export type TDataById = {
  data: {};
};
