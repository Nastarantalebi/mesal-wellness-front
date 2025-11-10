import type { TColumns, TOption } from "@/types";
export type TResourceAvailabilities = {
  columns: {
    id: TColumns;
    weekday: TColumns;
    "therapist.full_name": TColumns;
    start_time: TColumns;
    end_time: TColumns;
    is_active: TColumns;
  };
  data: {
    id: number;
    therapist_id: number;
    therapist: {
      id: number;
      name: string | null;
    };
    weekday: string;
    weekday_label: string;
    start_time: string;
    end_time: string;
    breaks: {
      end_time: string;
      start_time: string;
    }[];
    is_active: boolean;
    is_active_label: string;
  }[];
  paginate: {
    current_page: number;
    per_page: number;
    total: number;
    last_page: number;
    has_more: boolean;
  };
};

export type TReqResourceAvailabilities = {
  resource_id: number;
  weekday: string;
  start_time: string;
  end_time: string;
  breaks: {
    start_time: string;
    end_time: string;
  }[];
  is_active: boolean;
};
export type TDataById = {
  availability: {
    id: number;
    resource_id: number;
    resource: string | null;
    weekday: string;
    weekday_label: string;
    start_time: string;
    end_time: string;
    breaks: {
      end_time: string;
      start_time: string;
    }[];
    is_active: boolean;
    is_active_label: string;
    created_at: string;
    updated_at: string;
  };
};
export type TResResourceAvailabilities = {
  success: boolean;
  message: string;
  data: {
    availability: {
      id: number;
      resource_id: number;
      weekday: string;
      weekday_label: string;
      start_time: string;
      end_time: string;
      breaks: {
        start_time: string;
        end_time: string;
      }[];
      is_active: boolean;
      is_active_label: string;
      created_at: string;
      updated_at: string;
    };
  };
};

export type TCreateData = {
  success: boolean;
  message: string;
  data: {
    weekdays: TOption[];
    statuses: TOption[];
    resources: TOption[];
  };
};
