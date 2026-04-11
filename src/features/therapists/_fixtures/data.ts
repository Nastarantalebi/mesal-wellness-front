import z from "zod";
import type { TReqTherapists } from "../_types/types";
import {
  mobileRequireValidationSchema,
  nationalCodeValidationSchema,
} from "@/fixtures/zodValidations";

export const url = "/wellness/therapists/";
export const queryKey = "therapistsQuerykey";

export const schema = z.object({
  first_name: z.string().min(1, " "),
  last_name: z.string().min(1, " "),
  mobile: mobileRequireValidationSchema,
  bio: z.string().nullable(),
  gender: z.string().min(1, " "),
  hire_date: z.string().nullable(),
  national_code: nationalCodeValidationSchema,
  license_number: z.string().nullable(),
  status: z.string().nullable(),
  specialties: z.array(z.string()),
  commission_rate: z.string().nullable(),
  facility_id: z.coerce.number().min(1, " "),
});

export const initialValues: TReqTherapists = {
  first_name: "",
  last_name: "",
  mobile: "",
  bio: null,
  commission_rate: "0",
  gender: "",
  hire_date: null,
  national_code: null,
  license_number: null,
  status: null,
  facility_id: 0,
  specialties: [],
};
