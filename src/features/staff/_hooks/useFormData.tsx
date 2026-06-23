import type { TFormData } from "@/types";
import type { TCreateData, TRequest } from "../_types/types";
import useGetData from "@/services/useGetData";
import { queryKey, url } from "../_fixtures/useData.tsx";
import type { UseFormReturn } from "react-hook-form";
import { useEffect } from "react";

const useFormData = (form: UseFormReturn<TRequest, any, TRequest>) => {
  const { data, isLoading } = useGetData<TCreateData>({
    url: `${url}create`,
    queryKey: [queryKey, "dataCreate"],
  });

  const masseurRoleId = data?.data?.roles?.find(
    (role) => role.label === "ماساژور",
  )?.value;

  const roles = form.watch("role_ids");

  const isMasseur =
    masseurRoleId !== undefined && roles?.includes(masseurRoleId as number);

  useEffect(() => {
    if (!isMasseur && masseurRoleId !== null) {
      form.setValue("facility_id", null);
      form.setValue("specialties", null);
      form.setValue("hire_date", null);
      form.setValue("bio", null);
      form.setValue("license_number", null);
      form.setValue("commission_rate", null);
    }
  }, [isMasseur, masseurRoleId]);

  const fields: TFormData<TRequest>[] = [
    {
      name: "first_name",
      label: "نام",
      required: true,
      placeholder: "نام",
    },
    {
      name: "last_name",
      label: "نام خانوادگی",
      required: true,
      placeholder: "نام خانوادگی",
    },
    {
      name: "gender" as const,
      label: "جنسیت",
      required: true,
      placeholder: "جنسیت",
      type: "select" as const,
      option: data?.genders,
    },
    {
      name: "mobile",
      label: "موبایل",
      required: true,
      placeholder: "موبایل",
      inputType: "number",
      maxLength: 11,
    },
    {
      name: "staff_type",
      label: "نوع کارمند",
      placeholder: "نوع کارمند",
      type: "select",
      required: true,
      isLoading: isLoading,
      option: data?.data?.staff_types,
    },
    {
      name: "national_code",
      label: "کدملی",
      placeholder: "کدملی",
      inputType: "number",
      maxLength: 10,
      required: true,
    },
    {
      name: "role_ids",
      label: "نقش‌ها",
      placeholder: "نقش‌ها",
      type: "select",
      mode: "multiple",
      required: true,
      isLoading: isLoading,
      option: data?.data?.roles,
      className: "md:col-span-3",
    },

    ...(isMasseur
      ? [
          { name: "separator" as const, label: "اطلاعات ماساژیست" },
          {
            name: "facility_id" as const,
            label: "شعبه",
            required: true,
            placeholder: "شعبه",
            type: "select" as const,
            isLoading: isLoading,
            option: data?.facilities,
            className: "col-start-1",
          },
          {
            name: "specialties" as const,
            label: "تخصص",
            required: true,
            placeholder: "تخصص",
          },
          {
            name: "license_number" as const,
            label: "شماره مجوز",
            required: true,
            placeholder: "شماره مجوز",
          },
          {
            name: "hire_date" as const,
            label: "تاریخ استخدام",
            required: true,
            placeholder: "تاریخ استخدام",
            type: "date" as const,
          },
          {
            name: "commission_rate" as const,
            label: "درصد کمیسیون",
            required: true,
            placeholder: "درصد کمیسیون",
          },
          {
            name: "bio" as const,
            label: "درباره",
            required: false,
            placeholder: "درباره",
          },
        ]
      : []),
  ];

  return { fields };
};

export default useFormData;
