import type { TFormData } from "@/types";
import type {
  TCreateDataPermissions,
  TRequest,
  TRequestPermissionsCreate,
} from "../_types/type";
type TProps = {
  data?: TCreateDataPermissions;
  isLoading?: boolean;
};
const useFormData = ({ data, isLoading }: TProps) => {
  console.log(data);
  const fields: (TFormData<TRequest> | undefined)[] = [
    {
      name: "title",
      label: "عنوان",
      placeholder: "عنوان",
      required: true,
      className: "md:col-span-3",
    },
    {
      name: "is_global",
      label: "فعال برای همه",
      type: "switch",
      offValue: 0,
      onValue: 1,
    },
  ];
  const permissionsFields: (
    | TFormData<TRequestPermissionsCreate>
    | undefined
  )[] = [
    {
      name: "name",
      label: "نام مجوز",
      placeholder: "نام مجوز",
      required: true,
    },
    {
      name: "title",
      label: "عنوان مجوز",
      placeholder: "عنوان مجوز",
    },
    {
      name: "module_name",
      label: "نام ماژول",
      placeholder: "نام ماژول",
    },
    {
      name: "type",
      label: "نوع مجوز",
      placeholder: "نوع مجوز",
    },
    {
      name: "is_global",
      label: "دسترسی کلی",
      placeholder: "دسترسی کلی",
      type: "select",
      option: [
        {
          label: "بله",
          value: true,
        },
        {
          label: "خیر",
          value: false,
        },
      ],
    },
    {
      name: "group",
      label: "گروه مجوز",
      placeholder: "گروه مجوز",
      required: true,
      type: "select",
      option: data?.data.groups ?? [],
      isLoading,
    },
    {
      name: "action_class",
      label: "کلاس عملیات",
      placeholder: "کلاس عملیات",
    },
  ];
  return { fields, permissionsFields };
};

export default useFormData;
