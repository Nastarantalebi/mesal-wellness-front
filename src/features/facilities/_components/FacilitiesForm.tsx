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
  const form = useForm<any>({
    resolver: zodResolver(schema),
    defaultValues: initialValue,
  });
  useEffect(() => {
    if (dataById) {
      const preparedData: TReqFacilities = {
        address: dataById.facility.address ?? "",
        city: dataById.facility.city ?? "",
        code: dataById.facility.code ?? "",
        description: dataById.facility.description ?? "",
        manager_name: dataById.facility.manager_name ?? "",
        name: dataById.facility.name ?? "",
        phone: dataById.facility.phone ?? "",
        is_active: dataById.facility.is_active,
      };
      form.reset(preparedData);
    }
  }, [dataById, form]);
  return (
    <FormComponent
      onSubmit={(values) => {
        const preparedData = {
          ...values,
          is_active: values.is_active === "true",
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
