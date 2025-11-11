import type { TColumns, TOption, TPaginate } from "@/types";

export type TTherapistService = {
  columns: {
    id: TColumns;
    therapist: TColumns;
    service: TColumns;
    custom_price: TColumns;
    commission_rate: TColumns;
    is_active: TColumns;
  };
  data: {
    id: 2;
    therapist: string;
    service: string;
    custom_price: number;
    commission_rate: number;
    is_active: boolean;
  }[];
  paginate: TPaginate;
};
export type TDataById = {
  therapist_service: {
    id: number;
    therapist: {
      id: number;
      name: string;
    };
    service: {
      id: number;
      title: string;
    };
    custom_price: number;
    commission_rate: number;
    estimated_duration: number;
    is_active: boolean;
  };
};

export type TReqTherapistService = {
  therapist_id: number;
  service_id: number;
  custom_price: string;
  commission_rate: string;
  estimated_duration: string;
  is_active: string;
};

export type TResTherapistService = {
  success: boolean;
  message: string;
  data: TDataById;
};
export type TCreateData = {
  therapists: TOption[];
  services: TOption[];
};
