import { useForm } from "react-hook-form";
import type { TDataById, TReqServices } from "../_types/types";
import {
  initialValues,
  schema,
  servicesQuerykey,
  servicesUrl,
} from "../_fixtures/data";
import useCreateData from "@/services/useCreateData";
import { zodResolver } from "@hookform/resolvers/zod";
import useUpdateData from "@/services/useUpdateData";
import useGetById from "@/services/useGetById";
import { useEffect } from "react";
import FormComponent from "@/components/Form/Form";
import useFormData from "../_hooks/useFormData";
type TProps = {
  setOpen: React.Dispatch<
    React.SetStateAction<{
      form: boolean;
      view: boolean;
    }>
  >;
  id: number;
};
function SevicesForm({ id, setOpen }: TProps) {
  const isEdit = !!id;
  const { fields } = useFormData(isEdit);
  const { mutate: create, isPending: isPendingCreate } = useCreateData({
    url: servicesUrl,
    queryKey: servicesQuerykey,
  });
  const { mutate: update, isPending: isPendingUpdate } = useUpdateData({
    queryKey: servicesQuerykey,
    url: servicesUrl,
    id: id,
  });
  const { data: dataById } = useGetById<TDataById>({
    queryKey: [servicesQuerykey, String(id)],
    url: servicesUrl,
    id: id,
  });
  const form = useForm<any>({
    resolver: zodResolver(schema),
    defaultValues: initialValues,
    mode: "onChange",
  });
  useEffect(() => {
    if (dataById) {
      const preparedData: TReqServices = {
        ...dataById.data,
        category_id: dataById.data.category?.id,
        duration_minutes: String(dataById.data.duration_minutes ?? ""),
        base_price: String(dataById.data.base_price ?? ""),
        gender_policy: dataById.data.gender_policy.value,
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
        action(preparedData, {
          onSuccess: () => setOpen({ form: false, view: false }),
        });
      }}
      form={form}
      formFields={fields}
      isSubmitting={isPendingCreate || isPendingUpdate}
    />
  );
}

export default SevicesForm;
