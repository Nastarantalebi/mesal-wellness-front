import Button from "@/components/Button";
import { FormLabel } from "@/components/Form";
import TimePickerField from "@/components/Form/TimePicker/TimePickerField";
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

  return (
    <div className="w-full mt-4 p-4 border rounded-lg bg-gray-50">
      <p className="font-semibold mb-3">زمانبندی استراحت</p>

      {fields.map((fieldItem, index) => (
        <div
          key={fieldItem.id}
          className="flex flex-col md:flex-row md:items-center gap-2 mb-2"
        >
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

          <div className="flex items-end">
            {fields.length > 1 && (
              <Button type="button" onClick={() => remove(index)} variant="danger">
                ×
              </Button>
            )}
          </div>
        </div>
      ))}

      <Button
        type="button"
        onClick={() => append({ start_time: "", end_time: "" })}
        variant="primary"
      >
      +
      </Button>
    </div>
  );
};

export default BreakForm;
