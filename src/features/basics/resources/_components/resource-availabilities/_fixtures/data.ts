import z from "zod";
import type { TReqResourceAvailabilities } from "../_types/types";

export const url = "/wellness/resource/availabilities/";
export const queryKey = "resourceAvailabilitiesQuerykey";

export const schema = z
  .object({
    end_time: z.string().min(1, " "),
    start_time: z.string().min(1, " "),
    resource_id: z.coerce.number(),
    is_active: z.coerce.boolean(),
    weekday: z.string().min(1, " "),
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
  )
  .superRefine((data, ctx) => {
    let mainStartMinutes = -1;
    let mainEndMinutes = -1;

    if (data.start_time && data.end_time) {
      const [mainSH, mainSM] = data.start_time.split(":").map(Number);
      const [mainEH, mainEM] = data.end_time.split(":").map(Number);
      mainStartMinutes = mainSH * 60 + mainSM;
      mainEndMinutes = mainEH * 60 + mainEM;
    }
    data.breaks.forEach((item, index) => {
      if (item.start_time && item.end_time) {
        const [sh, sm] = item.start_time.split(":").map(Number);
        const [eh, em] = item.end_time.split(":").map(Number);
        const breakStartMinutes = sh * 60 + sm;
        const breakEndMinutes = eh * 60 + em;
        if (breakEndMinutes <= breakStartMinutes) {
          ctx.addIssue({
            code: "custom",
            message: "پایان باید بعد از شروع باشد",
            path: ["breaks", index, "end_time"],
          });
          return;
        }
        if (mainStartMinutes === -1 || mainEndMinutes === -1) {
          return;
        }

        const isBreakWithinMainSchedule =
          breakStartMinutes >= mainStartMinutes &&
          breakEndMinutes <= mainEndMinutes;

        if (!isBreakWithinMainSchedule) {
          ctx.addIssue({
            code: "custom",
            message: "استراحت باید درون بازه زمانی اصلی تعریف شود.",
            path: ["breaks", index, "start_time"],
          });
          ctx.addIssue({
            code: "custom",
            message: "استراحت باید درون بازه زمانی اصلی تعریف شود.",
            path: ["breaks", index, "end_time"],
          });
        }
      }
    });
  });

export const initialValues: TReqResourceAvailabilities = {
  end_time: "",
  is_active: true,
  start_time: "",
  resource_id: 0,
  breaks: [{ start_time: "", end_time: "" }],
  weekday: "",
};
