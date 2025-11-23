import { useForm } from "react-hook-form";
import type { TDataById, TReqTherapistService } from "../_types/types";
import { schema, queryKey, url, initialValue } from "../_fixtures/data";
import useCreateData from "@/services/useCreateData";
import { zodResolver } from "@hookform/resolvers/zod";
import useUpdateData from "@/services/useUpdateData";
import useGetById from "@/services/useGetById";
import { useEffect } from "react";
import FormComponent from "@/components/Form/Form";
import useFormData from "../_hooks/useFormData";
type TProps = {
  selectedRecord: any;
  setShowForm: any;
  therapistId: any;
  refetch: any;
};
function TherapistServiceForm({
  selectedRecord,
  setShowForm,
  therapistId,
  refetch,
}: TProps) {
  const id = selectedRecord?.id;
  const { mutate: create, isPending: isPendingCreate } = useCreateData({
    url: url,
    queryKey: queryKey,
    onSuccess: () => refetch(),
  });
  const { mutate: update, isPending: isPendingUpdate } = useUpdateData({
    url: url,
    queryKey: queryKey,
    id: id,
    onSuccess: () => refetch(),
  });
  const { data: dataById } = useGetById<TDataById>({
    queryKey: [queryKey, id],
    url: url,
    id: id,
  });
  const form = useForm<any>({
    resolver: zodResolver(schema),
    defaultValues: initialValue,
  });
  const { fields } = useFormData();
  useEffect(() => {
    form.setValue("therapist_id", therapistId);
  }, [therapistId]);
  useEffect(() => {
    if (dataById) {
      const preparedData: TReqTherapistService = {
        is_active: dataById.therapist_service.is_active ? "true" : "false",
        commission_rate: String(dataById.therapist_service.commission_rate),
        custom_price: String(dataById.therapist_service.custom_price),
        estimated_duration: String(
          dataById.therapist_service.estimated_duration
        ),
        service_id: dataById.therapist_service.service.id,
        therapist_id: dataById.therapist_service.therapist.id,
      };
      form.reset(preparedData);
    }
  }, [form, dataById]);
  return (
    <FormComponent
      form={form}
      onSubmit={(values) => {
        const preparedData = {
          ...values,
          is_active: values.is_active === "true",
        };
        const action = !!id ? update : create;
        action(preparedData, {
          onSuccess: () => setShowForm(false),
        });
      }}
      formFields={fields}
      isSubmitting={isPendingUpdate || isPendingCreate}
    />
  );
}

export default TherapistServiceForm;
