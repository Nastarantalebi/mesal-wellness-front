import { z } from "zod";
import type { TReqCompany } from "../_types/types";

export const url = "/basics/companies/";
export const queryKey = "CompanyQuerykey";

export const schema = z.object({
  name: z.string().min(1, " "),
});

export const initialValue: TReqCompany = {
  name: "",
};
