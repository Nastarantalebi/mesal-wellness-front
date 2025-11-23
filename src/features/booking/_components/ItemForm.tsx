import Button from "@/components/Button";
import { FormInput, FormLabel, FormSelect } from "@/components/Form";
import { Controller, useFieldArray, useWatch } from "react-hook-form";
import type {
  TAvailabilityData,
  TCreateData,
  TTherapistService,
} from "../_types/type";
import DatePickerField from "@/components/Form/DatePicker";
import TimePickerField from "@/components/Form/TimePicker";
import { useEffect } from "react";
import { itemsValues, url } from "../_fixtures/data";
import useGetData from "@/services/useGetData";
import Lucide from "@/components/Lucide";
import { PlusIcon, Trash2 } from "lucide-react";

interface TProps {
  form: any;
  dataCreate?: TCreateData;
  className?: string;
  selectedRecord: any;
}

// hook جداگانه برای انتخاب اولین option
const useFirstOptionIfZero = (
  value: any,
  onChange: (v: any) => void,
  options: any[]
) => {
  useEffect(() => {
    if ((value === 0 || value === "") && options?.[0]?.value !== undefined) {
      onChange(options[0].value);
    }
  }, [value, onChange, options]);
};

// Component جدا برای هر آیتم
interface ItemRowProps {
  form: any;
  index: number;
  dataServices: TTherapistService | undefined;
  isEdit: boolean;
  remove: (index: number) => void;
}

const ItemRow = ({
  form,
  index,
  dataServices,
  isEdit,
  remove,
}: ItemRowProps) => {
  const item = useWatch({ control: form.control, name: `items.${index}` });
  const validItemDate = !!item?.date && !!item?.start_at && !!item?.end_at;

  // availability hook خارج از map
  const { data, refetch, isFetching } = useGetData<TAvailabilityData>({
    url: validItemDate
      ? `${url}availability?date=${item?.date}&start_at=${item?.start_at}&end_at=${item?.end_at}`
      : "",
    queryKey: ["availability", item?.date, item?.start_at, item?.end_at],
    enabled: isEdit ? validItemDate : false,
  });

  const services = dataServices?.data || [];

  return (
    <div className="flex flex-col items-end justify-end gap-2 my-2 border border-gray-400 rounded-md md:p-3">
      {/* تاریخ و زمان */}
      <div className="flex flex-row w-full gap-2">
        <div className="w-48 flex flex-col">
          <FormLabel>تاریخ</FormLabel>
          <Controller
            control={form.control}
            name={`items.${index}.date`}
            render={({ field }) => <DatePickerField field={field} />}
          />
        </div>
        <div className="w-32 flex flex-col">
          <FormLabel>زمان شروع</FormLabel>
          <Controller
            control={form.control}
            name={`items.${index}.start_at`}
            render={({ field }) => <TimePickerField field={field} />}
          />
        </div>
        <div className="w-32 flex flex-col">
          <FormLabel>زمان پایان</FormLabel>
          <Controller
            control={form.control}
            name={`items.${index}.end_at`}
            render={({ field }) => <TimePickerField field={field} />}
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
                  useFirstOptionIfZero(
                    field.value,
                    field.onChange,
                    data?.available_therapists || []
                  );
                  return isEdit ? (
                    <FormInput {...field} readOnly />
                  ) : (
                    <FormSelect {...field}>
                      {data?.available_therapists.map((therapist) => (
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
                  return isEdit ? (
                    <FormInput {...field} readOnly />
                  ) : (
                    <FormSelect {...field}>
                      {data?.available_rooms.map((room) => (
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
              <FormLabel>مبلغ خدمت</FormLabel>
              <Controller
                control={form.control}
                name={`items.${index}.unit_price`}
                render={({ field }) => (
                  <FormInput {...field} type="number" dir="ltr" readOnly />
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

const ItemForm = ({ form, className, dataCreate, selectedRecord }: TProps) => {
  const isEdit = !!selectedRecord;
  console.log(dataCreate);
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  });

  if (fields.length === 0) append(itemsValues);

  const items = useWatch({ control: form.control, name: "items" });

  // گرفتن همه therapist ids
  const therapistIds = items?.map((i: any) => i?.therapist_id).filter(Boolean);
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

        {fields.map((fieldItem, index) => (
          <ItemRow
            key={fieldItem.id}
            form={form}
            index={index}
            dataServices={dataServices}
            isEdit={isEdit}
            remove={remove}
          />
        ))}
      </div>
    </>
  );
};

export default ItemForm;
