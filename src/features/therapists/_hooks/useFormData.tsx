import type { TFormData } from "@/types";
import type { TCreateData, TReqTherapists } from "../_types/types";
import useGetData from "@/services/useGetData";
import { queryKey, url } from "../_fixtures/data";
import { DateObject } from "react-multi-date-picker";

const useFormData = () => {
  const { data, isLoading } = useGetData<TCreateData>({
    url: `${url}create`,
    queryKey: `${queryKey},"dataCreate"`,
  });
  const fields: (TFormData<TReqTherapists> | undefined)[] = [
    {
      name: "first_name",
      label: "نام",
      placeholder: "نام",
      required: true,
    },
    {
      name: "last_name",
      label: "نام خانوادگی",
      placeholder: "نام خانوادگی",
      required: true,
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
      name: "national_code",
      label: "کدملی",
      placeholder: "کدملی",
      inputType: "number",
      maxLength: 10,
    },
    {
      name: "gender",
      label: "جنسیت",
      placeholder: "جنسیت",
      type: "select",
      isLoading: isLoading,
      option: data?.genders ?? [],
    },
    {
      name: "hire_date",
      label: "تاریخ استخدام",
      type: "date",
      placeholder: "تاریخ استخدام",
      maxDate: new DateObject(),
    },
    {
      name: "bio",
      label: "درباره",
      placeholder: "درباره",
    },
    {
      name: "facility_id",
      label: "محل ارائه خدمات",
      placeholder: "محل ارائه خدمات",
      type: "select",
      isLoading: isLoading,
      option: data?.facilities ?? [],
    },

    {
      name: "license_number",
      label: "شماره مجوز",
      placeholder: "شماره مجوز",
      dir: "ltr",
    },

    {
      name: "status",
      label: "وضعیت",
      placeholder: "وضعیت",
      type: "select",
      isLoading: isLoading,
      option: data?.statuses ?? [],
    },
    {
      name: "specialties",
      label: "تخصص‌ها",
      type: "tags",
      placeholder: "برای ثبت تخصص روی + کلیک کنید",
      className: "col-span-full",
    },
  ];
  return { fields };
};

export default useFormData;
