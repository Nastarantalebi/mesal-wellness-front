import type { TFormData } from "@/types";
import type { TCreateData, TReqResources } from "../_types/types";
import useGetData from "@/services/useGetData";
import { queryKey, url } from "../_fixtures/data";

const useFormData = () => {
  const { data: dataCreate, isLoading } = useGetData<TCreateData>({
    url: `${url}create`,
    queryKey: `${queryKey},"dataCreate"`,
  });
  const fields: (TFormData<TReqResources> | undefined)[] = [
    {
      name: "code",
      label: "کد",
      required: true,
      placeholder: "کد",
      dir:"ltr"
    },
    {
      name: "name",
      label: "نام",
      required: true,
      placeholder: "نام",
    },
    {
      name: "capacity",
      label: "ظرفیت(نفر)",
      required: true,
      placeholder: "ظرفیت(نفر)",
      inputType: "number",
      money: true,
    },

    {
      name: "facility_id",
      label: "محل ارائه خدمات",
      required: true,
      placeholder: "محل ارائه خدمات",
      type: "select",
      isLoading: isLoading,
      option: dataCreate?.facilities,
    },
    {
      name: "type_id",
      label: "نوع خدمات",
      required: true,
      placeholder: "نوع خدمات",
      type: "select",
      isLoading: isLoading,
      option: dataCreate?.types,
    },
    {
      name: "status",
      label: "وضعیت",
      placeholder: "وضعیت",
      type: "select",
      isLoading: isLoading,
      option: dataCreate?.statuses,
    },
    {
      name: "description",
      label: "توضیحات",
      placeholder: "توضیحات",
    },
  ];
  return { fields };
};

export default useFormData;
