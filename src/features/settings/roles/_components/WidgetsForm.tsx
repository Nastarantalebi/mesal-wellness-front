import FormComponent from "@/components/Form/Form";
import useFormData from "../_hooks/useFormData";
import { useForm } from "react-hook-form";
import type { TWidget } from "../_types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  queryKey,
  url,
  widgetInitailValues,
  WidgetSchema,
} from "../_fixtures/data";
import useCreateData from "@/services/useCreateData";
import { useEffect } from "react";
import useGetData from "@/services/useGetData";

type TProps = {
  setOpenModal: (value: boolean) => void;
  id: number;
};
const WidgetsForm = ({ setOpenModal, id }: TProps) => {
  const { data } = useGetData({
    queryKey: "res",
    url: `/basics/acl/roles/${id}/widgets/`,
    enabled: !!id,
  });
  console.log(data);
  console.log(id);
  const { mutate: create, isPending: isPendingCreate } = useCreateData({
    url: url + "widget",
    queryKey: queryKey + "widget",
  });
  const { fieldsWidget } = useFormData();
  const form = useForm<TWidget>({
    resolver: zodResolver(WidgetSchema),
    defaultValues: widgetInitailValues,
  });
  useEffect(() => {
    if (id) {
      form.setValue("id", id);
    }
  }, [form, id]);
  return (
    <FormComponent<TWidget>
      form={form}
      formFields={fieldsWidget}
      isSubmitting={isPendingCreate}
      onSubmit={(values) => {
        create(values, {
          onSuccess: () => setOpenModal(false),
        });
      }}
    />
  );
};

export default WidgetsForm;
