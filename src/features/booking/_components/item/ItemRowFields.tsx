import useGetData from "@/services/useGetData";
import { Controller, useWatch } from "react-hook-form";
import type { TAvailabilityData, TTherapistService } from "../../_types/type";
import { timeToMinutes, url } from "../../_fixtures/data";
import { FormInput, FormLabel, FormSelect } from "@/components/Form";
import DatePickerField from "@/components/Form/DatePicker";
import Button from "@/components/Button";
import Lucide from "@/components/Lucide";
import { useEffect } from "react";
import { Trash2 } from "lucide-react";
import { end_time, start_time } from "@/features/_fixtures/data";
import { DateObject } from "react-multi-date-picker";
import clsx from "clsx";

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
  const startAt = form.watch(`items.${index}.start_at`);
  const endAt = form.watch(`items.${index}.end_at`);

  const isInvalidTime = (() => {
    const start = timeToMinutes(startAt);
    const end = timeToMinutes(endAt);

    if (start === null || end === null) return false;
    return start >= end;
  })();

  const services = dataServices?.data || [];
  const errorField = form.formState.errors.items;
  console.log(errorField);
  return (
    <div className="flex flex-col items-end justify-end gap-2 my-2 border border-gray-400 rounded-md p-2 md:p-3">
      {/* دکمه حذف */}
      <div className="flex items-end justify-end">
        {form.getValues("items").length > 1 && (
          <Button
            type="button"
            onClick={() => remove(index)}
            variant="outline-danger">
            <Trash2 size={16} />
          </Button>
        )}
      </div>
      {/* تاریخ و زمان */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:flex md:flex-row items-end gap-2">
        <div className="w-full md:w-48">
          <FormLabel>تاریخ</FormLabel>
          <Controller
            control={form.control}
            name={`items.${index}.date`}
            render={({ field }) => (
              <DatePickerField
                inputClassName={clsx({
                  "!border !border-danger": errorField?.[index]?.date,
                })}
                field={field}
                placeholder="تاریخ نوبت"
                min={new DateObject()}
              />
            )}
          />
        </div>

        <div className="w-full md:w-48">
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

        <div className="w-full md:w-48">
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
          {isInvalidTime && (
            <p className="text-danger text-xs text-right mt-1">
              زمان پایان باید بعد از زمان شروع باشد
            </p>
          )}
        </div>

        {validItemDate && (
          <div className="flex items-center justify-end w-full md:w-auto">
            <Button
              type="button"
              variant="outline-primary"
              size="sm"
              disabled={isInvalidTime}
              onClick={() => refetch()}
              className="whitespace-nowrap flex items-center gap-1 h-9 mx-auto cursor-pointer">
              <Lucide
                icon={isFetching ? "Loader" : "Search"}
                className={`w-4 h-4 ${isFetching ? "animate-spin" : ""}`}
              />
            </Button>
          </div>
        )}
      </div>

      {/* ماساژیست، مکان، سرویس، مبلغ */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-3 mt-3">
        {(data || isEdit) && (
          <>
            <div className="flex flex-col">
              <FormLabel>ماساژیست</FormLabel>
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
                    <FormSelect
                      {...field}
                      className={clsx({
                        "!border !border-danger":
                          errorField?.[index]?.therapist_id,
                      })}>
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

            <div className="flex flex-col">
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
                    <FormSelect
                      {...field}
                      className={clsx({
                        "!border !border-danger":
                          errorField?.[index]?.resource_id,
                      })}>
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

        {services && !!services.length && (
          <>
            <div className="flex flex-col">
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

                  const handleChange = (e: any) => {
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
                    <FormSelect
                      {...field}
                      onChange={handleChange}
                      className={clsx({
                        "!border !border-danger":
                          errorField?.[index]?.service_id,
                      })}>
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

            <div className="flex flex-col">
              <FormLabel>قیمت نهایی (تومان)</FormLabel>
              <Controller
                control={form.control}
                name={`items.${index}.unit_price`}
                render={({ field }) => (
                  <FormInput
                    {...field}
                    type="number"
                    dir="ltr"
                    readOnly
                    money
                  />
                )}
              />
            </div>

            <div className="flex flex-col">
              <FormLabel>مبلغ قابل پرداخت (تومان)</FormLabel>
              <Controller
                control={form.control}
                name={`items.${index}.total_price`}
                render={({ field }) => (
                  <FormInput {...field} type="number" dir="ltr" money />
                )}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default ItemRowFields;
