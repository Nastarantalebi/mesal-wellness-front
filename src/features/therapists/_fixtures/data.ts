import z from "zod";
import type { TReqTherapists } from "../_types/types";

export const url = "/wellness/therapists/";
export const queryKey = "therapistsQuerykey";

export const schema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  mobile: z.string(),
  bio: z.string(),
  avatar_path: z.string(),
  gender: z.string(),
  hire_date: z.string(),
  national_code: z.string(),
  license_number: z.string(),
  status: z.string(),
  specialties: z.string(),
  // specialties: z.array(z.string()),
  facility_id: z.coerce.number(),
});

export const initialValues: TReqTherapists = {
  first_name: "",
  last_name: "",
  mobile: "",
  bio: "",
  avatar_path: "",
  gender: "",
  hire_date: "",
  national_code: "",
  license_number: "",
  status: "",
  facility_id: 1,
  specialties: "",
};
