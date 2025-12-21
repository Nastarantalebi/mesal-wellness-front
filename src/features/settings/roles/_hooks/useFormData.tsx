import type { TFormData } from "@/types";
import type { TRequest } from "../_types/types";

const useFormData = () => {
  const fields: (TFormData<TRequest> | undefined)[] = [
    {
      name: "name",
      label: "نام",
      required: true,
      placeholder: "نام",
    },
    {
      name: "widgets",
      label: "ویجت‌ها",
      required: true,
      placeholder: "ویجت‌ها",
    },
  ];
  return { fields };
};

export default useFormData;
