
export type TRequest = {
  customer_id: number;
  notes: string;
  items: {
    service_id: number;
    therapist_id: number;
    resource_id: number;
    start_at: string;
    end_at: string;
  }[];
};
export type TResponse = {
  customer_id: number;
  notes: string;
  items: {
    service_id: number;
    therapist_id: number;
    resource_id: number;
    start_at: string;
    end_at: string;
  }[];
};
export type TCreateData = {
  success: boolean;
  message: string;
  data: {
    statuses: {
      value: string;
      label: string;
    }[];
    services: {
      value: number;
      label: string;
    }[];
    therapists: {
      value: number;
      label: string;
    }[];
    resources: {
      value: number;
      label: string;
    }[];
    customers: {
      value: number;
      label: string;
    }[];
  };
};
