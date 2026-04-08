import { useForm } from "react-hook-form";
import useCreateData from "@/services/useCreateData";
import { initialValues, queryKey, schema, url } from "../_fixtures/data";
import type { TDataById } from "../_types/types";
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
  resourceId: any;
  refetch: any;
};
function ResourceAvailabilitiesForm({
  selectedRecord,
  setShowForm,
  resourceId,
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
      form.setValue("resource_id", resourceId);
    }
    form.setValue("resource_id", resourceId);
  }, [id, form, resourceId]);
  useEffect(() => {
    if (dataById) {
      form.reset(dataById.data);
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
      formFields={fields}
      button={
        <div className="flex flex-row items-center justify-end gap-2">
          <Button
            type="button"
            variant="outline-danger"
            onClick={() => {
              setShowForm(false);
            }}>
          لغو
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

export default ResourceAvailabilitiesForm;
