import type { TColumns, TPaginate } from "@/types";

export type TServices = {
  columns: {
    medical_code: TColumns;
    first_name: TColumns;
    last_name: TColumns;
    mobile: TColumns;
    national_code: TColumns;
  };
  data: {
    medical_code: string;
    first_name: string;
    last_name: string;
    mobile: string;
    national_code: string;
  }[];
  paginate: TPaginate;
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
