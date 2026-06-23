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
    mode: "onChange",
  });

  console.log("form:", form.watch());
  const { fields } = useFormData(isEdit);
  useEffect(() => {
    if (!id) {
      form.reset(initialValue);
      form.setValue("staff_id", therapistId);
    }
    form.setValue("staff_id", therapistId);
  }, [id, form, therapistId]);
  useEffect(() => {
    if (dataById) {
      const preparedData: TReqTherapistService = {
        is_active: dataById.data.is_active,
        commission_rate: String(dataById.data.commission_rate),
        custom_price: String(dataById.data.custom_price),
        estimated_duration: String(dataById.data.estimated_duration),
        service_id: dataById.data.service.id,
        staff_id: dataById.data.therapist.id,
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
    />
  );
}

export default TherapistServiceForm;
