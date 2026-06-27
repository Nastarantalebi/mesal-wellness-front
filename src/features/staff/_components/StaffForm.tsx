import { useForm } from "react-hook-form";
import useCreateData from "@/services/useCreateData";
import useData, { queryKey, url } from "../_fixtures/useData.tsx";
import { zodResolver } from "@hookform/resolvers/zod";
import useUpdateData from "@/services/useUpdateData";
import useGetById from "@/services/useGetById";
import { useEffect } from "react";
import useFormData from "../_hooks/useFormData";
import FormComponent from "@/components/Form/Form";
import type { TData, TRequest } from "../_types/types";
type TProps = {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  id?: number;
};
function StaffForm({ setOpenModal, id }: TProps) {
  const { mutate: create, isPending: isPendingCreate } = useCreateData({
    url,
    queryKey,
  });
  const { mutate: update, isPending: isPendingUpdate } = useUpdateData({
    url,
    queryKey,
    id,
  });
  const { data } = useGetById<TData>({
    url,
    queryKey: [queryKey, String(id)],
    id,
  });

  const { schema, initialValues } = useData();

  const form = useForm<TRequest>({
    resolver: zodResolver(schema),
    defaultValues: initialValues,
    mode: "onChange",
  });

  console.log(form.watch());
  const { fields } = useFormData(form);
  useEffect(() => {
    if (data) {
      const praparedData: TRequest = {
        ...data.data.user,
        staff_type: data.data.staff_type,
        role_ids: data.data.roles,
        first_name: data.data.first_name,
        last_name: data.data.last_name,
        national_code: data.data.national_code,
        gender: data.data.gender,
        license_number: data.data.license_number,
        specialties: data.data.specialties?.[0],
        facility_id: data.data.facility_id,
        hire_date: data.data.hire_date,
        bio: data.data.bio,
        commission_rate: data.data.commission_rate,
        status: data.data.status,
      };
      console.log(praparedData);
      form.reset(praparedData);
    }
  }, [form, data]);
  return (
    <FormComponent
      form={form}
      formFields={fields}
      isSubmitting={isPendingUpdate || isPendingCreate}
      onSubmit={(values) => {
        const payload = {
          ...values,
          specialties: [values.specialties],
        };
        const action = !!id ? update : create;
        action(payload, {
          onSuccess: () => {
            setOpenModal(false);
          },
        });
      }}
    />
  );
}

export default StaffForm;
