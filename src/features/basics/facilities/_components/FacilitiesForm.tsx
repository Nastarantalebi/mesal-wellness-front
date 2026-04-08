import { useForm } from "react-hook-form";
import { schema, queryKey, url, initialValue } from "../_fixtures/data";
import useCreateData from "@/services/useCreateData";
import { zodResolver } from "@hookform/resolvers/zod";
import type { TDataById, TReqFacilities } from "../_types/types";
import useUpdateData from "@/services/useUpdateData";
import { useEffect } from "react";
import useGetById from "@/services/useGetById";
import FormComponent from "@/components/Form/Form";
import useFormData from "../_hooks/useFormData";
type TProps = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: number;
};
function FacilitiesForm({ id, setOpen }: TProps) {
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
    id: id,
    url: url,
    queryKey: [queryKey, String(id)],
  });
  const form = useForm<TReqFacilities>({
    resolver: zodResolver(schema),
    defaultValues: initialValue,
    mode: "onChange",
  });
  useEffect(() => {
    if (dataById) {
      const preparedData: TReqFacilities = {
        ...dataById.data,
        address: dataById.data.address ?? "",
        code: dataById.data.code ?? "",
      };
      form.reset(preparedData);
    }
  }, [dataById, form]);
  return (
    <FormComponent
      onSubmit={(values) => {
        const preparedData = {
          ...values,
          is_active: values.is_active !== false,
        };
        const action = !!id ? update : create;
        action(preparedData, { onSuccess: () => setOpen(false) });
      }}
      form={form}
      isSubmitting={isPendingUpdate || isPendingCreate}
      formFields={fields}
    />
  );
}

export default FacilitiesForm;
