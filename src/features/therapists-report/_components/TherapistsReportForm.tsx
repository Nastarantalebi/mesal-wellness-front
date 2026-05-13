import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, type Dispatch, type SetStateAction } from "react";
import FormComponent from "@/components/Form/Form";
import useFormData from "../_hooks/useFormData";
import { initialValues, schema } from "../_fixtures/data";
import Button from "@/components/Button";
type TProps = {
  setOpen: Dispatch<SetStateAction<boolean>>;
  setFormValues: Dispatch<any>;
  formValues: any;
};
function TherapistsReportForm({ setOpen, setFormValues, formValues }: TProps) {
  const form = useForm<any>({
    resolver: zodResolver(schema),
    defaultValues: initialValues,
    mode: "onChange",
  });
  const sortWatch = form.watch("sort_by");
  const { fields } = useFormData(sortWatch);
  useEffect(() => {
    if (formValues) {
      form.reset(formValues);
    }
  }, [formValues]);
  return (
    <FormComponent
      form={form}
      size="small"
      onSubmit={(data: any) => {
        const payload = {
          ...data,
          sort_dir: data.sort_by ? data.sort_dir : null,
        };
        const filledFields = Object.fromEntries(
          Object.entries(payload).filter(([_, value]) => {
            return value !== undefined && value !== "" && value !== null;
          }),
        );
        setOpen(false);
        setFormValues(filledFields);
      }}
      isSubmitting={false}
      formFields={fields}
      button={
        <div className="flex flex-col sm:flex-row sm:justify-end sm:items-center gap-2 mt-3">
          <Button
            type="reset"
            onClick={() => {
              setFormValues(null);
              setOpen(false);
            }}
            variant="danger">
            حذف فیلتر
          </Button>
          <Button type="submit" variant="primary">
            اعمال فیلتر
          </Button>
        </div>
      }
    />
  );
}

export default TherapistsReportForm;
