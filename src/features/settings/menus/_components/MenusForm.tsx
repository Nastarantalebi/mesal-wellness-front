import FormComponent from "@/components/Form/Form";
import useFormData from "../_hooks/useFormData";
import { useForm } from "react-hook-form";
import type { TDataById, TRequest } from "../_types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { initailValues, queryKey, schema, url } from "../_fixtures/data";
import useCreateData from "@/services/useCreateData";
import useGetById from "@/services/useGetById";
import useUpdateData from "@/services/useUpdateData";
import { useEffect } from "react";

type TProps = {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  id?: number;
};
const MenusForm = ({ setOpenModal, id }: TProps) => {
  const isEdit = !!id;
  const { mutate: create, isPending: isPendingCreate } = useCreateData({
    url,
    queryKey,
  });

  const { mutate: update, isPending: isPendingUpdate } = useUpdateData({
    url,
    queryKey,
    id,
  });
  const { data: dataById } = useGetById<TDataById>({
    url,
    queryKey: [queryKey, String(id)],
    id,
  });
  const { fields } = useFormData();
  const form = useForm<any>({
    resolver: zodResolver(schema),
    defaultValues: initailValues,
  });
  useEffect(() => {
    if (dataById) {
      form.reset(dataById.data);
    }
  }, [form, dataById]);
  return (
    <FormComponent<TRequest>
      form={form}
      formFields={fields}
      isSubmitting={isPendingCreate || isPendingUpdate}
      onSubmit={(values) => {
        const action = isEdit ? update : create;
        action(values, {
          onSuccess: () => setOpenModal(false),
        });
      }}
    />
  );
};

export default MenusForm;
