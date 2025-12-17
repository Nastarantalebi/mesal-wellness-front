import z from "zod";
import type { TItems, TRequest } from "../_types/type";

export const url = "/wellness/bookings/";
export const queryKey = "bookingsQuerykey";
export const timeToMinutes = (time: string) => {
  const [hour, minute] = time.split(":").map(Number);
  return hour * 60 + minute;
};

export const schema = z
  .object({
    customer_id: z.coerce.number().min(1, " "),
    company_id: z.coerce.number().nullable(),
    notes: z.string().nullable(),
    payable_amount: z.coerce.number(),
    discount_amount: z.coerce.number(),
    total_amount: z.coerce.number(),
    deposit: z.coerce.number(),
    items: z.array(
      z.object({
        date: z.string().min(1, " "),
        start_at: z.string().min(1, " "),
        end_at: z.string().min(1, " "),
        resource_id: z.coerce.number().min(1, " "),
        service_id: z.coerce.number().min(1, " "),
        therapist_id: z.coerce.number().min(1, " "),
        total_price: z.coerce.number(),
        unit_price: z.coerce.number(),
      })
    ),
  })
  .superRefine((data, ctx) => {
    data.items.forEach((item, index) => {
      const start = timeToMinutes(item.start_at);
      const end = timeToMinutes(item.end_at);
      if (start >= end) {
        ctx.addIssue({
          code: "custom",
          message: "زمان پایان باید بعد از زمان شروع باشد",
          path: ["items", index, "end_at"],
        });
      }
    });
  });

export const itemsValues: TItems = {
  date: "",
  end_at: "",
  start_at: "",
  resource_id: 0,
  service_id: 0,
  therapist_id: 0,
  total_price: 0,
  unit_price: 0,
};
export const initialValues: TRequest = {
  customer_id: 0,
  notes: null,
  deposit: 200000,
  total_amount: 0,
  company_id: null,
  payable_amount: 0,
  discount_amount: 0,
  items: [itemsValues],
};
