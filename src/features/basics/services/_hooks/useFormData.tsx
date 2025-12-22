import type { TFormData } from "@/types";
import type { TCreateData, TReqServices } from "../_types/types";
import useGetData from "@/services/useGetData";
import { servicesQuerykey, servicesUrl } from "../_fixtures/data";

const useFormData = (isEdit: boolean) => {
  const { data: dataCreate, isLoading } = useGetData<TCreateData>({
    url: `${servicesUrl}create`,
    queryKey: `${servicesQuerykey},"dataCreate"`,
  });
  const fields: (TFormData<TReqServices> | undefined)[] = [
    {
      name: "title",
      label: "عنوان",
      required: true,
      placeholder: "عنوان",
    },

    {
      name: "category_id",
      label: "دسته‌بندی",
      required: true,
      placeholder: "دسته‌بندی",
      type: "select",
      isLoading: isLoading,
      option: dataCreate?.categories ?? [],
    },
    {
      name: "duration_minutes",
      label: "مدت زمان(دقیقه)",
      required: true,
      placeholder: "مدت زمان(دقیقه)",
      inputType: "number",
      max: 120,
    },
    {
      name: "base_price",
      label: "قیمت پایه(تومان)",
      required: true,
      placeholder: "قیمت پایه(تومان)",
      money: true,
    },
    {
      name: "gender_policy",
      label: "پذیرش بر اساس جنسیت",
      placeholder: "پذیرش بر اساس جنسیت",
      required: true,
      type: "select",
      isLoading: isLoading,
      option: dataCreate?.genderPolicies ?? [],
    },

    isEdit
      ? {
          name: "is_active",
          label: "وضعیت",
          placeholder: "وضعیت",
          type: "select",
          option: [
            { label: "فعال", value: true },
            { label: "غیرفعال", value: false },
          ],
        }
      : undefined,
    {
      name: "description",
      label: "توضیحات",
      placeholder: "توضیحات",
    },
  ];
  return { fields };
};

export default useFormData;
