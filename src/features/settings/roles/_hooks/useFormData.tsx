import type { TFormData } from "@/types";
import type { TCreateData, TRequest, TWidget } from "../_types/types";
import useGetData from "@/services/useGetData";
import { queryKey, url } from "../_fixtures/data";
type TProps = {
  isEdit?: boolean;
};

const useFormData = ({ isEdit }: TProps = {}) => {
  const { data, isLoading } = useGetData<TCreateData>({
    queryKey: [queryKey, "createdata"],
    url: `${url}create`,
  });
  const fields: (TFormData<TRequest> | undefined)[] = [
    {
      name: "name",
      label: "نقش",
      required: true,
      placeholder: "نقش",
      type: "select",
      option: data?.data?.roles ?? [],
      isLoading,
      className: `${isEdit ? "hidden" : "col-span-full"}`,
    },
    {
      name: "display_name",
      label: "عنوان نقش",
      placeholder: "عنوان نقش",
      required: true,
      className: `${isEdit ? "col-span-full" : "hidden"}`,
    },
  ];
  const fieldsWidget: (TFormData<TWidget> | undefined)[] = [
    {
      name: "widgets",
      label: "ویجت",
      required: true,
      placeholder: "ویجت",
      type: "select",
      option: data?.data?.widgets ?? [],
      mode: "multiple",
      className: "col-span-full",
    },
  ];
  return { fields, fieldsWidget };
};

export default useFormData;
