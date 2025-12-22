import { useEffect, useState, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import clsx from "clsx";
import { ArrowRightIcon } from "lucide-react";
import Button from "@/components/Button";
import FormComponent from "@/components/Form/Form";
import FormInput from "@/components/Form/FormInput";
import { useOtpStore } from "../store/otpState";
import type { ISendOTP } from "../_types/types";
import {
  OtpInitialValues,
  OtpPassInitialValues,
  OtpPassValidationSchema,
  OtpValidationSchema,
} from "../_fixtures";
import { zodResolver } from "@hookform/resolvers/zod";
import PasswordField from "@/features/_components/PasswordField";

type SendOTPStepProps = {
  isPending: boolean;
  mutateAsync: (values: any, options?: any) => void;
  isPendingOPT: boolean;
  mutateAsyncOPT: (values: any, options?: any) => void;
  dataOTP: any;
};

function SendOTPStep({
  isPending,
  mutateAsync,
  isPendingOPT,
  mutateAsyncOPT,
  dataOTP,
}: SendOTPStepProps) {
  const mobile = useOtpStore((s) => s.mobile);
  const remaining = useOtpStore((s) => s.remainingSeconds());
  const isExpired = useOtpStore((s) => s.isExpired());
  const setVerifying = useOtpStore((s) => s.setVerifying);
  const setVerified = useOtpStore((s) => s.setVerified);
  const startOtp = useOtpStore((s) => s.start);
  const resetOtp = useOtpStore((s) => s.reset);

  const hasPass = dataOTP?.has_password ?? false;

  const [, force] = useState(0);
  useEffect(() => {
    const id = setInterval(() => force((v) => v + 1), 1000);
    return () => clearInterval(id);
  }, []);

  const form = useForm<any>({
    resolver: zodResolver(
      hasPass ? OtpValidationSchema : OtpPassValidationSchema
    ),
    defaultValues: hasPass ? OtpInitialValues : OtpPassInitialValues,
  });

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleSubmitForm = (values: ISendOTP) => {
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
          form.reset();
          if (data.success) setVerified();
        },
        onError: () => {
          setErrorMessage("کد وارد شده اشتباه است.");
          form.reset();
        },
      }
    );
  };

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
          form.setValue("otp", "");
          setErrorMessage("");
          setTimeout(() => inputRefs.current[0]?.focus(), 50);
        },
      }
    );
  };

  const handleOtpChange = (index: number, value: string) => {
    const otpArr = form.getValues("otp")?.split("") || [];
    otpArr[index] = value.slice(-1);
    const newOtp = otpArr.join("");
    form.setValue("otp", newOtp);

    if (value && index < 5) inputRefs.current[index + 1]?.focus();

    if (newOtp.length === 6 && hasPass) {
      form.handleSubmit(handleSubmitForm)();
    }
  };

  return (
    <FormComponent
      form={form}
      onSubmit={handleSubmitForm}
      size="custom"
      button={
        <Button
          type="submit"
          rounded
          isPending={isPending}
          className="w-full mt-6 bg-gradient-to-r from-theme-1/70 to-theme-2/70 py-3.5">
          ورود
        </Button>
      }>
      <p className="text-sm w-full text-center">
        کد تأیید ۶ رقمی ارسال شده به <b dir="ltr">{mobile ?? 0}</b> را وارد
        کنید.
      </p>

      {/* OTP Inputs */}
      <Controller
        control={form.control}
        name="otp"
        render={({ field, fieldState }) => (
          <div className="flex gap-2 mt-2 justify-center flex-row-reverse">
            {Array.from({ length: 6 }).map((_, idx) => (
              <FormInput
                key={idx}
                {...field}
                value={field.value[idx] || ""}
                maxLength={1}
                type="text"
                inputMode="numeric"
                dir="ltr"
                ref={(el) => {
                  inputRefs.current[idx] = el;
                }}
                onChange={(e) => handleOtpChange(idx, e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Backspace") {
                    e.preventDefault();
                    const otpArr = [...(field.value || "")];
                    if (otpArr[idx]) {
                      otpArr[idx] = "";
                      form.setValue("otp", otpArr.join(""));
                    } else if (idx > 0) {
                      otpArr[idx - 1] = "";
                      form.setValue("otp", otpArr.join(""));
                      inputRefs.current[idx - 1]?.focus();
                    }
                  }
                }}
                className={clsx(
                  "w-12 h-12 text-center rounded-lg border-slate-300/80",
                  {
                    "border-danger": fieldState.error,
                  }
                )}
                disabled={isPending}
              />
            ))}
          </div>
        )}
      />
      {form.formState.errors.otp && (
        <div className="text-danger mt-2 text-sm">
          {String(form.formState.errors.otp?.message)}
        </div>
      )}

      {/* Resend / Timer */}
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

      {/* Password Fields if user has no password */}
      {!hasPass && (
        <>
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
        </>
      )}

      {errorMessage && (
        <p className="text-red-500 text-sm text-center mt-2">{errorMessage}</p>
      )}

      {mobile && (
        <button
          type="button"
          onClick={resetOtp}
          className="flex items-center gap-2 text-blue-700 mt-2">
          <ArrowRightIcon size={18} />
          تغییر شماره همراه
        </button>
      )}
    </FormComponent>
  );
}

export default SendOTPStep;
