import FormComponent from "@/components/Form/Form";
import useFormData from "../_hooks/useFormData";
import useUpdateData from "@/services/useUpdateData";
import { queryKey, url } from "../_fixtures/data";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import type { TPermissionItem, TRequest } from "../_types/type";

const PermissionsForm = ({ item }: { item: TPermissionItem }) => {
  const form = useForm<TRequest>({
    resolver: zodResolver(
      z.object({
        title: z.string(),
        is_global: z.number(),
      })
    ),
    defaultValues: {
      is_global: 1,
      title: item.label,
    },
  });

  const { fields } = useFormData();
  const { mutate, isPending } = useUpdateData({
    url: url,
    queryKey: queryKey,
    id: item.id,
  });

  return (
    <div className="flex justify-between items-center flex-col md:flex-row my-4 mx-0 border border-x-0 border-black">
      <p className="w-fit">
        <span>{item.label}</span>
        <span>:</span>
        <span>{item.name}</span>
      </p>
      <FormComponent
        className="flex"
        formFields={fields}
        form={form}
        isSubmitting={isPending}
        onSubmit={(value) => mutate(value)}
      />
    </div>
  );
};

export default PermissionsForm;
