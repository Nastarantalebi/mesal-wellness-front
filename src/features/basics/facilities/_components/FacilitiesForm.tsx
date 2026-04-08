import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { schema, queryKey, url, initialValue } from "../_fixtures/data";
import useCreateData from "@/services/useCreateData";
import { zodResolver } from "@hookform/resolvers/zod";
import type { TDataById, TReqFacilities } from "../_types/types";
import useUpdateData from "@/services/useUpdateData";
import { useEffect } from "react";
import useGetById from "@/services/useGetById";
import FormComponent from "@/components/Form/Form";
import useFormData from "../_hooks/useFormData";

function FacilitiesForm() {
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
    id: selectedRecord,
    url: url,
    queryKey: [queryKey, selectedRecord],
  });
  const form = useForm<TReqFacilities>({
    resolver: zodResolver(schema),
    defaultValues: initialValue,
    mode: "onChange",
  });
  useEffect(() => {
    if (dataById) {
      const preparedData: TReqFacilities = {
        ...dataById.data,
        address: dataById.data.address ?? "",
        code: dataById.data.code ?? "",
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
        action(preparedData, { onSuccess: () => navigate("/facilities") });
      }}
      form={form}
      isSubmitting={isPendingUpdate || isPendingCreate}
      formFields={fields}
    />
  );
}

export default FacilitiesForm;
