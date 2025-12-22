import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import clsx from "clsx";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput, FormLabel } from "@/components/Form";
import Button from "@/components/Button";
import FormComponent from "@/components/Form/Form";
import { useOtpStore } from "../store/otpState";

import {
  forgotPasswordInitialValues,
  forgotPasswordvalidationSchema,
} from "../_fixtures";
import useForgotPassWord from "../_services/useForgotPassWord";
import useSendMobile from "../_services/useSendMobile";
import MobileInput from "@/features/_components/MobileInput";
import PasswordField from "@/features/_components/PasswordField";

type TProp = {
  setForgotPass: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ForgotPassword({ setForgotPass }: TProp) {
  const form = useForm<any>({
    resolver: zodResolver(forgotPasswordvalidationSchema),
    defaultValues: forgotPasswordInitialValues,
    mode: "onChange",
  });

  const { isPending, mutateAsync } = useForgotPassWord();
  const { isPending: isPendingSendMobile, mutateAsync: mutateAsyncSendMobile } =
    useSendMobile();

  const [sendCode, setSendCode] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const mobileNumber = form.watch("mobile");
  const otp = form.watch("otp") || "";

  const remaining = useOtpStore((s) => s.remainingSeconds());
  const isExpired = useOtpStore((s) => s.isExpired());
  const startOtp = useOtpStore((s) => s.start);

  // برای رندر تایمر هر ثانیه
  const [, force] = useState(0);
  useEffect(() => {
    const id = setInterval(() => force((v) => v + 1), 1000);
    return () => clearInterval(id);
  }, []);

  const handleSendCode = async () => {
    if (!mobileNumber) return;
    setSendCode(true);
    const data: any = await mutateAsyncSendMobile({ mobile: mobileNumber });
    startOtp({
      mobile: mobileNumber,
      otp_expire: data.otp_expire,
      is_used: data.is_used,
    });
    form.setValue("otp", "");
    setTimeout(() => inputRefs.current[0]?.focus(), 50);
  };

  const handleResendCode = async () => {
    if (!mobileNumber) return;
    const data: any = await mutateAsyncSendMobile({ mobile: mobileNumber });
    startOtp({
      mobile: mobileNumber,
      otp_expire: data.otp_expire,
      is_used: data.is_used,
    });
    form.setValue("otp", "");
    setErrorMessage("");
    setTimeout(() => inputRefs.current[0]?.focus(), 50);
  };

  const handleOtpChange = (index: number, value: string) => {
    const otpArr = otp.split("");
    otpArr[index] = value.slice(-1);
    form.setValue("otp", otpArr.join(""));

    if (value && index < 5) inputRefs.current[index + 1]?.focus();
  };

  const handleOtpKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      const otpArr = otp.split("");
      if (otpArr[index]) {
        otpArr[index] = "";
        form.setValue("otp", otpArr.join(""));
      } else if (index > 0) {
        otpArr[index - 1] = "";
        form.setValue("otp", otpArr.join(""));
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const onSubmit = (values: any) => {
    if (otp.length < 6) {
      setErrorMessage("لطفاً کد ۶ رقمی را وارد کنید.");
      return;
    }

    mutateAsync(
      { ...values, otp },
      {
        onSuccess: () => {
          form.reset();
          setForgotPass(false);
        },
        onError: () => setErrorMessage("کد وارد شده اشتباه است."),
      }
    );
  };

  return (
    <FormComponent
      form={form}
      onSubmit={onSubmit}
      showSubmitButton={false} // دکمه‌ها داخل فرم تعریف می‌شوند
      size="custom">
      <MobileInput control={form.control} name="mobile" disabled={sendCode} />
      {!sendCode && (
        <Button
          type="button"
          className="w-full mt-4 py-3.5"
          disabled={!mobileNumber}
          isPending={isPendingSendMobile}
          onClick={handleSendCode}>
          ارسال کد تأیید
        </Button>
      )}

      {sendCode && (
        <>
          {/* OTP Inputs */}
          <FormLabel className="mt-4">کد تأیید</FormLabel>
          <div className="flex gap-2 mt-2 justify-center flex-row-reverse">
            {Array.from({ length: 6 }).map((_, idx) => (
              <FormInput
                key={idx}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={otp[idx] || ""}
                dir="ltr"
                className={clsx(
                  "w-12 h-12 text-center rounded-lg border-slate-300/80 placeholder:!text-left",
                  { "border-danger": !!form.formState.errors.otp }
                )}
                ref={(el) => {
                  inputRefs.current[idx] = el;
                }}
                onChange={(e) => handleOtpChange(idx, e.target.value)}
                onKeyDown={(e) => handleOtpKeyDown(idx, e)}
              />
            ))}
          </div>

          <div className="flex justify-center mt-2">
            {isExpired ? (
              <span
                onClick={handleResendCode}
                className="text-blue-600 cursor-pointer">
                {isPendingSendMobile ? "در حال ارسال..." : "ارسال مجدد کد"}
              </span>
            ) : (
              <span>({remaining} ثانیه باقی‌مانده)</span>
            )}
          </div>

          <PasswordField
            control={form.control}
            name="new_password"
            label="رمز عبور جدید"
          />
          <PasswordField
            control={form.control}
            name="confirm_password"
            label="تکرار رمز عبور جدید"
          />

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full mt-4 py-3.5"
            isPending={isPending}>
            تغییر رمز عبور
          </Button>

          {errorMessage && (
            <div className="text-danger mt-2 text-center">{errorMessage}</div>
          )}
        </>
      )}

      <span
        className="text-blue-800 mt-4 inline-block cursor-pointer"
        onClick={() => setForgotPass(false)}>
        ورود با رمز عبور
      </span>
    </FormComponent>
  );
}
