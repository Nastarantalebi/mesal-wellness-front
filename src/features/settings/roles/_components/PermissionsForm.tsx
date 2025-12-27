import FormComponent from "@/components/Form/Form";
import useFormData from "../_hooks/useFormData";
import { useForm } from "react-hook-form";
import type { TPermissions } from "../_types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  PermissionsInitailValues,
  PermissionsSchema,
  queryKey,
  url,
} from "../_fixtures/data";
import useCreateData from "@/services/useCreateData";
import { useEffect } from "react";

type TProps = {
  setOpenModal: (value: boolean) => void;
  id: number;
};
const PermissionsForm = ({ setOpenModal, id }: TProps) => {
  const { mutate: create, isPending: isPendingCreate } = useCreateData({
    url: url + "permissions",
    queryKey: queryKey + "permissions",
  });

  const { fieldsPermissions } = useFormData();
  const form = useForm<TPermissions>({
    resolver: zodResolver(PermissionsSchema),
    defaultValues: PermissionsInitailValues,
  });
  useEffect(() => {
    if (id) {
      form.setValue("id", id);
    }
  }, [form, id]);
  return (
    <div>
      <FormComponent<TPermissions>
        form={form}
        formFields={fieldsPermissions}
        isSubmitting={isPendingCreate}
        onSubmit={(values) => {
          create(values, {
            onSuccess: () => setOpenModal(false),
          });
        }}
      />
    </div>
  );
};

export default PermissionsForm;
