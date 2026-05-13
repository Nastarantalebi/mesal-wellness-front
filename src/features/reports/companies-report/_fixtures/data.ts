import z from "zod";

import type { TFilterData } from "../_types/types";

export const url = "/basics/companies/report/";

export const schema = z.object({
  booking_start_from: z.string().nullable(),
  booking_start_to: z.string().nullable(),
  booking_status: z.string().nullable(),
  contract_end_from: z.string().nullable(),
  contract_end_to: z.string().nullable(),
  contract_start_from: z.string().nullable(),
  contract_start_to: z.string().nullable(),
  contract_status: z.string().nullable(),
  has_bookings: z.string().nullable(),
  has_contracts: z.string().nullable(),
  max_revenue: z.string().nullable(),
  min_revenue: z.string().nullable(),
  sort_by: z.string().nullable(),
  sort_direction: z.string().nullable().optional(),
  search: z.string().nullable().optional(),
});

export const initialValues: TFilterData = {
  booking_start_from: null,
  booking_start_to: null,
  booking_status: null,
  contract_end_from: null,
  contract_end_to: null,
  contract_start_from: null,
  contract_start_to: null,
  contract_status: null,
  has_bookings: null,
  has_contracts: null,
  max_revenue: null,
  min_revenue: null,
  sort_by: null,
  search: null,
  sort_direction: null,
};
