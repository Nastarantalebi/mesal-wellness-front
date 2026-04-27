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
import { initialValuesCreate, queryKey, schemaCreate } from "../_fixtures/data";
import { queryClient } from "@/libs/queryClient";
type TProps = {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
};
const PermissionsFormCreate = ({ setOpenModal }: TProps) => {
  const { mutate, isPending } = useCreateData({
    url: "/basics/acl/permissions/",
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
      setOpenModal(false);
    },
  });
  const form = useForm<TRequestPermissionsCreate>({
    resolver: zodResolver(schemaCreate),
    defaultValues: initialValuesCreate,
    mode: "onChange",
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
