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
      name: "therapist_id",
      label: "درمانگر",
      required: true,
      placeholder: "درمانگر",
      type: "select",
      disabled: true,
      isLoading: isLoading,
      option: data?.therapists ?? [],
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
      name: "estimated_duration",
      label: "مدت زمان تقریبی",
      required: true,
      placeholder: "مدت زمان تقریبی",
      inputType: "number",
    },
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
      placeholder: "وضعیت",
      type: "select",
      option: [
        { label: "فعال", value: "true" },
        { label: "غیرفعال", value: "false" },
      ],
    },
  ];
  return { fields };
};

export default useFormData;
