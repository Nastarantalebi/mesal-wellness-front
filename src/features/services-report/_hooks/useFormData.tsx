import type { TFormData } from "@/types";
import useGetData from "@/services/useGetData";
import { DateObject } from "react-multi-date-picker";
import { url } from "../_fixtures/data";
import type { TCreateDate } from "../_types/types";

const useFormData = () => {
  const { data, isLoading } = useGetData<TCreateDate>({
    url: `${url}create-data`,
    queryKey: [url, "dataCreate"],
  });
  const fields: (TFormData<any> | undefined)[] = [
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
      name: "gender",
      label: "جنسیت",
      placeholder: "جنسیت",
      required: true,
      type: "select",
      isLoading: isLoading,
      option: data?.data.genders ?? [],
    },
    {
      name: "hire_date",
      label: "تاریخ استخدام",
      type: "date",
      placeholder: "تاریخ استخدام",
      maxDate: new DateObject(),
    },
    {
      name: "status",
      label: "وضعیت",
      placeholder: "وضعیت",
      type: "select",
      isLoading: isLoading,
      option: data?.data.statuses ?? [],
    },
  ];
  return { fields };
};

export default useFormData;
