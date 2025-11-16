import z from "zod";
import type { TItems, TRequest } from "../_types/type";

export const url = "/wellness/bookings/";
export const queryKey = "bookingsQuerykey";
export const schema = z.object({
  customer_id: z.coerce.number({ message: " " }),
  notes: z.string(),
  items: z.array(
    z.object({
      end_at: z.string().min(1, "فیلد الزامی است"),
      start_at: z.string().min(1, "فیلد الزامی است"),
      resource_id: z.coerce.number({ message: " " }),
      service_id: z.coerce.number({ message: " " }),
      therapist_id: z.coerce.number({ message: " " }),
    })
  ),
});
export const itemsValues: TItems = {
  end_at: "",
  start_at: "",
  resource_id: 0,
  service_id: 0,
  therapist_id: 0,
};
export const initialValues: TRequest = {
  customer_id: 0,
  notes: "",
  items: [itemsValues],
};
