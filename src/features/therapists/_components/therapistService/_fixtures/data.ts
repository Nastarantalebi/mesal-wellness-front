import { z } from "zod";
import type { TReqTherapistService } from "../_types/types";
import { booleanNullableSchema } from "@/fixtures/zodValidations";

export const url = "/wellness/therapist-services/";
export const queryKey = "therapistServiceQuerykey";

export const schema = z
  .object({
    commission_rate: z.string().nullable(),
    custom_price: z.string().min(1, " "),
    estimated_duration: z.string().min(1, " "),
    is_active: booleanNullableSchema,
    service_id: z.coerce.number(),
    staff_id: z.coerce.number(),
  })
  .refine(
    (data) => {
      const duraton = parseInt(data.estimated_duration || "0", 10);
      return duraton >= 5;
    },
    {
      message: "مدت‌زمان باید حداقل 5 دقیقه باشد",
      path: ["estimated_duration"],
    },
  );

export const initialValue: TReqTherapistService = {
  commission_rate: "0",
  custom_price: "",
  estimated_duration: "",
  is_active: true,
  service_id: 0,
  staff_id: 0,
};
