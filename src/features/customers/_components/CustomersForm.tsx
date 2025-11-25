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
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  selectedRecord?: TRecord | null;
};
function CustomersForm({ setOpenModal, selectedRecord }: TProps) {
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
    queryKey: [queryKey, String(selectedRecord?.id)],
    id: id,
  });

  const form = useForm<TReqCustomers>({
    resolver: zodResolver(schema),
    defaultValues: initialValues,
  });
  useEffect(() => {
    if (dataById) {
      const praparedData: TReqCustomers = {
        first_name: dataById.customer.first_name,
        last_name: dataById.customer.last_name,
        national_code: dataById.customer.national_code,
        notes: dataById.customer.notes,
        phone: dataById.customer.phone,
        gender: dataById.customer.gender,
        membership_type: dataById.customer.membership_type,
        status: dataById.customer.status,
        birth_date: dataById.customer.birth_date,
        joined_at: dataById.customer.joined_at,
        user_id: null,
      };
      form.reset(praparedData);
    }
  }, [form.reset, dataById]);
  return (
    <FormComponent
      form={form}
      formFields={fields}
      isSubmitting={isPendingUpdate || isPendingCreate}
      onSubmit={(values) => {
        const action = id ? update : create;
        action(values, {
          onSuccess: () => {
            setOpenModal(false);
          },
        });
      }}
    />
  );
}

export default CustomersForm;
