import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import useCreateData from "@/services/useCreateData";
import { initialValues, queryKey, schema, url } from "../_fixtures/data";
import type { TDataById, TReqTherapists } from "../_types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import useUpdateData from "@/services/useUpdateData";
import useGetById from "@/services/useGetById";
import { useEffect } from "react";
import FormComponent from "@/components/Form/Form";
import useFormData from "../_hooks/useFormData";

function TherapistsForm() {
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
      const praparedData: TReqTherapists = {
        ...dataById.data,
        ...dataById.data.user,
        facility_id: dataById.data.facility.id,
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
        action(values, { onSuccess: () => navigate("/therapists") });
      }}
      isSubmitting={isPendingUpdate || isPendingCreate}
      formFields={fields}
    />
  );
}

export default TherapistsForm;
