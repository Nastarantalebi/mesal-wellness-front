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
export type TServicesInfo = {
  data: {
    average_price: number;
    average_revenue_per_session: number;
    average_session_minutes: string | null;
    canceled_bookings: number;
    company_distribution: {
      company_id: number;
      cnt: number;
      booking: string | null;
    }[];
    confirmed_bookings: number;
    first_used_at: string | null;
    last_used_at: string | null;
    new_customers_count: number;
    peak_hours: {
      hour: string;
      cnt: number;
      booking: string | null;
    }[];
    peak_days: {
      day: string;
      cnt: number;
    }[];
    repeat_customers_count: number;
    therapist_distribution: {
      therapist_id: number;
      full_name: string | null;
      cnt: number;
      booking: null;
    }[];
    top_company: {
      company_id: number;
      cnt: number;
      booking: string | null;
    };
    top_therapist: {
      therapist_id: number;
      concat: string | null;
      cnt: number;
      booking: string | null;
    };
    total_bookings: number;
    total_corporate_sessions: number;
    total_customers: number;
    total_discount: string | null;
    total_sessions: number;
    total_revenue: number | null;
    total_paid: number;
    total_minutes: number | null;
  };
};
