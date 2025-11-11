import {  useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import useCreateData from "@/services/useCreateData";
import { initialValues, queryKey, schema, url } from "../_fixtures/data";
import type { TDataById, TReqResourceAvailabilities } from "../_types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import useUpdateData from "@/services/useUpdateData";
import useGetById from "@/services/useGetById";
import { useEffect } from "react";
import FormComponent from "@/components/Form/Form";
import useFormData from "../_hooks/useFormData";
import BreakForm from "@/features/_components/BreakForm";

function ResourceAvailabilitiesForm() {
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
    url: url,
    queryKey: [queryKey, selectedRecord],
    id: selectedRecord,
  });
  const form = useForm<any>({
    resolver: zodResolver(schema),
    defaultValues: initialValues,
  });
  useEffect(() => {
    if (dataById) {
      const praparedData: TReqResourceAvailabilities = {
        start_time: dataById.availability.start_time,
        end_time: dataById.availability.end_time,
        resource_id: dataById.availability.resource_id,
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
        const action = selectedRecord ? update : create;
        action(values, {
          onSuccess: () => navigate("/resource-availabilities"),
        });
      }}
      isSubmitting={isPendingUpdate || isPendingCreate}
      formFields={fields}>
     <BreakForm form={form}/>
    </FormComponent>
  );
}

export default ResourceAvailabilitiesForm;
