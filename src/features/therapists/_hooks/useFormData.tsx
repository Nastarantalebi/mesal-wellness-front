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
      label: "محل ارائه خدمات",
      required: true,
      placeholder: "محل ارائه خدمات",
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
      label: "شماره مجوز",
      required: true,
      placeholder: "شماره مجوز",
    },
    {
      name: "mobile",
      label: "موبایل",
      required: true,
      placeholder: "موبایل",
      inputType: "number",
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
    {
      name: "specialties",
      label: "تخصص ها",
      required: true,
      type: "tags",
      placeholder: "تخصص ها",
      className:'col-span-3'
    },
  ];
  return { fields };
};

export default useFormData;
