import z from "zod";
import type { TReqCustomers } from "../_types/types";
import {
  mobileRequireValidationSchema,
  nationalCodeValidationSchema,
} from "@/fixtures/zodValidations";

export const url = "/wellness/customers/";
export const queryKey = "customersQuerykey";

export const schema = z
  .object({
    first_name: z.string().min(1, " "),
    last_name: z.string().min(1, " "),
    phone: mobileRequireValidationSchema,
    birth_date: z.string().nullable(),
    gender: z.string(),
    joined_at: z.string().nullable(),
    membership_type: z.string(),
    national_code: nationalCodeValidationSchema,
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
  birth_date: null,
  gender: "",
  joined_at: null,
  membership_type: "",
  national_code: null,
  notes: null,
  status: "",
  user_id: null,
};
