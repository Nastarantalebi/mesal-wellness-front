import { Controller } from "react-hook-form";
import clsx from "clsx";
import { FormInput, FormLabel } from "@/components/Form";
import { PhoneIcon } from "lucide-react";

interface MobileInputProps {
  control: any; // RHF control
  name: string; // field name
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  maxLength?: number;
  label?: string;
}

export default function MobileInput({
  control,
  name,
  placeholder = "09123456789",
  disabled = false,
  className,
  maxLength = 11,
  label = "شماره همراه",
}: MobileInputProps) {
  return (
    <div className="w-full">
      <FormLabel>{label}</FormLabel>
      <Controller
        control={control}
        name={name}
        render={({ field, fieldState }) => (
          <div className="relative">
            <FormInput
              {...field}
              type="tel"
              inputMode="numeric"
              dir="ltr"
              maxLength={maxLength}
              placeholder={placeholder}
              className={clsx(
                "block w-full px-4 py-3.5 rounded-[0.6rem] border-slate-300/80 pl-10 placeholder:!text-left",
                className,
                { "border-danger": !!fieldState.error }
              )}
              disabled={disabled}
              onKeyDown={(e) => {
                if (
                  !/[0-9]/.test(e.key) &&
                  e.key !== "Enter" &&
                  e.key !== "Backspace"
                ) {
                  e.preventDefault();
                }

                // Enter → submit فرم
                if (e.key === "Enter") {
                  e.preventDefault();
                  e.currentTarget.form?.requestSubmit();
                }
              }}
            />
            <PhoneIcon
              width={20}
              height={20}
              className="absolute left-3 top-1/2 -translate-y-1/2 select-none opacity-70"
            />
            {fieldState.error && (
              <div className="mt-2 text-danger text-sm">
                {String(fieldState.error.message)}
              </div>
            )}
          </div>
        )}
      />
    </div>
  );
}
