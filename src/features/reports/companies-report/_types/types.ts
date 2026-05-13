import type { TOption } from "@/types";

export type TCreateData = {
  is_success: boolean;
  message: string;
  code: number;
  data: {
    contractStatuses: TOption[];
    bookingStatuses: TOption[];
    sortOptions: TOption[];
    sortDirections: TOption[];
    booleanOptions: TOption[];
  };
};
export type TFilterData = {
  contract_status: string | null;
  booking_status: string | null;
  contract_start_from: string | null;
  contract_start_to: string | null;
  contract_end_from: string | null;
  contract_end_to: string | null;
  booking_start_from: string | null;
  booking_start_to: string | null;
  min_revenue: string | null;
  max_revenue: string | null;
  has_contracts: string | null;
  has_bookings: string | null;
  search?: string | null;
  sort_by: string | null;
  sort_direction?: string | null;
};
