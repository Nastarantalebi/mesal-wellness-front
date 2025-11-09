import type { TColumns, TPaginate } from "@/types";

export type TServiceCategory = {
  columns: {
    title: TColumns;
    slug: TColumns;
    is_active: TColumns;
    created_at: TColumns;
  };
  data: {
    title: string;
    slug: string;
    is_active: boolean;
    created_at: string;
  }[];
  paginate: TPaginate;
};
export type TDataById = {
  category: {
    id: number;
    title: string;
    slug: string;
    icon: string | null;
    description: string | null;
    is_active: boolean;
    parent_id: number | null;
    children: string[] | [];
    created_at: string;
  };
};

export type TReqServiceCategory = {
  branch_id: number | null;
  parent_id: number | null;
  title: string;
  icon: string | null;
  description: string;
  is_active: boolean;
  meta?: {
    color: string;
    order: number;
    show_in_menu: boolean;
  };
};
export type TResServiceCategory = {
  success: boolean;
  message: string;
  data: {
    category: {
      id: number;
      title: string;
      slug: string;
      icon: string | null;
      description: string;
      is_active: boolean;
      parent_id: number | null;
      created_at: string;
    };
  };
};
