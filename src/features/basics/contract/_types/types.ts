export type TDataById = {
  data: {
    company: {
      id: number;
      name: string;
    };
    discount_percent: string;
    finished_at: string;
    id: number;
    start_at: string;
  };
};
export type TReqContract = {
  company_id: number;
  start_at: string;
  finished_at: string;
  discount_percent: string;
};
export type TCreateData = {
  data: {
    companies: {
      id: number;
      name: string;
    }[];
  };
};
