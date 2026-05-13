import { useForm } from "react-hook-form";
import useCreateData from "@/services/useCreateData";
import { zodResolver } from "@hookform/resolvers/zod";
import useUpdateData from "@/services/useUpdateData";
import useGetById from "@/services/useGetById";
import { useEffect } from "react";
import FormComponent from "@/components/Form/Form";
import useFormData from "../_hooks/useFormData";
import { initialValues, schema, url } from "../_fixtures/data";

function ServicesReportForm() {
  const { mutate: create, isPending: isPendingCreate } = useCreateData({
    url: url,
    queryKey: url,
  });
  const { mutate: update, isPending: isPendingUpdate } = useUpdateData({
    url: url,
    queryKey: url,
  });
  const { data: dataById } = useGetById<any>({
    url: url,
    queryKey: [url],
  });
  const form = useForm<any>({
    resolver: zodResolver(schema),
    defaultValues: initialValues,
    mode: "onChange",
  });
  useEffect(() => {
    if (dataById) {
      const praparedData: any = {
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
        const action = true ? update : create;
        action(values);
      }}
      isSubmitting={isPendingUpdate || isPendingCreate}
      formFields={fields}
    />
  );
}

export default ServicesReportForm;
