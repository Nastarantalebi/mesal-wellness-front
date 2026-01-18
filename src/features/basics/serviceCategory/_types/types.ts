export type TDataById = {
  data: {
    id: number;
    title: string;
    icon: string | null;
    description: string | null;
    is_active: boolean;
  };
};

export type TReqServiceCategory = {
  title: string;
  description: string;
  is_active: boolean | null;
};
