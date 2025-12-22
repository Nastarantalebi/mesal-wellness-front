import { useForm } from "react-hook-form";
import clsx from "clsx";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput, FormLabel } from "@/components/Form";
import Button from "@/components/Button";
import {
  sendMobileInitialValues,
  sendMobilevalidationSchema,
} from "../_fixtures";
import type { ISendMobile } from "../_types/types";
import { PhoneIcon } from "lucide-react";

function SendMobileStep({ isPending, mutateAsync, startOtp }: any) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ISendMobile>({
    mode: "onChange",
    resolver: zodResolver(sendMobilevalidationSchema),
    defaultValues: sendMobileInitialValues,
  });

  const onSubmit = (values: ISendMobile) => {
    mutateAsync(values, {
      onSuccess: (data: any) => {
        startOtp({
          mobile: data.mobile,
          otp_expire: data.otp_expire,
          is_used: data.is_used,
        });
        reset();
      },
    });
  };

  return (
    <form
      className="mt-6 w-full"
      onSubmit={handleSubmit(onSubmit)}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Backspace") {
          const target = e.target as HTMLElement;
          const isInput =
            target.tagName === "INPUT" || target.tagName === "TEXTAREA";
          if (!isInput) {
            e.preventDefault();
          }
        }
      }}>
      {/* Mobile Label */}
      <FormLabel>شماره همراه</FormLabel>

      {/* Mobile Input */}
      <div className="relative">
        <FormInput
          {...register("mobile")}
          type="tel"
          inputMode="numeric"
          dir="ltr"
          maxLength={11}
          placeholder="09123456789"
          className={clsx(
            "block w-full px-4 py-3.5 rounded-[0.6rem] border-slate-300/80 pl-10 placeholder:!text-left",
            { "border-danger": errors.mobile }
          )}
          disabled={isPending}
        />
        <PhoneIcon
          width={20}
          height={20}
          className="absolute left-3 top-1/2 -translate-y-1/2 select-none opacity-70"
        />
      </div>

      {errors.mobile && (
        <div className="mt-2 text-danger text-sm">
          {String(errors.mobile.message)}
        </div>
      )}

      {/* Submit Button */}
      <div className="mt-6">
        <Button
          type="submit"
          variant="primary"
          isPending={isPending}
          rounded
          className="bg-gradient-to-r from-theme-1/70 to-theme-2/70 w-full py-3.5">
          {isPending ? "درحال ارسال..." : "ارسال کد تأیید"}
        </Button>
      </div>
    </form>
  );
}

export default SendMobileStep;
