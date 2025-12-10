import type { TColumns, TPaginate } from "@/types";

export type TResourceType = {
  columns: {
    id: TColumns;
    code: TColumns;
    name: TColumns;
    is_active: TColumns;
  };
  data: {
    id: number;
    code: string;
    name: string;
    is_active: boolean;
  }[];
  paginate: TPaginate;
};
export type TDataById = {
  type: {
    id: number;
    code: string;
    name: string;
    icon: string;
    description: string;
    is_active: boolean;
    meta: {
      floor: number;
      area_m2: number;
      capacity: number;
      has_projector: boolean;
    };
  };
};

export type TReqResourceType = {
  code: string | null;
  name: string;
  icon: string | null;
  description: string;
  is_active: string;
  meta?: {
    capacity: number;
    floor: number;
    has_projector: boolean;
    area_m2: number;
  };
};

export type TResResourceType = {
  success: boolean;
  message: string;
  data: {
    type: {
      id: number;
      code: string;
      name: string;
      icon: string;
      description: string;
      is_active: boolean;
      meta: {
        capacity: number;
        floor: number;
        has_projector: boolean;
        area_m2: number;
      };
    };
  };
};
