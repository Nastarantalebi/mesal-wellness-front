import FormComponent from "@/components/Form/Form";
import useFormData from "../_hooks/useFormData";
import useUpdateData from "@/services/useUpdateData";
import { queryKey, schema, url } from "../_fixtures/data";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { TPermissionItem, TRequest } from "../_types/type";

const PermissionsForm = ({ item }: { item: TPermissionItem }) => {
  const form = useForm<TRequest>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: item.label,
      is_global: item.is_global,
    },
  });

  const { fields } = useFormData({});
  const { mutate, isPending } = useUpdateData({
    url,
    queryKey,
    id: item.id,
  });

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_auto] items-center py-4 px-2 border-b border-gray-200">
      <div className="flex flex-col gap-1 text-sm">
        <div className="flex flex-wrap items-center gap-1">
          <span className="font-semibold text-gray-800">{item.label}</span>
          <span className="text-gray-400">:</span>
          <span className="text-gray-600">{item.name}</span>
        </div>
      </div>
      <div className="w-full md:w-auto">
        <FormComponent<TRequest>
          form={form}
          formFields={fields}
          isSubmitting={isPending}
          onSubmit={(values) => mutate(values)}
          className="flex flex-col gap-3 sm:flex-row sm:items-center"
        />
      </div>
    </div>
  );
};

export default PermissionsForm;
