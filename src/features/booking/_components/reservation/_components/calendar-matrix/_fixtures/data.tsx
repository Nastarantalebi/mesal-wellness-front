import z from "zod";
import type { TRequest } from "../_types/type";

export const schema = z.object({
  id: z.string().nullable(),
  type: z.string().min(1, "فیلد الزامی است"),
  from: z.string().min(1, "فیلد الزامی است"),
  to: z.string().min(1, "فیلد الزامی است"),
});
export const initialValues: TRequest = {
  id: null,
  type: "therapist",
  to: "",
  from: "",
};
