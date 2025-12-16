import {
  changePassInitialValue,
  changePassValidationSchema,
} from "../_fixtures/validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@/components/Button";
import useChangePassword from "../_services/useChangePassword";
import type { TChangePass } from "../_types/type";
import PasswordInput from "@/features/_components/PasswordInput";
const ChangePassword = () => {
  const { isPending, mutateAsync } = useChangePassword();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TChangePass>({
    resolver: zodResolver(changePassValidationSchema),
    defaultValues: changePassInitialValue,
  });
  const onSubmit = (values: TChangePass) => {
    mutateAsync(values, {
      onSuccess: () => {
        reset();
      },
    });
  };
  return (
    <form className="mt-6 w-full" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 md:grid-cols-3  xl:grid-cols-4 gap-2">
        <PasswordInput
          label="رمز عبور قدیمی"
          register={register("old_password")}
          error={errors.old_password?.message}
          isRequired
          disabled={isPending}
        />
        <PasswordInput
          label="رمز عبور جدید"
          register={register("new_password")}
          error={errors.new_password?.message}
          isRequired
          disabled={isPending}
        />
        <PasswordInput
          label="تکرار رمز عبور جدید"
          register={register("confirm_password")}
          error={errors.confirm_password?.message}
          isRequired
          disabled={isPending}
        />
      </div>
      <div className="w-full text-end">
        <Button
          variant="primary"
          type="submit"
          className="mt-5"
          isPending={isPending}>
          تغییر رمز عبور
        </Button>
      </div>
    </form>
  );
};

export default ChangePassword;
