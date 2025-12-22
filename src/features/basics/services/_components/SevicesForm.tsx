import { useForm } from "react-hook-form";
import type { TDataById, TReqServices } from "../_types/types";
import { useLocation, useNavigate } from "react-router-dom";
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
function SevicesForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedRecord = location.state?.record.id;
  const isEdit = !!selectedRecord;
  const { fields } = useFormData(isEdit);
  const { mutate: create, isPending: isPendingCreate } = useCreateData({
    url: servicesUrl,
    queryKey: servicesQuerykey,
  });
  const { mutate: update, isPending: isPendingUpdate } = useUpdateData({
    queryKey: servicesQuerykey,
    url: servicesUrl,
    id: selectedRecord,
  });
  const { data: dataById } = useGetById<TDataById>({
    queryKey: [servicesQuerykey, selectedRecord],
    url: servicesUrl,
    id: selectedRecord,
  });
  const form = useForm<any>({
    resolver: zodResolver(schema),
    defaultValues: initialValues,
  });
  useEffect(() => {
    if (dataById) {
      const preparedData: TReqServices = {
        title: dataById.service.title,
        category_id: dataById.service.category?.id,
        code: dataById.service.code ?? null,
        duration_minutes: String(dataById.service.duration_minutes ?? ""),
        base_price: String(dataById.service.base_price ?? ""),
        currency: dataById.service.currency ?? null,
        gender_policy: dataById.service.gender_policy.value,
        description: dataById.service.description,
        is_active: dataById.service.is_active,
        branch_id: dataById.service.category?.branch_id ?? null,
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
        const action = !!selectedRecord ? update : create;
        action(preparedData, { onSuccess: () => navigate("/services") });
      }}
      form={form}
      formFields={fields}
      isSubmitting={isPendingCreate || isPendingUpdate}
    />
  );
}

export default SevicesForm;
