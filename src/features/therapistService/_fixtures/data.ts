import {  z } from "zod";
import type { TReqTherapistService } from "../_types/types";

export const url = "/wellness/therapist-services/";
export const queryKey = "therapistServiceQuerykey";

export const schema = z.object({
  commission_rate: z.string().min(1, " "),
  custom_price: z.string().min(1, " "),
  estimated_duration: z.string().min(1, " "),
  is_active: z.boolean(),
  service_id: z.number(),
  therapist_id: z.number(),
});

export const initialValue: TReqTherapistService = {
commission_rate:"",
custom_price:"",
estimated_duration:"",
is_active:true,
service_id:0,
therapist_id:0,
};
