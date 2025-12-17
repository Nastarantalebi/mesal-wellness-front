import type { TFormData } from "@/types";
import type { TReqResourceType } from "../_types/types";

const useFormData = (isEdit: boolean) => {
  const fields: (TFormData<TReqResourceType> | undefined)[] = [
    {
      name: "code",
      label: "کد",
      placeholder: "کد",
    },
    {
      name: "name",
      label: "نام",
      required: true,
      placeholder: "نام",
    },

    isEdit
      ? {
          name: "is_active",
          label: "وضعیت",
          placeholder: "وضعیت",
          type: "select",
          option: [
            { label: "فعال", value: "true" },
            { label: "غیرفعال", value: "false" },
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
