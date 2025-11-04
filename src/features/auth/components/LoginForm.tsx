import { FormCheck, FormInput, FormLabel } from "../../../components/Form";
import Button from "../../../components/Button";
import { schema } from "../fixtures";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useLogin from "../services/useLogin";
import type { ILogin } from "../types";

function LoginForm() {
  const { isPending, mutateAsync } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const onSubmit = (values: ILogin) => {
    mutateAsync(values);
  };

  return (
    <form
      className="validate-form-login mt-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormLabel>شماره همراه*</FormLabel>
      <FormInput
        {...register("mobile")}
        id="validation-form-login"
        name="mobile"
        type="number"
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
      <FormLabel className="mt-4">رمز عبور *</FormLabel>
      <FormInput
        {...register("password")}
        id="validation-form-login"
        name="password"
        type="password"
        className={clsx(
          "block px-4 py-3.5 rounded-[0.6rem] border-slate-300/80",
          {
            "border-danger": errors.password,
          }
        )}
        placeholder="************"
      />
      {errors.password && (
        <div className="mt-2 text-danger">
          {typeof errors.password.message === "string" &&
            errors.password.message}
        </div>
      )}
      <div className="flex mt-4 text-xs text-slate-500 sm:text-sm">
        <div className="flex items-center me-auto">
          <FormCheck.Input
            id="remember-me"
            type="checkbox"
            className="me-2.5 border"
          />

          <label className="cursor-pointer select-none" htmlFor="remember-me">
            مرا به خاطر بسپار
          </label>
        </div>
        <a href="">گذرواژه خود را فراموش کرده‌اید؟</a>
      </div>
      <div className="mt-5 text-center xl:mt-8 xl:text-start">
        <Button
          type="submit"
          variant="primary"
          isPending={isPending}
          rounded
          className="bg-gradient-to-r from-theme-1/70 to-theme-2/70 w-full py-3.5 xl:me-3"
        >
          ورود
        </Button>
        <Button
          variant="outline-secondary"
          rounded
          className="bg-white/70 w-full py-3.5 mt-3"
        >
          ثبت نام
        </Button>
      </div>
    </form>
  );
}

export default LoginForm;
