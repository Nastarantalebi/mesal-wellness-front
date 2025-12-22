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
import Button from "@/components/Button";
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
  const isEdit = !!id;
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
  const { fields } = useFormData(isEdit);
  useEffect(() => {
    if (!id) {
      form.reset(initialValue);
      form.setValue("therapist_id", therapistId);
    }
    form.setValue("therapist_id", therapistId);
  }, [id, form, therapistId]);
  useEffect(() => {
    if (dataById) {
      const preparedData: TReqTherapistService = {
        is_active: dataById.therapist_service.is_active,
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
          is_active: values.is_active !== false,
        };
        const action = isEdit ? update : create;
        action(preparedData, {
          onSuccess: () => setShowForm(false),
        });
      }}
      formFields={fields}
      button={
        <div className="flex flex-row items-center justify-end gap-2">
          <Button
            type="button"
            variant="outline-danger"
            onClick={() => {
              setShowForm(false);
            }}>
            بستن
          </Button>
          <Button
            variant="primary"
            isPending={isPendingUpdate || isPendingCreate}>
            <span>ثبت اطلاعات</span>
          </Button>
        </div>
      }
    />
  );
}

export default TherapistServiceForm;
