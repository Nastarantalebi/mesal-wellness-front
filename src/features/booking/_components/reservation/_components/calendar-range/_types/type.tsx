export type TRequest = {
  status: string | null;
  from: string;
  to: string;
};

export type TResponse = {
  data: {
    from: string;
    to: string;
    type: string;
    days: {
      date: string;
      events: {
        id: number;
        title: string;
        service: string;
        customer: string;
        therapist: string;
        resource: string;
        start: string;
        end: string;
        status: string;
        color: string;
      }[];
    }[];
  };
};
