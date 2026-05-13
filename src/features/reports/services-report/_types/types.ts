import type { TOption } from "@/types";

export type TCreateData = {
  data: {
    categories: TOption[];
    genderPolicies: TOption[];
    bookingStatuses: TOption[];
    companies: TOption[];
    sortOptions: TOption[];
    sortDirections: TOption[];
    booleanOptions: TOption[];
  };
};

export type TFilterData = {
  booking_status: string | null;
  has_bookings: boolean | null;
  category_id: number | null;
  gender_policy: string | null;
  status: string | null;
  company_id: number | null;
  start_date: string | null;
  end_date: string | null;
  min_price: string | null;
  max_price: string | null;
  search?: string | null;
  sort_by: string | null;
  sort_direction?: string | null;
};
