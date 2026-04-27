import { useForm } from "react-hook-form";
import type { TDataById } from "../_types/types";
import { schema, queryKey, url, initialValue } from "../_fixtures/data";
import useCreateData from "@/services/useCreateData";
import { zodResolver } from "@hookform/resolvers/zod";
import useUpdateData from "@/services/useUpdateData";
import useGetById from "@/services/useGetById";
import { useEffect } from "react";
import FormComponent from "@/components/Form/Form";
import useFormData from "../_hooks/useFormData";
type TProps = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: number;
};
function ServiceCategoryForm({ id, setOpen }: TProps) {
  const isEdit = !!id;
  const { fields } = useFormData(isEdit);
  const { mutate: create, isPending: isPendingCreate } = useCreateData({
    url: url,
    queryKey: queryKey,
  });
  const { mutate: update, isPending: isPendingUpdate } = useUpdateData({
    url: url,
    queryKey: queryKey,
    id: id,
  });
  const { data: dataById } = useGetById<TDataById>({
    queryKey: [queryKey, String(id)],
    url: url,
    id: id,
  });
  const form = useForm<any>({
    resolver: zodResolver(schema),
    defaultValues: initialValue,
    mode: "onChange",
  });
  useEffect(() => {
    if (dataById) {
      form.reset(dataById.data);
    }
  }, [form, dataById]);
  return (
    <FormComponent
      size="small"
      onSubmit={(values) => {
        const preparedData = {
          ...values,
          is_active: values.is_active !== false,
        };
        const action = !!id ? update : create;
        action(preparedData, {
          onSuccess: () => setOpen(false),
        });
      }}
      form={form}
      formFields={fields}
      isSubmitting={isPendingCreate || isPendingUpdate}
    />
  );
}

export default ServiceCategoryForm;
