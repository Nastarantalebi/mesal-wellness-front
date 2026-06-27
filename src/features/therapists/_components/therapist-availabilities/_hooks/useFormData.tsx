import type { TFormData } from "@/types";
import type {
  TCreateData,
  TReqTherapistsAvailabilities,
} from "../_types/types";
import useGetData from "@/services/useGetData";
import { queryKey, url } from "../_fixtures/data";

const useFormData = (isEdit: boolean) => {
  const { data, isLoading } = useGetData<TCreateData>({
    url: `${url}create`,
    queryKey: `${queryKey},"dataCreate"`,
  });
  const fields: (TFormData<TReqTherapistsAvailabilities> | undefined)[] = [
    {
      name: "staff_id",
      label: "ماساژیست",
      required: true,
      placeholder: "ماساژیست",
      type: "select",
      disabled: true,
      isLoading: isLoading,
      option: data?.data.therapists ?? [],
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
      name: "start_time",
      label: "شروع شیفت",
      required: true,
      type: "time",
      placeholder: "شروع شیفت",
    },
    {
      name: "end_time",
      label: "پایان شیفت",
      required: true,
      type: "time",
      placeholder: "پایان شیفت",
    },
    isEdit
      ? {
          name: "is_active",
          label: "وضعیت",
          required: true,
          placeholder: "وضعیت",
          type: "select",
          isLoading: isLoading,
          option: data?.data.statuses ?? [],
        }
      : undefined,
  ];
  return { fields };
};

export default useFormData;
