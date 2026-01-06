import { useForm } from "react-hook-form";
import useCreateData from "@/services/useCreateData";
import { initialValues, queryKey, schema, url } from "../_fixtures/data";
import { zodResolver } from "@hookform/resolvers/zod";
import useUpdateData from "@/services/useUpdateData";
import useGetById from "@/services/useGetById";
import { useEffect } from "react";
import useFormData from "../_hooks/useFormData";
import FormComponent from "@/components/Form/Form";
import type { TData, TRequest } from "../_types/types";
type TProps = {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  id?: number;
};
function StaffForm({ setOpenModal, id }: TProps) {
  const { fields } = useFormData();
  const { mutate: create, isPending: isPendingCreate } = useCreateData({
    url,
    queryKey,
  });
  const { mutate: update, isPending: isPendingUpdate } = useUpdateData({
    url,
    queryKey,
    id,
  });
  const { data } = useGetById<TData>({
    url,
    queryKey: [queryKey, String(id)],
    id,
  });

  const form = useForm<TRequest>({
    resolver: zodResolver(schema),
    defaultValues: initialValues,
  });
  useEffect(() => {
    if (data) {
      const praparedData: TRequest = {
        ...data.data.user,
        staff_type: data.data.staff_type,
      };
      form.reset(praparedData);
    }
  }, [form, data]);
  return (
    <FormComponent
      form={form}
      formFields={fields}
      isSubmitting={isPendingUpdate || isPendingCreate}
      onSubmit={(values) => {
        const action = !!id ? update : create;
        action(values, {
          onSuccess: () => {
            setOpenModal(false);
          },
        });
      }}
    />
  );
}

export default StaffForm;
