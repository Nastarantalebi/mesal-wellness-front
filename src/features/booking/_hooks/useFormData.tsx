import type { TFormData } from "@/types";
import type { TCreateData, TRequest } from "../_types/type";
type TProps = { isLoadingCreate: boolean; dataCreate?: TCreateData };
const useFormData = ({ isLoadingCreate, dataCreate }: TProps) => {
  const fields: (TFormData<TRequest> | undefined)[] = [
    {
      label: "یافتن مشتری",
      name: "customer_id",
      placeholder: "یافتن مشتری",
      required: true,
    },
    {
      label: "مشتری",
      name: "customer_id",
      placeholder: "مشتری",
      required: true,
      type: "select",
      isLoading: isLoadingCreate,
      option: dataCreate?.data.customers,
    },
    {
      label: "یادداشت",
      name: "notes",
      placeholder: "یادداشت",
    },
  ];
  return { fields };
};

export default useFormData;
