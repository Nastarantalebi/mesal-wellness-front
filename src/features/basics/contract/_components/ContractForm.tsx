import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { schema, queryKey, url, initialValue } from "../_fixtures/data";
import useCreateData from "@/services/useCreateData";
import { zodResolver } from "@hookform/resolvers/zod";
import type { TDataById, TReqContract } from "../_types/types";
import useUpdateData from "@/services/useUpdateData";
import { useEffect } from "react";
import useGetById from "@/services/useGetById";
import FormComponent from "@/components/Form/Form";
import useFormData from "../_hooks/useFormData";

function ContractForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedRecord = location.state?.record.id;
  const isEdit = !!selectedRecord;
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
    id: selectedRecord,
    url: url,
    queryKey: [queryKey, selectedRecord],
  });
  const form = useForm<any>({
    resolver: zodResolver(schema),
    defaultValues: initialValue,
  });
  useEffect(() => {
    if (dataById) {
      form.reset({
        ...dataById.contract,
        company_id: dataById.contract.company.id,
      });
    }
  }, [dataById, form]);
  return (
    <FormComponent<TReqContract>
      onSubmit={(values) => {
        const action = isEdit ? update : create;
        action(values, { onSuccess: () => navigate("/contract") });
      }}
      form={form}
      isSubmitting={isPendingUpdate || isPendingCreate}
      formFields={fields}
    />
  );
}

export default ContractForm;
