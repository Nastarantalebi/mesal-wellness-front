import { Controller, useWatch } from "react-hook-form";
import { FormInput, FormLabel, FormSelect } from "@/components/Form";
import useGetData from "@/services/useGetData";
import type {
  TCreateData,
  TCustomerSearch,
  TDataById,
} from "../../_types/type";
import Button from "@/components/Button";
import Lucide from "@/components/Lucide";
import { useEffect, useState } from "react";
import Modal from "@/components/Headless/Dialog/Modal";
import CustomersForm from "@/features/customers/_components/CustomersForm";

type TProps = {
  form: any;
  dataCreate?: TCreateData;
  selectedRecord: any;
  dataById?: TDataById;
};

const CustomerFields = ({ form, selectedRecord, dataById }: TProps) => {
  console.log(dataById?.booking.customer_name);
  const isEdit = !!selectedRecord;
  console.log(isEdit);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const search_item = useWatch({
    control: form.control,
    name: "search_customer",
  });
  const selectedCustomerId = useWatch({
    control: form.control,
    name: "customer_id",
  });
  const { data, refetch, isFetching } = useGetData<TCustomerSearch>({
    url: `/wellness/customers/search?q=${
      isEdit && !search_item ? dataById?.booking.customer_name : search_item
    }`,
    queryKey: ["customer_search", search_item],
    enabled: false,
  });
  useEffect(() => {
    if (isEdit && dataById?.booking?.customer_name) {
      form.setValue("search_customer", dataById.booking.customer_name);
      form.setValue("customer_id", dataById.booking.customer_id);
      refetch();
    }
  }, [isEdit, dataById, form, refetch]);
  useEffect(() => {
    if (!data?.data) {
      form.setValue("phone", "");
      return;
    }
    if (!selectedCustomerId) {
      form.setValue("phone", "");
      return;
    }
    const selectedCustomer = data.data.find(
      (item: any) => item.id === Number(selectedCustomerId)
    );
    if (selectedCustomer) {
      form.setValue("phone", selectedCustomer.phone || "");
    } else {
      form.setValue("phone", "");
    }
  }, [selectedCustomerId, data]);

  return (
    <>
      <div className="grid grid-cols-12 gap-4 w-full mt-4 p-4 border rounded-lg bg-gray-50 col-span-full overflow-x-hidden">
        {/* ردیف جستجو مشتری */}
        <div className="col-span-12 md:col-span-4 xl:col-span-2 flex gap-2 items-end">
          <div className="flex-1">
            <FormLabel>یافتن مشتری</FormLabel>
            <Controller
              control={form.control}
              name="search_customer"
              render={({ field }) => (
                <FormInput {...field} placeholder="نام یا شماره تلفن مشتری" />
              )}
            />
          </div>
          {!!search_item && (
            <Button
              type="button"
              variant="outline-primary"
              size="sm"
              onClick={() => refetch()}
              className="h-9 flex items-center gap-1">
              <Lucide
                icon={isFetching ? "Loader" : "Search"}
                className={`w-4 h-4 ${isFetching ? "animate-spin" : ""}`}
              />
            </Button>
          )}
        </div>
        {/* پیام راهنما */}
        {!search_item ? (
          <div className="col-span-12 text-gray-500 text-sm">
            برای یافتن مشتری، نام یا شماره تلفن را وارد کنید.
          </div>
        ) : !data ? (
          <div className="col-span-12 text-gray-500 text-sm">
            برای دریافت نتیجه، روی دکمه جستجو کلیک کنید.
          </div>
        ) : null}

        {/* مشتری پیدا نشد */}
        {data && data.data.length === 0 ? (
          <div className="col-span-12 flex justify-between items-center gap-2 bg-red-50 text-red-700 p-3 rounded-lg border border-red-200">
            <span>مشتری یافت نشد.</span>
            <Button
              type="button"
              variant="outline-primary"
              size="sm"
              onClick={() => setOpenModal(true)}>
              + مشتری جدید
            </Button>
          </div>
        ) : null}

        {/* مشتری پیدا شد */}
        {data && data.data.length > 0 && (
          <>
            <div className="col-span-12 md:col-span-4 xl:col-span-2">
              <FormLabel>مشتری</FormLabel>
              <Controller
                control={form.control}
                name="customer_id"
                render={({ field }) => {
                  const firstOption = data?.data?.[0]?.id;
                  useEffect(() => {
                    if (
                      firstOption !== undefined &&
                      (field.value === undefined ||
                        field.value === "" ||
                        field.value === 0)
                    ) {
                      field.onChange(firstOption);
                    }
                  }, [firstOption, field.value, field]);
                  return (
                    <FormSelect {...field}>
                      {data.data.map((item: any) => (
                        <option key={item.id} value={item.id}>
                          {item.full_name}
                        </option>
                      ))}
                    </FormSelect>
                  );
                }}
              />
            </div>

            <div className="col-span-12 md:col-span-4 xl:col-span-2">
              <FormLabel>شماره تلفن</FormLabel>
              <Controller
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormInput {...field} readOnly dir="ltr" />
                )}
              />
            </div>
          </>
        )}

        {/* یادداشت */}
        <div className="col-span-12">
          <FormLabel>یادداشت</FormLabel>
          <Controller
            control={form.control}
            name="notes"
            render={({ field }) => <FormInput {...field} />}
          />
        </div>
      </div>

      {/* مودال افزودن مشتری */}
      <Modal
        close={() => setOpenModal(false)}
        open={openModal}
        title="افزودن شخص جدید"
        cancelBtn={false}
        size="xxl">
        <CustomersForm setOpenModal={setOpenModal} />
      </Modal>
    </>
  );
};

export default CustomerFields;
