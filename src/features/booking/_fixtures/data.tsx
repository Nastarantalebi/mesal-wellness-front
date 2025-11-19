import z from "zod";
import type { TItems, TRequest } from "../_types/type";

export const url = "/wellness/bookings/";
export const queryKey = "bookingsQuerykey";

export const schema = z.object({
  customer_id: z.coerce.number({ message: "فیلد الزامی است" }),
  notes: z.string().nullable(),
  items: z.array(
    z.object({
      date: z
        .string()
        .min(1, "فیلد الزامی است")
        .refine((val) => val.trim() !== "", "فیلد الزامی است"),
      start_at: z
        .string()
        .min(1, "فیلد الزامی است")
        .refine((val) => val.trim() !== "", "فیلد الزامی است"),
      end_at: z
        .string()
        .min(1, "فیلد الزامی است")
        .refine((val) => val.trim() !== "", "فیلد الزامی است"),
      resource_id: z.coerce.number({ message: "فیلد الزامی است" }),
      service_id: z.coerce.number({ message: "فیلد الزامی است" }),
      therapist_id: z.coerce.number({ message: "فیلد الزامی است" }),
      deposit: z.coerce.number({ message: "فیلد الزامی است" }),
      payable_amount: z.coerce.number({ message: "فیلد الزامی است" }),
      total_amount: z.coerce.number({ message: "فیلد الزامی است" }),
    })
  ),
});
export const itemsValues: TItems = {
  date: "",
  end_at: "",
  start_at: "",
  resource_id: 0,
  service_id: 0,
  therapist_id: 0,
  deposit: 0,
  payable_amount: 0,
  total_amount: 0,
};
export const initialValues: TRequest = {
  customer_id: 0,
  notes: null,
  items: [itemsValues],
};
