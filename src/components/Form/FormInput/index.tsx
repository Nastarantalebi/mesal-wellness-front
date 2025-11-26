import { useContext, forwardRef } from "react";
import { formInlineContext } from "../FormInline";
import { inputGroupContext } from "../InputGroup";
import { twMerge } from "tailwind-merge";

interface FormInputProps extends React.ComponentPropsWithoutRef<"input"> {
  formInputSize?: "sm" | "lg";
  rounded?: boolean;
  money?: boolean;
}

type FormInputRef = React.ComponentPropsWithRef<"input">["ref"];

const FormInput = forwardRef((props: FormInputProps, ref: FormInputRef) => {
  const { money, onChange, value, ...restProps } = props;
  const formInline = useContext(formInlineContext);
  const inputGroup = useContext(inputGroupContext);

  const formatMoney = (val: string) => {
    const numbers = val.replace(/[^\d]/g, "");
    return numbers.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (money) {
      const formatted = formatMoney(e.target.value);
      e.target.value = formatted;
      const rawValue = formatted.replace(/,/g, "");
      if (onChange) {
        onChange({
          ...e,
          target: {
            ...e.target,
            value: rawValue,
          },
        } as any);
      }
    } else {
      onChange && onChange(e);
    }
  };
  const displayValue = money && value ? formatMoney(String(value)) : value;
  return (
    <input
      {...restProps}
      ref={ref}
      dir={money ? "ltr" : undefined}
      type={money ? "text" : restProps.type}
      onChange={handleChange}
      value={displayValue as any}
      className={twMerge([
        "disabled:bg-slate-100 disabled:cursor-not-allowed dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent",
        "[&[readonly]]:bg-slate-100 [&[readonly]]:cursor-not-allowed [&[readonly]]:dark:bg-darkmode-800/50 [&[readonly]]:dark:border-transparent",
        "transition duration-200 ease-in-out w-full text-sm border-slate-300/60 shadow-sm rounded-md placeholder:text-slate-400/90 focus:ring-1 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80",
        props.formInputSize == "sm" && "text-xs py-1.5 px-2",
        props.formInputSize == "lg" && "text-lg py-1.5 px-4",
        props.rounded && "rounded-full",
        formInline && "flex-1",
        inputGroup &&
          "rounded-none [&:not(:first-child)]:border-s-transparent first:rounded-s last:rounded-e z-10",
        props.className,
      ])}
    />
  );
});

export default FormInput;
