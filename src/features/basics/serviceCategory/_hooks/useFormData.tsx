import type { TFormData } from "@/types";
import type { TReqServiceCategory } from "../_types/types";

const useFormData = (isEdit: boolean) => {
  const fields: (TFormData<TReqServiceCategory> | undefined)[] = [
    {
      name: "title",
      label: "عنوان خدمت",
      required: true,
      placeholder: "عنوان خدمت",
    },
    {
      name: "description",
      label: "توضیحات",
      placeholder: "توضیحات",
      className: "col-span-2",
    },
    isEdit
      ? {
          name: "is_active",
          label: "وضعیت",
          placeholder: "وضعیت",
          required: true,
          type: "select",
          option: [
            { label: "فعال", value: "true" },
            { label: "غیرفعال", value: "false" },
          ],
        }
      : undefined,
  ];
  return { fields };
};

export default useFormData;
