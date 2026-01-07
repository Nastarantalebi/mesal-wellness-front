export type TChat = {
  message: string;
};

export type TResTicket = {
  id: number;
  author_type: "admin" | "user";
  created_at: string;
  message: string;
};

export type TResList = {
  created_at: string;
  description: string;
  id: string;
  status: "OPEN" | "CLOSED";
  title: string;
  updated_at: string;
};
export type TReqList = {
  title: string;
  description: string;
  priorty: string;
};
