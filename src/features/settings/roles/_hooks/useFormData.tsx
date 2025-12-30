import type { TFormData } from "@/types";
import type { TCreateData, TRequest } from "../_types/types";
type TProps = {
  dataRoles?: TCreateData;
  isLoadingRoles?: boolean;
  isEdit?: boolean;
};

const useFormData = ({ dataRoles, isLoadingRoles, isEdit }: TProps = {}) => {
  const fields: (TFormData<TRequest> | undefined)[] = [
    {
      name: "name",
      label: "نقش",
      required: true,
      placeholder: "نقش",
      type: "select",
      option: dataRoles?.roles ?? [],
      isLoading: isLoadingRoles,
      className: `${isEdit ? "hidden" : "col-span-full"}`,
    },
    {
      name: "display_name",
      label: "عنوان نقش",
      placeholder: "عنوان نقش",
      required: true,
      className: `${isEdit ? "col-span-full" : "hidden"}`,
    },
  ];

  return { fields };
};

export default useFormData;
