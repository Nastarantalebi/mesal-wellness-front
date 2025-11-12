import { useForm } from "react-hook-form";
import type { TDataById, TReqResources } from "../_types/types";
import { useLocation, useNavigate } from "react-router-dom";
import { schema, queryKey, url, initialValue } from "../_fixtures/data";
import useCreateData from "@/services/useCreateData";
import { zodResolver } from "@hookform/resolvers/zod";
import useUpdateData from "@/services/useUpdateData";
import useGetById from "@/services/useGetById";
import { useEffect } from "react";
import FormComponent from "@/components/Form/Form";
import useFormData from "../_hooks/useFormData";

function ResourcesForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedRecord = location.state?.record.id;
  const { fields } = useFormData();
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
      const preparedData: TReqResources = {
        description: dataById.resource.description,
        capacity: String(dataById.resource.capacity),
        code: dataById.resource.code,
        name: dataById.resource.name ?? null,
        status: dataById.resource.status,
        type_id: dataById.resource.type.id,
        facility_id: dataById.resource.facility?.id,
      };
      form.reset(preparedData);
    }
  }, [form, dataById]);
  return (
    <FormComponent
      form={form}
      formFields={fields}
      isSubmitting={isPendingUpdate || isPendingCreate}
      onSubmit={(values) => {
        const action = !!selectedRecord ? update : create;
        action(values, { onSuccess: () => navigate("/resources") });
      }}
    />
  );
}

export default ResourcesForm;
