import z from "zod";
import type { TRequest } from "../_types/type";

export const schema = z
  .object({
    status: z.string().nullable(),
    from: z.string().min(1, " "),
    to: z.string().min(1, " "),
  })
  .refine(
    (data) => {
      if (!data.from || !data.to) return true;
      const to = new Date(data.to);
      const from = new Date(data.from);
      return to >= from;
    },
    {
      message: "تاریخ پایان نباید کوچکتر از تاریخ شروع باشد",
      path: ["to"],
    }
  );
export const initialValues: TRequest = {
  status: null,
  to: "",
  from: "",
};
