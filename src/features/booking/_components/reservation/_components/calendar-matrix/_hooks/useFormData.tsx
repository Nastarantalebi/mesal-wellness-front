import type { TFormData } from "@/types";
import type { TRequest } from "../_types/type";
import { DateObject } from "react-multi-date-picker";
const useFormData = () => {
  const fields: (TFormData<TRequest> | undefined)[] = [
    {
      label: "تاریخ شروع",
      name: "from",
      placeholder: "تاریخ شروع",
      type: "date",
      required: true,
      maxDate: new DateObject(),
    },
    {
      label: "تاریخ پایان",
      name: "to",
      placeholder: "تاریخ پایان",
      type: "date",
      required: true,
      maxDate: new DateObject(),
    },
    {
      label: " نوع",
      name: "type",
      placeholder: "نوع",
      type: "select",
      option: [],
    },
  ];
  return { fields };
};

export default useFormData;
