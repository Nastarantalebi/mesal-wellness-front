import { useForm } from "react-hook-form";
import useCreateData from "@/services/useCreateData";
import { initialValues, queryKey, schema, url } from "../_fixtures/data";
import type { TDataById, TReqTherapistsAvailabilities } from "../_types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import useUpdateData from "@/services/useUpdateData";
import useGetById from "@/services/useGetById";
import { useEffect } from "react";
import FormComponent from "@/components/Form/Form";
import useFormData from "../_hooks/useFormData";
import BreakForm from "@/features/_components/BreakForm";
type TProps = { selectedRecord: any; setShowForm: any; therapistId: any };
function TherapistsAvailabilitiesForm({
  selectedRecord,
  setShowForm,
  therapistId,
}: TProps) {
  const id = selectedRecord?.id;
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
    queryKey: [queryKey, id],
    id: id,
  });
  const form = useForm<any>({
    resolver: zodResolver(schema),
    defaultValues: initialValues,
  });
  useEffect(() => {
    form.setValue("therapist_id", therapistId);
  }, [therapistId]);
  useEffect(() => {
    if (dataById) {
      const praparedData: TReqTherapistsAvailabilities = {
        start_time: dataById.availability.start_time,
        end_time: dataById.availability.end_time,
        therapist_id: dataById.availability.therapist_id,
        weekday: dataById.availability.weekday,
        is_active: dataById.availability.is_active,
        breaks: dataById.availability.breaks,
      };
      form.reset(praparedData);
    }
  }, [form, dataById]);
  const { fields } = useFormData();
  return (
    <FormComponent
      form={form}
      onSubmit={(values) => {
        const action = !!id ? update : create;
        action(values, {
          onSuccess: () => setShowForm(false),
        });
      }}
      isSubmitting={isPendingUpdate || isPendingCreate}
      formFields={fields}>
      <BreakForm form={form} />
    </FormComponent>
  );
}

export default TherapistsAvailabilitiesForm;
