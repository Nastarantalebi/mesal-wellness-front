import type { TColumns } from "@/types";

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
  paginate: {
    current_page: number;
    per_page: number;
    total: number;
    last_page: number;
    has_more: boolean;
  };
};

export type TReqServices = {
  medical_code: string;
  first_name: string;
  last_name: string;
  mobile: string;
  national_code: string;
};

export type test = {
  columns: {
    title: {
      label: "عنوان";
      sortable: true;
      filterable: true;
      visible: true;
      type: "string";
    };
    "category.title": {
      label: "دسته‌بندی";
      sortable: false;
      filterable: true;
      visible: true;
      type: "string";
    };
    duration_minutes: {
      label: "مدت زمان (دقیقه)";
      sortable: false;
      filterable: true;
      visible: true;
      type: "string";
    };
    base_price: {
      label: "قیمت پایه";
      sortable: true;
      filterable: true;
      visible: true;
      type: "string";
    };
    is_active: {
      label: "فعال بودن";
      sortable: false;
      filterable: true;
      visible: true;
      type: "string";
    };
  };
  data: [];
  paginate: {
    current_page: 1;
    per_page: 20;
    total: 0;
    last_page: 1;
    has_more: false;
  };
};
