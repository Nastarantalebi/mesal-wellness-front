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
import Button from "@/components/Button";
type TProps = {
  selectedRecord: any;
  setShowForm: any;
  therapistId: any;
  refetch: any;
};
function TherapistsAvailabilitiesForm({
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
    url: url,
    queryKey: [queryKey, id],
    id: id,
  });
  const form = useForm<any>({
    resolver: zodResolver(schema),
    defaultValues: initialValues,
  });
  useEffect(() => {
    if (!id) {
      form.reset(initialValues);
      form.setValue("therapist_id", therapistId);
    }
    form.setValue("therapist_id", therapistId);
  }, [id, form, therapistId]);
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
  const { fields } = useFormData(isEdit);
  return (
    <FormComponent
      form={form}
      onSubmit={(values) => {
        const action = isEdit ? update : create;
        action(values, {
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
      }>
      <BreakForm form={form} />
    </FormComponent>
  );
}

export default TherapistsAvailabilitiesForm;
