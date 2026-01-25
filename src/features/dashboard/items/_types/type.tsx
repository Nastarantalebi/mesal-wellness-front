import type { icons } from "lucide-react";
export type TDailyBoard = {
  is_success: boolean;
  message: string;
  code: number;
  data: {
    date: string;
    prev_url: string;
    next_url: string;
    columns: string[];
    rows: string[][];
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
      customer_name: string;
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
    label: number;
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
