import Button from "@/components/Button";
import { FormLabel } from "@/components/Form";
import TimePickerField from "@/components/Form/TimePicker";
import { PlusIcon, TrashIcon } from "lucide-react";
import { Controller, useFieldArray } from "react-hook-form";

interface TProps {
  form: any;
}

const BreakForm = ({ form }: TProps) => {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "breaks",
  });

  if (fields.length === 0) append({ start_time: "", end_time: "" });
  const errors = form.formState.errors;
  return (
    <div className="w-full mt-4 p-1 md:p-4 border rounded-lg bg-gray-50 md:col-span-2">
      <div className="flex items-center justify-between">
        <p className="font-semibold mb-3">زمانبندی استراحت</p>
        <button
          type="button"
          onClick={() => append({ start_time: "", end_time: "" })}>
          <PlusIcon className="text-blue-700 w-5 h-5" />
        </button>
      </div>
      {fields.map((fieldItem, index) => {
        const breakErrors = errors.breaks?.[index];
        return (
          <div
            key={fieldItem.id}
            className="flex flex-row items-end justify-end gap-2 mb-2">
            <div className="flex-1 flex flex-col">
              <FormLabel>شروع</FormLabel>
              <Controller
                control={form.control}
                name={`breaks.${index}.start_time`}
                render={({ field }) => (
                  <TimePickerField
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
              <FormLabel>پایان</FormLabel>
              <Controller
                control={form.control}
                name={`breaks.${index}.end_time`}
                render={({ field }) => (
                  <>
                    {" "}
                    <TimePickerField
                      field={{
                        ...field,
                        value: field.value || "",
                        onChange: (val: string) => field.onChange(val),
                      }}
                    />
                    {breakErrors?.end_time && (
                      <p className=" text-xs  mt-2 text-danger text-right">
                        {breakErrors.end_time.message}
                      </p>
                    )}
                  </>
                )}
              />
            </div>

            <div className="flex">
              {fields.length > 1 && (
                <Button
                  type="button"
                  onClick={() => remove(index)}
                  variant="outline-danger">
                  <TrashIcon className="w-5 h-5 " />
                </Button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BreakForm;
