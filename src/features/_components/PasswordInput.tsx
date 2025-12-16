import { useState } from "react";
import clsx from "clsx";
import { EyeIcon, EyeOffIcon, LockIcon } from "lucide-react";
import { FormInput, FormLabel } from "@/components/Form";

type Props = {
  register: any;
  label: string;
  error?: any;
  placeholder?: string;
  className?: string;
  isRequired?: boolean;
  disabled?: boolean;
};

export default function PasswordInput({
  register,
  label,
  className,
  error,
  placeholder = "********",
  isRequired = false,
  disabled = false,
}: Props) {
  const [show, setShow] = useState(false);

  return (
    <div>
      <FormLabel>
        <span>{label}</span>
        {isRequired && <span className="text-danger">*</span>}
      </FormLabel>
      <div className="relative mb-2">
        <FormInput
          {...register}
          type={show ? "text" : "password"}
          dir="ltr"
          placeholder={placeholder}
          disabled={disabled}
          className={clsx(
            "block w-full py-2.5 xl:py-3.5 px-10 rounded-[0.6rem] border-slate-300/80 placeholder:!text-left",
            { "border-danger": error },
            className
          )}
        />
        <LockIcon
          className={`absolute left-3 -translate-y-1/2 text-gray-500 select-none opacity-70 ${
            error ? "top-1/3" : "top-1/2"
          }`}
          size={20}
        />
        <span
          aria-label="toggle password visibility"
          role="button"
          onClick={() => setShow((v) => !v)}
          className={`absolute right-3 -translate-y-1/2 cursor-pointer text-gray-500 ${
            error ? "top-1/3" : "top-1/2"
          }`}>
          {show ? <EyeOffIcon size={16} /> : <EyeIcon size={16} />}
        </span>
        {error && <div className="mt-2 text-danger">{error}</div>}
      </div>
    </div>
  );
}
