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
import type {
  QueryObserverResult,
  RefetchOptions,
} from "@tanstack/react-query";
type TProps = {
  selectedRecord: any;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  therapistId: number;
  refetch: (
    options?: RefetchOptions | undefined,
  ) => Promise<QueryObserverResult<any, Error>>;
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
    mode: "onChange",
  });
  useEffect(() => {
    if (!id) {
      form.reset(initialValues);
      form.setValue("staff_id", therapistId);
    }
    form.setValue("staff_id", therapistId);
  }, [id, form, therapistId]);
  useEffect(() => {
    if (dataById) {
      form.reset(dataById.data);
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
            }}
          >
            لغو
          </Button>
          <Button
            variant="primary"
            isPending={isPendingUpdate || isPendingCreate}
          >
            <span>ثبت اطلاعات</span>
          </Button>
        </div>
      }
    >
      <BreakForm form={form} />
    </FormComponent>
  );
}

export default TherapistsAvailabilitiesForm;
