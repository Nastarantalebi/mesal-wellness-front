import { useContext, forwardRef } from "react";
import clsx from "clsx";
import { numberToWords } from "@persian-tools/persian-tools";
import { formInlineContext } from "../FormInline";
import { inputGroupContext } from "../InputGroup";

interface FormInputProps extends React.ComponentPropsWithoutRef<"input"> {
  formInputSize?: "sm" | "lg";
  rounded?: boolean;
  hasError?: boolean;
  money?: boolean;
  dir?: "ltr" | "rtl";
}

// type FormInputRef = React.ComponentPropsWithRef<"input">["ref"];

const FormInput = forwardRef<HTMLInputElement, FormInputProps>((props, ref) => {
  const {
    money,
    hasError,
    dir,
    value,
    onChange,
    className,
    max,
    min,
    maxLength,
    ...rest
  } = props;

  const formInline = useContext(formInlineContext);
  const inputGroup = useContext(inputGroupContext);

  const isControlled = value !== undefined;

  const formatMoney = (val: string) => {
    const numbers = val.replace(/[^\d]/g, "");
    return numbers.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!money) {
      onChange?.(e);
      return;
    }

    let val = e.target.value.replace(/[^\d]/g, "");
    const formatted = formatMoney(val);

    onChange?.({
      ...e,
      target: { ...e.target, value: val },
    } as any);

    e.target.value = formatted;
  };

  const displayValue =
    money && value !== undefined ? formatMoney(String(value)) : value;

  const valueInWords =
    money && value && !isNaN(Number(value)) ? numberToWords(Number(value)) : "";

  return (
    <div
      className={clsx("flex flex-col w-full", {
        "flex-1": formInline,
      })}>
      <input
        {...rest}
        ref={ref}
        dir={money ? "ltr" : dir}
        type={money ? "text" : rest.type}
        max={max}
        min={min}
        maxLength={money ? 20 : maxLength}
        onChange={handleChange}
        {...(isControlled ? { value: displayValue ?? "" } : {})}
        className={clsx(
          "transition duration-200 ease-in-out w-full text-sm border rounded-md",
          "border-slate-300/60 focus:ring-1 focus:ring-primary",
          "disabled:bg-slate-100 disabled:cursor-not-allowed",
          inputGroup &&
            "rounded-none [&:not(:first-child)]:border-s-transparent",
          className,
          { "!border !border-danger": hasError }
        )}
      />

      {money && valueInWords && (
        <span className="text-xs text-success mt-1 italic" dir="rtl">
          {String(valueInWords)} تومان
        </span>
      )}
    </div>
  );
});

FormInput.displayName = "FormInput";
export default FormInput;
