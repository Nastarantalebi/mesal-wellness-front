import clsx from "clsx";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput, FormLabel } from "@/components/Form";
import Button from "@/components/Button";
import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { sendPasswordvalidationSchema } from "../_fixtures";
import useSendPassword from "../_services/useSendPassword";
import ForgotPassword from "./ForgotPassword";

function AuthPassword() {
  const { isPending, mutateAsync } = useSendPassword();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [forgotPass, setForgotPass] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    mode: "onChange",
    resolver: zodResolver(sendPasswordvalidationSchema),
  });

  const onSubmit = (values: any) => {
    mutateAsync(values);
  };

  return forgotPass ? (
    <ForgotPassword setForgotPass={setForgotPass} />
  ) : (
    <form
      className="validate-form-login mt-6"
      onSubmit={handleSubmit(onSubmit)}>
      <FormLabel>شماره همراه</FormLabel>
      <FormInput
        {...register("mobile")}
        id="validation-form-login"
        name="mobile"
        type="number"
        dir="ltr"
        minLength={11}
        className={clsx(
          "block px-4 py-3.5 rounded-[0.6rem] border-slate-300/80",
          {
            "border-danger": errors.mobile,
          }
        )}
        placeholder="09123456789"
      />
      {errors.mobile && (
        <div className="mt-2 text-danger">
          {typeof errors.mobile.message === "string" && errors.mobile.message}
        </div>
      )}

      <FormLabel className="mt-4">رمز عبور</FormLabel>

      <div className="relative mb-2">
        <FormInput
          {...register("password")}
          id="validation-form-login"
          dir="ltr"
          name="password"
          type={showPassword ? "text" : "password"}
          className={clsx(
            "block w-full px-4 py-3.5 pr-10 rounded-[0.6rem] border-slate-300/80",
            { "border-danger": errors.password }
          )}
          placeholder="************"
        />
        <span
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 select-none cursor-pointer">
          {showPassword ? <EyeOffIcon size={16} /> : <EyeIcon size={16} />}
        </span>
      </div>

      {errors.password && (
        <div className="mt-2 text-danger">
          {typeof errors.password.message === "string" &&
            errors.password.message}
        </div>
      )}
      <span
        className="text-blue-800 tracking-wide cursor-pointer"
        onClick={() => setForgotPass(true)}>
        فراموشی رمز عبور
      </span>
      <div className="mt-5 text-center xl:mt-8 xl:text-start">
        <Button
          type="submit"
          variant="primary"
          isPending={isPending}
          rounded
          className="bg-gradient-to-r from-theme-1/70 to-theme-2/70 w-full py-3.5 xl:me-3">
          ورود
        </Button>
      </div>
    </form>
  );
}

export default AuthPassword;
