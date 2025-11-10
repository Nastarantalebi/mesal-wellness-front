import type { TFormData } from "@/types";
import type { TCreateData, TReqTherapistsAvailabilities } from "../_types/types";
import useGetData from "@/services/useGetData";
import { queryKey, url } from "../_fixtures/data";

const useFormData = () => {
  const { data, isLoading } = useGetData<TCreateData>({
    url: `${url}create`,
    queryKey: `${queryKey},"dataCreate"`,
  });
  const fields: (TFormData<TReqTherapistsAvailabilities> | undefined)[] = [
    {
      name: "start_time",
      label: "زمان شروع",
      required: true,
      placeholder: "زمان شروع",
    },
    {
      name: "end_time",
      label: "زمان پایان",
      required: true,
      placeholder: "زمان پایان",
    },
    {
      name: "weekday",
      label: "روز هفته",
      required: true,
      placeholder: "روز هفته",
        type: "select",
      isLoading: isLoading,
      option: data?.data.weekdays ?? [],
    },
    {
      name: "therapist_id",
      label: "تراپیست",
      required: true,
      placeholder: "تراپیست",
      type: "select",
      isLoading: isLoading,
      option: data?.data.therapists ?? [],
    },
    {
      name: "is_active",
      label: "وضعیت",
      required: true,
      placeholder: "وضعیت",
      type: "select",
      isLoading: isLoading,
      option: data?.data.statuses ?? [],
    },
    
    {
      name: "breaks",
      label: "زمانبندی",
      required: true,
      placeholder: "زمانبندی",
    },
  ];
  return { fields };
};

export default useFormData;
