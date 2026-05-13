import z from "zod";

import type { TFilterData } from "../_types/types";

export const url = "/wellness/services/report/";

export const schema = z.object({
  booking_status: z.string().nullable(),
  has_bookings: z.boolean().nullable(),
  sort_by: z.string().nullable(),
  sort_direction: z.string().nullable().optional(),
  category_id: z.coerce.number().nullable(),
  company_id: z.coerce.number().nullable(),
  gender_policy: z.string().nullable(),
  end_date: z.string().nullable(),
  status: z.string().nullable(),
  max_price: z.string().nullable(),
  min_price: z.string().nullable(),
  search: z.string().nullable().optional(),
  start_date: z.string().nullable(),
});

export const initialValues: TFilterData = {
  booking_status: null,
  has_bookings: null,
  sort_by: null,
  sort_direction: null,
  category_id: null,
  company_id: null,
  gender_policy: null,
  end_date: null,
  status: null,
  max_price: null,
  min_price: null,
  search: null,
  start_date: null,
};
