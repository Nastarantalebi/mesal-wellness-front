import type { TColumns, TOption } from "@/types";

export type TCustomers = {
  columns: {
    id: TColumns;
    full_name: TColumns;
    phone: TColumns;
    national_code: TColumns;
    gender: TColumns;
    membership_type: TColumns;
    joined_at: TColumns;
    status: TColumns;
  };
  data: {
    id: number;
    full_name: string;
    phone: string;
    national_code: string;
    gender: string;
    membership_type: string;
    joined_at: string;
    status: string;
  }[];
  paginate: {
    current_page: number;
    per_page: number;
    total: number;
    last_page: number;
    has_more: boolean;
  };
};

export type TReqCustomers = {
  first_name: string;
  last_name: string;
  phone: string;
  gender: string;
  user_id: number | null;
  membership_type: string;
  birth_date: string;
  national_code: string;
  joined_at: string;
  notes: string;
  status: string;
};
type Customer = {
  id: number;
  code: null;
  first_name: string;
  last_name: string;
  full_name: string;
  phone: string;
  gender: string;
  birth_date: string;
  national_code: string;
  membership_type: string;
  joined_at: string;
  notes: string;
  status: string;
};

export type TResCustomers = {
  success: boolean;
  message: string;
  data: {
    customer: Customer;
  };
};

export type TDataById = {
  customer: Customer;
};

export type TCreateData = {
  genders: TOption[];
  membership_types: TOption[];
  statuses: TOption[];
};
