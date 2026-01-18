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
      placeholder: "کد",
      dir: "ltr",
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
      maxLength: 2,
    },

    {
      name: "facility_id",
      label: "محل ارائه خدمات",
      required: true,
      placeholder: "محل ارائه خدمات",
      type: "select",
      isLoading: isLoading,
      option: dataCreate?.data.facilities,
    },
    {
      name: "type_id",
      label: "نوع مکان",
      required: true,
      placeholder: "نوع مکان",
      type: "select",
      isLoading: isLoading,
      option: dataCreate?.data.types,
    },
    {
      name: "status",
      label: "وضعیت",
      placeholder: "وضعیت",
      type: "select",
      isLoading: isLoading,
      option: dataCreate?.data.statuses,
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
