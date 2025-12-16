import { useEffect, useRef } from "react";
import useFormField from "./useFormField";
import type { Control, FieldErrors, FieldValues } from "react-hook-form";
import type { TFormData } from "@/types";
import FormLabel from "./FormLabel";
import { SeparatorHorizontal } from "lucide-react";
import FormField from "./FormField";
import clsx from "clsx";

type TProps<TFormValues extends FieldValues> = {
  formFields?: (TFormData<TFormValues> | undefined)[];
  // rowIndex?: number;
  // setError?: UseFormSetError<TFormValues>;
  onLastFieldEnter?: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<TFormValues, any, TFormValues>;
  errors: FieldErrors<TFormValues>;
};

function FormBody<TFormValues extends FieldValues>({
  formFields,
  // rowIndex,
  // setError,
  control,
  onLastFieldEnter,
  errors,
}: TProps<TFormValues>) {
  const fieldRenderer = useFormField<TFormValues>();

  const inputRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, formFields?.length);
  }, [formFields]);

  // بالای فایل: یک هِلپر برای تشخیص قابل فوکوس بودن
  const isFocusable = (el: HTMLElement | null) => {
    if (!el) return false;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const anyEl = el as any;
    const ariaDisabled = el.getAttribute?.("aria-disabled") === "true";
    const dataReadonly = el.getAttribute?.("data-read-only") === "true";
    const dataDisabled = el.getAttribute?.("data-disabled") === "true";

    // خود کامپوننت‌ها
    const disabled =
      !!anyEl.disabled ||
      !!anyEl.readOnly ||
      ariaDisabled ||
      dataReadonly ||
      dataDisabled;

    // اگر نمایش داده نمی‌شود هم اسکپ
    const rect = el.getBoundingClientRect?.();
    const hidden = !rect || (rect.width === 0 && rect.height === 0);

    return !disabled && !hidden;
  };

  const handleEnterKey = (
    e: React.KeyboardEvent<HTMLElement>,
    index: number
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();

      setTimeout(() => {
        // از بعدی شروع کن و اولین فوکوس‌پذیر را پیدا کن
        const nextInput = inputRefs.current
          .slice(index + 1)
          .find((el) => isFocusable(el));

        if (nextInput) {
          // اگر Select تریگر است
          if (nextInput.dataset?.selectTrigger === "true") {
            nextInput.focus();
            setTimeout(() => {
              (nextInput as HTMLButtonElement).click();
            }, 20);
          } else {
            nextInput.focus();
          }
        } else {
          onLastFieldEnter?.();
        }
      }, 10);
    }
  };
  return (
    <>
      {formFields?.map((fieldConfig, index) => {
        if (!fieldConfig) return null;
        const { required, ...rendererProps } = fieldConfig;
        if (fieldConfig.name === "separator")
          return (
            <div className="col-span-full" key={fieldConfig.name + index}>
              {fieldConfig.label && (
                <FormLabel
                  htmlFor={fieldConfig.name}
                  className="flex flex-col w-full sm:flex-row">
                  {fieldConfig.label}
                </FormLabel>
              )}
              <SeparatorHorizontal className="my-4" />
            </div>
          );

        if (fieldConfig.name === "empty")
          return <div key={fieldConfig.name}></div>;

        const largeField = ["notes", "address", "bio", "description"];
        const ltrFields = ["number", "email", "password", "tel"];

        return (
          <div
            key={fieldConfig.name}
            className={clsx(
              largeField.includes(fieldConfig.name) &&
                "col-span-full md:col-span-3",
              fieldConfig.className
            )}>
            {fieldConfig.label && (
              <FormLabel
                htmlFor={fieldConfig.name}
                className="flex w-full flex-row">
                {fieldConfig.label}
                {fieldConfig.required && <span className="text-danger">*</span>}
              </FormLabel>
            )}
            <FormField
              control={control}
              name={fieldConfig.name}
              render={({ field }) => (
                <div
                  dir={
                    fieldConfig.inputType &&
                    ltrFields.includes(fieldConfig.inputType)
                      ? "ltr"
                      : "rtl"
                  }>
                  {fieldRenderer({
                    ...rendererProps,
                    field,
                    onKeyDown: (e: React.KeyboardEvent<HTMLElement>) => {
                      handleEnterKey(e, index);
                      fieldConfig.onKeyDown?.(e);
                    },
                    ref: (el: HTMLElement | null) => {
                      if (!el) return;

                      // همیشه همون ایندکس خودش
                      inputRefs.current[index] = el;

                      // ریجیستر React Hook Form
                      // field.ref(el as any);

                      // برای برخی کامپوننت‌ها که disabled/readOnly را با data-* می‌فرستیم،
                      // می‌تونیم این فلگ‌ها را هم ست کنیم (اختیاری):
                      if (fieldConfig.disabled)
                        el.setAttribute("data-disabled", "true");
                      if (fieldConfig.readOnly)
                        el.setAttribute("data-read-only", "true");

                      // اگر نوعش Select تریگر داره، باز هم تو همین ایندکس ذخیره شده و بالا تشخیص می‌دهیم
                    },

                    // field,
                    errors,
                    // rowIndex,
                    // setError,
                  })}
                  {"message" in (errors?.[fieldConfig.name] ?? {}) &&
                    typeof errors?.[fieldConfig.name]?.message === "string" && (
                      <div className="mt-2 text-danger text-right">
                        {errors[fieldConfig.name]!.message as string}
                      </div>
                    )}
                </div>
              )}
            />
          </div>
        );
      })}
    </>
  );
}

export default FormBody;
