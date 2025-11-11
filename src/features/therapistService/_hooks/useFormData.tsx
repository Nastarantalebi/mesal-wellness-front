import type { TFormData } from "@/types";
import useGetData from "@/services/useGetData";
import { queryKey, url } from "../_fixtures/data";
import type { TCreateData, TReqTherapistService } from "../_types/types";

const useFormData = () => {
  const { data, isLoading } = useGetData<TCreateData>({
    url: `${url}create`,
    queryKey: `${queryKey},"dataCreate"`,
  });
  const fields: (TFormData<TReqTherapistService> | undefined)[] = [
    {
      name: "custom_price",
      label: "مبلغ خدمات",
      required: true,
      placeholder: "مبلغ خدمات",
      inputType: "number",
    },
    {
      name: "commission_rate",
      label: "درصد کمیسیون",
      required: true,
      placeholder: "درصد کمیسیون",
      inputType: "number",
    },
    {
      name: "is_active",
      label: "وضعیت",
      required: true,
      placeholder: "وضعیت",
      type: "select",
      option: [
        { label: "فعال", value: "true" },
        { label: "غیرفعال", value: "false" },
      ],
    },
    {
      name: "estimated_duration",
      label: "مدت زمان تقریبی",
      required: true,
      placeholder: "مدت زمان تقریبی",
      inputType: "number",
    },
    {
      name: "service_id",
      label: "خدمات",
      required: true,
      placeholder: "خدمات",
      type: "select",
      isLoading: isLoading,
      option: data?.services ?? [],
    },
    {
      name: "therapist_id",
      label: "درمانگر",
      required: true,
      placeholder: "درمانگر",
      type: "select",
      isLoading: isLoading,
      option: data?.therapists ?? [],
    },
  ];
  return { fields };
};

export default useFormData;
