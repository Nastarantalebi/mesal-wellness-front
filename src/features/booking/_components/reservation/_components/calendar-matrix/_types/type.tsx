export type TRequest = {
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
  data: {
    from: string;
    to: string;
    type: string;
    dates: string[];
    rows: TRow[];
  };
};
