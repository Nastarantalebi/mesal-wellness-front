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
