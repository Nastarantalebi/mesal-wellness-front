import type { TFormData } from "@/types";
import type { TReqResourceType } from "../_types/types";

const useFormData = (isEdit: boolean) => {
  const fields: (TFormData<TReqResourceType> | undefined)[] = [
    {
      name: "code",
      label: "کد",
      required: true,
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
          required: true,
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
      required: true,
      placeholder: "توضیحات",
    },
  ];
  return { fields };
};

export default useFormData;
