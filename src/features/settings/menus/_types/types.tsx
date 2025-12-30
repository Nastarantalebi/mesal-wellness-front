import type { TOption } from "@/types";

export type TRequest = {
  title: string;
  slug: string;
  url: string;
  priority: number | null;
  description: string | null;
  parent_id: number | null;
};
export type TCreateData = {
  categories: TOption[] | [];
  permissions: TOption[];
};
export type TDataById = {
  data: {};
};
