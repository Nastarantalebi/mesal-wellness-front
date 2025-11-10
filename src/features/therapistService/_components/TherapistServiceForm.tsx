import { useForm } from "react-hook-form";
import type { TDataById, TReqTherapistService } from "../_types/types";
import { useLocation, useNavigate } from "react-router-dom";
import { schema, queryKey, url, initialValue } from "../_fixtures/data";
import useCreateData from "@/services/useCreateData";
import { zodResolver } from "@hookform/resolvers/zod";
import useUpdateData from "@/services/useUpdateData";
import useGetById from "@/services/useGetById";
import { useEffect } from "react";
import FormComponent from "@/components/Form/Form";
import useFormData from "../_hooks/useFormData";

function TherapistServiceForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedRecord = location.state?.record.id;
  const { mutate: create, isPending: isPendingCreate } = useCreateData({
    url: url,
    queryKey: queryKey,
  });
  const { mutate: update, isPending: isPendingUpdate } = useUpdateData({
    url: url,
    queryKey: queryKey,
    id: selectedRecord,
  });
  const { data: dataById } = useGetById<TDataById>({
    queryKey: [queryKey, selectedRecord],
    url: url,
    id: selectedRecord,
  });
  const form = useForm<any>({
    resolver: zodResolver(schema),
    defaultValues: initialValue,
  });
  const { fields } = useFormData();
  useEffect(() => {
    if (dataById) {
      const preparedData: TReqTherapistService = {
        is_active: !!dataById.therapist_service.is_active,
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
        const action = selectedRecord ? update : create;
        action(values, { onSuccess: () => navigate("/therapist-services") });
      }}
      formFields={fields}
      isSubmitting={isPendingUpdate || isPendingCreate}
    />
  );
}

export default TherapistServiceForm;
