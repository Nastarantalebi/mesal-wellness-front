import type { TFormData } from "@/types";
import type { TCreateData, TReqTherapists } from "../_types/types";
import useGetData from "@/services/useGetData";
import { queryKey, url } from "../_fixtures/data";

const useFormData = () => {
  const { data, isLoading } = useGetData<TCreateData>({
    url: `${url}create`,
    queryKey: `${queryKey},"dataCreate"`,
  });
  const fields: (TFormData<TReqTherapists> | undefined)[] = [
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
      name: "national_code",
      label: "کدملی",
      required: true,
      placeholder: "کدملی",
      inputType: "number",
    },
    {
      name: "bio",
      label: "درباره",
      required: true,
      placeholder: "درباره",
    },
    {
      name: "facility_id",
      label: "تسهیلات",
      required: true,
      placeholder: "تسهیلات",
      type: "select",
      isLoading: isLoading,
      option: data?.facilities ?? [],
    },
    {
      name: "gender",
      label: "جنسیت",
      required: true,
      placeholder: "جنسیت",
      type: "select",
      isLoading: isLoading,
      option: data?.genders ?? [],
    },
    {
      name: "hire_date",
      label: "تاریخ استخدام",
      required: true,
      type: "date",
      placeholder: "تاریخ استخدام",
    },
    {
      name: "license_number",
      label: "شماره پذیرش",
      required: true,
      placeholder: "شماره پذیرش",
    },
    {
      name: "mobile",
      label: "موبایل",
      required: true,
      placeholder: "موبایل",
      inputType: "number",
    },
    {
      name: "specialties",
      label: "تخصص ها",
      required: true,
      placeholder: "تخصص ها",
    },
    {
      name: "status",
      label: "وضعیت",
      required: true,
      placeholder: "وضعیت",
      type: "select",
      isLoading: isLoading,
      option: data?.statuses ?? [],
    },
  ];
  return { fields };
};

export default useFormData;
