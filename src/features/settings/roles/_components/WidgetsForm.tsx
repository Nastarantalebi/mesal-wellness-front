import FormComponent from "@/components/Form/Form";
import useFormData from "../_hooks/useFormData";
import { useForm } from "react-hook-form";
import type { TDataById, TWidget } from "../_types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  queryKey,
  url,
  widgetInitailValues,
  WidgetSchema,
} from "../_fixtures/data";
import useCreateData from "@/services/useCreateData";
import useGetById from "@/services/useGetById";
import { useEffect } from "react";
import LoadingSpin from "@/components/Loading";

type TProps = {
  setOpenModal: (value: boolean) => void;
  id?: number;
};
const WidgetsForm = ({ setOpenModal, id }: TProps) => {
  const isEdit = !!id;
  const { mutate, isPending } = useCreateData({
    url: url + "widgets",
    queryKey,
  });
  const { data, isLoading } = useGetById<TDataById>({
    queryKey: ["role-widgets", String(id)],
    url: `/basics/acl/roles/${id}/widgets/`,
    enabled: isEdit,
  });
  const { fieldsWidget } = useFormData();
  const form = useForm<TWidget>({
    resolver: zodResolver(WidgetSchema),
    defaultValues: {
      ...widgetInitailValues,
      id: id,
    },
    mode: "onChange",
  });
  useEffect(() => {
    if (data?.data && Array.isArray(data.data)) {
      const widgetIds = data.data.map((item) => item.id);
      form.reset({
        id: id,
        widgets: widgetIds,
      });
    }
  }, [data, id, form]);
  if (isLoading) return <LoadingSpin />;
  return (
    <FormComponent<TWidget>
      form={form}
      formFields={fieldsWidget}
      isSubmitting={isPending}
      onSubmit={(values) => {
        mutate(values, {
          onSuccess: () => setOpenModal(false),
        });
      }}
    />
  );
};

export default WidgetsForm;
