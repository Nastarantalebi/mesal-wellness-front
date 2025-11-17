export interface Event {
  id: number;
  title: string;
  service: string;
  customer: string;
  start: string;
  end: string;
  therapist: string;
  color: string;
  status: string;
}

export interface DayEvents {
  date: string;
  type: string;
  events: Event[];
}