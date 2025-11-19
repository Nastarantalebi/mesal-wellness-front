import type { TColumns, TOption } from "@/types";
type Breaks = {
  end_time: string | null;
  start_time: string | null;
};
type data = {
  id: number;
  therapist_id: number;
  therapist: {
    id: number;
    name: string;
  };
  weekday: string;
  weekday_label: string;
  start_time: string;
  end_time: string;
  breaks: Breaks[];
  is_active: boolean;
  is_active_label: string;
};

export type TTherapistsAvailabilities = {
  columns: {
    id: TColumns;
    weekday: TColumns;
    "therapist.full_name": TColumns;
    start_time: TColumns;
    end_time: TColumns;
    is_active: TColumns;
  };
  data: data[];
  paginate: {
    current_page: number;
    per_page: number;
    total: number;
    last_page: number;
    has_more: boolean;
  };
};

export type TReqTherapistsAvailabilities = {
  therapist_id: number;
  weekday: string;
  start_time: string;
  end_time: string;
  breaks: Breaks[];
  is_active: boolean;
};
export type TDataById = {
  availability: data;
};
export type TResTherapistsAvailabilities = {
  success: boolean;
  message: string;
  data: {
    availability: {
      id: number;
      therapist_id: number;
      weekday: string;
      weekday_label: string;
      start_time: string;
      end_time: string;
      breaks: Breaks[];
      is_active: boolean;
      is_active_label: string;
    };
  };
};

export type TCreateData = {
  success: boolean;
  message: string;
  data: {
    weekdays: TOption[];
    statuses: TOption[];
    therapists: TOption[];
  };
};
