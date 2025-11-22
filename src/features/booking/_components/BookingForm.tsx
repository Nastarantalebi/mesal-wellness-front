import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import useCreateData from "@/services/useCreateData";
import { initialValues, queryKey, schema, url } from "../_fixtures/data";
import { zodResolver } from "@hookform/resolvers/zod";
import useUpdateData from "@/services/useUpdateData";
import useGetById from "@/services/useGetById";
import { useEffect } from "react";
import FormComponent from "@/components/Form/Form";
import useGetData from "@/services/useGetData";
import type { TCreateData, TDataById, TRequest } from "../_types/type";
import ItemForm from "./ItemForm";
import BookingFields from "./BookingFields";

function BookingForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedRecord = location.state?.record.id;
  const { mutate: create, isPending: isPendingCreate } = useCreateData({
    url: url,
    queryKey: queryKey,
  });
  const { mutate: update, isPending: isPendingUpdate } = useUpdateData({
    url: url,
    queryKey: queryKey,
    id: selectedRecord,
  });
  const { data: dataById } = useGetById<TDataById>({
    url: url,
    queryKey: [queryKey, selectedRecord],
    id: selectedRecord,
  });
  const { data: dataCreate } =
    useGetData<TCreateData>({
      url: `${url}create`,
      queryKey: `${queryKey},"dataCreate"`,
    });
  const form = useForm<any>({
    resolver: zodResolver(schema),
    defaultValues: initialValues,
  });
  useEffect(() => {
    if (dataById) {
      const preparedDataItem = dataById.booking.items.map((item) => ({
        service_id: item.service_id,
        therapist_id: item.therapist_id,
        resource_id: item.resource_id,
        start_at: item.start_at,
        end_at: item.end_at,
      }));
      const praparedData: TRequest = {
        customer_id: dataById.booking.customer_id,
        notes: dataById.booking.notes,
        //@ts-ignore
        items: preparedDataItem,
      };
      form.reset(praparedData);
    }
  }, [form.reset, dataById]);
  return (
    <FormComponent
      form={form}
      // formFields={fields}
      isSubmitting={isPendingUpdate || isPendingCreate}
      onSubmit={(values) => {
        const action = selectedRecord ? update : create;
        action(values, { onSuccess: () => navigate("/booking") });
      }}>
      <BookingFields form={form} />
      <ItemForm form={form} dataCreate={dataCreate} />
    </FormComponent>
  );
}

export default BookingForm;
