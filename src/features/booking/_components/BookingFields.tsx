import { Controller, useWatch } from "react-hook-form";
import { FormInput, FormLabel, FormSelect } from "@/components/Form";
import useGetData from "@/services/useGetData";
import type { TCustomerSearch } from "../_types/type";
import Button from "@/components/Button";
import Lucide from "@/components/Lucide";
import { useEffect } from "react";

interface TProps {
  form: any;
  dataCreate?: any;
  className?: string;
}

const BookingFields = ({ form, className }: TProps) => {
  const search_item = useWatch({
    control: form.control,
    name: "search_customer",
  });
  const selectedCustomerId = useWatch({
    control: form.control,
    name: "customer_id",
  });
  const { data, refetch } = useGetData<TCustomerSearch>({
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
    <div
      className={`grid grid-cols-3 gap-2 w-full mt-4 p-4 border rounded-lg bg-gray-50 col-span-full ${className}`}>
      {/* یافتن مشتری */}
      <div className="flex items-center justify-start gap-2 border w-fit">
        {" "}
        <div className="mb-4">
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
              <Lucide icon="Search" className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
      {/* مشتری */}
      {data?.data && Array.isArray(data.data) ? (
        data.data.length > 0 ? (
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
        ) : (
          <div>
            <span>مشتری یافت نشد</span>
            <span>برای اضافه کردن مشتری جدید کلیک کنید</span>
          </div>
        )
      ) : (
        <span>برای یافتن مشتری نام یا شماره تلفن انرا وارد کنید</span>
      )}

      {/* یادداشت */}
      <div className="mb-4 col-span-3">
        <FormLabel>یادداشت</FormLabel>
        <Controller
          control={form.control}
          name="note"
          render={({ field }) => <FormInput {...field} />}
        />
      </div>
    </div>
  );
};

export default BookingFields;
