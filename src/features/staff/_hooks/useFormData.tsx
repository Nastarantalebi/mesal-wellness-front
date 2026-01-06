import type { TFormData } from "@/types";
import type { TCreateData, TRequest } from "../_types/types";
import useGetData from "@/services/useGetData";
import { queryKey, url } from "../_fixtures/data";

const useFormData = () => {
  const { data, isLoading } = useGetData<TCreateData>({
    url: url + "create",
    queryKey: [queryKey, "dataCreate"],
  });
  const fields: (TFormData<TRequest> | undefined)[] = [
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
  ];
  return { fields };
};

export default useFormData;
