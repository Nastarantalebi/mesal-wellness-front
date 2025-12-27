import FormComponent from "@/components/Form/Form";
import useFormData from "../_hooks/useFormData";
import { useForm } from "react-hook-form";
import type { TCreateData, TRequest } from "../_types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { initailValues, queryKey, schema, url } from "../_fixtures/data";
import useCreateData from "@/services/useCreateData";
import useGetData from "@/services/useGetData";

type TProps = {
  setOpenModal: (value: boolean) => void;
  selectedRecord?: any;
};
const RolesForm = ({ setOpenModal, selectedRecord }: TProps) => {
  const id = selectedRecord?.id;
  // const isEdit = !!id;
  console.log(id);
  const { mutate: create, isPending: isPendingCreate } = useCreateData({
    url,
    queryKey,
  });
  const { data: dataRoles, isLoading: isLoadingRoles } =
    useGetData<TCreateData>({
      queryKey: queryKey + "createdata",
      url: url + "create",
    });
  // const { mutate: update, isPending: isPendingUpdate } = useCreateData({
  //   url,
  //   queryKey,
  // });
  // const { data: dataById } = useGetById({
  //   url,
  //   queryKey,
  //   id,
  // });
  const { fields } = useFormData({ dataRoles, isLoadingRoles });
  const form = useForm<TRequest>({
    resolver: zodResolver(schema),
    defaultValues: initailValues,
  });
  // useEffect(() => {
  //   if (dataById) {
  //     form.reset(dataById);
  //   }
  // }, [form, dataById]);
  return (
    <div>
      <FormComponent<TRequest>
        form={form}
        formFields={fields}
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

export default RolesForm;
