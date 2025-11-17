import z from "zod";
import type { TRequest } from "../_types/type";

export const schema = z.object({
  status: z.string().nullable(),
  from: z.string().min(1, "فیلد الزامی است"),
  to: z.string().min(1, "فیلد الزامی است"),
});
export const initialValues: TRequest = {
  status: null,
  to: "",
  from: "",
};
