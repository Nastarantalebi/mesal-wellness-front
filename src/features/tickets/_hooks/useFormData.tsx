import type { TFormData } from "@/components/form/Form";
import type { TReqList } from "../_types/type";
import useGetData from "@/services/useGetData";
import type { TOption } from "@/types";

function useFormData() {
  const { data, isLoading } = useGetData<TOption[]>({
    queryKey: "/ticket-priorty-list/",
    url: "/ticket-priorty-list/",
    support: true,
  });
  const fields: (TFormData<TReqList> | undefined)[] = [
    {
      label: "عنوان",
      name: "title",
      placeholder: "عنوان",
      required: true,
      className: "col-span-4",
    },
    {
      label: "موضوع",
      name: "priorty",
      placeholder: "موضوع",
      className: "col-span-4",
      type: "select",
      isLoading,
      option: data ?? [],
    },
    {
      label: "توضیحات",
      name: "description",
      placeholder: "توضیحات",
      required: true,
      type: "textArea",
      className: "col-span-4",
    },
  ];

  return { fields };
}

export default useFormData;
