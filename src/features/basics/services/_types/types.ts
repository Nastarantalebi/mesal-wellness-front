import type { TOption } from "@/types";

export type TReqServices = {
  title: string;
  category_id: number;
  duration_minutes: string;
  base_price: string;
  gender_policy: string;
  description: string | null;
  is_active: boolean | null;
};
export type TDataById = {
  data: {
    id: number;
    title: string;
    code: string;
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
    gender_policy: { value: string; label: string };
    description: string;
    is_active: boolean;
    meta: {
      room_type: string | null;
      requires_shower: boolean;
      discount_percent: number;
    };
  };
};
export type TCreateData = {
  data: { categories: TOption[]; genderPolicies: TOption[] };
};
