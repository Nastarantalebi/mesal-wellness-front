import type { TFormData } from "@/types";
import type { TCreateData, TRequest } from "../_types/types";
import useGetData from "@/services/useGetData";
import { queryKey, url } from "../_fixtures/data";

const useFormData = () => {
  const { data } = useGetData<TCreateData>({
    queryKey: queryKey + "createdata",
    url: url + "create",
  });
  const fields: (TFormData<TRequest> | undefined)[] = [
    {
      name: "title",
      label: "عنوان",
      required: true,
    },
    {
      name: "slug",
      label: "slug",
      required: true,
    },
    {
      name: "url",
      label: "ادرس",
      required: true,
    },
    {
      name: "priority",
      label: "اولویت",
      inputType: "number",
    },
    {
      name: "parent_id",
      label: "والد",
    },
    {
      name: "description",
      label: "توضیحات",
    },
  ];
  return { fields };
};
export default useFormData;
