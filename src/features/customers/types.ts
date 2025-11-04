import type { TColumns } from "../../types";

export type Tcustomers = {
  columns: {
    medical_code: TColumns;
    first_name: TColumns;
    last_name: TColumns;
    mobile: TColumns;
    national_code: TColumns;
  };
  data: {
    medical_code: string;
    first_name: string;
    last_name: string;
    mobile: string;
    national_code: string;
  }[];
  paginate: {
    current_page: number;
    per_page: number;
    total: number;
    last_page: number;
    has_more: boolean;
  };
};

export type TReqcustomers = {
  medical_code: string;
  first_name: string;
  last_name: string;
  mobile: string;
  national_code: string;
};
