import z from "zod";
import type { TCreateData, TRequest } from "../_types/types";
import {
  mobileRequireValidationSchema,
  nationalCodeRequireValidationSchema,
} from "@/fixtures/zodValidations";
import useGetData from "@/services/useGetData";

export const url = "/wellness/staff/";
export const queryKey = "/wellness/staff/";

const useData = () => {
  const { data } = useGetData<TCreateData>({
    url: `${url}create`,
    queryKey: [queryKey, "dataCreate"],
  });

  const masseurRoleId = data?.data?.roles?.find(
    (role) => role.label === "ماساژور",
  )?.value;

  const schema = z
    .object({
      first_name: z.string().min(1, "فیلد الزامی است"),
      last_name: z.string().min(1, "فیلد الزامی است"),
      gender: z.string().min(1, "فیلد الزامی است"),
      mobile: mobileRequireValidationSchema,
      staff_type: z.string().min(1, "فیلد الزامی"),
      role_ids: z.array(z.number()).min(1, "حداقل یک نقش انتخاب کنید"),
      national_code: nationalCodeRequireValidationSchema,
      facility_id: z.number().nullable().optional(),
      specialties: z.string().nullable().optional(),
      license_number: z.string().nullable().optional(),
      hire_date: z.string().nullable().optional(),
      bio: z.string().nullable().optional(),
      commission_rate: z.string().nullable().optional(),
      status: z.string(),
    })
    .superRefine((data, ctx) => {
      const isMessageist = data.role_ids.includes(masseurRoleId as number);

      if (isMessageist) {
        const requiredFields: (keyof typeof data)[] = [
          "facility_id",
          "specialties",
          "license_number",
          "hire_date",
          "commission_rate",
        ];

        requiredFields.forEach((field) => {
          if (!data[field]) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              path: [field],
              message: "فیلد الزامی است.",
            });
          }
        });
      }
    });

  const initialValues: TRequest = {
    first_name: "",
    last_name: "",
    gender: "",
    mobile: "",
    national_code: "",
    staff_type: "",
    role_ids: [],
    facility_id: null,
    specialties: null,
    license_number: null,
    hire_date: null,
    bio: null,
    commission_rate: null,
    status: "active",
  };
  return { schema, initialValues };
};
export default useData;
