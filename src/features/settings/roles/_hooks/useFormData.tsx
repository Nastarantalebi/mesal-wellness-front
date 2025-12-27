import type { TFormData } from "@/types";
import type {
  TCreateData,
  TPermissions,
  TRequest,
  TWidget,
} from "../_types/types";
import useGetData from "@/services/useGetData";
import { queryKey, url } from "../_fixtures/data";

const useFormData = () => {
  const { data, isLoading } = useGetData<TCreateData>({
    queryKey: queryKey + "createdata",
    url: url + "create",
  });
  const fields: (TFormData<TRequest> | undefined)[] = [
    {
      name: "name",
      label: "نقش",
      required: true,
      placeholder: "نقش",
      type: "select",
      option: data?.roles ?? [],
      isLoading,
      className: "col-span-full",
    },
  ];
  const fieldsWidget: (TFormData<TWidget> | undefined)[] = [
    {
      name: "widgets",
      label: "ویجت",
      required: true,
      placeholder: "ویجت",
      type: "select",
      option: data?.roles ?? [],
      isLoading,
      mode: "multiple",
      className: "col-span-full",
    },
  ];
  const fieldsPermissions: (TFormData<TPermissions> | undefined)[] = [
    {
      name: "permissions",
      label: "دسترسی‌ها",
      required: true,
      placeholder: "دسترسی‌ها",
      type: "select",
      option: data?.roles ?? [],
      isLoading,
      mode: "multiple",
      className: "col-span-full",
    },
  ];
  return { fields, fieldsPermissions, fieldsWidget };
};

export default useFormData;
