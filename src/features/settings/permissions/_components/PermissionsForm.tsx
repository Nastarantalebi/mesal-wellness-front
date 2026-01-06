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
        is_global: z.boolean(),
      })
    ),
    defaultValues: {
      title: item.label,
      is_global: Boolean(item.is_global),
    },
  });

  const { fields } = useFormData();
  const { mutate, isPending } = useUpdateData({
    url: url,
    queryKey: queryKey,
    id: item.id,
  });
  console.log(form.watch("is_global"));
  return (
    <div className="flex justify-between items-center flex-col md:flex-row my-4 mx-0 border border-x-0 border-black">
      <p className="w-fit">
        <span>{item.label}</span>
        <span>:</span>
        <span>{item.name}</span>
      </p>
      <FormComponent<TRequest>
        className="md:flex"
        formFields={fields}
        form={form}
        isSubmitting={isPending}
        onSubmit={(values) =>
          mutate({
            ...values,
            //@ts-ignore
            is_global: values.is_global ? 1 : 0,
          } satisfies TRequest)
        }
      />
    </div>
  );
};

export default PermissionsForm;
