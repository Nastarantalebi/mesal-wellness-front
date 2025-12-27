import type { TFormData } from "@/types";
import type {
  TCreateData,
  TPermissions,
  TRequest,
  TWidget,
} from "../_types/types";
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
  const fieldsWidget: (TFormData<TWidget> | undefined)[] = [
    {
      name: "widgets",
      label: "ویجت",
      required: true,
      placeholder: "ویجت",
      type: "select",
      option: [],
      mode: "multiple",
      className: "col-span-full",
    },
  ];
  const fieldsPermissions: (TFormData<TPermissions> | undefined)[] = [
    {
      name: "permissions",
      label: "دسترسی‌ها",
      required: true,
      placeholder: "دسترسی‌ها",
      type: "select",
      option: [],
      mode: "multiple",
      className: "col-span-full",
    },
  ];
  return { fields, fieldsPermissions, fieldsWidget };
};

export default useFormData;
