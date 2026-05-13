import z from "zod";

import type { TFilterData } from "../_types/types";

export const url = "/wellness/customers/report/";

export const schema = z.object({
  booking_start_from: z.string().nullable(),
  booking_start_to: z.string().nullable(),
  booking_status: z.string().nullable(),
  gender: z.string().nullable(),
  has_bookings: z.string().nullable(),
  joined_from: z.string().nullable(),
  status: z.string().nullable(),
  joined_to: z.string().nullable(),
  max_revenue: z.string().nullable(),
  membership_type: z.string().nullable(),
  min_revenue: z.string().nullable(),
  sort_by: z.string().nullable(),
  sort_direction: z.string().nullable(),
});

export const initialValues: TFilterData = {
  booking_start_from: null,
  booking_start_to: null,
  booking_status: null,
  gender: null,
  has_bookings: null,
  joined_from: null,
  status: null,
  joined_to: null,
  max_revenue: null,
  membership_type: null,
  min_revenue: null,
  sort_by: null,
  sort_direction: null,
};
