import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import clsx from "clsx";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput, FormLabel } from "@/components/Form";
import Button from "@/components/Button";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useOtpStore } from "../store/otpState";

import {
  forgotPasswordInitialValues,
  forgotPasswordvalidationSchema,
} from "../_fixtures";
import useForgotPassWord from "../_services/useForgotPassWord";
import useSendMobile from "../_services/useSendMobile";

type TProp = {
  setForgotPass: React.Dispatch<React.SetStateAction<boolean>>;
};

function ForgotPassword({ setForgotPass }: TProp) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<any>({
    resolver: zodResolver(forgotPasswordvalidationSchema),
    defaultValues: forgotPasswordInitialValues,
  });

  const { isPending, mutateAsync } = useForgotPassWord();
  const { isPending: isPendingSendMobile, mutateAsync: mutateAsyncSendMobile } =
    useSendMobile();
  const mobileNumber = watch("mobile");
  const otp = watch("otp") || "";

  const [sendCode, setSendCode] = useState(false);
  const [showPassword, setShowPassword] = useState({
    new: false,
    confirm: false,
  });
  const [errorMessage, setErrorMessage] = useState("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const remaining = useOtpStore((s) => s.remainingSeconds());
  const isExpired = useOtpStore((s) => s.isExpired());
  const startOtp = useOtpStore((s) => s.start);

  // برای رندر تایمر هر ثانیه
  const [, force] = useState(0);
  useEffect(() => {
    const id = setInterval(() => force((v) => v + 1), 1000);
    return () => clearInterval(id);
  }, []);

  const toggle = (key: "new" | "confirm") =>
    setShowPassword((prev) => ({ ...prev, [key]: !prev[key] }));

  const handleSendCode = async () => {
    if (!mobileNumber) return;
    setSendCode(true);
    const data: any = await mutateAsyncSendMobile({ mobile: mobileNumber });
    startOtp({
      mobile: mobileNumber,
      otp_expire: data.otp_expire,
      is_used: data.is_used,
    });
    setValue("otp", "");
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
    setValue("otp", "");
    setErrorMessage("");
    setTimeout(() => inputRefs.current[0]?.focus(), 50);
  };

  const handleOtpChange = (index: number, value: string) => {
    const otpArr = otp.split("");
    otpArr[index] = value.slice(-1);
    setValue("otp", otpArr.join(""));

    // رفتن به input بعدی
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
        setValue("otp", otpArr.join(""));
      } else if (index > 0) {
        otpArr[index - 1] = "";
        setValue("otp", otpArr.join(""));
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
          reset();
          setForgotPass(false);
        },
        onError: () => setErrorMessage("کد وارد شده اشتباه است."),
      }
    );
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
      <FormLabel>شماره همراه</FormLabel>
      <FormInput
        {...register("mobile")}
        type="tel"
        inputMode="numeric"
        dir="ltr"
        minLength={11}
        className={clsx(
          "block px-4 py-3.5 rounded-[0.6rem] border-slate-300/80 placeholder:!text-left",
          { "border-danger": errors.mobile }
        )}
        placeholder="09123456789"
        disabled={sendCode}
      />
      {errors.mobile && (
        <div className="mt-2 text-danger">{String(errors.mobile.message)}</div>
      )}

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
          <FormLabel className="mt-4">کد تأیید</FormLabel>
          <div className="flex    gap-2 mt-2 justify-center flex-row-reverse">
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
                  { "border-danger": errors.otp }
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

          <FormLabel className="mt-4">رمز عبور جدید</FormLabel>
          <div className="relative mb-2">
            <FormInput
              {...register("new_password")}
              type={showPassword.new ? "text" : "password"}
              dir="ltr"
              placeholder="********"
              className={clsx(
                "block w-full px-4 py-3.5 pr-10 rounded-[0.6rem] border-slate-300/80 placeholder:!text-left",
                { "border-danger": errors.new_password }
              )}
            />
            <span
              onClick={() => toggle("new")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer select-none">
              {showPassword.new ? (
                <EyeOffIcon size={16} />
              ) : (
                <EyeIcon size={16} />
              )}
            </span>
          </div>

          <FormLabel className="mt-4">تکرار رمز عبور جدید</FormLabel>
          <div className="relative mb-2">
            <FormInput
              {...register("confirm_password")}
              type={showPassword.confirm ? "text" : "password"}
              dir="ltr"
              placeholder="********"
              className={clsx(
                "block w-full px-4 py-3.5 pr-10 rounded-[0.6rem] border-slate-300/80 placeholder:!text-left",
                { "border-danger": errors.confirm_password }
              )}
            />
            <span
              onClick={() => toggle("confirm")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer select-none">
              {showPassword.confirm ? (
                <EyeOffIcon size={16} />
              ) : (
                <EyeIcon size={16} />
              )}
            </span>
          </div>

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
    </form>
  );
}

export default ForgotPassword;
