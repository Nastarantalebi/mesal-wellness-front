import type { TOption } from "@/types";

export type TDataById = {
  data: {
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
  commission_rate: string | null;
  estimated_duration: string;
  is_active: boolean | null | "false" | "true";
};

export type TCreateData = {
  data: {
    therapists: TOption[];
    services: TOption[];
  };
};
