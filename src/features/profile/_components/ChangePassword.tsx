import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@/components/Button";
import FormComponent from "@/components/Form/Form";
import PasswordField from "@/features/_components/PasswordField";
import {
  changePassInitialValue,
  changePassValidationSchema,
} from "../_fixtures/validation";
import type { TChangePass } from "../_types/type";
import useChangePassword from "../_services/useChangePassword";

const ChangePasswordForm = () => {
  const { isPending, mutateAsync } = useChangePassword();

  const form = useForm<TChangePass>({
    resolver: zodResolver(changePassValidationSchema),
    defaultValues: changePassInitialValue,
    mode: "onChange",
  });

  const handleSubmitForm = (values: TChangePass) => {
    mutateAsync(values, {
      onSuccess: () => {
        form.reset();
      },
    });
  };

  return (
    <FormComponent
      form={form}
      onSubmit={handleSubmitForm}
      size="custom"
      button={
        <div className="w-full text-end">
          <Button
            type="submit"
            variant="primary"
            isPending={isPending}
            className="mt-5">
            تغییر رمز عبور
          </Button>
        </div>
      }
      className="mt-6 w-full outline-none">
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-2">
        <PasswordField
          control={form.control}
          name="old_password"
          label="رمز عبور قدیمی"
          disabled={isPending}
        />
        <PasswordField
          control={form.control}
          name="new_password"
          label="رمز عبور جدید"
          disabled={isPending}
        />
        <PasswordField
          control={form.control}
          name="confirm_password"
          label="تکرار رمز عبور جدید"
          disabled={isPending}
        />
      </div>
    </FormComponent>
  );
};

export default ChangePasswordForm;
