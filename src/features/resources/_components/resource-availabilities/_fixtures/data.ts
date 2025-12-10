import z from "zod";
import type { TReqResourceAvailabilities } from "../_types/types";

export const url = "/wellness/resource/availabilities/";
export const queryKey = "resourceAvailabilitiesQuerykey";

export const schema = z
  .object({
    end_time: z.string().min(1, "فیلد الزامی است."),
    start_time: z.string().min(1, "فیلد الزامی است."),
    resource_id: z.coerce.number(),
    is_active: z.coerce.boolean(),
    weekday: z.string().min(1, "فیلد الزامی است."),
    breaks: z.array(
      z.object({
        start_time: z.string().nullable(),
        end_time: z.string().nullable(),
      })
    ),
  })
  .refine(
    (data) => {
      if (data.start_time && data.end_time) {
        const [startHour, startMinute] = data.start_time.split(":").map(Number);
        const [endHour, endMinute] = data.end_time.split(":").map(Number);
        const startTotalMinutes = startHour * 60 + startMinute;
        const endTotalMinutes = endHour * 60 + endMinute;
        return endTotalMinutes > startTotalMinutes;
      }
      return true;
    },
    {
      message: "زمان پایان باید بعد از زمان شروع باشد",
      path: ["end_time"],
    }
  );

export const initialValues: TReqResourceAvailabilities = {
  end_time: "",
  is_active: true,
  start_time: "",
  resource_id: 0,
  breaks: [{ start_time: "", end_time: "" }],
  weekday: "",
};
