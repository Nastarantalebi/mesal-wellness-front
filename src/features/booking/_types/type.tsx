export type TItems = {
  service_id: number;
  therapist_id: number;
  resource_id: number;
  start_at: string;
  end_at: string;
  deposit: number;
  payable_amount: number;
  total_amount: number;
  date: string;
};

export type TBookingItem = {
  id: number;
  service_id: number;
  service_label: string | null;
  therapist_id: number;
  therapist_label: string;
  resource_id: number;
  resource_label: string | null;
  start_at: string;
  end_at: string;
  duration_minutes: number;
  quantity: number;
  unit_price: number;
  total_price: number;
  status: string;
  status_label: string;
  notes: string | null;
};
export type TRequest = {
  customer_id: number;
  notes: string | null;
  items: TItems[];
};
export type TResponse = {
  success: boolean;
  message: string;
  data: {
    booking: {
      id: number;
      organization_id: number;
      customer_id: number;
      customer_name: string;
      code: string | null;
      status: string;
      status_label: string;
      start_at: string;
      end_at: string;
      total_amount: number | null;
      discount_amount: number | null;
      tax_amount: number | null;
      payable_amount: number | null;
      paid_amount: number | null;
      notes: string | null;
      items: TBookingItem[];
      created_at: string;
      updated_at: string;
    };
  };
};

export type TDataById = {
  booking: {
    id: number;
    organization_id: number;
    customer_id: number;
    customer_name: string;
    code: string | null;
    status: string;
    status_label: string;
    start_at: string;
    end_at: string;
    total_amount: number;
    discount_amount: number;
    tax_amount: number;
    payable_amount: number;
    paid_amount: number;
    notes: string | null;
    items: TBookingItem[];
    created_at: string;
    updated_at: string;
  };
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
export type TSelect = {
  actions?: string;
  customer_name: string;
  end_at: string;
  id: number;
  national_code: string | null;
  phone: string;
  start_at: string;
  status: string;
};

export type TAvailabilityData = {
  date: string;
  start_at: string;
  end_at: string;
  available_rooms: {
    id: number;
    name: string;
  }[];
  unavailable_rooms: {
    id: number;
    name: string;
    reason?: string;
  }[];
  available_therapists: {
    id: number;
    name: string;
  }[];
  unavailable_therapists: {
    id: number;
    name: string;
    reason?: string;
  }[];
};
