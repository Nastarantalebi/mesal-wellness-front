import type { TOption } from "@/types";

export type TRequest = {
  title: string;
  slug: string | null;
  url: string | null;
  Permission_id: number | null;
  priority: number | null;
  description: string | null;
  parent_id: number | null;
};
export type TCreateData = {
  data: {
    categories: TOption[] | [];
    permissions: TOption[];
  };
};
export type TDataById = {
  data: {};
};
