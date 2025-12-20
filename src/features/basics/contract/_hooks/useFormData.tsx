import type { TFormData } from "@/types";
import type { TCreateData, TReqContract } from "../_types/types";
import useGetData from "@/services/useGetData";
import { DateObject } from "react-multi-date-picker";

const useFormData = () => {
  const { data, isLoading } = useGetData<TCreateData>({
    queryKey: "createDataContractQuerykey",
    url: "basics/contracts/create",
  });
  const company = data?.companies.map((item) => {
    return { label: item.name, value: item.id };
  });
  const fields: (TFormData<TReqContract> | undefined)[] = [
    {
      name: "company_id",
      label: "نام شرکت",
      required: true,
      placeholder: "نام شرکت",
      type: "select",
      option: company,
      isLoading,
    },
    {
      name: "discount_percent",
      label: "درصد تخفیف",
      placeholder: "درصد تخفیف",
      inputType: "number",
      required: true,
      max: 100,
    },
    {
      name: "start_at",
      label: "تاریخ شروع قرارداد",
      required: true,
      placeholder: "تاریخ شروع قرارداد",
      type: "date",
    },
    {
      name: "finished_at",
      label: "تاریخ پایان قرارداد",
      required: true,
      placeholder: "تاریخ پایان قرارداد",
      type: "date",
      minDate: new DateObject(),
    },
  ];
  return { fields };
};

export default useFormData;
