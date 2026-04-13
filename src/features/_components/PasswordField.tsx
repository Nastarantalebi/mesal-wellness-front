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
        <div className="relative">
          <FormLabel>{label}</FormLabel>
          <FormInput
            {...field}
            type={show ? "text" : "password"}
            dir="ltr"
            placeholder={placeholder}
            disabled={disabled}
            className={clsx(
              "block w-full px-4 py-3 pr-10 rounded-[0.6rem] border-slate-300/80 placeholder:!text-left",
              { "!border !border-danger": !!fieldState?.error?.message },
              className,
            )}
          />
          <span
            onClick={() => setShow((prev) => !prev)}
            className="absolute inset-y-0 right-3 flex items-center text-gray-500 cursor-pointer select-none">
            {show ? <EyeOffIcon size={16} /> : <EyeIcon size={16} />}
          </span>
          <div className="min-h-[20px] mt-0.5 text-danger text-sm">
            {fieldState.error?.message}
          </div>
        </div>
      )}
    />
  );
}
