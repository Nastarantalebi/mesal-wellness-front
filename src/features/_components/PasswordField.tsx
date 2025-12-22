import { useState } from "react";
import { Controller } from "react-hook-form";
import clsx from "clsx";
import { FormInput, FormLabel } from "@/components/Form";
import { EyeIcon, EyeOffIcon } from "lucide-react";

type PasswordFieldProps = {
  control: any; // control از react-hook-form
  name: string;
  label: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
};

export default function PasswordField({
  control,
  name,
  label,
  placeholder = "********",
  disabled = false,
  className,
}: PasswordFieldProps) {
  const [show, setShow] = useState(false);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <div className="relative mb-2 mt-4">
          <FormLabel>{label}</FormLabel>
          <FormInput
            {...field}
            type={show ? "text" : "password"}
            dir="ltr"
            placeholder={placeholder}
            disabled={disabled}
            className={clsx(
              "block w-full px-4 py-3.5 pr-10 rounded-[0.6rem] border-slate-300/80 placeholder:!text-left",
              { "!border !border-danger": !!fieldState?.error?.message },
              className
            )}
          />
          <span
            onClick={() => setShow((prev) => !prev)}
            className={clsx(
              "absolute right-3 top-2/3 -translate-y-1/2 text-gray-500 cursor-pointer select-none",
              {
                "!top-1/2": !!fieldState?.error?.message,
              }
            )}>
            {show ? <EyeOffIcon size={16} /> : <EyeIcon size={16} />}
          </span>
          {fieldState.error && (
            <div className="mt-2 text-danger text-sm">
              {String(fieldState.error.message)}
            </div>
          )}
        </div>
      )}
    />
  );
}
