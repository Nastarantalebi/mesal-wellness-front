import type { TColumns, TOption, TPaginate } from "@/types";

export type TResources = {
  columns: {
    id: TColumns;
    name: TColumns;
    "type.name": TColumns;
    capacity: TColumns;
    status: TColumns;
  };
  data: {
    id: number;
    name: string;
    "type.name": string | null;
    capacity: number;
    status: string;
  }[];
  paginate: TPaginate;
};
export type TDataById = {
  resource: {
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
  meta?: {
    floor: number;
    area_m2: number;
    has_shower: boolean;
    temperature_control: string;
    notes: string;
  };
};
export type TResResources = {
  success: boolean;
  message: string;
  data: {
    resource: {
      id: number;
      facility: string | null;
      type: string | null;
      code: string;
      name: string;
      capacity: number;
      status: string;
      description: string;
      meta: {
        floor: number;
        area_m2: number;
        has_shower: boolean;
        temperature_control: string;
        notes: string;
      };
    };
  };
};

export type TCreateData = {
  types: TOption[];
  facilities: TOption[];
  statuses: TOption[];
};
