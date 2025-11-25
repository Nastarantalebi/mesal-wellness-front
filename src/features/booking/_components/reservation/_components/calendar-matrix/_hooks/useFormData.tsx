import type { TFormData } from "@/types";
import type { TRequest } from "../_types/type";
const useFormData = () => {
  const fields: (TFormData<TRequest> | undefined)[] = [
    {
      label: "تاریخ شروع",
      name: "from",
      placeholder: "تاریخ شروع",
      type: "date",
      required: true,
    },
    {
      label: "تاریخ پایان",
      name: "to",
      placeholder: "تاریخ پایان",
      type: "date",
      required: true,
    },
    {
      label: " نوع",
      name: "type",
      placeholder: "نوع",
      type: "select",
      option: [
        {label:"درمانگر",value:"therapist"},
        {label:"مکان",value:"resource"},
      ],
    },
  ];
  return { fields };
};

export default useFormData;
