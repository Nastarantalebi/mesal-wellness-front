import z from "zod";
import type { TRequest } from "../_types/types";
import {
  mobileRequireValidationSchema,
  nationalCodeRequireValidationSchema,
} from "@/fixtures/zodValidations";

export const url = "/wellness/staff/";
export const queryKey = "/wellness/staff/";

export const schema = z.object({
  first_name: z.string().min(1, " "),
  last_name: z.string().min(1, " "),
  mobile: mobileRequireValidationSchema,
  staff_type: z.string().min(1, " "),
  role_ids: z.array(z.number()).min(1, " "),
  national_code: nationalCodeRequireValidationSchema,
});

export const initialValues: TRequest = {
  first_name: "",
  last_name: "",
  mobile: "",
  national_code: "",
  staff_type: "",
  role_ids: [],
};
