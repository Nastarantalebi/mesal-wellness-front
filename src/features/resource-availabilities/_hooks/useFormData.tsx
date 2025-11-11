import type { TFormData } from "@/types";
import type { TCreateData, TReqResourceAvailabilities } from "../_types/types";
import useGetData from "@/services/useGetData";
import { queryKey, url } from "../_fixtures/data";

const useFormData = () => {
  const { data, isLoading } = useGetData<TCreateData>({
    url: `${url}create`,
    queryKey: `${queryKey},"dataCreate"`,
  });
  const fields: (TFormData<TReqResourceAvailabilities> | undefined)[] = [
    {
      name: "start_time",
      label: "شروع بازه",
      required: true,
      type: "time",
      placeholder: "شروع بازه",
    },
    {
      name: "end_time",
      label: "پایان بازه",
      required: true,
      type: "time",
      placeholder: "پایان بازه",
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
      name: "resource_id",
      label: "خدمات",
      required: true,
      placeholder: "خدمات",
      type: "select",
      isLoading: isLoading,
      option: data?.data.resources ?? [],
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
      label: "تایم ‌های استراحت",
      required: true,
      placeholder: "تایم ‌های استراحت",
    },
  ];
  return { fields };
};

export default useFormData;
