import type { TColumns, TPaginate } from "@/types";

export type TServices = {
  columns: {
    id: TColumns;
    title: TColumns;
    category_title: TColumns;
    duration_minutes: TColumns;
    base_price: TColumns;
    is_active: TColumns;
  };
  data: {
    id: number;
    title: string;
    category_title: string;
    duration_minutes: string;
    base_price: string;
    is_active: string;
  }[];
  paginate: TPaginate;
};
export type TServiceById = {
  service: {
    id: number;
    title: string;
    category: {
      id: number;
      organization_id: number;
      branch_id: number | null;
      parent_id: number | null;
      title: string;
      slug: string;
      icon: null;
      description: string;
      is_active: boolean;
      meta: {
        color: string | null;
        order: number;
        show_in_menu: boolean;
      };
      deleted_at: string | null;
      created_at: string;
      updated_at: string;
    };
    duration_minutes: number;
    base_price: string;
    currency: string;
    gender_policy: string;
    description: string;
    is_active: boolean;
    meta: {
      room_type: string | null;
      requires_shower: boolean;
      discount_percent: number;
    };
  };
};
export type TReqServices = {
  branch_id: number | null;
  title: string;
  code: string;
  category_id: string;
  duration_minutes: string;
  base_price: string;
  currency: string;
  gender_policy: string;
  description: string;
  is_active: boolean;
  meta?: {
    room_type: string;
    requires_shower: boolean;
    discount_percent: number;
  };
};

export type TResServices = {
  success: boolean;
  message: string;
  data: {
    service: {
      id: number;
      title: string;
      category: {
        id: number;
        organization_id: number;
        branch_id: number | null;
        parent_id: number | null;
        title: string;
        slug: string;
        icon: string;
        description: string;
        is_active: true;
        meta: {
          color: string;
          order: number;
          show_in_menu: true;
        };
        deleted_at: string | null;
        created_at: string;
        updated_at: string;
      };
      duration_minutes: number;
      base_price: number;
      currency: string;
      gender_policy: string;
      description: string;
      is_active: boolean;
      meta: {
        room_type: string;
        requires_shower: boolean;
        discount_percent: number;
      };
    };
  };
};
