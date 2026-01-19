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
type TData = {
  description: string | null;
  icon: string | null;
  id: number;
  name: string | null;
  parent_id: number | null;
  permission_id: number | null;
  permission_name: string;
  priority: number | null;
  title: string;
  url: string | null;
  children: TData[];
};
export type TDataById = {
  data: TData;
};
