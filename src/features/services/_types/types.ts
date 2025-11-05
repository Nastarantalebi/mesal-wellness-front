import type { TColumns, TPaginate } from "@/types";

export type TServices = {
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
  paginate: TPaginate;
};

export type TReqServices = {
  medical_code: string;
  first_name: string;
  last_name: string;
  mobile: string;
  national_code: string;
};
