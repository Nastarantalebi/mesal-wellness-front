import type { TFormData } from "@/types";
import type { TReqFacilities } from "../_types/types";

const useFormData = (isEdit: boolean) => {
  const fields: (TFormData<TReqFacilities> | undefined)[] = [
    {
      name: "code",
      label: "کد مکان",
      required: true,
      placeholder: "کد مکان",
    },
    {
      name: "name",
      label: "نام",
      required: true,
      placeholder: "نام",
    },
    {
      name: "phone",
      label: "تلفن",
      required: true,
      placeholder: "تلفن",
      inputType: "number",
    },
    {
      name: "manager_name",
      label: "نام مدیر",
      required: true,
      placeholder: "نام مدیر",
    },

    {
      name: "city",
      label: "شهر",
      required: true,
      placeholder: "شهر",
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
      name: "address",
      label: "آدرس",
      placeholder: "آدرس",
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
