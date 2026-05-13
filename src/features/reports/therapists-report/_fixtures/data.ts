import z from "zod";

import type { TFilterData } from "../_types/types";

export const url = "/wellness/therapists/report/";

export const schema = z.object({
  first_name: z.string().nullable(),
  last_name: z.string().nullable(),
  mobile: z.string().nullable(),
  gender: z.string().nullable(),
  national_code: z.string().nullable(),
  license_number: z.string().nullable(),
  status: z.string().nullable(),
  facility_id: z.coerce.number().nullable(),
  booking_date_from: z.string().nullable(),
  booking_date_to: z.string().nullable(),
  booking_status: z.string().nullable(),
  commission_rate_max: z.string().nullable(),
  commission_rate_min: z.string().nullable(),
  has_bookings: z.boolean().nullable(),
  hire_date_to: z.string().nullable(),
  hire_date_from: z.string().nullable(),
  specialty: z.string().nullable(),
  sort_by: z.string().nullable(),
  sort_dir: z.string().nullable().optional(),
  with_stats: z.boolean().nullable(),
});

export const initialValues: TFilterData = {
  first_name: null,
  last_name: null,
  mobile: null,
  gender: null,
  national_code: null,
  license_number: null,
  status: null,
  facility_id: null,
  booking_date_from: null,
  booking_date_to: null,
  booking_status: null,
  commission_rate_max: null,
  commission_rate_min: null,
  has_bookings: null,
  hire_date_to: null,
  hire_date_from: null,
  specialty: null,
  sort_by: null,
  sort_dir: null,
  with_stats: null,
};
