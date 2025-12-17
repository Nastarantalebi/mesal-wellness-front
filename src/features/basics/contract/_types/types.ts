export type TDataById = {
  contract: {
    company: {
      id: number;
      name: string;
    };
    company_id: number;
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
  companies: {
    id: number;
    name: string;
  }[];
};
