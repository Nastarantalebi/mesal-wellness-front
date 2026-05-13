import type { TOption } from "@/types";

export type TCreateData = {
  data: {
    customerStatuses: TOption[];
    membershipTypes: TOption[];
    genders: TOption[];
    bookingStatuses: TOption[];
    sortOptions: TOption[];
    sortDirections: TOption[];
    booleanOptions: TOption[];
  };
};
export type TFilterData = {
  status: string | null;
  membership_type: string | null;
  gender: string | null;
  booking_status: string | null;
  booking_start_from: string | null;
  booking_start_to: string | null;
  joined_from: string | null;
  joined_to: string | null;
  min_revenue: string | null;
  max_revenue: string | null;
  has_bookings: string | null;
  sort_by: string | null;
  sort_direction?: string | null;
};
