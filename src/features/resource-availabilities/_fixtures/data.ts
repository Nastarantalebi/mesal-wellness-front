import z from "zod";
import type { TReqResourceAvailabilities } from "../_types/types";

export const url = "/wellness/resource/availabilities/";
export const queryKey = "resourceAvailabilitiesQuerykey";

export const schema = z.object({
  end_time: z.string(),
  start_time: z.string(),
  resource_id: z.coerce.number(),
  is_active: z.coerce.boolean(),
  weekday: z.string(),
  breaks: z.array(
    z.object({
      start_time: z.string(),
      end_time: z.string(),
    })
  ),
});

export const initialValues: TReqResourceAvailabilities = {
  end_time: "",
  is_active: true,
  start_time: "",
  resource_id: 0,
  breaks: [{ start_time: "", end_time: "" }],
  weekday: "",
};
