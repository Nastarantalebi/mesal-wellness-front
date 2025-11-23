import type { TFormData } from "@/types";
import type { TCreateData, TReqCustomers } from "../_types/types";
import useGetData from "@/services/useGetData";
import { queryKey, url } from "../_fixtures/data";

const useFormData = () => {
  const { data: dataCreate, isLoading } = useGetData<TCreateData>({
    url: `${url}create`,
    queryKey: `${queryKey},"dataCreate"`,
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
      name: "phone",
      label: "تلفن",
      required: true,
      placeholder: "تلفن",
      inputType: "number",
    },
    {
      name: "national_code",
      label: "کدملی",
      required: true,
      placeholder: "کدملی",
      inputType: "number",
    },
    {
      name: "birth_date",
      label: "تاریخ تولد",
      placeholder: "تاریخ تولد",
      type: "date",
    },
    {
      name: "joined_at",
      label: "تاریخ عضویت",
      placeholder: "تاریخ عضویت",
      type: "date",
    },

    {
      name: "membership_type",
      label: "وضعیت کاربر",
      placeholder: "وضعیت کاربر",
      type: "select",
      isLoading: isLoading,
      option: dataCreate?.membership_types,
    },
    {
      name: "gender",
      label: "جنسیت",
      placeholder: "جنسیت",
      type: "select",
      isLoading: isLoading,
      option: dataCreate?.genders,
    },
    {
      name: "status",
      label: "وضعیت",
      placeholder: "وضعیت",
      type: "select",
      isLoading: isLoading,
      option: dataCreate?.statuses,
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
