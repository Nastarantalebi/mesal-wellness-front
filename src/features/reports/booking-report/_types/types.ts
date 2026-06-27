import type { TOption } from "@/types";

export type TSummary = {
  average_booking_value: string;
  total_bookings: string;
  total_items_sold: string;
  total_paid: string;
  total_remaining: string;
  total_revenue: string;
};

export type TCreateData = {
  data: {
    categories: TOption[];
    genderPolicies: TOption[];
    statuses: TOption[];
    companies: TOption[];
    customers: TOption[];
    sortableFields: TOption[];
    sortDirections: TOption[];
    booleanOptions: TOption[];
    paymentStatuses: TOption[];
    services: TOption[];
    therapists: TOption[];
    resources: TOption[];
  };
};

export type TFilterData = {
  status: string | null;
  company: number | null;
  customer_id: number | null;
  start_from: string | null;
  start_to: string | null;
  end_from: string | null;
  end_to: string | null;
  created_from: string | null;
  created_to: string | null;
  total_amount_min: string | null;
  total_amount_max: string | null;
  payable_amount_min: string | null;
  payable_amount_max: string | null;
  payment_status: string | null;
  has_deposit: string | null;
  staff_id: number | null;
  service_id: number | null;
  min_booking_count: string | null;
  max_booking_count: string | null;
  // has_items: string | null;
  // with_stats: string | null;
  sort_by: string | null;
  sort_direction?: string | null;
};
