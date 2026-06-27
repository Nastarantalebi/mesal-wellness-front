import type { TOption } from "@/types";

export type TCreateData = {
  data: {
    staff_types: TOption[];
    roles: (TOption & { name: string })[];
    specialties: TOption[];
    facilities: TOption[];
    genders: TOption[];
    therapist_status: TOption[];
  };
};

// export type TDataById = {
//   id: number;
//   first_name: string;
//   last_name: string;
//   gender: string;
//   mobile: string;
//   national_code: string;
//   staff_type: string;
//   role_ids: number[];
//   facility_id?: string;
//   specialties?: string;
//   license_number?: string;
//   hire_date?: string;
//   bio?: string;
//   commission_rate?: string;
// };

export type TRequest = {
  first_name: string;
  last_name: string;
  gender: string;
  mobile: string;
  national_code: string;
  staff_type: string;
  role_ids: number[];
  facility_id?: number | null;
  specialties?: string | null;
  license_number?: string | null;
  hire_date?: string | null;
  bio?: string | null;
  commission_rate?: string | null;
  status: string;
};
export type TData = {
  data: {
    id: number;
    employee_code: string;
    roles: number[];
    staff_type: string;
    first_name: string;
    last_name: string;
    license_number: string | null;
    gender: string;
    national_code: string;
    facility_id: number | null;
    specialties: string[] | null;
    hire_date: string | null;
    bio: string | null;
    commission_rate: string | null;
    status: string;
    user: {
      id: number;
      mobile: string;
    };
  };
};
export type TRecord = TRequest & {
  actions?: string;
  id: number;
};
