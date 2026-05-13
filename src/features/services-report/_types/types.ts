import type { TOption } from "@/types";

export type TSummary = {
  total_therapists: string;
  active_therapists: string;
  total_bookings: string;
  total_revenue: string;
};
export type TCreateDate = {
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
