export type TDataById = {
  data: {
    id: number;
    code: string;
    name: string;
    icon: string;
    description: string | null;
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
  description: string | null;
  is_active: boolean | null | "true" | "false";
  meta?: {
    capacity: number;
    floor: number;
    has_projector: boolean;
    area_m2: number;
  };
};
