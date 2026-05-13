import type { TOption } from "@/types";

export type TSummary = {
  total_therapists: string;
  active_therapists: string;
  total_bookings: string;
  total_revenue: string;
};
export type TCreateData = {
  data: {
    bookingStatuses: TOption[];
    facilities: TOption[];
    genders: TOption[];
    specialties: TOption[];
    statuses: TOption[];
  };
};
export type TFilterData = {
  first_name: string | null;
  last_name: string | null;
  mobile: string | null;
  national_code: string | null;
  gender: string | null;
  facility_id: number | null;
  status: string | null;
  specialty: string | null;
  license_number: string | null;
  hire_date_from: string | null;
  hire_date_to: string | null;
  commission_rate_min: string | null;
  commission_rate_max: string | null;
  has_bookings: boolean | null;
  booking_status: string | null;
  booking_date_from: string | null;
  booking_date_to: string | null;
  with_stats: boolean | null;
  sort_by: string | null;
  sort_dir?: string | null;
};
