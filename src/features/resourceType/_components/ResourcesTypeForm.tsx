import { useForm } from "react-hook-form";
import type { TDataById, TReqResourceType } from "../_types/types";
import { useLocation, useNavigate } from "react-router-dom";
import { schema, queryKey, url, initialValue } from "../_fixtures/data";
import useCreateData from "@/services/useCreateData";
import { zodResolver } from "@hookform/resolvers/zod";
import useUpdateData from "@/services/useUpdateData";
import useGetById from "@/services/useGetById";
import { useEffect } from "react";
import FormComponent from "@/components/Form/Form";
import useFormData from "../_hooks/useFormData";

function ResourceTypeForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedRecord = location.state?.record.id;
  const isEdit = !!selectedRecord;
  const { fields } = useFormData(isEdit);
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
  useEffect(() => {
    if (dataById) {
      const preparedData: TReqResourceType = {
        description: String(dataById.type.description ?? ""),
        is_active: !!dataById.type.is_active,
        name: dataById.type.name,
        code: dataById.type.code,
        icon: dataById.type.icon ?? null,
      };
      form.reset(preparedData);
    }
  }, [form, dataById]);
  return (
    <FormComponent
      onSubmit={(values) => {
        const preparedData = {
          ...values,
          is_active: values.is_active === "true",
        };
        const action = !!selectedRecord ? update : create;
        action(preparedData, { onSuccess: () => navigate("/resource-type") });
      }}
      formFields={fields}
      form={form}
      isSubmitting={isPendingUpdate || isPendingCreate}
    />
  );
}

export default ResourceTypeForm;
