import { Controller, useWatch } from "react-hook-form";
import { FormInput, FormLabel, FormSelect } from "@/components/Form";
import useGetData from "@/services/useGetData";
import type { TCustomerSearch } from "../_types/type";
import Button from "@/components/Button";
import Lucide from "@/components/Lucide";
import { useEffect, useState } from "react";
import Modal from "@/components/Headless/Dialog/Modal";
import CustomersForm from "@/features/customers/_components/CustomersForm";

interface TProps {
  form: any;
  dataCreate: any;
  selectedRecord: any;
  dataById?: any;
  className?: string;
}

const BookingFields = ({ form,dataCreate, selectedRecord, className ,dataById}: TProps) => {
  console.log(dataCreate)
  console.log(dataById)
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
    url: `/wellness/customers/search?q=${search_item}`,
    queryKey: ["customer_search", search_item],
    enabled: false,
  });
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
      <div
        className={`grid grid-cols-6 gap-2 w-full mt-4 p-4 border rounded-lg bg-gray-50 col-span-full ${className}`}>
        <div className="flex items-center justify-start gap-2 w-fit">
          {" "}
          <div>
            <FormLabel>یافتن مشتری</FormLabel>
            <Controller
              control={form.control}
              name="search_customer"
              render={({ field }) => <FormInput {...field} />}
            />
          </div>
          {!!search_item && (
            <div className="flex items-center">
              <Button
                type="button"
                variant="outline-primary"
                size="sm"
                onClick={() => refetch()}
                className="whitespace-nowrap flex items-center gap-1 h-9">
                <Lucide
                  icon={`${isFetching ? "Loader" : "Search"}`}
                  className={`w-4 h-4 ${isFetching ? "animate-spin" : ""}`}
                />
              </Button>
            </div>
          )}
        </div>
        {!search_item ? (
          <div className="text-gray-500 text-sm col-span-full mb-1">
            برای یافتن مشتری، نام یا شماره تلفن را وارد کنید.
          </div>
        ) : !data ? (
          <div className="text-gray-500 text-sm col-span-full mb-1">
            برای دریافت نتیجه، روی دکمه جستجو کلیک کنید.
          </div>
        ) : data.data.length === 0 ? (
          <div className="flex flex-row items-center justify-between gap-1 bg-red-50 text-red-700 p-3 rounded-lg col-span-full border border-red-200">
            <span>مشتری یافت نشد.</span>
            <Button
              type="button"
              variant="outline-primary"
              className=" text-sm w-fit"
              onClick={() => setOpenModal(true)}>
              + مشتری جدید
            </Button>
          </div>
        ) : (
          <>
            <div className="mb-4">
              <FormLabel>مشتری</FormLabel>
              <Controller
                control={form.control}
                name="customer_id"
                render={({ field }) => (
                  <FormSelect {...field}>
                    {data.data.map((item: any) => (
                      <option key={item.id} value={item.id}>
                        {item.full_name}
                      </option>
                    ))}
                  </FormSelect>
                )}
              />
            </div>

            <div className="mb-4">
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
        {/* <div >
          <FormLabel>مبلغ کل</FormLabel>
          <Controller
            control={form.control}
            name="total_amount"
            render={({ field }) => <FormInput {...field} />}
          />
        </div>
        <div >
          <FormLabel>بیعانه</FormLabel>
          <Controller
            control={form.control}
            name="deposit"
            render={({ field }) => <FormInput {...field} />}
          />
        </div>
        <div >
          <FormLabel>مبلغ قابل پرداخت</FormLabel>
          <Controller
            control={form.control}
            name="payable_amount"
            render={({ field }) => <FormInput {...field} />}
          />
        </div> */}
        <div className="col-span-full">
          <FormLabel>یادداشت</FormLabel>
          <Controller
            control={form.control}
            name="notes"
            render={({ field }) => <FormInput {...field} />}
          />
        </div>
      </div>
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

export default BookingFields;
