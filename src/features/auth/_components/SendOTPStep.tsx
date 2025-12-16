import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import clsx from "clsx";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput, FormLabel } from "@/components/Form";
import Button from "@/components/Button";
import { EyeIcon, EyeOffIcon, ArrowRightIcon, LockIcon } from "lucide-react";

import { useOtpStore } from "../store/otpState";
import type { ISendOTP } from "../_types/types";
import {
  OtpInitialValues,
  OtpPassInitialValues,
  OtpPassValidationSchema,
  OtpValidationSchema,
} from "../_fixtures";

function SendOTPStep({
  isPending,
  mutateAsync,
  isPendingOPT,
  mutateAsyncOPT,
  dataOTP,
}: any) {
  const mobile = useOtpStore((s) => s.mobile);
  const remaining = useOtpStore((s) => s.remainingSeconds());
  const isExpired = useOtpStore((s) => s.isExpired());
  const setVerifying = useOtpStore((s) => s.setVerifying);
  const setVerified = useOtpStore((s) => s.setVerified);
  const startOtp = useOtpStore((s) => s.start);
  const resetOtp = useOtpStore((s) => s.reset);

  const hasPass = dataOTP?.has_password ?? false;

  // برای رندر تایمر هر ثانیه
  const [, force] = useState(0);
  useEffect(() => {
    const id = setInterval(() => force((v) => v + 1), 1000);
    return () => clearInterval(id);
  }, []);

  // فرم
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    watch,
    formState: { errors },
  } = useForm<any>({
    mode: "onChange",
    resolver: zodResolver(
      hasPass ? OtpValidationSchema : OtpPassValidationSchema
    ),
    defaultValues: hasPass ? OtpInitialValues : OtpPassInitialValues,
  });
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState({
    new: false,
    confirm: false,
  });
  // ارسال کد
  const onVerify = (values: ISendOTP) => {
    if (!mobile) return;

    if (isExpired) {
      setErrorMessage("کد منقضی شده است. لطفاً دوباره دریافت کنید.");
      return;
    }

    setErrorMessage("");
    setVerifying();

    mutateAsync(
      {
        mobile,
        otp: values.otp,
        ...(!hasPass
          ? {
              new_password: values.new_password,
              confirm_password: values.confirm_password,
            }
          : {}),
      },
      {
        onSuccess: (data: any) => {
          reset();
          if (data.success) setVerified();
        },
        onError: () => {
          setErrorMessage("کد وارد شده اشتباه است.");
          reset();
        },
      }
    );
  };

  // درخواست ارسال مجدد کد
  const handleResendCode = () => {
    if (!mobile) return;

    mutateAsyncOPT(
      { mobile },
      {
        onSuccess: (data: any) => {
          startOtp({
            mobile: data.mobile,
            otp_expire: data.otp_expire,
            is_used: data.is_used,
          });
          setValue("otp", "");
          setErrorMessage("");
          setTimeout(() => inputRefs.current[0]?.focus(), 50);
        },
      }
    );
  };

  // مدیریت inputs برای OTP
  const handleOtpChange = (index: number, value: string) => {
    const otp = getValues("otp")?.split("") || [];
    otp[index] = value.slice(-1);
    const newOtp = otp.join("");
    setValue("otp", newOtp);

    // رفتن به input بعدی
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // submit خودکار وقتی 6 رقم وارد شد
    if (newOtp.length === 6 && hasPass) {
      handleSubmit(onVerify)();
    }
  };
  const otp = watch("otp") || "";
  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <p className="text-sm w-full text-center">
        کد تأیید ۶ رقمی ارسال شده به <b dir="ltr">{mobile ?? 0}</b> را وارد
        کنید.
      </p>

      <form
        className="w-full"
        onSubmit={handleSubmit(onVerify)}
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
        {/* OTP Inputs */}
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
                "w-12 h-12 text-center rounded-lg border-slate-300/80",
                { "border-danger": errors.otp }
              )}
              ref={(el) => {
                inputRefs.current[idx] = el;
              }}
              onChange={(e) => handleOtpChange(idx, e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Backspace") {
                  e.preventDefault();
                  const newOtp = [...otp];
                  if (newOtp[idx]) {
                    newOtp[idx] = "";
                    setValue("otp", newOtp.join(""));
                  } else if (idx > 0) {
                    newOtp[idx - 1] = "";
                    setValue("otp", newOtp.join(""));
                    inputRefs.current[idx - 1]?.focus();
                  }
                }
              }}
              disabled={isPending}
            />
          ))}
        </div>

        {errors.otp && (
          <div className="text-danger mt-2 text-sm">
            {String(errors.otp.message)}
          </div>
        )}

        {/* تایمر و ارسال مجدد */}
        <div className="flex justify-center mt-3">
          {isExpired ? (
            <span
              onClick={handleResendCode}
              className="text-blue-600 cursor-pointer">
              {isPendingOPT ? "در حال ارسال..." : "ارسال مجدد کد"}
            </span>
          ) : (
            <span>({remaining} ثانیه باقی مانده)</span>
          )}
        </div>

        {/* password inputs اگر کاربر رمز نداشت */}
        {!hasPass && (
          <>
            <FormLabel className="mt-5">رمز عبور جدید</FormLabel>
            <div className="relative">
              <FormInput
                {...register("new_password")}
                type={showPassword.new ? "text" : "password"}
                dir="ltr"
                className={clsx(
                  "block w-full px-4 py-3.5 rounded-[0.6rem] border-slate-300/80 pl-8",
                  { "border-danger": errors.new_password }
                )}
                placeholder="********"
              />
              <LockIcon
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 select-none opacity-70"
                size={18}
              />
              <span
                onClick={() =>
                  setShowPassword((prev) => ({ ...prev, new: !prev.new }))
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer select-none text-gray-500">
                {showPassword.new ? (
                  <EyeOffIcon size={16} />
                ) : (
                  <EyeIcon size={16} />
                )}
              </span>
            </div>
            {errors.new_password && (
              <div className="text-danger mt-2 text-sm">
                {String(errors.new_password.message)}
              </div>
            )}

            <FormLabel className="mt-4">تکرار رمز عبور جدید</FormLabel>
            <div className="relative">
              <FormInput
                {...register("confirm_password")}
                type={showPassword.confirm ? "text" : "password"}
                dir="ltr"
                className={clsx(
                  "block w-full px-4 py-3.5 rounded-[0.6rem] border-slate-300/80 pl-8",
                  { "border-danger": errors.mobile }
                )}
                placeholder="********"
              />
              <LockIcon
                className="absolute left-3 top-1/2 -translate-y-1/2 select-none opacity-70"
                size={18}
              />
              <span
                onClick={() =>
                  setShowPassword((prev) => ({
                    ...prev,
                    confirm: !prev.confirm,
                  }))
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer select-none text-gray-500">
                {showPassword.confirm ? (
                  <EyeOffIcon size={16} />
                ) : (
                  <EyeIcon size={16} />
                )}
              </span>
            </div>
            {errors.confirm_password && (
              <div className="text-danger mt-2 text-sm">
                {String(errors.confirm_password.message)}
              </div>
            )}
          </>
        )}

        <Button
          type="submit"
          rounded
          isPending={isPending}
          className="w-full mt-6 bg-gradient-to-r from-theme-1/70 to-theme-2/70 py-3.5">
          ورود
        </Button>
      </form>

      {errorMessage && (
        <p className="text-red-500 text-sm text-center mt-2">{errorMessage}</p>
      )}

      {mobile && (
        <button
          onClick={() => resetOtp()}
          className="flex items-center gap-2 text-blue-700 mt-2">
          <ArrowRightIcon size={18} />
          تغییر شماره همراه
        </button>
      )}
    </div>
  );
}

export default SendOTPStep;
