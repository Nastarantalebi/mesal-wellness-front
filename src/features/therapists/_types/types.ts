import type { TColumns, TOption } from "@/types";

export type TTherapists = {
  columns: {
    id: TColumns;
    first_name: TColumns;
    last_name: TColumns;
    mobile: TColumns;
    national_code: TColumns;
    facility: TColumns;
    status: TColumns;
    hire_date: TColumns;
  };
  data: {
    id: number;
    first_name: string;
    last_name: string;
    mobile:  string;
    national_code:  string;
    facility:  string;
    status: string;
    hire_date:  string;
  }[];
  paginate: {
    current_page: number;
    per_page: number;
    total: number;
    last_page: number;
    has_more: boolean;
  };
};

export type TReqTherapists = {
  first_name: string;
  last_name: string;
  mobile: string;
  national_code: string;
  gender: string;
  facility_id: number;
  status: string;
  specialties: string[];
  license_number: string;
  hire_date: string;
  bio: string;
  avatar_path: string;
};
type Therapist = {
  id: number;
  organization_id: number;
  facility: {
    id: number;
    name: string;
  };
  user: {
    id: number;
    first_name: string;
    last_name: string;
    mobile: string;
    national_code: string;
    gender: string;
  };
  status: string;
  specialties: string[];
  license_number: string;
  hire_date: string;
  bio: string;
  avatar_path: string | null;
};
export type TDataById = {
  therapist: Therapist;
};
export type TResTherapists = {
  success: boolean;
  message: string;
  data: TDataById;
};

export type TCreateData = {
  facilities: TOption[];
  statuses: TOption[];
  genders: TOption[];
};
