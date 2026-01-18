import type { TOption } from "@/types";

export type TDataById = {
  data: {
    id: number;
    facility: {
      id: number;
      name: number;
    };
    type: {
      id: number;
      name: number;
    };
    code: string;
    name: string;
    capacity: number;
    status: string;
    description: string;
    meta: {
      floor: number;
      notes: string;
      area_m2: number;
      has_shower: boolean;
      temperature_control: string;
    };
  };
};

export type TReqResources = {
  facility_id: number;
  type_id: number;
  code: string | null;
  name: string;
  capacity: string;
  status: string | null;
  description: string | null;
};

export type TCreateData = {
  data: {
    types: TOption[];
    facilities: TOption[];
    statuses: TOption[];
  };
};
