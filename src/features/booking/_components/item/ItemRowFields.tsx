import useGetData from "@/services/useGetData";
import { Controller, useWatch } from "react-hook-form";
import type { TAvailabilityData, TTherapistService } from "../../_types/type";
import { url } from "../../_fixtures/data";
import { FormInput, FormLabel, FormSelect } from "@/components/Form";
import DatePickerField from "@/components/Form/DatePicker";
import Button from "@/components/Button";
import Lucide from "@/components/Lucide";
import { useEffect } from "react";
import { Trash2 } from "lucide-react";
import { end_time, start_time } from "@/features/_fixtures/data";
import { DateObject } from "react-multi-date-picker";

type TProps = {
  form: any;
  index: number;
  isEdit: boolean;
  remove: (index: number) => void;
};

const ItemRowFields = ({ form, index, isEdit, remove }: TProps) => {
  const item = useWatch({ control: form.control, name: `items.${index}` });
  const validItemDate = !!item?.date && !!item?.start_at && !!item?.end_at;

  const { data, refetch, isFetching } = useGetData<TAvailabilityData>({
    url: validItemDate
      ? `${url}availability?date=${item?.date}&start_at=${item?.start_at}&end_at=${item?.end_at}`
      : "",
    queryKey: ["availability", item?.date, item?.start_at, item?.end_at],
    enabled: isEdit ? validItemDate : false,
  });
  const therapistId = item?.therapist_id;
  const { data: dataServices } = useGetData<TTherapistService>({
    url: therapistId ? `/wellness/therapists/${therapistId}/services` : "",
    queryKey: ["therapist_services", therapistId],
    enabled: !!therapistId,
  });

  const services = dataServices?.data || [];

  return (
    <div className="flex flex-col items-end justify-end gap-2 my-2 border border-gray-400 rounded-md md:p-3">
      {/* تاریخ و زمان */}
      <div className="flex flex-row w-full items-end gap-2">
        <div className="w-48">
          <FormLabel>تاریخ</FormLabel>
          <Controller
            control={form.control}
            name={`items.${index}.date`}
            render={({ field }) => (
              <DatePickerField
                field={field}
                placeholder="تاریخ نوبت"
                min={new DateObject()}
              />
            )}
          />
        </div>
        <div className="w-48">
          <FormLabel>زمان شروع</FormLabel>
          <Controller
            control={form.control}
            name={`items.${index}.start_at`}
            render={({ field }) => {
              const firstOption = start_time[0]?.value;
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
                  {start_time.map((item: any) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </FormSelect>
              );
            }}
          />
        </div>
        <div className="w-48">
          <FormLabel>زمان پایان</FormLabel>
          <Controller
            control={form.control}
            name={`items.${index}.end_at`}
            render={({ field }) => {
              const firstOption = end_time[0]?.value;
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
                  {end_time.map((item: any) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </FormSelect>
              );
            }}
          />
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
                className={`w-4 h-4 ${isFetching ? "animate-spin" : ""}`}
              />
            </Button>
          </div>
        )}
      </div>

      {/* درمانگر و مکان */}
      <div className="w-full flex flex-row items-center gap-2 mt-2">
        {(data || isEdit) && (
          <>
            <div className="flex-1 flex flex-col">
              <FormLabel>درمانگر</FormLabel>
              <Controller
                control={form.control}
                name={`items.${index}.therapist_id`}
                render={({ field }) => {
                  const firstOption = data?.available_therapists?.[0]?.id;
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
                  return isEdit ? (
                    <FormInput {...field} readOnly />
                  ) : (
                    <FormSelect {...field}>
                      {data?.available_therapists?.map((therapist) => (
                        <option key={therapist.id} value={therapist.id}>
                          {therapist.name}
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
                render={({ field }) => {
                  const firstOption = data?.available_rooms?.[0]?.id;
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

                  return isEdit ? (
                    <FormInput {...field} readOnly />
                  ) : (
                    <FormSelect {...field}>
                      {data?.available_rooms?.map((room) => (
                        <option key={room.id} value={room.id}>
                          {room.name}
                        </option>
                      ))}
                    </FormSelect>
                  );
                }}
              />
            </div>
          </>
        )}

        {/* سرویس و مبلغ */}
        {services && (
          <>
            <div className="flex-1 flex flex-col">
              <FormLabel>خدمت</FormLabel>
              <Controller
                control={form.control}
                name={`items.${index}.service_id`}
                render={({ field }) => {
                  const firstOption = services?.[0]?.value;

                  useEffect(() => {
                    if (
                      firstOption !== undefined &&
                      (field.value === undefined ||
                        field.value === "" ||
                        field.value === 0)
                    ) {
                      field.onChange(firstOption);

                      const selectedService = services.find(
                        (s) => s.value === firstOption
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
                      }
                    }
                  }, [firstOption, field.value, field, services, form, index]);

                  const handleChange = (
                    e: React.ChangeEvent<HTMLSelectElement>
                  ) => {
                    const value = Number(e.target.value);
                    field.onChange(value);

                    const selectedService = services.find(
                      (s) => s.value === value
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

                  return isEdit ? (
                    <FormInput {...field} readOnly />
                  ) : (
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

            <div className="flex-1 flex flex-col">
              <FormLabel>قیمت نهایی (تومان) </FormLabel>
              <Controller
                control={form.control}
                name={`items.${index}.unit_price`}
                render={({ field }) => (
                  <FormInput {...field} type="number" dir="ltr" readOnly />
                )}
              />
            </div>

            <div className="flex-1 flex flex-col">
              <FormLabel>مبلغ قابل پرداخت(تومان)</FormLabel>
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

        {/* دکمه حذف */}
        <div className="flex">
          {form.getValues("items").length > 1 && (
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
};
export default ItemRowFields;
