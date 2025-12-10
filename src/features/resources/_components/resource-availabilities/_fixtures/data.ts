import z from "zod";
import type { TReqResourceAvailabilities } from "../_types/types";

export const url = "/wellness/resource/availabilities/";
export const queryKey = "resourceAvailabilitiesQuerykey";

// تبدیل "HH:MM" به دقیقه — اگر فرمت نامعتبر بود null برمی‌گرداند
const timeToMinutes = (t: string | null | undefined): number | null => {
  if (!t) return null;
  // اجازه بده ساعت‌ها مثل "9:00" یا "09:00" باشند
  const match = /^(\d{1,2}):([0-5]\d)$/.exec(t.trim());
  if (!match) return null;
  const h = Number(match[1]);
  const m = Number(match[2]);
  if (h < 0 || h > 23) return null;
  return h * 60 + m;
};

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
  .superRefine((data, ctx) => {
    const startMin = timeToMinutes(data.start_time);
    const endMin = timeToMinutes(data.end_time);
    if (startMin === null) {
      ctx.addIssue({
        code: "custom",
        path: ["start_time"],
        message: "فرمت زمان شروع معتبر نیست (باید HH:MM باشد).",
      });
    }
    if (endMin === null) {
      ctx.addIssue({
        code: "custom",
        path: ["end_time"],
        message: "فرمت زمان پایان معتبر نیست (باید HH:MM باشد).",
      });
    }
    if (startMin !== null && endMin !== null && startMin >= endMin) {
      ctx.addIssue({
        code: "custom",
        path: ["end_time"],
        message: "زمان پایان باید بعد از زمان شروع باشد.",
      });
    }
    data.breaks.forEach((br, idx) => {
      if (!br.start_time && !br.end_time) return;
      const bStart = timeToMinutes(br.start_time ?? null);
      const bEnd = timeToMinutes(br.end_time ?? null);
      if (bStart === null && br.start_time) {
        ctx.addIssue({
          code: "custom",
          path: ["breaks", idx, "start_time"],
          message: "فرمت زمان شروع معتبر نیست (باید HH:MM باشد).",
        });
      }
      if (bEnd === null && br.end_time) {
        ctx.addIssue({
          code: "custom",
          path: ["breaks", idx, "end_time"],
          message: "فرمت زمان پایان معتبر نیست (باید HH:MM باشد).",
        });
      }
      if (bStart !== null && bEnd !== null && bStart >= bEnd) {
        ctx.addIssue({
          code: "custom",
          path: ["breaks", idx, "start_time"],
          message: "زمان پایان باید بعد از زمان شروع آن باشد.",
        });
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
