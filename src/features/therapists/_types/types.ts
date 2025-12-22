import type { TOption } from "@/types";
export type TReqTherapists = {
  first_name: string;
  last_name: string;
  mobile: string;
  national_code: string | null;
  gender: string;
  facility_id: number;
  status: string | null;
  specialties: string[];
  license_number: string | null;
  hire_date: string | null;
  bio: string | null;
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
