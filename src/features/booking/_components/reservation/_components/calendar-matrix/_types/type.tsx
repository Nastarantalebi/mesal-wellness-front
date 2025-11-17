export type TRequest = {
  id: number | null;
  type: string;
  from: string;
  to: string;
};
export type TEvent = {
  id: number;
  service: string;
  customer: string;
  start: string;
  end: string;
  status: string;
  color: string;
};

export type TDay = {
  date: string;
  count: number;
  events: TEvent[];
};

export type TRow = {
  id: number;
  name: string;
  days: TDay[];
};

export type TResponse = {
  from: string;
  to: string;
  type: string; 
  dates: string[];
  rows: TRow[];
};
