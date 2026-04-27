import { useForm } from "react-hook-form";
import type { TDataById, TReqResources } from "../_types/types";
import { schema, queryKey, url, initialValue } from "../_fixtures/data";
import useCreateData from "@/services/useCreateData";
import { zodResolver } from "@hookform/resolvers/zod";
import useUpdateData from "@/services/useUpdateData";
import useGetById from "@/services/useGetById";
import { useEffect } from "react";
import FormComponent from "@/components/Form/Form";
import useFormData from "../_hooks/useFormData";
type TProps = {
  setOpen: React.Dispatch<
    React.SetStateAction<{
      form: boolean;
      availabilities: boolean;
    }>
  >;
  id: number;
};
function ResourcesForm({ id, setOpen }: TProps) {
  const { fields } = useFormData();
  const { mutate: create, isPending: isPendingCreate } = useCreateData({
    url: url,
    queryKey: queryKey,
  });
  const { mutate: update, isPending: isPendingUpdate } = useUpdateData({
    url: url,
    queryKey: queryKey,
    id: id,
  });
  const { data: dataById } = useGetById<TDataById>({
    queryKey: [queryKey, String(id)],
    url: url,
    id: id,
  });
  const form = useForm<any>({
    resolver: zodResolver(schema),
    defaultValues: initialValue,
    mode: "onChange",
  });
  useEffect(() => {
    if (dataById) {
      const preparedData: TReqResources = {
        ...dataById.data,
        capacity: String(dataById.data.capacity),
        type_id: dataById.data.type?.id,
        facility_id: dataById.data.facility?.id,
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
        const action = !!id ? update : create;
        action(values, {
          onSuccess: () => setOpen({ availabilities: false, form: false }),
        });
      }}
    />
  );
}

export default ResourcesForm;
