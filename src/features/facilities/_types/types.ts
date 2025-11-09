import type { TColumns, TPaginate } from "@/types";

export type TFacilities = {
  columns: {
    code: TColumns;
    name: TColumns;
    manager_name: TColumns;
    city: TColumns;
    is_active: TColumns;
    phone: TColumns;
  };
  data: {
    code: string;
    name: string;
    city: string;
    manager_name: string;
    phone: string;
    is_active: boolean;
  }[];
  paginate: TPaginate;
};
export type TDataById = {
  facility: {
    id: number;
    code: string;
    name: string;
    city: string;
    address: string;
    phone: string;
    manager_name: string;
    description: string;
    is_active: boolean;
    meta: {
      has_parking: boolean;
      opening_hours: number | null;
      google_map_link: string | null;
    };
  };
};
export type TReqFacilities = {
  code: string;
  name: string;
  city: string;
  address: string;
  phone: string;
  manager_name: string;
  description: string;
  is_active: boolean;
  meta?: {
    opening_hours: string;
    has_parking: boolean;
    google_map_link: string;
  };
};
export type TResFacilities = {
  success: boolean;
  message: string;
  data: {
    facility: TReqFacilities;
  };
};
