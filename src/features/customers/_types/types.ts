import type { TOption } from "@/types";

export type TReqCustomers = {
  first_name: string;
  last_name: string;
  mobile: string;
  gender: string;
  user_id: number | null;
  membership_type: string | null;
  birth_date: string | null;
  national_code: string | null;
  joined_at: string | null;
  notes: string | null;
  status: string | null;
};
type Customer = {
  id: number;
  code: null;
  first_name: string;
  last_name: string;
  mobile: string;
  gender: string;
  birth_date: string;
  national_code: string;
  membership_type: string;
  joined_at: string;
  notes: string;
  status: string;
};
export type TDataById = {
  data: Customer;
};

export type TCreateData = {
  data: {
    genders: TOption[];
    membership_types: TOption[];
    statuses: TOption[];
  };
};
export type TRecord = {
  actions?: string;
  full_name: string;
  gender: string;
  id: number;
  joined_at: string | null;
  membership_type: string;
  national_code: string | null;
};
export type TCustomersInfo = {
  data: {
    total_bookings: number;
    completed_bookings: number;
    canceled_bookings: number;
    total_sessions: number;
    total_minutes: number;
    total_amount: number;
    total_discount: number;
    total_paid: number;
    first_visit: string | null;
    last_visit: string | null;
    favorite_service: string | null;
  };
};
