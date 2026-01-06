import type { TOption } from "@/types";

export type TCreateData = {
  data: {
    staff_types: TOption[];
    roles: TOption[];
  };
};

export type TRequest = {
  first_name: string;
  last_name: string;
  mobile: string;
  national_code: string;
  staff_type: string;
  role_ids: number[];
};
export type TData = {
  data: {
    id: number;
    employee_code: string;
    roles: number[];
    staff_type: string;
    user: {
      id: number;
      first_name: string;
      last_name: string;
      national_code: string;
      mobile: string;
    };
  };
};
export type TRecord = TRequest & {
  actions?: string;
  id: number;
};
