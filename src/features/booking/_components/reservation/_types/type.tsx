export type CalendarEvent = {
  id: number;
  title: string;
  service: string;
  customer: string;
  start: string;
  end: string;
  therapist: string;
  color: string;
  status: string;
};

export type CalendarDayEvents = {
  data: {
    date: string;
    type: string;
    events: CalendarEvent[];
  };
};
