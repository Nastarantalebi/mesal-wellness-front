import { useForm } from "react-hook-form";
import type { TDataById, TReqServiceCategory } from "../_types/types";
import { useLocation, useNavigate } from "react-router-dom";
import { schema, queryKey, url, initialValue } from "../_fixtures/data";
import useCreateData from "@/services/useCreateData";
import { zodResolver } from "@hookform/resolvers/zod";
import useUpdateData from "@/services/useUpdateData";
import useGetById from "@/services/useGetById";
import { useEffect } from "react";
import FormComponent from "@/components/Form/Form";
import useFormData from "../_hooks/useFormData";

function ServiceCategoryForm() {
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
  const form = useForm<TReqServiceCategory>({
    resolver: zodResolver(schema),
    defaultValues: initialValue,
  });
  useEffect(() => {
    if (dataById) {
      const preparedData: TReqServiceCategory = {
        description: String(dataById.category.description ?? ""),
        is_active: dataById.category.is_active?"true":"false",
        title: dataById.category.title,
        branch_id: dataById.category.parent_id ?? null,
        parent_id: dataById.category.parent_id ?? null,
        icon: dataById.category.icon,
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
        action(preparedData, {
          onSuccess: () => navigate("/service-category"),
        });
      }}
      form={form}
      formFields={fields}
      isSubmitting={isPendingCreate || isPendingUpdate}
    />
  );
}

export default ServiceCategoryForm;
