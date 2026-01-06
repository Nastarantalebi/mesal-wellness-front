import type { TFormData } from "@/types";
import type { TRequest } from "../_types/type";

const useFormData = () => {
  const fields: (TFormData<TRequest> | undefined)[] = [
    {
      name: "title",
      label: "عنوان",
      placeholder: "عنوان",
      required: true,
      className: "md:col-span-3",
    },
    {
      name: "is_global",
      label: "فعال برای همه",
      type: "switch",
      offValue: 0,
      onValue: 1,
    },
  ];
  return { fields };
};

export default useFormData;
