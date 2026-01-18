import type { TOption } from "@/types";
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

export type TReqTherapistsAvailabilities = {
  therapist_id: number;
  weekday: string;
  start_time: string;
  end_time: string;
  breaks: Breaks[];
  is_active: boolean;
};
export type TDataById = {
  data: data;
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
  data: {
    weekdays: TOption[];
    statuses: TOption[];
    therapists: TOption[];
  };
};
