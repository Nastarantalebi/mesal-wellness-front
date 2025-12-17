import type { TFormData } from "@/types";
import type { TReqCompany } from "../_types/types";

const useFormData = () => {
  const fields: (TFormData<TReqCompany> | undefined)[] = [
    {
      name: "name",
      label: "نام شرکت",
      required: true,
      placeholder: "نام شرکت",
      className: "col-span-full",
      autoFocus: true,
    },
  ];
  return { fields };
};

export default useFormData;
