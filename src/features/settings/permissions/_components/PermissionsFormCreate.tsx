import FormComponent from "@/components/Form/Form";
import useCreateData from "@/services/useCreateData";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import useFormData from "../_hooks/useFormData";
import useGetData from "@/services/useGetData";
import type {
  TCreateDataPermissions,
  TRequestPermissionsCreate,
} from "../_types/type";
import { initialValuesCreate, schemaCreate } from "../_fixtures/data";
type TProps = {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
};
const PermissionsFormCreate = ({ setOpenModal }: TProps) => {
  const { mutate, isPending } = useCreateData({
    url: "/basics/acl/permissions/",
    queryKey: "/basics/acl/permissions/",
    onSuccess: () => setOpenModal(false),
  });
  const form = useForm<TRequestPermissionsCreate>({
    resolver: zodResolver(schemaCreate),
    defaultValues: initialValuesCreate,
  });
  const { data, isLoading } = useGetData<TCreateDataPermissions>({
    url: "/basics/acl/permissions/create",
    queryKey: "/basics/acl/permissions/create",
  });
  const { permissionsFields } = useFormData({ data, isLoading });
  return (
    <FormComponent
      form={form}
      formFields={permissionsFields}
      onSubmit={(value) => mutate(value)}
      isSubmitting={isPending}
    />
  );
};

export default PermissionsFormCreate;
