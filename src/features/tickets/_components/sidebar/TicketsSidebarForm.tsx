import {
  ticketListInitialValues,
  ticketListvalidationSchema,
} from "../../_fixtures/validations";
import type { TResList, TReqList } from "../../_types/type";
import useCreateData from "@/services/useCreateData";
import { ticketsUrl } from "../../_fixtures/data";
import useFormData from "../../_hooks/useFormData";
import FormComponent from "@/components/Form/Form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const TicketsSidebarForm = ({ setNewList }: { setNewList: any }) => {
  const { mutate, isPending } = useCreateData<TReqList, TResList>({
    url: ticketsUrl,
    queryKey: [ticketsUrl],
    support: true,
  });
  const form = useForm<TReqList>({
    resolver: zodResolver(ticketListvalidationSchema),
    defaultValues: ticketListInitialValues,
  });
  const { fields } = useFormData();
  return (
    <FormComponent<TReqList>
      size="small"
      form={form}
      btnSubmitText="ایجاد تیکت"
      isSubmitting={isPending}
      formFields={fields}
      onSubmit={(values) => {
        mutate(values);
        setNewList(false);
      }}
    />
  );
};

export default TicketsSidebarForm;
