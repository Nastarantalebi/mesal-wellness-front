import {
  ticketListInitialValues,
  ticketListvalidationSchema,
} from "../_fixtures/validations";
import type { TResList, TReqList } from "../_types/type";
import useCreateData from "@/services/useCreateData";
import { TICKETS_QUERY_KEY, ticketsUrl } from "../_fixtures/data";
import useFormData from "../_hooks/useFormData";
import FormComponent from "@/components/Form/Form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const TicketsForm = ({ setNewList }: { setNewList: any }) => {
  const { mutate, isPending } = useCreateData<TReqList, TResList>({
    url: ticketsUrl,
    queryKey: [TICKETS_QUERY_KEY],
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
      isSubmitting={isPending}
      formFields={fields}
      onSubmit={(values) => {
        mutate(values);
        setNewList(false);
      }}
    />
  );
};

export default TicketsForm;
