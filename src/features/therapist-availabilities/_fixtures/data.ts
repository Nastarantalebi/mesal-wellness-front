import z from "zod";
import type { TReqTherapistsAvailabilities } from "../_types/types";

export const url = "/wellness/therapist/availabilities/";
export const queryKey = "therapistsAvailabilitiesQuerykey";

export const schema = z.object({
  end_time: z.string(),
  start_time: z.string(),
  therapist_id: z.coerce.number(),
  is_active: z.coerce.boolean(),
  weekday: z.string(),
  breaks: z.array(z.string()),
});

export const initialValues: TReqTherapistsAvailabilities = {
  end_time: "",
  is_active: true,
  start_time: "",
  therapist_id: 0,
  breaks: [],
  weekday: "",
};
