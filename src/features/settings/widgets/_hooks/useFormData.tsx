import type { TFormData } from "@/types";
import type { TCreateData, TRequest } from "../_types/types";
import useGetData from "@/services/useGetData";
import { queryKey, url } from "../_fixtures/data";

const useFormData = () => {
  const { data, isLoading } = useGetData<TCreateData>({
    queryKey: [queryKey, "createdata"],
    url: `${url}create`,
  });
  const fields: (TFormData<TRequest> | undefined)[] = [
    {
      name: "title",
      label: "عنوان ویجت",
      required: true,
      placeholder: "عنوان ویجت",
      className: "md:col-span-2",
    },
    {
      name: "permission_id",
      label: "دسترسی",
      placeholder: "دسترسی",
      required: true,
      type: "select",
      option: data?.data.permissions ?? [],
      isLoading,
      className: "md:col-span-2",
    },
    {
      name: "type",
      label: "نوع",
      placeholder: "نوع",
      required: true,
      type: "select",
      option: data?.data.types ?? [],
      isLoading,
    },
    {
      name: "handler_class",
      label: "کلاس هندل کننده",
      placeholder: "کلاس هندل کننده",
      required: true,
      type: "select",
      option: data?.data.handlers ?? [],
      isLoading,
    },
  ];

  return { fields };
};

export default useFormData;
