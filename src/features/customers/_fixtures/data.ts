import z from "zod";
import type { TReqCustomers } from "../_types/types";

export const url = "/wellness/customers/";
export const queryKey = "customersQuerykey";

export const schema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  phone: z.string(),
  birth_date: z.string(),
  gender: z.string(),
  joined_at: z.string(),
  membership_type: z.string(),
  national_code: z.string(),
  notes: z.string(),
  status: z.string(),
  user_id: z.number().nullable(),
});

export const initialValues: TReqCustomers = {
  first_name: "",
  last_name: "",
  phone: "",
  birth_date: "",
  gender: "",
  joined_at: "",
  membership_type: "",
  national_code: "",
  notes: "",
  status: "",
  user_id: null,
};
