export type TDataById = {
  data: {
    id: number;
    code: string;
    name: string;
    city: string;
    address: string;
    phone: string;
    manager_name: string;
    description: string | null;
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
  description: string | null;
  is_active: boolean | null | "true" | "false";
};
