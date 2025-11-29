"use client";

import {
  type FieldValues,
  type SubmitHandler,
  type UseFormReturn,
} from "react-hook-form";
import type { TFormData } from "@/types";
import { useEffect } from "react";
import clsx from "clsx";
import FormBody from "./FormBody";
import Button from "../Button";
import { XCircle } from "lucide-react";
import { prepareFormValues } from "@/utils/formValues";

// This defines the shape of the configuration object for each dynamic field.

// Props for the main FormComponent
// The generic type is now TFormValues, which represents the shape of the form data.
type TProps<TFormValues extends FieldValues> = {
  form: UseFormReturn<TFormValues>;
  data?: TFormValues;
  onSubmit: SubmitHandler<TFormValues>;
  // `formFields` is optional, allowing for forms built entirely with `children`.
  formFields?: (TFormData<TFormValues> | undefined)[];
  formClassName?: string;
  className?: string;
  bodyClassName?: string;
  // `children` allows passing custom FormField components.
  children?: React.ReactNode;
  // Renders a custom button or the default BtnSubmit.
  button?: React.ReactNode;
  extraField?: React.ReactNode;
  size?: "large" | "small" | "custom";
  isLoading?: boolean;
  isSubmitting?: boolean;
  childrenFirst?: boolean;
  showSubmitButton?: boolean;
  disabledBtn?: boolean;
  btnSubmitText?: string;
  // title?: string;
  onClose?: () => void;
};

/**
 * A powerful, reusable form component that can be driven by a configuration
 * array (`formFields`) or by passing `FormField` components as `children`.
 */
function FormComponent<TFormValues extends FieldValues>({
  form,
  data,
  onSubmit,
  formFields,
  formClassName,
  className,
  bodyClassName,
  children,
  size = "large",
  button,
  extraField,
  // isLoading,
  isSubmitting,
  childrenFirst,
  showSubmitButton,
  btnSubmitText = "ثبت اطلاعات",
  disabledBtn = false,
  onClose,
}: // title,
TProps<TFormValues>) {
  // const { setTitle } = useBreadcrumbState();

  // useEffect(() => {
  //   if (!isLoading && title) {
  //     setTitle(title);
  //   }
  // }, [isLoading, title, setTitle]);

  useEffect(() => {
    if (data) {
      form.reset(prepareFormValues(form.getValues(), data));
    }
  }, [data, form]);

  // if (isLoading) return <LoadingSpin />;

  return (
    <form
      autoComplete="off"
      onSubmit={form.handleSubmit(onSubmit)}
      className={clsx(formClassName)}>
      <div
        className={clsx(
          "relative space-y-4 p-2 md:m-2 border border-primary-20 rounded-xl shadow bg-transparent",
          className
        )}>
        {onClose && (
          <Button
            variant="soft-danger"
            type="button"
            className="absolute top-0 end-0 m-2 p-0"
            onClick={onClose}>
            <XCircle className="text-danger size-5" />
          </Button>
        )}
        <div
          className={clsx("grid gap-4 p-2", bodyClassName, {
            "md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4": size === "small",
            "md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6":
              size === "large",
          })}>
          {childrenFirst && children}

          {/* Render dynamically generated fields if they exist */}
          <FormBody<TFormValues>
            formFields={formFields}
            control={form.control}
            // setError={form.setError}
            errors={form.formState.errors}
          />
          {/* Render any custom children passed to the component */}
          {!childrenFirst && children}
        </div>
        {/* Render the custom button or the default submit button */}
        {/* Render the custom button or the default submit button */}
        {button
          ? button
          : showSubmitButton !== false && (
              <div className="flex justify-end">
                <Button
                  disabled={disabledBtn}
                  isPending={isSubmitting || form.formState.isSubmitting}
                  variant="primary"
                  type="submit"
                  className="mt-5">
                  {btnSubmitText}
                </Button>
              </div>
            )}
      </div>

      {extraField}
    </form>
  );
}

export default FormComponent;
