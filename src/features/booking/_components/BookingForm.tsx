import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import useCreateData from "@/services/useCreateData";
import { initialValues, queryKey, schema, url } from "../_fixtures/data";
import { zodResolver } from "@hookform/resolvers/zod";
import useUpdateData from "@/services/useUpdateData";
import useGetById from "@/services/useGetById";
import { useEffect } from "react";
import FormComponent from "@/components/Form/Form";
import type { TDataById, TRequest } from "../_types/type";
import FormFeilds from "./item/FormFeilds";
import BokkingDescription from "./BokkingDescription";
import LoadingForm from "@/components/Loading/LoadingForm";

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
  const { data: dataById, isFetching: isFetchingById } = useGetById<TDataById>({
    url: url,
    queryKey: [queryKey, selectedRecord],
    id: selectedRecord,
  });
  const form = useForm<any>({
    resolver: zodResolver(schema),
    defaultValues: initialValues,
  });
  useEffect(() => {
    if (dataById) {
      const preparedDataItem = dataById.data.items.map((item) => ({
        service_id: item.service_id,
        therapist_id: item.therapist_id,
        resource_id: item.resource_id,
        start_at: item.start_at.split(" ")[1],
        end_at: item.end_at.split(" ")[1],
        date: item.start_at.split(" ")[0],
        unit_price: item.unit_price,
        total_price: item.total_price,
      }));
      const praparedData: TRequest = {
        customer_id: dataById.data.customer_id,
        notes: dataById.data.notes,
        total_amount: dataById.data.total_amount,
        deposit: dataById.data.deposit ?? 0,
        payable_amount: dataById.data.payable_amount,
        items: preparedDataItem,
        company_id: dataById.data.customer_id,
        discount_amount: dataById.data.customer_id,
      };
      form.reset(praparedData);
    }
  }, [form.reset, dataById]);
  const isDisabled = isPendingUpdate || isPendingCreate;

  return (
    <>
      {isDisabled ? (
        <LoadingForm />
      ) : (
        <>
          <BokkingDescription />
          <FormComponent
            btnSubmitText="ثبت نوبت"
            form={form}
            isSubmitting={isPendingUpdate || isPendingCreate}
            onSubmit={(values) => {
              const action = selectedRecord ? update : create;
              action(values, { onSuccess: () => navigate("/booking") });
            }}>
            <FormFeilds
              form={form}
              selectedRecord={selectedRecord}
              dataById={dataById}
              isFetchingById={isFetchingById}
            />
          </FormComponent>
        </>
      )}
    </>
  );
}

export default BookingForm;
