import type { TOption } from "@/types";
type Breaks = {
  end_time: string | null;
  start_time: string | null;
};
export type TReqResourceAvailabilities = {
  resource_id: number;
  weekday: string;
  start_time: string;
  end_time: string;
  breaks: Breaks[];
  is_active: boolean | null | "false" | "true";
};
export type TDataById = {
  data: {
    id: number;
    resource_id: number;
    resource: string | null;
    weekday: string;
    weekday_label: string;
    start_time: string;
    end_time: string;
    breaks: Breaks[];
    is_active: boolean;
    is_active_label: string;
    created_at: string;
    updated_at: string;
  };
};

export type TCreateData = {
  data: {
    weekdays: TOption[];
    statuses: TOption[];
    resources: TOption[];
  };
};
