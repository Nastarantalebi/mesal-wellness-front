import type { icons } from "lucide-react";
export type TDailyBoard = {
  data: {
    date: string;
    prev_url: string;
    next_url: string;
    slots: {
      from: string;
      to: string;
      label: string;
      rows: {
        booking_item_id: number;
        booking_id: number;
        room: {
          id: number;
          name: string;
        };
        company: {
          name: string | null;
        };
        therapist: {
          id: number;
          name: string;
        };
        customer: {
          id: number;
          name: string;
          phone: string;
        };
        service: {
          id: number;
          title: string;
        };
        status: string;
        start_time: string;
        end_time: string;
        price: number;
        deposit: number;
      }[];
    }[];
    resources: {
      id: number;
      name: string;
    }[];
  };
};

export interface TMenu {
  icon: keyof typeof icons;
  label: string;
  badge?: number;
  pathname?: string;
  subMenu?: TMenu[];
  ignore?: boolean;
}
type WidgetHeader = {
  key: string;
  label: string;
};

type WidgetRow =
  | {
      id: number;
      customer_name: string;
      therapist_name: string;
      start_at: string;
      end_at: string;
      status: string;
    }
  | {
      full_name: string;
      gender: string;
      id: number;
      phone: string;
    };

export type WidgetListData = {
  headers: WidgetHeader[];
  rows: WidgetRow[];
};

export type WidgetItem = {
  title: string;
  icon: keyof typeof icons | null;
  data: WidgetListData;
};

export type WidgetNumberItem = {
  title: string;
  icon: keyof typeof icons | null;
  data: {
    count: number;
  };
};

type Widgets = {
  list: WidgetItem[];
  number: WidgetNumberItem[];
};

export type ApiResponseGetData = {
  is_success: boolean;
  message: string;
  code: number;
  data: {
    widgets: Widgets;
  };
};
