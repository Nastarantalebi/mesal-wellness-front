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
import { PlusIcon } from "lucide-react";

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

  const items = useWatch({
    control: form.control,
    name: "items",
  });

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

  const validDate = !!date && !!start_at && !!end_at;

  return (
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

        // مقدار درمانگر برای هر آیتم
        const therapistId = items?.[index]?.therapist_id;

        // گرفتن سرویس‌ها بر اساس درمانگر انتخاب‌شده
        const { data: dataServices, refetch: refetchServices } =
          useGetData<TTherapistService>({
            url: therapistId
              ? `/wellness/therapists/${therapistId}/services`
              : "",
            queryKey: ["therapist_services", therapistId],
            enabled: !!therapistId,
          });

        // وقتی درمانگر تغییر کرد، refetch سرویس‌ها
        useEffect(() => {
          if (therapistId) refetchServices();
        }, [therapistId]);

        return (
          <div
            key={fieldItem.id}
            className="flex flex-row items-end justify-end gap-2 mb-2">
            {/* تاریخ */}
            <div className="w-48 flex flex-col">
              <FormLabel>تاریخ</FormLabel>
              <Controller
                control={form.control}
                name={`items.${index}.date`}
                render={({ field }) => <DatePickerField field={field} />}
              />
              {errorItem?.start_at && (
                <p className="text-red-500 text-sm">
                  {errorItem.start_at.message}
                </p>
              )}
            </div>

            {/* زمان شروع */}
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

            {/* زمان پایان */}
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

            {validDate && (
              <div className="flex items-center">
                <Button
                  type="button"
                  variant="outline-primary"
                  size="sm"
                  onClick={() => refetch()}
                  className={`whitespace-nowrap flex items-center gap-1 h-9`}>
                  <Lucide
                    icon={isFetching ? "Loader" : "Search"}
                    className={`w-4 h-4 ${isFetching ? "animate-spin" : ""}`}
                  />
                </Button>
              </div>
            )}

            {/* درمانگر */}
            <div className="flex-1 flex flex-col">
              <FormLabel>درمانگر</FormLabel>
              <Controller
                control={form.control}
                name={`items.${index}.therapist_id`}
                render={({ field }) => {
                  useFirstOptionIfZero(field, data?.available_therapists || []);
                  return (
                    <FormSelect
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                      }}>
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

            {/* خدمات */}
            <div className="flex-1 flex flex-col">
              <FormLabel>خدمات</FormLabel>
              <Controller
                control={form.control}
                name={`items.${index}.service_id`}
                render={({ field }) => {
                  useFirstOptionIfZero(field, dataServices?.data || []);

                  // وقتی سرویس تغییر کرد، قیمت‌ها را ست کن
                  const handleChange = (e: any) => {
                    field.onChange(e);
                    const selectedService = dataServices?.data?.find(
                      (s) => s.value === Number(e.target.value)
                    );
                    if (selectedService) {
                      form.setValue(
                        `items.${index}.unit_price`,
                        selectedService.custom_price || 0
                      );
                      form.setValue(
                        `items.${index}.total_price`,
                        selectedService.custom_price || 0
                      );
                    } else {
                      form.setValue(`items.${index}.unit_price`, 0);
                      form.setValue(`items.${index}.total_price`, 0);
                    }
                  };
                  return (
                    <FormSelect {...field} onChange={handleChange}>
                      {dataServices?.data?.map((item) => (
                        <option key={item.value} value={item.value}>
                          {item.label}
                        </option>
                      ))}
                    </FormSelect>
                  );
                }}
              />
            </div>
            {/* مکان */}
            <div className="flex-1 flex flex-col">
              <FormLabel>مکان</FormLabel>
              <Controller
                control={form.control}
                name={`items.${index}.resource_id`}
                render={({ field }) => {
                  return (
                    <FormSelect {...field}>
                      {data?.available_rooms.map((item) => (
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
              <FormLabel>مبلغ خدمت</FormLabel>
              <Controller
                control={form.control}
                name={`items.${index}.unit_price`}
                render={({ field }) => {
                  return (
                    <FormInput
                      {...field}
                      type="number"
                      dir="ltr"
                      readOnly={true}
                    />
                  );
                }}
              />
            </div>
            <div className="flex-1 flex flex-col">
              <FormLabel>مبلغ قابل پرداخت</FormLabel>
              <Controller
                control={form.control}
                name={`items.${index}.total_price`}
                render={({ field }) => {
                  return <FormInput {...field} type="number" dir="ltr" />;
                }}
              />
            </div>

            {/* حذف */}
            <div className="flex">
              {fields.length > 1 && (
                <Button
                  type="button"
                  onClick={() => remove(index)}
                  variant="danger">
                  ×
                </Button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ItemForm;
