export type TDashboard = {
  widgets: {
    tiles: {
      title: string;
      value: number;
    }[];
    lists: {
      [key: string]: {
        data: Array<
          | {
              id: number;
              customer_name: string;
              phone: string;
              national_code: string | null;
              start_at: string;
              end_at: string;
              status: string;
            }
          | {
              id: number;
              full_name: string;
              phone: string;
              national_code: string | null;
              gender: string;
              membership_type: string;
              joined_at: string | null;
            }
        >;
        width: number;
      };
    };
  };
};

export type TDailyBoard = {
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
