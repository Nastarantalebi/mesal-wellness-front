import Button from "@/components/Button";
import { FormInput, FormLabel, FormSelect } from "@/components/Form";
import { Controller, useFieldArray, useWatch } from "react-hook-form";
import type { TAvailabilityData, TTherapistService } from "../_types/type";
import DatePickerField from "@/components/Form/DatePicker";
import TimePickerField from "@/components/Form/TimePicker";
import { useEffect } from "react";
import { itemsValues, url } from "../_fixtures/data";
import useGetData from "@/services/useGetData";
import Lucide from "@/components/Lucide";
import { PlusIcon, Trash2 } from "lucide-react";

interface TProps {
  form: any;
  className?: string;
}

const ItemForm = ({ form, className }: TProps) => {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  });

  if (fields.length === 0) append(itemsValues);

  const items = useWatch({ control: form.control, name: "items" });

  // آخرین آیتم برای availability
  const lastItem = items?.[items.length - 1] || {};
  const date = lastItem.date;
  const start_at = lastItem.start_at;
  const end_at = lastItem.end_at;
  const useFirstOptionIfZero = (field: any, options: any[]) => {
    const firstOption = options?.[0]?.value;
    useEffect(() => {
      if (
        (field.value === 0 || field.value === "") &&
        firstOption !== undefined
      ) {
        field.onChange(firstOption);
      }
    }, [field.value, firstOption]);
  };

  const { data, refetch, isFetching } = useGetData<TAvailabilityData>({
    url: `${url}availability?date=${date}&start_at=${start_at}&end_at=${end_at}`,
    queryKey: ["availability", date, start_at, end_at],
    enabled: false,
  });

  // گرفتن همه سرویس‌ها برای تمام آیتم‌ها بر اساس درمانگر
  const therapistIds = items.map((i: any) => i.therapist_id).filter(Boolean);
  const { data: dataServices } = useGetData<TTherapistService>({
    url:
      therapistIds.length > 0
        ? `/wellness/therapists/${
            therapistIds[therapistIds.length - 1]
          }/services`
        : "",
    queryKey: ["therapist_services", therapistIds.join("-")],
    enabled: therapistIds.length > 0,
  });
  useEffect(() => {
    const totalPrice =
      items?.reduce(
        (sum: number, item: any) => sum + (item.total_price || 0),
        0
      ) || 0;

    const totalPayable =
      items?.reduce(
        (sum: number, item: any) => sum + (item.payable_amount || 0),
        0
      ) || 0;

    form.setValue("total_price", totalPrice);
    form.setValue("payable_amount", totalPayable);
  }, [items, form]);

  return (
    <>
      <div
        className={`w-full mt-4 p-4 border rounded-lg bg-gray-50 col-span-full ${className}`}>
        <div className="flex items-center justify-between">
          <p className="font-semibold mb-3">آیتم‌ها</p>
          <Button
            type="button"
            onClick={() => append(itemsValues)}
            variant="outline-primary">
            <PlusIcon size={16} />
          </Button>
        </div>

        {fields.map((fieldItem, index) => {
          const errorItem = form.formState.errors.items?.[index];
          const services = dataServices?.data || [];
          const item = items?.[index] || {};
          const validItemDate = !!item.date && !!item.start_at && !!item.end_at;
          return (
            <div
              key={fieldItem.id}
              className="flex flex-col items-end justify-end gap-2 my-2 border border-gray-400 rounded-md md:p-3">
              {/* تاریخ و زمان */}
              <div className="flex flex-row w-full gap-2">
                <div className="w-48 flex flex-col">
                  <FormLabel>تاریخ</FormLabel>
                  <Controller
                    control={form.control}
                    name={`items.${index}.date`}
                    render={({ field }) => <DatePickerField field={field} />}
                  />
                  {errorItem?.date && (
                    <p className="text-red-500 text-sm">
                      {errorItem.date.message}
                    </p>
                  )}
                </div>

                <div className="w-32 flex flex-col">
                  <FormLabel>زمان شروع</FormLabel>
                  <Controller
                    control={form.control}
                    name={`items.${index}.start_at`}
                    render={({ field }) => <TimePickerField field={field} />}
                  />
                  {errorItem?.start_at && (
                    <p className="text-red-500 text-sm">
                      {errorItem.start_at.message}
                    </p>
                  )}
                </div>

                <div className="w-32 flex flex-col">
                  <FormLabel>زمان پایان</FormLabel>
                  <Controller
                    control={form.control}
                    name={`items.${index}.end_at`}
                    render={({ field }) => <TimePickerField field={field} />}
                  />
                  {errorItem?.end_at && (
                    <p className="text-red-500 text-sm">
                      {errorItem.end_at.message}
                    </p>
                  )}
                </div>

                {validItemDate && (
                  <div className="flex items-center">
                    <Button
                      type="button"
                      variant="outline-primary"
                      size="sm"
                      onClick={() => refetch()}
                      className="whitespace-nowrap flex items-center gap-1 h-9">
                      <Lucide
                        icon={isFetching ? "Loader" : "Search"}
                        className={`w-4 h-4 ${
                          isFetching ? "animate-spin" : ""
                        }`}
                      />
                    </Button>
                  </div>
                )}
              </div>

              {/* درمانگر، مکان و سرویس */}
              <div className="w-full flex flex-row items-center gap-2">
                {data && (
                  <>
                    <div className="flex-1 flex flex-col">
                      <FormLabel>درمانگر</FormLabel>
                      <Controller
                        control={form.control}
                        name={`items.${index}.therapist_id`}
                        render={({ field }) => {
                          useFirstOptionIfZero(
                            field,
                            data?.available_therapists || []
                          );
                          return (
                            <FormSelect {...field}>
                              {data?.available_therapists.map((item) => (
                                <option key={item.id} value={item.id}>
                                  {item.name}
                                </option>
                              ))}
                            </FormSelect>
                          );
                        }}
                      />
                    </div>

                    <div className="flex-1 flex flex-col">
                      <FormLabel>مکان</FormLabel>
                      <Controller
                        control={form.control}
                        name={`items.${index}.resource_id`}
                        render={({ field }) => (
                          <FormSelect {...field}>
                            {data?.available_rooms.map((item) => (
                              <option key={item.id} value={item.id}>
                                {item.name}
                              </option>
                            ))}
                          </FormSelect>
                        )}
                      />
                    </div>
                  </>
                )}
                {dataServices && (
                  <>
                    <div className="flex-1 flex flex-col">
                      <FormLabel>خدمت</FormLabel>
                      <Controller
                        control={form.control}
                        name={`items.${index}.service_id`}
                        render={({ field }) => {
                          const handleChange = (e: any) => {
                            field.onChange(e);
                            const selectedService = services.find(
                              (s) => s.value === Number(e.target.value)
                            );
                            if (selectedService) {
                              form.setValue(
                                `items.${index}.unit_price`,
                                selectedService.custom_price
                              );
                              form.setValue(
                                `items.${index}.total_price`,
                                selectedService.custom_price
                              );
                            } else {
                              form.setValue(`items.${index}.unit_price`, 0);
                              form.setValue(`items.${index}.total_price`, 0);
                            }
                          };
                          return (
                            <FormSelect {...field} onChange={handleChange}>
                              {services.map((s) => (
                                <option key={s.value} value={s.value}>
                                  {s.label}
                                </option>
                              ))}
                            </FormSelect>
                          );
                        }}
                      />
                    </div>

                    {/* مبلغ */}
                    <div className="flex-1 flex flex-col">
                      <FormLabel>مبلغ خدمت</FormLabel>
                      <Controller
                        control={form.control}
                        name={`items.${index}.unit_price`}
                        render={({ field }) => (
                          <FormInput
                            {...field}
                            type="number"
                            dir="ltr"
                            readOnly
                          />
                        )}
                      />
                    </div>
                    <div className="flex-1 flex flex-col">
                      <FormLabel>مبلغ قابل پرداخت</FormLabel>
                      <Controller
                        control={form.control}
                        name={`items.${index}.total_price`}
                        render={({ field }) => (
                          <FormInput {...field} type="number" dir="ltr" />
                        )}
                      />
                    </div>
                  </>
                )}
                {/* حذف */}
                <div className="flex">
                  {fields.length > 1 && (
                    <Button
                      type="button"
                      onClick={() => remove(index)}
                      variant="outline-danger">
                      <Trash2 size={16} />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="w-full mt-4 p-4 border rounded-lg bg-gray-50 col-span-full grid grid-cols-3 gap-2">
        <div className="flex-1 flex flex-col">
          <FormLabel> بیعانه</FormLabel>
          <Controller
            control={form.control}
            name="deposit"
            render={({ field }) => (
              <FormInput {...field} type="number" dir="ltr" />
            )}
          />
        </div>
        <div className="flex-1 flex flex-col">
          <FormLabel>مبلغ کل</FormLabel>
          <Controller
            control={form.control}
            name="total_amount"
            render={({ field }) => (
              <FormInput {...field} type="number" dir="ltr" />
            )}
          />
        </div>
        <div className="flex-1 flex flex-col">
          <FormLabel>مبلغ قابل پرداخت</FormLabel>
          <Controller
            control={form.control}
            name="payable_amount"
            render={({ field }) => (
              <FormInput {...field} type="number" dir="ltr" />
            )}
          />
        </div>
      </div>
    </>
  );
};

export default ItemForm;
