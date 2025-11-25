import z from "zod";
import type { TReqCustomers } from "../_types/types";

export const url = "/wellness/customers/";
export const queryKey = "customersQuerykey";

export const schema = z
  .object({
    first_name: z.string(),
    last_name: z.string(),
    phone: z.string(),
    birth_date: z.string(),
    gender: z.string(),
    joined_at: z.string().nullable(),
    membership_type: z.string(),
    national_code: z.string().nullable(),
    notes: z.string().nullable(),
    status: z.string(),
    user_id: z.number().nullable(),
  })
  .refine(
    (data) => {
      if (!data.joined_at || !data.birth_date) return true;
      const birth = new Date(data.birth_date);
      const join = new Date(data.joined_at);
      return join > birth;
    },
    {
      message: "تاریخ عضویت باید بعد از تاریخ تولد باشد",
      path: ["joined_at"],
    }
  );

export const initialValues: TReqCustomers = {
  first_name: "",
  last_name: "",
  phone: "",
  birth_date: "",
  gender: "",
  joined_at: null,
  membership_type: "",
  national_code: null,
  notes: null,
  status: "",
  user_id: null,
};
