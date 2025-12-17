import { z } from "zod";
import type { TReqContract } from "../_types/types";

export const url = "/basics/contracts/";
export const queryKey = "contractQuerykey";

export const schema = z
  .object({
    finished_at: z.string().min(1, " "),
    start_at: z.string().min(1, " "),
    discount_percent: z.string(),
    company_id: z.coerce.number().min(1, " "),
  })
  .refine(
    (data) => {
      return new Date(data.finished_at) > new Date(data.start_at);
    },
    {
      message: "تاریخ پایان باید بعد از تاریخ شروع باشد",
      path: ["finished_at"],
    }
  );

export const initialValue: TReqContract = {
  discount_percent: "0",
  finished_at: "",
  start_at: "",
  company_id: 0,
};
