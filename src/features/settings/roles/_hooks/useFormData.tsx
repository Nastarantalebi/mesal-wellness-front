import type { TFormData } from "@/types";
import type {
  TCreateData,
  TPermissions,
  TRequest,
  TWidget,
} from "../_types/types";
type TProps = { dataRoles?: TCreateData; isLoadingRoles?: boolean };

const useFormData = ({ dataRoles, isLoadingRoles }: TProps = {}) => {
  const fields: (TFormData<TRequest> | undefined)[] = [
    {
      name: "name",
      label: "نقش",
      required: true,
      placeholder: "نقش",
      type: "select",
      option: dataRoles?.roles ?? [],
      isLoading: isLoadingRoles,
      className: "col-span-full",
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
