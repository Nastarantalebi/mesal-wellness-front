import Button from "@/components/Button";
import { FormLabel, FormSelect } from "@/components/Form";
import { Controller, useFieldArray } from "react-hook-form";
import type { TCreateData } from "../_types/type";
import DatePickerField from "@/components/Form/DatePicker";

interface TProps {
  form: any;
  dataCreate?: TCreateData;
  className?: string;
}

const ItemForm = ({ form, dataCreate, className }: TProps) => {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  });

  if (fields.length === 0)
    append({
      end_at: "",
      start_at: "",
      resource_id: 0,
      service_id: 0,
      therapist_id: 0,
    });

  return (
    <div
      className={`w-full mt-4 p-4 border rounded-lg bg-gray-50 col-span-full ${className}`}>
      <div className="flex items-center justify-between">
        <p className="font-semibold mb-3">آیتم‌ها</p>
        <Button
          type="button"
          onClick={() =>
            append({
              end_at: "",
              start_at: "",
              resource_id: 0,
              service_id: 0,
              therapist_id: 0,
            })
          }
          variant="primary">
          افزودن جدید
        </Button>
      </div>
      {fields.map((fieldItem, index) => (
        <div
          key={fieldItem.id}
          className="flex flex-row items-end justify-end gap-2 mb-2">
          <div className="flex-1 flex flex-col">
            <FormLabel>زمان شروع</FormLabel>
            <Controller
              control={form.control}
              name={`items.${index}.start_at`}
              render={({ field }) => (
                <DatePickerField
                  field={{
                    ...field,
                    value: field.value || "",
                    onChange: (val: string) => field.onChange(val),
                  }}
                />
              )}
            />
          </div>
          <div className="flex-1 flex flex-col">
            <FormLabel>زمان پایان</FormLabel>
            <Controller
              control={form.control}
              name={`items.${index}.end_at`}
              render={({ field }) => (
                <DatePickerField
                  field={{
                    ...field,
                    value: field.value || "",
                    onChange: (val: string) => field.onChange(val),
                  }}
                />
              )}
            />
          </div>
          <div className="flex-1 flex flex-col">
            <FormLabel> درمانگر</FormLabel>
            <Controller
              control={form.control}
              name={`items.${index}.therapist_id`}
              render={() => (
                <FormSelect>
                  {dataCreate?.data.therapists.map((item, index) => (
                    <option value={item.value} key={index}>
                      {item.label}
                    </option>
                  ))}
                </FormSelect>
              )}
            />
          </div>
          <div className="flex-1 flex flex-col">
            <FormLabel> خدمات</FormLabel>
            <Controller
              control={form.control}
              name={`items.${index}.service_id`}
              render={() => (
                <FormSelect>
                  {dataCreate?.data.services.map((item, index) => (
                    <option value={item.value} key={index}>
                      {item.label}
                    </option>
                  ))}
                </FormSelect>
              )}
            />
          </div>
          <div className="flex-1 flex flex-col">
            <FormLabel> مکان</FormLabel>
            <Controller
              control={form.control}
              name={`items.${index}.resource_id`}
              render={() => (
                <FormSelect>
                  {dataCreate?.data.resources.map((item, index) => (
                    <option value={item.value} key={index}>
                      {item.label}
                    </option>
                  ))}
                </FormSelect>
              )}
            />
          </div>

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
      ))}
    </div>
  );
};

export default ItemForm;
