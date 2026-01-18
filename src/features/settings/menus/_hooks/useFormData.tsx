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
      label: "عنوان منو",
      placeholder: "عنوان منو",
      required: true,
      className: "md:col-span-2",
    },
    {
      name: "permission_id",
      label: "دسترسی",
      placeholder: "دسترسی",
      type: "select",
      option: data?.data.permissions,
      isLoading,
      className: "md:col-span-2",
    },
    {
      name: "parent_id",
      label: "والد",
      placeholder: "والد",
      type: "select",
      option: data?.data.categories,
      isLoading,
      className: "md:col-span-2",
    },
    {
      name: "icon",
      label: "آیکون",
      placeholder: "آیکون",
      type: "select",
      className: "md:col-span-2",
      isLoading,
      option: data?.data.icons,
    },
    {
      name: "url",
      label: "ادرس",
      placeholder: "ادرس",
      dir: "ltr",
      className: "md:col-span-2",
    },
    {
      name: "priority",
      label: "اولویت",
      placeholder: "اولویت",
      inputType: "number",
    },
    {
      name: "description",
      label: "توضیحات",
      placeholder: "توضیحات",
    },
  ];
  return { fields };
};
export default useFormData;
