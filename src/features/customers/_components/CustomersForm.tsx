import { useForm } from "react-hook-form";
import useCreateData from "@/services/useCreateData";
import { initialValues, queryKey, schema, url } from "../_fixtures/data";
import type { TDataById, TRecord, TReqCustomers } from "../_types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import useUpdateData from "@/services/useUpdateData";
import useGetById from "@/services/useGetById";
import { useEffect } from "react";
import useFormData from "../_hooks/useFormData";
import FormComponent from "@/components/Form/Form";
type TProps = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedRecord?: TRecord | null;
};
function CustomersForm({ setOpen, selectedRecord }: TProps) {
  const id = selectedRecord?.id;
  const { fields } = useFormData();
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
    url: url,
    queryKey: [queryKey, String(id)],
    id: id,
  });

  const form = useForm<TReqCustomers>({
    resolver: zodResolver(schema),
    defaultValues: initialValues,
    mode: "onChange",
  });

  console.log(form.watch());
  useEffect(() => {
    if (dataById) {
      const praparedData: TReqCustomers = {
        ...dataById.data,
        user_id: null,
      };
      form.reset(praparedData);
    }
  }, [form, dataById]);
  return (
    <FormComponent
      form={form}
      formFields={fields}
      isSubmitting={isPendingUpdate || isPendingCreate}
      onSubmit={(values) => {
        const action = id ? update : create;
        action(values, {
          onSuccess: () => {
            setOpen(false);
          },
        });
      }}
    />
  );
}

export default CustomersForm;
