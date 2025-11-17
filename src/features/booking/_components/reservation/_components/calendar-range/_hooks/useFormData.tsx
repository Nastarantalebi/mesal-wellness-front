import type { TCreateData } from "@/features/booking/_types/type";
import type { TFormData } from "@/types";
import type { TRequest } from "../_types/type";
type TProps = { isLoadingCreate: boolean; dataCreate?: TCreateData };
const useFormData = ({ isLoadingCreate, dataCreate }: TProps) => {
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
      label: "وضعیت نوبت",
      name: "status",
      placeholder: "وضعیت نوبت",
      type: "select",
      isLoading: isLoadingCreate,
      option: dataCreate?.data.statuses,
    },
  ];
  return { fields };
};

export default useFormData;
