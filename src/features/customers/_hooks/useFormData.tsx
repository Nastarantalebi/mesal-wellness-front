import type { TFormData } from "@/types";
import type { TCreateData, TReqCustomers } from "../_types/types";
import useGetData from "@/services/useGetData";
import { queryKey, url } from "../_fixtures/data";
import { DateObject } from "react-multi-date-picker";

const useFormData = () => {
  const { data: dataCreate, isLoading } = useGetData<TCreateData>({
    url: `${url}create`,
    queryKey: [queryKey, "dataCreate"],
  });
  const fields: (TFormData<TReqCustomers> | undefined)[] = [
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
      name: "mobile",
      label: "موبایل",
      required: true,
      placeholder: "موبایل",
      inputType: "number",
      maxLength: 11,
    },
    {
      name: "gender",
      label: "جنسیت",
      placeholder: "جنسیت",
      type: "select",
      required: true,
      isLoading: isLoading,
      option: dataCreate?.data?.genders,
    },
    {
      name: "national_code",
      label: "کدملی",
      placeholder: "کدملی",
      inputType: "number",
      maxLength: 10,
    },
    {
      name: "birth_date",
      label: "تاریخ تولد",
      placeholder: "تاریخ تولد",
      type: "date",
      maxDate: new DateObject(),
    },
    {
      name: "joined_at",
      label: "تاریخ عضویت",
      placeholder: "تاریخ عضویت",
      type: "date",
      maxDate: new DateObject(),
    },

    {
      name: "membership_type",
      label: "نوع عضویت",
      placeholder: "نوع عضویت",
      type: "select",
      isLoading: isLoading,
      option: dataCreate?.data?.membership_types,
    },

    {
      name: "status",
      label: "وضعیت",
      placeholder: "وضعیت",
      type: "select",
      isLoading: isLoading,
      option: dataCreate?.data?.statuses,
    },
    {
      name: "notes",
      label: "یادداشت",
      placeholder: "یادداشت",
    },
  ];
  return { fields };
};

export default useFormData;
